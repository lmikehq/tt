import FlightSection from "src/components/molecules/flights";
import FooterSection from "@organism/Footer";
import FlightHero from "@organism/hero/flight";
import React from "react";
import { FlightProvider } from "@/lib/extensions/context";

function Page ({}) {
    return (
        <FlightProvider>
            <FlightHero />
            <FlightSection />
            <FooterSection showNewsletter={false} />
        </FlightProvider>
    );
};
export default Page;
