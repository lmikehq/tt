"use client";

import AllCountryHead from "@organism/AllCountry/allCountryHead";
import React from "react";
import { Qparams } from "types";
import { unUrlString } from "src/lib/url";
import SectionLayout from "@components/templates/SectionLayout";
import CountryDetails from "./countryDetails";
import { SAMPLE_COUNTRY_INFO } from "@lib/extensions/data/countryInfo";
import { Grid } from "@components/templates/grid";
import CountryRequirementDetails from "./countryRequirementDetails";
import { SAMPLE_COUNTRY_REQUIREMENT } from "@lib/extensions/data/countryRequirement";
import HelpfulOrNot from "@molecule/helpfulOrNot";
import SectionTitle from "src/components/molecules/sectionTitle";
import { useScreenResolution } from "hook/useScreenResolution";

interface pageProps {
  params: Qparams["params"];
}

const CountryPage: React.FC<pageProps> = ({ params }) => {
  const { isMobile } = useScreenResolution();
  const coverImage = isMobile
    ? "/assets/images/visaPageCover.jpg"
    : "/assets/images/visaDesktopCover.jpg";

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
