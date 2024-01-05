import React from "react";
import {
  FavoriteSliderBox,
  Icon,
  ReviewsText,
  SlideCard,
  SlideContent,
  SlideList,
  SliderImgBox,
  SliderWidth,
} from "./components/styles";
import Link from "@/components/atoms/link";
import {
  formatPriceWithoutCurrency,
  getCurrency,
} from "@/lib/extensions/helpers/formatPrice";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { Rating } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import { Checkbox } from "@mui/material";
import { useState } from "react";
import Image from "@/components/atoms/image";
import { styled } from "styled-components";
import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";

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

const hotels: Hotel[] = [
  {
    name: "KAYAK Miami Beach",
    address: "Florida, USA",
    distance: "1 mile",
    reviews: 120,
    star_rating: 4.5,
    price: 150,
    images: [
      "/assets/images/stays/image1.jpg",
      "/assets/images/stays/image2.jpg",
    ],
  },
  {
    name: "Hotel Riu Plaza España",
    address: "Madrid, Spain",
    distance: "2 miles",
    reviews: 90,
    star_rating: 4.0,
    price: 120,
    images: [
      "/assets/images/stays/image2.jpg",
      "/assets/images/stays/image1.jpg",
    ],
  },
  {
    name: "Nyx Hotel",
    address: "Milan Italy",
    distance: "0.5 miles",
    reviews: 150,
    star_rating: 5.0,
    price: 200,
    images: [
      "/assets/images/stays/image3.png",
      "/assets/images/stays/image1.jpg",
    ],
  },
  {
    name: "Kempinski Hotel ",
    address: "Accra, Ghana",
    distance: "0.5 miles",
    reviews: 150,
    star_rating: 5.0,
    price: 200,
    images: [
      "/assets/images/stays/room1.jpeg",
      "/assets/images/stays/image1.jpg",
    ],
  },
  {
    name: "Bunk Hotel",
    address: "Amsterdam, Netherland",
    distance: "0.5 miles",
    reviews: 150,
    star_rating: 5.0,
    price: 200,
    images: [
      "/assets/images/stays/room2.jpeg",
      "/assets/images/stays/image1.jpg",
    ],
  },
  {
    name: "Transcorp Hilton",
    address: "Abuja, Nigeria",
    distance: "0.5 miles",
    reviews: 150,
    star_rating: 5.0,
    price: 200,
    images: [
      "/assets/images/stays/room4.jpg",
      "/assets/images/stays/image5.jpg",
    ],
  },
];
function PopularHotels() {
  const { isMobile } = useScreenResolution();

  const [checkedStates, setCheckedStates] = useState<boolean[]>(
    hotels.map(() => false)
  );

  const handleCheckboxChange = (index: number) => {
    setCheckedStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };
  return (
    <>
      <Flex
        direction="column"
        gap=".65rem"
        wrap={isMobile ? "unset" : "wrap"}
        styles={{ marginBottom: "20px" }}
      >
        <Text
          type="h1"
          text="Popular Stays Deals from Lagos"
          font="Montserrat"
          weight={700}
          size={isMobile ? 24 : 36}
        />
        <Text
          type="p"
          text="Here are the stays that are mainly booked from Lagos. You can check out the stays."
          size={isMobile ? 16 : 18}
          whiteSpace={isMobile ? "unset" : "nowrap"}
        />
      </Flex>
      <SlideContent>
        <SliderWidth className="stay_landing_cards">
          {hotels.map((hotel, index) => (
            <SlideCard key={index}>
              <SlideList>
                <SliderImgBox>
                  <Link href="">
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "12px",
                      }}
                      src={hotel.images[0]}
                      alt={hotel.name}
                    />
                  </Link>
                </SliderImgBox>
                <FavoriteSliderBox className="stay_landing_favorite">
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
                    checked={checkedStates[index]}
                    onChange={() => handleCheckboxChange(index)}
                    id={`favorite-hotels-checkbox-${index}`}
                  />
                </FavoriteSliderBox>
                <Link href="" style={{ width: "fit-content" }}>
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
                      fontSize: "18px",
                    }}
                  />
                </Flex>
                <Flex justify="space-between">
                  <Flex align="center" gap="0px">
                    <Flex gap="3px" align="center">
                      <Text
                        type="h3"
                        size={24}
                        weight={"bold"}
                        text={getCurrency()}
                      />
                      <Text
                        size={24}
                        type="h3"
                        weight={"bold"}
                        text={formatPriceWithoutCurrency(82111)}
                      />
                      <Text
                        type="p"
                        text="Per night"
                        styles={{
                          fontSize: "14px",
                        }}
                      ></Text>{" "}
                    </Flex>
                  </Flex>
                  <ReviewsText>
                    <Flex gap="8px" align="center">
                      <Icon>
                        <Flex>
                          <Image
                            alt="location"
                            src={"/assets/icons/stay/view/view_camera_icon.svg"}
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
                          emptyIcon={<CircleOutlinedIcon fontSize="inherit" />}
                          style={{
                            fontSize: "15px",
                          }}
                        />
                        <Text
                          styles={{
                            wordWrap: "normal",
                            whiteSpace: "nowrap",
                          }}
                          type="p"
                          text={`${hotel.reviews} reviews`}
                        ></Text>
                      </Flex>
                    </Flex>
                  </ReviewsText>
                </Flex>
              </SlideList>
            </SlideCard>
          ))}
        </SliderWidth>
      </SlideContent>
    </>
  );
}

export default PopularHotels;
