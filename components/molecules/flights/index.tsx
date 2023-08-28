"use client";
import FAQ from "@atom/FAQ";
import Flex from "@atom/flex";
import Text from "@atom/text";
import Section from "@molecule/section";
import { FaPlaneArrival } from "react-icons/fa";
import { GiSettingsKnobs } from "react-icons/gi";
import { ImPriceTag } from "react-icons/im";
import { styled } from "styled-components";

const BlueBox = styled.div`
  border: 2px solid #7bbbd6;
  background: #f3fafd;
  padding: 3rem;
  border-radius: 8px;
`;

const BlueIcon = styled.div`
  border: 2px solid #6092a7;
  background: #daf0f9;
  border-radius: 8px;
  width: 20%;
  padding: 1.5rem;
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

  return (
    <Section padding="0 5rem">
      <Flex direction="column" gap=".65rem" wrap="wrap">
        <Text
          type="h1"
          text="What Thrillers have to offer"
          font="Montserrat"
          weight={700}
          size={36}
        />
        <Text
          type="p"
          text="Our goal is to assist you in traveling with assurance and ensuring your voyage is as seamless as can be."
          size={18}
        />
      </Flex>
      <Flex padding="2rem 0" gap="4rem">
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
            size={36}
          />
          <Text
            type="p"
            text="Here are the flight deals with the lowest prices. Act fast – they all 1-week trip in the next 6 months"
            size={18}
            whiteSpace="nowrap"
          />
        </Flex>
        <Flex gap="2rem">
          <Flex direction="column" gap="1rem">
            <ImageBox imageUrl={image3} />
            <Flex justify="space-between">
              <Flex direction="column" gap=".25rem">
                <Text
                  type="h3"
                  text="Venice"
                  weight={700}
                  size={28}
                  font="Montserrat"
                />
                <Text
                  type="p"
                  text="Italy"
                  color="#606060"
                  font="Montserrat"
                  weight={500}
                />
              </Flex>
              <Flex direction="column-reverse" gap=".25rem" align="flex-end">
                <Text
                  type="h3"
                  text="$2,200"
                  weight={700}
                  size={28}
                  font="Montserrat"
                />
                <Text
                  type="p"
                  text="Starts from"
                  color="#606060"
                  font="Montserrat"
                  weight={500}
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
                  size={28}
                  font="Montserrat"
                />
                <Text
                  type="p"
                  text="United States"
                  color="#606060"
                  font="Montserrat"
                  weight={500}
                />
              </Flex>
              <Flex direction="column-reverse" gap=".25rem" align="flex-end">
                <Text
                  type="h3"
                  text="$1,850"
                  weight={700}
                  size={28}
                  font="Montserrat"
                />
                <Text
                  type="p"
                  text="Starts from"
                  color="#606060"
                  font="Montserrat"
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
                  size={28}
                  font="Montserrat"
                />
                <Text
                  type="p"
                  text="Brazil"
                  color="#606060"
                  font="Montserrat"
                  weight={500}
                />
              </Flex>
              <Flex direction="column-reverse" gap=".25rem" align="flex-end">
                <Text
                  type="h3"
                  text="$2,250"
                  weight={700}
                  size={28}
                  font="Montserrat"
                />
                <Text
                  type="p"
                  text="Starts from"
                  color="#606060"
                  font="Montserrat"
                  weight={500}
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex align="center" direction="column" padding="2rem 0">
        <Flex direction="column" align="center" gap=".5rem">
          <Text
            type="h2"
            text="Frequently Asked Questions"
            size={36}
            font="Montserrat"
            weight={700}
          />
          <Text
            type="p"
            text="Have all your questions answered here?"
            size={18}
          />
          <FAQ />
        </Flex>
      </Flex>
    </Section>
  );
};

export default FlightSection;
