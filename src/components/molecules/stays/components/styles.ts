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

export const GridLayout = styled.div<{ isMobile?: boolean }>`
  display: grid;
  grid-template-columns: ${({ isMobile }) => isMobile ? '1fr' : '1fr 2fr'};
  gap: 10px;
  position: relative;
  padding: 0;
  width: 100%;
`;

export const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  &.price_alert {
    justify-content: center;
    gap: 60px;
    margin-top: 25px;
  }
  &.booking_improve_box {
    justify-content: space-between;
    align-items: center;
    border: 1px solid var(--color-border);
    padding: 30px 20px;
    margin-bottom: 20px;
    border-radius: 8px;
    @media screen and (max-width: 900px) {
      flex-direction: column;
      align-items: flex-start;
      .mui_select {
        width: 100%;
      }
    }
  }
  &.stay_blog_admin {
    align-items: center;
    margin: 5px 0px;
  }
  @media screen and (max-width: 990px) {
    &.sty_wrap {
      flex-wrap: wrap;
    }
  }
  @media screen and (max-width: 900px) {
    &.stay_wrap {
      flex-wrap: nowrap;
    }
  }
  @media screen and (max-width: 545px) {
    flex-wrap: wrap;
    gap: 20px;
    &.stay_blog_admin {
      flex-wrap: nowrap;
    }
    &.filter_btn {
      flex-wrap: nowrap;
      width: 100%;
      gap: auto;
      justify-content: space-between !important;
    }
    &.row_two_wrap {
      flex-wrap: nowrap;
    }
  }
  @media screen and (max-width: 400px) {
    &.stay_wrap {
      flex-wrap: wrap;
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
  width: 100%;
  max-width: 95vw;
  overflow: hidden;
  border-radius: 12px;
  position: relative;
  z-index: 1;
  &.stay_page_slider {
    max-height: 600px;
  }
`;

export const LargeImg = styled.div`
  width: 100%;
  height: 100%;
  // border-top-left-radius: 12.5px;
  // border-bottom-left-radius: 12.5px;
  overflow: hidden;
  position: relative;
  padding: -10px 0px;

  &.img_large_gallery {
    width: 100%;
    height: 60vh;
    position: relative;
    overflow: hidden !important;
    border-radius: 12.5px !important;
    margin-bottom: 20px;
  }
  z-index: 1;
  @media screen and (max-width: 1300px) {
    &.img_large_gallery {
      max-height: 400px;
      border-radius: 12.5px !important;
      overflow: hidden !important;
    }
    &.img_img {
      max-height: 380px;
    }
    .img {
      border-radius: 12.5px !important;
    }
  }
  @media screen and (max-width: 900px) {
    border-radius: 12.5px;
    .img {
      height: 100%;
    }
  }
`;
export const ImgWidth = styled.div`
  width: 80%;
`;

export const SmallImg = styled.div`
  position: relative;
  bottom: 70px;
  z-index: 10;
  margin: 5px 8px;
  margin-bottom: 5px;
  height: 100px;

  &.img_small_gallery {
    // height: 250px;
    bottom: 0px;
  }
  @media screen and (max-width: 1300px) {
    &.img_img_small {
      margin-top: -110px;
      bottom: 0px;
    }
    &.img_small_gallery {
      //  height: 200px;
    }
  }
    & .slick-slider {
        height: 100px !important;
    }
`;
export const SmallSlideImg = styled.div`
  width: 40px;
  height: 40px;

  overflow: hidden;
  border: 2px solid rgba(135, 206, 235, 0);
  transition: background-color 0.3s, border-color 0.3s;
  &.selected_room_gallery {
    width: 50px;
    height: 100px;
    // height: 100%;
    // margin: 0px -10px;
  }
  @media screen and (max-width: 1300px) {
    height: 100px;
    &.selected_room_gallery {
    }
  }
  &:hover {
    border: 2px solid rgba(135, 206, 235, 0.5);
  }
`;
export const SelectedImage = styled.span`
  border: 2px solid rgba(135, 206, 235, 0);
`;

export const SmallSpan = styled.div`
  &.scroll_filter_container {
    overflow-x: scroll;
  }
  &.scroll_filter_container::-webkit-scrollbar {
    display: none;
  }
`;

export const TextBox = styled.div`
  padding: 1rem;
  width: 100%;
  max-width: 95vw;
`;

export const RowOne = styled.div``;
export const FavoriteBox = styled.div`
    position: absolute;
    top: 15px;
    right: 15px;
    z-index: 10;
    background-color: white;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 1);
`;

export const FavoriteBoxMobile = styled.div`
  position: absolute;
    top: 15px;
    right: 15px;
    z-index: 10;
    background-color: white;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 1);
