'use client';

import AllCountryHead from "@organism/AllCountry/allCountryHead";
import React from "react";
import { Qparams } from "types";
import { unUrlString } from "@lib/url";
import SectionLayout from "@components/layouts/sectionLayout";
import CountryDetails from "@atom/countryDetails";
import { SAMPLE_COUNTRY_INFO } from "data/countryInfo";
import { Grid } from "@atom/grid";
import CountryRequirementDetails from "@atom/countryRequirementDetails";
import { SAMPLE_COUNTRY_REQUIREMENT } from "data/countryRequirement";
import HelpfulOrNot from "@atom/helpfulOrNot";
import SectionTitle from "@molecule/sectionTitle";
import CoverImg from "@image/visaPageCover.jpg";
import CoverDesktopImg from "@image/visaDesktopCover.jpg";
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

        <Grid columns={isMobile ? "1fr" : "60% 40%" }gap="0">
          <CountryDetails details={SAMPLE_COUNTRY_INFO} />
          <CountryRequirementDetails details={SAMPLE_COUNTRY_REQUIREMENT} />
        </Grid>
        <HelpfulOrNot />
      </SectionLayout>
    </div>
  );
};
export default CountryPage;
