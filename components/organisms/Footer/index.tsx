"use client";

import React from "react";
import styled from "styled-components";
import { BsFacebook, BsTwitter, BsYoutube } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import Image from "next/image";
import TTLogo from "@image/brand/tt_blue_logo_with_text.png";
import FooterLayout from "@components/layouts/sectionLayout";
import Text from "@atom/text";
import NewsLetter from "@organism/NewsLetter";
import { Grid } from "@atom/grid";
import Link from "@atom/link";
import Flex from "@atom/flex";

const FooterWrapper = styled.footer`
  width: 100%;
  height: 21rem;
  margin-top: 21rem;
  display: flex;
  padding: 7rem 0;
  background-color: var(--primary-color);
  position: relative;
  bottom: 0;
  left: 0;
`;

const FooterIcons = [
  {
    id: 1,
    icon: <BsFacebook size="1.5rem" color="#06062A" />,
    url: "https://wwww.facebook.com/",
  },

  {
    id: 2,
    icon: <BsTwitter size="1.5rem" color="#06062A" />,
    url: "https://wwww.twitter.com/",
  },

  {
    id: 3,
    icon: <BsYoutube size="1.5rem" color="#06062A" />,
    url: "https://wwww.youtube.com/",
  },

  {
    id: 4,
    icon: <AiFillInstagram size="1.5rem" color="#06062A" />,
    url: "https://wwww.instagram.com/",
  },
];

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
  return (
    <FooterWrapper>
      <NewsLetter />
      <FooterLayout>
        <Grid gap="2.5rem" columns="repeat(5, 1fr)">
          <div className="footerLogo">
            <Link href="/">
              <Image src={TTLogo} height="50" alt="logo" />
            </Link>
            <Flex gap="1rem" margin="1.2rem auto">
              {FooterIcons.map((icon) => (
                <Link href={icon.url} key="key">
                  <span key={icon.id}>{icon.icon}</span>
                </Link>
              ))}
            </Flex>
          </div>
          <div className="topCountries">
            <Text type="h3" text="Top Countries" color="#06062A" />
            <Flex direction="column" gap="1rem">
              <Link href="/" text="Canada" color="#06062A" />
              <Link href="/" text="New Zealand" color="#06062A" />
              <Link href="/" text="United Kingdom" color="#06062A" />
              <Link href="/" text="Norway" color="#06062A" />
            </Flex>
          </div>
          <div className="partnerWithUs">
            <Text type="h3" text="Partner With Us" color="#06062A" />
            <Flex direction="column" gap="1rem">
              <Link href="/" text="Partnership programs" color="#06062A" />
              <Link href="/" text="Affiliate program" color="#06062A" />
              <Link href="/" text="Connectivity partners" color="#06062A" />
              <Link href="/" text="Loyalty program" color="#06062A" />
              <Link href="/" text="Community" color="#06062A" />
            </Flex>
          </div>
          <div className="support">
            <Text type="h3" text="Support" color="#06062A" />
            <Flex direction="column" gap="1rem">
              <Link href="/" text="Help Center" color="#06062A" />
              <Link href="/" text="Contact us" color="#06062A" />
              <Link href="/" text="Privacy policy" color="#06062A" />
              <Link href="/" text="Terms of service" color="#06062A" />
              <Link href="/" text="Trust and safety" color="#06062A" />
            </Flex>
          </div>
          <div className="aboutUs">
            <Text type="h3" text="About Us" color="#06062A" />
            <Flex direction="column" gap="1rem">
              <Link href="/" text="Company" color="#06062A" />
              <Link href="/" text="Careers" color="#06062A" />
              <Link href="/" text="Press" color="#06062A" />
              <Link href="/" text="Blog" color="#06062A" />
            </Flex>
          </div>
        </Grid>
      </FooterLayout>
    </FooterWrapper>
  );
};

export default FooterSection;
