// @next/next/no-img-element
"use client";
import Button from "@atom/button";
import Flex from "@atom/flex";
import { Grid } from "@atom/grid";
import Input, { TextField } from "@atom/input";
import Text from "@atom/text";
import SectionLayout from "@components/layouts/sectionLayout";
import logo from "@image/brand/tt_blue_logo_with_text1.png";
import google from "@image/google.svg";
import Section from "@molecule/section";
import { Divider } from "@mui/material";
import apiService from "hook/apiService";
import { useScreenResolution } from "hook/useScreenResolution";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { ttColors } from "theme/colors";
import SideBtn from "@atom/sideBtn";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bgImage from "@image/auth-bg.png";
import bgImage1 from "@image/auth-bg1.png";
import bgImage2 from "@image/auth-bg2.png";
import bgImage3 from "@image/auth-bg3.jpeg";
import bgImage4 from "@image/auth-bg4.jpeg";
import bgImage5 from "@image/auth-bg5.jpeg";
import bgImage7 from "@image/auth-bg7.jpeg";
import bgImage8 from "@image/auth-bg8.jpeg";


const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
};


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
      email: email?.toLocaleLowerCase(),
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
      case 401 || 404:
        return router.push("/auth/reset-password");
      default:
        return setSubmissionState({
          ...submissionState,
          error: ["Something went wrong. Please try again"],
        });
    }
  }
  return (
    <SectionLayout {...(isMobile && { padding: "0" })}>
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
        <Section width={isMobile ? "100%" : "90%"}>
          <Flex justify="space-between">
            <img
              src={logo.src}
              alt="logo"
              height={60}
              onClick={() => router.push("/")}
              style={{ cursor: "pointer" }}
            />
            <SideBtn
              title="Dont have an account? "
              linkText="Sign Up"
              linkUrl="/auth/register"
            />
          </Flex>
          {/* <Flex
            margin="2rem 0 0 "
            cursor="pointer"
            align="center"
            gap=".5rem"
            onClick={() => router.push("/auth/login")}
          >
            <IoIosArrowBack />
            <Text type="p" text="Back to login" size="17px" />
          </Flex> */}
          <Text
            type="h1"
            margin="2rem 0 1rem"
            text="Forgot your password?"
            size={isMobile ? "30px" : "40px"}
            weight={700}
          />
          <Text
            type="p"
            text="Don’t worry, happens to all of us. Enter your email below to recover your password"
            size="17px"
          />
          <Flex margin="3rem 0" direction="column" gap="1rem" overflow="unset">
            {/* <TextField
              legend="Email"
              placeholder="mike.doe@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            /> */}
            <Section>
              <Text
                type="p"
                text="Email Address"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
              />
              <Input
                placeholder="mike.doe@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                border={submissionState.error.length ? "1px solid red" : ""}
              />
            </Section>

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

            {/* <Flex justify="space-between" align="center" width="90%">
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
            </Flex> */}
            {/* <Button
              background="transparent"
              border={`1px solid ${ttColors.primary}`}
              width="100%"
            >
              <Image src={google.src} alt="google" height="30" width={30} />
            </Button> */}
          </Flex>
        </Section>
      </Grid>
    </SectionLayout>
  );
}

export default LoginPage;
