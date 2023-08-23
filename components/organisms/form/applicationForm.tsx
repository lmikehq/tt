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
import { visaInitVals, visaSchema } from "@lib/application/schema";
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
  | EducationDetailsInterface[]
  | EmploymentDetailsInterface[]
  | FamilyInfoInterface[]
  | DocumentInterface[];

function ApplicationForm() {
  const { isMobile } = useScreenResolution();
  const [promoCode, setPromoCode] = useState("");
  const [promocodeLoading, setPromocodeLoading] = useState(false);
  const [applicationResponse, setApplicationResponse] =
    useState<any>(visaInitVals);

  const { user } = useUserStore((state) => state);
  const { startPayment, loading, error, response, setData, data } =
    usePaystack();
  async function handleVisaApplication() {
    if (applicationResponse.statusCode === 201)
      return setCurrentPhase(currentPhase + 1);
    const response: any = await apiService("visa/new-application", "POST", {
      ...formData,
      // destination: formik.values.destination?.name,
      // homeCountry: formik.values.home?.name,
      // firstAndMiddleName: formik.values.firstName,
      // address: formik.values.residentialAddress,
      // school: formik.values.schoolName,
      // yearOfGraduation: formik.values.graudautionYear,
      // company: formik.values.companyName,
      // yearStarted: formik.values.startedYear,
      // yearEnded: formik.values.endedYear,
      // passportNumber: formik.values.passNumber,
      // passportIssuedCountry: formik.values.passIssueCountry,
      // passportExpiryYear: formik.values.expiryYear,
      // relationshipToGuarantor: formik.values.guarantorRelationship,
      // documents: formik.values.uploadedDocuments,
      userId: user?._id || "",
    });

    setApplicationResponse(response);
    if (response.statusCode === 201) {
      toast.success(
        "Your application has been submitted successfully, please proceed to make payment"
      );
      setData({
        ...data,
        amount: response.fee.total * 100,
        currency: "NGN",
        email: response.fee.mail || formData.email,
      });
      return setCurrentPhase(currentPhase + 1);
    }
  }
  // localhost:3000/visa/apply?action=payment&type=visa-application-fee&status=success
  const params = useSearchParams();
  // const action = params.get("action"); // payment
  const type = params.get("type"); // visa-application-fee
  const status = params.get("status"); // success | fail
  const [formData, setFormData] = useState<VisaApplicationFormInterface>({
    ...visaInitVals,
    home: params.get("home") || "",
    destination: params.get("destination") || "",
  });
  const [currentPhase, setCurrentPhase] = useState(
    type !== "visa-application-fee" ? 1 : status === "success" ? 6 : 7
  );
  // const [currentPhase, setCurrentPhase] = useState(5);
  const [highestPhase, setHighestPhase] = useState(1);
  const [nextStepLoading, setNextStepLoading] = useState(false);
  const router = useRouter();

  async function onSuccess() {
    // toast.success("Payment Successful, please check your email for receipt");
    toast.loading("Payment Successful, please wait...", {
      duration: 5000,
    });
    await apiService("/payment/paystack-success-callback", "POST", {
      visaId: applicationResponse.id,
      user: user?._id || applicationResponse.userId,
      method: "CARD",
      gateway: "Paystack",
      status: "SUCCESS",
      currency: "NGN",
      totalAmount: applicationResponse.fee.total,
      service: "VISA",
      description: "Payment Successful",
    });
    setCurrentPhase(currentPhase + 1);
  }
  async function onCancel() {
    await apiService("/payment/paystack-success-callback", "POST", {
      visaId: applicationResponse.id,
      user: user?._id || applicationResponse.userId,
      method: "CARD",
      gateway: "Paystack",
      status: "FAILED",
      currency: "NGN",
      totalAmount: applicationResponse.fee.total,
      service: "VISA",
      description: "Payment Cancelled",
    });
    toast.error("Payment Cancelled");
    setCurrentPhase(currentPhase + 2);
  }

  const setPhase = async (number: number) => {
    console.log("setPhase", number);
    setCurrentPhase(number);
    if (number > highestPhase) setHighestPhase(number);
  };

  const nextStep = async ({ form }: { form?: SingleFormType }) => {
    if (nextStepLoading) return;
    setNextStepLoading(true);
    if (currentPhase <= 6) {
      setFormData({ ...formData, ...form });
      if (currentPhase + 1 > highestPhase) setHighestPhase(currentPhase + 1);
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
    await reloadFee();
    setCurrentPhase(currentPhase + 1);
    setNextStepLoading(false);
  };

  const prevStep = async () => {
    if (nextStepLoading || currentPhase === 1) return;
    await reloadFee();
    setCurrentPhase(currentPhase - 1);
  };

  const [formFee, setFormFee] = useState(0);

  async function reloadFee() {
    setNextStepLoading(true);
    setShownFees([]);
    await sleep(1000);
    setNextStepLoading(false);
    // setShownFees(calcFees(formFee));
  }

  useEffect(() => {
    reloadFee();
  }, [formFee]);

  const [shownFees, setShownFees] = useState<IFee[]>(calcFees(formFee));

  function calcFees(formFee: number): IFee[] {
    return [
      {
        name: "Fees",
        amount: "Price",
        type: "head",
      },
      {
        name: "Form Registration Fee",
        amount: formFee,
      },
      {
        name: "Standard processing fee",
        amount: 0,
      },
      {
        name: "Administrative charge",
        amount: 0,
      },
      {
        name: "Value Added Tax",
        amount: 150,
      },
    ];
  }

  const step = getSteps(
    setFormFee,
    setCurrentPhase,
    nextStep,
    nextStepLoading
  ).find((x) => x.id === currentPhase);

  async function handlePromoCode(e: any) {
    e.preventDefault();
    if (promocodeLoading) return;
    setPromocodeLoading(true);
    if (!promoCode) {
      toast.error("Please enter a promo code");
      return setPromocodeLoading(false);
    }
    await sleep(2000);
    setPromocodeLoading(false);
    setPromoCode("");
    toast.error("Promo code not applied");
  }

  const isValid: boolean = useMemo(() => {
    return formData.home !== "" && formData.destination !== "";
  }, [formData.home, formData.destination]);

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
            // boxShadow: isMobile ? "none" : "4px 4px 26px rgba(0, 0, 0, 0.25)",
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
              {/* <Section height="unset" margin="4.5rem 0 0 0">
              {currentPhase == 6 && (
                <Button width="100%" height={"3.5rem"} onClick={nextStep}>
                  <Flex
                    align="center"
                    width="100%"
                    height="100%"
                    justify="center"
                  >
                    {nextStepLoading ? (
                      <Spinner size="40px" fill={ttColors.primary} />
                    ) : (
                      <Text
                        type="span"
                        text={"Save & Continue"}
                        weight={600}
                        size={20}
                        color={ttColors.light}
                        padding="2rem 0"
                      />
                    )}
                  </Flex>
                </Button>
              )}
            </Section> */}
            </Flex>
          </Section>
          {/* <Flex
            align="center"
            cursor="pointer"
            gap="1rem"
            onClick={prevStep}
            styles={{
              display: isMobile ? "flex" : "none",
              margin: isMobile ? "0px 0px 5rem" : "0px",
            }}
          >
            <HiOutlineArrowNarrowLeft color={ttColors.primary} size="30px" />
            <Text
              text="Previous"
              type="p"
              color={ttColors.primary}
              size="20px"
              weight="400"
            />
          </Flex> */}
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
                ${!formData.home ? "home country" : ""}`}
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

      <Flex
        justify="space-between"
        gap="1rem"
        styles={{
          zIndex: "1200",
          boxShadow: "0px -8px 6px -2px rgba(113,150,173,0.10)",
          padding: "1rem",
          position: "fixed",
          bottom: "0px",
          alignContent: "center",
          display: isMobile ? "flex" : "none",
          background: "#fff",
        }}
      >
        {shownFees.length && currentPhase !== 5 && isMobile ? (
          <Flex
            justify={isMobile ? "flex-start" : "flex-end"}
            styles={{
              alignItems: "center",
            }}
          >
            <Text
              type="p"
              text={currencyFormatter(
                shownFees.reduce(
                  (a, b) => a + (typeof b.amount === "number" ? b.amount : 0),
                  0
                ),
                "NGN"
              )}
              size="1.1rem"
              weight="bold"
              key={formFee}
            />
          </Flex>
        ) : (
          ""
        )}
      </Flex>
    </>
  );
}

export default ApplicationForm;
