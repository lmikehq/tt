"use client";

import Center from "@components/templates/center";
import Text from "src/components/atoms/text";
import Navbar from "src/components/organisms/Navbar";
import ServiceBanner from "src/components/organisms/ServiceBanner";
import { styled } from "styled-components";
import bgImage from "/assets/images/herobg-visa.png";

const HeroWrapper = styled.div`
  width: 100vw;
  background: var(--bg-color);
  height: 500px;
  background-image: url(${bgImage.src});
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
