"use client";

import Flex from "@components/templates/flex";
import { Grid } from "@components/templates/grid";
import Link from "@atom/link";
import Text from "@atom/text";
// import SectionLayout from "@components/templates/SectionLayout";
import SectionLayout from "@components/templates/SectionLayout";
import NewsLetter from "@organism/NewsLetter";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import Image from "@atom/image";
import { usePathname } from "next/navigation";
import { AiFillInstagram } from "react-icons/ai";
import { BsFacebook, BsTwitter, BsYoutube } from "react-icons/bs";
import { FaTiktok } from "react-icons/fa";
import { ImLinkedin } from "react-icons/im";
import { RiThreadsFill, RiWhatsappFill } from "react-icons/ri";
import styled from "styled-components";
import Section from "@molecule/section";

const FooterWrapper = styled.footer`
    width: 100%;
    height: fit-content;
    // margin-top: 17rem;
    // display: flex;
    // padding: 5rem 0;
    // position: relative;
    // bottom: 0;
    // left: 0;

    // @media (max-width: 900px) {
    //   padding: 1rem 0;
    // }
`;
const FooterGrid = styled.div<{ isMobile?: boolean }>`
    background-color: var(--primary-color);
    padding: ${(props) => (props.isMobile ? "0rem" : "5.3125rem")};
`;

const footerIcons = [
    {
        id: 1,
        icon: <BsFacebook size="1.5rem" color="#06062A" />,
        url: "https://www.facebook.com/thrillerstravels",
    },

    {
        id: 2,
        icon: <BsTwitter size="1.5rem" color="#06062A" />,
        url: "https://www.twitter.com/thrillerstravel",
    },

    {
        id: 3,
        icon: <BsYoutube size="1.5rem" color="#06062A" />,
        url: "https://www.youtube.com/@ThrillersTravel",
    },

    {
        id: 4,
        icon: <AiFillInstagram size="1.5rem" color="#06062A" />,
        url: "https://instagram.com/thrillerstravels",
    },
    {
        id: 5,
        icon: <FaTiktok size="1.5rem" color="#06062A" />,
        url: "https://www.tiktok.com/@thrillers_travels",
    },
    {
        id: 6,
        icon: <ImLinkedin size="1.5rem" color="#06062A" />,
        url: "http://www.linkedin.com/in/thrillerstravels",
    },
    {
        id: 7,
        icon: <RiWhatsappFill size="1.5rem" color="#06062A" fontWeight={900} />,
        url: "https://chat.whatsapp.com/IpZEWEAdZngD5jGJKGZvy7",
    },
    {
        id: 8,
        icon: <RiThreadsFill size="1.5rem" color="#06062A" />,
        // icon: (
        //   <Section height={"24px"} styles={{ position: "relative" }}>
        //     <Image
        //       src={"/assets/images/thread.png"}
        //       alt=""
        //       styles={{ borderRadius: "2px" }}
        //     />
        //   </Section>
        // ),
        url: "https://www.threads.net/@thrillerstravel",
    },
];