`;
export const ControlBtn = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 0px 10px;
  transform: translateY(-55%);
  color: var(--default-color);
  @media screen and (max-width: 1300px) {
    &.room_img {
      // transform: translateY(-55%);
    }
  }
  @media screen and (max-width: 800px) {
    &.control_gallery {
      transform: translateY(-60%);
    }
  }
  &.control_gallery {
    z-index: 10;
  }
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
  &.filter_btn {
    background: transparent;
    color: var(--secondary-color);
    height: 43px;
    width: fit-content;
    border: 1px solid var(--color-border);
    border-radius: 25px;
  }
  &.active.filter_btn {
    color: var(--default-color);
    background-color: var(--secondary-color);
  }
`;
export const BtnText = styled.div`
  white-space: nowrap;
  font-size: 18px;
  @media screen and (max-width: 545px) {
    font-size: 16px;
  }
`;

export const Span = styled.div`
  &.not_list {
    list-style: none;
    border-bottom: 1px solid var(--color-border);
    &:last-of-type {
      border: none;
    }
  }
  &.user_popover {
    .user_drop_list {
      padding: 12px 10px !important;
      border-radius: 5px;
      // padding-left: 20px;
      &:hover {
        background-color: var(--color-border);
        border-radius: 5px;
      }
    }

    user_drop_list {
      position: relative;
      // left: 20px;
      padding: 5px 10px !important;
      width: 100%;
    }
    user_drop_list:hover {
      padding: 5px 10px !important;
      background-color: var(--color-border) !important;
    }
  }
  .slider_skeleton_grid {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (max-width: 600px) {
    .slider_skeleton_grid {
      display: grid;
      grid-template-columns: 1fr !important;
    }
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
  ::-webkit-scrollbar {
    display: none;
  }
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
  &.stay_slider_content {
    position: relative;
    // height: 400px;
    margin: 0px -17px;
    margin-left: 0px !important;
    right: 7.5px;
  }
`;
export const SliderWidth = styled.div`
  &.stay_landing_cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    @media screen and (max-width: 900px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }
    @media screen and (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }
  &.stay_slider_height {
    // height: 400px;
    width: 100%;

    .text_styles {
      position: absolute;
      bottom: 20px;
      left: 20px;
    }
  }
`;

export const SlideList = styled.div`
  border-radius: 20px;
  margin: 10px;
  margin-bottom: 25px;
  position: relative;
`;
export const SlideCard = styled.div`
    padding: 1rem;
    cursor: pointer;
    &:hover {
        background-color: rgba(0,0,0,0.02);
        border-radius: .5rem;
    }
`;
export const SliderImgBox = styled.div`
  border-radius: 12px !important;
  overflow: hidden;
  &.stay_landing_trending {
    height: 260px;
    position: relative;
    .image-container {
      position: relative;
      border-radius: 12px;
      overflow: hidden;
    }
    .image-container::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.5)
      );
    }
  }
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
  &.stay_landing_favorite {
    position: absolute;
    top: 45px;
    right: 15px;
  }
`;
