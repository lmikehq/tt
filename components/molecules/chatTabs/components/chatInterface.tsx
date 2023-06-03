import Input from "@atom/input";
import { FC, useState } from "react";

interface Message {
  sender: "user" | "ai";
  content: string;
}

const ChatInterface: FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = (message: string) => {
    // TODO: Implement
    setMessages([...messages, { sender: "user", content: message }]);
  };

  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>
          <strong>{message.sender}:</strong> {message.content}
        </div>
      ))}
      <Input
        type="text"
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleSendMessage(event.currentTarget.value);
            event.currentTarget.value = "";
          }
        }}
      />
    </div>
  );
};

export default ChatInterface;
