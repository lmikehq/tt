// @next/next/no-img-element
"use client";

import Button from "@atom/button";
import CheckBox from "@atom/checkbox";
import Flex from "@atom/flex";
import Input from "@atom/input";
import Link from "@atom/link";
import Text from "@atom/text";
import Spinner from "@components/icons/spinner";
import SectionLayout from "@components/layouts/sectionLayout";
import bgImage from "@image/auth-bg.png";
import bgImage1 from "@image/auth-bg1.png";
import bgImage2 from "@image/auth-bg2.png";
import bgImage3 from "@image/auth-bg3.jpeg";
import bgImage4 from "@image/auth-bg4.jpeg";
import bgImage5 from "@image/auth-bg5.jpeg";
// import bgImage6 from "@image/auth-bg6.jpeg";
import bgImage7 from "@image/auth-bg7.jpeg";
import bgImage8 from "@image/auth-bg8.jpeg";
import logo from "@image/brand/tt_blue_logo_with_text1.png";
import sleep from "@lib/sleep";
import Section from "@molecule/section";
import apiService from "hook/apiService";
import { useScreenResolution } from "hook/useScreenResolution";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { ttColors } from "theme/colors";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Grid } from "@atom/grid";
import styled from "styled-components";
import SideBtn from "@atom/sideBtn";



const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
};

