import React from "react";

import Link from "@/components/atoms/link";
import {
  formatPriceWithoutCurrency,
  getCurrency,
} from "@/lib/extensions/helpers/formatPrice";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { Rating } from "@mui/material";
import { Checkbox } from "@mui/material";
import { useState } from "react";
import { styled } from "styled-components";
import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import {
  FavoriteSliderBox,
  SlideCard,
  SlideContent,
  SlideList,
  SliderImgBox,
  SliderWidth,
  Span,
} from "../stays/components/styles";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

interface Flight {
  city_name: string;
  country: string;
  prices_from: number;
  image_url: string;
}

const flights: Flight[] = [
  {
    city_name: "Venice",
    country: "Italy",
    prices_from: 2000000,
    image_url: "/assets/images/flights/image3.jpg",
  },
  {
    city_name: "Atlanta",
    country: "United States",
    prices_from: 1850000,
    image_url: "/assets/images/flights/image2.png",
  },
  {
    city_name: "Sao Paulo",
    country: "Brazil",
    prices_from: 2250000,
    image_url: "/assets/images/flights/image1.jpg",
  },
  {
    city_name: "Venice",
    country: "Italy",
    prices_from: 2000000,
    image_url: "/assets/images/flights/image3.jpg",
  },
  {
    city_name: "Atlanta",
    country: "United States",
    prices_from: 1850000,
    image_url: "/assets/images/flights/image2.png",
  },
  {
    city_name: "Sao Paulo",
    country: "Brazil",
    prices_from: 2250000,
    image_url: "/assets/images/flights/image1.jpg",
  },
];
function FlightDeals() {
  const { isMobile } = useScreenResolution();

  const [checkedStates, setCheckedStates] = useState<boolean[]>(
    flights.map(() => false)
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
          text="Flight Deals from Lagos"
          font="Montserrat"
          weight={700}
          size={36}
        />
        <Text
          type="p"
          text="Here are the flight deals with the lowest prices. Act fast – they all 1-week trip in the next 6 months"
          size={18}
          whiteSpace={isMobile ? "unset" : "nowrap"}
        />
      </Flex>
      <SlideContent>
        <SliderWidth className="stay_landing_cards">
          {flights.map((flight, index) => (
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
                      src={flight.image_url}
                      alt={flight.city_name}
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
                <Flex justify="space-between">
                  <Flex direction="column">
                    <Link href="" style={{ width: "fit-content" }}>
                      <Text
                        type="h2"
                        text={flight.city_name}
                        weight={"bold"}
                        styles={{
                          fontSize: "22px",
                        }}
                      ></Text>
                    </Link>
                    <Flex styles={{ fontSize: "15px" }}>
                      <Text type="p" size={15} text={flight.country}></Text>
                    </Flex>
                  </Flex>
                  <Span>
                    <Flex direction="column">
                      <Flex justify="flex-end">
                        <Text
                          type="p"
                          whiteSpace="nowrap"
                          text="Starts from"
                        ></Text>
                      </Flex>
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
                          whiteSpace="nowrap"
                          text={formatPriceWithoutCurrency(flight.prices_from)}
                        />
                      </Flex>
                    </Flex>
                  </Span>
                </Flex>
              </SlideList>
            </SlideCard>
          ))}
        </SliderWidth>
      </SlideContent>
    </>
  );
}

export default FlightDeals;
