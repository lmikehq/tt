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
import apiService from "hook/apiService";
import { useScreenResolution } from "hook/useScreenResolution";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { ttColors } from "theme/colors";

function LoginPage() {
  const { isMobile } = useScreenResolution();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [submissionState, setSubmissionState] = useState({
    loading: false,
    error: [] as any,
  });
  async function handleForgotPassword() {
    if (submissionState.loading) return;
    setSubmissionState({ ...submissionState, loading: true });
    if (!email) {
      setSubmissionState({
        ...submissionState,
        loading: false,
        error: ["Email is required"],
      });
      return;
    }
    const res = (await apiService("/auth/forgot-password", "POST", {
      email,
    })) as any;
    switch (res?.statusCode) {
      case 200:
        toast.success("Password reset link sent to your email");
        return router.push("/auth/reset-password");
      case 400:
        return setSubmissionState({
          ...submissionState,
          error: [res?.errors?.message[0].constraints],
        });
      case 404:
        return router.push("/auth/reset-password");
      default:
        return setSubmissionState({
          ...submissionState,
          error: ["Something went wrong. Please try again"],
        });
    }

  }
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
              gap="1rem"
              overflow="unset"
            >
              <TextField
                legend="Email"
                placeholder="mike.doe@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />

              {submissionState?.error?.map((err: any, i: number) => (
                <Text type="p" text={err} color="red" key={i} />
              ))}

              <Button
                width="100%"
                background={ttColors.primary}
                onClick={handleForgotPassword}
              >
                {submissionState.loading ? (
                  <FaSpinner className="spinner" size={20} />
                ) : (
                  <Text
                    type="p"
                    text="submit"
                    color={ttColors.dark}
                    size="20px"
                  />
                )}
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
