import AllCountryHead from "@organism/AllCountry/allCountryHead";
import React from "react";
import canada from "@image/canada-cover.png";
import { Qparams } from "types";
import { unUrlString } from "@lib/url";

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
    </div>
  );
};
export default CountryPage;
