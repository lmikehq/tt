import Flex from "@components/templates/flex";
import React, { useState } from "react";
import SortedColumn from "./sortedColumn";
import Section from "src/components/molecules/section";
import AvailableFlights from "./availableFlights";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { useParams } from "next/navigation";
import { useQueryParams } from "@/hooks/useNext";
import MultiFlightPreviewCard from "./MultiFlightPreviewCard";
import AvailableMultiFlights from "../multi/AvailableMultiFlights";

function FlightList() {
    const { isMobile } = useScreenResolution();
    const [results, setResults] = useState(0);
    const [sortType, setSortType] = useState("");

    const { queryParams } = useQueryParams();
    const multi = queryParams?.multi;

    return (
        <Flex
            direction={isMobile ? "column" : "row"}
            gap={isMobile ? "0rem" : "2rem"}
            justify="space-between"
            align="flex-start"
        >
            <Section width={isMobile ? "100%" : "26%"}>
                <SortedColumn results={results} sortType={sortType} />
            </Section>
            <Section width={isMobile ? "100%" : "74%"}>
                {multi == "true" ? (
                    <AvailableMultiFlights />
                ) : (
                    <AvailableFlights />
                )}
            </Section>
        </Flex>
    );
}

export default FlightList;
