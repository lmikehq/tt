"use client";

import AllCountryHead from "src/components/organisms/AllCountry/allCountryHead";
import React from "react";
import { Qparams } from "types";
import { unUrlString } from "src/lib/url";
import SectionLayout from "src/components/layouts/sectionLayout";
import CountryDetails from "src/components/atoms/countryDetails";
import { SAMPLE_COUNTRY_INFO } from "data/countryInfo";
import { Grid } from "src/components/atoms/grid";
import CountryRequirementDetails from "src/components/atoms/countryRequirementDetails";
import { SAMPLE_COUNTRY_REQUIREMENT } from "data/countryRequirement";
import HelpfulOrNot from "src/components/atoms/helpfulOrNot";
import SectionTitle from "src/components/molecules/sectionTitle";
import CoverImg from "/assets/images/visaPageCover.jpg";
import CoverDesktopImg from "/assets/images/visaDesktopCover.jpg";
import { useScreenResolution } from "hook/useScreenResolution";

interface pageProps {
  params: Qparams["params"];
}

const CountryPage: React.FC<pageProps> = ({ params }) => {
  const { isMobile } = useScreenResolution();
  const coverImage = isMobile ? CoverImg : CoverDesktopImg;

  return (
    <div>
      <AllCountryHead
        cover={coverImage}
        title={unUrlString(params.countryName || "")}
      />
      <SectionLayout>
        <SectionTitle
          title="NIGERIA - Get your Nigeria Visa now!"
          description="Explore our popular destinations with blah blah bluhsd sdrkh dgvkj ihs dflkjqb ihsdlkjsdf"
          showButton={false}
        />

        <Grid columns={isMobile ? "1fr" : "60% 40%"} gap="0">
          <CountryDetails details={SAMPLE_COUNTRY_INFO} />
          <CountryRequirementDetails details={SAMPLE_COUNTRY_REQUIREMENT} />
        </Grid>
        <HelpfulOrNot />
      </SectionLayout>
    </div>
  );
};
export default CountryPage;
