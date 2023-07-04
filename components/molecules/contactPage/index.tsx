"use client";

import Breadcrumb from "@atom/breadcrumb";
import Flex from "@atom/flex";
import TextField from "@mui/material/TextField";
import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useScreenResolution } from "hook/useScreenResolution";
import styled from "styled-components";
import Text from "@atom/text";
import Button from "@atom/button";
import Image from "@atom/image";
import ContactImg from "../../../assets/images/contact.svg";
import { SlLocationPin } from "react-icons/sl";
import { LuPhoneCall } from "react-icons/lu";
import { BsEnvelope } from "react-icons/bs";
import { ImWhatsapp } from "react-icons/im";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { ttColors } from "theme/colors";
import Link from "@atom/link";

const ContactCard = styled.div`
  display: grid;
  justify-content: center;
  width: 50%;
`;

const SocialDiv = styled.div`
  background: ${ttColors.primary};
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
  height: 160px;
  width: 60px;
  position: absolute;
  bottom: 39px;
  right: -61px;
  display: grid;
  place-content: center;
  gap: 1.5rem;
`;

const ContactWrapper = styled.div`
  background: #ffffff;
  width: 100%;
  height: 700px;
  width: 100%;
  box-shadow: 0px 0px 30px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
`;

const ContactPage = () => {
  const { isMobile } = useScreenResolution();

  return (
    <>
      <Breadcrumb />
      <ContactWrapper>
        <Flex justify="space-between" gap="10px" width="100%">
          <form
            style={{ width: "50%", display: "grid", placeContent: "center" }}
          >
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
                  <TextField placeholder="First name" label="First Name" />
                  <TextField placeholder="Last name" label="Last Name" />
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
                  <TextField placeholder="Email" label="Email" />
                  <TextField placeholder="Email" label="Email" />
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
                  label="Your Remark"
                  placeholder="Enter Your Remarks here..."
                  multiline
                  rows={5}
                />
              </Box>
            </Flex>

            <FormGroup sx={{ m: 3, width: "85%" }}>
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
                text="Send"
                type="h4"
                whiteSpace="nowrap"
                weight={400}
                color="#fff"
              />
            </Button>
          </form>
          <ContactCard>
            <Image src={ContactImg} alt="" />
            <Flex gap="20px">
              <Link href="">
                <SlLocationPin size="1.2rem" />
              </Link>
              <Text type="p" text="Our address" />
            </Flex>

            <br />
            <Flex gap="20px">
              <Link href="">
                <LuPhoneCall size="1.2rem" />
              </Link>
              <Text type="p" text="0994949494949494949" />
            </Flex>
            <br />

            <Flex gap="20px">
              <Link href="">
                <ImWhatsapp size="1.2rem" />
              </Link>
              <Text type="p" text="0994949494949494949" />
            </Flex>
            <br />

            <Flex gap="20px">
              <Link href="">
                <BsEnvelope size="1.2rem" />
              </Link>
              <Text type="p" text="vnvjnskjnjnkg@vbdd.com" />
            </Flex>
          </ContactCard>
        </Flex>
      </ContactWrapper>
      <SocialDiv>
        <Link href="">
          <FaFacebookF size="1.2rem" />
        </Link>
        <Link href="">
          <FaTwitter size="1.2rem" />
        </Link>
        <Link href="">
          <FaLinkedinIn size="1.2rem" />
        </Link>
      </SocialDiv>
    </>
  );
};

export default ContactPage;
