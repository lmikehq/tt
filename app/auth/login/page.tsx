// @next/next/no-img-element

"use client";

import Button from "@atom/button";
import CheckBox from "@atom/checkbox";
// import { Divider } from "@atom/divider";
import Flex from "@atom/flex";
import Input, { TextField } from "@atom/input";
import Link from "@atom/link";
import Text from "@atom/text";
import Spinner from "@components/icons/spinner";
import SectionLayout from "@components/layouts/sectionLayout";
import bgImage from "@image/auth-bg.png";
import logo from "@image/brand/tt_blue_logo_with_text.png";
import google from "@image/google.svg";
import sleep from "@lib/sleep";
import Section from "@molecule/section";
import { Divider } from "@mui/material";
import apiService from "hook/apiService";
import { useScreenResolution } from "hook/useScreenResolution";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { ttColors } from "theme/colors";

function LoginPage() {
  const { isMobile } = useScreenResolution();

  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  useEffect(() => {
    console.log("loginData: ", loginData);
    if (submissionState.error.length > 0) {
      setSubmissionState({
        ...submissionState,
        error: [],
      });
    }
  }, [loginData, loginData]);

  const [submissionState, setSubmissionState] = useState({
    loading: false,
    error: [] as any,
    success: false,
  });

  function checkIfFieldHasError(field: string) {
    const error: { constraints: string } = submissionState?.error?.find(
      (err: any) => err.property.includes(field)
    );
    if (error) return error.constraints;
  }

  async function handleLogin(): Promise<any> {
    return await apiService("/auth/login", "POST", loginData);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submissionState.loading) return;
    setSubmissionState({ ...submissionState, loading: true });
    const res = await handleLogin();
    if (res.statusCode === 401) {
      console.log("entered: ", res);
      setSubmissionState({
        ...submissionState,
        error: [
          {
            constraints: "Invalid email or password",
            property: "email",
          },
          {
            constraints: "Invalid email or password",
            property: "password",
          },
        ],
        loading: false,
      });
      return;
    }
    setSubmissionState({
      ...submissionState,
      loading: true,
    });
    toast.success("You have successfully logged in!");
    await sleep(3000);
    toast.loading("Redirecting to your dashboard...", {
      duration: 3000,
    });
    await sleep(2000);
    router.back();
  }

  return (
    <SectionLayout>
      <Flex margin="4rem 0">
        <Section>
          <img
            src={logo.src}
            alt="logo"
            height={60}
            onClick={() => router.push("/")}
            style={{ cursor: "pointer" }}
          />

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
            width={isMobile ? "100%" : "85%"}
            direction="column"
            gap={isMobile ? "1rem" : "2rem"}
            overflow="unset"
          >
            <Section>
              <Input
                placeholder="Enter your email"
                height="3rem"
                border={
                  checkIfFieldHasError("email") ? "1px solid #FF8682" : ""
                }
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
              />
            </Section>
            <Section>
              <Input
                placeholder="******"
                height="3rem"
                type="password"
                border={
                  checkIfFieldHasError("password") ? "1px solid #FF8682" : ""
                }
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />
              {checkIfFieldHasError("email") && (
                <Text
                  type="p"
                  text={"Invalid email or password"}
                  color="#FF8682"
                  margin={"0.5rem 0 0"}
                />
              )}
            </Section>
            <Flex align="center" justify="space-between">
              <Flex align="center">
                <CheckBox
                  checked={loginData.rememberMe}
                  onChange={() => {
                    setLoginData({
                      ...loginData,
                      rememberMe: !loginData.rememberMe,
                    });
                  }}
                >
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
              background={
                submissionState.loading ? "#87ceeb36" : ttColors.primary
              }
              onClick={handleSubmit}
            >
              {submissionState.loading ? (
                <Spinner size="40px" fill={ttColors.primary} />
              ) : (
                <Text type="p" text="Login" color={ttColors.dark} size="20px" />
              )}
            </Button>
            <p style={{ textAlign: "center", fontSize: "16px" }}>
              Do not have an account? &nbsp;
              <Link href="/auth/register" text="Sign up" color="#FF8682" />
            </p>
            <Flex
              justify="space-between"
              align="center"
              width={isMobile ? "100%" : "90%"}
              margin="2rem 0 1rem"
            >
              <Divider
                sx={{ width: isMobile ? "30%" : "33%", color: "#112211" }}
              />
              <Text
                type="p"
                text="Or login with"
                margin="0 1rem"
                color="#112211"
              />
              <Divider
                sx={{ width: isMobile ? "30%" : "33%", color: "#112211" }}
              />
            </Flex>
            <Button
              background="transparent"
              border={`1px solid ${ttColors.primary}`}
              width="100%"
            >
              <img src={google.src} alt="google" height="30" width={30} />
            </Button>
          </Flex>
        </Section>
        <Section styles={{ display: isMobile ? "none" : "block" }}>
          <img src={bgImage.src} alt="background image" width="100%" />
        </Section>
      </Flex>
    </SectionLayout>
  );
}

export default LoginPage;
