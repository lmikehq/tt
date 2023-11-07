import Flex from "@components/templates/flex";
import Section from "src/components/molecules/section";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import Box from "@mui/material/Box";
import AvailableRooms from "./availableRooms";
import SortedColumn from "./sortedColumn";
import { useState } from "react";

function RoomList() {
  const { isMobile } = useScreenResolution();
  const [results, setResults] = useState(0);
  const [sortType, setSortType] = useState("best");

  return (
    <Box
      sx={{
        display: "grid",
        columnGap: "2rem",
        gridTemplateColumns: { xs: "1fr", sm: "3fr 7fr" },
        marginTop: "30px",
      }}
    >
      <Section>
        <SortedColumn results={results} sortType={sortType} />
      </Section>
      <Section>
        <AvailableRooms />
      </Section>
    </Box>
  );
}

export default RoomList;
