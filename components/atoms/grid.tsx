"use client";
import styled from "styled-components";

interface gridProps {
  children: React.ReactNode;
  columns: string;
  gap?: string;
}

const GridWrapper = styled.div<{ columns: string; gap: string }>`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  grid-gap: ${(props) => props.gap};
  width: 100%;
`;

export const Grid: React.FC<gridProps> = ({ children, columns, gap }) => {
  return (
    <GridWrapper columns={columns} gap={gap || "5rem"}>
      {children}
    </GridWrapper>
  );
};
