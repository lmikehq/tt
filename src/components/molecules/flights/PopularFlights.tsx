import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import React, { useEffect, useState } from "react";
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
import {
  FetchLocationsResponse,
  KiwiLocation,
} from "@/lib/types/response-models/flight/location.type";
import { TopDestinationService } from "@/lib/services/flight/topDestination.service";

// KIWI IMAGES
const imgUrl = process.env.NEXT_PUBLIC_KIWI_IMAGES;

function PopularFlights() {
  const images = [
    "/assets/images/flights/flig0.png",
    "/assets/images/flights/flig2.png",
    "/assets/images/flights/flig3.png",
    "/assets/images/flights/flig4.png",
    "/assets/images/flights/flig5.png",
    "/assets/images/flights/flig6.png",
    "/assets/images/flights/flig7.png",
    "/assets/images/flights/flig8.png",
    "/assets/images/flights/flig9.png",
    "/assets/images/flights/flig10.png",
    "/assets/images/flights/flig11.png",
    "/assets/images/flights/flig12.png",
    "/assets/images/flights/flig13.png",
    "/assets/images/flights/flig14.png",
    "/assets/images/flights/flig15.png",
    "/assets/images/flights/flig16.png",
    "/assets/images/flights/flig17.png",
  ];

  const { isMobile } = useScreenResolution();
  const flightsPerPage = 24;

  const [locations, setLocations] = useState<FetchLocationsResponse | null>(
    null
  );
  const [displayedFlights, setDisplayedFlights] = useState<
    KiwiLocation[] | null
  >(null);

  const [viewMoreCount, setViewMoreCount] = useState(0);

  //========================
  // FETCH TOP DESTINATIONS
  //========================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await TopDestinationService.fetchLocations({
          data: { term: "london_gb" },
        });
        setLocations(result);
        setDisplayedFlights(result?.locations.slice(0, flightsPerPage) || null);
      } catch (error) {
        console.error("Error in useEffect:", error);
      }
    };
    fetchData();
  }, [flightsPerPage]);

  // console.log("TOP DEST:", displayedFlights);

  //===================
  // VIEW MORE HANDLER
  //===================
  const handleViewMoreClick = () => {
    const newCount = viewMoreCount + 1;
    setViewMoreCount(newCount);

    const startIndex = newCount * flightsPerPage;
    const endIndex = startIndex + 12;

    if (newCount <= 2) {
      setDisplayedFlights(locations?.locations.slice(0, endIndex) || null); // Updated to use fetched locations
    } else {
      setViewMoreCount(2);
    }
  };

  const handleViewLessClick = () => {
    setViewMoreCount(0);
    setDisplayedFlights(locations?.locations.slice(0, flightsPerPage) || null); // Updated to use fetched locations
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
          size={isMobile ? 24 : 36}
        />
        <Text
          type="p"
          text="Here are the flight deals that are popular around the world"
          size={isMobile ? 16 : 18}
          whiteSpace={isMobile ? "unset" : "nowrap"}
        />
      </Flex>
      <GridLayout className="flight_landing_grid">
        {displayedFlights?.map((location, index, array) => {
          const hasNextLocation = index + 1 < array.length;

          const namesAreDifferent =
            location.name !== (array[index + 1]?.name || "NoName");

          const isEvenIndex = index % 2 === 0 && hasNextLocation;

          return isEvenIndex && namesAreDifferent ? (
            <React.Fragment key={index}>
              <List className="flight_list card">
                <Link
                  href={`/flight/listings?fly_from=${location.code}&fly_to=${
                    array[index + 1]?.code || location.code
                  }&date_from=${getCurrentDate()}&stops=one-way&cabin=M&adults=1&children=0&infants=0&cabinBags=1&checkedBags=0`}
                  className="link"
                >
                  <Flex gap="15px" align="center" className="compare_recently">
                    <ImageBox className="flight_img_box">
                      <img
                        src={`${imgUrl}/${location.id}.jpg`}
                        alt={location.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </ImageBox>
                    <Box>
                      <Flex direction="column" gap="20px">
                        <Flex gap="10px" align="center">
                          <Text
                            weight={600}
                            type="h3"
                            text={location.name}
                          ></Text>
                          <BiTransferAlt
                            style={{ fontWeight: "600", fontSize: "20px" }}
                          />
                          <Text
                            weight={600}
                            type="h3"
                            text={array[index + 1]?.name || "NoName"}
                          ></Text>
                        </Flex>
                      </Flex>
                    </Box>
                  </Flex>
                </Link>
              </List>
            </React.Fragment>
          ) : null;
        })}
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
