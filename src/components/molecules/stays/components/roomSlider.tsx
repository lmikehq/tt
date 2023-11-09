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
  SliderImgBox,
  SmallImg,
  SmallSlideImg,
  FavoriteBox,
  FavoriteBoxMobile,
} from "./styles";
import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import { Rating } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import Link from "@/components/atoms/link";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";

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

// PRICE FORMAT
const formatPrice = (price: number) => `₦${price.toLocaleString()}`;

function RoomSlider(props: RoomSliderProps) {
  const { rooms } = props;

  const SliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    arrow: true,
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
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  return (
    <Box>
      {showSliderBox && (
        <SliderContainer>
          <SlideContent>
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
                    <FavoriteBoxMobile>
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
                        checked={checked}
                        onChange={handleCheckboxChange}
                        id="favorite-hotels-checkbox"
                      />
                    </FavoriteBoxMobile>
                    <Link href="">
                      <Text type="h2" text={room.name}></Text>
                    </Link>
                    <Flex gap="10px" margin="10px 0px">
                      <Text type="p" text={room.location}></Text>
                      <Rating
                        name="rating"
                        readOnly
                        defaultValue={room.rating}
                        style={{ color: "var()" }}
                      />
                    </Flex>
                    <Flex justify="space-between">
                      <Text
                        type="h2"
                        text={`${formatPrice(room.price)}`}
                        weight={"bold"}
                        color="var(--text-dull-color)"
                      ></Text>
                      <ReviewsText>
                        <Icon></Icon>
                        <Flex direction="column">
                          <Flex gap={"5px"}>
                            <CircleIcon
                              style={{
                                fontSize: "18px",
                                color: "var(--color-green)",
                              }}
                            />
                            <CircleIcon
                              style={{
                                fontSize: "18px",
                                color: "var(--color-green)",
                              }}
                            />
                            <CircleIcon
                              style={{
                                fontSize: "18px",
                                color: "var(--color-green)",
                              }}
                            />
                            <CircleIcon
                              style={{
                                fontSize: "18px",
                                color: "var(--color-green)",
                              }}
                            />
                            <CircleIcon
                              style={{
                                fontSize: "18px",
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
          </SlideContent>
        </SliderContainer>
      )}
    </Box>
  );
}

export default RoomSlider;
