// @next/next/no-img-element

"use client";

import Button from "@atom/button";
import CheckBox from "@molecule/checkbox";
import Input from "@atom/input";
import Link from "@atom/link";
import Text from "@atom/text";
import SectionLayout from "@components/templates/SectionLayout";
import Flex from "@components/templates/flex";
import { Grid } from "@components/templates/grid";
import apiService from "@lib/extensions/hook/apiService";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import { useUserStore } from "@lib/store/useStore";
import { ttColors } from "@lib/theme/colors";
import Spinner from "@molecule/icons/spinner";
import SideBtn from "@molecule/sideBtn";
import { Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Section from "src/components/molecules/section";
import { checkIfFieldHasError } from "@/lib/utilFns";
import { useGoogleLogin } from "@react-oauth/google";
import AuthModal from "@/components/organisms/auth/AuthModal";
import { rateHawkResourceClient } from "@/lib/axios/axios-client";


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
  const login = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      return await apiService("/auth/google", "POST", {
        token: credentialResponse.access_token,
      })
        .then(async (res) => {
          if (res.statusCode === 401) return;
          setSubmissionState({
            ...submissionState,
            loadingGoogleAuth: true,
          });
          setUser(res?.user);
          toast.success("You have successfully logged in!");
          toast.loading("Redirecting to your dashboard...", {
            duration: 3000,
          });
          router.push("/dashboard");
        })
        .catch((error) => { });
    },
    onError: () => { },
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
    loadingGoogleAuth: false,
    error: [] as any,
    success: false,
  });

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

    if (res?.statusCode === 401) {
      return setSubmissionState({
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
    } else if (res?.token) {
      setSubmissionState({
        ...submissionState,
        loading: true,
      });
      setUser(res?.user);
      window.localStorage.setItem('user', res?.token);
      rateHawkResourceClient.defaults.headers.common['Authorization'] = `Bearer ${res?.token}`;

      toast.success("You have successfully logged in!");
      toast.loading("Redirecting to your dashboard...", {
        duration: 3000,
      });
      return router.push("/dashboard");
    } else {
      setSubmissionState({
        ...submissionState,
        error: [
          { constraints: "something went wrong", property: "email" },
          {
            constraints: "something went wrong",
            property: "password",
          },
        ],
        loading: false,
      });
    }
  }

  return (
    <SectionLayout {...(isMobile && { padding: "0" })}>
      <Grid
        columns="repeat(auto-fit, minmax(300px, 1fr))"
        margin={isMobile ? "0px" : "4rem 0"}
        padding={isMobile ? "1.5rem 2.5rem" : "unset"}
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
                style={{
                  borderRadius: "30px",
                  objectFit: "cover",
                }}
              />
            </div>
            <div>
              <img
                src={"/assets/images/auth-bg1.png"}
                alt="background image"
                width="100%"
                height="798px"
                style={{
                  borderRadius: "30px",
                  objectFit: "cover",
                }}
              />
            </div>
            <div>
              <img
                src={"/assets/images/auth-bg2.png"}
                alt="background image"
                width="100%"
                height="798px"
                style={{
                  borderRadius: "30px",
                  objectFit: "cover",
                }}
              />
            </div>
            <div>
              <img
                src={"/assets/images/auth-bg3.jpeg"}
                alt="background image"
                width="100%"
                height="798px"
                style={{
                  borderRadius: "30px",
                  objectFit: "cover",
                }}
              />
            </div>
            <div>
              <img
                src={"/assets/images/auth-bg4.jpeg"}
                alt="background image"
                width="100%"
                height="798px"
                style={{
                  borderRadius: "30px",
                  objectFit: "cover",
                }}
              />
            </div>
            <div>
              <img
                src={"/assets/images/auth-bg5.jpeg"}
                alt="background image"
                width="100%"
                height="798px"
                style={{
                  borderRadius: "30px",
                  objectFit: "cover",
                }}
              />
            </div>

            <div>
              <img
                src={"/assets/images/auth-bg7.jpeg"}
                alt="background image"
                width="100%"
                height="798px"
                style={{
                  borderRadius: "30px",
                  objectFit: "cover",
                }}
              />
            </div>
            <div>
              <img
                src={"/assets/images/auth-bg8.jpeg"}
                alt="background image"
                width="100%"
                height="798px"
                style={{
                  borderRadius: "30px",
                  objectFit: "cover",
                }}
              />
            </div>
          </Slider>
        </Section>

        <Section>
          <Flex justify="space-between">
            <img
              src={
                "/assets/images/brand/tt_blue_logo_with_text1.png"
              }
              alt="logo"
              height={isMobile ? 45 : 60}
              onClick={() => router.push("/")}
              style={{ cursor: "pointer" }}
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
            margin={isMobile ? "1rem 0" : "2rem 0 1rem"}
            text="Welcome back"
            size={isMobile ? "25px" : "40px"}
            weight={700}
          />
          <Text
            type="p"
            text="Login to access your Travels account"
            size={isMobile ? "14px" : "17px"}
            weight={isMobile ? 300 : 400}
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
                margin={
                  isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"
                }
                size={isMobile ? "14.5px" : "16px"}
              />
              <Input
                placeholder="Enter your email"
                height="3rem"
                border={
                  checkIfFieldHasError(
                    submissionState?.error,
                    "email"
                  )
                    ? "1px solid #FF8682"
                    : ""
                }
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    email: e.target.value,
                  })
                }
                value={loginData.email}
              />
            </Section>
            <Section>
              <Text
                type="p"
                text="Password"
                margin={
                  isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"
                }
                size={isMobile ? "14.5px" : "16px"}
              />
              <Input
                placeholder="******"
                height="3rem"
                type="password"
                border={
                  checkIfFieldHasError(
                    submissionState?.error,
                    "password"
                  )
                    ? "1px solid #FF8682"
                    : ""
                }
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    password: e.target.value,
                  })
                }
                value={loginData.password}
              />
              {checkIfFieldHasError(
                submissionState?.error,
                "email"
              ) && (
                  <Text
                    type="p"
                    text={submissionState.error[0].constraints}
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
                  <Text
                    type="p"
                    text="Remember me"
                    size={isMobile ? "14.5px" : "16px"}
                  />
                </CheckBox>
              </Flex>
              <Link href="/auth/forgot-password">
                <Text
                  type="p"
                  text="Forgot password?"
                  color="#a0001d"
                  whiteSpace="nowrap"
                  cursor="pointer"
                  size={isMobile ? "14.5px" : "16px"}
                />
              </Link>
            </Flex>
            <Button
              width="100%"
              margin=".5rem 0"
              background={
                submissionState.loading
                  ? "#87ceeb36"
                  : ttColors.primary
              }
              onClick={handleSubmit}
            >
              {submissionState.loading ? (
                <Spinner size="40px" fill={ttColors.primary} />
              ) : (
                <Text
                  type="p"
                  text="Login"
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
              Do not have an account? &nbsp;
              <Link href="/auth/register">
                <Text
                  type="span"
                  text="Sign up"
                  color={ttColors.primary}
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
                sx={{
                  width: isMobile ? "30%" : "33%",
                  color: "#112211",
                }}
              />
              <Text
                type="p"
                text="Or"
                margin="0 1rem"
                color="#112211"
              />
              <Divider
                sx={{
                  width: isMobile ? "30%" : "33%",
                  color: "#112211",
                }}
              />
            </Flex>
            <Button
              onClick={login}
              background="transparent"
              border={`1px solid ${ttColors.primary}`}
              width="100%"
            >
              {submissionState.loadingGoogleAuth ? (
                <Spinner size="40px" fill={ttColors.primary} />
              ) : (
                <Flex align="center">
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
                </Flex>
              )}
            </Button>
          </Flex>
        </Section>
      </Grid>
    </SectionLayout>
  );
}

export default LoginPage;
