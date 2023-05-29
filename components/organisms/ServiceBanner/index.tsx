"use client";

import ServiceTabs from "@molecule/serviceTabs";
import { styled } from "styled-components";

const BannerWrapper = styled.div`
  width: 80vw;
  background: var(--default-color);
  padding: 2rem;
  border-radius: 1rem;
  margin-top: 6rem;
`;

function ServiceBanner({}) {
  return (
    <BannerWrapper>
      <ServiceTabs />
    </BannerWrapper>
  );
}

export default ServiceBanner;
