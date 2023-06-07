"use client";

import Button from "@atom/button";
import Flex from "@atom/flex";
import Image from "@atom/image";
import Input from "@atom/input";
import Text from "@atom/text";
import Vector from "@image/Vector.svg";
import { ButtonBase } from "@mui/material";
import React, { useRef, useState } from "react";
import { BsCheckCircle, BsSearch, BsSend } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import styled from "styled-components";
import { ttColors } from "theme/colors";

const ChatContainer = styled.div`
  display: flex;
  height: calc(100vh - 70px);
  width: 100vw;
`;

const LeftSide = styled.div`
  width: 30%;
  height: 100%;
  background-color: #f2f2f2;
  padding: 20px 20px 0px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & h3 {
    font-weight: 600;
    font-size: 22px;
    line-height: 27px;
    color: ${ttColors.dark};
  }

  & p {
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
  }
`;

// const ChatBtn = styled.button`
//   width: 100%;
//   height: 64px;
//   margin: 0.5rem 0rem;
//   background: ${(props) => (props.active ? "#06A82A" : "transparent")};
//   color: ${(props) => (props.active ? "#ffffff" : "#000000")};
// `;

const ChatArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: #fafbfc;
  padding: 20px;
  width: 70%;

  & section {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

const InputContainer = styled.div`
  display: flex;
  // align-items: center;
  // margin-top: 20px;
  // width: 100%;
  border-bottom: 1px solid;
  padding-left: 6px;
  // border-top-right-radius: 4px;
  // border-top-left-radius: 4px;
  // background: white;
  // height: 70px;
  // position: relative;
  // border-radius: 4px;
  background: white;
  & input {
    font-size: 1.2rem;
    margin: 0px !important;
    height: 70px;
    font-weight: 100;
    color: #757575;
    // &::placeholder {
    // }
  }

  & button {
    padding-right: 15px;
  }
`;

const FeedBack = styled.div`
  width: 100%;
  height: 45px;
  margin-bottom: 30px;
  background: #ffffff;
  color: ${ttColors.dark} !important;
  border: 1px solid rgba(0, 0, 0, 0.24);
  border-radius: 11px;
`;

const SearchArea = styled.div`
  display: flex;
  border: 1px solid lightgray;
  border-radius: 6px;
  padding: 10px 7px;
  margin: 30px 0px 2rem;

  & input {
    border: none !important;
    width: 95%;
  }
`;

const ImageBox = styled.div`
  background: #fff;
  padding: 8px 7px;
  height: 39px;
  width: 39px;
  border-radius: 4px;
  margin-left: 10px;
`;

const BtnContent = styled.div`
  text-align: left;
  margin-left: 10px;

  & h3 {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: ${ttColors.light};
  }

  & p {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 18px;
  }
`;

const AbsoluteDefaultText = styled.div`
  position: absolute;
  top: 40%;
  left: 40%;
  width: 50%;
`;

const Chat = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<string[]>([]);

  // const handleButtonClick = (section: string) => {
  //   setActiveSection(section);
  // };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleMessageSend();
    }
  };
  const chatRef = useRef<HTMLDivElement>(null);

  const handleMessageSend = async () => {
    if (message.trim() !== "") {
      console.log(`Sending message: ${message}`);
      setChatHistory((prevHistory) => [...prevHistory, message]);

      try {
        const response = await fetch("YOUR_API_ENDPOINT", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        });

        if (response.ok) {
          const data = await response.json();
          // Process the response data here
          console.log("Response:", data);
        } else {
          console.log("Failed to send the message");
        }
      } catch (error) {
        console.error("Error sending the message:", error);
      }
      if (chatRef?.current)
        chatRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      setMessage("");
    }
  };

  function filterChatItems(e: string) {
    if (!e) return;
    setChatItems(
      chatItems.filter((x) => x.name.toLowerCase().includes(e.toLowerCase()))
    );
  }
  const [searchCriteria, setSearchCriteria] = useState("");
  const chatItem = [
    {
      name: "Thrillers Travel AI",
      description: "Your advanced AI consultant bot",
      icon: <Image src={Vector} alt="message icon" />,
    },
    {
      name: "Human Reprensentative",
      description: "Chat with Thrillers Travels rep",
      icon: <FaRegUser color={`${ttColors.dark}`} size="1.5rem" />,
    },
    {
      name: "Myself",
      description: "Talk to yourself, this is your personal draft",
      icon: <FaRegUser color={`${ttColors.dark}`} size="1.5rem" />,
    },
  ];

  const [chatItems, setChatItems] = useState(chatItem);
  return (
    <ChatContainer>
      <LeftSide>
        <main>
          <Text type="h3" text="Thrillers Travels AI Travel Guide" />
          <Text type="p" text="First AI powered travel consultant" />
          <SearchArea>
            <Input
              type="text"
              placeholder="Search"
              onChange={(e) => setSearchCriteria(e.target.value)}
              value={searchCriteria}
            />
            <BsSearch
              onClick={(_x) => filterChatItems(searchCriteria)}
              size="1rem"
              color="#A3A3A3"
              style={{ cursor: "pointer" }}
            />
          </SearchArea>

          {chatItems.map((item, index) => {
            const active = activeSection === index;
            return (
              <Button
                onClick={() => setActiveSection(index)}
                width="100%"
                height="64px"
                margin=".5rem 0rem"
                background={active ? "rgba(6, 6, 42, 0.73)" : "transparent"}
                key={index}
                color={active ? "#ffffff" : ttColors.dark}
              >
                <Flex>
                  <ImageBox>{item.icon}</ImageBox>
                  <BtnContent>
                    <Text
                      type="h3"
                      text={item.name}
                      padding="0 0 .1rem"
                      color={active ? "#ffffff" : ttColors.dark}
                    />
                    <Text type="p" text={item.description} />
                  </BtnContent>
                </Flex>
              </Button>
            );
          })}
        </main>
        <FeedBack>
          <Button
            background="transparent"
            width="100%"
            color={`${ttColors.dark}`}
          >
            <BsCheckCircle
              color={`${ttColors.dark}`}
              size="1rem"
              style={{ marginRight: "5px" }}
            />
            Send feedback
          </Button>
        </FeedBack>
      </LeftSide>
      <ChatArea>
        <section ref={chatRef}>
          {chatHistory.length ? (
            chatHistory.map((msg, index) => {
              if (index % 2 === 0) {
                // User message
                return (
                  <p
                    key={index}
                    style={{
                      alignSelf: "flex-end",
                      backgroundColor: "#F5F5F5",
                      padding: "8px",
                      borderRadius: "8px",
                      marginBottom: "8px",
                    }}
                  >
                    {msg}
                  </p>
                );
              } else {
                // AI response
                return (
                  <p
                    key={index}
                    style={{
                      alignSelf: "flex-start",
                      backgroundColor: "#E0E0E0",
                      padding: "8px",
                      borderRadius: "8px",
                      marginBottom: "8px",
                    }}
                  >
                    {msg}
                  </p>
                );
              }
            })
          ) : (
            <AbsoluteDefaultText>
              <Text
                type="p"
                text={`This is the begining of your chat with 
${chatItem[activeSection].name} type your questions below`}
                size="1.8rem"
                color="#79747E"
                styles={{ textAlign: "center", lineHeight: "48px" }}
              />
            </AbsoluteDefaultText>
          )}
        </section>
        <InputContainer>
          <Input
            border="none"
            width="97%"
            type="text"
            placeholder="Type your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <ButtonBase>
            <BsSend
              size="1.5rem"
              color={`${ttColors.dark}`}
              onClick={handleMessageSend}
            />
          </ButtonBase>
        </InputContainer>
        <Text
          margin="15px auto 0"
          type="p"
          text="Thrillers AI is still in beta phase"
        />
      </ChatArea>
    </ChatContainer>
  );
};

export default Chat;
