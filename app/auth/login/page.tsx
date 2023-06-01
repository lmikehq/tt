// @next/next/no-img-element

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
import google from "@image/google.svg";
import Section from "@molecule/section";
import { Divider } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ttColors } from "theme/colors";
function LoginPage() {
  const router = useRouter();
  return (
    <SectionLayout>
      <Flex margin="4rem 0">
        <Section>
          <img src={logo.src} alt="logo" height="60px" />
          <Text
            type="h1"
            margin="2rem 0 1rem"
            text="Welcome back,"
            size="20px"
          />
          <Text
            type="p"
            text="Login to access your Travels account"
            size="17px"
          />
          <Flex
            margin="3rem 0"
            width="85%"
            direction="column"
            gap="2rem"
            overflow="unset"
          >
            <TextField legend="Email" placeholder="mike.doe@gmail.com" />

            <TextField legend="Password" placeholder="******" />
            <Flex align="center" justify="space-between">
              <Flex align="center">
                <CheckBox>
                  <Text type="p" text="Remember me" />
                </CheckBox>
              </Flex>
              <Link href="/auth/forgot-password">
                <Text
                  type="p"
                  text="Forgot password?"
                  color="#FF8682"
                  whiteSpace="nowrap"
                  cursor="pointer"
                />
              </Link>
            </Flex>
            <Button
              width="100%"
              background={ttColors.primary}
              onClick={() => router.push("/dashboard")}
            >
              <Text type="p" text="Login" color={ttColors.dark} size="20px" />
            </Button>
            <p style={{ textAlign: "center", fontSize: "16px" }}>
              Do not have an account?{" "}
              <Link href="/auth/register" text="Sign up" color="#FF8682" />
            </p>
            <Flex
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
            </Flex>
            <Button
              background="transparent"
              border={`1px solid ${ttColors.primary}`}
              width="100%"
            >
              <Image src={google.src} alt="google" height="30" width={30} />
            </Button>
          </Flex>
        </Section>
        <Section>
          <img src={bgImage.src} alt="background image" width="100%" />
        </Section>
      </Flex>
    </SectionLayout>
  );
}

export default LoginPage;
