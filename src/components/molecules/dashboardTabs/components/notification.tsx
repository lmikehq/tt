import Flex from "@components/templates/flex"
import NotificationItem from "@molecule/notificationItem"
import Section from "src/components/molecules/section"
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution"
import styled from "styled-components"
import { ttColors } from "@lib/theme/colors"
import VisaDashboardHeader from "./visaDashboardHeader"
import Center from "@/components/templates/center"
import NoApplication from "./noApplication"
import NoficationBellIcon from 'public/assets/icons/dashboard/no-notification-bell.svg'


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

  const content = {
    title: "You've got no Notification - Please come back later.",
    links: []
  }

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
          {/* FOR WHEN THERE IS NO NOTIFICATION - NO NOTIFICATION COMPONENT*/}
          {/* <Center margin={isMobile ? "3.5rem 0px" : "10rem 0"} height="25rem">
            <NoApplication noVisaImage={NoficationBellIcon} content={content} />
          </Center> */}

          <NotificationItem
            src={"/assets/images/notification/notice1.png"}
            title="Hi! You are expected to be in Our Ikota Office on Wednesday, Jan 3rd 2024 for a dine with the Ambassador, press conference and free visa presentation."
            date="24/12/23"
            time="10:11am"
            showDot
          />

        </Flex>
      </NotificationWrapper>
    </Section>
  )
}

export default Notification
