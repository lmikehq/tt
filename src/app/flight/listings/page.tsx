"use client";
import Flights from "src/components/molecules/serviceTabs/components/flight";
import FlightList from "src/components/molecules/flights/components/flightList";
import { styled } from "styled-components";

const FlightTab = styled.div`
  background: white;
  box-shadow: 0px 4px 16px 0px #8dd3bb26;
  margin: 3rem 15rem;
  border-radius: 12.5px;
  padding: 1rem;
`;

function page() {
  return (
    <>
      <FlightTab>
        <Flights />
      </FlightTab>
      <FlightList />
    </>
  );
}

export default page;
