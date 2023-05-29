import React from "react";
import NextLink from "next/link";
interface linkProps {
  href: string;
  children?: React.ReactNode;
  text?: string;
  className?: string;
  color?: string;
  textDecoration?: string;
  decoration?: string;
  style?: React.CSSProperties;
}

export const Link: React.FC<linkProps> = (props) => {
  const styles = props.style || {};
  styles.textDecoration = props.decoration || "none";
  styles.color = props.color || "var(--secondary-color)";

  return (
    <NextLink {...props} style={styles}>
      {props.children ? props.children : props.text}
    </NextLink>
  );
};
export default Link;
