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
      fill={!props.width && !props.height ? true : undefined}
      width={props.width}
      height={props.height}
      style={{ ...props.styles }}
    />
  );
};
export default Image;
