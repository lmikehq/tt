"use client";

import Button from "src/components/atoms/button";
import Flex from "src/components/atoms/flex";
import { Grid } from "src/components/atoms/grid";
import Image from "src/components/atoms/image";
import Link from "src/components/atoms/link";
import Text from "src/components/atoms/text";
import { Autocomplete, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { COUNTRY_FLAGS } from "data/COUNTRY_FLAGS";
import { useScreenResolution } from "hook/useScreenResolution";
import { useState } from "react";
import { BsEnvelope } from "react-icons/bs";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { ImWhatsapp } from "react-icons/im";
import { LuPhoneCall } from "react-icons/lu";
import { SlLocationPin } from "react-icons/sl";
import styled from "styled-components";
import { ttColors } from "theme/colors";
import ContactImg from "../../../assets/images/contact.svg";
import ApplicationIcon from "../../../assets/images/customerCare/order-delivery.png";
import CustomerCare from "../../../assets/images/customerservice.png";

import { Divider } from "src/components/atoms/divider";
import OrderStatus from "../../../assets/images/customerCare/resume.png";
import User from "../../../assets/images/customerCare/user.png";
import UsefulLinks from "./components/usefulLink";
import { customNavigationLinks } from "data/customNavigationLinks";

const ContactSection = styled.div`
  margin-top: 2.5rem;
`;

const ContactCard = styled.div`
  display: grid;
  justify-content: start;
  width: 40%;
  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const LinkFrame = styled.div`
  position: relative;
  left: 2rem;
  width: 90%;
`;

const SocialDiv = styled.div`
  background: ${ttColors.primary};
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
  height: fit-content;
  width: 60px;
  padding: 1rem 0rem;
  position: absolute;
  bottom: 60px;
  right: -85px;
  display: grid;
  place-content: center;
  gap: 1.5rem;

  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const ContactWrapper = styled.div`
  background: #ffffff;
  width: 100%;
  height: fit-content;
  width: 100%;
  box-shadow: 0px 0px 7px 3px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  margin-top: 1rem;

  @media screen and (max-width: 900px) {
    form {
      width: 100% !important;
    }
  }
`;

const ContactDetails = styled.div`
  @media screen and (max-width: 900px) {
    height: fit-content;
  }
`;

const ChatAgent = styled.div`
  background: #f8fafc;
  margin-bottom: 2rem;
  height: fit-content;
  border: 1px solid lightgrey;
  border-radius: 5px;
`;

const HelpTool = styled.div`
  margin: 5rem 0rem;
  @media screen and (max-width: 900px) {
    margin: 2rem 0rem;
  }
`;
const HelpHeader = styled.div`
  text-align: center;
  position: relative;
`;

const HelpPara = styled.p`
  text-align: center;
  width: 100%;
  display: grid;
  place-content: center;
  padding: 1rem 8rem;
  margin-bottom: 1rem;

  @media screen and (max-width: 900px) {
    padding: 1rem 3rem;
  }
  @media screen and (max-width: 600px) {
    padding: 1rem;
  }
`;

const CustomerCareImg = styled.div`
  position: relative;
  left: 30px;
  bottom: -7px;

  & img {
    height: 144px;
    width: 144px;
  }

  @media screen and (max-width: 900px) {
    position: relative;
    left: 5px;
    bottom: -8px;

    & img {
      display: block;
    }
  }
  @media screen and (max-width: 768px) {
    & img {
      display: none;
    }
  }
`;
const CustomerCareText = styled.div`
  padding-top: 1rem;

  & h2 {
    line-height: 2;
    color: #19013b;
  }
  & p {
    line-height: 1.5;
    width: 95%;
  }

  @media screen and (max-width: 900px) {
    padding-top: 0rem;
  }
`;

const ContactCardItems = [
  {
    image: ApplicationIcon,
    alt: "",
    text: "Start New Application",
    link: "/visa/apply",
  },
  {
    image: OrderStatus,
    alt: "",
    text: "Application Status",
    link: "/auth/login",
  },
  {
    image: User,
    alt: "",
    text: "Log in to My Account",
    link: "auth/login",
  },
  // {
  //   image: Support,
  //   alt: "",
  //   text: "Support",
  //   link: "#support",
  // },
];

const ContactPage = () => {
  const { isMobile } = useScreenResolution();
  const customNavigationLinks = [
    {
      number: "01",
      text: "Chat with our AI",
      href: "/chat",
    },
    {
      number: "02",
      text: "Chat with an Agent",
      href: "/chat",
    },
    {
      number: "03",
      text: "Chat with our travel guide",
      href: "/chat",
    },
    {
      number: "04",
      text: "Testimony",
      href: "/",
    },
  ];

  const [selectedOption, setSelectedOption] = useState<{
    label: string;
  } | null>(null);

  const renderTextField = () => (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": {
          width: "50%",
          marginTop: isMobile ? "1rem" : "3rem",
        },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField placeholder="Application" label="Application" />
    </Box>
  );

  return (
    <ContactSection>
      <Text
        type="h1"
        text="Contact Us"
        size="2.25rem"
        styles={{ fontFamily: "Poppins" }}
      />
      <Grid
        gap={isMobile ? "1rem" : "3rem"}
        columns={isMobile ? "100%" : "25% 75%"}
        margin="2rem auto"
      >
        <UsefulLinks navigationLinks={customNavigationLinks} />

        <ContactDetails>
          <ChatAgent>
            <Flex
              gap={isMobile ? "1rem" : "3rem"}
              padding={isMobile ? "0.5rem" : "0rem"}
            >
              <CustomerCareImg>
                <Image src={CustomerCare} alt="" />
              </CustomerCareImg>

              <CustomerCareText>
                <Text type="h2" text="Chat with an Agent" />
                <Text
                  type="p"
                  text="Access your account and receive immediate assistance from our dedicated Customer Service team. Our team is available round-the-clock to provide support and resolve any inquiries or problems you may encounter."
                />
              </CustomerCareText>
            </Flex>
          </ChatAgent>

          <HelpTool>
            <HelpHeader>
              <Text
                type="h2"
                text="use self help tools"
                transform="capitalize"
              />
            </HelpHeader>
            <HelpPara>
              <Text
                type="p"
                text="If you have any concerns about your order or need assistance with the application process, take advantage of our convenient tools designed to simplify the experience and help you save time."
              />
            </HelpPara>

            <Grid
              className="contactCard"
              gap="2rem"
              columns={isMobile ? "1fr" : "repeat(3, 1fr)"}
              width="100%"
            >
              {ContactCardItems.map((item, index) => (
                <Link key={index} href={item.link}>
                  <Flex
                    key={index}
                    gap="1rem"
                    justify="center"
                    styles={{
                      background: "#fff",
                      padding: "15px",
                      borderRadius: "5px",
                      boxShadow: "0px 0px 7px 3px rgba(0,0,0,0.1)",
                      width: `{isMobile ? "100%" : "207.13px"}`,
                      height: "64px",
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.alt}
                      styles={{ color: "red" }}
                      height={30}
                      width={30}
                    />
                    <Text type="p" text={item.text} />
                  </Flex>
                </Link>
              ))}
            </Grid>
          </HelpTool>

          <ContactWrapper>
            <Text type="h2" text="Send us a message" />

            <Divider />

            <Text
              margin="2rem 0rem"
              type="p"
              text="Simply complete this form, and we'll provide you with the assistance you require at the earliest opportunity."
            />
            <Grid
              columns={isMobile ? "100%" : "60% 40%"}
              justify={isMobile ? "flex-start" : "space-between"}
              gap="10px"
              width="100%"
            >
              <form
                style={{
                  width: `100%`,
                  display: `${isMobile ? "block" : "grid"}`,
                }}
              >
                <Flex
                  direction="column"
                  gap={isMobile ? "1rem" : "2rem"}
                  width="100%"
                >
                  <Box
                    component="form"
                    sx={{
                      "& .MuiTextField-root": {
                        width: "100%",
                      },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField placeholder="full name" label="Full Name" />
                  </Box>

                  <Box
                    component="form"
                    sx={{
                      "& .MuiTextField-root": {
                        width: "100%",
                      },
                      "& > div": {
                        display: isMobile ? "grid" : "flex",

                        gap: "1rem",
                      },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <div>
                      <TextField placeholder="Email" label="Email" />
                      <TextField placeholder="Phone" label="Phone" />
                    </div>
                  </Box>
                  <Box
                    component="form"
                    sx={{
                      "& .MuiTextField-root": {
                        width: "100%",
                      },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={TravellTo}
                      getOptionLabel={(option) => option.label}
                      sx={{ width: "100%" }}
                      renderInput={(params) => (
                        <TextField {...params} label="Travelling to" />
                      )}
                    />
                  </Box>
                  <Box
                    component="form"
                    sx={{
                      "& .MuiTextField-root": {
                        width: "100%",
                      },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={ContactReason}
                      getOptionLabel={(option) => option.label}
                      sx={{ width: "100%" }}
                      onInputChange={(_e, newInputValue) => {
                        setSelectedOption({ label: newInputValue });
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Contact Reason" />
                      )}
                    />

                    {selectedOption?.label?.includes("Existing applicant") &&
                      renderTextField()}
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
                      label="Your Message"
                      placeholder="Enter Your Message here..."
                      multiline
                      rows={5}
                    />
                  </Box>
                </Flex>

                <Button
                  height="50px"
                  width="240px"
                  styles={{
                    marginTop: "3rem",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontSize: "1.3rem",
                  }}
                >
                  <Text
                    text="Send"
                    type="h4"
                    whiteSpace="nowrap"
                    weight={400}
                    color="#fff"
                  />
                </Button>
              </form>
              <ContactCard>
                {/* <Image src={ContactImg} alt="" styles={{height:'100%'}} /> */}
                <LinkFrame>
                  <Flex gap="20px" align="flex-start">
                    <Link href="">
                      <SlLocationPin size="1.2rem" />
                    </Link>
                    <Link href="https://www.google.com/maps/dir/6.4487012,3.5509084/thrillers+travels/@6.4430573,3.5487716,16z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x103bf71f39b935b1:0xef53f715e7e75726!2m2!1d3.5578637!2d6.437351?entry=ttu">
                      <Text
                        type="p"
                        text="Ikota, Lekki County Homes, IVY HOMES, THRILLERS HOUSE. Lagos Nigeria "
                      />
                    </Link>
                  </Flex>

                  <br />
                  <Flex gap="20px">
                    <Link href="">
                      <LuPhoneCall size="1.2rem" />
                    </Link>
                    <Link href="tel:+2349077210321">
                      <Text type="p" text="+2349077210321" />
                    </Link>
                  </Flex>
                  <br />

                  <Flex gap="20px">
                    <Link href="">
                      <ImWhatsapp size="1.2rem" />
                    </Link>
                    <Link href="https://wa.link/ob8vpa">
                      <Text type="p" text="+2349077210321" />
                    </Link>
                  </Flex>
                  <br />

                  <Flex gap="20px">
                    <Link href="">
                      <BsEnvelope size="1.2rem" />
                    </Link>
                    <Link href="mailto:support@thrillers.travel">
                      <Text type="p" text="support@thrillers.travel" />
                    </Link>
                  </Flex>
                </LinkFrame>
              </ContactCard>
            </Grid>
          </ContactWrapper>

          <SocialDiv>
            <Link href="https://www.facebook.com/thrillerstravels">
              <FaFacebookF size="1.2rem" />
            </Link>
            <Link href="https://twitter.com/thrillerstravel">
              <FaTwitter size="1.2rem" />
            </Link>
            <Link href="http://www.linkedin.com/in/thrillerstravels">
              <FaLinkedinIn size="1.2rem" />
            </Link>
            <Link href="https://www.instagram.com/thrillerstravel/">
              <FaInstagram size="1.2rem" />
            </Link>
            <Link href="https://www.tiktok.com/@thrillers_travels?lang=en">
              <FaTiktok size="1.2rem" />
            </Link>
            <Link href="https://www.youtube.com/@ThrillersTravel">
              <FaYoutube size="1.2rem" />
            </Link>
          </SocialDiv>
        </ContactDetails>
      </Grid>
    </ContactSection>
  );
};

const TravellTo = Object.values(COUNTRY_FLAGS).map((country) => ({
  label: country.name,
  code: country.code,
}));

const ContactReason = [
  {
    label: "Existing applicant: I need help with my Visa Application",
    value: "existo",
  },
  {
    label: "Existing applicant: I need help with my Photo Application",
  },
  {
    label: "New applicant: I am new to the website",
  },
  {
    label: "New Business Partner Only: I am an iVisa Partner",
  },
  {
    label: "Human Resources Only: I'm interested in a job position",
  },
];

export default ContactPage;
