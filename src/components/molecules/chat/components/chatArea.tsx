'use client'

import Button from "@/components/atoms/button";
import Input from "@/components/atoms/input";
import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import useSocket from "@/lib/store/socket/useSocket";
import { useState } from "react";
import { BsMicFill } from "react-icons/bs";
import { GrRefresh } from "react-icons/gr";
import { IoSendSharp } from "react-icons/io5";
import { styled } from "styled-components";
import Section from "../../section";
import { useAiChatStore } from "@/lib/store/socket/useSocketStore";

const ChatAreaWrapper = styled.div`
  background: #f3f3ff;
  padding: 3rem 2rem;
  width: 100%;
  position: relative;
  height: calc(100vh - 70px);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #bdbdbd50;
  border-radius: 8px;
  padding-left: 6px;
  background: white;
  height: 70px;
  & input {
    font-size: 1.2rem;
    margin: 0px !important;
    font-weight: 100;
    color: #757575;
  }

  & button {
    padding-right: 15px;
  }
`;

const Sugestion = styled.div`
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  width: 32%;
  border: 1px solid #d4d4d4;
  cursor: pointer;
`;

function ChatArea() {
  const suggestions = [
    {
      title: "What documents do I need",
      subtitle: "to prepare my Visa Application",
    },
    {
      title: "Help me generate a list of",
      subtitle: "fun places in the world",
    },
    {
      title: "Can you suggest",
      subtitle: "an itinerary for a two-week trip",
    },
    {
      title: "What documents do I need",
      subtitle: "to prepare my Visa Application",
    },
    {
      title: "Help me generate a list of",
      subtitle: "fun places in the world",
    },
    {
      title: "Can you suggest",
      subtitle: "an itinerary for a two-week trip",
    },
    {
      title: "What documents do I need",
      subtitle: "to prepare my Visa Application",
    },
    {
      title: "Help me generate a list of",
      subtitle: "fun places in the world",
    },
    {
      title: "Can you suggest",
      subtitle: "an itinerary for a two-week trip",
    },
  ];
  const [message, setMessage] = useState("");
  const { sendMessage } = useSocket();
  const { outputMessages, chatSessionId } = useAiChatStore();
  console.log("receivd: ", outputMessages, chatSessionId);
  return (
    <ChatAreaWrapper>
      <Flex justify="space-between">
        <Section>
          <Text
            type="p"
            text="Hi, This is Thrillers Travels AI Guide"
            weight={600}
            size={23}
          />
          <Text
            type="p"
            text="Tell us what you have in mind about travels and we will be glad to help you out."
            width={"50%"}
          />
        </Section>
        <Flex
          background="white"
          height="56px"
          width="56px"
          borderRadius="50%"
          align="center"
          justify="center"
          cursor="pointer"
        >
          <GrRefresh size={24} />
        </Flex>
      </Flex>

      <Flex wrap="wrap" justify="space-between" gap=".1rem" margin="10vh 0 0">
        {suggestions.map((_, i) => (
          <Sugestion
            key={i}
            onClick={() => {
              setMessage(_.title + ", " + _.subtitle);
            }}
          >
            <Text type="p" text={_.title} weight={500} />
            <Text type="p" text={_.subtitle} weight={300} />
          </Sugestion>
        ))}
      </Flex>

      <InputContainer>
        <Input
          border="none"
          width="97%"
          type="text"
          placeholder="Enter a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage(message, chatSessionId);
              setMessage("");
            }
          }}
          parentWidth="100%"
        />
        <Button background="transparent" width="50px">
          <BsMicFill size="1.1rem" color={`#606060`} />
        </Button>
        <Button background="transparent" width="50px">
          <IoSendSharp
            size="1.1rem"
            color={`#606060`}
            onClick={() => {
              sendMessage(message);
              setMessage("");
            }}
          />
        </Button>
      </InputContainer>
    </ChatAreaWrapper>
  );
}

export default ChatArea;
