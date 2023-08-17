interface divProps {
  children: React.ReactNode;
  width?: string;
  margin?: string;
  height?: string;
  padding?: React.CSSProperties["padding"];
  styles?: React.CSSProperties;
  className?: string;
}

const Div: React.FC<divProps> = ({
  children,
  width,
  margin,
  height,
  padding,
  styles,
  className,
}) => {
  return (
    <div
      style={{
        width: width ? width : "100%",
        margin: margin || "0",
        padding: padding || "0",
        height: height || "100%",
        ...styles,
      }}
    >
      {children}
    </div>
  );
};

export default Div;
