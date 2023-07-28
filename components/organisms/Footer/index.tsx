"use client";

import Flex from "@atom/flex";
import { Grid } from "@atom/grid";
import Link from "@atom/link";
import Text from "@atom/text";
import SectionLayout from "@components/layouts/sectionLayout";
import AppLogo from "@image/app-store.svg";
import TTLogo from "@image/brand/tt_blue_logo_with_text.png";
import PlayStore from "@image/google-play.svg";
import Barcode from "@image/walink.png";
import NewsLetter from "@organism/NewsLetter";
import { useScreenResolution } from "hook/useScreenResolution";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AiFillInstagram } from "react-icons/ai";
import { BsFacebook, BsTwitter, BsYoutube } from "react-icons/bs";
import styled from "styled-components";
import Section from "@molecule/section";
import Barcode from "@image/walink.png";
import Thread from "@image/thread.png";
import AppLogo from "@image/app-store.svg";
import PlayStore from "@image/google-play.svg";
import { useScreenResolution } from "hook/useScreenResolution";
import SectionLayout from "@components/layouts/sectionLayout";
import { FaTelegramPlane, FaTiktok } from "react-icons/fa";
import { ImLinkedin } from "react-icons/im";
import { RiWhatsappFill } from "react-icons/ri";
import styled from "styled-components";

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

  @media (max-width: 900px) {
    padding: 1rem 0;
  }
`;

const FooterIcons = [
  {
    id: 1,
    icon: <BsFacebook size="1rem" color="#06062A" />,
    url: "https://www.facebook.com/thrillerstravels",
  },

  {
    id: 2,
    icon: <BsTwitter size="1rem" color="#06062A" />,
    url: "https://www.twitter.com/thrillerstravel",
  },

  {
    id: 3,
    icon: <BsYoutube size="1rem" color="#06062A" />,
    url: "https://www.youtube.com/@ThrillersTravel",
  },

  {
    id: 4,
    icon: <AiFillInstagram size="1rem" color="#06062A" />,
    url: "https://www.instagram.com/thrillerstravel",
  },
  {
    id: 5,
    icon: <FaTiktok size="1rem" color="#06062A" />,
    url: "https://www.tiktok.com/@thrillers_travels",
  },
  {
    id: 6,
    icon: <ImLinkedin size="1rem" color="#06062A" />,
    url: "http://www.linkedin.com/in/thrillerstravels",
  },
  {
    id: 7,
    icon: <RiWhatsappFill size="1rem" color="#06062A" />,
    url: "https://chat.whatsapp.com/IpZEWEAdZngD5jGJKGZvy7",
  },
  {
    id: 8,
    icon: <Image src={Thread} alt="" height={16} style={{borderRadius: "2px"}}/>,
    url: "https://www.threads.net/@thrillerstravel",
  },
];

const FooterSection = () => {
  const { isMobile } = useScreenResolution();
  const path = usePathname();
  const isApply = path.includes("visa/apply");
  // console.log("apply: ", isApply && isMobile);

  const top_countries = ["Canada", "New Zealand", "United Kingdom", "Norway"];
  const useful_links = [
    { text: "Waitlist", href: "/waitlist", color: "#06062A" },
    { text: "Travel guide", href: "/travel-guide", color: "#06062A" },
    { text: "FAQs", href: "/faqs", color: "#06062A" },
    { text: "Reviews", href: "/reviews", color: "#06062A" },
    { text: "Visa Showcase", href: "/visa-showcase", color: "#06062A" },
  ];

  const supports = [
    { href: "/help_enter", text: "Help Center", color: "#06062A" },
    { href: "/contact", text: "Contact us", color: "#06062A" },
    { href: "/privacy", text: "Privacy policy", color: "#06062A" },
    { href: "/terms", text: "Terms of service", color: "#06062A" },
    { href: "/trust_safety", text: "Trust and safety", color: "#06062A" },
  ];

  const aboutUs = [
    { href: "/", text: "About us", color: "#06062A" },
    { href: "/", text: "Careers", color: "#06062A" },
    { href: "/", text: "Press", color: "#06062A" },
    { href: "/", text: "Blog", color: "#06062A" },
  ];

  if (isApply && isMobile) return null;

  return (
    <FooterWrapper style={{ paddingBottom: isMobile ? "1rem" : ".5rem" }}>
      <NewsLetter />
      <SectionLayout margin="0 auto">
        <Grid
          className="footerLayout"
          gap={isMobile ? "2rem" : "2.5rem"}
          columns={isMobile ? "1fr" : "repeat(5, 1fr)"}
          padding={isMobile ? "3rem 0px 0px 20px;" : "1rem"}
        >
          <div className="footerLogo">
            <Link href="/">
              <Image src={TTLogo} height="50" alt="logo" />
            </Link>
            <Grid
              className="footerIcons"
              columns="repeat(4, 1fr)"
              gap="1rem"
              width={isMobile ? "20%" : "70%"}
              margin={"1rem 0rem 0rem 0rem"}
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
              padding={isMobile ? "0 0 5px" : "0 0 25px"}
            />
            <Flex direction="column" gap="1rem" styles={{ fontWeight: "400" }}>
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
              padding={isMobile ? "0 0 5px" : "0 0 25px"}
            />
            <Flex direction="column" gap="1rem" styles={{ fontWeight: "400" }}>
              {useful_links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  text={link.text}
                  color={link.color}
                />
              ))}
            </Flex>
          </div>
          <div className="support">
            <Text
              type="h3"
              text="Support"
              color="#06062A"
              padding={isMobile ? "0 0 5px" : "0 0 25px"}
            />
            <Flex direction="column" gap="1rem" styles={{ fontWeight: "400" }}>
              {supports.map((support, s) => (
                <Link
                  key={s}
                  href={support.href}
                  text={support.text}
                  color={support.color}
                />
              ))}
            </Flex>
          </div>
          <div className="aboutUs">
            <Text
              type="h3"
              text="Company"
              color="#06062A"
              padding={isMobile ? "0 0 5px" : "0 0 25px"}
            />
            <Flex direction="column" gap="1rem" styles={{ fontWeight: "400" }}>
              {aboutUs.map((about, a) => (
                <Link
                  key={a}
                  href={about.href}
                  text={about.text}
                  color={about.color}
                />
              ))}
            </Flex>
          </div>
        </Grid>
        <Flex
          gap="1rem"
          align={isMobile ? "center" : "flex-end"}
          width="auto"
          styles={{
            display: isMobile ? "flex" : "none",
            position: "relative",
            bottom: "0px",
            right: isMobile ? "-16px" : "0px",
          }}
        >
          {/* position: absolute; bottom: 124px; right: 252px; */}
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
            className="ttApp"
            direction="column"
            gap={isMobile ? "0.2px" : "0.5px"}
            align="center"
            padding="0rem 0rem 1.5rem"
            width={isMobile ? "4rem" : "10rem"}
            styles={{ marginTop: isMobile ? "32px" : "" }}
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
      </SectionLayout>
    </FooterWrapper>
  );
};

export default FooterSection;
