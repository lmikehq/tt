import FooterSection from "src/components/organisms/Footer";
import VisaHero from "src/components/organisms/hero/visa";
import PopularDestinations from "src/components/organisms/popularDestination";
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
