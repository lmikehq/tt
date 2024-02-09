interface sectionProps {
    children: React.ReactNode
    width?: string
    maxWidth?: string
    maxHeight?: string

    margin?: string
    height?: string
    padding?: React.CSSProperties["padding"]
    styles?: React.CSSProperties
    className?: string
    background?: string
    borderRadius?: string
    border?: string
    borderTop?: string
    borderBottom?: string
    borderRight?: string
    borderLeft?: string;
    onClick?: () => void;
}

const Section: React.FC<sectionProps> = ({
  children,
  width,
  maxWidth,
  maxHeight,
  margin,
  height,
  padding,
  styles,
  background,
  borderRadius,
  className,
  border,
  borderBottom,
  borderLeft,
  borderRight,
    borderTop,
  onClick,
}) => {
  return (
    <section
        className={className}
        onClick={onClick}
      style={{
        width: width ? width : "100%",
        maxWidth: maxWidth,
        maxHeight,
        margin: margin || "0",
        padding: padding || "0",
        height: height || "unset",
        background: background || "unset",
        borderRadius: borderRadius || "unset",
        border: border,
        ...styles,
      }}
    >
      {children}
    </section>
  )
}

export default Section
