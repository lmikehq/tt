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
  fly_to: string;
  fly_from: string;
  fly_to_code: string;
  fly_from_code: string;
  image: string;
  from_price: number;
}

const flights: PopularFlight[] = [
  {
    fly_to: "New York",
    fly_from: "Paris",
    fly_to_code: "NYC",
    fly_from_code: "PAR",
    image: "/assets/images/flights/flig1.png",
    from_price: 2100000,
  },
  {
    fly_to: "London",
    fly_from: "Rome",
    fly_to_code: "LON",
    fly_from_code: "ROM",
    image: "/assets/images/flights/flig2.png",
    from_price: 2105000,
  },
  {
    fly_to: "Sydney",
    fly_from: "Audlank",
    fly_to_code: "SYD",
    fly_from_code: "ADL",
    image: "/assets/images/flights/flig3.png",
    from_price: 2105000,
  },
  {
    fly_to: "Dubai",
    fly_from: "Seychelles",
    fly_to_code: "DXB",
    fly_from_code: "SEZ",
    image: "/assets/images/flights/flig4.png",
    from_price: 2100000,
  },
  {
    fly_to: "Mumbai",
    fly_from: "Jaipur",
    fly_to_code: "BOM",
    fly_from_code: "JAI",
    image: "/assets/images/flights/flig5.png",
    from_price: 2105000,
  },
  {
    fly_to: "Budapest",
    fly_from: "Prague",
    fly_to_code: "BUD",
    fly_from_code: "PRG",
    image: "/assets/images/flights/flig6.png",
    from_price: 2105000,
  },
  {
    fly_to: "Hanoi",
    fly_from: "Brussels",
    fly_to_code: "HAN",
    fly_from_code: "BRU",
    image: "/assets/images/flights/flig7.png",
    from_price: 2100000,
  },
  {
    fly_to: "Toronto",
    fly_from: "Montreal",
    fly_to_code: "YYZ",
    fly_from_code: "YUL",
    image: "/assets/images/flights/flig8.png",
    from_price: 2105000,
  },
  {
    fly_to: "Los Angeles",
    fly_from: "Oslo",
    fly_to_code: "LAX",
    fly_from_code: "OSL",
    image: "/assets/images/flights/flig9.png",
    from_price: 2105000,
  },
  {
    fly_to: "Berlin",
    fly_from: "Santorini",
    fly_to_code: "TXL",
    fly_from_code: "JTR",
    image: "/assets/images/flights/flig10.png",
    from_price: 2100000,
  },
  {
    fly_to: "Copenhagen",
    fly_from: "Fez",
    fly_to_code: "CPH",
    fly_from_code: "FEZ",
    image: "/assets/images/flights/flig11.png",
    from_price: 2105000,
  },
  {
    fly_to: "Perth",
    fly_from: "Cairo",
    fly_to_code: "PER",
    fly_from_code: "CAI",
    image: "/assets/images/flights/flig12.png",
    from_price: 2105000,
  },
  {
    fly_to: "Oslo",
    fly_from: "Istanbul",
    fly_to_code: "OSL",
    fly_from_code: "IST",
    image: "/assets/images/flights/flig13.png",
    from_price: 2100000,
  },
  {
    fly_to: "Marrakech",
    fly_from: "Milan",
    fly_to_code: "RAK",
    fly_from_code: "MXP",
    image: "/assets/images/flights/flig14.png",
    from_price: 2105000,
  },
  {
    fly_to: "Vienna",
    fly_from: "Barcelona",
    fly_to_code: "VIE",
    fly_from_code: "BCN",
    image: "/assets/images/flights/flig15.png",
    from_price: 2105000,
  },
  {
    fly_to: "Santorini",
    fly_from: "Athens",
    fly_to_code: "JTR",
    fly_from_code: "ATH",
    image: "/assets/images/flights/flig16.png",
    from_price: 2100000,
  },
  {
    fly_to: "Phuket",
    fly_from: "Hamburg",
    fly_to_code: "HKT",
    fly_from_code: "HAM",
    image: "/assets/images/flights/flig17.png",
    from_price: 2105000,
  },
  {
    fly_to: "Perth",
    fly_from: "Florence",
    fly_to_code: "PER",
    fly_from_code: "FLR",
    image: "/assets/images/flights/flig18.png",
    from_price: 2105000,
  },
  {
    fly_to: "Hanoi",
    fly_from: "Dublin",
    fly_to_code: "HAN",
    fly_from_code: "DUB",
    image: "/assets/images/flights/flig19.png",
    from_price: 2100000,
  },
  {
    fly_to: "Fez",
    fly_from: "Queenstown",
    fly_to_code: "FEZ",
    fly_from_code: "ZQN",
    image: "/assets/images/flights/flig20.png",
    from_price: 2105000,
  },
  {
    fly_to: "Oslo",
    fly_from: "Singapore",
    fly_to_code: "OSL",
    fly_from_code: "SIN",
    image: "/assets/images/flights/flig21.png",
    from_price: 2105000,
  },
  {
    fly_to: "Dubai",
    fly_from: "Honolulu",
    fly_to_code: "DXB",
    fly_from_code: "HNL",
    image: "/assets/images/flights/flig22.png",
    from_price: 2100000,
  },
  {
    fly_to: "Mumbai",
    fly_from: "Busan",
    fly_to_code: "BOM",
    fly_from_code: "PUS",
    image: "/assets/images/flights/flig23.png",
    from_price: 2105000,
  },
  {
    fly_to: "Budapest",
    fly_from: "Luxor",
    fly_to_code: "BUD",
    fly_from_code: "LXR",
    image: "/assets/images/flights/flig24.png",
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

  //DATE
  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();

    return `${day}/${month}/${year}`;
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
            <Link
              href={`/flight/listings?fly_from=${flight.fly_from_code}&fly_to=${
                flight.fly_to_code
              }&date_from=${getCurrentDate()}&stops=one-way&cabin=M&adults=1&children=0&infants=0&cabinBags=1&checkedBags=0`}
              className="link"
            >
              <Flex gap="15px" className="compare_recently">
                <ImageBox className="flight_img_box">
                  <img
                    src={flight.image}
                    alt={flight.fly_to}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </ImageBox>
                <Box>
                  <Flex
                    direction="column"
                    gap="20px"
                    styles={{ marginTop: "10px" }}
                  >
                    <Flex gap="10px" align="center">
                      <Text weight={600} type="h3" text={flight.fly_to}></Text>
                      <BiTransferAlt
                        style={{ fontWeight: "600", fontSize: "20px" }}
                      />
                      <Text
                        weight={600}
                        type="h3"
                        text={flight.fly_from}
                      ></Text>
                    </Flex>
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
            </Link>
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
