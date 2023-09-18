import Flex from "@atom/flex";
import React from "react";
import SortedColumn from "./sortedColumn";
import Section from "@molecule/section";
import AvailableFlights from "./availableFlights";

function FlightList() {
  return (
    <Flex gap="1rem" padding="2rem 6rem">
      <Section width="15%">
        <SortedColumn/>
      </Section>
      <Section width="85%">
        <AvailableFlights/>
      </Section>
    </Flex>
  );
}

export default FlightList;
