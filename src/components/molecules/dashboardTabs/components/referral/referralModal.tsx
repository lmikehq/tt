import Button from "@/components/atoms/button"
import Text from "@/components/atoms/text"
import Section from "@/components/molecules/section"
import Flex from "@/components/templates/flex"
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution"
import { ttColors } from "@/lib/theme/colors"
import { Box, Dialog } from "@mui/material"
import { FaCircleCheck } from "react-icons/fa6"
import { IoMdClose } from "react-icons/io"
import { PiMedalMilitaryFill } from "react-icons/pi"

interface ReferralModalProps {
  state: boolean
  setState: React.Dispatch<React.SetStateAction<boolean>>
  setSubmissionModal?: React.Dispatch<React.SetStateAction<boolean>>
}

export const ReferralModal = ({ state, setState, setSubmissionModal }: ReferralModalProps) => {
  const isMobile = useScreenResolution()
  const handleClose = () => {
    setState(false)
  }

  const handleSubmissionModal = () => {
    if (setSubmissionModal) {
      handleClose()
      setSubmissionModal(true)
    }
  }

  return (
    <Dialog
      open={state}
      onClose={handleClose}
      aria-labelledby="claim-referral-bonus-modal"
      aria-describedby="claim referral bonus modal"
      sx={{
        fontFamily: 'nunito',
        '.css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
          borderRadius: '12px'
        }
      }}
    >
      <Flex align="center" justify="flex-end" padding={isMobile ? "20px 20px 0" : "20px 42px 0"}>
        <Flex
          align="center"
          justify="center"
          borderRadius="4px"
          background={ttColors.grayishAsh}
          styles={{ cursor: 'pointer' }}
          height="30px"
          width="30px"
          onClick={() => handleClose()}
        >
          <IoMdClose />
        </Flex>
      </Flex>

      <Box sx={{ padding: isMobile ? '35px 20px' : '35px 62px' }}>
        <Flex align="center" justify="center" direction="column">
          <PiMedalMilitaryFill size={95} />
          <Text type="h4" text="Referral Claim" weight={700} size={32} />
        </Flex>

        <Section margin="24px 0 56px">
          <Flex direction="column" align="center" justify="center">
            <Text type="p" text='Dear Jonathan Adah' weight={500} />
            <Text
              type="p"
              text={`Are you sure you want to claim the rewards for the 5 Referrals?`}
              weight={400}
              styles={{ textAlign: 'center' }}
              color={ttColors.lighterGray}
            />
          </Flex>
        </Section>

        <Flex direction="row" gap="40px" align="center" justify="center">
          <Button height="56px" width="192px" background="#FFF" border={`1px solid ${ttColors.gray}`} onClick={() => handleClose()}>
            <Text type='p' text='No Thanks' weight={500} color={ttColors.dark} />
          </Button>

          <Button height="56px" width="192px" background={ttColors.dark} onClick={handleSubmissionModal}>
            <Text type="p" text="Yes" weight={500} />
          </Button>
        </Flex>
      </Box>
    </Dialog>
  )
}

export const ReferralSubmissionModal = ({ state, setState }: ReferralModalProps) => {
  const { isMobile } = useScreenResolution()

  const handleClose = () => {
    setState(false)
  }

  return (
    <Dialog
      open={state}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        fontFamily: 'nunito',
        '.css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
          borderRadius: '12px'
        }
      }}
    >
      <Flex align="center" justify="flex-end" padding={isMobile ? "20px 20px 0" : "20px 42px 0"}>
        <Flex
          align="center"
          justify="center"
          borderRadius="4px"
          background={ttColors.grayishAsh}
          styles={{ cursor: 'pointer' }}
          height="30px"
          width="30px"
          onClick={() => handleClose()}
        >
          <IoMdClose />
        </Flex>
      </Flex>

      <Box sx={{ padding: isMobile ? '35px 20px' : '35px 62px' }}>
        <div style={{ padding: isMobile ? '0px' : '20px', fontFamily: 'inter', paddingTop: '0px', marginTop: '0px' }} className='submission-successful-confetti-bg'>
          <Flex align="center" justify="center">
            <FaCircleCheck size={95} color='#6092A7' />
          </Flex>

          <Flex align="center" justify="center" gap="32px" direction="column" margin="0 0 56px">
            <Text type="h1" text='Reward Claimed' weight={700} size={32} styles={{ textAlign: 'center' }} />
            <Text
              type='p'
              text={
                `Congratulations!!.
                Your Reward has been claimed. You will receive a mail shortly on the next step to be taken on the reward you just claimed.`
              }
              styles={{ textAlign: 'center' }}
              color={ttColors.lighterGray}
            />
          </Flex>

          <Button height="56px" width="100%" background={ttColors.dark} onClick={handleClose}>
            <Text type="p" text='Return to Dashboard' weight={500} />
          </Button>
        </div>
      </Box>
    </Dialog>
  )
}