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
  Span,
} from "./styles";
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
import { styled } from "@mui/material/styles";
import {
  formatPriceWithoutCurrency,
  getCurrency,
} from "@/lib/extensions/helpers/formatPrice";
import StaySkeletonLoader from "@/components/organisms/SkeletonLoader/StaySkelecton";
import { FavoriteBoxSkeleton } from "./availableRooms";
import { Grid } from "@/components/templates/grid";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { HotelBySearchInterface } from "@/lib/types/response-models/stay/search.type";
import Image from "@/components/atoms/image";

// FavoriteBoxSkeleton Component
export const ArrowBoxSkeleton: React.FC = () => (
  <Flex
    justify="flex-end"
    position="relative"
    styles={{ top: "20px", right: "20px" }}
    height="100%"
    width="100%"
    gap="20px"
  >
    <Span
      style={{
        position: "relative",
        left: "15px",
        backgroundColor: "var(--color-border)",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
      }}
    >
      <Flex justify="center" align="center" width="100%" height="100%">
        <ArrowBackIosIcon
          style={{
            // color: "var(--default-color)",
            fontSize: "20px",
            position: "relative",
            left: "5px",
          }}
        />
      </Flex>
    </Span>

    <Span
      style={{
        position: "relative",
        left: "15px",
        backgroundColor: "#a5a4a4",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
      }}
    >
      <Flex justify="center" align="center" width="100%" height="100%">
        <ArrowForwardIosIcon
          style={{
            color: "var(--default-color)",
            fontSize: "20px",
            position: "relative",
            left: "2px",
          }}
        />
      </Flex>
    </Span>
  </Flex>
);

export function HotelSliderBoxSkeleton() {
  const { isMobile } = useScreenResolution();
  const [screenWidth, setScreenWidth] = useState<number | undefined>(undefined);
  const thresholdWidth = 600;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setScreenWidth(window.innerWidth);
      };

      setScreenWidth(window.innerWidth);

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const arr = Array(screenWidth && screenWidth < thresholdWidth ? 1 : 2).fill(
    0
  );
  return (
    <React.Fragment>
      <Span>
        <Grid columns={2} className="slider_skeleton_grid">
          {arr.map((e, index) => (
            <Flex
              width="100%"
              direction="column"
              background={ttColors.light}
              borderRadius="10px"
              key={index}
              gap="20px"
              styles={{ marginBottom: "20px" }}
              overflow="hidden"
            >
              {/* Left Side with Image and Favorite Icon */}
              <Flex
                width="100%"
                className="top_side"
                position="relative"
                overflow="hidden"
              >
                <StaySkeletonLoader
                  tabs={1}
                  textWidth="50%"
                  rectangularHeight={230}
                  rectangularWidth="100%"
                  containerProps={{
                    sx: { borderRadius: "12px" },
                  }}
                />
                {/* Favorite Box */}
                <FavoriteBoxSkeleton />
              </Flex>
              <Flex>
                <Flex direction="column">
                  <StaySkeletonLoader
                    tabs={1}
                    rectangularHeight={40}
                    rectangularWidth="80%"
                  />
                  <StaySkeletonLoader
                    tabs={1}
                    text
                    textHeight={35}
                    textWidth="70%"
                  />
                </Flex>
              </Flex>
              <Flex
                margin="0"
                align="center"
                justify="space-between"
                gap="10%"
                width="100%"
                styles={{ marginTop: "-30px" }}
              >
                <Flex direction="column">
                  <StaySkeletonLoader
                    tabs={1}
                    rectangularHeight={40}
                    rectangularWidth="100%"
                  />
                </Flex>

                <StaySkeletonLoader
                  text
                  tabs={1}
                  textHeight={60}
                  textWidth="100%"
                />
              </Flex>
            </Flex>
          ))}
        </Grid>
        <Span>
          <ArrowBoxSkeleton />
        </Span>
      </Span>
    </React.Fragment>
  );
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

interface Hotel {
  name: string;
  address: string;
  distance: string;
  reviews: number;
  star_rating: number;
  price: number;
  images: string[];
}

