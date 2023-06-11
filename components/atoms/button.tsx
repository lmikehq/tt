import { ButtonBase } from "@mui/material";
import React, { CSSProperties } from "react";
import styled from "styled-components";

interface buttonProps {
  children: React.ReactNode;
  padding?: string;
  color?: string;
  background?: string;
  fontWeight?: string;
  fontSize?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  border?: string;
  zIndex?: string;
  margin?: string;
  onClick?: (e: any) => void;
  styles?: CSSProperties;
  lineHeight?: string;
  type?: "button" | "submit" | "reset" | undefined;
}

const ButtonWrapper = styled.button`
  &:hover {
  }
  &:active {
    transform: scale(0.98);
    border: 1px solid #06062a;
  }
`;

export const Button: React.FC<buttonProps> = ({
  children,
  padding,
  color,
  background,
  fontWeight,
  fontSize,
  width,
  height,
  zIndex,
  borderRadius,
  border,
  margin,
  onClick,
  styles,
  lineHeight,
  type,
}) => {
  return (
    <ButtonBase
      style={{
        padding: padding,
        color: color || "#FFFFFF",
        background: background || "#06062A",
        fontWeight: fontWeight,
        fontSize: fontSize,
        // fontFamily: "Poppins",
        width: width || "104px",
        height: height || "48px",
        borderRadius: borderRadius || "8px",
        cursor: "pointer",
        zIndex: zIndex,
        border: border,
        margin: margin,
        lineHeight: lineHeight,
        ...styles,
      }}
      type={type}
      onClick={onClick}
    >
      {children}
      {/* </ButtonWrapper> */}
    </ButtonBase>
  );
};

export default Button;
