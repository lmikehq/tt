import React, { CSSProperties } from "react";
import styled from "styled-components";

interface buttonProps {
  children: React.ReactNode;
  padding?: string;
  color?: string;
  background?: string;
  fontWeight?: string;
  textTransform: "Capitalize" | "Uppercase" | "Lowercase" | "None";
  fontSize?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  border?: string;
  margin?: string;
  onClick?: () => void;
  styles?: CSSProperties;
}

const ButtonWrapper = styled.button`
  width: 50%;
  padding: 1rem 2rem;
  background: var(--secondary-color);
  color: var(--default-color);
  border: none;
  border-radius: 0.3rem;
  text-transform: capitalize;
  font-weight: 600;
  font-size: 1rem;
  margin: 0 auto;
  display: block;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: var(--secondary-color);
  }
`;

export const Button: React.FC<buttonProps> = ({
  children,
  padding,
  color,
  background,
  fontWeight,
  textTransform,
  fontSize,
  width,
  height,
  borderRadius,
  border,
  margin,
  onClick,
  styles,
}) => {
  return (
    <ButtonWrapper
      style={{
        padding: padding,
        color: color,
        background: background,
        fontWeight: fontWeight,
        textTransform: textTransform,
        fontSize: fontSize,
        width: width,
        height: height,
        borderRadius: borderRadius,
        border: border,
        margin: margin,
        ...styles,
      }}
      onClick={onClick}
    >
      {children}
    </ButtonWrapper>
  );
};

export default Button;
