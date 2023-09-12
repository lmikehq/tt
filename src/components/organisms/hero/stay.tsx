"use client";

import Center from "@components/templates/center";
import Navbar from "@organism/Navbar";
import ServiceBanner from "@organism/ServiceBanner";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import { styled } from "styled-components";

const HeroWrapper = styled.div<{ isMobile?: boolean }>`
  width: 100vw;
  background: var(--bg-color);
  height: ${(props) => (props.isMobile ? "unset" : "500px")};
  background-image: url(${"/assets/images/herobg-visa.png"});
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
