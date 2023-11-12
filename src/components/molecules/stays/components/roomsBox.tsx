import React, { useState } from "react";
import { Box } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Flex from "@/components/templates/flex";
import Text from "@/components/atoms/text";
import Link from "@/components/atoms/link";
import { Grid } from "@/components/templates/grid";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import CircleIcon from "@mui/icons-material/Circle";
import { Rating } from "@mui/material";
import WifiIcon from "@mui/icons-material/Wifi";
import LocalParkingOutlinedIcon from "@mui/icons-material/LocalParkingOutlined";
import ChildFriendlyOutlinedIcon from "@mui/icons-material/ChildFriendlyOutlined";
import FitnessCenterOutlinedIcon from "@mui/icons-material/FitnessCenterOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import AccessibleForwardOutlinedIcon from "@mui/icons-material/AccessibleForwardOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import Button from "@/components/atoms/button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  ItemList,
  GridLayout,
  FlexBox,
  FlexText,
  ImgBox,
  LargeImg,
  SmallImg,
  SmallSlideImg,
  MobileImageBox,
  FavoriteBox,
  FavoriteBoxMobile,
  ControlBtn,
  TextBox,
  RowOne,
  TextLocation,
  ReviewsText,
  Icon,
  RowTwo,
  RowThree,
  RowFour,
  RowFive,
  ButtonBtn,
  BtnText,
} from "./styles";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

//MOBILE SETTINGS
const SliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: false,
};
//MOBILE SETTINGS
const MobileSliderSettings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
};

