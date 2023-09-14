"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { Grid } from "@components/templates/grid";

import SectionLayout from "@components/templates/SectionLayout";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import SectionTitle from "src/components/molecules/sectionTitle";
import { useRouter } from "next/navigation";
import Image from "@atom/image";

interface Country {
  id: number;
  name: string;
  description1: string;
  description2: string;
  image: string;
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
  // height: 415px;
  @media (max-width: 900px) {
    // height: 460px;
  }
`;

const RightSide = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  // height: 415px;
  @media (max-width: 900px) {
    // height: 460px;
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
  padding: 20px 20px 80px 20px;
  background: var(--primary-color);
  color: var(--secondary-color);
  border-radius: 1.4rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 100%;
  overflow; hidden;
  display: flex;
  flex-direction: column;
position: relative;

@media (max-width: 900px) {
  // height: 35rem;
}}
  & button.country-button {
  @media (max-width: 900px) {
    position: absolute;
    bottom: 4%;
    left: 7%;
  }}
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
  // max-height: 10.5rem;
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
  width: 100px;
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
  position: absolute;
  width: 100%;
  bottom: 4%;
  left: 0;
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
        "Imagine yourself exploring the stunning landscapes of Canada, from the vibrant cityscapes of Toronto to the breathtaking Rocky Mountains. Thrillers Travels is your gateway to Canada, offering seamless visa application services for those seeking to study, work, or settle in this land of endless possibilities.",
      description2:
        "Don't wait any longer to embark on your journey to Canada, Australia, Norway, or the United Kingdom! Let Thrillers Travels be your guide, turning your travel aspirations into unforgettable realities.",
      image: "/assets/images/topCountries/Canada.jpeg",
      interval: "3 Months",
    },
    {
      id: 2,
      name: "New Zealand",
      description1:
        "From the majestic beauty of the Southern Alps to the serene beaches, New Zealand calls out to adventurers and nature lovers. Thrillers Travels transforms your dreams into reality with visa application support, ensuring you can experience the thrill of this captivating land.",
      description2:
        "Don't wait any longer to embark on your journey to Canada, Australia, Norway, or the United Kingdom! Let Thrillers Travels be your guide, turning your travel aspirations into unforgettable realities.",
      image: "/assets/images/topCountries/zealand.jpeg",
      interval: "3 Months",
    },
    {
      id: 3,
      name: "United Kingdom",
      description1:
        "Experience the blend of tradition and modernity in the United Kingdom. Whether you're drawn to London's bustling streets or the historic charm of Edinburgh, Thrillers Travels is your partner in visa application excellence. Let us simplify your path to the UK, so you can make your mark in this iconic destination.",
      description2:
        "Don't wait any longer to embark on your journey to Canada, Australia, Norway, or the United Kingdom! Let Thrillers Travels be your guide, turning your travel aspirations into unforgettable realities.",
      image: "/assets/images/topCountries/uk.jpeg",
      interval: "3 Months",
    },
    {
      id: 4,
      name: "Norway",
      description1:
        "Immerse yourself in the allure of Norway, where stunning fjords, Northern Lights, and rich cultural heritage await. With Thrillers Travels by your side, the journey to Norway becomes a smooth one. Our visa expertise paves the way for you to experience the magic of this Nordic wonderland.",
      description2:
        "Don't wait any longer to embark on your journey to Canada, Australia, Norway, or the United Kingdom! Let Thrillers Travels be your guide, turning your travel aspirations into unforgettable realities.",
      image: "/assets/images/topCountries/norway.jpeg",
      interval: "3 Months",
    },
  ];

  const router = useRouter();

  return (
    <CountryWrapper style={{ marginBottom: isMobile ? "3rem" : "10rem" }}>
      <SectionLayout>
        <SectionTitle
          title="Our top countries"
          description="Going somewhere to celebrate this season? Whether you’re going home or somewhere to roam, we’ve got the travel tools to get you to your destination."
          buttonText="See all"
        />
        {isMobile ? (
          <>
            <RightSide style={{ margin: "2rem 0" }}>
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
                      Get {countries[activeImage - 1].name} Work visa
                    </CountryName>
                    <IntervalTag>
                      <IntervalText>Work-visa</IntervalText>
                      <IntervalDays>3 Months</IntervalDays>
                    </IntervalTag>

                    <CountryDescription
                      style={{
                        marginTop: isMobile ? "9px" : "50px",
                        fontSize: isMobile ? "14px" : "1rem",
                        lineHeight: isMobile ? "18px" : "14px",
                      }}
                    >
                      {countries[activeImage - 1].description1}
                      {/* {countries[activeImage - 1].description2} */}
                    </CountryDescription>

                    <Button className="country-button">
                      Apply to {countries[activeImage - 1].name}
                    </Button>
                  </CountryInfo>
                )}
              </LeftSide>
            </Grid>
          </>
        ) : (
          <Grid columns="2" gap="1rem" align="unset">
            <LeftSide>
              {activeImage !== null && (
                <CountryInfo>
                  <LeftHeaderText>
                    <IntervalTag>
                      <IntervalText>Work-visa</IntervalText>
                      <IntervalDays>3 Months</IntervalDays>
                    </IntervalTag>
                    <CountryName>
                      Get {countries[activeImage - 1].name} Work visa
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
      </SectionLayout>
    </CountryWrapper>
  );
};

export default TopCountriesSection;
