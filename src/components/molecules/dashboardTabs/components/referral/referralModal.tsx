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
import { useFetchReferralBanks, useSendOTP, useVerifyOTP } from "@/lib/hooks/dashboard/referral.hook";
import { GetBankNamesProp } from "@/lib/types/response-models/dashboard";
import { FaSpinner } from "react-icons/fa";
import referralStore from "@/lib/store/dashboard/referrer.store";
import Spinner from "@/components/molecules/icons/spinner";
import { referralInfoSchema, referralInfoVal } from "@/lib/types/schema";
import ReferralService from "@/lib/services/dashboard/referral.service";
import { useUserStore } from "@/lib/store/useStore";
import toast from "react-hot-toast";
import ReusableModal from "../dashboardModal";
import { RefetchProp } from "types";

interface ReferralModalProps {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenAccountModal?: React.Dispatch<React.SetStateAction<boolean>>;
  setSubmissionModal?: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenOtpModal?: React.Dispatch<React.SetStateAction<boolean>>;
  refetch?: RefetchProp;
}

export const ReferralModal = ({ state, setState, setOpenAccountModal }: ReferralModalProps) => {
  const { referrerPersonalInfo } = referralStore((state) => state);
  const { user } = useUserStore((state) => state);

  const { isMobile } = useScreenResolution();
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
    <ReusableModal
      open={state}
      onClose={handleClose}
      headerText=""
      description=""
      maxWidth={isMobile ? "90%" : "647px"}
      width={isMobile ? "90%" : "647px"}
      showButton={false}
    >
      <Box>
        <Flex align="center" justify="center" direction="column">
          <PiMedalMilitaryFill size={95} />
          <Text type="h4" text="Referral Claim" weight={700} size={32} />
        </Flex>

        <Section margin="24px 0 56px">
          <Flex direction="column" align="center" justify="center">
            <Text type="p" text={`Dear ${user?.firstName}`} weight={500} textAlign="center" margin="0 0 10px" />
            <Text
              type="p"
              text={`Are you sure you want to claim the rewards for the referral of`}
              weight={400}
              styles={{ textAlign: 'center' }}
              color={ttColors.lighterGray}
              margin={0}
            />
            <Text type="p" text={`${referrerPersonalInfo.name}?`} weight={500} textAlign="center" color={ttColors.dark} margin={0} />
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
    </ReusableModal>
  );
};

// export const ReferralSubmissionModal = ({ state, setState }: ReferralModalProps) => {
//   const { isMobile } = useScreenResolution();

//   const handleClose = () => {
//     setState(false);
//   };

//   return (
//     <Dialog
//       open={state}
//       onClose={handleClose}
//       aria-labelledby="account-submission-successful"
//       aria-describedby="your-reward-has-been-claimed-you-will-recieve-a-mail-shortly."
//       sx={{
//         fontFamily: 'nunito',
//         '.css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
//           borderRadius: '12px',
//           width: isMobile ? "90%" : "647px",
//           maxWidth: isMobile ? "90%" : "647px"
//         }
//       }}
//     >
//       <Box sx={{ width: isMobile ? "90%" : "647px", maxWidth: isMobile ? "90%" : "647px", backgroundColor: "#FFF", borderRadius: '12px' }}>
//         <Flex align="center" justify="flex-end" padding={isMobile ? "20px 20px 0" : "20px 42px 0"}>
//           <Section styles={{ position: 'absolute', overflow: 'hidden', top: 0, right: 0, left: 0 }}>
//             <Image src={confetti} alt="confetti-celebration-successful" styles={{ objectFit: 'cover', overflow: 'hidden', zIndex: -2 }} />
//           </Section>
//           <Flex
//             align="center"
//             justify="center"
//             borderRadius="4px"
//             styles={{ cursor: 'pointer', zIndex: 5 }}
//             height="30px"
//             width="30px"
//             onClick={() => handleClose()}
//             position="relative"
//           >
//             <Flex
//               background={ttColors.grayishAsh}
//               height="30px"
//               width="30px"
//               align="center"
//               justify="center"
//             >
//               <IoMdClose />
//             </Flex>
//           </Flex>
//         </Flex>

//         <Box sx={{ padding: isMobile ? '35px 20px' : '35px 62px' }}>
//           <div style={{ padding: isMobile ? '0px' : '20px', fontFamily: 'inter', paddingTop: '0px', marginTop: '0px' }} className='submission-successful-confetti-bg'>
//             <Flex align="center" justify="center">
//               <FaCircleCheck size={95} color='#6092A7' />
//             </Flex>

//             <Flex align="center" justify="center" gap="32px" direction="column" margin="0 0 56px">
//               <Text type="h1" text='Reward Claimed' weight={700} size={32} styles={{ textAlign: 'center' }} />
//               <Text
//                 type='p'
//                 text={
//                   `Congratulations!!.
//                 Your Reward has been claimed. You will receive a mail shortly on the next step to be taken on the reward you just claimed.`
//                 }
//                 styles={{ textAlign: 'center' }}
//                 color={ttColors.lighterGray}
//               />
//             </Flex>

