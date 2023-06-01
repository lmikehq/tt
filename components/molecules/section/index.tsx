interface sectionProps {
  children: React.ReactNode;
  width?: string;
  margin?: string;
  height?: string;
}

const Section: React.FC<sectionProps> = ({
  children,
  width,
  margin,
  height,
}) => {
  return (
    <section
      style={{
        width: width ? width : "100%",
        margin: margin || "0",
        height: height || "100%",
      }}
    >
      {children}
    </section>
  );
};

export default Section;
