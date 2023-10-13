"use client";

import React from "react";
import styled from "styled-components";
import CountryArticle from "./countryArticle";
import Button from "@atom/button";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import Link from "../atoms/link";
import { ttColors } from "@/lib/theme/colors";

const Wrapper = styled.div`
  width: 100%;
  padding-right: 5rem;

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
  //   overflow: hidden;
  max-width: 100%;

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
  }

  & a {
    color: #000000;
    // text-decoration: none;
  }
  & h1 {
    font-size: 24px !important;
    line-height: 36px;
    color: #06062a important;

    @media screen and (max-width: 900px) {
      font-size: 18px !important;
    }
  }
  & img {
    width: 100%;
  }
`;

function CountryDetails({
  details,
  country,
}: {
  details: string;
  country: string;
}) {
  const { isMobile } = useScreenResolution();

  return (
    <Wrapper>
      <CountryArticle article={{ body: details }} />
      <Link href={`/visa/apply/?destination=${country}`}>
        <Button
          width={isMobile ? "100%" : "289px"}
          padding="10px 20px"
          margin={isMobile ? "1rem auto 2.5rem" : "4rem auto"}
          fontSize="1rem"
          background={ttColors.dark}
        >
          Apply Now
        </Button>
      </Link>
    </Wrapper>
  );
}

export default CountryDetails;
