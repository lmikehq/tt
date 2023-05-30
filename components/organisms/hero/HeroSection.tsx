"use client";

import Center from "@atom/center";
import Text from "@atom/text";
import Navbar from "@organism/Navbar";
import ServiceBanner from "@organism/ServiceBanner";
import { styled } from "styled-components";
import bgImage from "../../../assets/images/herobg-map.png";
const HeroWrapper = styled.div`
  width: 100vw;
  // height: 70vh;
  background: var(--bg-color);
  // max-height: 750px;
  height: 800px;
  background-image: url(${bgImage.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

function HeroSection() {
  return (
    <HeroWrapper>
      <Navbar />
      <Center>
        <div>
          <section style={{ textAlign: "center" }}>
            <Text type="p" text="With you, we can" size={"1.2rem"} />
            <Text
              type="p"
              text="revolutionize travel "
              transform="uppercase"
              size={"3.5rem"}
              weight={900}
              margin={"1rem 0"}
            />
            <Text
              type="p"
              text="experiences"
              transform="uppercase"
              size={"3.5rem"}
              weight={900}
            />
          </section>
          <ServiceBanner />
        </div>
      </Center>
    </HeroWrapper>
  );
}

export default HeroSection;
