import styled from "styled-components"
import Text from "@atom/text"
import Button from "@atom/button"
import Section from "@molecule/section"
import Image from "@atom/image"
import Referral1 from "@image/dashboard/referral1.png"
import Referral2 from "@image/dashboard/referral2.png"
import Referral3 from "@image/dashboard/referral3.png"
import { BsThreeDotsVertical } from "react-icons/bs"
import CustomDrawer from "@molecule/drawers/customDrawer"
import { useState } from "react"
import { Divider } from "@atom/divider"
import { GrFormClose } from "react-icons/gr"
import { ttColors } from "@lib/theme/colors"
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution"
import Flex from "@components/templates/flex"
import VisaDashboardHeader from "./visaDashboardHeader"
import { ReferralModal, ReferralSubmissionModal } from "./referral/referralModal"
import Center from "@/components/templates/center"
import NoApplication from "./noApplication"
import NoReferralImg from 'public/assets/icons/dashboard/no-referral.svg'

const Referral = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 100%;
  height: fit-content;
  padding: 1rem 0.3rem;

  background: #ffffff;
  //   box-shadow: 0px 4px 16px rgba(17, 34, 17, 0.05);
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);
  border-radius: 16px;

  // & div {
  //   margin-left: 0px;
  //   @media screen and (max-width: 390px) {
  //     margin-left: 0px;
  //   }
  // }

  & p {
    font-weight: 400;
    font-size: 16px;
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
    width: 57px !important;
    // height: 38px;
    margin-left: 10px !important;

    @media screen and (max-width: 390px) {
      margin-left: -14px !important;
      width: 48px !important;
    }
  }
  @media screen and (max-width: 390px) {
    border-radius: 8px;
  }
`

const ReferralWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: fit-content;
`

