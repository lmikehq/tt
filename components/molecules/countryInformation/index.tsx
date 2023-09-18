"use client";
import NigeriaFlag from "@image/nigeriaFlag.png";
import styled from "styled-components";
import Flex from "@atom/flex";
import CountryInformationHead from "./components/countryInformationHead";

const CountryInformationWrapper = styled(Flex)``;

const CountryInformation = () => {
  return (
    <CountryInformationWrapper>
      <CountryInformationHead cover={NigeriaFlag} title="NIGERIA" />
    </CountryInformationWrapper>
  );
};

export default CountryInformation;
