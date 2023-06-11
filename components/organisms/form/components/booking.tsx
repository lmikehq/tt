import Button from "@atom/button";
import Flex from "@atom/flex";
import Input from "@atom/input";
import Text from "@atom/text";
import google from "@image/google.svg";
import Section from "@molecule/section";
import { Divider, FormControlLabel, Radio } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { ttColors } from "theme/colors";
import FormStepTitle from "./formStepsTitle";

interface formProps {
  steps: string[];
  index: number;
}

function Booking({ steps, index }: formProps) {
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
  return (
    <Section width="50%">
      <FormStepTitle steps={steps} index={index} />
      <Section
        styles={{
          background: "#FFFFFF",
          boxShadow: "0px 4px 16px rgba(17, 34, 17, 0.05)",
          borderRadius: "12px",
          margin: "2rem 0",
          padding: ".1rem 1rem",
        }}
      >
        {payPlanOptions.map((x, i) => (
          <Flex
            background={ttColors.primary}
            padding=".5rem"
            borderRadius="12px"
            key={i}
            margin="1rem 0"
          >
            <Section margin=".5rem 0">
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

      <Section
        styles={{
          background: "#FFFFFF",
          boxShadow: "0px 4px 16px rgba(17, 34, 17, 0.05)",
          borderRadius: "12px",
          margin: "2rem 0",
          padding: "1rem",
        }}
      >
        <Text
          type="p"
          text="Do you want to Login or Sign up"
          weight={800}
          size="1.2rem"
        />
        <Input placeholder="Email address" margin="1rem 0" />
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

        <Flex
          justify="space-between"
          align="center"
          width="90%"
          margin="2rem 0 1rem"
        >
          <Divider sx={{ width: "33%", color: "#112211" }} />
          <Text type="p" text="Or login with" margin="0 1rem" color="#112211" />
          <Divider sx={{ width: "33%", color: "#112211" }} />
        </Flex>
        <Button
          background="transparent"
          border={`1px solid ${ttColors.primary}`}
          width="100%"
        >
          <Image src={google.src} alt="google" height="30" width={30} />
        </Button>
      </Section>
    </Section>
  );
}

export default Booking;
