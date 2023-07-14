"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { Grid } from "@atom/grid";
import Flex from "@atom/flex";
import Link from "@atom/link";
import Text from "@atom/text";
import Button from "@atom/button";
import Image from "./image";
import waitListImg from "../../assets/images/waitlist/waitlist-icon.svg";
import { useScreenResolution } from "hook/useScreenResolution";
import Logo from "../../assets/images/brand/tt_blue_logo_with_text.png";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import Input from "./input";
import { SearchInputAsString } from "./searchInput";

const WaitListWrapper = styled.div`
  overflow: hidden;
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

  & img {
    width: 650px;
    height: 664px;
  }
`;
const LeftSideText = styled.div`
  margin-left: 20px;

  & h2 {
    font-size: 2rem;
    letter-spacing: 3px;
    margin-bottom: 1rem;
  }
  & p {
    margin-top: 1rem;
    width: 80%;
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
      width: 0px;
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

  @media screen and (max-width: 390px){
    height: 65px;
  }
`;

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: space-between;
  height: 5%;
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
    left: 345px;
    top: 18px;
    display: block;
  }
  @media screen and (max-width: 375px) {
    left: 280px;
  }
`;

const WaitList = () => {
  const { isMobile } = useScreenResolution();
  const [showNavbar, setShowNavbar] = useState(false);
  const [waitlistData, setWaitlistData] = useState({
    email: "",
    fullName: "",
    whatsapp: "",
    message: "",
    readiness: "",
  });

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  if (isMobile) {
    return (
      <WaitListWrapper>
        <RightSide>
          <NavbarSection>
            <Container>
              <TtBrand>
                <Link href="/">
                  <Image src={Logo} alt="" height={35} />
                </Link>
              </TtBrand>

              <MenuIcon onClick={handleShowNavbar}>
                <RiBarChartHorizontalLine size="1.5rem" />
              </MenuIcon>

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
            </Container>
          </NavbarSection>

          <RightWrapper>
            <RightSideContent>
              <h3>What home you need? </h3>
              <form style={{ width: "100%" }}>
                <Flex direction="column" gap={isMobile ? "1rem" : "3rem"}>
                  <Flex direction="column" gap={isMobile ? "1rem" : "3rem"}>
                    <Input placeholder="Full name" />
                    <Input placeholder="Email" />
                  </Flex>

                  <Flex direction="column" gap={isMobile ? "1rem" : "3rem"}>
                    <Input type="number" placeholder="Whatsapp number" />
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
                    >
                      <Text
                        type="p"
                        text={waitlistData.readiness || "Readiness"}
                        color="#1C1B1F"
                        weight={100}
                        styles={{ cursor: "pointer" }}
                      />
                    </SearchInputAsString>
                  </Flex>

                  <Input type="textArea" placeholder="Your Request" />
                </Flex>
                <Flex justify="flex-start" align="center" gap="1rem">
                  <div style={{ marginTop: "7px" }}>
                    <Input type="checkbox" />
                  </div>
                  <Text
                    type="p"
                    text="I consented to personalized thriller updates."
                    size={15}
                  />
                </Flex>

                <Button
                  height="50px"
                  width="150px"
                  styles={{
                    marginTop: "3rem",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <Text
                    text="Add me to waitlist"
                    type="p"
                    whiteSpace="nowrap"
                    weight={400}
                    color="#fff"
                  />
                </Button>
              </form>
            </RightSideContent>
          </RightWrapper>
        </RightSide>
      </WaitListWrapper>
    );
  }
  return (
    <WaitListWrapper>
      <Flex gap="0rem" width="100%" height="100%">
        <LeftSide>
          <LeftSideText>
            <Text type="h1" text="Thrillers Travels​" />
            <Text
              type="h2"
              text="
              Never wait for anyone"
            />
            <Text
              type="p"
              text=" Our waitlist keeps you informed of the next step, ensuring you
              can secure your spot ahead. We value your patience and anticipate
              a future journey together."
            />
          </LeftSideText>
          <Image src={waitListImg} alt="" />
        </LeftSide>

        <RightSide>
          <NavbarSection>
            <Container>
              <TtBrand>
                <Link href="/">
                  <Image src={Logo} alt="" height={35} />
                </Link>
              </TtBrand>

              <MenuIcon onClick={handleShowNavbar}>
                <RiBarChartHorizontalLine size="2rem" />
              </MenuIcon>

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
            </Container>
          </NavbarSection>
          <RightWrapper>
            <RightSideContent>
              <h3>What home you need? </h3>
              <form style={{ width: "100%" }}>
                <Flex direction="column" gap={isMobile ? "1rem" : "3rem"}>
                  <Flex direction="column" gap={isMobile ? "1rem" : "3rem"}>
                    <Input placeholder="full name" />
                    <Input placeholder="Email" />
                  </Flex>

                  <Flex direction="column" gap={isMobile ? "1rem" : "3rem"}>
                    <Input type="number" placeholder="Whatsapp number" />
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
                    >
                      <Text
                        type="p"
                        text={waitlistData.readiness || "Readiness"}
                        color="#1C1B1F"
                        weight={100}
                        styles={{ cursor: "pointer" }}
                      />
                    </SearchInputAsString>
                  </Flex>

                  <Input type="textArea" placeholder="Your Request"  />
                </Flex>

                <Flex justify="flex-start" align="center" gap="1rem">
                  <div style={{ marginTop: "7px" }}>
                    <Input type="checkbox" />
                  </div>
                  <Text
                    type="p"
                    text="I consented to personalized thriller updates."
                    size={15}
                  />
                </Flex>

                <Button
                  height="50px"
                  width="150px"
                  styles={{
                    marginTop: "3rem",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <Text
                    text="Add me to waitlist"
                    type="p"
                    whiteSpace="nowrap"
                    weight={400}
                    color="#fff"
                  />
                </Button>
              </form>
            </RightSideContent>
          </RightWrapper>
        </RightSide>
      </Flex>
    </WaitListWrapper>
  );
};

export default WaitList;
