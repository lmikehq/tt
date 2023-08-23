"use client";
import React, { useState } from "react";
import styled from "styled-components";
import newZealand from "@image/topCountries/zealand.jpeg";
import Uk from "@image/topCountries/uk.jpeg";
import Canada from "@image/topCountries/Canada.jpeg";
import Norway from "@image/topCountries/norway.jpeg";
import Image, { StaticImageData } from "next/image";
import { Grid } from "@atom/grid";

import CountryLayout from "@layout/sectionLayout";
import { useScreenResolution } from "hook/useScreenResolution";
import SectionTitle from "@molecule/sectionTitle";
import { RiLineHeight } from "react-icons/ri";
import { useRouter } from "next/navigation";

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

  @media (max-width: 900px) {
    margin-top: 3.5rem;
  }
`;

const LeftSide = styled.div`
  height: 415px;
  @media (max-width: 900px) {
    height: 460px;
  }
`;

const RightSide = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  height: 415px;
  @media (max-width: 900px) {
    height: 460px;
  }
`;

const StyledImage = styled(Image)<{ active: boolean }>`
  width: 100%;
  height: 100%;
  opacity: ${({ active }) => (active ? 0.7 : 1)};
  cursor: pointer;
  border-radius: 1.4rem;
`;

const CountryInfo = styled.div`
  position: relative;
  padding: 20px;
  background: var(--primary-color);
  color: var(--secondary-color);
  border-radius: 1.4rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 110%;
  overflow; hidden;
  display: flex;
  flex-direction: column;
`;

const LeftHeaderText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.15em 0;
`;

const CountryName = styled.h3`
  font-size: 40px;
  display: flex;
  font-family: Poppins;
  font-weight: 600;
  padding-right: 65px;
  line-height: 1.25em;
`;

const CountryDescription = styled.p`
  font-size: 15px;
  font-weight: normal;
  font-family: Montserrat;
  max-height: 10.5rem;
  line-height: 1.25em;
  // padding: 2px 0.2rem;
