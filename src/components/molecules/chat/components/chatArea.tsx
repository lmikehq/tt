"use client";

import Button from "@/components/atoms/button";
import Input from "@/components/atoms/input";
import Text from "@/components/atoms/text";
import Center from "@/components/templates/center";
import Flex from "@/components/templates/flex";
import useSocket from "@/lib/store/socket/useSocket";
import { useAiChatStore } from "@/lib/store/socket/useSocketStore";
import { useUserStore } from "@/lib/store/useStore";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { BsMicFill } from "react-icons/bs";
import { GrRefresh } from "react-icons/gr";
import { IoSendSharp } from "react-icons/io5";
import { styled } from "styled-components";
import Spinner from "../../icons/spinner";
import Section from "../../section";
import { RxAvatar, RxHamburgerMenu } from "react-icons/rx";
import Image from "@/components/atoms/image";
import { PiCopySimple } from "react-icons/pi";
import { HiOutlineHandThumbDown, HiOutlineHandThumbUp } from "react-icons/hi2";
import { useClipboard } from "@/lib/extensions/helpers/copyToClipboard";
import MicIcon from "public/assets/icons/mic";
import useTextToSpeech from "@/lib/extensions/hook/useTextToSpeech";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { ButtonBase } from "@mui/material";
import { ttColors } from "@/lib/theme/colors";
import { AiOutlinePlus } from "react-icons/ai";
import CustomDrawer from "../../drawers/customDrawer";
import ChatSessions from "./chatSessions";

const ChatAreaWrapper = styled.div`
  background: #f3f3ff;
  padding: 3rem 2rem;
  width: 100%;
  position: relative;
  height: calc(100vh - 70px);

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & .messages {
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  @media (max-width: 768px) {
    padding: 0;
    height: 100vh;
    background: #fff;
    justify-content: flex-start;
    gap: 0.5rem;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #929292;
  border-radius: 8px;
  padding-left: 6px;
  background: #f8f8ff;
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

  @media (max-width: 768px) {
    width: 92%;
    margin: 0 auto;
  }

}
`;
const InputAndText = styled.div`
@media (max-width: 768px) {
  position: fixed;
  bottom: 0;
  height:150px;
  padding-top: 1.4rem;
  background: #F5F5FF;
  z-index: 100000000;

`;
const Sugestion = styled.div`
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  width: 32%;
  border: 1px solid #d4d4d4;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 90%;
    margin: 0.2rem auto;
  }
`;

const Message = ({ message, response }: any) => {
  const { copyToClipboard } = useClipboard();
  const { play, pause, stop, isPlaying } = useTextToSpeech(response);
  const { isMobile } = useScreenResolution();
  return (
    <Section margin="1rem 0">
      <Flex
        gap="1rem"
        width={isMobile ? "90%" : "100%"}
        margin={isMobile ? "0 auto" : "0"}
      >
        <RxAvatar size={34} />
        <Text type="p" text={message} weight={500} />
      </Flex>
      <Flex
        margin="1rem 0"
        background="#FFFFFF"
        padding="1.4rem"
        borderRadius="10px"
        gap="1rem"
        width="100%"
      >
        <Image
          src={"/assets/images/brand/favicon.svg"}
          height={45}
          width={45}
          alt="TTLogo"
        />
        <Section>
          <div
            dangerouslySetInnerHTML={{
              __html: response.replace(/\n/g, "<br/>"),
            }}
          />
          {response !== "thinking..." && (
            <Flex gap="2rem" margin="2rem 0 0">
              <PiCopySimple
                size={25}
                cursor="pointer"
                onClick={() => copyToClipboard(response, "message copied")}
              />
              <HiOutlineHandThumbUp
                size={25}
                cursor="not-allowed"
                color="#04040450"
              />
              <HiOutlineHandThumbDown
                size={25}
                cursor="not-allowed"
                color="#04040450"
              />
            </Flex>
          )}
        </Section>
        {!isMobile && response !== "thinking..." && (
          <Section
            width="fit-content"
            styles={{
              cursor: "pointer",
            }}
          >
            <span
              onClick={() => {
                if (isPlaying) return pause();
                play();
              }}
            >
              <MicIcon size={40} />
            </span>
          </Section>
        )}
      </Flex>
    </Section>
  );
};

