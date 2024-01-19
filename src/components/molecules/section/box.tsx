interface IBoxProps {
  children: React.ReactNode
  width?: string
  minWidth?: string
  margin?: string
  padding?: string
  height?: string
  border?: string
  borderTop?: string
  borderBottom?: string
  borderRight?: string
  borderLeft?: string
  backgroundColor?: string
  styles?: React.CSSProperties
  className?: string
  onClick?: (e: any) => void
}

const Box: React.FC<IBoxProps> = ({
  children,
  width,
  minWidth,
  margin,
  padding,
  height,
  styles,
  backgroundColor,
  border,
  borderBottom,
  borderLeft,
  borderRight,
  borderTop,
  className,
  onClick
}) => {
  return (
    <section
      onClick={onClick}
      className={className}
      style={{
        width: width ? width : "100%",
        minWidth: minWidth ? minWidth : '',
        margin: margin || "0",
        height: height || "auto",
        padding: padding || "0",
        border: border,
        backgroundColor: backgroundColor,
        ...styles,
      }}
    >
      {children}
    </section>
  )
}

export default Box
