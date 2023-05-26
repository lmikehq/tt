"use client";
import styled from "styled-components";

interface gridProps {
  children: React.ReactNode;
  columns: string;
  gap?: string;
  position?: string;
}

const GridWrapper = styled.div<{ columns: string; gap: string; position: string }>`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  grid-gap: ${(props) => props.gap};
  position: ${(props) => props.position};
  width: 100%;
`;

export const Grid: React.FC<gridProps> = ({ children, columns, gap, position }) => {
  return (
    <GridWrapper columns={columns} gap={gap || "5rem"} position={position || "relative"} >
      {children}
    </GridWrapper>
  );
};
