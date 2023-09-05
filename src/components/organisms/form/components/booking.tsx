import Button from "src/components/atoms/button";
import Flex from "src/components/atoms/flex";
import Input from "src/components/atoms/input";
import Text from "src/components/atoms/text";
import google from "@image/google.svg";
import Section from "src/components/molecules/section";
import { Divider, FormControlLabel, Radio } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { ttColors } from "theme/colors";
import FormStepTitle from "./formStepsTitle";
import { useUserStore } from "store/useStore";
import { FormikValues } from "formik";
import { useScreenResolution } from "hook/useScreenResolution";
import VisaApplicationTypeTile from "src/components/molecules/payment/VisaApplicationTypeTile";
import { IoIosArrowDown } from "react-icons/io";
import { SearchInputAsString } from "src/components/atoms/searchInput";
import { BiInfoCircle, BiInfoSquare, BiSolidInfoCircle } from "react-icons/bi";

interface formProps {
  steps: string[];
  index: number;
}

function Booking({ steps, index }: formProps) {
  const { isMobile } = useScreenResolution();

  //   const [payPlan, setPayPlan] = useState("payInFull");
  const [payPlanOptions] = useState([
    {
      name: "Pay in full now",
      description: "Pay the total and you are all set",
    },
    // {
    //   name: "Pay later",
    //   description: "Make payment later from your dashboard",
    // },
  ]);
  const { user } = useUserStore((state) => state);

  return (
    <Section width={isMobile ? "100%" : "50%"}>
      <FormStepTitle steps={steps} index={index} />
      <Section
        styles={{
          background: "#FFFFFF",
          boxShadow: "0px 4px 16px rgba(17, 34, 17, 0.05)",
          borderRadius: "12px",
          margin: isMobile ? "15px 0px" : "2rem 0",
          padding: isMobile ? "0px" : ".1rem 1rem",
        }}
      >
        {payPlanOptions.map((x, i) => (
          <Flex
            background={ttColors.primary}
            padding=".5rem"
            borderRadius="12px"
            key={i}
            margin={isMobile ? ".2rem 0" : "1rem 0"}
          >
            <Section
              margin=".5rem 0"
              padding={isMobile ? "0.2rem 1rem" : "0px"}
            >
              <Text type="p" text={x.name} weight={800} />
              <Text
                type="p"
                text={x.description}
                margin=".6rem 0 0"
                color="#112211"
                weight={100}
              />
            </Section>
            <FormControlLabel
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      color: "#fff",
                    },
                  }}
                />
              }
              checked={true}
              label=""
            />
          </Flex>
        ))}
      </Section>
      {!user?.firstName ? (
        <Section
          styles={{
            background: "#FFFFFF",
            boxShadow: "0px 4px 16px rgba(17, 34, 17, 0.05)",
            borderRadius: "12px",
            margin: isMobile ? "1rem 0" : "2rem 0",
            padding: "1rem",
          }}
        >
          <Text
            type="p"
            text="Do you want to Login or Sign up"
            weight={800}
            size={isMobile ? "1.1rem" : "1.2rem"}
          />
          <Input
            placeholder="Email address"
            margin={isMobile ? ".7rem  0 1rem" : "1rem 0"}
          />
          <Text
            type="p"
            text="An email will be sent to you with a link to login or sign up"
            weight={100}
          />
          <Button width="100%" margin="2rem 0 0">
            <Text
              type="p"
              text="Continue"
              color="#fff"
              weight={500}
              size="1.2rem"
            />
          </Button>

          <Flex justify="space-between" align="center" margin="2rem 0 1rem">
            <Divider
              sx={{ width: isMobile ? "27%" : "33%", color: "#112211" }}
            />
            <Text
              type="p"
              text="Or login with"
              margin="0 1rem"
              color="#112211"
            />
            <Divider
              sx={{ width: isMobile ? "27%" : "33%", color: "#112211" }}
            />
          </Flex>
          <Button
            background="transparent"
            border={`1px solid ${ttColors.primary}`}
            width="100%"
          >
            <Image src={google.src} alt="google" height="30" width={30} />
          </Button>
        </Section>
      ) : (
        ""
      )}
    </Section>
  );
}

export default Booking;