// PRICE FORMAT
const formatPrice = (price: number) => `₦ ${price.toLocaleString()}`;

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
interface RoomBoxProps {
  room: Room;
  index: number;
}
function RoomBox({ room, index }: RoomBoxProps) {
  const { isMobile } = useScreenResolution();

  //===============
  //Image Selection
  //===============
  const [selectedImage, setSelectedImage] = useState(room.image);
  const handleImageChange = (newImage: string) => {
    setSelectedImage(newImage);
  };

  const getPreviousImage = (currentImage: string) => {
    const images = room.images;
    const currentIndex = images.indexOf(currentImage);
    if (currentIndex > 0) {
      return images[currentIndex - 1];
    } else {
      return images[images.length - 1];
    }
  };

  const getNextImage = (currentImage: string) => {
    const images = room.images;
    const currentIndex = images.indexOf(currentImage);
    if (currentIndex < images.length - 1) {
      return images[currentIndex + 1];
    } else {
      return images[0];
    }
  };

  //========
  //FAVORITE
  //========
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };
  return (
    <Box style={{ marginBottom: "20px" }}>
      <ItemList>
        <GridLayout>
          {!isMobile ? (
            <ImgBox>
              <LargeImg>
                <img
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  src={selectedImage || room.image}
                  alt={room.name}
                />
                <FavoriteBox>
                  <Checkbox
                    {...label}
                    icon={<FavoriteBorder />}
                    checkedIcon={
                      <Favorite style={{ color: "var(--color-favorite)" }} />
                    }
                    disableRipple
                    disableTouchRipple
                    disableFocusRipple
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 28, padding: 0 } }}
                    checked={checked}
                    onChange={handleCheckboxChange}
                    id="favorite-hotels-checkbox"
                  />
                </FavoriteBox>
                <ControlBtn>
                  <Flex justify="space-between">
                    <ArrowBackIosIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        const previousImage = getPreviousImage(selectedImage);
                        handleImageChange(previousImage);
                      }}
                    />
                    <ArrowForwardIosIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        const nextImage = getNextImage(selectedImage);
                        handleImageChange(nextImage);
                      }}
                    />
                  </Flex>
                </ControlBtn>
              </LargeImg>
              <SmallImg className="img_small">
                <Slider {...SliderSettings} className="">
                  {[room.image, ...room.images].map((x) => (
                    <SmallSlideImg
                      className={`${
                        x === selectedImage ? "selected_room_img" : ""
                      }`}
                      key={x}
                    >
                      <span onClick={() => setSelectedImage(x)}>
                        <img
                          src={x}
                          alt=""
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            cursor: "pointer",
                          }}
                        />
                      </span>
                    </SmallSlideImg>
                  ))}
                </Slider>
              </SmallImg>
            </ImgBox>
          ) : (
            <MobileImageBox>
              <Slider {...MobileSliderSettings} className="slick-slider">
                {[room.image, ...room.images].map((x) => (
                  <span
                    key={index}
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "relative",
                    }}
                  >
                    <Link href="">
                      <img
                        src={x}
                        alt=""
                        className="slick_slider_room_img_img"
                        style={{
                          width: "100%",
                          borderRadius: "12.5px",
                        }}
                      />
                    </Link>
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
                          "& .MuiSvgIcon-root": {
                            fontSize: 28,
                            padding: 0,
                          },
                        }}
                        checked={checked}
                        onChange={handleCheckboxChange}
                        id="favorite-hotels-checkbox"
                      />
                    </FavoriteBoxMobile>
                  </span>
                ))}
              </Slider>
            </MobileImageBox>
          )}
          <TextBox>
            <Flex direction="column">
              <RowOne>
                <FlexBox>
                  <TextLocation>
                    <Link href="">
                      <Text
                        styles={{ color: "var(--primary-color)" }}
                        type="h2"
                        text={room.name}
                        weight={"500"}
                      ></Text>
                    </Link>

                    <ul
                      style={{
                        color: "var(--primary-color) !important",
                        listStyle: "disc",
                        flexWrap: "wrap",
                      }}
                    >
                      <FlexBox style={{ gap: "30px" }}>
                        <li style={{ listStyle: "none" }}>
                          <Text type="p" text={room.location}></Text>
                        </li>
                        <li>
                          <Link href="">
                            <Text type="p" text="Show in map"></Text>
                          </Link>
                        </li>
                      </FlexBox>
                    </ul>
                  </TextLocation>
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
                </FlexBox>
              </RowOne>
              <RowTwo>
                <Flex gap={"10px"} styles={{ flexWrap: "wrap" }}>
                  <Rating
                    style={{ marginLeft: "-4px" }}
                    name="rating"
                    readOnly
                    defaultValue={room.rating}
                  />
                  <Text
                    styles={{ whiteSpace: "nowrap" }}
                    type="p"
                    text="3.3 km from the New York center"
                  ></Text>
                </Flex>
              </RowTwo>
              <RowThree>
                <FlexBox className="row_two_wrap">
                  <Flex direction="column">
                    <Text
                      type="h3"
                      weight={"bold"}
                      text="Classic Double room"
                      styles={{ whiteSpace: "nowrap" }}
                    ></Text>
                    <Text type="p" text="full double bed"></Text>
                  </Flex>
                  <span>
                    <Grid
                      columns={"0px"}
                      style={{
                        gridTemplateColumns: "1fr 1fr 1fr",
                        gap: "20px",
                      }}
                    >
                      <WifiIcon />
                      <LocalParkingOutlinedIcon />
                      <ChildFriendlyOutlinedIcon />
                      <FitnessCenterOutlinedIcon />
                      <RestaurantOutlinedIcon />
                      <AccessibleForwardOutlinedIcon />
                    </Grid>
                  </span>
                </FlexBox>
              </RowThree>
              <RowFour>
                <FlexBox>
                  <FlexText>
                    <CurrencyExchangeOutlinedIcon
                      style={{ marginRight: "8px" }}
                    />
                    <Text type="p" text="Free Cancellation"></Text>
                  </FlexText>
                  <FlexText>
                    <CreditCardOutlinedIcon style={{ marginRight: "8px" }} />
                    <Text type="p" text="Pay Online"></Text>
                  </FlexText>
                  <FlexText>
                    <RestaurantOutlinedIcon style={{ marginRight: "8px" }} />
                    <Text type="p" text="Meal"></Text>
                  </FlexText>
                </FlexBox>
              </RowFour>
              <RowFive>
                <FlexBox>
                  <Flex direction="column">
                    <Text
                      type="h2"
                      text={`${formatPrice(room.price)}`}
                      weight={"bold"}
                      color="var(--text-dull-color)"
                    ></Text>
                    <Text
                      type="p"
                      text={`for a night (${2} guest)`}
                      styles={{ whiteSpace: "nowrap" }}
                    ></Text>
                  </Flex>
                  <ButtonBtn>
                    <BtnText>Check Availability</BtnText>
                  </ButtonBtn>
                </FlexBox>
              </RowFive>
            </Flex>
          </TextBox>
        </GridLayout>
      </ItemList>
    </Box>
  );
}

export default RoomBox;
