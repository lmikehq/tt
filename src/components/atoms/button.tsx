import ButtonBase from "@mui/material/ButtonBase";
import Box from "@mui/material/Box";
import React, { CSSProperties } from "react";

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
  cursor?: string;
  border?: string;
  zIndex?: string;
  margin?: string;
  onClick?: (e: any) => void;
  styles?: CSSProperties;
  lineHeight?: string;
  type?: "button" | "submit" | "reset" | undefined;
  underlined?: boolean;
  disabled?: boolean;
  id?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const Button: React.FC<buttonProps> = ({
  children,
  padding,
  color,
  background,
  fontWeight,
  fontSize,
  width,
  height,
  cursor,
  zIndex,
  borderRadius,
  border,
  margin,
  onClick,
  styles,
  lineHeight,
  type,
  disabled,
  id,
  startIcon,
  endIcon,
}) => {
  return (
    <ButtonBase
      id={id}
      style={{
        padding: padding,
        color: color || "#FFFFFF",
        background: disabled ? "#585870" : background || "#06062A",
        fontWeight: fontWeight,
        fontSize: fontSize,
        fontFamily: "Poppins",
        width: width || "104px",
        height: height || "48px",
        borderRadius: borderRadius || "8px",
        cursor: cursor || "pointer",
        zIndex: zIndex,
        border: border,
        margin: margin,
        lineHeight: lineHeight,
        ...styles,
      }}
      type={type}
      onClick={!disabled ? onClick : undefined}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          columnGap: "5px",
        }}
      >
        {startIcon}
        {children}
        {endIcon}
      </Box>
    </ButtonBase>
  );
};

export default Button;
