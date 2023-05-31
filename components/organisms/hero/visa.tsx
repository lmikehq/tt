"use client";

import Center from "@atom/center";
import Text from "@atom/text";
import Navbar from "@organism/Navbar";
import ServiceBanner from "@organism/ServiceBanner";
import { styled } from "styled-components";
import bgImage from "@image/herobg-visa.png";

const HeroWrapper = styled.div`
  width: 100vw;
  background: var(--bg-color);
  height: 500px;
  background-image: url(${bgImage.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
//   margin-top: 20px;
`;

function VisaHero() {
  return (
    <>
      <Navbar page='visa' />
      <HeroWrapper>
        <div style={{paddingTop:'14rem'}}>
          <Center>
            <ServiceBanner />
          </Center>
        </div>
      </HeroWrapper>
    </>
  );
}

export default VisaHero;
