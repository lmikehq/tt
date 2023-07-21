// @next/next/no-img-element
"use client";
import Button from "@atom/button";
import Flex from "@atom/flex";
import Input, { TextField } from "@atom/input";
import Link from "@atom/link";
import Text from "@atom/text";
import SectionLayout from "@components/layouts/sectionLayout";
import bgImage from "@image/auth-bg.png";
import logo from "@image/brand/tt_blue_logo_with_text.png";
import Section from "@molecule/section";
import apiService from "hook/apiService";
import { useScreenResolution } from "hook/useScreenResolution";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { ttColors } from "theme/colors";

function VerifyCode() {
  const { isMobile } = useScreenResolution();
  const router = useRouter();
  const [resetDetails, setResetDetails] = useState({
    token: "",
    password: "",
    loading: false,
    error: [] as any,
  });
  async function handleResetPassword() {
    if (resetDetails.loading) return;
    setResetDetails({ ...resetDetails, loading: true });
    if (!resetDetails.token || !resetDetails.password)
      return setResetDetails({
        ...resetDetails,
        loading: false,
        error: ["Please fill all fields"],
      });
    const response = (await apiService(
      "/auth/reset-password",
      "POST",
      resetDetails
    )) as any;
    if (response.statusCode === 200) {
      toast.success("Password reset successful");
      router.push("/auth/login");
    } else {
      setResetDetails({
        ...resetDetails,
        loading: false,
        error: ["Token is invalid or expired"],
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
              text="Change your password"
              size="20px"
            />
            <Text
              type="p"
              text="Enter the authentication code that was sent to your email."
              size="17px"
            />
            <Flex
              margin="3rem 0"
              direction="column"
              gap="2rem"
              overflow="unset"
            >
              <Input
                placeholder="Enter code"
                type="text"
                height="50px"
                onChange={(e) =>
                  setResetDetails({ ...resetDetails, token: e.target.value })
                }
                value={resetDetails.token}
              />
              <Input
                type="password"
                placeholder="New password"
                value={resetDetails.password}
                height="50px"
                onChange={(e) =>
                  setResetDetails({ ...resetDetails, password: e.target.value })
                }
              />
              <p style={{ fontSize: "16px" }}>
                Did not receive a code?{" "}
                <Link href="/auth/forgot-password" color={ttColors.primary}>
                  <span style={{ color: "#FF8682" }}>Resend</span>
                </Link>
              </p>

              {resetDetails?.error?.map((err: any) => (
                <Text type="p" text={err} color="red" />
              ))}

              <Button
                width="100%"
                background={ttColors.primary}
                onClick={handleResetPassword}
              >
                {resetDetails.loading ? (
                  <FaSpinner className="spinner" size={20} />
                ) : (
                  <Text
                    type="p"
                    text="change password"
                    color={ttColors.dark}
                    size="20px"
                  />
                )}
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
