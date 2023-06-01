import React, {CSSProperties} from "react";
import NextImage, { StaticImageData } from "next/image";
interface imageProps {
  src: StaticImageData;
  alt: string;
  width?: number ;
  height?: number;
  styles?: CSSProperties;
  border?: string;
  borderRadius?: string;
}

const Image: React.FC<imageProps> = (props: imageProps) => {
  return <NextImage {...props} />;
};
export default Image;
