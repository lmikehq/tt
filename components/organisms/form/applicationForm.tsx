"use client";

import Button from "@atom/button";
import { Divider } from "@atom/divider";
import Flex from "@atom/flex";
import { Grid } from "@atom/grid";
import Input from "@atom/input";
import Text from "@atom/text";
import Spinner from "@components/icons/spinner";
import { visaInitVals, visaSchema } from "@lib/application/schema";
import { getSteps } from "@lib/application/steps";
import sleep from "@lib/sleep";
import Section from "@molecule/section";
import currencyFormatter from "data/currencyFormatter";
import useFormikHook from "hook/useFormik";
import { useScreenResolution } from "hook/useScreenResolution";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import { styled } from "styled-components";
import { ttColors } from "theme/colors";
import { IFee } from "types";

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
    height: 50px !important;
  }
`;

const ApplicationForm = () => {
  const { isMobile } = useScreenResolution();

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
    if (nextStepLoading || currentPhase === 5) return;
    setNextStepLoading(true);
    setShownFees([]);
    await sleep(300);
    setCurrentPhase(currentPhase + 1);
    setShownFees(feeItems);
    setNextStepLoading(false);
  };
  const prevStep = async () => {
    if (nextStepLoading || currentPhase === 1) return;
    setNextStepLoading(true);
    setShownFees([]);
    await sleep(300);
    setCurrentPhase(currentPhase - 1);
    setShownFees(feeItems);
    setNextStepLoading(false);
  };

  const formik = useFormikHook(visaInitVals, visaSchema);
  const [applicationFee, setApplicationFee] = useState(0);
  const feeItems = [
    {
      name: "Fees",
      amount: "Price",
      type: "head",
    },
    {
      name: "Application Fee",
      amount: 30000,
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

  useEffect(() => {
    if (formik.values.applicationFee) {
      switch (formik.values.applicationFee) {
        case "Single":
          setApplicationFee(30000);
          break;
        case "Family":
          setApplicationFee(50000);
          break;
        default:
          setApplicationFee(0);
          break;
      }
    }
  });

  const [shownFees, setShownFees] = useState<IFee[]>(feeItems);

  const step = getSteps(formik).find((x) => x.id === currentPhase);

  function handlePromoCode(e: any) {
    e.preventDefault();
    window.alert("Promo code applied");
  }

  return (
    <>
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
            <Section width="90%">
              <Flex
                align="center"
                justify="space-between"
                // direction={isMobile ? "column" : "row"}
                gap={isMobile ? "1.5rem" : "0rem"}
              >
                <Text type="p" text="Nigeria" size="20px" weight="bold" />
                <HiOutlineArrowNarrowRight size={30} />
                <Text type="p" text="Canada" size="20px" weight="bold" />
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
                      />
                      <Button type="submit">
                        <Text type="p" text="Apply" weight={600} size="1rem" />
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
                  `Pay NGN 20,000 Now`
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
    </>
  );
};

export default ApplicationForm;
