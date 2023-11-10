import { Box, Checkbox } from "@mui/material";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  Icon,
  ReviewsText,
  SlideContent,
  SlideList,
  SlideCard,
  SliderContainer,
  SliderWidth,
  SliderImgBox,
  FavoriteSliderBox,
} from "./styles";
import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import { Rating } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import Link from "@/components/atoms/link";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { ttColors } from "@/lib/theme/colors";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

interface Room {
  name: string;
  location: string;
  distance: string;
  reviews: number;
  rating: number;
  price: number;
  image: string;
  images: string[]; // An array of image paths for the room
}

interface RoomSliderProps {
  rooms: Room[];
}

// REACT SLICK BUTTON
const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div className="control_btn l_flex" onClick={onClick}>
      <button className="prev l_flex">
        <KeyboardArrowLeftIcon className="icon" />
      </button>
    </div>
  );
};

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div className="control_btn" onClick={onClick}>
      <button className="next l_flex">
        <KeyboardArrowRightIcon className="icon" />
      </button>
    </div>
  );
};

// PRICE FORMAT
const formatPrice = (price: number) => `₦${price.toLocaleString()}`;

function RoomSlider(props: RoomSliderProps) {
  const { rooms } = props;

  //===========
  //REACT SLICK
  //===========
  const [slidesToShow, setSlidesToShow] = useState(1);
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1200) {
        setSlidesToShow(Math.min(2, rooms.length));
      } else if (screenWidth >= 600) {
        setSlidesToShow(Math.min(2, rooms.length));
      } else {
        setSlidesToShow(Math.min(1, rooms.length));
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [rooms.length]);

  const SliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  //=================
  //SLIDER BOX TOGGLE
  //=================
  const [showSliderBox, setShowSliderBox] = useState(false);
  // Load the Slider when the component mounts
  useEffect(() => {
    setShowSliderBox(true);
  }, [props]);

  const handleCloseSliderBox = () => {
    setShowSliderBox(false);
  };

  //========
  //FAVORITE
  //========
  const [checkedRooms, setCheckedRooms] = useState(
    Array(rooms.length).fill(false)
  );

  const handleCheckboxChange = (index: number) => {
    const newCheckedRooms = [...checkedRooms];
    newCheckedRooms[index] = !newCheckedRooms[index];
    setCheckedRooms(newCheckedRooms);
  };

  return (
    <div>
      {showSliderBox && (
        <SliderContainer>
          <Flex justify="space-between" styles={{ marginBottom: "10px" }}>
            <Text
              type="h3"
              text="Hotels with the most positive reviews"
              weight={"bold"}
            />
            <CloseOutlinedIcon
              style={{ cursor: "pointer" }}
              onClick={handleCloseSliderBox}
            />
          </Flex>
          <SlideContent>
            <SliderWidth>
              <Slider {...SliderSettings} className="">
                {rooms.map((room, index) => (
                  <SlideCard key={index}>
                    <SlideList>
                      <SliderImgBox>
                        <img
                          style={{
                            width: "100%",
                            height: "200px",
                            objectFit: "cover",
                          }}
                          src={room.image}
                          alt={room.name}
                        />
                      </SliderImgBox>
                      <FavoriteSliderBox>
                        <Checkbox
                          {...label}
                          icon={<FavoriteBorder />}
                          checkedIcon={
                            <Favorite
                              style={{ color: "var(--color-favorite)" }}
                            />
                          }
                          disableRipple
                          disableTouchRipple
                          disableFocusRipple
                          sx={{
                            "& .MuiSvgIcon-root": { fontSize: 28, padding: 0 },
                          }}
                          checked={checkedRooms[index]}
                          onChange={() => handleCheckboxChange(index)}
                          id="favorite-hotels-checkbox"
                        />
                      </FavoriteSliderBox>
                      <Link href="">
                        <Text
                          type="h2"
                          text={room.name}
                          weight={"bold"}
                          styles={{ fontSize: "22px" }}
                        ></Text>
                      </Link>
                      <Flex
                        gap="10px"
                        margin="10px 0px"
                        align="center"
                        styles={{ fontSize: "15px" }}
                      >
                        <Text type="p" text={room.location}></Text>
                        <Rating
                          name="rating"
                          readOnly
                          defaultValue={room.rating}
                          style={{
                            color: "var(--color-rating)",
                            fontSize: "16px",
                          }}
                        />
                      </Flex>
                      <Flex justify="space-between">
                        <Flex
                          align="center"
                          gap="10px"
                          styles={{ flexWrap: "wrap" }}
                        >
                          <Text
                            type="h3"
                            text={`${formatPrice(room.price)}`}
                            weight={"bold"}
                            color="var(--text-dull-color)"
                          ></Text>
                          <Text
                            type="p"
                            text="Per night"
                            styles={{ fontSize: "14px" }}
                          ></Text>
                        </Flex>
                        <ReviewsText>
                          <Icon></Icon>
                          <Flex
                            direction="column"
                            styles={{ fontSize: "15px" }}
                          >
                            <Flex gap={"5px"}>
                              <CircleIcon
                                style={{
                                  fontSize: "15px",
                                  color: "var(--color-green)",
                                }}
                              />
                              <CircleIcon
                                style={{
                                  fontSize: "15px",
                                  color: "var(--color-green)",
                                }}
                              />
                              <CircleIcon
                                style={{
                                  fontSize: "15px",
                                  color: "var(--color-green)",
                                }}
                              />
                              <CircleIcon
                                style={{
                                  fontSize: "15px",
                                  color: "var(--color-green)",
                                }}
                              />
                              <CircleIcon
                                style={{
                                  fontSize: "15px",
                                  color: "var(--color-green)",
                                }}
                              />
                            </Flex>
                            <Text
                              type="p"
                              text={`${room.reviews} reviews`}
                            ></Text>
                          </Flex>
                        </ReviewsText>
                      </Flex>
                    </SlideList>
                  </SlideCard>
                ))}
              </Slider>
            </SliderWidth>
          </SlideContent>
        </SliderContainer>
      )}
    </div>
  );
}

export default RoomSlider;
