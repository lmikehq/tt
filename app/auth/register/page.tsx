// @next/next/no-img-element
"use client";

import Button from "@atom/button";
import CheckBox from "@atom/checkbox";
import Flex from "@atom/flex";
import { TextField } from "@atom/input";
import Link from "@atom/link";
import Text from "@atom/text";
import SectionLayout from "@components/layouts/sectionLayout";
import bgImage from "@image/auth-bg.png";
import logo from "@image/brand/tt_blue_logo_with_text.png";
import Section from "@molecule/section";
import apiService from "hook/apiService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ttColors } from "theme/colors";
import { useQuery } from "@tanstack/react-query";
function RegisterPage() {
  const router = useRouter();
  const [buttonClicked, setButtonClicked] = useState(false);
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
  async function handleRegister() {
    const response = await apiService("/user", "POST" , registerData);
    console.log("ressy", response);
  }
  const { data, isLoading } = useQuery(["register"], handleRegister, {
    enabled: buttonClicked,
    retry: false,
  });
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("registerData", registerData);
    setButtonClicked(true);
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
              margin="3rem 0"
              direction="column"
              gap="2rem"
              overflow="unset"
            >
              <Flex gap="2rem" justify="space-between">
                <TextField
                  legend="First Name"

                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      firstName: e.target.value,
                    })
                  }
                  value={registerData.firstName}
                />
                <TextField
                  legend="Last Name"
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      lastName: e.target.value,
                    })
                  }
                  value={registerData.lastName}
                />
              </Flex>
              <Flex gap="2rem" justify="space-between">
                <TextField
                  legend="Email"
                  type="email"
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      email: e.target.value,
                    })
                  }
                  value={registerData.email}
                />
                <TextField
                  legend="Phone Number"
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      email: e.target.value,
                    })
                  }
                  value={registerData.email}
                />
              </Flex>
              <TextField
                legend="Password"
                type="password"
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    password: e.target.value,
                  })
                }
                value={registerData.password}
              />
              <TextField
                type="password"
                legend="Confirm Password"
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    confirmPassword: e.target.value,
                  })
                }
                value={registerData.confirmPassword}
              />
              <TextField
                legend="Referral Code"
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    referralCode: e.target.value,
                  })
                }
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
                  >
                    <Text
                      type="p"
                      text="I agree to all the Terms and Privacy Policies"
                    />
                  </CheckBox>
                </Flex>
              </Flex>
              <Button
                width="100%"
                background={ttColors.primary}
                onClick={handleSubmit}
              >
                <Text
                  type="p"
                  text="Create account"
                  color={ttColors.dark}
                  size="20px"
                />
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
