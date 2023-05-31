"use client";

import Button from "@atom/button";
import CheckBox from "@atom/checkbox";
// import { Divider } from "@atom/divider";
import Flex from "@atom/flex";
import { TextField } from "@atom/input";
import Link from "@atom/link";
import Text from "@atom/text";
import SectionLayout from "@components/layouts/sectionLayout";
import bgImage from "@image/auth-bg.png";
import logo from "@image/brand/tt_blue_logo_with_text.png";
import Section from "@molecule/section";
import { useRouter } from "next/navigation";
import { ttColors } from "theme/colors";
function RegisterPage() {
  const router = useRouter();
  return (
    <SectionLayout>
      <Flex margin="4rem 0" gap="3rem" align="stretch">
        <Section>
          <img src={bgImage.src} alt="background image" width="100%" />
        </Section>
        <Section>
          <img src={logo.src} alt="logo" height="60px" />
          <Text
            type="h1"
            margin="2rem 0 1rem"
            text="Create your account!"
            size="20px"
          />
          <Text
            type="p"
            text="Let’s get you all st up so you can access your personal account."
            size="17px"
          />
          <Flex margin="3rem 0" direction="column" gap="2rem" overflow="unset">
            <Flex gap="2rem" justify="space-between">
              <TextField legend="First Name" placeholder="Michael" />
              <TextField legend="Last Name" placeholder="Kenneth" />
            </Flex>
            <Flex gap="2rem" justify="space-between">
              <TextField legend="Email" placeholder="mike.doe@gmail.com" />
              <TextField
                legend="Phone Number"
                placeholder="+1 (530) 323 4921"
              />
            </Flex>
            <TextField legend="Password" placeholder="******" />
            <TextField legend="Confirm Password" placeholder="******" />
            <TextField legend="Referral Code" placeholder="n/a" />
            <Flex align="center" justify="space-between">
              <Flex align="center">
                <CheckBox>
                  <Text
                    type="p"
                    text="I agree to all the Terms and Privacy Policies"
                  />
                </CheckBox>
              </Flex>
            </Flex>
            <Button
              width="100%"
              background={ttColors.primary}
              onClick={() => router.push("/auth/login")}
            >
              <Text type="p" text="Login" color={ttColors.dark} size="20px" />
            </Button>
            <p style={{ textAlign: "center", fontSize: "16px" }}>
              Already have an account?{" "}
              <Link href="/auth/login" text="Login" color="#FF8682" />
            </p>
            {/* <Flex
              justify="space-between"
              align="center"
              width="90%"
              margin="2rem 0 1rem"
            >
              <Divider sx={{ width: "33%", color: "#112211" }} />
              <Text
                type="p"
                text="Or login with"
                margin="0 1rem"
                color="#112211"
              />
              <Divider sx={{ width: "33%", color: "#112211" }} />
            </Flex> */}
            {/* <Button
              background="transparent"
              border={`1px solid ${ttColors.primary}`}
              width="100%"
            >
              <Image src={google.src} alt="google" height="30" width={30} />
            </Button> */}
          </Flex>
        </Section>
      </Flex>
    </SectionLayout>
  );
}

export default RegisterPage;
