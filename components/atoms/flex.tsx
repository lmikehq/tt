"use client";

import React, { CSSProperties } from "react";
import styled from "styled-components";

interface flexProps {
  children: React.ReactNode;
  justify?:
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "flex-start"
    | "flex-end";
  align?: "center" | "flex-start" | "flex-end" | "stretch" | "baseline";
  gap?: string;
  direction?: "row" | "column";
  alignSelf?: "center" | "flex-start" | "flex-end" | "stretch" | "baseline";
  borderBottom?: string;
  margin?: string;
  padding?: string;
  width?: string;
  styles?: CSSProperties;
  background?: string;
  borderRadius?: string;
  id?: string;
  overflow?: string;
  wrap?: "wrap" | "nowrap";
  border?: string;
  height?: string;
  cursor?: string;
  onClick?: () => void;
}

const FlexWrapper = styled.div`
  width: 100%;
`;

export const Flex: React.FC<flexProps> = ({
  children,
  justify,
  align,
  gap,
  direction,
  margin,
  padding,
  background,
  width,
  height,
  borderRadius,
  id,
  overflow,
  wrap,
  border,
  borderBottom,
  alignSelf,
  cursor,
  onClick,
}) => {
  return (
    <FlexWrapper
      id={id}
      style={{
        margin: margin,
        display: "flex",
        justifyContent: justify,
        alignItems: align,
        gap: gap,
        cursor,
        flexDirection: direction,
        background: background,
        width: width,
        overflow: overflow || "hidden",
        borderRadius: borderRadius,
        border: border,
        padding: padding,
        flexWrap: wrap,
        height: height,
        alignSelf: alignSelf,
        borderBottom: borderBottom,
      }}
      onClick={onClick}
    >
      {children}
    </FlexWrapper>
  );
};
export default Flex;
