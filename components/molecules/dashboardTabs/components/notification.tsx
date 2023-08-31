import Flex from "@atom/flex";
import NotificationItem from "@atom/notificationItem";
import NotificationImg1 from "@image/notification/notice1.png";
import Section from "@molecule/section";
import { useScreenResolution } from "hook/useScreenResolution";
import styled from "styled-components";
import { ttColors } from "theme/colors";
import VisaDashboardHeader from "./visaDashboardHeader";

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
        padding: ".25rem 1.5rem 3rem",
      }}
    >
      <VisaDashboardHeader headerText="Notifications" />

      <NotificationWrapper>
        <Flex direction="column" gap="1rem">
          <NotificationItem
            src={NotificationImg1}
            title="Application fee for Canada - Employment visa"
            date="25/08/23"
            time="10:11am"
            showDot
          />

          {/* <NotificationItem
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
          /> */}
        </Flex>
      </NotificationWrapper>
    </Section>
  );
};

export default Notification;
