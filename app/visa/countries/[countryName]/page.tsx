import CountryPage from "@atom/countryName";
import React from "react";
import { Qparams } from "types";

interface pageProps {
  params: Qparams["params"];
}

const CountryPageSection: React.FC<pageProps> = ({ params }) => {
  return <CountryPage params={params} />;
};

export default CountryPageSection;
