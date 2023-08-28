"use client";

import styled from "styled-components";

export default styled.section<{ margin?: string, padding?: string }>`
  padding: ${(props) => props?.padding || "0 6.5rem"};
  max-width: 1600px;
  margin: ${(props) => props?.margin || "0 auto"};
  position: relative;

  @media screen and (max-width: 900px) {
    width: 90vw;
  }
`;
