"use client";
import Image from "next/image";
import React, { useState } from "react";
import { COUNTRY_FLAGS, sorted } from "../../../data/data";
import { Grid } from "@atom/grid";
import styled from "styled-components";
import Link from "@atom/link";
import Text from "@atom/text";
import CountryLayout from "@layout/sectionLayout";
import AllCountryHead from "./allCountryHead";
import SectionTitle from "@atom/sectionTitle";
import Button from "@atom/button";
import { ttColors } from "theme/colors";
import Flex from "@atom/flex";
import { urlString } from "@lib/url";

const CountryWrapper = styled.section`
  // margin: 5rem 0;
`;

const Card = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  gap: 16px;
  margin-bottom: 1rem;
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

const CountriesList = () => {
  const [showAll, setShowAll] = useState(false);
  const countriesPerPage = 50;
  const countries = COUNTRY_FLAGS.sort((a, b) => a.name.localeCompare(b.name));
  const [displayedCountries, setDisplayedCountries] = useState(
    countries.slice(0, countriesPerPage)
  );

  const handleSeeMore = (e: any) => {
    e.preventDefault();
    if (showAll) {
      setDisplayedCountries(countries.slice(0, countriesPerPage));
      setShowAll(false);
    } else {
      const remainingCountries = countries.slice(
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
          countries.length
        ) {
          setShowAll(true);
        }
      } else {
        setDisplayedCountries(countries.slice(0, countriesPerPage));
        setShowAll(true);
      }
    }
  };

  return (
    <CountryWrapper>
      <AllCountryHead />
      <CountryLayout>
        <SectionTitle
          title="All the countries we support!"
          description="Explore our popular destinations to find the best option for your next adventure!"
          buttonText="See More"
          showButton={false}
        />
        <Grid columns="repeat(5, 1fr)" gap="1.5rem" margin="2rem 0 0">
          {displayedCountries.map((country, index) => (
            <Link
              href={`/visa/countries/${urlString(country.name)}`}
              key={index}
            >
              <div>
                <Card>
                  <Image
                    src={country.flag}
                    alt={country.name}
                    // style={{ width: "58.5px", height: "40px" }}
                  />
                  <Text text={country.name} type="h3" />
                </Card>
              </div>
            </Link>
          ))}
        </Grid>
        <Flex justify="center" margin="2rem 0 0">
          {COUNTRY_FLAGS.length > countriesPerPage && (
            <Button
              background="transparent"
              onClick={handleSeeMore}
              color={ttColors.dark}
              border={`1px solid ${ttColors.primary}`}
              width="240px"
              fontSize="1rem"
            >
              {showAll ? "See Less" : "See More"}
            </Button>
          )}
        </Flex>
      </CountryLayout>
    </CountryWrapper>
  );
};

export default CountriesList;
