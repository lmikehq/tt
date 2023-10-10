import Button from "@/components/atoms/button";
import Text from "@/components/atoms/text";
import Center from "@/components/templates/center";
import Flex from "@/components/templates/flex";
import { ttColors } from "@/lib/theme/colors";
import { Divider } from "@mui/material";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";
import { IoSendSharp } from "react-icons/io5";
import { styled } from "styled-components";

const ChatSessionsWrapper = styled.div`
  background-color: #fff;
  // height: 100vh;
  padding: 3rem 0 0;
`;

const RecentChats = styled.div`
  padding: 2rem 0;
  margin: 1rem 0;
  // overflow-y: scroll;
  max-height: calc(100vh - 200px);

  // &::-webkit-scrollbar {
  //   display: none;
  // }

  // -ms-overflow-style: none;
  // scrollbar-width: none;
`;

// const FeedBack = styled.div`
//   width: 100%;
//   height: 55px;
//   background: #ffffff;
//   color: ${ttColors.dark} !important;
//   border: 1px solid rgba(0, 0, 0, 0.24);
//   border-radius: 11px;

// `;

function ChatSessions({ setMessage }: { setMessage: (e: string) => void }) {
  // const { initialAiChats } = useAiChatStore();
  const initialAiChats = [
    "How long does Canada Visa take",
    "What is the meaning of Expat",
  ];
  return (
    <ChatSessionsWrapper>
      <Flex
        width="80%"
        direction="column"
        margin="0 auto"
        justify="space-between"
        height="95%"
      >
        <Flex direction="column">
          <Center>
            <Button background="#F3F3FF" width="100%" borderRadius="40px">
              <AiOutlinePlus size={20} color={ttColors.dark} /> &nbsp;
              <Text type="p" text="New Chat" color={ttColors.dark} />
            </Button>
          </Center>

          <RecentChats>
            <Text
              type="p"
              text="Frequently Asked Questions"
              color={ttColors.dark}
              weight={600}
              margin="1rem 0 2rem"
            />
            {initialAiChats?.map((chat, i) => (
              <>
                <Flex
                  align="center"
                  gap="1rem"
                  margin="1.2rem 0"
                  cursor="pointer"
                  key={i}
                  onClick={() => setMessage(chat)}
                >
                  <Text type="p" text={chat} />
                  <IoSendSharp size="20" />
                </Flex>
                <Divider />
              </>
            ))}
          </RecentChats>
        </Flex>
        <Button
          background="transparent"
          width="100%"
          color={`${ttColors.dark}`}
          height="50px"
          border="1px solid #06062A"
          onClick={() =>
            window.open("https://forms.gle/ZNKuSUq3jeGMRzDx6", "_blank")
          }
        >
          <AiOutlineCheck
            color={`${ttColors.dark}`}
            size="1.2rem"
            style={{ marginRight: "5px" }}
          />
          <Text type="p" text="Send feedback" size={15} />
        </Button>
      </Flex>
    </ChatSessionsWrapper>
  );
}

export default ChatSessions;
