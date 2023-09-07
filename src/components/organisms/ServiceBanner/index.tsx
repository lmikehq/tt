"use client";

import ServiceTabs from "src/components/molecules/serviceTabs";
import { styled } from "styled-components";

const BannerWrapper = styled.div`
  // width: 80vw;
  background: var(--default-color);
  padding: 1.5rem 2rem;
  border-radius: 1rem;
  margin-top: 6rem;
  box-shadow: 0px 3px 24px #00000014;


  @media (max-width: 900px) {
    // transform: translateY(-1.5rem);
    width: 100%;
    margin-top: 0rem;
    padding: 1rem;
  }
`;

function ServiceBanner({}) {
  return (
    <BannerWrapper>
      <ServiceTabs />
    </BannerWrapper>
  );
}

export default ServiceBanner;
