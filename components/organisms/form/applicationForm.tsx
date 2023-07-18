"use client";

import canada from "@image/canada-cover.png";

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
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BsShieldFillCheck } from "react-icons/bs";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import { useUserStore } from "store/useStore";
import { styled } from "styled-components";
import { ttColors } from "theme/colors";
import { IFee } from "types";
import UsefulLinks from "@molecule/contactPage/components/usefulLink";
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

function ApplicationForm() {
  const { isMobile } = useScreenResolution();
  const [promoCode, setPromoCode] = useState("");
  const [promocodeLoading, setPromocodeLoading] = useState(false);
  const [applicationResponse, setApplicationResponse] = useState<any>({});
  const { user } = useUserStore((state) => state);
  const { startPayment, loading, error, response, setData, data } =
    usePaystack();
  async function handleVisaApplication() {
    if (applicationResponse.statusCode === 201)
      return setCurrentPhase(currentPhase + 1);
    const response: any = await apiService("visa/new-application", "POST", {
      ...formik.values,
      destination: formik.values.destination?.name,
      homeCountry: formik.values.destination?.name,
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
      userId: user?._id,
    });

    setApplicationResponse(response);
    if (response.statusCode === 201) {
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
      description: 'Payment Successful'
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
      description: 'Payment Cancelled'
    });
    toast.error("Payment Cancelled");
    setCurrentPhase(currentPhase + 2);
  }
  const nextStep = async () => {
    if (nextStepLoading) return;
    if (currentPhase === 4) {
      setNextStepLoading(true);
      await handleVisaApplication();
      return setNextStepLoading(false);
    }
    if (currentPhase === 5) {
      console.log("formik: ", applicationResponse.fee);

      return await startPayment({ onSuccess, onCancel });
    }
    if (currentPhase === 7) {
      return router.push("/auth/login");
    }
    await reloadFee();
    setCurrentPhase(currentPhase + 1);
  };
  const prevStep = async () => {
    if (nextStepLoading || currentPhase === 1) return;
    await reloadFee();
    setCurrentPhase(currentPhase - 1);
  };

  const initialValues = {
    ...visaInitVals,
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
    setShownFees(calcFees(formFee));
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
        name: "VAT",
        amount: 150,
      },
    ];
  }

  const step = getSteps(formik, setFormFee, setCurrentPhase).find(
    (x) => x.id === currentPhase
  );

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

  return (
    <>
      <AllCountryHead
        cover={canada}
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
          styles={{
            boxShadow: isMobile ? "none" : "4px 4px 26px rgba(0, 0, 0, 0.25)",
            marginBottom: isMobile ? "3rem" : "0px",
            position: "relative",
          }}
          height="auto"
          padding={isMobile ? "0px" : "2rem"}
          justify="space-between"
          direction={isMobile ? "column" : "row"}
        >
          {step?.content}
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
              formik.values?.home?.name && formik.values?.destination?.name ? (
                <Section width="90%">
                  <Flex
                    align="center"
                    justify="space-between"
                    // direction={isMobile ? "column" : "row"}
                    gap={isMobile ? "1.5rem" : "0rem"}
                  >
                    <Text
                      type="p"
                      text={formik.values?.home?.name}
                      size="20px"
                      weight="bold"
                    />
                    <HiOutlineArrowNarrowRight size={30} />
                    <Text
                      type="p"
                      text={formik.values?.destination?.name}
                      size="20px"
                      weight="bold"
                    />
                  </Flex>
                  <Divider />
                  <Grid
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
                  </Grid>
                  <Divider />

                  {shownFees.length ? (
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
                  )}

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

                  <Button
                    width="100%"
                    margin="1rem 0"
                    onClick={nextStep}
                    fontSize="18px"
                  >
                    {nextStepLoading ? (
                      <Spinner size="40px" fill={ttColors.primary} />
                    ) : currentPhase === 5 ? (
                      `Pay ${currencyFormatter(
                        shownFees.reduce(
                          (a, b) =>
                            a + (typeof b.amount === "number" ? b.amount : 0),
                          0
                        ),
                        "NGN"
                      )}`
                    ) : (
                      "Continue"
                    )}
                  </Button>

                  {/* <Box onClick={() => router.push("/auth/login")}> */}
                  <Text
                    type="p"
                    text="Save Progress & Continue later"
                    size="13px"
                    weight="bold"
                    decoration="underline"
                    cursor="pointer"
                  />
                  {/* </Box> */}
                  <Flex margin="1rem 0" gap=".5rem">
                    <BsShieldFillCheck size="25px" />
                    <div>
                      <Text
                        text="Your info is save with us"
                        type="p"
                        size="16px"
                        weight={400}
                      />
                      <p style={{ fontSize: "14px" }}>
                        For more details, see our &nbsp;
                        <span
                          style={{ color: ttColors.primary, cursor: "pointer" }}
                        >
                          data protection page
                        </span>
                      </p>
                    </div>
                  </Flex>

                  <Flex
                    align="center"
                    cursor="pointer"
                    gap="1rem"
                    onClick={prevStep}
                  >
                    <HiOutlineArrowNarrowLeft
                      color={ttColors.primary}
                      size="30px"
                    />
                    <Text
                      text="Previous"
                      type="p"
                      color={ttColors.primary}
                      size="20px"
                      weight="400"
                    />
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
                <UsefulLinks/>
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

        <Button width="100%" margin="0px" onClick={nextStep} fontSize="18px">
          {nextStepLoading ? (
            <Spinner size="40px" fill={ttColors.primary} />
          ) : currentPhase === 5 ? (
            `Pay ${currencyFormatter(
              shownFees.reduce(
                (a, b) => a + (typeof b.amount === "number" ? b.amount : 0),
                0
              ),
              "NGN"
            )}`
          ) : (
            "Continue"
          )}
        </Button>
      </Flex>
    </>
  );
}

export default ApplicationForm;
