import Button from "@/components/atoms/button";
import Text from "@/components/atoms/text";
import Section from "@/components/molecules/section";
import { FieldInput, FieldString } from "@/components/organisms/fieldInput";
import Flex from "@/components/templates/flex";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { ttColors } from "@/lib/theme/colors";
import { Box, Dialog } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { PiMedalMilitaryFill } from "react-icons/pi";
import confetti from 'public/assets/images/dashboard/confetti.png';
import Image from "@/components/atoms/image";
import { useFetchReferralBanks, useReferralClaimReward, useVerifyOTP } from "@/lib/hooks/dashboard/referral.hook";
import { GetBankNamesProp } from "@/lib/types/response-models/dashboard";
import { FaSpinner } from "react-icons/fa";
import referralStore from "@/lib/store/dashboard/referrer.store";
import Spinner from "@/components/molecules/icons/spinner";
import { referralInfoSchema, referralInfoVal } from "@/lib/types/schema";
import ReferralService from "@/lib/services/dashboard/referral.service";

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
  const { referrerId, addReferrerInfo, referrerInfo } = referralStore((state) => state);
  const { isMobile } = useScreenResolution();
  const handleClose = () => {
    setState(false);
  };

  const { data, isLoading } = useFetchReferralBanks();
  const banks: GetBankNamesProp[] = data?.banks as GetBankNamesProp[];

  // console.log({ referrerId });
  // get the amount the person wants to claim
  const { data: referralAmountData, isLoading: referralAmountLoading } = useReferralClaimReward(referrerId);


  const formik = useFormik({
    initialValues: referralInfoVal,
    validationSchema: referralInfoSchema,
    onSubmit(values, formikHelpers) {
      addReferrerInfo({ accountName: values.accountName, accountNumber: values.accountNumber, bankName: values.bankName });
      // console.log('referral-info values', values);
      // console.log({ referrerInfo });

      if (setOpenOtpModal) {
        handleClose();
        setOpenOtpModal(true);
      }
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
          maxHeight: isMobile ? '550px' : '775px',
          overflow: 'auto'
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
        <Flex direction="column" align="center" justify="center" gap="1px" margin="0 0 34px">
          <Text type="p" text="Claim Rewards" size={isMobile ? 22 : 32} weight={600} />
          <Text type="p" size={isMobile ? 12 : 16} text="Fill in the following information to get rewarded" textAlign="center" color={ttColors.lighterGray} />
        </Flex>

        {/* <Flex direction="column" align="center" justify="center" gap="1px" margin="0 0 44px">
          {referralAmountLoading ? (
            <Spinner size="40px" fill={ttColors.primary} />
          ) : (
            <Text type="h4" text={referralAmountData?.price?.length > 1 ? referralAmountData : "NGN 20,000"} weight={600} size={isMobile ? 28 : 48} />
          )}
          <Text type="p" size={isMobile ? 12 : 16} text="Visa Application Referral Reward" color={ttColors.lighterGray} />
        </Flex> */}

        <form action="" onSubmit={formik.handleSubmit}>
          <Flex direction="column" gap="16px" align="center" justify="center">
            <Flex gap="12px" direction="column">
              <Text type="label" text="Bank Name" />
              {isLoading ? (
                <Flex align="center" justify="center">
                  <Spinner size="40px" fill={ttColors.primary} />
                </Flex>
              ) : (
                <FieldString
                  formik={formik}
                  name="bankName"
                  placeholder="Bank Name"
                  options={banks?.map((bank) => bank.name).sort((a, b) => a.localeCompare(b)).filter((name, index, self) => self.indexOf(name) === index)}
                  onChange={(e) => formik.setFieldValue('bankName', e)}
                  value={formik.values.bankName}
                />
              )}
            </Flex>

            <Flex gap="12px" direction="column">
              <Text type="label" text="Account Name" />
              <FieldInput name="accountName" placeholder="Enter Account Name" onChange={(e) => formik.setFieldValue('accountName', e.target.value)} formik={formik} value={formik.values.accountName} />
            </Flex>

            <Flex gap="12px" direction="column" margin="0 0 44px">
              <Text type="label" text="Account Number" />
              <FieldInput name="accountNumber" placeholder="Enter Account Number" onChange={(e) => formik.setFieldValue('accountNumber', e.target.value)} formik={formik} value={formik.values.accountNumber} />
            </Flex>

            <Button
              width="100%"
              type="submit"
              background={ttColors.dark}
            >
              <Text type="p" text="Claim Reward" weight={500} />
            </Button>
          </Flex>
        </form>
      </Section>
    </Dialog>
  );
};

let currentOTPIndex = 0;

export const ReferralOTPModal = ({ state, setState, setSubmissionModal }: ReferralModalProps) => {
  const { referrerInfo, referrerId } = referralStore((state) => state);
  const { isMobile } = useScreenResolution();
  const [otp, setOTP] = useState(['', '', '', '']);
  const [timer, setTimer] = useState<number>(30);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const inputRef = useRef<HTMLInputElement[] | null>([]);
  const [enable, setEnable] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            setIsTimerRunning(false);
            clearInterval(interval);
            return 0;
          } else {
            return prevTimer - 1;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);


  const handleClose = () => {
    setState(false);
  };

  const handleResendOTP = () => {
    console.log({ referrerInfo });
    setTimer(30);
    setIsTimerRunning(true);
    // CALL API TO RESEND OTP TO THE USER
  };

  // VERIFY OTP
  const { data, isLoading } = useVerifyOTP(otp.join(''), {
    accountName: referrerInfo.accountName,
    accountNumber: referrerInfo.accountNumber,
    bankName: referrerInfo.bankName,
    referrerId: referrerId
  });

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = target;

    const newOtp = [...otp];
    // allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOTP(newOtp);

    // submit trigger
    const combinedOTP = newOtp.join("");
    if (combinedOTP.length === 4) {
      setEnable(true);
    } else {
      setEnable(false);
    }

    // Move to next input if current field is filled
    if (value && index < otp.length - 1 && inputRef.current && inputRef.current[index + 1]) {
      inputRef.current[index + 1]?.focus();
    }
  };

  const handlekeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === 'Backspace' && !otp[index] && index > 0 && inputRef.current && inputRef.current[index - 1]) {
      inputRef.current[index - 1].focus();
    }
  };

  useEffect(() => {
    if (inputRef.current && inputRef.current[0]) {
      inputRef.current[0]?.focus();
    }
  }, []);

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
        <Flex direction="column" align="center" justify="center" gap="10px" margin="0 0 10px">
          <Text type="h3" text="OTP VERIFICATION" size={32} weight={600} />
          <Text
            type="p"
            text="Please check your Email for the code."
            color={ttColors.lighterGray}
            textAlign="center"
          />
        </Flex>
        <Flex align="center" justify="center" gap="2px" direction="column" margin="0 0 38px">
          <p>{timer === 0 ? <Text type="p" text="OTP has expired" color={ttColors.red} /> : <Text type="p" text={`Resend in ${timer} seconds`} />}</p>
          {timer === 0 ? (<Text type="p" text="Resend OTP" color="#007bff" cursor="pointer" onClick={handleResendOTP} />) : null}
        </Flex>

        <Flex margin="0 0 56px" gap="16px" align="center" justify="center">
          {otp.map((otp, index) => (
            <input
              key={index}
              ref={(input) => {
                if (inputRef.current && input) {
                  inputRef.current[index] = input;
                }
              }}
              type="text"
              className="otp-input"
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handlekeyDown(e, index)}
              value={otp[index]}
            />
          ))}
        </Flex>

        <Flex gap="40px" align="center" justify="center">
          <Button background="transparent" border={`1px solid ${ttColors.dark}`} onClick={() => handleClose()}>
            <Text type="p" text="Cancel" color={ttColors.dark} />
          </Button>

          <Button
            disabled={enable ? false : true}
            background={ttColors.dark}
            onClick={() => {
              handleClose();
              if (setSubmissionModal) {
                setSubmissionModal(true);
              }
            }}>
            <Text type="p" text="Verify" weight={500} />
          </Button>
        </Flex>
      </Section>
    </Dialog>
  );
};