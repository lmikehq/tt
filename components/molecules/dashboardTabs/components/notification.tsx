import styled from "styled-components";
import Text from "@atom/text";
import { ttColors } from "theme/colors";
import Flex from "@atom/flex";
import { Grid } from "@atom/grid";
import Button from "@atom/button";
import { useScreenResolution } from "hook/useScreenResolution";
import { FaFileDownload } from "react-icons/fa";
import VisaDashboardHeader from "./visaDashboardHeader";
import Section from "@molecule/section";
import { BiDotsVerticalRounded } from "react-icons/bi";
import NotificationImg1 from "@image/notification/notice1.png";
import NotificationImg2 from "@image/notification/notice2.png";
import Image from "@atom/image";
import { GoDotFill } from "react-icons/go";
import NotificationItem from "@atom/notificationItem";

const SectionTitle = styled.div`
  display: flex;

  & h2 {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    margin: 20px 0px 15px;
    line-height: 48px;
    /* identical to box height */

    color: ${ttColors.dark};
    @media screen and (max-width: 390px) {
      margin: 0px 0px -4px !important;
    }
  }
`;

const History = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  width: 100%;
  height: fit-content;
  padding: 0px 10px;
  border: 1px solid #e7e7e7;
  border-radius: 14px;

  & div {
    // margin-left: 15px;

    @media screen and (max-width: 390px) {
      margin-left: 0px;
    }
  }

  & p {
    font-weight: 400;
    line-height: 20px;
    color: ${ttColors.dark};
    opacity: 0.7;
  }

  & h3 {
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: ${ttColors.dark};
  }

  & button {
    width: 166px;
    height: 48px;
    marginleft: 55px;
  }
`;

const HistoryItems = styled.div`
  border: 1px solid #e7e7e7;
  padding: 20px;
  width: 100%;
  border-radius: 28px;
`;

const NotificationWrapper = styled.div`
  background: ${ttColors.defaultColor};
  align-items: center;
  margin-top: 15px;

 

  @media screen and (max-width: 900px) {
    height: fit-content;
    padding: 20px 16px;
  }
`;

const Notification = () => {
  const { isMobile } = useScreenResolution();

  return (
    <Section
      margin="2rem 0"
      styles={{
        background: "#fff",
        borderRadius: "14px",
        padding: "2.5rem 1.5rem",
      }}
    >
      <VisaDashboardHeader headerText="Notifications" />

      <NotificationWrapper>
        <Flex direction="column" gap="1rem">
          {/* <History>
            <Flex
              justify="space-between"
              width="100%"
              gap="20px"
              align="center"
              padding="28px 24px"
            >
              <Flex gap="1.5rem" align="center">
                <Image src={NotificationImg1} alt="" />
                <div>
                  <Text
                    type="h3"
                    text="Application fee for Canada - Employment visa"
                    margin="0px 0px .8rem"
                  />
                  <Flex gap=".8rem">
                    <Text
                      type="p"
                      text="25/08/23"
                      color="#606060"
                      weight={600}
                      size={16}
                      styles={{
                        letterSpacing: "0.1rem",
                      }}
                    />
                    <Text
                      type="p"
                      text="10:11am"
                      color="#606060"
                      weight={600}
                      size={16}
                      styles={{
                        letterSpacing: "0.1rem",
                      }}
                    />
                  </Flex>
                </div>
                <GoDotFill color="#7BBBD6" />
              </Flex>

              <Button
                height="43px"
                width="43px !important"
                styles={{ marginLeft: "55px" }}
                background="transparent"
                border="1px solid #B6B6B6"
              >
                <BiDotsVerticalRounded color="#040404" />
              </Button>
            </Flex>
          </History> */}

          <NotificationItem
            src={NotificationImg1}
            title="Application fee for Canada - Employment visa"
            date="25/08/23"
            time="10:11am"
            showDot
          />

          <NotificationItem
            src={NotificationImg2}
            title="Another notification"
            date="26/08/23"
            time="2:30pm"
            showDot={false}
          />

          <NotificationItem
            src={NotificationImg1}
            title="Application fee for Canada - Employment visa"
            date="25/08/23"
            time="10:11am"
            showDot
          />

          <NotificationItem
            src={NotificationImg2}
            title="Another notification"
            date="26/08/23"
            time="2:30pm"
            showDot={false}
          />
        </Flex>
      </NotificationWrapper>
    </Section>
  );
};

export default Notification;
