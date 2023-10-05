import socketIOClient from "socket.io-client";
import { useAiChatStore } from "./useSocketStore";
import { useEffect, useState } from "react";
import { ChatUserIdentity } from "@/lib/types";

export default function useSocket() {
  const {
    setAiThinking,
    setInputMessage,
    addOutputMessage,
    setSuggestions,
    setChatSessionId,
    outputMessages,
  } = useAiChatStore();
  const [sendMessage, setSendMessage] = useState<any>(null);

  useEffect(() => {
    const socket = socketIOClient(process.env.NEXT_PUBLIC_API_SERVER as string);
    socket.on("connect", () => {
      console.log("__");
    });

    socket.on("session-id", (res) => {
      setChatSessionId(res);
    });

    const sendMessageToServer = (
      message: string,
      session: string,
      user: ChatUserIdentity
    ) => {
      socket.emit("message", { message, session, user });
    };

    socket.on("ai-messaging", (res) => {
      console.log("output already; ", outputMessages, res);
      if (res) addOutputMessage(res);
    });

    setSendMessage(() => sendMessageToServer);

    return () => {
      socket.disconnect();
    };
  }, []); // Empty dependency array ensures this effect runs only once (on mount)

  return { sendMessage };
}
