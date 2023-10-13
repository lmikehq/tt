import { ChatUserIdentity } from "@/lib/types";
import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { useUserStore } from "../useStore";
import { useAiChatStore } from "./useSocketStore";

export default function useSocket() {
  const {
    addOutputMessage,
    setChatSuggestions,
    setChatSessionId,
    setInitialAiChats,
    updateLastMessage,
    setAiThinking,
  } = useAiChatStore();
  const [sendMessage, setSendMessage] = useState<any>(null);
  const [suggestions, setSuggestions] = useState<any>(null);
  const [initialSuggestions, setInitialSuggestions] = useState<any>([]);
  const { user, geoInfo } = useUserStore();
  const [apiCallCount, setApiCallCount] = useState<number>(0);
  useEffect(() => {
    const socket = socketIOClient(process.env.NEXT_PUBLIC_API_SERVER as string);
    socket.on("connect", () => {
      console.log("__");
    });

    // SET INITIAL VARIABLES = SESSION ID
    socket.on("session-and-chats", (res) => {
      setChatSessionId(res);
    });

    // WHEN USER SENDS A MESSAGE
    const sendMessageToServer = (
      message: string,
      session: any,
      user: ChatUserIdentity
    ) => {
      socket.emit("message", { message, session: session?.sessionId, user });
    };
    socket.on("ai-messaging", (res) => {
      if (res?.loading) {
        addOutputMessage(res);
        return setAiThinking(true);
      }
      updateLastMessage(res?.response);
    });
    setSendMessage(() => sendMessageToServer);

    // FIRST TIME USER GETS TO CHATS PAGE

    // refreshing suggestions
    const getSuggestionsAi = () => {
      socket.emit("ai-suggestions-and-initial-chats", {
        getSuggestions: true,
      });
    };
    setSuggestions(() => getSuggestionsAi);

    // first time loading chats
    setInitialSuggestions(() => {
      socket.emit("ai-suggestions-and-initial-chats", {
        ipOrUserId: user?._id || geoInfo?.ip,
        getSuggestions: apiCallCount <= 2,
      });
      setApiCallCount((prev) => prev + 1);
    });
    // setInitialChatsChats((ipOrUserId: string) => {
    //   socket.emit("ai-initial-chats", ipOrUserId);
    // });
    // response to suggestions from server
    socket.on("ai-suggestions-processed", (res) => {
      setChatSuggestions(res);
    });

    // socket.on("initial-chats-processed", (res) => {
    //   setInitialAiChats(res);
    // });

    return () => {
      socket.disconnect();
    };
  }, [user, geoInfo]); // Empty dependency array ensures this effect runs only once (on mount)

  return { sendMessage, suggestions, initialSuggestions };
}
