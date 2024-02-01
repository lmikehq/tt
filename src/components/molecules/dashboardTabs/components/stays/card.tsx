'use client';

import { Box, Checkbox, Icon } from "@mui/material";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import { Rating } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";

import Link from "@/components/atoms/link";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { ttColors } from "@/lib/theme/colors";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import { styled } from "@mui/material/styles";
import { rooms } from "@/lib/extensions/data/mock";
import { FavoriteSliderBox, SlideCard, SlideContent, SlideList, SliderContainer, SliderImgBox, SliderWidth } from "@/components/molecules/stays/components/styles";
import { ReviewsText, Span } from "@/components/molecules/stays/view/styles";
import Section from "@/components/molecules/section";
import { Grid } from "@/components/templates/grid";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { SiTripadvisor } from "react-icons/si";

interface Room {
  name: string;
  location: string;
  distance: string;
  reviews: number;
  rating: number;
  price: number;
  image: string;
  images: string[];
}

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "var(--color-green)",
  },
  "& .MuiRating-iconHover": {
    color: "var(--color-green)",
  },
});

const label = { inputProps: { "aria-label": "Checkbox demo" } };

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

interface StaysProps {
  name: string;
  image: string;
  checkInDate: string;
  checkoutDate: string;
  payment: string;
}

function StaysCard() {
  const { isMobile } = useScreenResolution();
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
  useEffect(() => {
    setShowSliderBox(true);
  }, []);
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
      <Grid columns={''} style={{ gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr' }} >
        {rooms.map((room, index) => (
          <SlideCard key={index}>
            <SlideList>
              <SliderImgBox>
                <Link href="">
                  <img
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                    src={room.image}
                    alt={room.name}
                  />
                </Link>
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
              <Span style={{ width: "fit-content" }}>
                <Link href="">
                  <Text
                    type="h2"
                    text={room.name}
                    weight={"bold"}
                    styles={{ fontSize: "22px" }}
                  ></Text>
                </Link>
              </Span>

              <Flex
                gap="10px"
                margin="10px 0px"
                align="center"
                styles={{ fontSize: "15px", position: "relative" }}
              >
                <Text type="p" color={ttColors.foundation.gray} text={room.location}></Text>
                {/* <Rating
                  name="rating"
                  readOnly
                  defaultValue={room.rating}
                  style={{
                    color: "var(--color-rating)",
                    fontSize: "17px",
                  }}
                /> */}
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
                <Flex justify="flex-end">
                  <Text type="p" text="FEB 15 - 17" color={ttColors.foundation.gray} weight={600} />
                </Flex>
              </Flex>

              <Flex justify="space-between" align="center">
                <Text type="p" text="For 2 Guests" color={ttColors.foundation.gray} />
                <Text type="p" text="2 Nights" color={ttColors.foundation.gray} />
              </Flex>
            </SlideList>
          </SlideCard>
        ))}
      </Grid>
    </div>
  );
}

export default StaysCard;
/**
 *  <ReviewsText>
                    <SiTripadvisor size={22} />
                    <Flex
                      direction="column"
                      styles={{ fontSize: "15px" }}
                    >
                      <StyledRating
                        name="customized-color"
                        defaultValue={room.rating}
                        getLabelText={(value: number) =>
                          `${value} Heart${value !== 1 ? "s" : ""}`
                        }
                        readOnly
                        precision={0.5}
                        icon={<CircleIcon fontSize="inherit" />}
                        emptyIcon={
                          <CircleOutlinedIcon fontSize="inherit" />
                        }
                        style={{
                          fontSize: "15px",
                        }}
                      />
                      <Text
                        type="p"
                        text={`${room.reviews} reviews`}
                      ></Text>
                    </Flex>
                  </ReviewsText>
 */