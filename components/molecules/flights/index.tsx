"use client";
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

const FlightSection = () => {
  return (
    <Section padding="0 5rem">
      <Flex direction="column" gap=".65rem" wrap="wrap">
        <Text type="h1" text="What Thrillers have to offer" font="Montserrat" weight={700} size={36} />
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
                    <GiSettingsKnobs size={22} rotate={-180}  />
                </BlueIcon>
                <Flex direction="column">
                    <Text type='h3' text="Filter for what you want" weight={600} size={22} />
                    <Text type='p' text="Users can refine their search results based on criteria"/>
                </Flex>
            </Flex>
        </BlueBox>
        <BlueBox>
            <Flex direction="column" gap="1.5rem">
                <BlueIcon>
                    <ImPriceTag size={22} />
                </BlueIcon>
                <Flex direction="column">
                    <Text type='h3' text="Track prices" weight={600} size={22} />
                    <Text type='p' text="Not ready to book? Set alerts for when prices drop"/>
                </Flex>
            </Flex>
        </BlueBox>
        <BlueBox>
            <Flex direction="column" gap="1.5rem">
                <BlueIcon>
                    <FaPlaneArrival size={22}/>
                </BlueIcon>
                <Flex direction="column">
                    <Text type='h3' text="Find flexible flight deals" weight={600} size={22} />
                    <Text type='p' text="Users can refine their search results based on criteria"/>
                </Flex>
            </Flex>
        </BlueBox>
      </Flex>
    </Section>
  );
};

export default FlightSection;
