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
import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
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
  const [enabled, setEnabled] = useState(false);
  const [promocodeLoading, setPromocodeLoading] = useState(false);
  const [visaButtonClicked, setVisaButtonClicked] = useState(false);
  const [applicationResponse, setApplicationResponse] = useState<any>({});
  const { initializePayment, loading, error, response } = usePaystack();
  async function validatePromoCode() {
    const response = await apiService("visa/verify-promo-code", "POST", {
      promoCode,
    });
    return response;
  }
  async function handleVisaApplication() {
    const response = await apiService("visa/apply", "POST", {
      form: {
        ...formik.values,
        destination: formik.values.destination?.name,
        home: formik.values.destination?.home,
      },
      promoCode,
      payment: currencyFormatter(
        shownFees.reduce(
          (a, b) => a + (typeof b.amount === "number" ? b.amount : 0),
          0
        ),
        "NGN"
      ),
    });
    console.log("response: ", response, formik.values);
    return response;
  }
  const { data, isLoading } = useQuery(["handleVisa"], handleVisaApplication, {
    enabled: visaButtonClicked,
    retry: false,
  });
  const { data: promoData } = useQuery(
    ["promoCode", promoCode],
    validatePromoCode,
    {
      enabled,
      retry: false,
    }
  );
  // localhost:3000/visa/apply?action=payment&type=visa-application-fee&status=success
  const params = useSearchParams();
  // const action = params.get("action"); // payment
  const type = params.get("type"); // visa-application-fee
  const status = params.get("status"); // success | fail

  const [currentPhase, setCurrentPhase] = useState(
    type !== "visa-application-fee" ? 1 : status === "success" ? 6 : 7
  );
  const [nextStepLoading, setNextStepLoading] = useState(false);

  const router = useRouter();

  const nextStep = async () => {
    if (nextStepLoading) return;
    if (currentPhase === 5) return setVisaButtonClicked(true);
    await reloadFee();
    setCurrentPhase(currentPhase + 1);
  };

  const prevStep = async () => {
    if (nextStepLoading || currentPhase === 1) return;
    await reloadFee();
    setCurrentPhase(currentPhase - 1);
  };

  const { user } = useUserStore((state) => state);

  const initialValues = {
    ...visaInitVals,
    home: { name: params.get("home") || "" },
    destination: { name: params.get("destination") || "Canada" },
    visaType: params.get("visaType") || "",
    email: user?.email || "",
  };

  const formik = useFormikHook(initialValues, visaSchema);

  const [formFee, setFormFee] = useState(0);

  async function reloadFee() {
    setNextStepLoading(true);
    setShownFees([]);
    await sleep(200);
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

  const step = getSteps(formik, setFormFee).find((x) => x.id === currentPhase);

  async function handlePromoCode(e: any) {
    e.preventDefault();
    if (!promoCode) return toast.error("Please enter a promo code");
    setEnabled(true);
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
                        For more details, see our
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
              <Button
                width="100%"
                margin="1rem 0"
                onClick={nextStep}
                fontSize="18px"
              >
                <Text type="p" text="Login to your account" />
              </Button>
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
