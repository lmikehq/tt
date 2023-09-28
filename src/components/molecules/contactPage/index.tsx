"use client";

import Flex from "@components/templates/flex";
import Image from "@atom/image";
import Link from "@atom/link";
import Text from "@atom/text";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
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
import { ttColors } from "@lib/theme/colors";

import { Divider } from "@atom/divider";

import UsefulLinks from "./components/usefulLink";
import { customNavigationLinks } from "@lib/extensions/data/customNavigationLinks";
import { BiSolidChat } from "react-icons/bi";
import { MdCall, MdLocationOn } from "react-icons/md";
import Section from "../section";
import { FieldInput, FieldString } from "@/components/organisms/fieldInput";
import { Formik, FormikProps } from "formik";
import TextArea from "../textArea";
import Button from "@/components/atoms/button";

const ContactSection = styled.div`
  margin-top: 2.5rem;
`;

const Box = styled.div`
  width: 45%;
  height: fit-content;
  background: #7bbbd6;
  padding: 2.5rem;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  @media (max-width: 900px) {
    width: 100%;
    padding: 1.5rem 1rem;
  }
`;

const Card = styled.div`
  background: #afdef266;
  color: #6092a7;
  width: 301px;
  height: fit-content;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid;
`;

const SmallBox = styled.div`
  width: 78px;
  height: 65px;
  background: #fff;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 900px) {
    width: 49px;
    height: 39px;
  }
`;

