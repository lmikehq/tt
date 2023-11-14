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

export const Tab = styled.div`
  .anchor {
    color: var(--color-light-gray);
    text-decoration: none;
  }
  .active {
    border-bottom: 3px solid var(--primary-color);
    color: var(--primary-color);
  }
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
  &.choose_room_list {
    grid-template-columns: 40% auto;
    grid-column-gap: 20px;
    margin-bottom: 60px;
  }
  &.amenities_grid {
    width: 100% !important;
    grid-template-columns: repeat(3, 1fr);
    justify-content: space-between !important;
    grid-column-gap: 10%;
  }
  &.description_grid {
    grid-template-columns: 65% 30%;
    justify-items: space-between !important;
    grid-column-gap: 40px;
  }
  &.location_grid {
    grid-column-gap: 0px !important;
  }
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

export const ChooseRoomImg = styled.span`
  height: 250px;
  border-radius: 12px;
  overflow: hidden;
  grid-column-gap: 20px;
`;

export const GridBox = styled.div`
  display: grid;
  grid-template-columns: 30% auto;
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

export const MapBox = styled.div`
  width: 100%;
  height: 350px;
  background-color: var(--color-light-gray);
  border-radius: 20px;
  margin-bottom: 35px;
`;

export const ButtonBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--secondary-color);
  padding: 8px 20px;
  height: 48px;
  width: 100%;
  color: var(--default-color);
  border-radius: 6px;
  cursor: pointer;
`;
export const BtnText = styled.div`
  white-space: nowrap;
  font-size: 17px;
  @media screen and (max-width: 545px) {
    font-size: 16px;
  }
`;

export const BtnDetails = styled.div`
  border: 2px solid var(--color-border);
  border-radius: 6px;
  width: fit-content;
  padding: 7px 10px;
`;
