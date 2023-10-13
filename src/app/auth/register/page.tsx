// @next/next/no-img-element
"use client";

import Button from "@atom/button";
import CheckBox from "@molecule/checkbox";
import Flex from "@components/templates/flex";
import Input from "@atom/input";
import Link from "@atom/link";
import Text from "@atom/text";
import Spinner from "@molecule/icons/spinner";
import SectionLayout from "@components/templates/SectionLayout";

import { Grid } from "@components/templates/grid";
import SideBtn from "@molecule/sideBtn";

import sleep from "@lib/extensions/helpers/sleep";
import Section from "src/components/molecules/section";
import apiService from "@lib/extensions/hook/apiService";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { ttColors } from "@lib/theme/colors";
import { AiFillCheckCircle } from "react-icons/ai";
import { validateEmail } from "@/lib/utilFns";

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
};

function RegisterPage() {
  const [selectedOption, setSelectedOption] = useState("length");
  const validationOptions = [
    { value: "length", label: "8 or more characters" },
    { value: "uppercaseLowercase", label: "Uppercase & Lowercase" },
    { value: "number", label: "At least one number" },
    {
      value: "specialCharacter",
      label: "Have Numbers, and Special symbols (e.g., !, @, #, $)",
    },
  ];

  function isPasswordValid(password: string, selectedOption: string) {
    switch (selectedOption) {
      case "length":
        return password.length >= 8;
      case "uppercaseLowercase":
        return /[A-Z]/.test(password) && /[a-z]/.test(password);
      case "number":
        return /\d/.test(password);
      case "specialCharacter":
        return /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password);
      default:
        return false;
    }
  }

  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

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
if(!validateEmail(registerData.email)){
  setSubmissionState({
    ...submissionState,
    error: [
      {
        constraints: "Not a valid email",
        property: "email",
      },
    ],
    loading: false,
  });
  return;
}
    if (registerData.password !== registerData.confirmPassword) {
      setSubmissionState({
        ...submissionState,
        error: [
          {
            constraints: "Password do not match",
            property: "confirmPassword",
          },
          {
            constraints: "Password do not match",
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
          columns={isMobile ? "1fr" : `repeat(auto-fit, minmax(300px, 1fr))`}
          margin={isMobile ? "1rem 0" : "4rem 0"}
          gap="5rem"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          }}
        >
          <Section styles={{ display: isMobile ? "none" : "block" }}>
            <Slider {...settings}>
              <div>
                <img
                  src={"/assets/images/auth-bg.png"}
                  alt="background image"
                  width="100%"
                  height="798px"
                  style={{ borderRadius: "30px", objectFit: "cover" }}
                />
              </div>
              <div>
                <img
                  src={"/assets/images/auth-bg1.png"}
                  alt="background image"
                  width="100%"
                  height="798px"
                  style={{ borderRadius: "30px", objectFit: "cover" }}
                />
              </div>
              <div>
                <img
                  src={"/assets/images/auth-bg2.png"}
                  alt="background image"
                  width="100%"
                  height="798px"
                  style={{ borderRadius: "30px", objectFit: "cover" }}
                />
              </div>
              <div>
                <img
                  src={"/assets/images/auth-bg3.jpeg"}
                  alt="background image"
                  width="100%"
                  height="798px"
                  style={{ borderRadius: "30px", objectFit: "cover" }}
                />
              </div>
              <div>
                <img
                  src={"/assets/images/auth-bg4.jpeg"}
                  alt="background image"
                  width="100%"
                  height="798px"
                  style={{ borderRadius: "30px", objectFit: "cover" }}
                />
              </div>
              <div>
                <img
                  src={"/assets/images/auth-bg5.jpeg"}
                  alt="background image"
                  width="100%"
                  height="798px"
                  style={{ borderRadius: "30px", objectFit: "cover" }}
                />
              </div>

              <div>
                <img
                  src={"/assets/images/auth-bg7.jpeg"}
                  alt="background image"
                  width="100%"
                  height="798px"
                  style={{ borderRadius: "30px", objectFit: "cover" }}
                />
              </div>
              <div>
                <img
                  src={"/assets/images/auth-bg8.jpeg"}
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
                src={"/assets/images/brand/tt_blue_logo_with_text1.png"}
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
              size={isMobile ? "30px" : "40px"}
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
              gap={".5rem"}
              overflow="unset"
            >
              <Flex
                gap=".5rem"
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
                gap=".5rem"
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
                    onChange={(e) => {
                      setRegisterData({
                        ...registerData,
                        email: e.target.value,
                      })
                      setSubmissionState({
                        ...submissionState,
                        error: [
                          {
                            constraints: "",
                            property: "email",
                          },
                        ],
                        loading: false,
                      });
                    }}
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
                <div
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                >
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
                      checkIfFieldHasError("password")
                        ? "1px solid #FF8682"
                        : ""
                    }
                    height="3rem"
                    value={registerData.password}
                  />
                </div>
                {isPasswordFocused && (
                  <Section margin="1rem 0px 0px">
                    <Text
                      type="h1"
                      text="Your Password must have the following."
                      size={16}
                      weight={500}
                      styles={{
                        margin: "0px 0px .9rem 0px",
                        lineHeight: "1.5rem",
                      }}
                    />
                    {validationOptions.map((option) => (
                      <div
                        key={option.value}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "0.5rem",
                          fontSize: "16px",
                          fontWeight: 400,
                          color: isPasswordValid(
                            registerData.password,
                            option.value
                          )
                            ? "#000000"
                            : "#000000",
                        }}
                      >
                        <AiFillCheckCircle
                          size="1.5rem"
                          style={{
                            color: isPasswordValid(
                              registerData.password,
                              option.value
                            )
                              ? "#7BBBD6"
                              : "#B6B6B6",
                          }}
                        />
                        <span style={{ marginLeft: "0.5rem" }}>
                          {option.label}
                        </span>
                      </div>
                    ))}
                  </Section>
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
                  onChange={(e) => {
                    setRegisterData({
                      ...registerData,
                      confirmPassword: e.target.value,
                    });
                    setSubmissionState({
                      ...submissionState,
                      error: [
                        {
                          constraints: "",
                          property: "confirmPassword",
                        },
                        {
                          constraints: "",
                          property: "password",
                        },
                        ...submissionState.error,
                      ],
                    });
                  }}
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
                          href="/privacy-policy"
                          text="Terms"
                          color="#a0001d"
                          style={{ fontWeight: "400" }}
                        />
                      </span>
                      &nbsp;and&nbsp;
                      <span style={{ color: "#a0001d", fontWeight: "400" }}>
                        <Link
                          href="/privacy-policy"
                          text=" Privacy Policies"
                          color="#a0001d"
                          style={{ fontWeight: "400" }}
                        />
                      </span>
                    </p>
                  </CheckBox>
                </Flex>
              </Flex>

              <Button
                width="100%"
                margin="1.25rem 0 0"
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
                    size={isMobile ? "16px" : "20px"}
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
                  color={ttColors.primary}
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
