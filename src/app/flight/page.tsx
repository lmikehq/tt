import FlightSection from "src/components/molecules/flights";
import FooterSection from "src/components/organisms/Footer";
import FlightHero from "src/components/organisms/hero/flight";
import React from "react";

interface pageProps {}

const page: React.FC<pageProps> = ({}) => {
  return (
    <div>
      <FlightHero />
      <FlightSection />
      <FooterSection />
    </div>
  );
};
export default page;
