"use client";
import Button from "@atom/button";
import Flex from "@atom/flex";
import { Grid } from "@atom/grid";
import Link from "@atom/link";
import Text from "@atom/text";
import SectionLayout from "@layout/sectionLayout";
import { urlString } from "@lib/url";
import SectionTitle from "@molecule/sectionTitle";
import { useScreenResolution } from "hook/useScreenResolution";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import { ttColors } from "theme/colors";
import { COUNTRY_FLAGS } from "../../../data/data";
import AllCountryHead from "./allCountryHead";

import CoverDesktopImg from "@image/visaDesktopCover.jpg";
import CoverImg from "@image/visaPageCover.jpg";

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

  @media screen and (max-width: 900px) {
    padding: 10px;
    height: 48px;
    border-radius: 5px;

    & img {
      width: 45px;
      height: 30px;
    }

    & h3 {
      font-size: 13px;
      line-height: 15px;
      margin-bottom: 0rem;
    }
  }
`;

const CountriesList = () => {
  const { isMobile } = useScreenResolution();
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

  const coverImage = isMobile ? CoverImg : CoverDesktopImg;


  return (
    <CountryWrapper>
      <AllCountryHead cover={coverImage} title="ALL COUNTRIES" />
      <SectionLayout>
        <SectionTitle
          title="All the countries we support!"
          description="Explore our popular destinations to find the best option for your next adventure!"
          buttonText="See More"
          showButton={false}
        />
        <Grid
          columns={isMobile ? "repeat(2, 1fr)" : "repeat(5, 1fr)"}
          gap={isMobile ? ".8rem" : "1.5rem"}
          margin="2rem 0 0"
        >
          {displayedCountries.map((country, index) => (
            <Link
              href={`/visa/countries/${urlString(country.name)}`}
              key={index}
            >
              <div>
                <Card>
                  <Image src={country.flag} alt={country.name} />
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
      </SectionLayout>
    </CountryWrapper>
  );
};

export default CountriesList;
