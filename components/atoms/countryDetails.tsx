"use client";

import React from "react";
import styled from "styled-components";
import CountryArticle from "./countryArticle";

const Wrapper = styled.div`
  width: 100%;

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
  }
  //   overflow: hidden;
  max-width: 100%;

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
  }

  & a {
    color: #0645ad;
    text-decoration: none;
  }
  & img {
    width: 100%;
  }
`;

function CountryDetails({ details }: { details: string }) {
  return (
    <Wrapper>
      <CountryArticle article={{ body: details }} />
    </Wrapper>
  );
}

export default CountryDetails;
