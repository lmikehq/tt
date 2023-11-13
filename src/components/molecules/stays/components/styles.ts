import styled from "styled-components";

//================
// ROOM BOX STYLES
//================
export const ItemList = styled.div`
  border-radius: 12.5px;
  background-color: var(--default-color);
  border: 2px solid rgba(135, 206, 235, 0);
  transition: background-color 0.3s, border-color 0.3s;
  &:hover {
    border: 2px solid rgba(135, 206, 235, 0.5);
  }
`;

export const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 38% auto;
  gap: 10px;
  position: relative;
  padding: 0;
  @media screen and (max-width: 1300px) {
    grid-template-columns: 100%;
  }
`;

export const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media screen and (max-width: 545px) {
    flex-wrap: wrap;
    gap: 20px;
    &.row_two_wrap {
      flex-wrap: nowrap;
    }
  }
  @media screen and (max-width: 370px) {
    &.row_two_wrap {
      flex-wrap: wrap;
    }
  }
`;
export const FlexText = styled.div`
  display: flex;
  white-space: nowrap;
  &:nth-child(2) {
    justify-content: flex-end;
  }
`;

export const ImgBox = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
`;

export const MobileImageBox = styled.div`
  max-height: 420px;
  overflow: hidden;
  width: 100%;
  border-radius: 12px;
  position: relative;
  z-index: 1;
`;

export const LargeImg = styled.div`
  width: 100%;
  height: 100%;
  // border-top-left-radius: 12.5px;
  // border-bottom-left-radius: 12.5px;
  overflow: hidden;
  position: relative;
  padding: -10px 0px;

  z-index: 1;
  @media screen and (max-width: 900px) {
    border-radius: 12.5px;
  }
`;

export const SmallImg = styled.div`
  height: 100px;
  position: relative;
  bottom: 70px;
  z-index: 10;
  margin: 5px 8px;
  margin-bottom: 5px;
`;
export const SmallSlideImg = styled.div`
  width: 60px;
  height: 60px;
  // padding: 2px;
  overflow: hidden;
  border: 2px solid rgba(135, 206, 235, 0);
  transition: background-color 0.3s, border-color 0.3s;

  &:hover {
    border: 2px solid rgba(135, 206, 235, 0.5);
  }
`;
export const SelectedImage = styled.span`
  border: 2px solid rgba(135, 206, 235, 0);
`;

export const SmallSpan = styled.div``;

export const TextBox = styled.div`
  padding: 10px;
  width: 100%;
`;

export const RowOne = styled.div``;
export const FavoriteBox = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 10;
  background-color: var(--default-color);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FavoriteBoxMobile = styled.div`
  position: relative;
  top: 15px;
  margin-top: -40px;
  top: -290px;
  right: 20px;
  float: right;
  z-index: 10;
  background-color: var(--default-color);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ControlBtn = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 0px 10px;
  transform: translateY(-55%);
  color: var(--default-color);
`;
export const TextLocation = styled.div``;
export const ReviewsText = styled.div``;
export const Icon = styled.div``;
export const RowTwo = styled.div`
  margin: 10px 0px;
`;

export const RowThree = styled.div`
  margin: 10px 0px;
`;

export const RowFour = styled.div`
  width: 100%;
  margin: 15px 0px;
`;

export const RowFive = styled.div`
  margin: 10px 0px;
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
  font-size: 18px;
  @media screen and (max-width: 545px) {
    font-size: 16px;
  }
`;

//================
// MID LIST FILTER
//================
export const FilterBox = styled.div`
  box-shadow: var(--box-shadow);
  border: 1px solid var(--color-border);
  padding: 20px;
  border-radius: 12.5px;
  width: 100%;
  margin-bottom: 20px;
  background-color: var(--default-color);
  overflow: hidden;
`;

export const FilterFlexBox = styled.div`
  @media screen and (max-width: 900px) {
    overflow-x: scroll;
  }
`;
export const FilterList = styled.span`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;

  // @media screen and (max-width: 900px) {
  //   flex-direction: row;
  // }
`;

//================
// MID SLIDER LIST
//================
export const SliderContainer = styled.div`
  position: relative;
  box-shadow: var(--box-shadow);
  border: 1px solid var(--color-border);
  padding: 20px;
  padding-bottom: 50px;
  border-radius: 12.5px;
  margin-bottom: 20px;
  width: 100%;
  background-color: var(--default-color);
  overflow: hidden;
  position: relative;
`;
export const SlideContent = styled.div`
  margin: 0px -5px;
  margin-left: -8px;
`;
export const SliderWidth = styled.div``;

export const SlideList = styled.div`
  border-radius: 20px;
  margin: 10px;
  margin-bottom: 25px;
`;
export const SlideCard = styled.div``;
export const SliderImgBox = styled.div`
  border-radius: 12px;
  overflow: hidden;
`;

export const FavoriteSliderBox = styled.div`
  position: relative;
  margin-top: -30px;
  top: -156px;
  right: 20px;
  float: right;
  background-color: var(--default-color);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
