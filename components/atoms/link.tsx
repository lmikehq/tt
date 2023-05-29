import React from "react";
import NextLink from "next/link";
interface linkProps {
  href: string;
  children?: React.ReactNode;
  text?: string;
  className?: string;
  color?: string;
  textDecoration?: string;
}

export const Link: React.FC<linkProps> = (props) => {
  return (
    <NextLink {...props} style={{ textDecoration: "none", color: props.color }}>
      {props.children ? props.children : props.text}
    </NextLink>
  );
};
export default Link;
