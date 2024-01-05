"use client";
import Flex from "@components/templates/flex";
import Text from "@atom/text";
import { FaPlaneArrival } from "react-icons/fa";
import { GiSettingsKnobs } from "react-icons/gi";
import { ImPriceTag } from "react-icons/im";
import { styled } from "styled-components";
import Map from "@molecule/map";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import SectionLayout from "@components/templates/SectionLayout";
import PopularHotels from "./PopularHotels";
import TrendingDestination from "./TrendingDestination";
import BlogStories from "./BlogStories";
import FAQ from "./components/faq";

const BlueBox = styled.div`
  border: 1px solid #7bbbd6;
  background: #f3fafd;
  padding: 2rem;
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

const StaySection = () => {
  const { isMobile } = useScreenResolution();

  return (
    <SectionLayout padding={isMobile ? "0 1rem" : "0 5rem"}>
      <Flex
        direction="column"
        gap=".65rem"
        wrap="wrap"
        styles={{ marginTop: isMobile ? "100px" : "" }}
      >
        <Text
          type="h1"
          text="What Thrillers have to offer "
          font="Montserrat"
          weight={700}
          size={isMobile ? 24 : 36}
        />
        <Text
          type="p"
          text="Our goal is to assist you in traveling with assurance and ensuring your voyage is as seamless as can be."
          size={isMobile ? 16 : 18}
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
        {/* POPULAR HOTELS */}
        <Flex direction="column">
          <PopularHotels />
        </Flex>
      </Flex>
      <div style={{ padding: "2rem 0" }}>
        {/* TRENDING DESTINATIONS */}
        <TrendingDestination />
      </div>
      {/* MAP */}
      {/* <Map /> */}
      <div style={{ padding: "2rem 0" }}>
        {/* BLOG STORIES */}
        <BlogStories />
      </div>
      <Flex align="center" direction="column" padding="2rem 0">
        <Flex direction="column" align="center" gap=".5rem">
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

export default StaySection;
