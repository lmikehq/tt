import Flex from "@components/templates/flex"
import NotificationItem from "@molecule/notificationItem"
import Section from "src/components/molecules/section"
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution"
import styled from "styled-components"
import { ttColors } from "@lib/theme/colors"
import VisaDashboardHeader from "./visaDashboardHeader"

const NotificationWrapper = styled.div`
  background: ${ttColors.defaultColor};
  align-items: center;
  margin-top: 15px;

  @media screen and (max-width: 900px) {
    height: fit-content;
    padding: 20px 16px;
  }
`

const Notification = () => {
  const { isMobile } = useScreenResolution()

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
          {/* {!isMobile && ( */}
          <NotificationItem
            src={"/assets/images/notification/notice1.png"}
            title="Hi! You are expected to be in Our Ikota Office on Wednesday, Jan 3rd 2024 for a dine with the Ambassador, press conference and free visa presentation."
            date="24/12/23"
            time="10:11am"
            showDot
          />
          {/* )} */}

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
  )
}

export default Notification
