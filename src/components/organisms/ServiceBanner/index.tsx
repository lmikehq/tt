"use client";

import SectionLayout from "@components/templates/SectionLayout";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import ServiceTabs from "src/components/molecules/serviceTabs";
import { styled } from "styled-components";

// const BannerWrapper = styled.div`
//   width: 80vw;
//   background: var(--default-color);
//   padding: 1.5rem 2rem;
//   border-radius: 1rem;
//   margin-top: 6rem;
//   box-shadow: 0px 3px 24px #00000014;

//   @media (max-width: 900px) {
//     // transform: translateY(-1.5rem);
//     width: 100%;
//     margin-top: 0rem;
//     padding: 1rem;
//   }
// `;

function ServiceBanner({ page }: { page?: string }) {
  const { isMobile } = useScreenResolution();
  return (
    <SectionLayout
      margin={isMobile ? "0" : "6rem 0px 0px 0px !important"}
      style={{
        backgroundColor: "var(--default-color)",
        borderRadius: "1rem",
        boxShadow: "0px 3px 24px #00000014",
      }}
    >
      <ServiceTabs page={page} />
    </SectionLayout>
  );
}

export default ServiceBanner;