interface RoomSliderProps {
  hotels: HotelBySearchInterface[];
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

function RoomSlider(props: RoomSliderProps) {
  const { hotels } = props;

  //===========
  //REACT SLICK
  //===========
  const [slidesToShow, setSlidesToShow] = useState(1);
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1200) {
        setSlidesToShow(Math.min(2, hotels.length));
      } else if (screenWidth >= 600) {
        setSlidesToShow(Math.min(2, hotels.length));
      } else {
        setSlidesToShow(Math.min(1, hotels.length));
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [hotels.length]);

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
    Array(hotels.length).fill(false)
  );

  const handleCheckboxChange = (index: number) => {
    const newCheckedRooms = [...checkedRooms];
    newCheckedRooms[index] = !newCheckedRooms[index];
    setCheckedRooms(newCheckedRooms);
  };

  return (
    <div>
      {showSliderBox && (
        <SliderContainer style={{ paddingBottom: "60px" }}>
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
            {/* SKELETON */}
            {/* <Span style={{ padding: "0px 10px" }}>
              <HotelSliderBoxSkeleton />
            </Span> */}
            <SliderWidth>
              <Slider {...SliderSettings} className="">
                {hotels.map((hotel, index) => (
                  <SlideCard key={index}>
                    <SlideList>
                      <SliderImgBox>
                        <Link href="/stay/view">
                          <img
                            style={{
                              width: "100%",
                              height: "200px",
                              objectFit: "cover",
                            }}
                            src={hotel.images[0]}
                            alt={hotel.name}
                          />
                        </Link>
                      </SliderImgBox>
                      <FavoriteSliderBox>
                        <Checkbox
                          {...label}
                          icon={<FavoriteBorder />}
                          checkedIcon={
                            <Favorite
                              style={{
                                color: "var(--color-favorite)",
                              }}
                            />
                          }
                          disableRipple
                          disableTouchRipple
                          disableFocusRipple
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: 28,
                              padding: 0,
                            },
                          }}
                          checked={checkedRooms[index]}
                          onChange={() => handleCheckboxChange(index)}
                          id="favorite-hotels-checkbox"
                        />
                      </FavoriteSliderBox>
                      <Link href="/stay/view" style={{ width: "fit-content" }}>
                        <Text
                          type="h2"
                          text={hotel.name}
                          weight={"bold"}
                          styles={{
                            fontSize: "22px",
                          }}
                        ></Text>
                      </Link>
                      <Flex
                        gap="10px"
                        margin="10px 0px"
                        align="center"
                        styles={{ fontSize: "15px" }}
                      >
                        <Text type="p" text={hotel.address}></Text>
                        <Rating
                          name="rating"
                          readOnly
                          precision={0.5}
                          defaultValue={hotel.star_rating}
                          style={{
                            color: "var(--color-rating)",
                            fontSize: "17px",
                          }}
                        />
                      </Flex>
                      <Flex justify="space-between">
                        <Flex
                          align="center"
                          gap="10px"
                          styles={{
                            flexWrap: "wrap",
                          }}
                        >
                          <Flex gap="5px" align="center">
                            <Text
                              color="var(--text-dull-color)"
                              type="h3"
                              weight={"bold"}
                              text={getCurrency()}
                            />
                            <Text
                              color="var(--text-dull-color)"
                              type="h3"
                              weight={"bold"}
                              text={formatPriceWithoutCurrency(12111)}
                            />
                          </Flex>
                          <Text
                            type="p"
                            text="Per night"
                            styles={{
                              fontSize: "14px",
                            }}
                          ></Text>
                        </Flex>
                        <ReviewsText>
                          <Flex gap="8px" align="center">
                            <Icon>
                              <Flex>
                                <Image
                                  alt="location"
                                  src={
                                    "/assets/icons/stay/view/view_camera_icon.svg"
                                  }
                                  width={24}
                                  height={24}
                                />
                              </Flex>
                            </Icon>
                            <Flex
                              direction="column"
                              styles={{
                                fontSize: "15px",
                              }}
                            >
                              <StyledRating
                                name="customized-color"
                                defaultValue={hotel.star_rating}
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
                              <Text type="p" text={`${890} reviews`}></Text>
                            </Flex>
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
