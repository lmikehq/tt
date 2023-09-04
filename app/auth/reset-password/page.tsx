// @next/next/no-img-element
"use client";
import Button from "@atom/button";
import Flex from "@atom/flex";
import { Grid } from "@atom/grid";
import Input from "@atom/input";
import Link from "@atom/link";
import SideBtn from "@atom/sideBtn";
import Text from "@atom/text";
import SectionLayout from "@components/layouts/sectionLayout";
import bgImage from "@image/auth-bg.png";
import bgImage1 from "@image/auth-bg1.png";
import bgImage2 from "@image/auth-bg2.png";
import bgImage3 from "@image/auth-bg3.jpeg";
import bgImage4 from "@image/auth-bg4.jpeg";
import bgImage5 from "@image/auth-bg5.jpeg";
import bgImage7 from "@image/auth-bg7.jpeg";
import bgImage8 from "@image/auth-bg8.jpeg";
import logo from "@image/brand/tt_blue_logo_with_text1.png";
import Section from "@molecule/section";
import apiService from "hook/apiService";
import { useScreenResolution } from "hook/useScreenResolution";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { ttColors } from "theme/colors";

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
};

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
              title="Do not have an account? "
              linkText="Login"
              linkUrl="/auth/login"
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
            text="Set new password"
            size={isMobile ? "30px" : "40px"}
            weight={700}
          />
          <Text
            type="p"
            text="Enter a new password with the authentication code that was sent to your email."
            size="17px"
          />
          <Flex
            margin={isMobile ? "1rem 0 " : "3rem 0"}
            direction="column"
            gap="1rem"
            overflow="unset"
          >
            <Section>
              <Text
                type="p"
                text="Email verification code"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
              />
              <Input
                placeholder="Code sent to your email"
                type="text"
                height="50px"
                onChange={(e) =>
                  setResetDetails({ ...resetDetails, token: e.target.value })
                }
                value={resetDetails.token}
              />
            </Section>
            <Section>
              <Text
                type="p"
                text="Enter new password"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
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
            </Section>

            <p style={{ fontSize: "16px" }}>
              Did not receive a code?&nbsp;
              <Link href="/auth/forgot-password" color={ttColors.primary}>
                <span style={{ color: "#a0001d", fontWeight: "600" }}>
                  Resend
                </span>
              </Link>
            </p>

            {resetDetails?.error?.map((err: any, i: number) => (
              <Text type="p" text={err} color="red" key={i} />
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
                  text="Change password"
                  color={ttColors.dark}
                  size="20px"
                />
              )}
            </Button>
          </Flex>
        </Section>
        {/* <Section styles={{ display: isMobile ? "none" : "block" }}>
          <img src={bgImage.src} alt="background image" width="100%" />
        </Section> */}
      </Grid>
    </SectionLayout>
  );
}

export default VerifyCode;
