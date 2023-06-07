"use client";

import Input from "@atom/input";
import Text from "@atom/text";
import React, { useState } from "react";
import { BsCheckCircle, BsSearch, BsSend } from "react-icons/bs";
import styled from "styled-components";
import { ttColors } from "theme/colors";
import Button from "@atom/button";
import Vector from "@image/Vector.svg";
import Image from "@atom/image";
import Flex from "@atom/flex";
import { FaRegUser } from "react-icons/fa";

const ChatContainer = styled.div`
  display: flex;
  height: 89vh;
  width: 100vw;
`;

const LeftSide = styled.div<{active?: boolean}>`
  width: 425px;
  height: 100%;
  background-color: #f2f2f2;
  //   background: green;
  padding: 20px 20px 0px;
  overflow: hidden;

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

  & button {
    background: ${(props) =>
      props.active ? "rgba(6, 6, 42, 0.73);" : "transparent"};
    color: ${(props) => (props.active ? "#ffffff" : `${ttColors.dark}`)};
  }
`;

// const ChatBtn = styled.button`
//   width: 100%;
//   height: 64px;
//   margin: 0.5rem 0rem;
//   background: ${(props) => (props.active ? "#06A82A" : "transparent")};
//   color: ${(props) => (props.active ? "#ffffff" : "#000000")};
// `;

const ChatBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: #fafbfc;
  padding: 20px;
  height: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  border-bottom: 1px solid;
  padding: 0px 16px 0px 10px;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  backgorund: ${ttColors.light};

  & input {
    font-size: 1rem;
    margin: 0px !important;
  }
`;

const FeedBack = styled.div`
  position: absolute;
  width: 390px;
  height: 45px;
  left: 13px;
  bottom: 25px;

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
  margin: 10px 0px;

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

const Chat = () => {
  const [activeSection, setActiveSection] = useState("ai");
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [showIntroMessage, setShowIntroMessage] = useState(true);

  const handleButtonClick = (section: string) => {
    setActiveSection(section);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleMessageSend();
    }
  };

  const handleMessageSend = async () => {
    if (message.trim() !== "") {
      setShowIntroMessage(false);
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

      setMessage("");
    }
  };

  return (
    <ChatContainer>
      <LeftSide active={activeSection === "ai"}>
        <Text type="h3" text="Thrillers Travels AI Travel Guide" />
        <Text type="p" text="First AI powered travel consultant" />
        <SearchArea>
          <Input type="text" placeholder="Search" />
          <BsSearch
            onClick={() => handleButtonClick("search")}
            size="1rem"
            color="#A3A3A3"
            style={{ cursor: "pointer" }}
          />
        </SearchArea>

        <Button
          onClick={() => handleButtonClick("ai")}
        //   active={activeSection === "ai"}
          width="100%"
          height="64px"
          margin=".5rem 0rem"
          background="rgba(6, 6, 42, 0.73);"
          color="#ffffff"
        >
          <Flex>
            <ImageBox>
              <Image src={Vector} alt="message icon" />
            </ImageBox>
            <BtnContent>
              <Text type="h3" text="Thrillers Travel AI" />
              <Text type="p" text="Your advanced AI consultant bot" />
            </BtnContent>
          </Flex>
        </Button>

        <Button
          onClick={() => handleButtonClick("myself")}
        //   active={activeSection === "myself"}
          width="100%"
          height="64px"
          margin=".5rem 0rem"
          background="transparent"
          color={`${ttColors.dark}`}
        >
          <Flex>
            <ImageBox>
              <FaRegUser color={`${ttColors.dark}`} size="1.5rem" />
            </ImageBox>
            <BtnContent>
              <Text
                type="h3"
                text="Myself"
                styles={{ color: `${ttColors.dark}` }}
              />
              <Text
                type="p"
                text="Talk to yourself, see as your personal draft"
              />
            </BtnContent>
          </Flex>
        </Button>

        <Button
          onClick={() => handleButtonClick("representative")}
        //   active={activeSection === "representative"}
          width="100%"
          height="64px"
          background="transparent"
          color={`${ttColors.dark}`}
        >
          <Flex>
            <ImageBox>
              <FaRegUser color={`${ttColors.dark}`} size="1.5rem" />
            </ImageBox>
            <BtnContent>
              <Text
                type="h3"
                text="Human Reprensentative"
                styles={{ color: `${ttColors.dark}` }}
              />
              <Text type="p" text="Chat with Thrillers Travels rep" />
            </BtnContent>
          </Flex>
        </Button>

        {/* <ChatBtn
          onClick={() => handleButtonClick("ai")}
          active={activeSection === "ai"}
        >
          AI Chat
        </ChatBtn>
        <ChatBtn
          onClick={() => handleButtonClick("myself")}
          active={activeSection === "myself"}
        >
          Myself
        </ChatBtn>
        <ChatBtn
          onClick={() => handleButtonClick("representative")}
          active={activeSection === "representative"}
        >
          Human Representative
        </ChatBtn> */}

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
      <ChatBox>
        {showIntroMessage && activeSection === "ai" && (
          <p
            style={{
              position: "absolute",
              top: "50%",
              left: "40%",
              textAlign: "center",
              fontSize: "32px",
              lineHeight: "48px",
              fontWeight: "400",
              color: "rgba(121, 116, 126, 0.51);",
              width: "685px",
              height: "233px",
            }}
          >
            This is the begining of your chat with Thrillers Travel AI. type
            your questions below
          </p>
        )}
        {showIntroMessage && activeSection === "myself" && (
          <p
            style={{
              position: "absolute",
              top: "50%",
              left: "40%",
              textAlign: "center",
              fontSize: "32px",
              lineHeight: "48px",
              fontWeight: "400",
              color: "rgba(121, 116, 126, 0.51);",
              width: "685px",
              height: "233px",
            }}
          >
            Myself
          </p>
        )}
        {showIntroMessage && activeSection === "representative" && (
          <p
            style={{
              position: "absolute",
              top: "50%",
              left: "40%",
              textAlign: "center",
              fontSize: "32px",
              lineHeight: "48px",
              fontWeight: "400",
              color: "rgba(121, 116, 126, 0.51);",
              width: "685px",
              height: "233px",
            }}
          >
            Human Representative
          </p>
        )}
        {/* {chatHistory.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))} */}
        {chatHistory.map((msg, index) => {
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
        })}
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
          <Button onClick={handleMessageSend} background="transparent">
            <BsSend size="1.5rem" color={`${ttColors.dark}`} />
          </Button>
        </InputContainer>
        <Text
          margin="5px auto"
          type="p"
          text="Thrillers AI is still in beta phase"
        />
      </ChatBox>
    </ChatContainer>
  );
};

export default Chat;
