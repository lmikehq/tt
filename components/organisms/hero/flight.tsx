"use client";

import Flex from "@atom/flex";
import bgImage from "@image/herobg-flight.avif";
import Navbar from "@organism/Navbar";
import ServiceBanner from "@organism/ServiceBanner";
import { useScreenResolution } from "hook/useScreenResolution";
import { styled } from "styled-components";

const HeroWrapper = styled.div<{ isMobile?: boolean }>`
  width: 100vw;
  background: var(--bg-color);
  // height: calc(100vh - 70px);
  height: ${({ isMobile }) => (isMobile ? "unset" : "600px")};

  background-image: url(${bgImage.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  margin-bottom: 2rem;
  @media (max-width: 900px) {
    height: unset;
    background-image: none;
    margin-bottom: 3.5rem;
  }
`;

const HeroBackground = styled.div`
  @media (max-width: 900px) {
    background-image: url(${bgImage.src});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    height: 14rem;
  }
`;

function FlightHero() {
  const { isMobile } = useScreenResolution();
  return (
    <>
      <Navbar page="flights" />
      <HeroWrapper isMobile={isMobile}>
        <HeroBackground />
        <Flex
          height="100%"
          align="center"
          justify="flex-end"
          direction="column"
          padding={isMobile ? "0 1.187rem" : "0"}
        >
          <ServiceBanner />
        </Flex>
      </HeroWrapper>
    </>
  );
}

export default FlightHero;
