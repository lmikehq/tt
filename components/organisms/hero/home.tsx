"use client";

import Center from "@atom/center";
import Text from "@atom/text";
import Navbar from "@organism/Navbar";
import ServiceBanner from "@organism/ServiceBanner";
import { styled } from "styled-components";
import bgImage from "../../../assets/images/herobg-map.png";
import SectionLayout from "@components/layouts/sectionLayout";
import { useScreenResolution } from "hook/useScreenResolution";
import Section from "@molecule/section";
const HeroWrapper = styled.div<{ isMobile?: boolean }>`
  width: 100vw;
  // height: 70vh;
  background: var(--bg-color);
  // max-height: 750px;
  height: ${({ isMobile }) => (isMobile ? "unset" : "800px")};
  background-image: url(${bgImage.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

function HeroSection() {
  const { isMobile } = useScreenResolution();
  const jumboText = "revolutionize travel experiences";
  return (
    <HeroWrapper isMobile={isMobile}>
      <Navbar page="home" />
      <Center>
        <SectionLayout>
          <Section
            styles={{ textAlign: "center" }}
            padding={isMobile ? "3.75rem 0" : "0rem"}
          >
            <Text type="p" text="With you, we can" size={"1.2rem"} />
            <Text
              type="p"
              text={jumboText
                .split(" ")
                .slice(0, isMobile ? 1 : 2)
                .join(" ")}
              transform="uppercase"
              size={isMobile ? "2.3rem" : "3.5rem"}
              weight={900}
            />
            <Text
              type="p"
              text={jumboText
                .split(" ")
                .slice(isMobile ? 1 : 2)
                .join(" ")}
              transform="uppercase"
              size={isMobile ? "1.2rem" : "3.5rem"}
              weight={900}
            />
          </Section>
          <ServiceBanner />
        </SectionLayout>
      </Center>
    </HeroWrapper>
  );
}

export default HeroSection;
