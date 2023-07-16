// @next/next/no-img-element
"use client";
import Button from "@atom/button";
import Flex from "@atom/flex";
import { TextField } from "@atom/input";
import Text from "@atom/text";
import SectionLayout from "@components/layouts/sectionLayout";
import bgImage from "@image/auth-bg.png";
import logo from "@image/brand/tt_blue_logo_with_text.png";
import Section from "@molecule/section";
import { useScreenResolution } from "hook/useScreenResolution";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { ttColors } from "theme/colors";


function VerifyCode() {
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
              text="Verify Code"
              size="20px"
            />
            <Text
              type="p"
              text="An authentication code has been sent to your email."
              size="17px"
            />
            <Flex
              margin="3rem 0"
              direction="column"
              gap="2rem"
              overflow="unset"
            >
              <TextField legend="Enter Code" placeholder="7789BM6X" />
              <p style={{ fontSize: "16px" }}>
                Did not receive a code?{" "}
                <span style={{ color: "#FF8682" }}>Resend</span>
              </p>
              <Button
                width="100%"
                background={ttColors.primary}
                onClick={() => router.push("/auth/change-password")}
              >
                <Text
                  type="p"
                  text="Verify"
                  color={ttColors.dark}
                  size="20px"
                />
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

export default VerifyCode;
