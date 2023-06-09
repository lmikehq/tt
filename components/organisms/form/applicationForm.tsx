"use client";

import Button from "@atom/button";
import { Divider } from "@atom/divider";
import Flex from "@atom/flex";
import { Grid } from "@atom/grid";
import Text from "@atom/text";
import Spinner from "@components/icons/spinner";
import { visaInitVals, visaSchema } from "@lib/application/schema";
import { getSteps } from "@lib/application/steps";
import sleep from "@lib/sleep";
import Section from "@molecule/section";
import { feeItems } from "data/utilData";
import useFormikHook from "hook/useFormik";
import { useState } from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import { ttColors } from "theme/colors";
import { IFee } from "types";

const ApplicationForm = () => {
  const [currentPhase, setCurrentPhase] = useState(3);
  const [nextStepLoading, setNextStepLoading] = useState(false);
  const nextStep = async () => {
    if (nextStepLoading || currentPhase === 4) return;
    setNextStepLoading(true);
    setShownFees([]);
    await sleep(3000);
    setCurrentPhase(currentPhase + 1);
    setShownFees(feeItems);
    setNextStepLoading(false);
  };
  const prevStep = async () => {
    if (nextStepLoading || currentPhase === 1) return;
    setNextStepLoading(true);
    setShownFees([]);
    await sleep(3000);
    setCurrentPhase(currentPhase - 1);
    setShownFees(feeItems);
    setNextStepLoading(false);
  };

  const [shownFees, setShownFees] = useState<IFee[]>(feeItems);

  const formik = useFormikHook(visaInitVals, visaSchema);

  const step = getSteps(formik).find((x) => x.id === currentPhase);
  return (
    <>
      <Flex
        background="#FFFFFF"
        borderRadius="16px"
        styles={{ boxShadow: "4px 4px 26px rgba(0, 0, 0, 0.25)" }}
        height="auto"
        padding="2rem"
        justify="space-between"
      >
        {step?.content}
        <Section width="40%">
          <Section width="90%">
            <Flex align="center" justify="space-between">
              <Text type="p" text="Nigeria" size="20px" weight="bold" />
              <HiOutlineArrowNarrowRight size={30} />
              <Text type="p" text="Canada" size="20px" weight="bold" />
            </Flex>
            <Divider />
            <Grid columns="2fr 1fr" gap=".5rem" margin="2rem 0">
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
                    text={`${item.amount}`}
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
                <Text type="p" text="N20,000" size="25px" weight="bold" />
              </Flex>
            ) : (
              ""
            )}

            <Button
              width="100%"
              margin="1rem 0"
              onClick={nextStep}
              fontSize="18px"
            >
              {nextStepLoading ? (
                <Spinner size="40px" fill={ttColors.primary} />
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
              styles={{
                cursor: "pointer",
              }}
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
                  <span style={{ color: ttColors.primary }}>
                    data protection page
                  </span>
                </p>
              </div>
            </Flex>

            <Flex align="center" cursor="pointer" gap="1rem" onClick={prevStep}>
              <HiOutlineArrowNarrowLeft color={ttColors.primary} size="30px" />
              <Text
                text="Previous"
                type="p"
                color={ttColors.primary}
                size="20px"
                weight="400"
              />
            </Flex>
          </Section>
        </Section>
      </Flex>
    </>
  );
};

export default ApplicationForm;
