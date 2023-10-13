"use client";

import React from "react";
import styled from "styled-components";
import CountryRequirement from "./countryRequirement";
import Button from "../atoms/button";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import Link from "../atoms/link";
import { ttColors } from "@/lib/theme/colors";
import { useUserStore } from "@/lib/store/useStore";

const Wrapper = styled.div`
  width: 100%;
  // padding-right: 5rem;

  @media screen and (max-width: 900px) {
    padding-right: 0 !important;
  }

  & .prose {
    max-width: unset;
  }

  & .prose p,
  .prose li,
  .prose h1,
  .prose h2,
  .prose h3,
  .prose h4,
  .prose h5,
  .prose h6,
  .prose blockquote,
  .prose pre,
  .prose table,
  .prose dl,
  .prose ol,
  .prose ul,
  .prose figure,
  .prose hr {
    font-size: 1rem;
    color: #000000;
    line-height: 24px;

    @media screen and (max-width: 900px) {
      font-size: 0.85rem !important;
    }
  }
  max-width: 100%;

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
  }

  & h1 {
    font-size: 24px !important;
    line-height: 36px;
    color: #06062a important;

    @media screen and (max-width: 900px) {
      font-size: 18px !important;
    }
  }
`;

function CountryRequirementDetails({
  details,
  country,
}: {
  details: string;
  country: string;
}) {
  const { isMobile } = useScreenResolution();
  const { geoInfo } = useUserStore();

  return (
    <Wrapper>
     {!isMobile &&  <Link href={`/visa/apply/?destination=${country}&home=${geoInfo?.country}`}>
        <Button
          width={isMobile ? "100%" : "289px"}
          padding="10px 20px"
          margin={isMobile ? "1rem auto 2.5rem" : "0 0 3rem"}
          fontSize="1rem"
          background={ttColors.dark}
        >
          Apply Now
        </Button> 
      </Link> }
      <CountryRequirement article={{ body: details }} />
    </Wrapper>
  );
}

export default CountryRequirementDetails;
