interface sectionProps {
  children: React.ReactNode;
  width?: string;
  margin?: string;
  height?: string;
  styles?: React.CSSProperties;
}

const Section: React.FC<sectionProps> = ({
  children,
  width,
  margin,
  height,
  styles
}) => {
  return (
    <section
      style={{
        width: width ? width : "100%",
        margin: margin || "0",
        height: height || "100%",
        ...styles
      }}
    >
      {children}
    </section>
  );
};

export default Section;
