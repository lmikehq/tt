import FooterSection from "@organism/Footer";
import VisaHero from "@organism/hero/visa";
import PopularDestinations from "@organism/popularDestination";
import React from "react";

interface pageProps {}

const page: React.FC<pageProps> = ({}) => {
  return (
    <div>
      <VisaHero />
      <PopularDestinations title="Apply to our popular countries" />
      <FooterSection />
    </div>
  );
};
export default page;
