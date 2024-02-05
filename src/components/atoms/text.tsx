import React, { CSSProperties, MouseEventHandler, forwardRef } from "react"
interface TextProps {
  text: string
  type: string
  color?: string
  size?: CSSProperties["fontSize"]
  font?: CSSProperties["fontFamily"]
  weight?: CSSProperties["fontWeight"]
  className?: string
  styles?: CSSProperties
  margin?: CSSProperties["margin"]
  padding?: CSSProperties["padding"]
  hoverColor?: string
  opacity?: CSSProperties["opacity"]
  letterSpacing?: CSSProperties["letterSpacing"]
  transform?:
  | "none"
  | "full-width"
  | "capitalize"
  | "full-size-kana"
  | "lowercase"
  | "uppercase"
  whiteSpace?: CSSProperties["whiteSpace"]
  decoration?: CSSProperties["textDecoration"]
  cursor?: CSSProperties["cursor"]
  textAlign?: CSSProperties["textAlign"]
  width?: CSSProperties["width"]
  onClick?: MouseEventHandler<HTMLParagraphElement | HTMLHeadingElement | HTMLLabelElement>
  onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void
  onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void
}

export const Text = forwardRef(function Text({
  text,
  type,
  color,
  font,
  size,
  weight,
  whiteSpace,
  transform = "none",
  margin,
  padding,
  decoration,
  opacity,
  width,
  letterSpacing,
  cursor,
  className,
  textAlign,
  styles = {},
  onClick,
  onMouseEnter,
  onMouseLeave
}: TextProps, ref: any) {
  const updatedStyles: CSSProperties = {
    color,
    fontSize: size,
    fontWeight: weight || "normal",
    whiteSpace,
    fontFamily: font || "Poppins",
    textDecoration: decoration,
    textTransform: transform,
    overflow: 'clip',
    textOverflow: 'ellipsis',
    margin,
    padding,
    opacity,
    letterSpacing,
    cursor,
    width,
    textAlign,
    ...styles,
  }

  if (type === "p")
    return (
      <p style={updatedStyles} className={className} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} ref={ref}>
        {text}
      </p>
    )
  if (type === "span")
    return (
      <span style={updatedStyles} className={className} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} ref={ref}>
        {text}
      </span>
    )
  if (type === "label")
    return (
      <label style={updatedStyles} className={className} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} ref={ref}>
        {text}
      </label>
    )
  if (type === "h1")
    return (
      <h1 style={updatedStyles} className={className} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} ref={ref}>
        {text}
      </h1>
    )
  if (type === "h2")
    return (
      <h2 style={updatedStyles} className={className} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} ref={ref}>
        {text}
      </h2>
    )
  if (type === "h3")
    return (
      <h3 style={updatedStyles} className={className} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} ref={ref}>
        {text}
      </h3>
    )
  if (type === "h4")
    return (
      <h4 style={updatedStyles} className={className} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} ref={ref}>
        {text}
      </h4>
    )
  if (type === "h5")
    return (
      <h5 style={updatedStyles} className={className} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} ref={ref}>
        {text}
      </h5>
    )
  if (type === "h6")
    return (
      <h6 style={updatedStyles} className={className} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} ref={ref}>
        {text}
      </h6>
    )

  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {text}
    </div>
  )
})
export default Text
