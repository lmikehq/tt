import Section from "src/components/molecules/section";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import styled from "styled-components";
import SortedColumn from "./sortedColumn";
import AvailableRooms from "./availableRooms";

const SectionLayout = styled.div``;
function RoomList() {
    const { isMobile } = useScreenResolution();
    const [results, setResults] = useState(0);
    const [sortType, setSortType] = useState("best");

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: isMobile ? "100%" : "30% 67.3%",
                gap: "30px",
                marginTop: "20px",
            }}
        >
            <SectionLayout style={{ position: "relative" }}>
                <SortedColumn results={results} sortType={sortType} />
            </SectionLayout>
            <SectionLayout>
                <AvailableRooms />
            </SectionLayout>
        </Box>
    );
}

export default RoomList;
