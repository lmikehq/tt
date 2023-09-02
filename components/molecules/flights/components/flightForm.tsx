"use client"
import Center from "@atom/center";
import Section from "@molecule/section";
import Flights from "@molecule/serviceTabs/components/flight";
import ServiceBanner from "@organism/ServiceBanner";
import React from "react";
import { styled } from "styled-components";
import CountryInfo from "./countryInfo";

const FlightTab = styled.div`
  background: white;
  box-shadow: 0px 4px 16px 0px #8DD3BB26;
  margin: 3rem 15rem;
  border-radius: 12.5px;
  padding: 1rem;
`

function FlightForm() {
  return (
    <Section>
      <FlightTab>
        <Center>
          <Flights />
        </Center>
      </FlightTab>
      <CountryInfo/>
    </Section>
  );
}

export default FlightForm;
