"use client";
import FlightHero from "@organism/hero/flight";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import React, { useState } from "react";
import BagsButton from "./components/BagsButton";
import StopsButton from "./components/StopsButton";
import PricesButton from "./components/PricesButton";
import DepartureTimeButton from "./components/DepartureTimeButton";
import SortButton from "./components/SortButton";
import { Typography } from "@mui/material";
import CabinButton from "./components/CabinButton";

interface pageProps {}

const Page: React.FC<pageProps> = ({}) => {
  const cities = [
    { name: "Berlin", price: "$2,600" },
    { name: "Frankfurt", price: "$2,300" },
    { name: "Munich", price: "$2,650" },
    { name: "Hamburg", price: "$2,750" },
    { name: "Hannover", price: "$2,320" },
    { name: "Stuggart", price: "$2,320" },
    { name: "Dusseldorf", price: "$2,550" },
    { name: "Cologne", price: "$2,400" },
    { name: "Bremen", price: "$1,980" },
    { name: "Nuremberg", price: "$2,440" },
    { name: "Dortmund", price: "$2,000" },
    { name: "Memmingen", price: "$2,620" },
    { name: "Dresden", price: "$2,250" },
    { name: "Munster", price: "$2,580" },
    { name: "Westerland", price: "$2,250" },
    { name: "Paderborn", price: "$2,580" },
    { name: "Leipzig", price: "$2,120" },
    { name: "Karlsruhe", price: "$2,120" },
    { name: "Friedrichshafen", price: "$2,250" },
  ];

  const [hoveredCity, setHoveredCity] = useState<null | string>(null);

  const handleMouseEnter = (name: string) => {
    setHoveredCity(name);
  };

  const handleMouseLeave = () => {
    setHoveredCity(null);
  };
  return (
    <div>
      <FlightHero />

      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          marginBottom="2rem"
        >
          <Box sx={{ display: "flex", columnGap: "1rem" }}>
            <BagsButton />
            <StopsButton />
            <PricesButton />
            <DepartureTimeButton />
            <CabinButton />
          </Box>

          <SortButton />
        </Box>
        <Box sx={{ marginBottom: "1rem" }}>
          <h1>Explore Germany</h1>
          <p>
            Select your preferred destination to view all available flights.
          </p>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            columnGap: "1.5rem",
            rowGap: "2rem",
          }}
        >
          {cities.map((city) => (
            <Box
              key={city.name}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                height: {
                  xs: "250px",
                  md: "270px",
                },
                ":hover": {
                  height: "auto",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                },
                borderRadius: "10px",
                position: "relative",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundImage: "url('/assets/images/flights/image1.jpg')",
              }}
              onMouseEnter={() => handleMouseEnter(city.name)}
              onMouseLeave={handleMouseLeave}
            >
              <Box
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgb(0, 0, 0, 0.5)",
                  borderRadius: "10px",
                  zIndex: 0,
                  left: 0,
                  top: 0,
                }}
              />

              <Box sx={{ zIndex: 1, color: "white" }} padding={2}>
                {city.name === hoveredCity ? (
                  <Typography variant="h4" component="p">
                    {city.name}
                  </Typography>
                ) : (
                  <>
                    <Typography>{city.name}</Typography>
                    <Typography>Prices from {city.price}</Typography>
                  </>
                )}
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </div>
  );
};
export default Page;
