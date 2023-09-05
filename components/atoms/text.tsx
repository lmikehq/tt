import React, { CSSProperties } from "react";
import styled from "styled-components";

interface TextProps {
  text: string;
  type: string;
  color?: string;
  size?: CSSProperties["fontSize"];
  font?: CSSProperties["fontFamily"];
  weight?: CSSProperties["fontWeight"];
  className?: string;
  styles?: CSSProperties;
  margin?: CSSProperties["margin"];
  padding?: CSSProperties["padding"];
  hoverColor?: string;
  opacity?: CSSProperties["opacity"];
  letterSpacing?: CSSProperties["letterSpacing"];
  transform?:
    | "none"
    | "full-width"
    | "capitalize"
    | "full-size-kana"
    | "lowercase"
    | "uppercase";
  whiteSpace?: CSSProperties["whiteSpace"];
  decoration?: CSSProperties["textDecoration"];
  cursor?: CSSProperties["cursor"];
  textAlign?: CSSProperties["textAlign"]
  width?: CSSProperties["width"];
}

export const Text: React.FC<TextProps> = ({
  text,
  type,
  color,
  font,
  size,
  weight,
  whiteSpace,
  transform = "none",
  margin,
  padding,
  decoration,
  opacity,
  width,
  letterSpacing,
  cursor,
  textAlign,
  styles = {},

}) => {
  const updatedStyles: CSSProperties = {
    color,
    fontSize: size,
    fontWeight: weight || "normal",
    whiteSpace,
    fontFamily: font ||  "Poppins",
    textDecoration: decoration,
    textTransform: transform,
    margin,
    padding,
    opacity,
    letterSpacing,
    cursor,
    width,
    textAlign,
    ...styles,
  };


  if (type === "p") return <p style={updatedStyles}>{text}</p>;
  if (type === "span") return <span style={updatedStyles}>{text}</span>;
  if (type === "label") return <label style={updatedStyles}>{text}</label>;
  if (type === "h1") return <h1 style={updatedStyles}>{text}</h1>;
  if (type === "h2") return <h2 style={updatedStyles}>{text}</h2>;
  if (type === "h3") return <h3 style={updatedStyles}>{text}</h3>;
  if (type === "h4") return <h4 style={updatedStyles}>{text}</h4>;
  if (type === "h5") return <h5 style={updatedStyles}>{text}</h5>;
  if (type === "h6") return <h6 style={updatedStyles}>{text}</h6>;

  return <div>{text}</div>;
};
export default Text;
