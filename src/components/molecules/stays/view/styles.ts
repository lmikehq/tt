import styled from "styled-components";

//========
// STYLES
//========
export const Container = styled.div`
  box-shadow: var(--box-shadow);
  border: 1px solid var(--color-border);
  padding: 25px;
  border-radius: 12.5px;
  background-color: var(--default-color);
  margin: 25px 0px;
`;

export const Header = styled.div`
  margin-bottom: 20px;
`;

export const List = styled.div`
  border: 1px solid var(--color-border);
  padding: 10px;
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
  width: 110px;
  height: 110px;
  border-radius: 6px;
  overflow: hidden;
`;

export const GridBox = styled.div`
  display: grid;
  grid-template-columns: 30% auto;
  // display: flex;
  align-items: center;
  gap: 20px;
  .LineProgressBar {
    width: 100%;
  }
`;

export const ProgressBars = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
`;

export const ReviewsText = styled.div`
  display: flex;
  align: center;
  gap: 8px;
`;

export const ReviewList = styled.div`
  margin: 10px 0px;
  margin-top: 80px;
`;
export const ReviewHeader = styled.div`
  padding: 15px 10px;
`;
export const Content = styled.div`
  padding: 15px;
`;

export const Span = styled.div`
  position: relative;
`;
