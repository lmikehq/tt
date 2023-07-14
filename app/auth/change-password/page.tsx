// @next/next/no-img-element

"use client";

import Button from "@atom/button";
// import { Divider } from "@atom/divider";
import Flex from "@atom/flex";
import { TextField } from "@atom/input";
import Text from "@atom/text";
import SectionLayout from "@components/layouts/sectionLayout";
import bgImage from "@image/auth-bg.png";
import logo from "@image/brand/tt_blue_logo_with_text.png";
import Section from "@molecule/section";
import { useScreenResolution } from "hook/useScreenResolution";
import { useRouter } from "next/navigation";
import { ttColors } from "theme/colors";
function ChangePassword() {
  const { isMobile } = useScreenResolution();

  const router = useRouter();
  return (
    <SectionLayout>
      <Flex margin="4rem 0">
        <Section>
          <Section width={isMobile ? "100%" : "90%"}>
            <img src={logo.src} alt="logo" height="60px" />

            <Text
              type="h1"
              margin="2rem 0 1rem"
              text="Set a password"
              size="20px"
            />
            <Text
              type="p"
              text="Your previous password has been reseted. Please set a new password for your account."
              size="17px"
            />
            <Flex
              margin="3rem 0"
              direction="column"
              gap={isMobile ? "1rem" : "2rem"}
              overflow="unset"
            >
              <TextField
                legend="Create Password"
                placeholder="7789BM6X@@H&$K_"
              />
              <TextField
                legend="Re-enter Password"
                placeholder="7789BM6X@@H&$K_"
              />

              <Button
                width="100%"
                background={ttColors.primary}
                onClick={() => router.push("/auth/login")}
              >
                <Text
                  type="p"
                  text="Set password"
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

export default ChangePassword;
