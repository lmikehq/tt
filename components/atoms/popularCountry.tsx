'use client'

import React, { useState } from "react";
import styled from "styled-components";

interface Country {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
}

const TopCountriesSection: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const countries: Country[] = [
    {
      id: 1,
      name: "Country 1",
      description: "Description of Country 1",
      image: "country1.jpg",
      price: 1000,
    },
    // Add more country objects here
  ];

  const handleCountryHover = (country: Country): void => {
    setSelectedCountry(country);
  };

  return (
    <Container>
      <CountryInfo>
        {selectedCountry && (
          <>
            <CountryInfoHeader>
              <PriceTag>${selectedCountry.price}</PriceTag>
            </CountryInfoHeader>
            <CountryImage
              src={selectedCountry.image}
              alt={selectedCountry.name}
            />
            <CountryName>{selectedCountry.name}</CountryName>
            <CountryDescription>
              {selectedCountry.description}
            </CountryDescription>
            <BookButton>Book Now</BookButton>
          </>
        )}
      </CountryInfo>
      <CountryImages>
        {countries.map((country) => (
          <CountryThumbnail
            key={country.id}
            src={country.image}
            alt={country.name}
            onMouseEnter={() => handleCountryHover(country)}
            onMouseLeave={() => setSelectedCountry(null)}
          />
        ))}
      </CountryImages>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

const CountryInfo = styled.div`
  flex: 1;
  padding: 20px;
`;

const CountryInfoHeader = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const PriceTag = styled.span`
  background-color: #ff0000;
  color: #ffffff;
  padding: 5px 10px;
  border-radius: 4px;
  font-weight: bold;
`;

const CountryImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 10px;
`;

const CountryName = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
`;

const CountryDescription = styled.p`
  margin-bottom: 10px;
`;

const BookButton = styled.button`
  padding: 10px 20px;
  background-color: #0000ff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
`;

const CountryImages = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
`;

const CountryThumbnail = styled.img`
  width: 100px;
  height: 100px;
  margin: 10px;
  cursor: pointer;
`;

export default TopCountriesSection;
