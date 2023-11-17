import Flex from "@components/templates/flex";
import Section from "src/components/molecules/section";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import Box from "@mui/material/Box";
import AvailableRooms from "./availableRooms";
import SortedColumn from "./sortedColumn";
import { useState } from "react";
import styled from "styled-components";

const SectionLayout = styled.div``;
function RoomList() {
  const { isMobile } = useScreenResolution();
  const [results, setResults] = useState(0);
  const [sortType, setSortType] = useState("best");

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: isMobile ? "100%" : "300px 74%",
        gap: "2rem",
        marginTop: "20px",
      }}
    >
      <SectionLayout>
        <SortedColumn results={results} sortType={sortType} />
      </SectionLayout>
      <SectionLayout>
        <AvailableRooms />
      </SectionLayout>
    </Box>
  );
}

export default RoomList;
