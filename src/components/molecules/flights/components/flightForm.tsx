"use client";
import Center from "@components/templates/center";
import Section from "src/components/molecules/section";
import Flights from "src/components/molecules/serviceTabs/components/flight";
import React from "react";
import { styled } from "styled-components";
import CountryInfo from "./countryInfo";

const FlightTab = styled.div`
  background: white;
  box-shadow: 0px 4px 16px 0px #8dd3bb26;
  margin: 3rem 15rem;
  border-radius: 12.5px;
  padding: 1rem;
`;

function FlightForm() {
  return (
    <Section>
      <FlightTab>
        <Center>
          <Flights />
        </Center>
      </FlightTab>
      <CountryInfo />
    </Section>
  );
}

export default FlightForm;
