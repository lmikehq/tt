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
import { useScreenResolution } from "hook/useScreenResolution";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BsShieldFillCheck } from "react-icons/bs";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import { styled } from "styled-components";
import { ttColors } from "theme/colors";
import { IFee } from "types";
import { useUserStore } from "store/useStore";
import { usePaystack } from "hook/usePaystack";
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
  const [_enabled, setEnabled] = useState(false);
  // const [visaButtonClicked, setVisaButtonClicked] = useState(false);
  const { initializePayment, loading, error, response } = usePaystack();
  async function handleVisaApplication() {
    const response = await apiService("visa/new-application", "POST", {
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
      passportIssueYear: formik.values.yearOfIssue,
      relationshipToGuarantor: formik.values.guarantorRelationship,
      documents: formik.values.uploadedDocuments,
      // promoCode,
      // payment: currencyFormatter(
      //   shownFees.reduce(
      //     (a, b) => a + (typeof b.amount === "number" ? b.amount : 0),
      //     0
      //   ),
      //   "NGN"
      // ),
    });
    console.log("response: ", response);
    if (response?.status === 201) {
      console.log("got here bro");
      initializePayment({
        amount: shownFees.reduce(
          (a, b) => a + (typeof b.amount === "number" ? b.amount : 0),
          0
        ),
        email: formik.values.email,
        metadata: {
          name: formik.values.lastName,
        },
      });
    }
    return response;
  }
  // const { data, isLoading } = useQuery(["handleVisa"], handleVisaApplication, {
  //   enabled: visaButtonClicked,
  //   retry: false,
  // });
  // const { data: promoData } = useQuery(
  //   ["promoCode", promoCode],
  //   validatePromoCode,
  //   {
  //     enabled,
  //     retry: false,
  //   }
  // );
  // localhost:3000/visa/apply?action=payment&type=visa-application-fee&status=success
  const params = useSearchParams();
  // const action = params.get("action"); // payment
  const type = params.get("type"); // visa-application-fee
  const status = params.get("status"); // success | fail

  const [currentPhase, setCurrentPhase] = useState(
    type !== "visa-application-fee" ? 1 : status === "success" ? 6 : 7
  );
  const [nextStepLoading, setNextStepLoading] = useState(false);

  const nextStep = async () => {
    if (nextStepLoading) return;
    if (currentPhase === 5) return await handleVisaApplication();

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
    destination: { name: params.get("destination") || "" },
    visaType: params.get("visaType") || "",
    email: user?.email || "",
  };

  const formik = useFormikHook(initialValues, visaSchema);
  console.log("user: ", initialValues?.email, user?.email);

  const [formFee, setFormFee] = useState(20000);

  async function reloadFee() {
    setNextStepLoading(true);
    setShownFees([]);
    await sleep(2000);
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
          borderRadius="16px"
          styles={{ boxShadow: "4px 4px 26px rgba(0, 0, 0, 0.25)" }}
          height="auto"
          padding="2rem"
          justify="space-between"
          direction={isMobile ? "column" : "row"}
        >
          {step?.content}

          <Section width="40%">
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
                    <Flex justify="flex-end">
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
                              text="Apply"
                              weight={600}
                              size="1rem"
                            />
                          </Button>
                        </PromoInput>
                      </form>
                    </Section>
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

                  <Text
                    type="p"
                    text="Save Progress & Continue later"
                    size="13px"
                    weight="bold"
                    decoration="underline"
                    cursor="pointer"
                  />
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
                        For more details, see our{" "}
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
                  text="Please select a home country and destination country"
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
    </>
  );
}

export default ApplicationForm;
