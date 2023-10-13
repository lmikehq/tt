interface sectionProps {
  children: React.ReactNode;
  width?: string;
  margin?: string;
  height?: string;
  padding?: React.CSSProperties["padding"];
  styles?: React.CSSProperties;
  className?: string;
  background?: string;
  borderRadius?: string;
}

const Section: React.FC<sectionProps> = ({
  children,
  width,
  margin,
  height,
  padding,
  styles,
  background,
  borderRadius,
  className,
}) => {
  return (
    <section
      style={{
        width: width ? width : "100%",
        margin: margin || "0",
        padding: padding || "0",
        height: height || "unset",
        background: background || "unset",
        borderRadius: borderRadius || "unset",
        ...styles,
      }}
    >
      {children}
    </section>
  );
};

export default Section;
