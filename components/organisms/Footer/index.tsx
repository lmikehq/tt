"use client";

import Flex from "@atom/flex";
import { Grid } from "@atom/grid";
import Link from "@atom/link";
import Text from "@atom/text";
import TTLogo from "@image/brand/tt_blue_logo_with_text.png";
import NewsLetter from "@organism/NewsLetter";
import Image from "next/image";
import { AiFillInstagram } from "react-icons/ai";
import { BsFacebook, BsTwitter, BsYoutube } from "react-icons/bs";
import styled from "styled-components";
import Section from "@molecule/section";
import Barcode from "@image/walink.png";
import AppLogo from "@image/app-store.svg";
import PlayStore from "@image/google-play.svg";
import { useScreenResolution } from "hook/useScreenResolution";
import SectionLayout from "@components/layouts/sectionLayout";
import { FaTelegramPlane, FaTiktok } from "react-icons/fa";
import { ImLinkedin } from "react-icons/im";
import { RiWhatsappFill } from "react-icons/ri";

const FooterWrapper = styled.footer`
  width: 100%;
  height: fit-content;
  margin-top: 17rem;
  display: flex;
  padding: 5rem 0;
  background-color: var(--primary-color);
  position: relative;
  bottom: 0;
  left: 0;
`;

const FooterIcons = [
  {
    id: 1,
    icon: <BsFacebook size="1.5rem" color="#06062A" />,
    url: "https://www.facebook.com/thrillerstravels",
  },

  {
    id: 2,
    icon: <BsTwitter size="1.5rem" color="#06062A" />,
    url: "https://wwww.twitter.com/thrillerstravel",
  },

  {
    id: 3,
    icon: <BsYoutube size="1.5rem" color="#06062A" />,
    url: "https://wwww.youtube.com/@ThrillersTravel",
  },

  {
    id: 4,
    icon: <AiFillInstagram size="1.5rem" color="#06062A" />,
    url: "https://wwww.instagram.com/thrillerstravel",
  },
  {
    id: 5,
    icon: <FaTiktok size="1.5rem" color="#06062A" />,
    url: "https://wwww.instagram.com/thrillerstravel",
  },
  {
    id: 6,
    icon: <ImLinkedin size="1.5rem" color="#06062A" />,
    url: "http://www.linkedin.com/in/thrillerstravels",
  },
  {
    id: 7,
    icon: <RiWhatsappFill size="1.5rem" color="#06062A" />,
    url: "https://wa.link/37nz51",
  },
  {
    id: 8,
    icon: <FaTelegramPlane size="1.5rem" color="#06062A" />,
    url: "https://wwww.instagram.com/thrillerstravel",
  },
];

// tiktok, google, email, chatbots

// const FooterLinks = [
//   {
//     id: 1,
//     title: "Top Countries",
//     links: [
//       {
//         id: 1,
//         text: "Canada",
//         url: 'https://wwww.canada.com/'
//       },

//       {
//         id: 2,
//         text: "New Zealand",
//         url: 'https://wwww.newzealand.com/'
//       },

//       {
//         id: 3,
//         text: "United Kingdom",
//         url: 'https://wwww.unitedkingdom.com/'
//       },

//       {
//         id: 4,
//         text: "Norway",
//         url: 'https://wwww.norway.com/'
//       }
//     ]
//   },

//   {
//     id: 2,
//     title: "Partner With Us",
//     links: [
//       {
//         id: 1,
//         text: "Partnership Programs",
//         url: 'https://wwww.partnership.com/'
//       },
//     ]
//   }
// ]

