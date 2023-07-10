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
import logo from "@image/brand/tt_blue_logo_with_text.png";
import sleep from "@lib/sleep";
import Section from "@molecule/section";
import apiService from "hook/apiService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { ttColors } from "theme/colors";
function RegisterPage() {
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
    const response = await apiService("/user", "POST", registerData);
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
    if (res.statusCode !== 201) {
      setSubmissionState({
        ...submissionState,
        error: res.errors,
        loading: false,
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

            <Flex
              margin="1rem 0"
              direction="column"
              gap="2rem"
              overflow="unset"
            >
              <Flex gap="2rem" justify="space-between">
                <Section>
                  <Input
                    placeholder="First Name"
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
                  <Input
                    placeholder="Last Name"
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
              <Flex gap="2rem" justify="space-between">
                <Section>
                  <Input
                    placeholder="Email"
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
                  <Input
                    placeholder="Phone Number"
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
                <Input
                  placeholder="Password"
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
              <Input
                placeholder="Referral Code"
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    referralCode: e.target.value,
                  })
                }
                height="3rem"
                value={registerData.referralCode}
              />

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
                    <Text
                      type="p"
                      text="I agree to all the Terms and Privacy Policies"
                    />
                  </CheckBox>
                </Flex>
              </Flex>

              {/* <div style={{ margin: "-1rem 0" }}>
                {submissionState.error.length > 0 &&
                  submissionState.error.map((err, i) => (
                    <Text type="p" text={err} color="#FF8682" size="17px" key={i} />
                  ))}
              </div> */}
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
              <p style={{ textAlign: "center", fontSize: "16px" }}>
                Already have an account?{" "}
                <Link href="/auth/login" text="Login" color="#FF8682" />
              </p>
            </Flex>
          </Section>
        </Flex>
      </form>
    </SectionLayout>
  );
}

export default RegisterPage;
