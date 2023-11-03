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
  align?: "center" | "flex-start" | "flex-end" | "stretch" | "baseline" | "space-between";
  gap?: string;
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  alignSelf?: "center" | "flex-start" | "flex-end" | "stretch" | "baseline";
  borderBottom?: string;
  margin?: string;
  padding?: string;
  width?: string;
  maxWidth?: string;
  styles?: CSSProperties;
  background?: string;
  borderRadius?: string;
  id?: string;
  overflow?: string;
  overflowY?:
    | "auto"
    | "clip"
    | "hidden"
    | "scroll"
    | "visible"
    | "inherit"
    | "initial"
    | "unset";
  overflowX?:
    | "auto"
    | "clip"
    | "hidden"
    | "scroll"
    | "visible"
    | "inherit"
    | "initial"
    | "unset";
  wrap?: "wrap" | "nowrap" | "unset";
  border?: string;
  height?: string;
  cursor?: string;
  ref?: any;
  onClick?: (e: any) => void;
    className?: string;
    position?: CSSProperties['position']
}

const FlexWrapper = styled.div`
  width: 100%;
`;

const Flex: React.FC<flexProps> = ({
  children,
  justify,
  align,
  gap,
  direction,
  margin,
  padding,
  background,
  width,
  maxWidth,
  height,
  borderRadius,
  id,
  overflow,
  overflowY,
  overflowX,
  wrap,
  border,
  borderBottom,
  alignSelf,
  cursor,
  ref,
  styles,
  onClick,
    className,
  position
}) => {
    return (
        <FlexWrapper
            className={className}
            ref={ref}
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
                maxWidth: maxWidth,
                overflow: overflow || "unset",
                overflowY: overflowY,
                overflowX: overflowX,
                borderRadius: borderRadius,
                border: border,
                padding: padding,
                flexWrap: wrap,
                height: height,
                alignSelf: alignSelf,
                borderBottom: borderBottom ?? border,
                position,
                ...styles,
            }}
            onClick={onClick}
        >
            {children}
        </FlexWrapper>
    )
};
export default Flex;
