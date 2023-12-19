"use client";

import Center from "@components/templates/center";
import Navbar from "@organism/Navbar";
import ServiceBanner from "@organism/ServiceBanner";
import { styled } from "styled-components";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import Flex from "@/components/templates/flex";
import Text from "@/components/atoms/text";

const HeroWrapper = styled.div<{ isMobile?: boolean }>`
  width: 100vw;
  height: ${(props) => (props.isMobile ? "unset" : "620px")};
  margin-bottom: ${(props) => (props.isMobile ? "2rem" : "10rem")};
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url(${"/assets/images/flights/flight.png"});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

function FlightHero() {
  const { isMobile } = useScreenResolution();
  return (
    <>
      <Navbar page="flights" />
      <HeroWrapper isMobile={isMobile}>
        <Flex direction="column" position="relative" styles={{ top: "70px" }}>
          <div>
            <Flex
              align="center"
              justify="center"
              styles={{ marginTop: "30px" }}
            >
              <Flex
                direction="column"
                align="center"
                styles={{ textAlign: "center", maxWidth: "700px" }}
              >
                <Text color="white" type="p" text="With you, we can"></Text>
                <Text
                  color="white"
                  type="h1"
                  weight={600}
                  size={45}
                  text="ELEVATE YOUR TRAVEL EXPERIENCE"
                ></Text>
              </Flex>
            </Flex>
          </div>
          <div style={{ paddingTop: "30px", paddingBottom: "20px" }}>
            <Center>
              <ServiceBanner page="flight" />
            </Center>
          </div>
        </Flex>
      </HeroWrapper>
    </>
  );
}

export default FlightHero;
