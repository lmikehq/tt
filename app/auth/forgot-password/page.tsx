// @next/next/no-img-element
"use client";
import Button from "@atom/button";
import Flex from "@atom/flex";
import { TextField } from "@atom/input";
import Text from "@atom/text";
import SectionLayout from "@components/layouts/sectionLayout";
import bgImage from "@image/auth-bg.png";
import logo from "@image/brand/tt_blue_logo_with_text.png";
import google from "@image/google.svg";
import Section from "@molecule/section";
import { Divider } from "@mui/material";
import { useScreenResolution } from "hook/useScreenResolution";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { ttColors } from "theme/colors";



function LoginPage() {
  const { isMobile } = useScreenResolution();
  const router = useRouter();
  return (
    <SectionLayout>
      <Flex margin="4rem 0">
        <Section>
          <Section width={isMobile ? "100%" : "90%"}>
            <img src={logo.src} alt="logo" height="60px" />
            <Flex
              margin="2rem 0 0 "
              cursor="pointer"
              align="center"
              gap=".5rem"
              onClick={() => router.push("/auth/login")}
            >
              <IoIosArrowBack />
              <Text type="p" text="Back to login" size="17px" />
            </Flex>
            <Text
              type="h1"
              margin="2rem 0 1rem"
              text="Forgot your password?"
              size="20px"
            />
            <Text
              type="p"
              text="Don’t worry, happens to all of us. Enter your email below to recover your password"
              size="17px"
            />
            <Flex
              margin="3rem 0"
              direction="column"
              gap="2rem"
              overflow="unset"
            >
              <TextField legend="Email" placeholder="mike.doe@gmail.com" />

              <Button
                width="100%"
                background={ttColors.primary}
                onClick={() => router.push("/auth/verify-code")}
              >
                <Text
                  type="p"
                  text="submit"
                  color={ttColors.dark}
                  size="20px"
                />
              </Button>

              <Flex justify="space-between" align="center" width="90%">
                <Divider
                  sx={{ width: isMobile ? "29%" : "33%", color: "#112211" }}
                />
                <Text
                  type="p"
                  text="Or login with"
                  margin="0 1rem"
                  color="#112211"
                />
                <Divider
                  sx={{ width: isMobile ? "29%" : "33%", color: "#112211" }}
                />
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
        </Section>
        <Section styles={{ display: isMobile ? "none" : "block" }}>
          <img src={bgImage.src} alt="background image" width="100%" />
        </Section>
      </Flex>
    </SectionLayout>
  );
}

export default LoginPage;
