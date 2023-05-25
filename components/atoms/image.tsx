import React from "react";
import NextImage from "next/image";

interface imageProps {
  props: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

export const Image: React.FC<imageProps> = ({ props }) => {
  return <NextImage {...props} />;
};
export default Image;
