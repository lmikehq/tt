import Flex from "@components/templates/flex";
import React, { useState } from "react";
import SortedColumn from "./sortedColumn";
import Section from "src/components/molecules/section";
import AvailableFlights from "./availableFlights";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import Box from "@mui/material/Box";

function FlightList() {
  const { isMobile } = useScreenResolution();
  const [results, setResults] = useState(0);
  const [sortType, setSortType] = useState("best");

  return (
    <Flex direction={isMobile ? "column" : "row"} gap="3rem" justify="space-between" padding={isMobile ? "1rem" :"2rem"}>
    <Box
      sx={{
        display: "grid",
        columnGap: "2rem",
        gridTemplateColumns: { xs: "1fr", sm: "3fr 7fr" },
      }}
    >
      <Section>
        <SortedColumn results={results} sortType={sortType} />
      </Section>
      <Section>
        <AvailableFlights />
      </Section>
    </Box>
    </Flex>
  );
}

export default FlightList;
