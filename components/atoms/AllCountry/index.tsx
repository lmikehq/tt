"use client";
import Image from "next/image";
import React, { useState } from "react";
import { COUNTRY_FLAGS } from "../../../data/data";
import { Grid } from "@atom/grid";
import styled from "styled-components";
import TitleSec from "../sectionTitle";
import Link from "@atom/link";
import Text from "@atom/text";
import CountryLayout from "@layout/sectionLayout";
import AllCountryHead from "./allCountryHead";
import Button from "@mui/material/Button";



const CountryWrapper = styled.section`
  margin: 5rem 0;
`;

const Card = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  gap: 16px;
  margin-bottom: 1rem;

  width: 214px;
  height: 55px;
  color: var(--secondary-color);
  /* Neutrals */

  background: #ffffff;
  /* Cards Shadow */

  box-shadow: 0px 4px 16px rgba(17, 34, 17, 0.05);
  border-radius: 16px;

  & img {
    width: 58.5px;
    height: 40px;
  }

  & h3 {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    opacity: 0.7;
    margin-bottom: 0.5rem;
  }
`;

const ShowMoreButton = styled.button`
  margin: 1rem auto;
  display: flex;
  justify-content: center;
  border-radius: 4px;
  padding: 1.5rem 3rem;
  background-color: #f5f5f5;
  border: none;
  cursor: pointer;
`;

const CountriesList = () => {
  const [showAll, setShowAll] = useState(false);
  
  const countriesPerPage = 50;
  const [displayedCountries, setDisplayedCountries] = useState(
    COUNTRY_FLAGS.slice(0, countriesPerPage)
  );
// 
//   const toggleShowAll = () => {
//     setShowAll(!showAll);
//     if (showAll) {
//       setDisplayedCountries(COUNTRY_FLAGS.slice(0, countriesPerPage));
//     } else {
//       setDisplayedCountries(COUNTRY_FLAGS);
//     }
//   };

//   const handleSeeMore = () => {
//     const remainingCountries = COUNTRY_FLAGS.slice(
//       displayedCountries.length,
//       displayedCountries.length + countriesPerPage
//     );
//     if (remainingCountries.length > 0) {
//       setDisplayedCountries([...displayedCountries, ...remainingCountries]);
//     } else {
//       toggleShowAll();
//     }
//   };

// const handleSeeMore = (event) => {
//   event.preventDefault();
// 
//   if (showAll) {
//     setDisplayedCountries(COUNTRY_FLAGS.slice(0, countriesPerPage));
//     setShowAll(false);
//   } else {
//     const remainingCountries = COUNTRY_FLAGS.slice(
//       displayedCountries.length,
//       displayedCountries.length + 25
//     );
// 
//     if (remainingCountries.length > 0) {
//       setDisplayedCountries((prevCountries) => [
//         ...prevCountries,
//         ...remainingCountries,
//       ]);
//     } else {
//       setDisplayedCountries(COUNTRY_FLAGS.slice(0, countriesPerPage));
//       setShowAll(false);
//     }
//   }
// };

const handleSeeMore = (event) => {
  event.preventDefault();

  if (showAll) {
    setDisplayedCountries(COUNTRY_FLAGS.slice(0, countriesPerPage));
    setShowAll(false);
  } else {
    const remainingCountries = COUNTRY_FLAGS.slice(
      displayedCountries.length,
      displayedCountries.length + 25
    );

    if (remainingCountries.length > 0) {
      setDisplayedCountries((prevCountries) => [
        ...prevCountries,
        ...remainingCountries,
      ]);
      if (
        displayedCountries.length + remainingCountries.length ===
        COUNTRY_FLAGS.length
      ) {
        setShowAll(true);
      }
    } else {
      setDisplayedCountries(COUNTRY_FLAGS.slice(0, countriesPerPage));
      setShowAll(true);
    }
  }
};



  return (
    <CountryWrapper>
      <AllCountryHead />
      <CountryLayout>
        <TitleSec
          title="All the countries we support!"
          description="Explore our popular destinations to find the best option for your next adventure!"
          buttonText="See More"
          onButtonClick={() => {
            console.log("Button clicked");
          }}
        />
        <Link href="/">
          <Grid columns="repeat(5, 1fr)" gap="1.5rem">
            {displayedCountries.map((country, index) => (
              <div key={index}>
                <Card>
                  <Image
                    src={country.flag}
                    alt={country.name}
                    // style={{ width: "58.5px", height: "40px" }}
                  />
                  <Text text={country.name} type="h3" />
                </Card>
              </div>
            ))}
            {COUNTRY_FLAGS.length > countriesPerPage && (
              <Button variant="outlined" onClick={handleSeeMore}>
                {showAll ? "See Less" : "See More"}
              </Button>
            )}
          </Grid>
        </Link>
      </CountryLayout>
    </CountryWrapper>
  );
};

export default CountriesList;
