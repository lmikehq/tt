"use client";
import FlightHero from "@organism/hero/flight";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import React, { useRef, useState } from "react";
import Text from "@/components/atoms/text";
import BagsButton from "@/components/organisms/flights/BagsButton";
import StopsButton from "@/components/organisms/flights/StopsButton";
import PricesButton from "@/components/organisms/flights/PricesButton";
import DepartureTimeButton from "@/components/organisms/flights/DepartureTimeButton";
import CabinButton from "@/components/organisms/flights/CabinButton";
import SortButton from "@/components/organisms/flights/SortButton";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import MobileServiceBanner from "@/components/organisms/flights/MobileServiceBanner";
import Navbar from "@/components/organisms/Navbar";
import ServiceBanner from "@/components/organisms/ServiceBanner";
import { useDetectOutsideClick } from "@/lib/extensions/hook/useDetectOutsideClick";

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
  const [serviceBannerOpen, setServiceBannerOpen] = useState(false);

  const handleMouseEnter = (name: string) => {
    setHoveredCity(name);
  };

  const handleMouseLeave = () => {
    setHoveredCity(null);
  };

  const { isMobile } = useScreenResolution();
  const serviceBannerRef = useRef();

  useDetectOutsideClick(serviceBannerRef, () => setServiceBannerOpen(false));

  return (
    <div>
      {isMobile ? <Navbar page="flights" /> : <FlightHero />}

      {isMobile && (
        <Box marginBottom={"2rem"}>
          <MobileServiceBanner setServiceBannerOpen={setServiceBannerOpen} />
        </Box>
      )}

      {serviceBannerOpen && (
        <Box ref={serviceBannerRef}>
          <ServiceBanner page="flights" />
        </Box>
      )}

      <Container maxWidth="lg">
        {isMobile && (
          <Box marginBottom="1rem">
            <Text type="h1" weight={"bold"} text="Explore Germany" />
          </Box>
        )}

        <Box
          sx={{
            display: isMobile ? "flex" : "grid",
            gridTemplateColumns: isMobile ? "70% 20%" : "60% 20%",
            columnGap: isMobile ? "100px" : "20%",
            alignItems: "center",
            overflowX: isMobile ? "scroll" : "none",
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

          <Box sx={{ justifySelf: "end" }}>
            <SortButton />
          </Box>
        </Box>
        {!isMobile && (
          <Box sx={{ marginBottom: "2.5rem" }}>
            <Text type="h1" weight={"bold"} text="Explore Germany" />

            <Text
              type="p"
              text="Select your preferred destination to view all available flights."
            />
          </Box>
        )}

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
                ":hover": !isMobile
                  ? {
                      height: "auto",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }
                  : {},
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
                {city.name === hoveredCity && !isMobile ? (
                  <Text type="h2" size="2rem" weight="bold" text={city.name} />
                ) : (
                  <>
                    <Text
                      weight="600"
                      size="1.5rem"
                      type="p"
                      text={city.name}
                    />
                    <Text type="p" text={`Prices from ${city.price}`} />
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
