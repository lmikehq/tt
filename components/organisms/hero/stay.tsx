"use client";

import Center from "@atom/center";
import bgImage from "@image/herobg-visa.png";
import Navbar from "@organism/Navbar";
import ServiceBanner from "@organism/ServiceBanner";
import { useScreenResolution } from "hook/useScreenResolution";
import { styled } from "styled-components";

const HeroWrapper = styled.div<{ isMobile?: boolean }>`
  width: 100vw;
  background: var(--bg-color);
  height: ${(props) => (props.isMobile ? "unset" : "500px")};
  background-image: url(${bgImage.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  margin-bottom: ${(props) => (props.isMobile ? "2rem" : "10rem")};
`;

function StayHero() {
  const { isMobile } = useScreenResolution();
  return (
    <>
      <Navbar page="stay" />
      <HeroWrapper isMobile={isMobile}>
        <div style={{ paddingTop: "14rem" }}>
          <Center>
            <ServiceBanner />
          </Center>
        </div>
      </HeroWrapper>
    </>
  );
}

export default StayHero;
