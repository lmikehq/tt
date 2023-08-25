"use client";

import CoverImg from "@image/visaPageCover.jpg";
import CoverDesktopImg from "@image/visaDesktopCover.jpg";

import Button from "@atom/button";
import { Divider } from "@atom/divider";
import Flex from "@atom/flex";
import { Grid } from "@atom/grid";
import Input from "@atom/input";
import Text from "@atom/text";
import Spinner from "@components/icons/spinner";
import SectionLayout from "@components/layouts/sectionLayout";
import {
  detailsKeys,
  detailsSchema,
  documentsArr,
  documentsSchema,
  educationsArr,
  employmentsArr,
  familyInfoArr,
  familyInfoSchema,
  manyEducationSchema,
  manyEmploymentSchema,
  personalInfoKeys,
  personalInfoSchema,
  visaInitVals,
  visaSchema,
} from "@lib/application/schema";
import { getSteps } from "@lib/application/steps";
import sleep from "@lib/sleep";
import Section from "@molecule/section";
import SectionTitle from "@molecule/sectionTitle";
import AllCountryHead from "@organism/AllCountry/allCountryHead";
import currencyFormatter from "data/currencyFormatter";
import apiService from "hook/apiService";
import useFormikHook from "hook/useFormik";
import { usePaystack } from "hook/usePaystack";
import { useScreenResolution } from "hook/useScreenResolution";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import {
  BsArrowLeft,
  BsFillShieldLockFill,
  BsLock,
  BsShieldFillCheck,
} from "react-icons/bs";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import { useUserStore } from "store/useStore";
import { styled } from "styled-components";
import { ttColors } from "theme/colors";
import {
  ApplicationFormRequestInput,
  DetailsKeys,
  DocumentInterface,
  EducationDetailsInterface,
  EmploymentDetailsInterface,
  FamilyInfoInterface,
  IFee,
  PersonalInfoInterface,
  VisaApplicationFormInterface,
} from "types";
import UsefulLinks from "@molecule/contactPage/components/usefulLink";
import VisaProgress from "@molecule/visaProgress";
import { ListItem } from "@mui/material";
import BulletList from "@atom/list";
import TravelArrow from "@atom/travelArrow";
import VisaApplicationFormDetails from "./components/sideMenu/visaApplicationFormDetails";
import SaveProgressAndContinueLater from "./components/sideMenu/saveProgressAndContinueLater";
import PaymentSummaryPane from "@molecule/payment/PaymentSummaryPane";
import CustomToaster from "@molecule/customToaster";
import { setTimeout } from "timers";
import { FormikProps, FormikValues, useFormik } from "formik";

const PromoInput = styled.div`
  display: flex;
  margin: 1rem 0;

  & input {
    border: 1px solid #bdbdbd;
    border-bottom-right-radius: 0 !important;
    border-top-right-radius: 0 !important;
    border-right: 0 !important;
  }

  & button {
    border-bottom-left-radius: 0 !important;
    border-top-left-radius: 0 !important;
    height: 40px !important;
  }
`;
export type SingleFormType =
  | DetailsKeys
  | PersonalInfoInterface
  | { education: EducationDetailsInterface[] }
  | { employment: EmploymentDetailsInterface[] }
  | { familyMembers: FamilyInfoInterface[] }
  | { documents: DocumentInterface[] };

