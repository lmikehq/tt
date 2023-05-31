"use client";
import styled from "styled-components";

interface gridProps {
  children: React.ReactNode;
  columns: string;
  gap?: string;
  position?: string;
  justify?: string;
  margin?: string;
  width?: string;
  align?: string;
}

const GridWrapper = styled.div<{
  columns: string;
  gap: string;
  position: string;
  justify?: string;
  margin?: string;
  width?: string;
  align?: string;
}>`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  grid-gap: ${(props) => props.gap};
  position: ${(props) => props.position};
  width: ${({ width }) => width || "100%"};
  margin: ${({ margin }) => margin || "0 auto"};
  align-items: ${({ align }) => (align ? align : "unset")};
  justify-content: ${({ justify }) => (justify ? justify : "center")};
`;

export const Grid: React.FC<gridProps> = ({
  children,
  columns,
  gap,
  position,
  justify,
  margin,
  align,
}) => {
  return (
    <GridWrapper
      columns={columns}
      gap={gap || "5rem"}
      position={position || "relative"}
      justify={justify}
      margin={margin}
      align={align}
    >
      {children}
    </GridWrapper>
  );
};
