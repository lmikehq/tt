import FlightSection from "src/components/molecules/flights";
import StaySection from "src/components/molecules/stays";
import FooterSection from "src/components/organisms/Footer";
import StayHero from "src/components/organisms/hero/stay";
import React from "react";

interface pageProps {}

const page: React.FC<pageProps> = ({}) => {
  return (
    <div>
      <StayHero />
      <StaySection />
      <FooterSection />
    </div>
  );
};
export default page;
