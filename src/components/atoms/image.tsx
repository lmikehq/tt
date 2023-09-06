import React, { CSSProperties } from "react";
import NextImage, { StaticImageData } from "next/image";
interface imageProps {
  src: StaticImageData | string;
  alt: string;
  width?: number;
  height?: number;
  styles?: CSSProperties;
  border?: string;
  borderRadius?: string;
  background?: string;
  padding?: string;
  margin?: string;
  onClick?: () => void;
}

const Image: React.FC<imageProps> = (props: imageProps) => {
  return (
    <NextImage
      {...props}
      width={props.width ?? 1336}
      height={props.height ?? 862}
      style={{
        ...props.styles,

        width: props.width
          ? typeof props.width == "number"
            ? props.width + "px"
            : props.width
          : "100%",
        height: props.height
          ? typeof props.height == "number"
            ? props.height + "px"
            : props.height
          : "100%",
      }}
    />
  );
};
export default Image;
