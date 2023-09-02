"use client";
import Flex from "@atom/flex";
import Text from "@atom/text";
import Section from "@molecule/section";
import { FaPlaneArrival } from "react-icons/fa";
import { GiSettingsKnobs } from "react-icons/gi";
import { ImPriceTag } from "react-icons/im";
import { styled } from "styled-components";
import FAQ from "./components/FAQ";
import { useScreenResolution } from "hook/useScreenResolution";
import SectionLayout from "@components/layouts/sectionLayout";

const BlueBox = styled.div`
  border: 1px solid #7bbbd6;
  background: #f3fafd;
  padding: 3rem;
  border-radius: 8px;
  @media (max-width: 900px) {
    padding: 2rem 1.5rem;
  }
`;

const BlueIcon = styled.div`
  border: 1px solid #6092a7;
  background: #daf0f9;
  border-radius: 8px;
  width: 57px;
  height: 49px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const ImageBox = styled.div<{ imageUrl: string }>`
  width: 100%;
  height: 20rem;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  border-radius: 8px;
`;

const FlightSection = () => {
  const image2 = require("../../../assets/images/flights/image2.png").default
    .src;
  const image1 = require("../../../assets/images/flights/image1.jpg").default
    .src;
  const image3 = require("../../../assets/images/flights/image3.jpg").default
    .src;

  const { isMobile } = useScreenResolution();
  return (
    <SectionLayout>
      <Flex direction="column" gap=".65rem" wrap="wrap">
        <Text
          type="h1"
          text="What Thrillers have to offer"
          font="Montserrat"
          weight={700}
          size={isMobile ? 24 : 36}
        />
        <Text
          type="p"
          text="Our goal is to assist you in traveling with assurance and ensuring your voyage is as seamless as can be."
          size={isMobile ? 16 : 18}
          weight={400}
        />
      </Flex>
      <Flex
        padding="2rem 0"
        direction={isMobile ? "column" : "row"}
        gap={isMobile ? "1rem" : "4rem"}
      >
        <BlueBox>
          <Flex direction="column" gap="1.5rem">
            <BlueIcon>
              <GiSettingsKnobs size={22} rotate={-180} />
            </BlueIcon>
            <Flex direction="column">
              <Text
                type="h3"
                text="Filter for what you want"
                weight={600}
                size={22}
              />
              <Text
                type="p"
                text="Users can refine their search results based on criteria"
                weight={400}
              />
            </Flex>
          </Flex>
        </BlueBox>
        <BlueBox>
          <Flex direction="column" gap="1.5rem">
            <BlueIcon>
              <ImPriceTag size={23} />
            </BlueIcon>
            <Flex direction="column">
              <Text type="h3" text="Track prices" weight={600} size={23} />
              <Text
                type="p"
                text="Not ready to book? Set alerts for when prices drop"
                weight={400}
              />
            </Flex>
          </Flex>
        </BlueBox>
        <BlueBox>
          <Flex direction="column" gap="1.5rem">
            <BlueIcon>
              <FaPlaneArrival size={23} />
            </BlueIcon>
            <Flex direction="column">
              <Text
                type="h3"
                text="Find flexible flight deals"
                weight={600}
                size={22}
              />
              <Text
                type="p"
                text="Users can refine their search results based on criteria"
                weight={400}
              />
            </Flex>
          </Flex>
        </BlueBox>
      </Flex>
      <Flex padding="2rem 0" direction="column" gap="2rem">
        <Flex direction="column" gap=".65rem" wrap="wrap">
          <Text
            type="h1"
            text="Flight Deals from Lagos"
            font="Montserrat"
            weight={700}
            size={isMobile ? 24 : 36}
          />
          <Text
            type="p"
            text="Here are the flight deals with the lowest prices. Act fast – they all 1-week trip in the next 6 months"
            size={isMobile ? 16 : 18}
            weight={400}
          />
        </Flex>
        <Flex direction={isMobile ? "column" : "row"} gap="2rem">
          <Flex direction="column" gap="1rem">
            <ImageBox imageUrl={image3} />
            <Flex justify="space-between">
              <Flex direction="column" gap=".25rem">
                <Text
                  type="h3"
                  text="Venice"
                  weight={700}
                  size={isMobile ? 24 : 28}
                  font="Montserrat"
                />
                <Text
                  type="p"
                  text="Italy"
                  color="#606060"
                  font="Montserrat"
                  weight={500}
                  size={isMobile ? 16 : 18}
                />
              </Flex>
              <Flex direction="column-reverse" gap=".25rem" align="flex-end">
                <Text
                  type="h3"
                  text="$2,200"
                  weight={700}
                  size={isMobile ? 24 : 28}
                  font="Montserrat"
                />
                <Text
                  type="p"
                  text="Starts from"
                  color="#606060"
                  font="Montserrat"
                  weight={500}
                  size={isMobile ? 16 : 18}
                />
              </Flex>
            </Flex>
          </Flex>
          <Flex direction="column" gap="1rem">
            <ImageBox imageUrl={image2} />
            <Flex justify="space-between">
              <Flex direction="column" gap=".25rem">
                <Text
                  type="h3"
                  text="Atlanta"
                  weight={700}
                  size={isMobile ? 24 : 28}
                  font="Montserrat"
                />
                <Text
                  type="p"
                  text="United States"
                  color="#606060"
                  font="Montserrat"
                  size={isMobile ? 16 : 18}
                  weight={500}
                />
              </Flex>
              <Flex direction="column-reverse" gap=".25rem" align="flex-end">
                <Text
                  type="h3"
                  text="$1,850"
                  weight={700}
                  size={isMobile ? 24 : 28}
                  font="Montserrat"
                />
                <Text
                  type="p"
                  text="Starts from"
                  color="#606060"
                  font="Montserrat"
                  size={isMobile ? 16 : 18}
                  weight={500}
                />
              </Flex>
            </Flex>
          </Flex>
          <Flex direction="column" gap="1rem">
            <ImageBox imageUrl={image1} />
            <Flex justify="space-between">
              <Flex direction="column" gap=".25rem">
                <Text
                  type="h3"
                  text="Sao Paulo"
                  weight={700}
                  size={isMobile ? 24 : 28}
                  font="Montserrat"
                />
                <Text
                  type="p"
                  text="Brazil"
                  color="#606060"
                  font="Montserrat"
                  weight={500}
                  size={isMobile ? 16 : 18}
                />
              </Flex>
              <Flex direction="column-reverse" gap=".25rem" align="flex-end">
                <Text
                  type="h3"
                  text="$2,250"
                  weight={700}
                  size={isMobile ? 24 : 28}
                  font="Montserrat"
                />
                <Text
                  type="p"
                  text="Starts from"
                  color="#606060"
                  font="Montserrat"
                  weight={500}
                  size={isMobile ? 16 : 18}
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex align="center" direction="column" padding="2rem 0">
        <Flex direction="column" gap=".5rem">
          <Text
            type="h2"
            text="Frequently Asked Questions"
            size={isMobile ? 24 : 36}
            font="Montserrat"
            weight={700}
          />
          <Text
            type="p"
            text="Have all your questions answered here?"
            size={isMobile ? 16 : 18}
          />
          <FAQ />
        </Flex>
      </Flex>
    </SectionLayout>
  );
};

export default FlightSection;
