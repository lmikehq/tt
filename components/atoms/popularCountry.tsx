"use client";
import React, { useState } from "react";
import styled from "styled-components";
import newZealand from "@image/topCountries/newZealand.png";
import UAE from "@image/topCountries/UAE.png";
import Haiti from "@image/topCountries/Haiti.png";
import mikeVilla from "@image/topCountries/mikeVilla.png";
import Image, { StaticImageData } from "next/image";
import { Grid } from "@atom/grid";

import CountryLayout from "@layout/sectionLayout";
import SectionTitle from "@atom/sectionTitle";

interface Country {
  id: number;
  name: string;
  description1: string;
  description2: string;
  image: StaticImageData;
  interval: string;
}

const CountryWrapper = styled.section`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-top: 5rem;
  margin-bottom: 10rem;
`;

const LeftSide = styled.div`
  height: 365px;
  //   flex: 1;
`;

const RightSide = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  height: 365px;
`;

const StyledImage = styled(Image)<{ active: boolean }>`
  width: 100%;
  height: auto;
  opacity: ${({ active }) => (active ? 0.7 : 1)};
  cursor: pointer;
`;

const CountryInfo = styled.div`
  position: relative;
  padding: 20px;
  background: var(--primary-color);
  color: var(--secondary-color);
  border-radius: 1.4rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 415px;
`;

const CountryName = styled.h3`
  font-size: 32px;
  margin-bottom: 20px;
  width: 365px;
  text-align: start;
  margin-left: 1.2rem;
  //   height: 120px;
`;

const CountryDescription = styled.p`
  margin: 82px auto;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  padding: 0 1.2rem;
`;

const IntervalTag = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #fff;
  padding: 5px 10px;
  font-weight: bold;
  height: 65px;
  width: 81px;
  margin: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  background-color: #fff;
  border: none;
  font-weight: bold;
  position: relative;
  top: -10px;
  left: 5px;
  width: 98%;
  padding: 18px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  cursor: pointer;
`;

const CountryNameTooltip = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  padding: 5px;
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  display: flex;
  align-items: center;
  text-align: center;
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
`;

const ImageOverlay = styled.div`
  position: absolute;
  border-radius: 12px;
  top: 0;
  left: 0;
  width: 100%;
  height: 98.17%;
  //   background: crimson;
  mix-blend-mode: soft-light;
  opacity: 0;
  background: #1d2c54c4;
  transition: opacity 0.3s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    opacity: 1;
  }

  &:hover ${CountryNameTooltip} {
    opacity: 1;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const IntervalText = styled.p`
  margin-bottom: 5px;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  text-align: center;
  margin-top: 4px;
`;

const IntervalDays = styled.h4`
  margin: 0;
  font-style: normal;
  text-align: center;
  font-weight: 600;
  font-size: 1rem;
  line-height: 15px;
`;

const TopCountriesSection: React.FC = () => {
  const [activeImage, setActiveImage] = useState(1);
  const [hoveredImage, setHoveredImage] = useState(1);

  const countries: Country[] = [
    {
      id: 1,
      name: "New Zealand",
      description1: "New zealand is my hometown is a unique experience as it's the best way to unplug from the pushes and pulls of daily life. It helps us to forget about our problems, frustrations, and fears at home. During our journey, we experience life in different ways. We explore new places, cultures, cuisines, traditions, and ways of living.",
      description2:  "New zealand is my hometown is a unique experience as it's the best way to unplug from the pushes and pulls of daily life. It helps us to forget about our problems, frustrations, and fears at home. During our journey, we experience life in different ways. We explore new places, cultures, cuisines, traditions, and ways of living.",
      image: newZealand,
      interval: "3 days",
    },
    {
      id: 2,
      name: "UAE",
      description1:
        "UAE is my hometown is a unique experience as it's the best way to unplug from the pushes and pulls of daily life. It helps us to forget about our problems, frustrations, and fears at home. During our journey, we experience life in different ways. We explore new places, cultures, cuisines, traditions, and ways of living.",
      description2:
        "UAE is my hometown is a unique experience as it's the best way to unplug from the pushes and pulls of daily life. It helps us to forget about our problems, frustrations, and fears at home. During our journey, we experience life in different ways. We explore new places, cultures, cuisines, traditions, and ways of living.",
      image: UAE,
      interval: "3 days",
    },
    {
      id: 3,
      name: "Haiti",
      description1:
        "Haiti is my hometown is a unique experience as it's the best way to unplug from the pushes and pulls of daily life. It helps us to forget about our problems, frustrations, and fears at home. During our journey, we experience life in different ways. We explore new places, cultures, cuisines, traditions, and ways of living.",
      description2:
        "Haiti is my hometown is a unique experience as it's the best way to unplug from the pushes and pulls of daily life. It helps us to forget about our problems, frustrations, and fears at home. During our journey, we experience life in different ways. We explore new places, cultures, cuisines, traditions, and ways of living.",
      image: Haiti,
      interval: "3 days",
    },
    {
      id: 4,
      name: "Mike Villa",
      description1:
        "MikeVilla is my hometown is a unique experience as it's the best way to unplug from the pushes and pulls of daily life. It helps us to forget about our problems, frustrations, and fears at home. During our journey, we experience life in different ways. We explore new places, cultures, cuisines, traditions, and ways of living.",
      description2:
        "Mikevilla is my hometown is a unique experience as it's the best way to unplug from the pushes and pulls of daily life. It helps us to forget about our problems, frustrations, and fears at home. During our journey, we experience life in different ways. We explore new places, cultures, cuisines, traditions, and ways of living.",
      image: mikeVilla,
      interval: "3 days",
    },
  ];

  console.log("blah bah", activeImage);

  return (
    <CountryWrapper>
      <CountryLayout>
        <SectionTitle
          title="Our top countries"
          description="Going somewhere to celebrate this season? Whether you’re going home or somewhere to roam, we’ve got the travel tools to get you to your destination."
          buttonText="See All"
          onButtonClick={() => {
            console.log("Button clicked");
          }}
        />
        <Grid columns="repeat(2, 1fr)" gap="1rem">
          <LeftSide>
            {activeImage !== null && (
              <CountryInfo>
                <IntervalTag>
                  <IntervalText>E-visa</IntervalText>
                  <IntervalDays>3 days</IntervalDays>
                </IntervalTag>
                <CountryName>
                  Get {countries[activeImage - 1].name} E-visa
                </CountryName>
                <CountryDescription>
                  {countries[activeImage - 1].description1}
                  <br />
                  <br />
                  {countries[activeImage - 1].description2}
                </CountryDescription>
                <Button>Apply to {countries[activeImage - 1].name}</Button>
              </CountryInfo>
            )}
          </LeftSide>
          <RightSide>
            {countries.map((country) => (
              <ImageWrapper
                key={country.id}
                onMouseEnter={() => {
                  setHoveredImage(country.id);
                  setActiveImage(country.id);
                }}
              >
                <StyledImage
                  src={country.image}
                  alt={country.name}
                  active={
                    activeImage === country.id || hoveredImage === country.id
                  }
                />
                <ImageOverlay
                  style={{
                    opacity: hoveredImage === country.id ? 1 : 0,
                  }}
                />
                {activeImage === country.id || hoveredImage === country.id ? (
                  <CountryNameTooltip>{country.name}</CountryNameTooltip>
                ) : null}
              </ImageWrapper>
            ))}
          </RightSide>
        </Grid>
      </CountryLayout>
    </CountryWrapper>
  );
};

export default TopCountriesSection;
