"use client";

import Button from "@atom/button";
import Flex from "@components/templates/flex";
import { Grid } from "@components/templates/grid";
import Link from "@atom/link";
import Text from "@atom/text";
import { waitlistSchema } from "src/lib/application/schema";
import { useScreenResolution } from "hook/useScreenResolution";
import { useState } from "react";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import styled from "styled-components";
import Input from "./input";
import { SearchInputAsString } from "@organism/searchInput";
import sleep from "src/lib/sleep";
import apiService from "hook/apiService";
import WaitlistModal from "@organism/modal/components/waitlistModal";
import { useRouter } from "next/navigation";
import { Checkbox, FormControlLabel } from "@mui/material";
import Section from "@molecule/section";
import Image from "./image";

const WaitListWrapper = styled.div`
  overflow-x: hidden;
  height: 100%;
`;

const LeftSide = styled.div`
  height: 100%;
  width: 45%;
  background: #f2f2f2;
  display: grid;
  place-content: flex-start;
  overflow: hidden;
  margin: 1rem 0rem 0rem 1rem;
  padding: 6rem;

  & img {
    width: 425px;
    height: auto;
  }
`;
const LeftSideText = styled.div`
  // margin-left: 20px;

  & h2 {
    font-size: 2rem;
    letter-spacing: 3px;
    margin-bottom: 1rem;
  }
  & p {
    margin-top: 1rem;
    width: 100%;
    line-height: 1.5;
    font-weight: 600;
  }
`;
const RightSide = styled.div`
  width: 55%;
  // padding: 2rem;
  margin: 1rem 2rem 0rem 0rem;
  height: 100%;

  @media screen and (max-width: 900px) {
    width: 100%;
    margin: 0rem;
  }
`;

const RightWrapper = styled.div`
  background: #ffffff;
  height: 100%;
  padding: 2rem;

  @media screen and (max-width: 900px) {
    padding: 1rem;
    height: 100%;
  }
`;

const NavLink = styled.div`
  @media screen and (max-width: 900px) {
    display: block;
  }

  @media screen and (max-width: 900px) {
    & .nav-elements {
      position: absolute;
      right: 0;
      top: 60px;
      background-color: #f3f2f1;
      // width: 19000px;
      /* height: calc(100vh - 60px); */
      height: 50%;
      transition: all 0.3s ease-in;
      overflow: hidden;
      z-index: 999;
    }

    ,
    & .nav-elements.active {
      width: 170px !important;
      display: flex;
      flex-dircetion: column;
    }
  }
`;

const RightSideContent = styled.div`
  margin-top: 2rem;

  & h3 {
    font-size: 1.2rem;
    opacity: 0.8;
    margin-bottom: 1.5rem;
  }
`;

const NavbarSection = styled.div`
  height: 80px;
  padding: 15px;
  position: relative;
  width: 100%;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  background: #ffffff;

  @media screen and (max-width: 390px) {
    height: 65px;
  }
`;

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: space-between;
  // height: 5%;
  align-items: center;
`;

const TtBrand = styled.div`
  // margin-left: -70px;
  & img {
    height: 35px;
    width: 111px;
  }
  @media screen and (max-width: 900px) {
    & img {
      height: 35px;
      width: 111px;
    }
  }
`;

const MenuIcon = styled.svg`
  display: none;
  cursor: pointer;

  @media screen and (max-width: 900px) {
    position: absolute;
    right: -220px;
    display: block;
    top: 18px;
  }

  @media screen and (max-width: 600px) {
    display: block;
    cursor: pointer;
    position: absolute;
    // left: 345px;
    top: 18px;
    display: block;
  }
  @media screen and (max-width: 375px) {
    left: 280px;
  }
