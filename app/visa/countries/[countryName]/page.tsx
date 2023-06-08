import AllCountryHead from "@organism/AllCountry/allCountryHead";
import React from "react";
import canada from "@image/canada-cover.png";
import { Qparams } from "types";
import { unUrlString } from "@lib/url";
import SectionLayout from "@components/layouts/sectionLayout";
import SectionTitle from "@atom/sectionTitle";
// import Flex from "@atom/flex";
import CountryDetails from "@atom/countryDetails";
import { SAMPLE_COUNTRY_INFO } from "data/countryInfo";
import { Grid } from "@atom/grid";
import RequiredDocuments from "@atom/requiredDocument";

interface pageProps {
  params: Qparams["params"];
}

const CountryPage: React.FC<pageProps> = ({ params }) => {
  return (
    <div>
      <AllCountryHead
        cover={canada}
        title={unUrlString(params.countryName || "")}
      />
      <SectionLayout>
        <SectionTitle
          title="NIGERIA - Get your Nigeria Visa now!"
          description="Explore our popular destinations with blah blah bluhsd sdrkh dgvkj ihs dflkjqb ihsdlkjsdf"
          showButton={false}
        />
        <Grid columns="60% 40%">
          <CountryDetails details={SAMPLE_COUNTRY_INFO} />
          <RequiredDocuments />
        </Grid>
      </SectionLayout>
    </div>
  );
};
export default CountryPage;