function RegisterPage() {
  const { isMobile } = useScreenResolution();

  const router = useRouter();
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
    consent: false,
  });

  const [submissionState, setSubmissionState] = useState({
    loading: false,
    error: [] as any,
    success: false,
  });
  async function handleRegister(): Promise<any> {
    const response = await apiService("/user", "POST", {
      ...registerData,
      email: registerData?.email?.toLowerCase(),
    });
    return response;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submissionState.loading) return;
    setSubmissionState({
      ...submissionState,
      loading: true,
    });
    if (!registerData.consent) {
      setSubmissionState({
        ...submissionState,
        loading: false,
      });
      return alert("Please agree to the terms and conditions");
    }

    if (registerData.password !== registerData.confirmPassword) {
      setSubmissionState({
        ...submissionState,
        error: [
          {
            constraints: "Password and confirm password do not match",
            property: "confirmPassword",
          },
          {
            constraints: "Password and confirm password do not match",
            property: "password",
          },
        ],
        loading: false,
      });
      return;
    }

    const res = await handleRegister();
    if (res.statusCode === 400) {
      return setSubmissionState({
        ...submissionState,
        error: res.errors.message,
        loading: false,
      });
    } else if (res.statusCode === 422) {
      return setSubmissionState({
        ...submissionState,
        error: [{ property: "email", constraints: res.errors.message }],
      });
    }

    setSubmissionState({
      ...submissionState,
      loading: true,
    });
    toast.success("Your account has been created successfully!");
    await sleep(3000);
    toast.loading("Redirecting to login page...", {
      duration: 3000,
    });
    await sleep(500);
    router.push("/auth/login");
  }
  function checkIfFieldHasError(field: string) {
    const error: { constraints: string } = submissionState?.error?.find(
      (err: any) => err.property.includes(field)
    );
    if (error) return error.constraints;
  }
  return (
    <SectionLayout>
      <form onSubmit={handleSubmit}>
        <Grid
          columns="repeat(auto-fit, minmax(300px, 1fr))"
          margin={isMobile ? "1rem 0" : "4rem 0"}
          gap="5rem"
        >
          <Section styles={{ display: isMobile ? "none" : "block" }}>
            <Slider {...settings}>
              <div>
                <img
                  src={bgImage.src}
                  alt="background image"
                  width="100%"
                  height="798px"
                  style={{ borderRadius: "30px", objectFit: "cover" }}
                />
              </div>
              <div>
                <img
                  src={bgImage1.src}
                  alt="background image"
                  width="100%"
                  height="798px"
                  style={{ borderRadius: "30px", objectFit: "cover" }}
                />
              </div>
              <div>
                <img
                  src={bgImage2.src}
                  alt="background image"
                  width="100%"
                  height="798px"
                  style={{ borderRadius: "30px", objectFit: "cover" }}
                />
              </div>
              <div>
                <img
                  src={bgImage3.src}
                  alt="background image"
                  width="100%"
                  height="798px"
                  style={{ borderRadius: "30px", objectFit: "cover" }}
                />
              </div>
              <div>
                <img
                  src={bgImage4.src}
                  alt="background image"
                  width="100%"
                  height="798px"
                  style={{ borderRadius: "30px", objectFit: "cover" }}
                />
              </div>
              <div>
                <img
                  src={bgImage5.src}
                  alt="background image"
                  width="100%"
                  height="798px"
                  style={{ borderRadius: "30px", objectFit: "cover" }}
                />
              </div>
              <div>
                <img
                  src={bgImage7.src}
                  alt="background image"
                  width="100%"
                  height="798px"
                  style={{ borderRadius: "30px", objectFit: "cover" }}
                />
              </div>
              <div>
                <img
                  src={bgImage8.src}
                  alt="background image"
                  width="100%"
                  height="798px"
                  style={{ borderRadius: "30px", objectFit: "cover" }}
                />
              </div>
            </Slider>
          </Section>

          <Section>
            <Flex justify="space-between">
              <img
                src={logo.src}
                alt="logo"
                height={60}
                onClick={() => router.push("/")}
                style={{ cursor: "pointer" }}
              />
              <SideBtn
                title="Already have an account?"
                linkUrl="/auth/login"
                linkText="Login"
              />
            </Flex>
            <Text
              type="h1"
              margin="2rem 0 1rem"
              text="Create your account!"
              size="40px"
              weight={700}
            />
            <Text
              type="p"
              text="Let’s get you all st up so you can access your personal account."
              size="17px"
              weight={400}
            />

            <Flex
              margin="1rem 0"
              direction="column"
              gap={isMobile ? "1rem" : "2rem"}
              overflow="unset"
            >
              <Flex
                gap={isMobile ? "1rem" : "2rem"}
                justify="space-between"
                direction={isMobile ? "column" : "row"}
              >
                <Section>
                  <Text
                    type="p"
                    text="First Name"
                    margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                  />
                  <Input
                    placeholder="Enter your first name"
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        firstName: e.target.value,
                      })
                    }
                    value={registerData.firstName}
                    border={
                      checkIfFieldHasError("firstName")
                        ? "1px solid #FF8682"
                        : ""
                    }
                    height="3rem"
                  />
                  {checkIfFieldHasError("firstName") && (
                    <Text
                      type="p"
                      text={checkIfFieldHasError("firstName") || ""}
                      color="#FF8682"
                    />
                  )}
                </Section>
                <Section>
                  <Text
                    type="p"
                    text="Last Name"
                    margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                  />
                  <Input
                    placeholder="Enter your last name"
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        lastName: e.target.value,
                      })
                    }
                    value={registerData.lastName}
                    border={
                      checkIfFieldHasError("lastName")
                        ? "1px solid #FF8682"
                        : ""
                    }
                    height="3rem"
                  />
                  {checkIfFieldHasError("firstName") && (
                    <Text
                      type="p"
                      text={checkIfFieldHasError("firstName") || ""}
                      color="#FF8682"
                    />
                  )}
                </Section>
              </Flex>
              <Flex
                gap={isMobile ? "1rem" : "2rem"}
                justify="space-between"
                direction={isMobile ? "column" : "row"}
              >
                <Section>
                  <Text
                    type="p"
                    text="Email"
                    margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                  />
                  <Input
                    placeholder="Enter you email"
                    type="email"
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        email: e.target.value,
                      })
                    }
                    value={registerData.email}
                    border={
                      checkIfFieldHasError("email") ? "1px solid #FF8682" : ""
                    }
                    height="3rem"
                  />
                  {checkIfFieldHasError("email") && (
                    <Text
                      type="p"
                      text={checkIfFieldHasError("email") || ""}
                      color="#FF8682"
                    />
                  )}
                </Section>
                <Section>
                  <Text
                    type="p"
                    text="Phone Number"
                    margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                  />
                  <Input
                    placeholder="Enter your phone number"
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        phoneNumber: e.target.value,
                      })
                    }
                    border={
                      checkIfFieldHasError("phoneNumber")
                        ? "1px solid #FF8682"
                        : ""
                    }
                    height="3rem"
                    type="tel"
                    value={registerData.phoneNumber}
                  />
                  {checkIfFieldHasError("phoneNumber") && (
                    <Text
                      type="p"
                      text={checkIfFieldHasError("phoneNumber") || ""}
                      color="#FF8682"
                    />
                  )}
                </Section>
              </Flex>
              <Section>
                <Text
                  type="p"
                  text="Password"
                  margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                />
                <Input
                  placeholder="Enter your password"
                  type="password"
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      password: e.target.value,
                    })
                  }
                  border={
                    checkIfFieldHasError("password") ? "1px solid #FF8682" : ""
                  }
                  height="3rem"
                  value={registerData.password}
                />
                {checkIfFieldHasError("password") && (
                  <Text
                    type="p"
                    text={checkIfFieldHasError("password") || ""}
                    color="#FF8682"
                  />
                )}
              </Section>
              <Section>
                <Text
                  type="p"
                  text="Confirm Password"
                  margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                />
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      confirmPassword: e.target.value,
                    })
                  }
                  border={
                    checkIfFieldHasError("confirmPassword")
                      ? "1px solid #FF8682"
                      : ""
                  }
                  height="3rem"
                  value={registerData.confirmPassword}
                />
                {checkIfFieldHasError("confirmPassword") && (
                  <Text
                    type="p"
                    text={checkIfFieldHasError("confirmPassword") || ""}
                    color="#FF8682"
                  />
                )}
              </Section>
              <section>
                <Text
                  type="p"
                  text="Referral Code"
                  margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                />
                <Input
                  placeholder="Enter your referral code"
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      referralCode: e.target.value,
                    })
                  }
                  height="3rem"
                  value={registerData.referralCode}
                />
              </section>

              <Flex align="center" justify="space-between">
                <Flex align="center">
                  <CheckBox
                    onChange={(x) =>
                      setRegisterData({
                        ...registerData,
                        consent: x.target.checked,
                      })
                    }
                    checked={registerData.consent}
                  >
                    <p
                      style={{
                        fontSize: isMobile ? "15px" : "16px",
                        color: "#1C1B1F",
                      }}
                    >
                      I agree to all the&nbsp;
                      <span style={{ color: "#a0001d", fontWeight: "400" }}>
                        <Link
                          href="/privacy"
                          text="Terms"
                          color="#a0001d"
                          style={{ fontWeight: "400" }}
                        />
                      </span>
                      &nbsp;and&nbsp;
                      <span style={{ color: "#a0001d", fontWeight: "400" }}>
                        <Link
                          href="/privacy"
                          text=" Privacy Policies"
                          color="#a0001d"
                          style={{ fontWeight: "400" }}
                        />
                      </span>
                    </p>
                  </CheckBox>
                </Flex>
              </Flex>

              <div style={{ margin: "-1rem 0" }}>
                {submissionState.error.length > 0 &&
                  submissionState.error.map((err: any, i: number) => (
                    <Text
                      type="p"
                      text={err.constraints}
                      color="#FF8682"
                      size="17px"
                      key={i}
                    />
                  ))}
              </div>
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
                  <Text
                    type="p"
                    text="Create account"
                    color={ttColors.dark}
                    size="20px"
                  />
                )}
              </Button>
              <p
                style={{
                  textAlign: "center",
                  fontSize: "16px",
                  display: isMobile ? "block" : "none",
                }}
              >
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  text="Login"
                  color="#a0001d"
                  style={{
                    fontWeight: "400",
                  }}
                />
              </p>
            </Flex>
          </Section>
        </Grid>
      </form>
    </SectionLayout>
  );
}

export default RegisterPage;
