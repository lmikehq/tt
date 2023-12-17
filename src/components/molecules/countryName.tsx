"use client";
import { fetchHTMLContent } from "@/lib/utilFns";
import SectionLayout from "@components/templates/SectionLayout";
import { Grid } from "@components/templates/grid";
import { SAMPLE_COUNTRY_REQUIREMENT } from "@lib/extensions/data/countryRequirement";
import { unUrlString } from "@lib/extensions/helpers/url";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import { Qparams } from "@lib/types";
import HelpfulOrNot from "@molecule/helpfulOrNot";
import AllCountryHead from "@organism/AllCountry/allCountryHead";
import React, { useEffect } from "react";
import CountryDetails from "./countryDetails";
import CountryRequirementDetails from "./countryRequirementDetails";
import SectionTitle from "./sectionTitle";
// import '@style/countries.css'
interface pageProps {
    params: Qparams["params"];
}

const CountryPage: React.FC<pageProps> = ({ params }) => {
    const { isMobile } = useScreenResolution();
    const [html, setHtml] = React.useState("");

    useEffect(() => {
        fetchHTMLContent(params.countryName || "canada").then((HTML) =>
            setHtml(HTML)
        );
    }, []);

    const coverImage = isMobile
        ? "/assets/images/visaPageCover.jpg"
        : "/assets/images/visaDesktopCover.jpg";
    const countryInfo = `
  <div class="prose prose-slate mx-auto mt-8 lg:prose-lg">
  ${html}

  `;
    return (
        <div>
            <AllCountryHead
                cover={coverImage}
                title={unUrlString(params.countryName || "")}
            />
            <SectionLayout>
                <SectionTitle
                    title={`${params?.countryName?.toLocaleUpperCase()} - Apply for your Visa now!`}
                    description="We can help you to process the visa, and provide all the necessary documents."
                    showButton={false}
                />

                <Grid
                    columns={isMobile ? "1fr" : "60% 40%"}
                    gap="0"
                    style={{
                        gridTemplateColumns: isMobile ? "1fr" : "65% 35%",
                    }}
                >
                    <CountryDetails
                        details={countryInfo}
                        country={params?.countryName || ""}
                    />
                    <CountryRequirementDetails
                        details={SAMPLE_COUNTRY_REQUIREMENT}
                        country={params.countryName || ""}
                    />
                </Grid>
                <HelpfulOrNot />
            </SectionLayout>
        </div>
    );
};
export default CountryPage;
