import { FlightProvider } from "@lib/extensions/context";
import FooterSection from "@organism/Footer";
import VisaHero from "@organism/hero/visa";
import PopularDestinations from "@organism/popularDestination";

import React from "react";

interface pageProps {}

const page: React.FC<pageProps> = ({}) => {
  return (
    <FlightProvider>
      <VisaHero />
      <PopularDestinations title="Apply to our popular countries" />
      <FooterSection />
    </FlightProvider>
  );
};
export default page;
