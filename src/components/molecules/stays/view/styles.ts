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
  &.hotel_details_container {
    padding: 0px;
    overflow: hidden;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Header = styled.div`
  margin-bottom: 20px;

  @media screen and (max-width: 470px) {
    .review_header {
      flex-direction: column !important;
      gap: 8px;
      align-items: flex-start !important;
      .flex_start {
        justify-content: flex-start !important;
        .select {
          width: auto !important;
        }
      }
    }
  }
`;

export const Tab = styled.div`
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
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

  @media screen and (max-width: 395px) {
    .compare_recently {
      flex-direction: column;
    }
  }
`;

export const GridLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  &.choose_room_list {
    grid-template-columns: 40% auto;
    grid-column-gap: 20px;

    @media screen and (max-width: 900px) {
      grid-template-columns: 100%;
    }
  }
  &.amenities_grid {
    width: 100% !important;
    grid-template-columns: repeat(3, 1fr);
    justify-content: space-between !important;
    grid-column-gap: 10%;
    @media screen and (max-width: 1095px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (max-width: 900px) {
      grid-template-columns: 1fr;
      .mobile_box {
        border: 1px solid var(--color-border);
        padding: 12px;
      }
    }
  }
  &.description_grid {
    grid-template-columns: 65% 30%;
    justify-items: space-between !important;
    grid-column-gap: 40px;
    @media screen and (max-width: 900px) {
      grid-template-columns: 100%;
      gap: 20px;
    }
  }
  &.location_grid {
    grid-column-gap: 0px !important;
    @media screen and (max-width: 900px) {
      grid-template-columns: 1fr;
      .mobile_box {
        border: 1px solid var(--color-border);
        padding: 12px;
      }
    }
  }
  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
    &.stay_details_grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media screen and (max-width: 443px) {
    &.stay_details_grid {
      grid-template-columns: 1fr;
    }
  }
`;

export const ImageBox = styled.div`
  max-width: 110px;
  max-height: 110px;
  border-radius: 6px;
  overflow: hidden;
  @media screen and (max-width: 395px) {
    width: 100%;
  }
`;

export const ChooseRoomImg = styled.span`
  max-height: 250px;
  border-radius: 12px;
  overflow: hidden;
  grid-column-gap: 20px;
  @media screen and (max-width: 900px) {
    max-width: 70%;
  }
  @media screen and (max-width: 480px) {
    max-width: 100%;
    width: 100%;
  }
`;

export const GridBox = styled.div`
  display: grid;
  grid-template-columns: 30% auto;
  align-items: center;
  gap: 20px;

  @media screen and (max-width: 1254px) {
    .rating_flex_wrap {
      flex-direction: column;
      align-items: flex-start !important;
    }
  }
  @media screen and (max-width: 900px) {
    grid-template-columns: 100%;
    .rating_flex_wrap {
      flex-direction: row;
      align-items: center !important;
    }
  }
`;

export const ProgressBars = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
  .LineProgressBar {
    width: 100%;
  }
  @media screen and (max-width: 420px) {
    grid-template-columns: 1fr;
  }
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
  @media screen and (max-width: 510px) {
    .date_wrap {
      flex-wrap: wrap;
      gap: 10px !important;
      li:nth-child(2) {
        list-style: none;
      }
    }
    .radio_wrap {
      gap: 0px !important;
    }
  }
`;

export const Span = styled.div`
  position: relative;
  .badge {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    color: var(--default-color);
    background-color: var(--secondary-color);
  }
  &.border::before {
    content: "";
    display: block;
    height: 60px;
    border-left: 1px solid #000; 
    margin-right: 10px;
  }
  .mui_select {
    // overflow: hidden;
    outline-color: var(--primary-color) !important;
  }
  @media screen and (max-width: 1120px) {
    .recently {
      flex-direction: column;
    }
  }
  @media screen and (max-width: 900px) {
    .recently {
      flex-direction: row;
    }
  }
  @media screen and (max-width: 480px) {
    .choose_img_text {
      flex-direction: column !important;
      width: 100%;
    }
  }
  @media screen and (max-width: 395px) {
    .recently {
      flex-direction: column;
    }
    .compare_recently {
      width: 100%;
    }
  }
`;

export const MapBoxTag = styled.div`
  width: 100%;
  height: 350px;
  background-color: var(--color-light-gray);
  border-radius: 20px;
  margin-bottom: 35px;
  @media screen and (max-width: 900px) {
    height: 100%;
  }
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
  &.filter_button {
    justify-content: space-between;
    background-color: transparent;
    color: var(--secondary-color);
    border: 1px solid var(--secondary-color);
  }
  &.btn_disable {
    background-color: var(--color-light-gray) !important;
    color: var(--text-gray-color) !important;
    cursor: not-allowed;
  }
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
  &.reset_filters {
    border: 2px solid var(--color-red-border);
    background-color: var(--color-red-bg);
    color: var(--color-favorite);
    cursor: pointer;
  }
  &.chosen_filter {
    background: transparent;
    width: 100%;
    padding: 10px 10px;
    color: var(--secondary-color);
  }
`;
