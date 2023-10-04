import Button from "@/components/atoms/button";
import Text from "@/components/atoms/text";
import Center from "@/components/templates/center";
import Flex from "@/components/templates/flex";
import { ttColors } from "@/lib/theme/colors";
import MessageIcon from "public/assets/icons/messageIcon";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { styled } from "styled-components";

const ChatSessionsWrapper = styled.div`
  background-color: #fff;
  // height: 100vh;
  padding: 3rem 0;
`;

const RecentChats = styled.div`
  padding: 2rem 0;
`;

function ChatSessions() {
  return (
    <ChatSessionsWrapper>
      <Flex width="80%" direction="column" margin="0 auto">
        <Center>
          <Button background="#F3F3FF" width="100%" borderRadius="40px">
            <AiOutlinePlus size={20} color={ttColors.dark} /> &nbsp;
            <Text type="p" text="New Chat" color={ttColors.dark} />
          </Button>
        </Center>

        <RecentChats>
          <Text type="p" text="Recent" color={ttColors.dark} />
          <Flex align="center" gap="1rem" margin="1.2rem 0" cursor="pointer">
            <MessageIcon size="40" />
            <Text type="p" text="Start a chat" />
          </Flex>
        </RecentChats>
      </Flex>
    </ChatSessionsWrapper>
  );
}

export default ChatSessions;
