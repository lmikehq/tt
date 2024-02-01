import Button from "@/components/atoms/button";
import Text from "@/components/atoms/text";
import Section from "@/components/molecules/section";
import { FieldInput, FieldString } from "@/components/organisms/fieldInput";
import Flex from "@/components/templates/flex";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { ttColors } from "@/lib/theme/colors";
import { Box, Dialog } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { PiMedalMilitaryFill } from "react-icons/pi";
import confetti from 'public/assets/images/dashboard/confetti.png';
import Image from "@/components/atoms/image";

interface ReferralModalProps {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenAccountModal?: React.Dispatch<React.SetStateAction<boolean>>;
  setSubmissionModal?: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenOtpModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ReferralModal = ({ state, setState, setOpenAccountModal }: ReferralModalProps) => {
  const isMobile = useScreenResolution();
  const handleClose = () => {
    setState(false);
  };

  const handleSubmissionModal = () => {
    if (setOpenAccountModal) {
      handleClose();
      setOpenAccountModal(true);
    }
  };

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
  );
};

export const ReferralSubmissionModal = ({ state, setState }: ReferralModalProps) => {
  const { isMobile } = useScreenResolution();

  const handleClose = () => {
    setState(false);
  };

  return (
    <Dialog
      open={state}
      onClose={handleClose}
      aria-labelledby="account-submission-successful"
      aria-describedby="your-reward-has-been-claimed-you-will-recieve-a-mail-shortly."
      sx={{
        fontFamily: 'nunito',
        '.css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
          borderRadius: '12px'
        }
      }}
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
  );
};

export const ReferralUserBankAccountModal = ({ state, setState, setOpenOtpModal }: ReferralModalProps) => {
  const { isMobile } = useScreenResolution();
  const handleClose = () => {
    setState(false);
  };

  const formik = useFormik({
    initialValues: {},
    validationSchema: {},
    onSubmit(values, formikHelpers) {
      // 
    },
  });

  return (
    <Dialog
      open={state}
      onClose={handleClose}
      aria-labelledby="claim-rewards-modal"
      aria-describedby="fill-in-the-following-form-to-claim-your-reward"
      sx={{
        fontFamily: 'nunito',
        '.css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
          borderRadius: '12px',
          width: '647px',
          maxWidth: '647px',
          // padding: '20px 89px 40px'
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

      <Section padding={isMobile ? '0 20px 40px' : '0 89px 40px'}>
        <Flex direction="column" align="center" justify="center" gap="10px" margin="0 0 34px">
          <Text type="p" text="Claim Rewards" size={32} weight={600} />
          <Text type="p" text="Fill in the following information to get rewarded" textAlign="center" color={ttColors.lighterGray} />
        </Flex>

        <Flex direction="column" align="center" justify="center" gap="10px" margin="0 0 44px">
          <Text type="h4" text="NGN 20,000" weight={600} size={48} />
          <Text type="p" text="Visa Application Referral Reward" color={ttColors.lighterGray} />
        </Flex>

        <form action="">
          <Flex direction="column" gap="16px" align="center" justify="center">
            <Flex gap="12px" direction="column">
              <Text type="label" text="Bank Name" />
              <FieldString
                formik={formik}
                name="bankName"
                placeholder="Bank Name"
                options={['Access Bank']}
              />
            </Flex>

            <Flex gap="12px" direction="column">
              <Text type="label" text="Account Name" />
              <FieldInput name="" placeholder="Enter Account Name" />
            </Flex>

            <Flex gap="12px" direction="column" margin="0 0 44px">
              <Text type="label" text="Account Number" />
              <FieldInput name="" placeholder="Enter Account Number" />
            </Flex>

            <Button
              width="100%"
              background={ttColors.dark}
              onClick={() => {
                handleClose();

                if (setOpenOtpModal) {
                  setOpenOtpModal(true);
                }
              }}
            >
              <Text type="p" text="Claim Reward" />
            </Button>
          </Flex>
        </form>
      </Section>
    </Dialog>
  );
};

export const ReferralOTPModal = ({ state, setState, setSubmissionModal }: ReferralModalProps) => {
  const { isMobile } = useScreenResolution();

  const handleClose = () => {
    setState(false);
  };

  return (
    <Dialog
      open={state}
      onClose={handleClose}
      aria-labelledby="claim-rewards-modal"
      aria-describedby="fill-in-the-following-form-to-claim-your-reward"
      sx={{
        fontFamily: 'nunito',
        '.css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
          borderRadius: '12px',
          width: '523px',
          maxWidth: '523px',
          // padding: '20px 89px 40px'
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

      <Section padding={isMobile ? '0 20px 40px' : "0 50px 40px"}>
        <Flex direction="column" align="center" justify="center" gap="10px" margin="0 0 38px">
          <Text type="h3" text="OTP VERIFICATION" size={32} weight={600} />
          <Text
            type="p"
            text="We've just sent a one-time verification code to your registered Email Address. Please check your mail shortly for the code."
            color={ttColors.lighterGray}
            textAlign="center"
          />
        </Flex>

        <Flex margin="0 0 56px" gap="16px" align="center" justify="center">
          <input type="text" className="otp-input" />
          <input type="text" className="otp-input" />
          <input type="text" className="otp-input" />
          <input type="text" className="otp-input" />
        </Flex>

        <Flex gap="40px" align="center" justify="center">
          <Button background="transparent" border={`1px solid ${ttColors.dark}`} onClick={() => handleClose()}>
            <Text type="p" text="Cancel" color={ttColors.dark} />
          </Button>

          <Button
            background={ttColors.dark}
            onClick={() => {
              handleClose();
              if (setSubmissionModal) {
                setSubmissionModal(true);
              }
            }}>
            <Text type="p" text="Verify" />
          </Button>
        </Flex>
      </Section>
    </Dialog>
  );
};