//             <Button height="56px" width="100%" background={ttColors.dark} onClick={handleClose}>
//               <Text type="p" text='Return to Dashboard' weight={500} />
//             </Button>
//           </div>
//         </Box>
//       </Box>
//     </Dialog>
//   );
// };

export const ReferralUserBankAccountModal = ({ state, setState, setOpenOtpModal }: ReferralModalProps) => {
  const { addReferrerBankInfo, referrerBankInfo, referrerPersonalInfo } = referralStore((state) => state);
  const { isMobile } = useScreenResolution();
  const handleClose = () => {
    setState(false);
  };

  const { data, isLoading } = useFetchReferralBanks();
  const banks: GetBankNamesProp[] = data?.banks as GetBankNamesProp[];

  // get the amount the person wants to claim
  // const { data: referralAmountData, isLoading: referralAmountLoading } = useSendOTP(referrerPersonalInfo.referrerId);


  const formik = useFormik({
    initialValues: referralInfoVal,
    validationSchema: referralInfoSchema,
    async onSubmit(values, formikHelpers) {
      addReferrerBankInfo({ accountName: values.accountName, accountNumber: values.accountNumber, bankName: values.bankName });
      // SEND THE OTP TO THE USER
      const res = await ReferralService.getOTP(referrerPersonalInfo.id);
      if (res.success === true) {
        // TOAST OTP SENT
        toast.success('Check your email for OTP!');
      }

      if (setOpenOtpModal) {
        handleClose();
        setOpenOtpModal(true);
      }
    },
  });

  return (
    <ReusableModal
      open={state}
      onClose={handleClose}
      headerText="Claim Rewards"
      description="Fill in the following information to get rewarded"
      showButton={false}
      maxWidth={isMobile ? "90%" : "647px"}
      width={isMobile ? "90%" : "647px"}
    >
      <Section>
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
    </ReusableModal>

  );
};


export const ReferralOTPModal = ({ state, setState, setSubmissionModal, refetch }: ReferralModalProps) => {
  const { referrerBankInfo, referrerPersonalInfo } = referralStore((state) => state);
  const { isMobile } = useScreenResolution();
  const [otp, setOTP] = useState(['', '', '', '']);
  const [timer, setTimer] = useState<number>(10 * 60);
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

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };


  const handleClose = () => {
    setState(false);
  };

  const handleResendOTP = async () => {
    setTimer(10 * 60);
    setIsTimerRunning(true);
    // CALL API TO RESEND OTP TO THE USER
    const response = await ReferralService.getOTP(referrerPersonalInfo.id);

    if (response.success === true) {
      toast.success('OTP sent!, check your email');
    }
  };

  // VERIFY OTP
  // const { data, isLoading } = useVerifyOTP(otp.join(''), {
  //   accountName: referrerBankInfo.accountName,
  //   accountNumber: referrerBankInfo.accountNumber,
  //   bankName: referrerBankInfo.bankName,
  //   referrerId: referrerPersonalInfo.referrerId
  // });

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

  const handleVerifyOTP = async () => {

    const response = await ReferralService.verifyOTP(otp.join(''), {
      accountName: referrerBankInfo.accountName,
      accountNumber: referrerBankInfo.accountNumber,
      bankName: referrerBankInfo.bankName,
      refereeId: referrerPersonalInfo.id
    });

    if (response.success === true) {
      if (setSubmissionModal) {
        handleClose();
        setSubmissionModal(true);
        refetch && refetch();
      }
    } else {
      toast.error("OTP is invalid, Try again!");
      setEnable(false);
    }
  };

  return (
    <ReusableModal
      open={state}
      onClose={handleClose}
      width={isMobile ? "90%" : "647px"}
      maxWidth={isMobile ? "90%" : "647px"}
      headerText="OTP VERIFICATION"
      description="Please check your Email for the code."
      showButton={false}
    >
      <Section>
        <Flex align="center" justify="center" gap="2px" direction="column" margin="0 0 38px">
          <p style={{ margin: 0 }}>{timer === 0 ? <Text margin={0} type="p" text="OTP has expired" color={ttColors.red} /> : <Text margin={0} type="p" text={`Resend in ${formatTime(timer)} seconds`} />}</p>
          {timer === 0 ? (<Text margin={0} type="p" text="Resend OTP" color="#007bff" cursor="pointer" onClick={handleResendOTP} />) : null}
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
              value={otp[index]?.toLocaleUpperCase()}
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
              handleVerifyOTP();
            }}>
            <Text type="p" text="Verify" weight={500} />
          </Button>
        </Flex>
      </Section>
    </ReusableModal>

  );
};