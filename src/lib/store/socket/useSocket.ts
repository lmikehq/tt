import socketIOClient from "socket.io-client";
import { useAiChatStore } from "./useSocketStore";
import { useEffect, useState } from "react";
import { ChatUserIdentity } from "@/lib/types";

export default function useSocket() {
  const {
    setAiThinking,
    setInputMessage,
    addOutputMessage,
    setChatSuggestions,
    setChatSessionId,
    setInitialAiChats,
    outputMessages,
  } = useAiChatStore();
  const [sendMessage, setSendMessage] = useState<any>(null);
  const [suggestions, setSuggestions] = useState<any>(null);
  const [initialChats, setInitialChats] = useState<any>(null);
  const [initialSuggestions, setInitialSuggestions] = useState<any>([]);
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
      console.log("output already; ", outputMessages, res);
      if (res) addOutputMessage(res);
    });
    setSendMessage(() => sendMessageToServer);

    // FIRST TIME USER GETS TO CHATS PAGE

    // refreshing suggestions
    const getSuggestions = () => {
      socket.emit("ai-suggestions");
    };

    setSuggestions(() => getSuggestions);

    // first time loading chats
    setInitialSuggestions(() => socket.emit("ai-suggestions"));
    // setInitialChatsChats((ipOrUserId: string) => {
    //   socket.emit("ai-initial-chats", ipOrUserId);
    // });
    setInitialChats(() => console.log("dont know bro"));
    // response to suggestions from server
    socket.on("suggestions-and-chats-processed", (res) => {
      setChatSuggestions(res);
    });

    socket.on("initial-chats-processed", (res) => {
      console.log("returned something: ", res);
      setInitialAiChats(res);
    });

    return () => {
      socket.disconnect();
    };
  }, []); // Empty dependency array ensures this effect runs only once (on mount)

  return { sendMessage, initialChats, suggestions, initialSuggestions };
}
