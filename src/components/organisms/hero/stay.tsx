"use client";

import Center from "@components/templates/center";
import Navbar from "@organism/Navbar";
import ServiceBanner from "@organism/ServiceBanner";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import { styled } from "styled-components";
import Flex from "@/components/templates/flex";
import Text from "@/components/atoms/text";

const HeroWrapper = styled.div<{ isMobile?: boolean }>`
  // width: 100vw;
  height: ${(props) => (props.isMobile ? "unset" : "760px")};
  margin-bottom: ${(props) => (props.isMobile ? "2rem" : "10rem")};
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url(${"/assets/images/stays/banner.png"});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

function StayHero() {
  const { isMobile } = useScreenResolution();
  return (
    <>
      <Navbar page="stay" />
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
                styles={{ textAlign: "center", maxWidth: "900px" }}
              >
                <Text
                  size={"1.2rem"}
                  color="white"
                  type="p"
                  text="With you, we can"
                ></Text>
                <Text
                  color="white"
                  type="h1"
                  size={isMobile ? "2.3rem" : "3.5rem"}
                  weight={900}
                  text="MIGRATE NIGERIANS TO THE WESTERN COUNTRIES "
                ></Text>
              </Flex>
            </Flex>
          </div>
          <div style={{ paddingTop: "30px", paddingBottom: "20px" }}>
            <Center>
              <ServiceBanner page="stay" />
            </Center>
          </div>
        </Flex>
      </HeroWrapper>
    </>
  );
}

export default StayHero;
