"use client";
import Flex from "@atom/flex";
import { Grid } from "@atom/grid";
import Text from "@atom/text";
import Section from "@molecule/section";
import { flightContext } from "context";
import { styled } from "styled-components";
import { canadianCities } from "./country";

const CountryBox = styled.div<{ backgroundImage: string }>`
  width: 85%;
  height: 25rem;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${(props) => props.backgroundImage});
  background-size: cover;
  display: flex;
  align-items: flex-end;
  padding: 2rem;
  border-radius: 12.5px;
  cursor: pointer;
`;

function CountryInfo() {
  const context = flightContext();

  if (!context) {
    throw new Error("flightContext must be used within a FlightProvider");
  }

  const { state } = context;

  function generateRandomPrice(min = 1500, max = 10000) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleHover = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(e.target)
  }

  return (
    <Section padding="0 7rem">
      <Flex direction="column" gap=".5rem">
        <Text
          type="h1"
          text={`Explore ${state.arrivalCountry}`}
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
        {canadianCities.map((city) => (
          <CountryBox key={city.name} backgroundImage={city.imageUrl} onMouseOver={handleHover} >
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
                text={`Tickets from $${generateRandomPrice().toLocaleString()}`}
                color="white"
                size={20}
              />
            </Flex>
          </CountryBox>
        ))}
      </Grid>
    </Section>
  );
}

export default CountryInfo;
