import React from "react"
import styled from 'styled-components'
import { Box, Dialog } from "@mui/material"
import { FaCircleCheck } from "react-icons/fa6"
import { IoMdClose } from "react-icons/io"
import Button from "@/components/atoms/button"
import Text from "@/components/atoms/text"
import Flex from "@/components/templates/flex"
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution"
import { ttColors } from "@/lib/theme/colors"
import confetti from 'public/assets/images/dashboard/confetti.png'
import Image from "@/components/atoms/image"
import Section from "../../section"
import { usePathname } from "next/navigation"

const ApplicationStatusModalContainer = styled(Dialog)`
  .css-1t1j96h-MuiPaper-root-MuiDialog-paper {
    border-radius: 12px;
    width: 647px;
    max-width: 647px;
  }

`

interface Props {
  state: boolean
  setState: React.Dispatch<React.SetStateAction<boolean>>
  openPaymentModal: React.Dispatch<React.SetStateAction<boolean>>
}
export const ApplicationStatus = ({ state, setState, openPaymentModal }: Props) => {
  const { isMobile } = useScreenResolution()
  const handleClose = () => {
    setState(false)
  }
  const pathname = usePathname()

  const handlePayment = () => {
    openPaymentModal(true)
    // handleClose()
  }

  // DON'T SHOW THE APPLICATION STATUS MODAL
  if (pathname.startsWith(`/dashboard/visa-application`)) return null

  return (
    <ApplicationStatusModalContainer
      onClose={handleClose}
      open={state}
    >

      <Flex align="center" justify="flex-end" padding={isMobile ? "20px 20px 0" : "20px 42px 0"}>
        <Section styles={{ position: 'absolute', overflow: 'hidden', top: 0, right: 0, left: 0 }}>
          <Image src={confetti} alt="confetti-celebration-successful" styles={{ objectFit: 'cover', overflow: 'hidden', zIndex: -2 }} />
        </Section>
        <Flex
          align="center"
          justify="center"
          borderRadius="4px"
          styles={{ cursor: 'pointer', zIndex: 5 }}
          height="30px"
          width="30px"
          onClick={() => handleClose()}
          position="relative"
        >
          <Flex
            background={ttColors.grayishAsh}
            height="30px"
            width="30px"
            align="center"
            justify="center"
          >
            <IoMdClose />
          </Flex>
        </Flex>
      </Flex>

      <Box sx={{ padding: isMobile ? '0 24px 20px' : '0 74px 41px', position: 'relative' }}>
        <Flex position="relative" styles={{ zIndex: 5 }} direction="column" gap="16px" align="center" justify="center" margin="0 0 22px">
          <Flex align="center" justify="center">
            <FaCircleCheck size={95} color='#6092A7' />
          </Flex>
          <Text type='h1' text='Application Successful' weight={600} size={isMobile ? 22 : 32} />
        </Flex>

        <Flex direction='column' gap='4px' align='center' justify='center' margin='0 0 44px'>
          <Text type="p" text="Congratulations!!." size={isMobile ? 14 : 16} textAlign="center" color={ttColors.lighterGray} />
          <Text
            type='p'
            text={`Your Documents have been submitted and is currently being reviewed. Your Documents will be saved on your dashboard for 30 days and you are permitted to download once. `} weight={400}
            size={isMobile ? 14 : 16}
            color={ttColors.lighterGray}
            textAlign="center"
          />
        </Flex>

        <Flex align="center" gap="12px">
          <a href='/dashboard/visa-application/1' target="_blank" referrerPolicy="no-referrer" style={{ width: '100%' }}>
            <Button background={'transparent'} width='100%' border={`1px solid ${ttColors.dark}`} onClick={() => { }}>
              <Text type='p' text='Download Application' weight={500} color={ttColors.dark} />
            </Button>
          </a>

          <Button background={ttColors.dark} width='100%' onClick={handlePayment}>
            <Text type='p' text='Pay Processing Fee' weight={500} />
          </Button>
        </Flex>
      </Box>
    </ApplicationStatusModalContainer>
  )
}