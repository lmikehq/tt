"use client";
import Flights from "src/components/molecules/serviceTabs/components/flight";
import FlightList from "src/components/molecules/flights/components/flightList";
import { styled } from "styled-components";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import SectionLayout from "@components/templates/SectionLayout";
import { FlightContext } from "@/lib/extensions/context";
import { useContext } from "react";

const FlightTab = styled.div`
    background: white;
    box-shadow: 0px 4px 16px 0px #8dd3bb26;
    margin: 4rem 0;
    border-radius: 12.5px;
    padding: 1.5rem;
`;

function Page() {
    const { isMobile } = useScreenResolution();
    const flightContext = useContext(FlightContext);
    const flightState = flightContext?.state;

    return (
        <SectionLayout style={{ padding: isMobile ? "0 0rem" : "" }}>
            <FlightTab>
                <Flights />
            </FlightTab>
            {flightState?.fleet && flightState.fleet.length > 0 && (
                <FlightList />
            )}
        </SectionLayout>
    );
}

export default Page;
