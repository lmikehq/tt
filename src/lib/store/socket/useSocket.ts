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
    outputMessages,
  } = useAiChatStore();
  const [sendMessage, setSendMessage] = useState<any>(null);
  const [suggestions, setSuggestions] = useState<any>([]);
  const [initialChats, setInitialChatsChats] = useState<string[]>([]);

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
    const getSuggestions = () => {
      socket.emit("suggestions-and-chats");
    };
    setSuggestions(() => getSuggestions);
    socket.on("suggestions-and-chats-processed", (res) => {
      console.log("suggestions-and-chats-processed", res);
    });

    return () => {
      socket.disconnect();
    };
  }, []); // Empty dependency array ensures this effect runs only once (on mount)

  return { sendMessage, initialChats, suggestions };
}