function ChatArea({
  setMessage,
  message,
}: {
  setMessage: (message: string) => void;
  message: string;
}) {
  const { sendMessage, suggestions, initialSuggestions } = useSocket();
  const { user, geoInfo } = useUserStore();
  useEffect(() => {
    initialSuggestions;
    return () => {};
  }, []);
  const {
    chatSessionId,
    aiSuggestions,
    outputMessages,
    aiThinking,
    setOutputMessages,
  } = useAiChatStore();
  const chatContainerRef = useRef(null);

  useEffect(() => {
    function scrollToBottom() {
      const chatArea = document.getElementById("messages");
      chatArea?.scrollTo({
        top: chatArea.scrollHeight,
        behavior: "smooth",
      });
    }
    scrollToBottom();
    return () => {};
  }, [outputMessages]);
  function handleSubmitOrClick() {
    sendMessage(message, chatSessionId, {
      userId: user?._id,
      ip: geoInfo?.ip,
      type: user?._id ? "userId" : "ipAddress",
    });
    setMessage("");
  }
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChange = useMemo(
    () => (e: ChangeEvent<HTMLInputElement>) => {
      setMessage(e.target.value);
    },
    []
  );
  const { isMobile } = useScreenResolution();
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <ChatAreaWrapper>
      <CustomDrawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        zIndex={10000000000}
        // background="#06062A"
      >
        <Section>
          <ChatSessions
            setMessage={setMessage}
            closeDrawer={() => setDrawerOpen(false)}
          />
        </Section>
      </CustomDrawer>
      {isMobile && (
        <Flex align="center" justify="space-between" padding="1rem">
          <ButtonBase
            onClick={() => {
              setDrawerOpen(!drawerOpen);
            }}
          >
            <RxHamburgerMenu size={30} />
          </ButtonBase>
          <Text type="p" text="NEW CHAT" weight={600} />

          <Flex align="center" gap="1rem" width="fit-content">
            <AiOutlinePlus size={20} onClick={() => setOutputMessages([])} />
            <Flex
              align="center"
              justify="center"
              width="28px"
              height="28px"
              background="#0065AE"
              borderRadius="50%"
              styles={{ flex: "none" }}
            >
              <Text
                type="h5"
                color={ttColors.light}
                weight={400}
                size={17}
                text={user?.firstName?.charAt(0) ?? "T"}
              />
            </Flex>
          </Flex>
        </Flex>
      )}
      {outputMessages.length ? (
        <Flex
          direction="column"
          overflowY="auto"
          height={isMobile ? "75%" : "90%"}
          className="messages"
          id="messages"
          ref={chatContainerRef}
        >
          {outputMessages.map((output, i) => (
            <Message
              key={i}
              message={output.message}
              response={output.response}
            />
          ))}
        </Flex>
      ) : (
        <>
          <Flex
            justify="space-between"
            margin={isMobile ? "2rem 0 0" : "0"}
            padding={isMobile ? "1rem" : "0"}
          >
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
                width={isMobile ? "100%" : "50%"}
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
              styles={{
                userSelect: "none",
              }}
              onClick={suggestions}
            >
              {aiSuggestions?.loading ? (
                <Spinner size="30px" />
              ) : (
                <GrRefresh size={24} />
              )}
            </Flex>
          </Flex>
          <Flex
            wrap="wrap"
            justify="space-between"
            gap=".1rem"
            margin="10vh 0 0"
            direction={isMobile ? "column" : "row"}
          >
            {aiSuggestions?.loading ? (
              <Center>
                <Spinner size="40px" />
              </Center>
            ) : (
              aiSuggestions?.suggestions
                .slice(0, isMobile ? 3 : 9)
                .map((_, i) => (
                  <Sugestion
                    key={i}
                    onClick={() => {
                      setMessage(_);
                      if (!inputRef.current) return;
                      inputRef.current.autofocus = true;
                      inputRef.current.focus();
                    }}
                  >
                    <Text type="p" text={_.split("-")[0]} weight={500} />
                    <Text type="p" text={_.split("-")[1]} weight={300} />
                  </Sugestion>
                ))
            )}
          </Flex>
        </>
      )}
      <InputAndText>
        <InputContainer>
          <Input
            ref={inputRef}
            border="none"
            width="97%"
            readOnly={aiThinking}
            type="text"
            autoFocus
            placeholder="Enter a message"
            value={message}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmitOrClick();
            }}
            parentWidth="100%"
          />
          {!aiThinking && (
            <>
              {/* <Button background="transparent" width="50px">
              <BsMicFill size="1.1rem" color={`#606060`} />
            </Button> */}
              <Button background="transparent" width="50px">
                <IoSendSharp
                  size="1.1rem"
                  color={`#606060`}
                  onClick={handleSubmitOrClick}
                />
              </Button>
            </>
          )}
        </InputContainer>
        {isMobile && (
          <Text
            type="p"
            text="The AI Guide may display inaccurate or offensive information that doesn’t represent Thrillers Travels"
            weight={500}
            textAlign="center"
            size={13}
            margin=".5rem 0 0 0"
          />
        )}
      </InputAndText>
    </ChatAreaWrapper>
  );
}

export default ChatArea;
