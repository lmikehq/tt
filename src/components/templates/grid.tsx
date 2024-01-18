"use client"
import styled from "styled-components"

interface gridProps {
  children: React.ReactNode
  columns: string | number
  gap?: string
  position?: string
  justify?: string
  margin?: string
  width?: string
  align?: string
  textAlign?: string
  padding?: string
  style?: React.CSSProperties
  className?: string
}

const GridWrapper = styled.div<{
  columns: string | number
  gap: string
  position: string
  justify?: string
  margin?: string
  width?: string
  align?: string
  textAlign?: string
  padding?: string
  className?: string
}>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  grid-gap: ${(props) => props.gap};
  position: ${(props) => props.position};
  width: ${({ width }) => width || "100%"};
  margin: ${({ margin }) => margin || "0 auto"};
  align-items: ${({ align }) => (align ? align : "unset")};
  justify-content: ${({ justify }) => (justify ? justify : "center")};
  text-align: ${({ textAlign }) => (textAlign ? textAlign : "unset")};
  padding: ${({ padding }) => (padding ? padding : "unset")};
  classname: ${({ className }) => (className ? className : "unset")};
`

export const Grid: React.FC<gridProps> = ({
  children,
  columns,
  gap,
  position,
  justify,
  margin,
  align,
  textAlign,
  padding,
  width,
  className,
  style,
}) => {
  return (
    <GridWrapper
      columns={columns}
      gap={gap || "5rem"}
      position={position || "relative"}
      justify={justify}
      margin={margin}
      align={align}
      textAlign={textAlign}
      padding={padding}
      width={width}
      className={className}
      style={style}
    >
      {children}
    </GridWrapper>
  )
}
