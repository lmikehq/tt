import { Box } from "@mui/material";
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
} from "./styles";
import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import { Rating } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import Link from "@/components/atoms/link";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

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

  //===========
  //REACT SLICK
  //===========
  const [slidesToShow, setSlidesToShow] = useState(1);
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1200) {
        setSlidesToShow(Math.min(4, rooms.length));
      } else if (screenWidth >= 992) {
        setSlidesToShow(Math.min(3, rooms.length));
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
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: false,
    arrow: true,
  };

  const [showSliderBox, setShowSliderBox] = useState(false);
  // Load the Slider when the component mounts
  useEffect(() => {
    setShowSliderBox(true);
  }, [props]);

  const handleCloseSliderBox = () => {
    setShowSliderBox(false);
  };

  return (
    <Box>
      {showSliderBox && (
        <SliderContainer>
          <SlideContent>
            <Flex justify="space-between">
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
            {/* <Slider {...SliderSettings} className="">
              {rooms.map((room, index) => (
                <SlideList key={index}>
                  <SliderImgBox>
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      src={room.image}
                      alt={room.name}
                    />
                  </SliderImgBox>
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
                        <Text type="p" text={`${room.reviews} reviews`}></Text>
                      </Flex>
                    </ReviewsText>
                  </Flex>
                </SlideList>
              ))}
            </Slider> */}
          </SlideContent>
        </SliderContainer>
      )}
    </Box>
  );
}

export default RoomSlider;
