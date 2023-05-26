"use client";

import styled from "styled-components";

export const Divider = styled.div<{ margin?: string }>`
  border-bottom: 1px solid #dedee3;
  padding-bottom: 4px;
  margin: ${({ margin }) => margin || "10px 0"};
`;


