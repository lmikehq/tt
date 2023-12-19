import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import React, { useState } from "react";
import { GridLayout, ImageBox, List } from "../stays/view/styles";
import Link from "@/components/atoms/link";
import {
  formatPriceWithoutCurrency,
  getCurrency,
} from "@/lib/extensions/helpers/formatPrice";
import { Box } from "@mui/material";
import { BiTransferAlt } from "react-icons/bi";
import { Span } from "../stays/components/styles";
import TruncateMarkup from "react-truncate-markup";

interface PopularFlight {
  to_location: string;
  fro_location: string;
  image: string;
  from_price: number;
}

const flights: PopularFlight[] = [
  {
    to_location: "New York",
    fro_location: "Paris",
    image: "/assets/images/flights/flig1.png",
    from_price: 2100000,
  },
  {
    to_location: "London",
    fro_location: "Rome",
    image: "/assets/images/flights/flig2.png",
    from_price: 2105000,
  },
  {
    to_location: "Sydney",
    fro_location: "Audlank",
    image: "/assets/images/flights/flig3.png",
    from_price: 2105000,
  },
  {
    to_location: "New York",
    fro_location: "Paris",
    image: "/assets/images/flights/flig1.png",
    from_price: 2100000,
  },
  {
    to_location: "London",
    fro_location: "Rome",
    image: "/assets/images/flights/flig2.png",
    from_price: 2105000,
  },
  {
    to_location: "Sydney",
    fro_location: "Audlank",
    image: "/assets/images/flights/flig3.png",
    from_price: 2105000,
  },
  {
    to_location: "New York",
    fro_location: "Paris",
    image: "/assets/images/flights/flig1.png",
    from_price: 2100000,
  },
  {
    to_location: "London",
    fro_location: "Rome",
    image: "/assets/images/flights/flig2.png",
    from_price: 2105000,
  },
  {
    to_location: "Sydney",
    fro_location: "Audlank",
    image: "/assets/images/flights/flig3.png",
    from_price: 2105000,
  },
  {
    to_location: "New York",
    fro_location: "Paris",
    image: "/assets/images/flights/flig1.png",
    from_price: 2100000,
  },
  {
    to_location: "London",
    fro_location: "Rome",
    image: "/assets/images/flights/flig2.png",
    from_price: 2105000,
  },
  {
    to_location: "Sydney",
    fro_location: "Audlank",
    image: "/assets/images/flights/flig3.png",
    from_price: 2105000,
  },
  {
    to_location: "New York",
    fro_location: "Paris",
    image: "/assets/images/flights/flig1.png",
    from_price: 2100000,
  },
  {
    to_location: "London",
    fro_location: "Rome",
    image: "/assets/images/flights/flig2.png",
    from_price: 2105000,
  },
  {
    to_location: "Sydney",
    fro_location: "Audlank",
    image: "/assets/images/flights/flig3.png",
    from_price: 2105000,
  },
  {
    to_location: "New York",
    fro_location: "Paris",
    image: "/assets/images/flights/flig1.png",
    from_price: 2100000,
  },
  {
    to_location: "London",
    fro_location: "Rome",
    image: "/assets/images/flights/flig2.png",
    from_price: 2105000,
  },
  {
    to_location: "Sydney",
    fro_location: "Audlank",
    image: "/assets/images/flights/flig3.png",
    from_price: 2105000,
  },
  {
    to_location: "New York",
    fro_location: "Paris",
    image: "/assets/images/flights/flig1.png",
    from_price: 2100000,
  },
  {
    to_location: "London",
    fro_location: "Rome",
    image: "/assets/images/flights/flig2.png",
    from_price: 2105000,
  },
  {
    to_location: "Sydney",
    fro_location: "Audlank",
    image: "/assets/images/flights/flig3.png",
    from_price: 2105000,
  },
  {
    to_location: "New York",
    fro_location: "Paris",
    image: "/assets/images/flights/flig1.png",
    from_price: 2100000,
  },
  {
    to_location: "London",
    fro_location: "Rome",
    image: "/assets/images/flights/flig2.png",
    from_price: 2105000,
  },
  {
    to_location: "Sydney",
    fro_location: "Audlank",
    image: "/assets/images/flights/flig3.png",
    from_price: 2105000,
  },
];
function PopularFlights() {
  const { isMobile } = useScreenResolution();
  const flightsPerPage = 12;

  const [displayedFlights, setDisplayedFlights] = useState(
    flights.slice(0, flightsPerPage)
  );
  const [viewMoreCount, setViewMoreCount] = useState(0);

  const handleViewMoreClick = () => {
    const newCount = viewMoreCount + 1;
    setViewMoreCount(newCount);

    const startIndex = newCount * flightsPerPage;
    const endIndex = startIndex + 6;

    if (newCount <= 2) {
      setDisplayedFlights([
        ...displayedFlights,
        ...flights.slice(startIndex, endIndex),
      ]);
    } else {
      setViewMoreCount(2);
    }
  };

  const handleViewLessClick = () => {
    setViewMoreCount(0);
    setDisplayedFlights(flights.slice(0, flightsPerPage));
  };
  return (
    <div>
      <Flex
        direction="column"
        gap=".65rem"
        wrap={isMobile ? "unset" : "wrap"}
        styles={{ marginBottom: "20px" }}
      >
        <Text
          type="h1"
          text="Popular Flights"
          font="Montserrat"
          weight={700}
          size={36}
        />
        <Text
          type="p"
          text="Here are the flight deals that are popular around the world"
          size={18}
          whiteSpace={isMobile ? "unset" : "nowrap"}
        />
      </Flex>
      <GridLayout className="flight_landing_grid">
        {displayedFlights.map((flight, index) => (
          <List key={index} className="flight_list">
            <Flex gap="15px" className="compare_recently">
              <ImageBox className="flight_img_box">
                <Link href="" className="link">
                  <img
                    src={flight.image}
                    alt={flight.to_location}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Link>
              </ImageBox>
              <Box>
                <Flex
                  direction="column"
                  gap="20px"
                  styles={{ marginTop: "10px" }}
                >
                  <Link href="">
                    <Flex gap="10px" align="center">
                      <Text
                        weight={600}
                        type="h3"
                        text={flight.to_location}
                      ></Text>
                      <BiTransferAlt
                        style={{ fontWeight: "600", fontSize: "20px" }}
                      />
                      <Text
                        weight={600}
                        type="h3"
                        text={flight.fro_location}
                      ></Text>
                    </Flex>
                  </Link>
                  <Flex gap="5px" align="center">
                    <Flex width="100%">
                      <TruncateMarkup lines={1}>
                        <p style={{ fontSize: "15px", width: "100%" }}>
                          Ticket starts from
                        </p>
                      </TruncateMarkup>
                    </Flex>
                    <Span
                      style={{
                        display: "flex",
                        gap: "3px",
                        alignItems: "center",
                      }}
                    >
                      <Text type="p" size={15} text={getCurrency()} />
                      <Text
                        type="p"
                        size={15}
                        text={formatPriceWithoutCurrency(flight.from_price)}
                      />
                    </Span>
                  </Flex>
                </Flex>
              </Box>
            </Flex>
          </List>
        ))}
      </GridLayout>
      <Flex
        styles={{ marginTop: "40px" }}
        width="100%"
        justify="center"
        align="center"
      >
        <Span
          className="button"
          style={{
            cursor: "pointer",
            padding: "8px 30px",
            border: "1px solid var(--secondary-color)",
            borderRadius: "6px",
          }}
          onClick={viewMoreCount ? handleViewLessClick : handleViewMoreClick}
        >
          <Text
            weight={600}
            type="p"
            text={viewMoreCount ? "View Less" : "View More"}
          ></Text>
        </Span>{" "}
      </Flex>
    </div>
  );
}

export default PopularFlights;
