"use client";
import styled from "styled-components";

const SectionLayout = styled.section<{ margin?: string; padding?: string }>`
  // padding: ${(props) => props?.padding || "0 6.5rem"};
  // width: 80%;
  // margin: auto;
  width: 80vw;
  max-width: 1600px;
  margin: ${(props) => props?.margin || "0 auto"};
  position: relative;

  @media screen and (max-width: 900px) {
    padding: ${(props) => props?.padding || "0 1.187rem"};
    width: 100%;
  }
`;

export default SectionLayout;
