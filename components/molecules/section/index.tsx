interface sectionProps {
  children: React.ReactNode;
  width?: string;
  margin?: string;
}

const Section: React.FC<sectionProps> = ({ children, width, margin }) => {
  return (
    <section style={{ width: width ? width : "100%", margin: margin || "0" }}>
      {children}
    </section>
  );
};

export default Section;