`;

const IntervalTag = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  background-color: #fff;
  padding: 5px 10px;
  font-weight: bold;
  height: 65px;
  width: 80px;
  margin: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  background-color: #fff;
  border: none;
  font-weight: bold;
  font-family: Montserrat;
  width: 85%;
  padding: 18px;
  border-radius: 8px;
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  top: 5rem;
`

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
  height: 100%;
  border-radius: 1.4rem;
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
  const { isMobile } = useScreenResolution();
  const [activeImage, setActiveImage] = useState(1);
  const [hoveredImage, setHoveredImage] = useState(1);

  const countries: Country[] = [
    {
      id: 1,
      name: "Canada",
      description1:
        "Canada is my hometown is a unique experience as it's the best way to unplug from the pushes and pulls of daily life. It helps us to forget about our problems, frustrations, and fears at home. During our journey, we experience life in different ways. We explore new places, cultures, cuisines, traditions, and ways of living.",
      description2:
        "Canada is my hometown is a unique experience as it's the best way to unplug from the pushes and pulls of daily life. It helps us to forget about our problems, frustrations, and fears at home. During our journey, we experience life in different ways. We explore new places, cultures, cuisines, traditions, and ways of living.",
      image: Canada,
      interval: "3 days",
    },
    {
      id: 2,
      name: "New Zealand",
      description1:
        "New Zealand is my hometown is a unique experience as it's the best way to unplug from the pushes and pulls of daily life. It helps us to forget about our problems, frustrations, and fears at home. During our journey, we experience life in different ways. We explore new places, cultures, cuisines, traditions, and ways of living.",
      description2:
        "New Zealand is my hometown is a unique experience as it's the best way to unplug from the pushes and pulls of daily life. It helps us to forget about our problems, frustrations, and fears at home. During our journey, we experience life in different ways. We explore new places, cultures, cuisines, traditions, and ways of living.",
      image: newZealand,
      interval: "3 days",
    },
    {
      id: 3,
      name: "United Kingdom",
      description1:
        "United Kingdom is my hometown is a unique experience as it's the best way to unplug from the pushes and pulls of daily life. It helps us to forget about our problems, frustrations, and fears at home. During our journey, we experience life in different ways. We explore new places, cultures, cuisines, traditions, and ways of living.",
      description2:
        "United Kingdom is my hometown is a unique experience as it's the best way to unplug from the pushes and pulls of daily life. It helps us to forget about our problems, frustrations, and fears at home. During our journey, we experience life in different ways. We explore new places, cultures, cuisines, traditions, and ways of living.",
      image: Uk,
      interval: "3 days",
    },
    {
      id: 4,
      name: "Norway",
      description1:
        "Norway is my hometown is a unique experience as it's the best way to unplug from the pushes and pulls of daily life. It helps us to forget about our problems, frustrations, and fears at home. During our journey, we experience life in different ways. We explore new places, cultures, cuisines, traditions, and ways of living.",
      description2:
        "Norway is my hometown is a unique experience as it's the best way to unplug from the pushes and pulls of daily life. It helps us to forget about our problems, frustrations, and fears at home. During our journey, we experience life in different ways. We explore new places, cultures, cuisines, traditions, and ways of living.",
      image: Norway,
      interval: "3 days",
    },
  ];

  const router = useRouter();

  return (
    <CountryWrapper
      style={{ marginBottom: isMobile ? "3rem" : "10rem" }}
    >
      <CountryLayout>
        <SectionTitle
          title="Our top countries"
          description="Going somewhere to celebrate this season? Whether you’re going home or somewhere to roam, we’ve got the travel tools to get you to your destination."
          buttonText="See all"
        />
        {isMobile ? (
          <>
            <RightSide style={{ marginBottom: "2rem" }}>
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
            <Grid columns="1fr" gap="2rem" align="start">
              <LeftSide>
                {activeImage !== null && (
                  <CountryInfo>
                    <CountryName>
                      Get {countries[activeImage - 1].name} E-visa
                    </CountryName>
                    <IntervalTag>
                      <IntervalText>E-visa</IntervalText>
                      <IntervalDays>3 days</IntervalDays>
                    </IntervalTag>
                    
                    <CountryDescription
                      style={{
                        marginTop: isMobile ? "9px" : "50px",
                        fontSize: isMobile
                          ? "14px"
                          
                          
                          : "1rem",
                        lineHeight: isMobile
                          ? "18px"
                          
                          
                          : "14px",
                      }}
                    >
                      {countries[activeImage - 1].description1}
                      {countries[activeImage - 1].description2}
                    </CountryDescription>
                    
                    
                      <Button>Apply to {countries[activeImage - 1].name}</Button>
                  </CountryInfo>
                )}
              </LeftSide>
            </Grid>
          </>
        ) : (
          <Grid columns="repeat(2, 1fr)" gap="1rem" align="center">
            <LeftSide>
              {activeImage !== null && (
                <CountryInfo>
                  <LeftHeaderText>
                    <IntervalTag>
                      <IntervalText>E-visa</IntervalText>
                      <IntervalDays>3 days</IntervalDays>
                    </IntervalTag>
                    <CountryName>
                      Get {countries[activeImage - 1].name} E-visa
                    </CountryName>
                  </LeftHeaderText>
                  <CountryDescription>
                    {countries[activeImage - 1].description1}
                    <br />
                    <br />
                    {countries[activeImage - 1].description2}
                  </CountryDescription>
                  <ButtonWrapper>
                    <Button
                      onClick={() =>
                        router.push(
                          `/visa/apply?destination=${
                            countries[activeImage - 1].name
                          }`
                        )
                      }
                    >
                      Apply to {countries[activeImage - 1].name}
                    </Button>
                  </ButtonWrapper>
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
        )}
      </CountryLayout>
    </CountryWrapper>
  );
};

export default TopCountriesSection;