const Referrals = () => {
  const { isMobile } = useScreenResolution()
  const [bottomDrawerOpen, setBottomDrawerOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [openSubmissionModal, setOpenSubmissionModal] = useState(false)

  const referral = {
    referralStatus: 'Claimed'
  }

  const textAndBgColor = () => {
    switch (referral.referralStatus) {
      case 'Claimed':
        return { text: "#0CAF60", bg: "#E7F7EF" }
      case 'Unclaimed':
        return { text: "#614909", bg: "#FFF1C2" }
      default:
        return { text: "#614909", bg: "#FFF1C2" }
    }
  }

  const referralArr: number[] = [2]

  const content = {
    title: `You've got no Referral - Refer people and start earning`,
    links: []
  }

  return (
    <Section
      margin="2rem 0"
      styles={{
        background: "#fff",
        borderRadius: isMobile ? "10px" : "20px",
        padding: ".5rem 1.5rem",
      }}
    >
      <VisaDashboardHeader headerText="Referrals" />

      {referralArr.length > 0 ? (
        <ReferralWrapper>
          {[0, 1].map((key, index) => {
            return (
              <Flex
                key={key}
                justify="space-between"
                align="center"
                gap=".5rem"
                padding={isMobile ? "20px" : "16px"}
                width="100%"
                border="1px solid #e7e7e7"
                borderRadius=" 14px"
                borderBottom="1px solid #e7e7e7"
                margin="0 20px"
              >
                <Flex
                  width={isMobile ? "3%" : "5%"}
                  align={isMobile ? "flex-start" : "center"}
                >
                  <Image
                    src="/assets/images/dashboard/referral1.png"
                    alt=""
                    width={isMobile ? 30 : 64}
                    height={isMobile ? 30 : 64}
                  />
                </Flex>

                <Flex
                  justify="flex-start"
                  direction={isMobile ? "column" : "row"}
                  align={isMobile ? "flex-start" : "center"}
                  gap={isMobile ? ".1rem" : "3.5rem"}
                  width="45%"
                >
                  <Text
                    type="h3"
                    text="Adah Jonathan"
                    size={isMobile ? 14 : 16}
                    weight={600}
                    width="max-content"
                  />
                  <Text
                    type="p"
                    text="Jonathanadah@gmail.com"
                    size={isMobile ? 12 : 16}
                    weight={400}
                  />
                </Flex>

                <Text
                  type="p"
                  text="23/04/2023"
                  size={16}
                  weight={400}
                  width="10%"
                  styles={{ display: isMobile ? "none" : "block" }}
                />

                <Flex
                  justify="flex-end"
                  gap={isMobile ? "1rem" : "0rem"}
                  align="center"
                  width="30%"
                >
                  <Text
                    type="p"
                    text="Claimed"
                    size={isMobile ? 11 : 16}
                    weight={400}
                  />
                  <Button
                    width="max-content"
                    height="48px"
                    padding="5px 20px"
                    color={textAndBgColor().text}
                    background={textAndBgColor().bg}
                    fontWeight="500"
                    styles={{
                      marginLeft: "55px",
                      borderRadius: "24px",
                      display: isMobile ? "none" : "block",
                    }}
                  >
                    Successful
                  </Button>

                  <BsThreeDotsVertical
                    size="1rem"
                    style={{ display: isMobile ? "block" : "none" }}
                    onClick={() => setBottomDrawerOpen(true)}
                  />
                  <CustomDrawer
                    anchor="bottom"
                    open={bottomDrawerOpen}
                    onClose={() => setBottomDrawerOpen(false)}
                  >
                    <Section
                      height="unset"
                      padding={"1.125rem 1.125rem 3.5rem 1.125rem"}
                      styles={{
                        background: ttColors.light,
                      }}
                    >
                      <Flex justify="space-between" align="center">
                        <Flex justify="flex-start" gap="1rem" align="center">
                          <Image
                            src="/assets/images/dashboard/referral1.png"
                            alt=""
                            width={40}
                            height={40}
                          />
                          <Text
                            type="h3"
                            text="Adah Jonathan"
                            size={16}
                            weight={600}
                            width="max-content"
                            color="#112211"
                          />
                        </Flex>
                        <GrFormClose />
                      </Flex>
                      <Divider direction="horizontal" margin="0px 0px 1rem" />
                      <Flex gap="1rem" direction="column">
                        <Flex justify="space-between" align="center">
                          <Text
                            type="h3"
                            text="Email"
                            size={16}
                            weight={500}
                            width="max-content"
                            color="#000000"
                          />
                          <Text
                            type="h3"
                            text="Jonathanadah @gmail.com"
                            size={isMobile ? 12 : 16}
                            weight={400}
                            width="max-content"
                            color="#5C5C5C"
                          />
                        </Flex>

                        <Flex justify="space-between" align="center">
                          <Text
                            type="h3"
                            text="Date"
                            size={16}
                            weight={500}
                            width="max-content"
                            color="#000000"
                          />
                          <Text
                            type="h3"
                            text="23/04/2023"
                            size={isMobile ? 12 : 16}
                            weight={400}
                            width="max-content"
                            color="#5C5C5C"
                          />
                        </Flex>

                        <Flex justify="space-between" align="center">
                          <Text
                            type="h3"
                            text="Claim Status"
                            size={16}
                            weight={500}
                            width="max-content"
                            color="#000000"
                          />
                          <Text
                            type="h3"
                            text="Claim Status"
                            size={isMobile ? 12 : 16}
                            weight={400}
                            width="max-content"
                            color="#5C5C5C"
                          />
                        </Flex>

                        <Flex justify="space-between" align="center">
                          <Text
                            type="h3"
                            text="Referral Status"
                            size={16}
                            weight={500}
                            width="max-content"
                            color="#000000"
                          />
                          <Button
                            width="max-content"
                            height="48px"
                            padding="5px 20px"
                            color={textAndBgColor().text}
                            background={textAndBgColor().bg}
                            styles={{
                              marginLeft: "55px",
                              borderRadius: "24px",
                              display: isMobile ? "block" : "none",
                            }}
                          >
                            <Text type="p" text="Successful" size={14} weight={600} />
                          </Button>
                        </Flex>
                      </Flex>
                    </Section>
                  </CustomDrawer>
                </Flex>
              </Flex>
            )
          })}
          <Button width={isMobile ? '300px' : "503px"} height="60px" background={ttColors.blackishBlue} styles={{ margin: "1.5rem 0px" }} onClick={() => setOpenModal(true)}>
            <Text type="p" size={14} text="Claim 5 Referrals" weight={600} />
          </Button>
        </ReferralWrapper>
      ) : (
        <Center>
          <NoApplication noVisaImage={NoReferralImg} content={content} />
        </Center>
      )}

      {openModal && (
        <ReferralModal
          state={openModal}
          setState={setOpenModal}
          setSubmissionModal={setOpenSubmissionModal}
        />
      )}

      {openSubmissionModal && (
        <ReferralSubmissionModal
          state={openSubmissionModal}
          setState={setOpenSubmissionModal}
        />
      )}

    </Section>
  )
}

export default Referrals
