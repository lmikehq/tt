"use client";

import Image from "@atom/image";
import Link from "@atom/link";
import Text from "@atom/text";
import Flex from "@components/templates/flex";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import styled from "styled-components";
import Button from "@/components/atoms/button";
import { FieldInput, FieldString } from "@/components/organisms/fieldInput";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { BiSolidChat } from "react-icons/bi";
import { MdCall, MdLocationOn } from "react-icons/md";
import Section from "../section";
import TextArea from "../textArea";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import apiService from "@/lib/extensions/hook/apiService";
import { validateEmail } from "@/lib/utilFns";
import Spinner from "../icons/spinner";
import { ttColors } from "@/lib/theme/colors";
import { useUserStore } from "@/lib/store/useStore";
import { COUNTRY_FLAGS } from "@/lib/extensions/data/COUNTRY_FLAGS";

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

const Flag = styled.div`
  height: 45px;
  width: 45px;
  border-radius: 50%;

  @media screen and (max-width: 900px) {
    height: 41px;
    width: 65px;
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
  const { user } = useUserStore();
  const router = useRouter();
  const [formSubmission, setFormSubmission] = useState({
    initialValues: {
      fullName: "",
      email: "",
      reason: "",
      message: "",
    },
    loading: false,
    error: "",
  });
  async function handleSubmit() {
    if (formSubmission.loading) return;
    setFormSubmission({ ...formSubmission, loading: true });
    const { fullName, email, message } = formSubmission.initialValues;
    if (!fullName)
      return setFormSubmission({
        ...formSubmission,
        error: "Please provide your full name",
        loading: false,
      });
    if (!email || !validateEmail(email))
      return setFormSubmission({
        ...formSubmission,
        error: "Please provide a valid email address",
        loading: false,
      });
    if (!message)
      return setFormSubmission({
        ...formSubmission,
        error: "Please provide message",
        loading: false,
      });
    const response = await apiService("/contact", "POST", {
      ...formSubmission.initialValues,
      ...(user && { user: user?._id }),
    });
    if (response?.status === 200) {
      toast.success("Your message has been sent successfully!");
      setFormSubmission({
        ...formSubmission,
        loading: false,
        initialValues: {
          fullName: "",
          email: "",
          reason: "",
          message: "",
        },
      });
    } else {
      toast.error("An error occured, please try again");
      setFormSubmission({
        ...formSubmission,
        loading: false,
        error: response.message,
      });
    }
  }
  const addresses = [
    {
      address:
        "Toronto Canada: Exchange Tower, 130 King Street West Suite 1800, Toronto, Ontario M5X 1E3",
      countryCode: "CA",
      direction:
        "https://www.google.com/maps/place/Exchange+Tower,+130+King+St+W,+Toronto,+ON+M5X+2A2,+Canada/@43.6485354,-79.385917,17z/data=!4m15!1m8!3m7!1s0x882b34d28a4d9355:0xadb9c5c4179614d6!2s130+King+St+W,+Toronto,+ON+M5X+2A2,+Canada!3b1!8m2!3d43.6485315!4d-79.3833421!16s%2Fg%2F11flvrfqqp!3m5!1s0x882b34d261f4dcd5:0xf4cbfd9fae484747!8m2!3d43.648528!4d-79.3833359!16zL20vMDhsNHZx?entry=ttu",
      appointment:
        "https://api.whatsapp.com/send/?phone=%2B2349077210321&text=Hello%2C+Hello+Thrillers+Travels%2C+I+want+to+book+an+appointment+to+come+to+your+Toronto+office.+My+name+is&type=phone_number&app_absent=0",
    },
    {
      address:
        "London United Kingdom: Old Street, 167 City Road, London UK. EC1V 1AW",
      countryCode: "GB",
      direction:
        "https://www.google.com/maps/place/167+City+Rd,+London+EC1V+1AW,+UK/@51.5282756,-0.0921794,17z/data=!3m1!4b1!4m6!3m5!1s0x48761ca6f6650b9f:0x8a0a8d94c4a1f157!8m2!3d51.5282756!4d-0.0895991!16s%2Fg%2F11c5nx_15b?entry=ttu",
      appointment:
        "https://api.whatsapp.com/send/?phone=%2B2349077210321&text=Hello%2C+Hello+Thrillers+Travels%2C+I+want+to+book+an+appointment+to+come+to+your+London+office.+My+name+is&type=phone_number&app_absent=0",
    },
    {
      address:
        "Dubai United Arab Emirate: Boulevard Plaza Tower 1, Sheikh Mohammed Bin Rashid Blvd, Business Bay, Dubai UAE.",
      countryCode: "AE",
      direction:
        "https://www.google.com/maps/place/Boulevard+Plaza,+Tower+1+-+Downtown+Dubai+-+Dubai+-+United+Arab+Emirates/@25.2000941,55.2702614,17z/data=!3m1!4b1!4m6!3m5!1s0x3e5f42816493e4a1:0x9991d05586e972fd!8m2!3d25.2000893!4d55.2751323!16s%2Fg%2F11b6y9f7gk?entry=ttu",
      appointment:
        "https://api.whatsapp.com/send/?phone=%2B2349077210321&text=Hello%2C+Hello+Thrillers+Travels%2C+I+want+to+book+an+appointment+to+come+to+your+UAE+office.+My+name+is&type=phone_number&app_absent=0",
    },
    {
      address:
        "Lagos Nigeria: The Lennox Mall, Block 10, Plot 2&3 Admiralty Way, Lekki Phase 1, Lagos.",
      countryCode: "NG",
      direction:
        "https://www.google.com/maps/place/The+Lennox+Mall/@6.4390473,3.4528698,17z/data=!3m1!4b1!4m6!3m5!1s0x103bf437c0332e21:0xf257f7382c710835!8m2!3d6.439042!4d3.4554447!16s%2Fg%2F11hdsq258h?entry=ttu",
      appointment:
        "https://api.whatsapp.com/send/?phone=%2B2349077210321&text=Hello%2C+Hello+Thrillers+Travels%2C+I+want+to+book+an+appointment+to+come+to+your+Lagos+office.+My+name+is&type=phone_number&app_absent=0",
    },
    {
      address:
        "Abuja Nigeria: 4th Floor, Tower C Churchgate Plaza, Cadastral Zone, Abuja, 900211",
      countryCode: "NG",
      direction:
        "https://www.google.com/maps/place/Churchgate+Tower+Abuja/@9.0489572,7.4703362,17z/data=!3m1!4b1!4m6!3m5!1s0x104e0b0c90624bcf:0xa1d6460ae41e8149!8m2!3d9.0489572!4d7.4752017!16s%2Fg%2F11rvxw16b?entry=ttu",
      appointment:
        "https://api.whatsapp.com/send/?phone=%2B2349077210321&text=Hello%2C+Hello+Thrillers+Travels%2C+I+want+to+book+an+appointment+to+come+to+your+Abuja+office.+My+name+is&type=phone_number&app_absent=0",
    },
    {
      address:
        "PortHarcourt Nigeria: 129-132, Old Michelin Compound, Trans Amadi Ind. Layout, PortHarcourt 500221",
      countryCode: "NG",
      direction:
        "https://www.google.com/maps/place/Trans-Amadi+Industrial+Layout+Rd,+500102,+Port+Harcourt,+Rivers/@4.8243015,7.0365844,17z/data=!3m1!4b1!4m6!3m5!1s0x1069cdb01fd434fb:0x51a1c23f63f24c3d!8m2!3d4.8242962!4d7.0391593!16s%2Fg%2F1tf1knq7?entry=ttu",
      appointment:
        "https://api.whatsapp.com/send/?phone=%2B2349077210321&text=Hello%2C+Hello+Thrillers+Travels%2C+I+want+to+book+an+appointment+to+come+to+your+Port+Hartcourt+office.+My+name+is&type=phone_number&app_absent=0",
    },
    {
      address:
        "Oshogbo Nigeria: No 7, Adegboye Lasaki Street, Alapata, Offatedo Via Oshogbo, Oshogbo.",
      countryCode: "NG",
      direction:
        "https://www.google.com/maps/place/Alhaji+Yaya+Adegboye+St,+230284,+Osogbo,+Osun/@7.7925939,4.52765,17z/data=!3m1!4b1!4m6!3m5!1s0x103787a56a27262d:0xb239996947074e01!8m2!3d7.7925886!4d4.5302249!16s%2Fg%2F11j0tb80fb?entry=ttu",
      appointment:
        "https://api.whatsapp.com/send/?phone=%2B2349077210321&text=Hello%2C+Hello+Thrillers+Travels%2C+I+want+to+book+an+appointment+to+come+to+your+Osogbo+office.+My+name+is&type=phone_number&app_absent=0",
    },
  ];
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
            gap="1.5rem"
          >
            <Link
              href="mailto:support@thrillers.travel?subject= I Need help with - "
              target="_blank"
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
                      text="Reach our support"
                      color="#ffffff"
                      weight={600}
                      size={isMobile?20:24}
                    />
                    <Text
                      type="span"
                      text="Our support is always here to help"
                      color="#ffffff"
                      weight={400}
                      size={16}
                    />
                  </Flex>
                  <Text
                    type="p"
                    text="support@thrillers.travel"
                    color="#ffffff"
                    weight={500}
                    size={16}
                  />
                </Flex>
              </Flex>
            </Link>
            <Link href="tel:09077210321">
              <Flex justify="flex-start" align="flex-start" gap="1.5rem">
                <SmallBox>
                  <MdCall color="#7BBBD6" size={isMobile ? "1rem" : "2rem"} />
                </SmallBox>
                <Flex direction="column" gap=".5rem">
                  <Flex direction="column" gap="0px">
                    <Text
                      type="h2"
                      text="Call us"
                      color="#ffffff"
                      weight={600}
                     size={isMobile?20:24}
                    />
                    <Text
                      type="span"
                      text="Mon-Fri from 10am to 6pm"
                      color="#ffffff"
                      weight={400}
                      size={16}
                    />
                  </Flex>
                  <Text
                    type="p"
                    text="+2349077210321"
                    color="#ffffff"
                    weight={500}
                    size={16}
                  />
                </Flex>
              </Flex>
            </Link>
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
                 size={isMobile?20:24}
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
              {addresses.map((address, i) => (
                <Flex key={i} gap="1rem">
                  <img
                    src={
                      COUNTRY_FLAGS.find((x) => x.code === address.countryCode)
                        ?.flag
                    }
                    alt="flag"
                    style={{
                      height: "45px",
                      width: "45px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <Text
                      type="h3"
                      text={address.address}
                      weight={500}
                      font="Poppins"
                      size="1rem"
                      color="#fff"
                    />
                    <Flex gap="1rem" margin=".8rem 0">
                      <Link href={address.direction} target="_blank">
                        <Button
                          background="transparent"
                          border="1px solid #fff"
                          height="35px"
                        >
                          <Text type="p" size={14} text="Get Direction" />
                        </Button>
                      </Link>
                      <Link href={address.appointment} target="_blank">
                        <Button
                          background="#FFFFFF"
                          width="140px"
                          height="35px"
                        >
                          <Text
                            type="p"
                            text="Book appointment"
                            color="#6092A7"
                            size={14}
                            whiteSpace={isMobile ? "normal" : "nowrap"}
                          />
                        </Button>
                      </Link>
                    </Flex>
                  </div>
                </Flex>
              ))}
              {/* <Text
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
              /> */}
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
            <Card style={{ width: isMobile ? '100%' : '100%'}}>
              <Flex
                gap=".5rem"
                justify="center"
                align="center"
                cursor="pointer"
                onClick={() => router.push("/")}
              >
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
            <Card style={{ width: isMobile ? '100%' : '100%'}}>
              <Flex
                gap=".5rem"
                justify="center"
                align="center"
                cursor="pointer"
              >
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
              text="We take your complaints/enquiries very seriously. Please fill the form below"
              weight={700}
              size={isMobile ? 18 : 22}
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
                    border={
                      formSubmission.error.includes("name")
                        ? "1px solid red"
                        : ""
                    }
                    value={formSubmission.initialValues.fullName}
                    onChange={(e) => {
                      setFormSubmission({
                        ...formSubmission,
                        initialValues: {
                          ...formSubmission.initialValues,
                          fullName: e.target.value,
                        },
                        error: "",
                      });
                    }}
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
                    border={
                      formSubmission.error.includes("email")
                        ? "1px solid red"
                        : ""
                    }
                    value={formSubmission.initialValues.email}
                    onChange={(e) => {
                      setFormSubmission({
                        ...formSubmission,
                        initialValues: {
                          ...formSubmission.initialValues,
                          email: e.target.value,
                        },
                        error: "",
                      });
                    }}
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
                    name={"reason"}
                    placeholder="Select your reason for contacting"
                    options={ContactOptions.map((contact) => contact.label)}
                    value={formSubmission.initialValues.reason}
                    onChange={(e) => {
                      setFormSubmission({
                        ...formSubmission,
                        initialValues: {
                          ...formSubmission.initialValues,
                          reason: e,
                        },
                        error: "",
                      });
                    }}
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
                    value={formSubmission.initialValues.message}
                    onChange={(e) => {
                      setFormSubmission({
                        ...formSubmission,
                        initialValues: {
                          ...formSubmission.initialValues,
                          message: e.target.value,
                        },
                        error: "",
                      });
                    }}
                    onBlur={() => {}}
                    border={
                      formSubmission.error.includes("message")
                        ? "1px solid red"
                        : ""
                    }
                  />
                </Section>
                {formSubmission.error && (
                  <Flex gap=".4rem" align="center">
                    <AiOutlineExclamationCircle color="red" />
                    <Text type="p" text={formSubmission.error} color="red" />
                  </Flex>
                )}
              </Flex>
              <Button width="100%" onClick={handleSubmit} background="#06062A">
                {formSubmission.loading ? (
                  <Spinner size="40px" fill={ttColors.primary} />
                ) : (
                  <Text type="p" text="Send" size={17} weight={500} />
                )}
              </Button>
            </form>
          </Flex>
        </Flex>
      </Flex>
    </ContactSection>
  );
};

export const ContactOptions = [
  { label: "Your visa application", value: "guidance" },
  { label: "Requests to update your application", value: "request" },
  {
    label: "Inquiries about our services",
    value: "Inquiries",
  },
  {
    label: "Help with payments, billing, or your account",
    value: "helpOnPayment",
  },
  { label: "Requesting for information", value: "invoice" },
  {
    label: "Report a technical issue",
    value: "bookingCoordination",
  },
  {
    label: "Book office appointment",
    value: "appointment",
  },
  {
    label: "Partner with Thrillers Travels",
    value: "partner",
  },
  {
    label: "Others",
    value: "others",
  },
];

export default ContactPage;
