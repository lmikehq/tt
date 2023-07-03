"use client";

import styled from "styled-components";

export default styled.section<{ margin?: string }>`
  width: 85vw;
  max-width: 1600px;
  margin: ${(props) => props?.margin || "0 auto"};
  position: relative;

  @media screen and (max-width: 900px) {
    width: 90vw;
  }
`;
