"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { Grid } from "@atom/grid";
import Flex from "@atom/flex";
import Link from "@atom/link";
import Text from "@atom/text";
import Button from "@atom/button";
import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Image from "./image";
import waitListImg from "../../assets/images/waitlist/waitlist-icon.svg";
import { useScreenResolution } from "hook/useScreenResolution";
import Logo from "../../assets/images/brand/tt_blue_logo_with_text.png";
import { RiBarChartHorizontalLine } from "react-icons/ri";

const WaitListWrapper = styled.div`
  // display: flex;
  // flex-wrap: wrap;
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

  @media screen and (max-width: 390px) {
    height: fit-content;
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
  // background-color: #fef7e5;
  position: relative;
  // margin-bottom: 1rem;
  width: 100%;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  background: #ffffff;
  // border: 1px solid;
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
  @media screen and (max-width: 900px) {
    & img {
      height: 50px;
      width: 165px;
    }
  }
`;

const MenuIcon = styled.svg`
  display: none;
  cursor: pointer;

  @media screen and (width: 768px) {
    position: absolute;
    left: 691px !important;
    display: block;
    top: 20px;
  }

  @media screen and (max-width: 390px) {
    display: block;
    cursor: pointer;
    position: absolute;
    left: 310px !important;
    top: 25px !important;
    display: block;
  }
`;

const WaitList = () => {
  const { isMobile } = useScreenResolution();
  const [showNavbar, setShowNavbar] = useState(false);

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
                <Image src={Logo} alt="" height={180} />
              </TtBrand>

              <MenuIcon onClick={handleShowNavbar}>
                <RiBarChartHorizontalLine size="2rem" />
              </MenuIcon>

              <NavLink className={`nav-elements  ${showNavbar && "active"}`}>
                <Grid
                  columns={isMobile ? "1fr" : "repeat(4, 1fr)"}
                  gap={isMobile ? "3rem" : "0px"}
                  align="center"
                  justify="flex-start"
                  width="0px"
                  textAlign="center"
                  style={{ placeContent: "center" }}
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
                    <Button
                      height="50px"
                      width="187px"
                      styles={{
                        fontSize: "1.3rem",
                      }}
                    >
                      <Text
                        text="Join now"
                        type="h4"
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
                <Flex direction="column" gap="3rem">
                  <Box
                    component="form"
                    sx={{
                      "& .MuiTextField-root": {
                        width: isMobile ? "100%" : "50%",
                      },
                      "& > div": {
                        display: isMobile ? "grid" : "flex",

                        gap: isMobile ? "3rem" : "1rem",
                      },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <div>
                      <TextField placeholder="Full name" label="Full Name" />
                      <TextField placeholder="Email" label="Email" />
                    </div>
                  </Box>

                  <Box
                    component="form"
                    sx={{
                      "& .MuiTextField-root": {
                        width: "100%",
                      },
                      "& > div": {
                        display: isMobile ? "grid" : "flex",

                        gap: isMobile ? "3rem" : "1rem",
                      },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <div>
                      <TextField
                        placeholder="Whatsapp number"
                        label="Whatsapp Number"
                      />

                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={yourReadiness}
                        sx={{ width: "100%" }}
                        renderInput={(params) => (
                          <TextField {...params} label="Readiness" />
                        )}
                      />
                    </div>
                  </Box>
                  <Box
                    component="form"
                    sx={{
                      "& .MuiTextField-root": { width: "100%" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="outlined-multiline-flexible"
                      label="Your Request"
                      placeholder="Enter Your Requests here..."
                      multiline
                      rows={5}
                    />
                  </Box>
                </Flex>

                <FormGroup sx={{ width: "100%", margin: "1.5rem 0rem" }}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Yes, I agreed to receive the personalised contents and update from thrillers​"
                  />
                </FormGroup>

                <Button
                  height="50px"
                  width="240px"
                  styles={{
                    marginTop: "2rem",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontSize: "1.3rem",
                  }}
                >
                  <Text
                    text="Add me to waitlist"
                    type="h4"
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
                <Image src={Logo} alt="" height={50} />
              </TtBrand>

              <MenuIcon onClick={handleShowNavbar}>
                <RiBarChartHorizontalLine size="2rem" />
              </MenuIcon>

              <Grid
                columns={isMobile ? "1fr" : "repeat(4, 1fr)"}
                gap={isMobile ? "3rem" : "0px"}
                align="center"
                justify="flex-start"
                width="0px"
                textAlign="center"
                style={{ placeContent: "center" }}
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
                  <Button
                    height="50px"
                    width="187px"
                    styles={{
                      fontSize: "1.3rem",
                    }}
                  >
                    <Text
                      text="Join now"
                      type="h4"
                      whiteSpace="nowrap"
                      weight={400}
                      color="#fff"
                      styles={{
                        fontSize: "1.3rem",
                      }}
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
                <Flex direction="column" gap="3rem">
                  <Box
                    component="form"
                    sx={{
                      "& .MuiTextField-root": {
                        width: "50%",
                      },
                      "& > div": {
                        display: "flex",
                        gap: "1rem",
                      },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <div>
                      <TextField placeholder="Full name" label="Full Name" />
                      <TextField placeholder="Emaile" label="Email" />
                    </div>
                  </Box>
                  <Box
                    component="form"
                    sx={{
                      "& .MuiTextField-root": {
                        width: "100%",
                      },
                      "& > div": {
                        display: "flex",
                        gap: "1rem",
                      },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <div>
                      <TextField
                        placeholder="Whatsapp number"
                        label="Whatsapp number"
                      />
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={yourReadiness}
                        sx={{ width: "100%" }}
                        renderInput={(params) => (
                          <TextField {...params} label="Readiness" />
                        )}
                      />
                    </div>
                  </Box>
                  <Box
                    component="form"
                    sx={{
                      "& .MuiTextField-root": { width: "100%" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="outlined-multiline-flexible"
                      label="Your Request"
                      placeholder="Enter Your Requests here..."
                      multiline
                      rows={5}
                    />
                  </Box>
                </Flex>

                <FormGroup sx={{ width: "100%", marginTop: "1.5rem 0rem" }}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Yes, i would like to receive emails and news from Thrilers Travels."
                  />
                </FormGroup>

                <Button
                  height="50px"
                  width="240px"
                  styles={{
                    marginTop: "2rem",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontSize: "1.3rem",
                  }}
                >
                  <Text
                    text="Add me to waitlist"
                    type="h4"
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

const yourReadiness = [
  { label: "Ready to Go" },
  { label: "Weighing My Options" },
  { label: "Securing My Finances" },
  { label: "Planning for the Future" },
];

export default WaitList;


