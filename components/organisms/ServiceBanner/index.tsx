"use client";

import CustomTab from "@atom/tabs";
import { SERVICES } from "data/services";
import { styled } from "styled-components";

const BannerWrapper = styled.div`
  width: 80vw;
  background: var(--default-color);
  padding: 2rem;
    border-radius: 1rem;
    margin-top: 6rem;
`;

function ServiceBanner({}) {
  const components = [
    <p>visa application</p>,
    <p>Flights application</p>,
    <p>Hotel application</p>,
  ];
  const services = SERVICES.map((service, i) => {
    return {
      value: i,
      label: service,
      content: components[i],
    };
  });

  return (
    <BannerWrapper>
      <CustomTab tabItems={services} />
    </BannerWrapper>
  );
}

export default ServiceBanner;
