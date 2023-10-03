import React from "react";
import NextLink from "next/link";
interface linkProps {
  href: string;
  target?: string;
  children?: React.ReactNode;
  text?: string;
  className?: string;
  color?: string;
  textDecoration?: string;
  decoration?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const Link: React.FC<linkProps & { onClick?: () => void }> = (props) => {
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