const ContactPage = () => {
  const { isMobile } = useScreenResolution();

  return (
    <ContactSection>
      <Flex
        gap={isMobile ? "1rem" : "2rem"}
        justify="space-between"
        direction={isMobile ? "column-reverse" : "row"}
      >
        <Box>
          <Flex
            justify="space-between"
            direction="column"
            align="flex-start"
            gap="3.5rem"
          >
            <Flex justify="flex-start" align="flex-start" gap="1.5rem">
              <SmallBox>
                <BiSolidChat
                  color="#7BBBD6"
                  size={isMobile ? "1rem" : "2rem"}
                />
              </SmallBox>
              <Flex direction="column" gap=".5rem">
                <Flex direction="column" gap="0px">
                  <Text
                    type="h2"
                    text="Chat Us"
                    color="#ffffff"
                    weight={600}
                    size={24}
                  />
                  <Text
                    type="span"
                    text="Thrillers Team is always here to help"
                    color="#ffffff"
                    weight={400}
                    size={16}
                  />
                </Flex>
                <Text
                  type="p"
                  text="support@ thrillers.travel"
                  color="#ffffff"
                  weight={500}
                  size={16}
                />
              </Flex>
            </Flex>

            <Flex justify="flex-start" align="flex-start" gap="1.5rem">
              <SmallBox>
                <MdCall color="#7BBBD6" size={isMobile ? "1rem" : "2rem"} />
              </SmallBox>
              <Flex direction="column" gap=".5rem">
                <Flex direction="column" gap="0px">
                  <Text
                    type="h2"
                    text="Chat Us"
                    color="#ffffff"
                    weight={600}
                    size={24}
                  />
                  <Text
                    type="span"
                    text="Thrillers Team is always here to help"
                    color="#ffffff"
                    weight={400}
                    size={16}
                  />
                </Flex>
                <Text
                  type="p"
                  text="support@ thrillers.travel"
                  color="#ffffff"
                  weight={500}
                  size={16}
                />
              </Flex>
            </Flex>

            <Flex justify="flex-start" align="flex-start" gap="1.5rem">
              <SmallBox>
                <MdLocationOn
                  color="#7BBBD6"
                  size={isMobile ? "1rem" : "2rem"}
                />
              </SmallBox>
              <Flex direction="column" gap=".5rem">
                <Text
                  type="h2"
                  text="Visit Us"
                  color="#ffffff"
                  weight={600}
                  size={24}
                />
                <Text
                  type="span"
                  text="Come say Hello at Our office."
                  color="#ffffff"
                  weight={400}
                  size={16}
                />
              </Flex>
            </Flex>

            <Flex direction="column" gap="1rem" margin="0 0 5rem">
              <Text
                type="h3"
                text="Toronto Canada: Exchange Tower, 130 King Street West Suite 1800, Toronto, Ontario M5X 1E3"
                weight={500}
                font="Poppins"
                size="1rem"
                color="#fff"
              />
              <Text
                type="h3"
                text="London United Kingdom: Old Street, 167 City Road, London UK. EC1V 1AW"
                weight={500}
                font="Poppins"
                size="1rem"
                color="#fff"
              />
              <Text
                type="h3"
                text="Dubai United Arab Emirate: Boulevard Plaza Tower 1, Sheikh Mohammed Bin Rashid Blvd, Business Bay, Dubai UAE."
                weight={500}
                font="Poppins"
                size="1rem"
                color="#fff"
              />
              <Text
                type="h3"
                text="Lagos Nigeria: The Lennox Mall, Block 10, Plot 2&3 Admiralty Way, Lekki Phase 1, Lagos."
                weight={500}
                font="Poppins"
                size="1rem"
                color="#fff"
              />
              <Text
                type="h3"
                text="Lagos Nigeria: The Lennox Mall, Block 10, Plot 2&3 Admiralty Way, Lekki Phase 1, Lagos."
                weight={500}
                font="Poppins"
                size="1rem"
                color="#fff"
              />
              <Text
                type="h3"
                text="Abuja Nigeria: 4th Floor, Tower C Churchgate Plaza, Cadastral Zone, Abuja, 900211"
                weight={500}
                font="Poppins"
                size="1rem"
                color="#fff"
              />
              <Text
                type="h3"
                text="PortHarcourt Nigeria: 129-132, Old Michelin Compound, Trans Amadi Ind. Layout, PortHarcourt 500221"
                weight={500}
                font="Poppins"
                size="1rem"
                color="#fff"
              />
              <Text
                type="h3"
                text="Oshogbo Nigeria: No 7, Adegboye Lasaki Street, Alapata, Offatedo Via Oshogbo, Oshogbo."
                weight={500}
                font="Poppins"
                size="1rem"
                color="#fff"
              />
            </Flex>
          </Flex>

          <Flex justify="space-between" align="flex-start" gap="0px">
            <Link href="https://www.facebook.com/thrillerstravels">
              <FaFacebookF size="2rem" color="#fff" />
            </Link>
            <Link href="https://twitter.com/thrillerstravel">
              <FaTwitter size="2rem" color="#fff" />
            </Link>
            <Link href="http://www.linkedin.com/in/thrillerstravels">
              <FaLinkedinIn size="2rem" color="#fff" />
            </Link>
            <Link href="https://www.instagram.com/thrillerstravel/">
              <FaInstagram size="2rem" color="#fff" />
            </Link>
            <Link href="https://www.tiktok.com/@thrillers_travels?lang=en">
              <FaTiktok size="2rem" color="#fff" />
            </Link>
            <Link href="https://www.youtube.com/@ThrillersTravel">
              <FaYoutube size="2rem" color="#fff" />
            </Link>
          </Flex>
        </Box>

        <Flex width={isMobile ? "100%" : "50%"} direction="column" gap="2.5rem">
          <Flex
            justify={isMobile ? "center" : "space-between"}
            align="center"
            gap="1rem"
            direction={isMobile ? "column" : "row"}
          >
            <Card>
              <Flex gap=".5rem" justify="center" align="center">
                <Image
                  src="/assets/images/check.svg"
                  alt=""
                  height={26}
                  width={26}
                />
                <Text
                  type="p"
                  text="Check Application Status"
                  weight={500}
                  size={16}
                  styles={{ width: "max-content" }}
                />
              </Flex>
            </Card>
            <Card>
              <Flex gap=".5rem" justify="center" align="center">
                <Image
                  src="/assets/images/headset.svg"
                  alt=""
                  height={26}
                  width={26}
                />
                <Text
                  type="p"
                  text="Chat Live Support"
                  weight={500}
                  size={16}
                  styles={{ width: "max-content" }}
                />
              </Flex>
            </Card>
          </Flex>

          <Flex justify="space-between" direction="column" gap="1rem">
            <Text
              type="h1"
              text="Thrillers Team would love to hear from you, Get in touch &nbsp; 👋"
              weight={700}
              size={isMobile ? 22 : 33}
            />

            <form>
              <Flex
                direction="column"
                justify="space-between"
                gap="1rem"
                margin="0 0 1.5rem"
              >
                <Section>
                  <Text
                    type="p"
                    text="Full Name"
                    color="#000000"
                    weight={500}
                    size={18}
                    margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                  />
                  <FieldInput
                    name="fullName"
                    placeholder="Enter your Full Name"
                    formik={Formik}
                  />
                </Section>

                <Section>
                  <Text
                    type="p"
                    weight={500}
                    color="#000000"
                    size={18}
                    text="Email Address"
                    margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                  />
                  <FieldInput
                    name="email"
                    placeholder="Enter your Email Address"
                    formik={Formik}
                  />
                </Section>

                <Section>
                  <Text
                    type="p"
                    text="Contact Reason"
                    weight={500}
                    size={18}
                    margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                  />

                  <FieldString
                    formik={Formik}
                    name={"reasons"}
                    placeholder="Select your reason for contacting"
                    options={ContactOptions}
                  />
                </Section>

                <Section>
                  <Text
                    type="p"
                    weight={500}
                    color="#000000"
                    size={18}
                    text="Message"
                    margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                  />
                  <TextArea
                    name="message"
                    placeholder="Enter your Message"
                    value=""
                    onChange={""}
                    onBlur={""}
                    row={10}
                    style={{ background: "transparent" }}
                  />

                </Section>
              </Flex>
              <Button width="100%">
                <Text type="p" text="Update Status" size={14} weight={500} />
              </Button>
            </form>
          </Flex>
        </Flex>
      </Flex>
    </ContactSection>
  );
};

export const ContactOptions = [
  { label: "Requests to modify travel plans", value: "request" },
  {
    label: "Inquiries about schedules, baggage, and seat allocation",
    value: "Inquiries",
  },
  { label: "Guidance on visas and passport rules.", value: "guidance" },
  {
    label: "Help with payments, billing, and credit card charges.",
    value: "helpOnPayment",
  },
  {
    label: "Inquiries on group bookings and coordination.",
    value: "bookingCoordination",
  },
  { label: "Requesting booking confirmations and invoices", value: "invoice" },
  {
    label: "Help with cancellations and understanding policies.",
    value: "policies",
  },
];

export default ContactPage;