`;

const WaitList = () => {
  const WaitListLabel = () => {
    return (
      <Text
        type="p"
        text="I consented to personalized thriller updates."
        size={isMobile ? 15 : 18}
        weight={100}
      />
    );
  };

  const router = useRouter();
  const { isMobile } = useScreenResolution();
  const [showNavbar, setShowNavbar] = useState(false);
  const [waitlistData, setWaitlistData] = useState({
    email: "",
    fullName: "",
    whatsapp: "",
    message: "",
    readiness: "",
  });

  const [submissionState, setSubmissionState] = useState({
    error: [] as string[],
    loading: false,
  });

  const [modalStatus, setModalStatus] = useState({
    show: false,
    number: "",
  });

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  async function handleWaitlist(e: any) {
    e.preventDefault();
    if (submissionState.loading) return;
    setSubmissionState({ loading: true, error: [] });
    try {
      await waitlistSchema.validate(waitlistData, { abortEarly: false });
    } catch (error: any) {
      setSubmissionState({
        ...submissionState,
        error: error.errors.map((x: any) => x.message),
        loading: false,
      });
      return;
    }
    await sleep(1000);
    const response = (await apiService("/waitlist", "POST", {
      ...waitlistData,
      whatsappNumber: waitlistData.whatsapp,
      remarks: waitlistData.message,
      subscribedToNewSletter: true,
    })) as any;
    if (response.statusCode === 201) {
      setModalStatus({
        ...modalStatus,
        show: true,
        number: response.data.number,
      });
    } else if (response.statusCode === 422) {
      setModalStatus({ ...modalStatus, show: true, number: "" });
    } else {
      setSubmissionState({
        ...submissionState,
        error: ["Something went wrong, please try again"],
        loading: false,
      });
    }
    setSubmissionState({ ...submissionState, loading: false, error: [] });
  }

  return (
    <WaitListWrapper>
      <WaitlistModal
        open={modalStatus.show}
        handleClose={() => {
          setModalStatus({ ...modalStatus, show: false });
          router.push("/");
        }}
        number={modalStatus.number}
      />
      <NavLink className={`nav-elements  ${showNavbar && "active"}`}>
        <Grid
          columns={isMobile ? "1fr" : "repeat(4, 1fr)"}
          gap={isMobile ? "2rem" : "0px"}
          align="center"
          justify="right"
          width="100%"
          textAlign="center"
          style={{ placeContent: "center" }}
          margin={isMobile ? "16px auto" : "0px auto"}
        >
          <Link
            href=""
            style={{
              fontSize: "16px",
              fontWeight: "400",
              color: "#2f234f",
              textDecoration: "none",
              marginLeft: isMobile ? "0px " : "30px",
            }}
          >
            <Text text="Events" type="p" />
          </Link>

          <Link
            href=""
            style={{
              fontSize: "16px",
              fontWeight: "400",
              color: "#2f234f",
              textDecoration: "none",
              marginLeft: isMobile ? "0px " : "30px",
            }}
          >
            <Text text="FAQ" type="p" />
          </Link>

          <Link
            href=""
            style={{
              fontSize: "16px",
              fontWeight: "400",
              color: "#2f234f",
              textDecoration: "none",
              marginLeft: isMobile ? "0px " : "30px",
            }}
          >
            <Text text="Inquire" type="p" />
          </Link>

          <Link
            href=""
            style={{
              fontSize: "16px",
              fontWeight: "400",
              marginLeft: isMobile ? "0px " : "30px",
            }}
          >
            <Button>
              <Text
                text="Join now"
                type="p"
                whiteSpace="nowrap"
                weight={400}
                color="#fff"
              />
            </Button>
          </Link>
        </Grid>
      </NavLink>
      <Flex gap="0rem" width="100%" height="100%">
        {!isMobile && (
          <LeftSide>
            <LeftSideText>
              <Text type="h1" text="Why wait?​" />
              <Text
                type="p"
                text="Joining our waitlist is the first step on your journey to the Western world. It's more than just a list – it's your ticket to joining thousands of other people  we have helped to settle in Canada, USA, UK, Australia, New Zealand and other countries"
              />
            </LeftSideText>

            <Image
              src={"/assets/images/waitlist/waitlist-icon.svg"}
              styles={{
                width: "100%",
                height: "auto",
              }}
              alt=""
            />
          </LeftSide>
        )}

        <RightSide>
          <NavbarSection>
            <Container>
              <TtBrand>
                <Link href="/">
                  <Section height={"35px"} styles={{ position: "relative" }}>
                    <Image
                      src={"/assets/images/brand/tt_blue_logo_with_text.svg"}
                      alt=""
                    />
                  </Section>
                </Link>
              </TtBrand>

              <MenuIcon onClick={handleShowNavbar}>
                <RiBarChartHorizontalLine size={30} />
              </MenuIcon>

              {!isMobile && (
                <Grid
                  columns={isMobile ? "1fr" : "repeat(4, 1fr)"}
                  gap={isMobile ? "3rem" : "0px"}
                  align="center"
                  justify="right"
                  width="100%"
                  textAlign="center"
                  style={{
                    placeContent: "center",
                  }}
                >
                  <Link
                    href=""
                    style={{
                      fontSize: "16px",
                      fontWeight: "400",
                      color: "#2f234f",
                      textDecoration: "none",
                      marginLeft: "30px",
                    }}
                  >
                    <Text text="Events" type="p" />
                  </Link>

                  <Link
                    href=""
                    style={{
                      fontSize: "16px",
                      fontWeight: "400",
                      color: "#2f234f",
                      textDecoration: "none",
                      marginLeft: "30px",
                    }}
                  >
                    <Text text="FAQ" type="p" />
                  </Link>

                  <Link
                    href=""
                    style={{
                      fontSize: "16px",
                      fontWeight: "400",
                      color: "#2f234f",
                      textDecoration: "none",
                      marginLeft: "30px",
                    }}
                  >
                    <Text text="Inquire" type="p" />
                  </Link>

                  <Link
                    href=""
                    style={{
                      fontSize: "16px",
                      fontWeight: "400",
                      marginLeft: "30px",
                    }}
                  >
                    <Button>
                      <Text
                        text="Join now"
                        type="p"
                        whiteSpace="nowrap"
                        weight={400}
                        color="#fff"
                      />
                    </Button>
                  </Link>
                </Grid>
              )}
            </Container>
          </NavbarSection>
          <RightWrapper>
            <RightSideContent>
              <h3>Get on the Waitlist – Your Passport to the World!</h3>
              <form style={{ width: "100%" }}>
                <Flex direction="column" gap="0rem">
                  <Flex direction="column" gap="0rem">
                    <Input
                      placeholder="Full name"
                      border={
                        submissionState.error.includes("Full name is required")
                          ? "1px solid red"
                          : ""
                      }
                      onChange={(e) =>
                        setWaitlistData({
                          ...waitlistData,
                          fullName: e.target.value,
                        })
                      }
                      height="45px"
                    />
                    <br />
                    <Input
                      placeholder="Email"
                      onChange={(e) =>
                        setWaitlistData({
                          ...waitlistData,
                          email: e.target.value,
                        })
                      }
                      border={
                        submissionState.error.includes("Email is required") ||
                        submissionState.error.includes(
                          "Please put a valid email"
                        )
                          ? "1px solid red"
                          : ""
                      }
                      height="45px"
                    />
                  </Flex>{" "}
                  <br />
                  <Flex direction="column" gap="0rem">
                    <Input
                      type="number"
                      placeholder="Whatsapp number"
                      onChange={(e) =>
                        setWaitlistData({
                          ...waitlistData,
                          whatsapp: e.target.value,
                        })
                      }
                      border={
                        submissionState.error.includes(
                          "Whatsapp number is required"
                        )
                          ? "1px solid red"
                          : ""
                      }
                      height="45px"
                    />
                    <br />
                    <SearchInputAsString
                      options={[
                        "Ready to Go",
                        "Weighing My Options",
                        "Securing My Finances",
                        "Planning for the Future",
                      ]}
                      value={waitlistData.readiness}
                      onChange={(e) =>
                        setWaitlistData({
                          ...waitlistData,
                          readiness: e,
                        })
                      }
                      border={
                        submissionState.error.includes(
                          "Please select readiness option"
                        )
                          ? "1px solid red"
                          : ""
                      }
                      height="45px"
                    >
                      <Text
                        type="p"
                        text={waitlistData.readiness || "Readiness"}
                        color="#1C1B1F100"
                        weight={100}
                        styles={{ cursor: "pointer" }}
                      />
                    </SearchInputAsString>
                    <br />

                    <Input
                      type="textArea"
                      placeholder="Comment..."
                      onChange={(e) =>
                        setWaitlistData({
                          ...waitlistData,
                          message: e.target.value,
                        })
                      }
                    />
                  </Flex>
                  <Flex justify="flex-start" align="center" gap="1rem">
                    <div style={{ marginTop: "7px" }}>
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label={<WaitListLabel />}
                      />
                    </div>
                  </Flex>
                  {submissionState.error.length > 0 &&
                    submissionState.error.map((err, index) => (
                      <Text text={err} key={index} color="red" type="p" />
                    ))}
                  <Button
                    height="50px"
                    width="175px"
                    styles={{
                      marginTop: "3rem",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                    onClick={handleWaitlist}
                  >
                    <Text
                      text={submissionState.loading ? "Loading..." : "Submit"}
                      type="p"
                      whiteSpace="nowrap"
                      weight={400}
                      color="#fff"
                      transform="uppercase"
                    />
                  </Button>
                </Flex>
              </form>
            </RightSideContent>
          </RightWrapper>
        </RightSide>
      </Flex>
    </WaitListWrapper>
  );
};

export default WaitList;