const FooterSection = ({ showNewsletter = true }) => {
    const { isMobile } = useScreenResolution();
    const path = usePathname();
    const isApply = path.includes("visa/apply");

    const top_countries = ["Canada", "New Zealand", "United Kingdom", "Norway"];
    const useful_links = [
        { text: "Waitlist", href: "/waitlist", color: "#06062A" },
        { text: "Travel Guide", href: "/travel-guide", color: "#06062A" },
        { text: "FAQs", href: "/faqs", color: "#06062A" },
        { text: "Referral Program", href: "/reviews", color: "#06062A" },
    ];

    const supports = [
        { href: "/help-center", text: "Help Center", color: "#06062A" },
        { href: "/contact", text: "Contact Us", color: "#06062A" },
        { href: "/privacy-policy", text: "Privacy Policy", color: "#06062A" },
        { href: "/terms-conditions", text: "Terms of Service", color: "#06062A" },
        {
            href: "/trust-and-safety",
            text: "Trust and safety",
            color: "#06062A",
        },
    ];

    const aboutUs = [
        { href: "/about-us", text: "About Us", color: "#06062A" },
        {
            href: "https://www.myjobmag.com/jobs-at/thrillers-travels",
            text: "Careers",
            color: "#06062A",
        },
        { href: "/press", text: "Press", color: "#06062A" },
        { href: "/blog", text: "Blog", color: "#06062A" },
    ];

    if (isApply && isMobile) return null;

    return (
        <FooterWrapper>
            {showNewsletter && <NewsLetter />}
            <FooterGrid isMobile={isMobile}>
                <SectionLayout
                    margin="0 auto"
                    padding={isMobile ? "3rem 0px 0px 1.5rem;" : "1rem"}
                >
                    {!isMobile ? null : (
                        <Section styles={{ marginBottom: "59px" }}>
                            <Link href="/">
                                <Section>
                                    <Image
                                        src={
                                            "/assets/images/brand/tt_blue_logo_with_text.png"
                                        }
                                        alt="logo"
                                        width={142}
                                        height={43}
                                    />
                                </Section>
                            </Link>
                        </Section>
                    )}
                    <Grid
                        className="footerLayout"
                        gap={isMobile ? "2rem" : "2.5rem"}
                        style={{ gridRowGap: isMobile ? "3rem" : "2.5rem" }}
                        columns={isMobile ? "2" : "5"}
                    >
                        {isMobile ? null : (
                            <div className="footerLogo">
                                <Link href="/">
                                    <Section>
                                        <Image
                                            src={
                                                "/assets/images/brand/tt_blue_logo_with_text.png"
                                            }
                                            alt="logo"
                                            width={142}
                                            height={43}
                                        />
                                    </Section>
                                </Link>
                                <Grid
                                    className="footerIcons"
                                    columns="4"
                                    gap="1rem"
                                    justify="center"
                                    width="fit-content"
                                    margin={"1rem 0rem 0rem 0rem"}
                                >
                                    {footerIcons.map((icon) => (
                                        <Link href={icon.url} key={icon.id}>
                                            {icon.icon}
                                        </Link>
                                    ))}
                                </Grid>
                            </div>
                        )}

                        <div className="topCountries">
                            <Text
                                type="h3"
                                text="Top Countries"
                                color="#06062A"
                                padding={isMobile ? "0 0 5px" : "0 0 25px"}
                                weight={700}
                            />
                            <Flex
                                direction="column"
                                gap="1rem"
                                styles={{ fontWeight: "400" }}
                            >
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
                                weight={700}
                            />
                            <Flex
                                direction="column"
                                gap="1rem"
                                styles={{ fontWeight: "400" }}
                            >
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
                                weight={700}
                            />
                            <Flex
                                direction="column"
                                gap="1rem"
                                styles={{ fontWeight: "400" }}
                            >
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
                                weight={700}
                            />
                            <Flex
                                direction="column"
                                gap="1rem"
                                styles={{ fontWeight: "400" }}
                            >
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
                    {!isMobile ? null : (
                        <Section styles={{ margin: "59px 0" }}>
                            <Grid
                                className="footerIcons"
                                columns="4"
                                gap="2.5rem"
                                justify="center"
                                width="fit-content"
                                margin={"auto"}
                            >
                                {footerIcons.map((icon) => (
                                    <Link href={icon.url} key="key">
                                        {icon.icon}
                                    </Link>
                                ))}
                            </Grid>
                        </Section>
                    )}
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
                            src={"/assets/images/walink.png"}
                            alt="visa"
                            width={isMobile ? 120 : 110}
                            height={isMobile ? 120 : 110}
                            styles={{
                                marginLeft: isMobile ? "0rem" : "7rem",
                                marginTop: isMobile ? "20px" : "",
                                marginBottom: isMobile ? ".8rem" : "1.2rem",
                            }}
                        />
                        <Flex
                            className="ttApp"
                            direction="column"
                            gap={isMobile ? "0.2px" : "0.5px"}
                            align="center"
                            padding="0rem 0rem 1.5rem"
                            width={isMobile ? "fit-content" : "10rem"}
                            styles={{ marginTop: isMobile ? "32px" : "" }}
                        >
                            <Image
                                src={"/assets/images/app-store.svg"}
                                alt="mastercard"
                                width={isMobile ? 178.66 : 134}
                                height={isMobile ? 58.66 : 44}
                            />
                            <Image
                                src={"/assets/images/google-play.svg"}
                                alt="american-express"
                                width={isMobile ? 178.66 : 134}
                                height={isMobile ? 58.66 : 44}
                            />
                        </Flex>
                    </Flex>
                </SectionLayout>
            </FooterGrid>
        </FooterWrapper>
    );
};

export default FooterSection;
