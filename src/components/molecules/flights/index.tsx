"use client";
import Flex from "@components/templates/flex";
import Text from "@atom/text";
import { FaPlaneArrival } from "react-icons/fa";
import { GiSettingsKnobs } from "react-icons/gi";
import { ImPriceTag } from "react-icons/im";
import { styled } from "styled-components";
import FAQ from "./components/FAQ";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import SectionLayout from "@components/templates/SectionLayout";
import FlightDealCard from "./components/FlightDealCard";

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

const FlightSection = () => {
  const { isMobile } = useScreenResolution();

  const flightDeals = [
    {
      city_name: "Venice",
      country: "Italy",
      prices_from: 2000,
      is_favorite: true,
      image_url: "/assets/images/flights/image3.jpg",
    },
    {
      city_name: "Atlanta",
      country: "United States",
      prices_from: 1850,
      is_favorite: false,
      image_url: "/assets/images/flights/image2.png",
    },
    {
      city_name: "Sao Paulo",
      country: "Brazil",
      prices_from: 2250,
      is_favorite: true,
      image_url: "/assets/images/flights/image1.jpg",
    },
  ];
  return (
    <SectionLayout>
      <Flex direction="column" gap=".65rem" wrap="wrap">
        <Text
          type="h1"
          text="What Thrillers have to offer"
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
          {flightDeals.map((deal) => (
            <FlightDealCard
              key={deal.city_name}
              city={deal.city_name}
              country={deal.country}
              startingPrice={deal.prices_from}
              isFavorite={deal.is_favorite}
              imageURL={deal.image_url}
            />
          ))}
        </Flex>
      </Flex>
      <Flex align="center" direction="column" padding="2rem 0">
        <Flex direction="column" align="center" justify="center" gap=".5rem">
          <Text
            type="h2"
            text="Frequently Asked Questions"
            size={isMobile ? 24 : 36}
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
