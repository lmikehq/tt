"use client";
import Flex from "@components/templates/flex";
import { Grid } from "@components/templates/grid";
import Text from "@atom/text";
import Section from "src/components/molecules/section";
import { FlightContext } from "@lib/extensions/context";
import { styled } from "styled-components";
import { canadianCities } from "./country";
import { useState, useEffect, useContext } from "react";

const CountryBox = styled.div<{ backgroundImage: string; isHovered: boolean }>`
  width: 85%;
  height: 25rem;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${(props) => props.backgroundImage});
  background-size: cover;
  display: flex;
  align-items: ${(props) => (props.isHovered ? "center" : "flex-end")};
  justify-content: ${(props) => props.isHovered && "center"};
  padding: 2rem;
  border-radius: 12.5px;
  cursor: pointer;
  transition: align-items 0.3s ease-in-out;

  &:hover {
    align-items: center;
  }
`;

function CountryInfo() {
  const context = useContext(FlightContext)
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [prices, setPrices] = useState<number[]>([]);

  const handleHover = (cityName: string) => {
    setHoveredCity(cityName);
  };

  if (!context) {
    throw new Error("flightContext must be used within a FlightProvider");
  }

  const { state } = context;

  function generateRandomPrice(min = 1500, max = 10000) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(() => {
    const newPrices = canadianCities.map(() => generateRandomPrice());
    setPrices(newPrices);
  }, []);

  return (
    <Section padding="2rem 8rem">
      <Flex direction="column" gap=".5rem">
        <Text
          type="h1"
          text={`Explore ${state.fleet[0].arrivalCountry}`}
          font="Montserrat"
          size={36}
          weight={700}
        />
        <Text
          type="p"
          text="Select your preferred destination to view all available flights."
          size={18}
        />
      </Flex>
      <Grid columns="3" gap="4rem 0" padding="2rem 0">
        {canadianCities.map((city, index) => (
          <CountryBox
            key={index}
            backgroundImage={city.imageUrl}
            onMouseOver={() => handleHover(city.name)}
            isHovered={hoveredCity === city.name}
          >
            {hoveredCity !== city.name ? (
              <Flex direction="column" gap=".5rem">
                <Text
                  type="h3"
                  weight={700}
                  font="Montserrat"
                  text={city.name}
                  color="white"
                  size={30}
                />
                <Text
                  type="p"
                  weight={600}
                  font="Montserrat"
                  text={`Tickets from $${
                    prices[index] ? prices[index].toLocaleString() : ""
                  }`}
                  color="white"
                  size={20}
                />
              </Flex>
            ) : (
              <Flex align="center" justify="center">
                <Text
                  type="p"
                  text={city.name}
                  color="white"
                  transform="uppercase"
                  font="Montserrat"
                  weight={700}
                  size={42}
                />
              </Flex>
            )}
          </CountryBox>
        ))}
      </Grid>
    </Section>
  );
}

export default CountryInfo;
