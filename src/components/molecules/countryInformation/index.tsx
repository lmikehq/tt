"use client";
import styled from "styled-components";
import Flex from "@components/templates/flex";
import CountryInformationHead from "./components/countryInformationHead";

const CountryInformationWrapper = styled(Flex)``;

const CountryInformation = () => {
  return (
    <CountryInformationWrapper>
      <CountryInformationHead
        cover={"/assets/images/nigeriaFlag.png"}
        title="NIGERIA"
      />
    </CountryInformationWrapper>
  );
};

export default CountryInformation;