function ApplicationForm() {
  const { isMobile } = useScreenResolution();
  const [promoCode, setPromoCode] = useState("");
  const [promocodeLoading, setPromocodeLoading] = useState(false);
  const [applicationResponse, setApplicationResponse] = useState<any>();

  const { user } = useUserStore((state) => state);
  const { startPayment, loading, error, response, setData, data } =
    usePaystack();
  async function handleVisaApplication({
    payload,
  }: {
    payload: ApplicationFormRequestInput;
  }) {
    // if (applicationResponse.statusCode === 201)
    //   return setCurrentPhase(currentPhase + 1);
    const response: any = await apiService(
      "/visa/new-application",
      "POST",
      payload
    );

    setApplicationResponse(response);
    if (response.statusCode === 201) {
      toast.success(
        "Your application has been submitted successfully, please proceed to make payment"
      );
      // setData({
      //   ...data,
      //   amount: response.fee.total * 100,
      //   currency: "NGN",
      //   email: response.fee.mail || formData.email,
      // });
      // return setCurrentPhase(currentPhase + 1);
    } else {
      toast.error("Unable to complete request");
    }
  }
  // localhost:3000/visa/apply?action=payment&type=visa-application-fee&status=success
  const params = useSearchParams();
  // const action = params.get("action"); // payment
  const type = params.get("type"); // visa-application-fee
  const status = params.get("status"); // success | fail
  const [formData, setFormData] = useState<VisaApplicationFormInterface>({
    ...visaInitVals,
    homeCountry: params.get("home") || "",
    destination: params.get("destination") || "",
  });
  const [currentPhase, setCurrentPhase] = useState(
    type !== "visa-application-fee" ? 1 : status === "success" ? 6 : 7
  );
  // const [currentPhase, setCurrentPhase] = useState(5);
  const [highestPhase, setHighestPhase] = useState(1);
  const [nextStepLoading, setNextStepLoading] = useState(false);
  const router = useRouter();

  // async function onSuccess() {
  //   // toast.success("Payment Successful, please check your email for receipt");
  //   toast.loading("Payment Successful, please wait...", {
  //     duration: 5000,
  //   });
  //   await apiService("/payment/paystack-success-callback", "POST", {
  //     visaId: applicationResponse.id,
  //     user: user?._id || applicationResponse.userId,
  //     method: "CARD",
  //     gateway: "Paystack",
  //     status: "SUCCESS",
  //     currency: "NGN",
  //     totalAmount: applicationResponse.fee.total,
  //     service: "VISA",
  //     description: "Payment Successful",
  //   });
  //   setCurrentPhase(currentPhase + 1);
  // }
  // async function onCancel() {
  //   await apiService("/payment/paystack-success-callback", "POST", {
  //     visaId: applicationResponse.id,
  //     user: user?._id || applicationResponse.userId,
  //     method: "CARD",
  //     gateway: "Paystack",
  //     status: "FAILED",
  //     currency: "NGN",
  //     totalAmount: applicationResponse.fee.total,
  //     service: "VISA",
  //     description: "Payment Cancelled",
  //   });
  //   toast.error("Payment Cancelled");
  //   setCurrentPhase(currentPhase + 2);
  // }

  const setPhase = async (number: number) => {
    console.log("setPhase", number);
    setCurrentPhase(number);
    if (number > highestPhase) setHighestPhase(number);
  };

  const nextStep = async ({ form }: { form?: SingleFormType }) => {
    const input = { ...formData, ...form };
    if (nextStepLoading) return;
    setNextStepLoading(true);
    if (currentPhase <= 6) {
      setFormData(input);

      if (currentPhase + 1 > highestPhase) setHighestPhase(currentPhase + 1);
    }

    if (currentPhase == 6) {
      const applicationFormRequest: ApplicationFormRequestInput = {
        applicationType: input.applicationType,
        visaType: input.visaType,
        primaryTraveller: {
          firstName: input.firstName,
          lastName: input.lastName,
          travellingBy: "Airplane",
          middleName: input.middleName,
          email: input.email,
          homeCountry: input.homeCountry,
          destination: input.destination,
          placeOfBirth: input.placeOfBirth,
          phoneNumber: input.phoneNumber,
          stateOfOrigin: input.stateOfOrigin,
          lgaOfOrigin: input.lgaOfOrigin,
          nativeLanguage: input.nativeLanguage,
          meansOfId: input.meansOfId,
          idNumber: input.idNumber,
          issueDate: input.issueDate,
          expiryDate: input.expiryDate,
          address: input.address,
          countryOfCitizen: input.countryOfCitizen,
          dateOfBirth: input.dateOfBirth,
          gender: input.gender,
          maritalStatus: input.maritalStatus,
          partnersName: input.partnersName,
          passportNumber: input.passportNumber,
          passportIssuedCountry: input.passportIssuedCountry,
          passportExpiryYear: input.passportExpiryYear,
          tripPurpose: input.tripPurpose,
          tuberculosis: input.tuberculosis,
          mentalDisorder: input.mentalDisorder,
          mentalDisorderDetails: input.mentalDisorderDetails,
          remainbeyondValidity: input.remainbeyondValidity,
          refusedBefore: input.refusedBefore,
          refusedBeforeDetails: input.refusedBeforeDetails,
          arrestedBefore: input.arrestedBefore,
          arrestedBeforeDetails: input.arrestedBeforeDetails,
          servedInMilitary: input.servedInMilitary,
          servedInMilitaryDetails: input.servedInMilitaryDetails,
          memberOfViolentGroup: input.memberOfViolentGroup,
          participatedInViolentActivities:
            input.participatedInViolentActivities,
          education: input.education,
          employment: input.employment,
        },
        familyMembers: input.familyMembers,
        documents: input.documents,
        // user: 'your_user_id_here', // Set the user ID appropriately
      };

      handleVisaApplication({
        payload: applicationFormRequest,
      });
    }

    // if (currentPhase === 4) {
    //   setNextStepLoading(true);
    //   await handleVisaApplication();
    //   return setNextStepLoading(false);
    // }
    // if (currentPhase === 6) {
    //   return await startPayment({ onSuccess, onCancel });
    // }
    // if (currentPhase === 7) {
    //   return router.push("/auth/login");
    // }
    // await reloadFee();
    setCurrentPhase(currentPhase + 1);
    setNextStepLoading(false);
  };

  const prevStep = async () => {
    if (nextStepLoading || currentPhase === 1) return;
    // await reloadFee();
    setCurrentPhase(currentPhase - 1);
  };

  const [formFee, setFormFee] = useState(0);

  // async function reloadFee() {
  //   setNextStepLoading(true);
  //   setShownFees([]);
  //   await sleep(1000);
  //   setNextStepLoading(false);
  //   // setShownFees(calcFees(formFee));
  // }
  const personalInfoFormik: FormikProps<PersonalInfoInterface> = useFormik({
    initialValues: personalInfoKeys,
    validationSchema: personalInfoSchema,
    validateOnChange: true,
    onSubmit: (values: PersonalInfoInterface) => {
      nextStep({ form: values });
    },
  });

  const detailsFormik = useFormik({
    initialValues: {
      ...detailsKeys,
      homeCountry: params.get("home") || "",
      destination: params.get("destination") || "",
      visaType: params.get("visaType") || "",
    },
    validationSchema: detailsSchema,
    onSubmit: (values: DetailsKeys) => {
      console.log(values);
      nextStep({ form: values });
    },
  });

  const educationFormik = useFormik({
    initialValues: educationsArr,
    validationSchema: manyEducationSchema,
    onSubmit: (values) => {
      nextStep({ form: values });
    },
    validateOnChange: true,
  });

  const employmentFormik = useFormik({
    initialValues: employmentsArr,
    validationSchema: manyEmploymentSchema,
    onSubmit: (values) => {
      nextStep({ form: values });
    },
    validateOnChange: false,
  });
  const familyMembersFormik = useFormik({
    initialValues: familyInfoArr,
    validationSchema: familyInfoSchema,
    onSubmit: (values) => {
      nextStep({ form: values });
    },
    validateOnChange: true,
  });
  const documentsFormik = useFormik({
    initialValues: documentsArr,
    validationSchema: documentsSchema,
    onSubmit: (values) => {
      nextStep({ form: values });
    },
  });

  const step = getSteps({
    setFormFee,
    setCurrentPhase,
    detailsFormik,
    personalInfoFormik,
    educationFormik,
    employmentFormik,
    familyMembersFormik,
    documentsFormik,
    isLoading: nextStepLoading,
  }).find((x) => x.id === currentPhase);

  const isValid: boolean = useMemo(() => {
    return formData.homeCountry !== "" && formData.destination !== "";
  }, [formData.homeCountry, formData.destination]);

  const coverImage = isMobile ? CoverImg : CoverDesktopImg;
  return (
    <>
      <AllCountryHead cover={coverImage} title={formData.destination || ""} />
      <SectionLayout>
        <SectionTitle
          title={`Apply Now for ${formData.destination || ""} Employment Visa`}
          description="We'll Handle Your Travel Documentation Hassles, and Ensure a Seamless travel experience for you"
          showButton={false}
        />

        <Flex
          background="#FFFFFF"
          borderRadius={isMobile ? "0px" : "16px"}
          margin="3rem 0px 5rem 0px"
          styles={{
            boxShadow: isMobile
              ? "none"
              : "0px 2px 2px 0px rgba(0, 0, 0, 0.05), 2px 0px 2px 0px rgba(0, 0, 0, 0.05)",

            marginBottom: isMobile ? "3rem" : "0px",
            position: "relative",
          }}
          height="auto"
          padding={isMobile ? "0px" : "2.5rem"}
          gap="2.25rem"
          direction={isMobile ? "column" : "row"}
        >
          <Section
            height="unset"
            width="62%"
            padding={"0 0 8rem 0"}
            styles={{ position: "relative" }}
          >
            <Flex direction="column" styles={{ flexGrow: 1 }} gap="2rem">
              <Flex
                align="center"
                cursor="pointer"
                gap="0.3rem"
                onClick={prevStep}
              >
                <BsArrowLeft
                  color={currentPhase > 1 ? ttColors.primary : ttColors.gray}
                  size="22px"
                />
                <Text
                  text="Previous"
                  type="p"
                  color={currentPhase > 1 ? ttColors.primary : ttColors.gray}
                  size="16px"
                  weight="bold"
                />
              </Flex>
              {currentPhase > 1 && currentPhase < 7 && (
                <VisaProgress
                  phase={currentPhase - 1}
                  setPhase={setPhase}
                  highestPhase={highestPhase}
                />
              )}
              <Section
                width={isMobile ? "100%" : "100%"}
                height="unset"
                padding="0px 0px 2rem 0px"
              >
                {step?.content}
              </Section>
            </Flex>
          </Section>

          <Section
            width="38%"
            height="unset"
            styles={{ display: isMobile ? "none" : "block" }}
          >
            <Flex direction="column" height="100%">
              {(() => {
                if (currentPhase <= 6) {
                  return !isValid ? (
                    <Section margin="0 0 2rem 0">
                      <Text
                        type="p"
                        text={`Please select a 
                ${!formData.destination ? "destination and" : ""} 
                ${!formData.homeCountry ? "home country" : ""}`}
                      />
                    </Section>
                  ) : (
                    <VisaApplicationFormDetails formData={formData} />
                  );
                } else if (currentPhase > 6) {
                  return (
                    <PaymentSummaryPane
                      numberOfPersons={1}
                      visaApplicationType="Individual"
                      fee={"10000"}
                      totalFee={"10000"}
                    />
                  );
                }
              })()}
              <SaveProgressAndContinueLater />
            </Flex>
          </Section>
        </Flex>
      </SectionLayout>
    </>
  );
}

export default ApplicationForm;
