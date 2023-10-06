import ButtonBase from "@mui/material/ButtonBase";
import Box from "@mui/material/Box";
import React, { CSSProperties } from "react";
import { ttColors } from "@/lib/theme/colors";

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
  variant?: "solid" | "outline" | "link";
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
  underlined,
  startIcon,
  endIcon,
  variant = "solid",
}) => {
  const buttonStyles: CSSProperties = {
    padding: padding,
    color: color || "#FFFFFF",
    fontWeight: fontWeight,
    fontSize: fontSize,
    fontFamily: "Poppins",
    width: width || "104px",
    height: height || "48px",
    borderRadius: borderRadius || "8px",
    cursor: disabled ? "not-allowed" : cursor || "pointer",
    zIndex: zIndex,
    border: border,
    margin: margin,
    textDecoration: underlined ? "underline" : "none",
    lineHeight: lineHeight,
    ...styles,
  };

  if (variant === "outline") {
    buttonStyles.background = "transparent";
    buttonStyles.border = `2px solid ${color || "#FFFFFF"}`;
    buttonStyles.color = color || "#FFFFFF";
  } else if (variant === "link") {
    buttonStyles.background = "transparent";
    buttonStyles.border = "none";
    buttonStyles.color = color || ttColors.primaryLight;
    buttonStyles.textDecoration = underlined ? "underline" : "none";
  } else {
    buttonStyles.background = disabled
      ? "#585870"
      : background || ttColors.primary;
  }

  return (
    <ButtonBase
      id={id}
      style={buttonStyles}
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
