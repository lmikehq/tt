"use client";

import Center from "@components/templates/center";
import Text from "@atom/text";
import Navbar from "@organism/Navbar";
import ServiceBanner from "@organism/ServiceBanner";
import { styled } from "styled-components";

const HeroWrapper = styled.div`
  width: 100vw;
  background: var(--bg-color);
  height: 500px;
  background-image: url(${"/assets/images/herobg-visa.png"});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  margin-bottom: 180px;
`;

function VisaHero() {
  return (
    <>
      <Navbar page="visa" />
      <HeroWrapper>
        <div style={{ paddingTop: "14rem" }}>
          <Center>
            <ServiceBanner />
          </Center>
        </div>
      </HeroWrapper>
    </>
  );
}

export default VisaHero;
