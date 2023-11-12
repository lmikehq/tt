import styled from "styled-components";

//========
// COMPARE
//========
export const CompareContainer = styled.div`
  box-shadow: var(--box-shadow);
  border: 1px solid var(--color-border);
  padding: 20px;
  border-radius: 12.5px;
  background-color: var(--default-color);
  margin: 25px 0px;
`;

export const Header = styled.div`
  margin-bottom: 20px;
`;

export const List = styled.div`
  border: 1px solid var(--color-border);
  padding: 8px;
  border-radius: 6px;
`;

export const GridLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const ImageBox = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 6px;
  overflow: hidden;
`;
