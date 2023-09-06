// @next/next/no-img-element

"use client";

import Button from "src/components/atoms/button";
import CheckBox from "src/components/atoms/checkbox";
// import { Divider } from "@atom/divider";
import Flex from "src/components/atoms/flex";
import { Grid } from "src/components/atoms/grid";
import Input from "src/components/atoms/input";
import Link from "src/components/atoms/link";
import SideBtn from "src/components/atoms/sideBtn";
import Text from "src/components/atoms/text";
import Spinner from "src/components/icons/spinner";
import SectionLayout from "src/components/layouts/sectionLayout";
import sleep from "src/lib/sleep";
import Section from "src/components/molecules/section";
import { Divider } from "@mui/material";
import apiService from "hook/apiService";
import { useScreenResolution } from "hook/useScreenResolution";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { useUserStore } from "store/useStore";
import { ttColors } from "theme/colors";
import Image from "@atom/image";

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
};

function LoginPage() {
  const { isMobile } = useScreenResolution();
  const { setUser } = useUserStore((state) => state);
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  useEffect(() => {
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
    return await apiService("/auth/login", "POST", {
      ...loginData,
      email: loginData.email.toLowerCase(),
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submissionState.loading) return;
    setSubmissionState({ ...submissionState, loading: true });
    const res = await handleLogin();
    if (res.statusCode === 401) {
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
    setUser(res?.user);
    toast.success("You have successfully logged in!");
    await sleep(3000);
    toast.loading("Redirecting to your dashboard...", {
      duration: 3000,
    });
    await sleep(2000);
    router.push("/dashboard");
  }

  return (
    <SectionLayout {...(isMobile && { padding: "0" })}>
      <Grid
        columns="repeat(auto-fit, minmax(300px, 1fr))"
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
            <Image
              src={"/assets/images/brand/tt_blue_logo_with_text1.png"}
              alt="logo"
              height={60}
              onClick={() => router.push("/")}
              styles={{ cursor: "pointer" }}
            />
            <SideBtn
              title="Do not have an account? "
              // buttonText="Sign Up"
              linkText="Sign Up"
              linkUrl="/auth/register"
            />
          </Flex>

          <Text
            type="h1"
            margin="2rem 0 .3rem"
            text="Welcome back"
            size={isMobile ? "30px" : "40px"}
            weight={700}
          />
          <Text
            type="p"
            text="Login to access your Travels account"
            size="17px"
          />
          <Flex
            margin={isMobile ? "1rem 0 0" : "2rem 0"}
            width={isMobile ? "100%" : "85%"}
            direction="column"
            gap={".2rem"}
            overflow="unset"
          >
            <Section>
              <Text
                type="p"
                text="Email"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
              />
              <Input
                placeholder="Enter your email"
                height="3rem"
                border={
                  checkIfFieldHasError("email") ? "1px solid #FF8682" : ""
                }
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                value={loginData.email}
              />
            </Section>
            <Section>
              <Text
                type="p"
                text="Password"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
              />
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
                value={loginData.password}
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
                  color="#a0001d"
                  whiteSpace="nowrap"
                  cursor="pointer"
                />
              </Link>
            </Flex>
            <Button
              width="100%"
              margin="2rem 0"
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
            <p
              style={{
                textAlign: "center",
                fontSize: "16px",
                display: isMobile ? "block" : "none",
              }}
            >
              Do not have an account? &nbsp;
              <Link href="/auth/register">
                <Text
                  type="span"
                  text="Sign up"
                  color="#a0001d"
                  cursor="pointer"
                />
              </Link>
            </p>
            <Flex
              justify="center"
              align="center"
              width="100%"
              margin="2rem 0 1rem"
            >
              <Divider
                sx={{ width: isMobile ? "30%" : "33%", color: "#112211" }}
              />
              <Text type="p" text="Or" margin="0 1rem" color="#112211" />
              <Divider
                sx={{ width: isMobile ? "30%" : "33%", color: "#112211" }}
              />
            </Flex>
            <Button
              background="transparent"
              border={`1px solid ${ttColors.primary}`}
              width="100%"
            >
              <img
                src={"/assets/images/google.svg"}
                alt="google"
                height="30"
                width={30}
              />
              <Text
                type="p"
                size={14}
                weight={600}
                text="Login With Google"
                color="#19013b"
                margin="0px 0px 0px .5rem"
              />
            </Button>
          </Flex>
        </Section>
      </Grid>
    </SectionLayout>
  );
}

export default LoginPage;
