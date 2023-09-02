import FlightSection from "@molecule/flights";
import StaySection from "@molecule/stays";
import FooterSection from "@organism/Footer";
import StayHero from "@organism/hero/stay";
import React from "react";

interface pageProps {}

const page: React.FC<pageProps> = ({}) => {
  return (
    <div>
      <StayHero/>
      <StaySection/>
      <FooterSection/>
    </div>
  );
};
export default page;