const FooterSection = () => {
  const { isMobile, isTablet } = useScreenResolution();

  const top_countries = ["Canada", "New Zealand", "United Kingdom", "Norway"];
  const useful_links = [
    "Wait list",
    "Travel guide",
    "FAQs",
    "Reviews",
    "Visa Showcase",
  ];

      // margin-top: 9px;
    // font-size: 14px;
  // line-height: 18px;
  
  // margin-top: 9px;
    // font-size: 17px;
    // line-height: 25px;

  return (
    <FooterWrapper style={{ paddingBottom: isMobile ? "1rem" : "5rem" }}>
      <NewsLetter />
      <SectionLayout margin="0 auto">
        <Grid
          gap={isMobile ? "1.2rem" : "2.5rem"}
          columns={isMobile ? "1fr" : "repeat(5, 1fr)"}
        >
          <div className="footerLogo">
            <Link href="/">
              <Image src={TTLogo} height="50" alt="logo" />
            </Link>
            <Grid
              columns="repeat(4, 1fr)"
              gap="1rem"
              width={isMobile ? "41%" : isTablet ? "29%" : "70%"}
              margin="1rem 0rem 0rem 0rem"
            >
              {FooterIcons.map((icon) => (
                <Link href={icon.url} key="key">
                  {icon.icon}
                </Link>
              ))}
            </Grid>
          </div>

          <div className="topCountries">
            <Text
              type="h3"
              text="Top Countries"
              color="#06062A"
              padding="0 0 25px"
            />
            <Flex direction="column" gap="1rem">
              {top_countries.map((country, index) => (
                <Link
                  key={index}
                  href={`/visa/countries/${country
                    .toLowerCase()
                    .replace(/ /g, "-")}`}
                  text={country}
                  color="#06062A"
                />
              ))}
            </Flex>
          </div>
          <div className="usefulLinks">
            <Text
              type="h3"
              text="Useful Link"
              color="#06062A"
              padding="0 0 25px"
            />
            <Flex direction="column" gap="1rem">
              {useful_links.map((links, i) => (
                <Link key={i} href="/" text={links} color="#06062A" />
              ))}
            </Flex>
          </div>
          <div className="support">
            <Text type="h3" text="Support" color="#06062A" padding="0 0 25px" />
            <Flex direction="column" gap="1rem">
              <Link href="/" text="Help Center" color="#06062A" />
              <Link href="/" text="Contact us" color="#06062A" />
              <Link href="/" text="Privacy policy" color="#06062A" />
              <Link href="/" text="Terms of service" color="#06062A" />
              <Link href="/" text="Trust and safety" color="#06062A" />
            </Flex>
          </div>
          <div className="aboutUs">
            <Text type="h3" text="Company" color="#06062A" padding="0 0 25px" />
            <Flex direction="column" gap="1rem">
              <Link href="/" text="About us" color="#06062A" />
              <Link href="/" text="Careers" color="#06062A" />
              <Link href="/" text="Press" color="#06062A" />
              <Link href="/" text="Blog" color="#06062A" />
            </Flex>
          </div>
        </Grid>
        <Flex
          gap="1rem"
          align={isMobile ? "center" : "flex-end"}
          width="auto"
          styles={{ visibility: isMobile ? "visible" : "hidden" }}
        >
          <Image
            src={Barcode}
            alt="visa"
            style={{
              marginLeft: isMobile ? "0rem" : "7rem",
              marginTop: isMobile ? "20px" : "",
              marginBottom: isMobile ? ".8rem" : "1.2rem",
              width: isMobile ? "60px" : "110px",
              height: isMobile ? "60px" : "110px",
            }}
          />
          <Flex
            direction="column"
            gap={isMobile ? "0.2px" : "0.5px"}
            align="center"
            padding="0rem 0rem 1.5rem"
            width={isMobile ? "4rem" : "10rem"}
            styles={{ marginTop: isMobile ? "30px" : "" }}
          >
            <Image
              src={AppLogo}
              alt="mastercard"
              style={{
                width: isMobile ? "89.33px" : "134px",
                height: isMobile ? "29.33px" : "44px",
              }}
            />
            <Image
              src={PlayStore}
              alt="american-express"
              style={{
                width: isMobile ? "89.33px" : "134px",
                height: isMobile ? "29.33px" : "44px",
              }}
            />
          </Flex>
        </Flex>
        {/* <Text text="All Right Reserved, @ Thrillers Travel" type="p" /> */}
      </SectionLayout>
    </FooterWrapper>
  );
};

export default FooterSection;
