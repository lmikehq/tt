"use client";

import React from "react";
import styled from "styled-components";
import CountryArticle from "./countryArticle";
import Button from "@atom/button";

const Wrapper = styled.div`
  width: 100%;
  padding-right: 5rem;

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
  }
  & img {
    width: 100%;
  }
`;

function CountryDetails({ details }: { details: string }) {
  return (
    <Wrapper>
      <CountryArticle article={{ body: details }} />
      <Button width="289px" padding="10px 20px" margin="4rem auto" fontSize="1rem" >
        Apply Now
      </Button>
    </Wrapper>
  );
}

export default CountryDetails;
