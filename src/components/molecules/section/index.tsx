interface sectionProps {
  children: React.ReactNode;
  width?: string;
  margin?: string;
  height?: string;
  padding?: React.CSSProperties["padding"];
  styles?: React.CSSProperties;
  className?: string;
}

const Section: React.FC<sectionProps> = ({
  children,
  width,
  margin,
  height,
  padding,
  styles,
  className,
}) => {
  return (
    <section
      style={{
        width: width ? width : "100%",
        margin: margin || "0",
        padding: padding || "0",
        height: height || "unset",

        ...styles,
      }}
    >
      {children}
    </section>
  );
};

export default Section;
