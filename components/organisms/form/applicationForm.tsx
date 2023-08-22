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
  | PersonalInfoInterface
  | EducationDetailsInterface[]
  | EmploymentDetailsInterface[]
  | FamilyInfoInterface[];

function ApplicationForm() {
  const { isMobile } = useScreenResolution();
  const [promoCode, setPromoCode] = useState("");
  const [promocodeLoading, setPromocodeLoading] = useState(false);
  const [applicationResponse, setApplicationResponse] =
    useState<any>(visaInitVals);
  const [formData, setFormData] =
    useState<VisaApplicationFormInterface>(visaInitVals);
  const { user } = useUserStore((state) => state);
  const { startPayment, loading, error, response, setData, data } =
    usePaystack();
  async function handleVisaApplication() {
    if (applicationResponse.statusCode === 201)
      return setCurrentPhase(currentPhase + 1);
    const response: any = await apiService("visa/new-application", "POST", {
      ...formik.values,
      destination: formik.values.destination?.name,
      homeCountry: formik.values.home?.name,
      firstAndMiddleName: formik.values.firstName,
      address: formik.values.residentialAddress,
      school: formik.values.schoolName,
      yearOfGraduation: formik.values.graudautionYear,
      company: formik.values.companyName,
      yearStarted: formik.values.startedYear,
      yearEnded: formik.values.endedYear,
      passportNumber: formik.values.passNumber,
      passportIssuedCountry: formik.values.passIssueCountry,
      passportExpiryYear: formik.values.expiryYear,
      relationshipToGuarantor: formik.values.guarantorRelationship,
      documents: formik.values.uploadedDocuments,
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
        email: response.fee.mail || formik.values.email,
      });
      return setCurrentPhase(currentPhase + 1);
    }
  }
  // localhost:3000/visa/apply?action=payment&type=visa-application-fee&status=success
  const params = useSearchParams();
  // const action = params.get("action"); // payment
  const type = params.get("type"); // visa-application-fee
  const status = params.get("status"); // success | fail

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

  const nextStep = async ({ form }: { form: SingleFormType }) => {
    if (nextStepLoading) return;
    setNextStepLoading(true);
    setFormData({ ...formData, ...form });

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
    if (currentPhase + 1 > highestPhase) setHighestPhase(currentPhase + 1);
    setNextStepLoading(false);
  };

  const prevStep = async () => {
    if (nextStepLoading || currentPhase === 1) return;
    await reloadFee();
    setCurrentPhase(currentPhase - 1);
  };

  const initialValues = {
    ...visaInitVals,
    firstAndMiddleName: user?.firstName || "",
    lastName: user?.lastName || "",
    home: { name: params.get("home") || "" },
    destination: { name: params.get("destination") || "" },
    visaType: params.get("visaType") || "",
    email: user?.email || "",
  };

  const formik = useFormikHook(initialValues, visaSchema);

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
    formik,
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
    return (
      formik.values?.home?.name !== "" &&
      formik.values?.destination?.name !== ""
    );
  }, [formik.values?.home?.name, formik.values?.destination?.name]);

  const coverImage = isMobile ? CoverImg : CoverDesktopImg;
  return (
    <>
      <AllCountryHead
        cover={coverImage}
        title={formik.values?.destination?.name || ""}
      />
      <SectionLayout>
        <SectionTitle
          title={`Apply Now for ${
            initialValues?.destination?.name || ""
          } Employment Visa`}
          description="We'll Handle Your Travel Documentation Hassles, and Ensure a Seamless travel experience for you"
          showButton={false}
        />

        <Flex
          background="#FFFFFF"
          borderRadius={isMobile ? "0px" : "16px"}
          margin="3rem 0px 5rem 0px"
          styles={{
            // boxShadow: isMobile ? "none" : "4px 4px 26px rgba(0, 0, 0, 0.25)",
            boxShadow:isMobile ? "none" : "0px 2px 2px 0px rgba(0, 0, 0, 0.05), 2px 0px 2px 0px rgba(0, 0, 0, 0.05)",

            marginBottom: isMobile ? "3rem" : "0px",
            position: "relative",
          }}
          height="auto"
          padding={isMobile ? "0px" : "2.5rem"}
          gap="2.25rem"
          direction={isMobile ? "column" : "row"}
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
            {currentPhase > 1 && (
              <VisaProgress
                phase={currentPhase - 1}
                setPhase={setPhase}
                highestPhase={highestPhase}
              />
            )}
            <Section width={isMobile ? "100%" : "100%"} padding="2rem 0">
              {step?.content}
            </Section>
            <Section height="unset" margin="4.5rem 0 0 0">
              {(currentPhase == 1 || currentPhase == 6) && (
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
            </Section>
          </Flex>
          <Flex
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
          </Flex>
          <Section
            width="40%"
            styles={{ display: isMobile ? "none" : "block" }}
          >
            {currentPhase < 6 ? (
              isValid ? (
                <Section width="100%">
                  <Flex
                    align="center"
                    justify="space-between"
                    // direction={isMobile ? "column" : "row"}
                    gap={isMobile ? "1.5rem" : "0rem"}
                  >
                    <Text
                      type="p"
                      text={formik.values?.home?.name}
                      size={24}
                      weight="600"
                    />
                    <TravelArrow />
                    <Text
                      type="p"
                      text={formik.values?.destination?.name}
                      size={24}
                      weight={600}
                    />
                  </Flex>
                  <Divider margin={"1.5rem 0"} />
                  {/* <Grid
                    columns={isMobile ? "1fr" : "2fr 1fr"}
                    gap=".5rem"
                    margin="2rem 0"
                    justify={isMobile ? "flex-start" : "center"}
                    className="hideOnMobile"
                  >
                    {shownFees.map((item) => (
                      <>
                        <Text
                          type="p"
                          text={item.name}
                          size={item.type === "head" ? "16px" : "14px"}
                          whiteSpace="nowrap"
                          weight={item.type === "head" ? "500" : "100"}
                        />
                        <Text
                          type="p"
                          text={`${
                            typeof item.amount === "number"
                              ? currencyFormatter(item.amount, "NGN")
                              : item.amount
                          }`}
                          size={item.type === "head" ? "16px" : "14px"}
                          whiteSpace="nowrap"
                          weight={item.type === "head" ? "500" : "100"}
                        />
                      </>
                    ))}
                  </Grid> */}
                  <Flex gap="2rem">
                    <Flex direction="column">
                      <Text
                        text="Application Fee"
                        type="h3"
                        size={20}
                        weight={600}
                        whiteSpace="nowrap"
                      />
                      <Text
                        type="p"
                        size={18}
                        weight={400}
                        text="Non-Refundable"
                        whiteSpace="nowrap"
                      />
                    </Flex>
                    <Flex direction="column">
                      <Text
                        text="Validity"
                        type="h3"
                        size={20}
                        weight={600}
                        whiteSpace="nowrap"
                      />
                      <Text
                        type="p"
                        size={18}
                        weight={400}
                        text="Passport dependent"
                        whiteSpace="nowrap"
                      />
                    </Flex>
                  </Flex>
                  <Section padding="2.5rem 0">
                    <Text
                      type="h3"
                      text="Required Documents"
                      weight={600}
                      size={20}
                    />
                    <BulletList>
                      <ListItem>
                        <Text
                          type="p"
                          size={18}
                          weight={400}
                          text="Passport sized photograph"
                        />
                      </ListItem>
                      <ListItem>
                        <Text
                          type="p"
                          size={18}
                          weight={400}
                          text="Valid international passport"
                        />
                      </ListItem>
                      <ListItem>
                        <Text
                          type="p"
                          size={18}
                          weight={400}
                          text="All academic certificates"
                        />
                      </ListItem>
                      <ListItem>
                        <Text
                          type="p"
                          size={18}
                          weight={400}
                          text="Proof of address (utility bill)"
                        />
                      </ListItem>
                      <ListItem>
                        <Text
                          type="p"
                          text="Marriage certificate (if applicable)"
                        />
                      </ListItem>
                    </BulletList>
                  </Section>
                  <Flex gap=".5rem">
                    <BsFillShieldLockFill
                      size="24px"
                      color={ttColors.primary}
                    />
                    <div>
                      <Text
                        text="Your info is safe with us"
                        type="p"
                        size={18}
                        weight={500}
                        styles={{ lineHeight: "27px" }}
                      />
                      <p style={{ fontSize: "14px", color: "#929292" }}>
                        For more details, see our &nbsp;
                        <span
                          style={{
                            color: ttColors.primary,
                            cursor: "pointer",
                            textDecoration: "underline",
                            fontWeight: "bold",
                          }}
                        >
                          data protection page
                        </span>
                      </p>
                    </div>
                  </Flex>
                  {/* {shownFees.length ? (
                    <Flex justify={isMobile ? "flex-start" : "flex-end"}>
                      <Text
                        type="p"
                        text={currencyFormatter(
                          shownFees.reduce(
                            (a, b) =>
                              a + (typeof b.amount === "number" ? b.amount : 0),
                            0
                          ),
                          "NGN"
                        )}
                        size="2.1rem"
                        weight="bold"
                        key={formFee}
                      />
                    </Flex>
                  ) : (
                    ""
                  )} */}

                  {currentPhase === 4 && (
                    <Section margin="2rem 0">
                      <Text type="p" text="Promo Code" />
                      <form action="" onSubmit={handlePromoCode}>
                        <PromoInput>
                          <Input
                            placeholder="Enter Promo Code"
                            width="100%"
                            flexGrow={1}
                            onChange={(e) => setPromoCode(e.target.value)}
                            value={promoCode}
                          />
                          <Button type="submit">
                            <Text
                              type="p"
                              text={promocodeLoading ? "Loading..." : "Apply"}
                              weight={600}
                              size="1rem"
                            />
                          </Button>
                        </PromoInput>
                      </form>
                    </Section>
                  )}

                  {applicationResponse?.statusCode === 400 &&
                    applicationResponse?.errors?.message?.map(
                      (x: any, i: number) => (
                        <Text
                          type="p"
                          key={i}
                          text={x.constraints}
                          color="rgb(255, 134, 130)"
                          size="1rem"
                          margin="0 0 .6rem 0"
                        />
                      )
                    )}
                  {applicationResponse?.statusCode === 422 && (
                    <Text
                      type="p"
                      text={"Please login to your account to continue"}
                      color="rgb(255, 134, 130)"
                      size="1rem"
                      margin="0 0 .6rem 0"
                    />
                  )}

                  <Flex margin="3rem 0 0 0" direction="column" gap="0.5rem">
                    <Button
                      border="1px solid #06062A"
                      width="100%"
                      background="none"
                      borderRadius="4px"
                      padding="1.5rem"
                    >
                      <Text
                        type="p"
                        text="Save Progress & Continue Later"
                        size={16}
                        color="#06062A"
                        cursor="pointer"
                        weight={600}
                      />
                    </Button>
                    <Button
                      border="1px solid #06062A"
                      width="100%"
                      background="none"
                      borderRadius="4px"
                      padding="1.5rem"
                    >
                      <Text
                        type="p"
                        text="Exit Application"
                        weight={600}
                        size={16}
                        color="#06062A"
                        cursor="pointer"
                      />
                    </Button>
                  </Flex>
                </Section>
              ) : (
                <Text
                  type="p"
                  text={`Please select a 
                  ${!formik.values?.destination?.name ? "destination and" : ""} 
                  ${!formik.values?.home?.name ? "home country" : ""}`}
                />
              )
            ) : (
              <>
                <UsefulLinks />
                <Button
                  width="100%"
                  margin="1rem 0"
                  onClick={() => router.push("/company/about-us")}
                  fontSize="18px"
                  background="transparent"
                  color="#000"
                  border="1px solid #000"
                >
                  <Text type="p" text="Learn how we work" />
                </Button>
              </>
            )}
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
