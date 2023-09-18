import FlightSection from "@molecule/flights";
import FooterSection from "@organism/Footer";
import FlightHero from "@organism/hero/flight";
import React from "react";

interface pageProps {}

const page: React.FC<pageProps> = ({}) => {
  return (
    <div>
      <FlightHero/>
      <FlightSection/>
      <FooterSection/>
    </div>
  );
};
export default page;
