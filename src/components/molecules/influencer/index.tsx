"use client";

import Button from "@/components/atoms/button";
import Image from "@/components/atoms/image";
import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import { Grid } from "@/components/templates/grid";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { ttColors } from "@/lib/theme/colors";
import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { GiPassport } from "react-icons/gi";
import { IoBed } from "react-icons/io5";
import { RiPlaneLine } from "react-icons/ri";
import styled from "styled-components";

import Umbrella from "/public/assets/images/influencer/Icon/umbrella.svg";
import Location from "/public/assets/images/influencer/Icon/location.svg";
import Book from "/public/assets/images/influencer/Icon/book.svg";

const HeroImg = styled.div`
  position: relative;
  object-fit: cover;

  @media (max-width: 900px) {
    display: none;
  }
`;

const HeroCard = styled.div`
  position: absolute;
  width: 552px;
  height: fit-content;
  top: 80px;
  left: 80px;
  border-radius: 12px;
  background: #fff;
  padding: 30px;

  @media (max-width: 900px) {
    width: 100%;
    position: relative;
    background: #e7e7e76e;
    border: 1px solid #e7e7e7;
    top: 0;
    left: 0;
  }
`;

const InfluencerIcon = styled.div`
  width: 116px;
  height: 93px;
  border-radius: 6px;
  background: #7bbbd6;
  color: #fff;
  padding: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 900px) {
    width: 87px;
    height: 70px;
  }
`;

const Box = styled.div`
  width: 123px;
  height: 102px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  cursor: pointer;

  .icon {
    color: #87ceeb;
  }

  &.active-icon {
    background: #fff;
    .icon {
      color: #6092a7;
    }
  }

  @media (max-width: 900px) {
    height: 70px;
    width: 77px;
  }
`;

const SmallBox = styled.div`
  width: 70px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  background: #83cceb40;

  .icon {
    color: #6092a7;
  }

  @media (max-width: 900px) {
    height: 40px;
    width: 50px;
  }
`;

// const Card = styled.div`
//   background: #7bbbd6;
//   width: 100%;
//   height: 377px;
//   border-radius: 16px;
//   padding: 20px;
//   text-align: center;
//   color: #fff;

//   &:nth-child(2) {
//     background: #afdef26b;
//     color: #6092a7;
//     border: 1px solid #afdef2;

//     &:hover {
//       background: #7bbbd6;
//       color: #fff;
//     }
//   }

//   &:nth-child(3) {
//     background: #afdef26b;
//     color: #6092a7;
//     border: 1px solid #afdef2;

//     &:hover {
//       background: #7bbbd6;
//       color: #fff;
//     }
//   }
// `;

const Card = styled.div`
  background: #afdef26b;
  width: 100%;
  height: 377px;
  border-radius: 16px;
  padding: 13px;
  text-align: center;
  color: #fff;
  position: relative;

  &:nth-child(1),
  &:nth-child(2),
  &:nth-child(3) {
    background: #afdef26b;
    color: #6092a7;
    border: 1px solid #afdef2;

    &:hover {
      background: #7bbbd6;
      color: #fff;
      & > *:first-child {
        filter: brightness(0) invert(1);
      }
    }
  }

  @media (max-width: 900px) {
    height: 300px;
    width: 350px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  //   display: grid;
  //   grid-template-columns: 1fr 1fr;
`;

const OfferCard = styled.div`
  width: 227px;
  height: 83px;
  position: absolute;
  top: 44%;
  left: -16%;
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #fff;
  box-shadow: 0px 4px 4px 0px #0000000d;

  @media (max-width: 900px) {
    display: none;
  }
`;

const OfferCardTwo = styled.div`
  width: 337px;
  height: 98px;
  position: absolute;
  bottom: -7%;
  left: 20%;
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #fff;
  box-shadow: 0px 4px 4px 0px #0000000d;

  @media (max-width: 900px) {
    height: 85px;
    width: 291px;
    left: 9%;
    bottom: -11%;
  }
`;

const InfluencerImage = styled.div`
  height: 430px;
  borderradius: 16px;
  display: none;

  & img {
    height: 100%;
    objectfit: "cover";
    width: 100%;
    border-radius: 16px;
  }

  @media (max-width: 900px) {
    display: flex;
    margin-bottom: 30px;
  }
`;

const InfluencerPage = () => {
  const { isMobile } = useScreenResolution();
  const [activeIcon, setActiveIcon] = useState<string>("Passport");
  const [hoveredIconText, setHoveredIconText] = useState("");
  const iconData = [
    {
      icon: (
        <GiPassport
          size="2rem"
          className={`icon ${activeIcon === "Passport" ? "active" : ""}`}
        />
      ),
      text: "Apply for Visa at your own convenience on our platform",
      key: "Passport",
    },
    {
      icon: (
        <RiPlaneLine
          size="2rem"
          className={`icon ${activeIcon === "Plane" ? "active" : ""}`}
        />
      ),
      text: "Book Flight at your own convenience on our platform",
      key: "Plane",
    },
    {
      icon: (
        <IoBed
          size="2rem"
          className={`icon ${activeIcon === "Bed" ? "active" : ""}`}
        />
      ),
      text: "Rent Stays at your own convenience on our platform",
      key: "Bed",
    },
  ];

  const handleIconHover = (text: string, key: string) => {
    setHoveredIconText(text);
    setActiveIcon(key);
  };

  const handleIconLeave = () => {
    setHoveredIconText(
      iconData.find((item) => item.key === activeIcon)?.text || ""
    );
  };

  return (
    <>
      <div>
        <HeroImg>
          <Image
            src="/assets/images/influencer/heroImg.png"
            alt=""
            styles={{ borderRadius: "8px" }}
            height={806}
          />
        </HeroImg>
        <InfluencerImage>
          <Image
            src="/assets/images/influencer/influencerImg.png"
            alt="influencer picture"
          />
        </InfluencerImage>
        <HeroCard>
          <Flex gap="1rem" margin={isMobile ? "0 auto 1.5rem" : "0 auto 1rem"}>
            <InfluencerIcon>
              <Text
                type="h5"
                text="THRILLERS INFLUENCER"
                weight={600}
                size={isMobile ? 12 : 14}
              />
            </InfluencerIcon>
            <Flex direction="column">
              <Text
                type="p"
                text="You were Invited by"
                color="#000000"
                weight={400}
                size={isMobile ? 13 : 16}
              />
              <Text
                type="h3"
                text="Sabinus"
                color="#000000"
                weight={600}
                size={28}
              />
            </Flex>
          </Flex>
          <Flex direction="column">
            <Text
              type="p"
              text={
                hoveredIconText ||
                "Apply for Visa at your own convenience on our platform"
              }
              weight={500}
              size={18}
              styles={{ lineHeight: isMobile ? "30px" : "36px" }}
              width={isMobile ? 300 : 425}
            />
            <Flex
              align="center"
              width="100%"
              background="#c8e8f680"
              height={isMobile ? "105px" : "145px"}
              borderRadius="12px"
              border="1px solid #c8e8f6"
              borderBottom="1px solid #c8e8f6"
              margin="2.5rem 0"
              padding={isMobile ? "10px" : "20px"}
              justify="space-between"
            >
              {/* <Box>
                <GiPassport size="2rem" className="icon" />
              </Box>
              <Box>
                <RiPlaneLine size="2rem" className="icon" />
              </Box>
              <Box>
                <IoBed size="2rem" className="icon" />
              </Box> */}
              {iconData.map((item, index) => (
                <Box
                  key={index}
                  onClick={() => handleIconHover(item.text, item.key)}
                  onMouseLeave={handleIconLeave}
                  className={activeIcon === item.key ? "active-icon" : ""}
                >
                  {item.icon}
                </Box>
              ))}
            </Flex>
          </Flex>

          <Button width="100%" background={ttColors.dark}>
            <Text type="h3" text="Get Started" weight={500} size={16} />
          </Button>
        </HeroCard>
      </div>

      <Flex
        direction="column"
        margin={isMobile ? "3rem auto" : "5rem auto"}
        justify="center"
        align="center"
      >
        <Flex
          direction="column"
          margin="0 auto 2rem"
          justify="center"
          align="center"
          styles={{ textAlign: "center" }}
          gap={isMobile ? ".3rem" : "1rem"}
        >
          <Text
            type="h2"
            text="WHY THRILLERS TRAVELS?"
            size={isMobile ? 22 : 30}
            weight={700}
            styles={{ lineHeight: "48px" }}
          />
          <Text
            type="p"
            text="At Thrillers Travels, we redefine the art of travel, offering unparalleled journeys to destinations that inspire and captivate."
            color="#606060"
            size={isMobile ? 14 : 16}
            weight={400}
            width={isMobile ? 345 : 620}
            styles={{ textAlign: "center" }}
          />
        </Flex>

        <Grid
          columns={isMobile ? "1" : "3"}
          gap="1rem"
          margin={isMobile ? ".3rem 0" : "5rem auto"}
        >
          <Card>
            <Flex
              direction="column"
              justify="center"
              align="center"
              gap="1rem"
              margin="0 0 1.5rem"
            >
              <Image
                src={Book}
                alt=""
                width={isMobile ? 46.01 : 60.01}
                height={isMobile ? 46 : 60}
              />
              <Text
                type="p"
                text="Plan a Trip"
                weight={600}
                size={isMobile ? 20 : 24}
              />
            </Flex>
            <Text
              type="p"
              text="Embark on a hassle-free journey with Thrillers Travels as we take care of every detail of your trip planning.  Our team creates customized itineraries that match your preferences."
              size={isMobile ? 15 : 18}
              weight={500}
            />
          </Card>

          <Card>
            <Flex
              direction="column"
              justify="center"
              align="center"
              gap="1rem"
              margin="0 0 1.5rem"
            >
              <Image
                src={Location}
                alt=""
                width={isMobile ? 46.01 : 60.01}
                height={isMobile ? 46 : 60}
              />
              <Text
                type="p"
                text="Explore Trips"
                weight={600}
                size={isMobile ? 20 : 24}
              />
            </Flex>
            <Text
              type="p"
              text="Get ready to explore the world's wonders with Thrillers Travels. Our handpicked trips offer a gateway to diverse destinations and captivating experiences."
              size={isMobile ? 15 : 18}
              weight={500}
            />
          </Card>

          <Card>
            <Flex
              direction="column"
              justify="center"
              align="center"
              gap="1rem"
              margin="0 0 1.5rem"
            >
              <Image
                src={Umbrella}
                alt=""
                width={isMobile ? 68.01 : 60.01}
                height={isMobile ? 46 : 60}
              />
              <Text
                type="p"
                text="Enjoy your Trips"
                weight={600}
                size={isMobile ? 20 : 24}
              />
            </Flex>
            <Text
              type="p"
              text="Relax, unwind, and fully enjoy your Travel Journey with Thrillers Travels. We are dedicated to making every moment of your journey memorable and fun."
              size={isMobile ? 15 : 18}
              weight={500}
            />
          </Card>
        </Grid>
      </Flex>

      <Flex
        direction="column"
        margin={isMobile ? "3rem auto" : "5rem auto"}
        justify="center"
        align="center"
        styles={{ textAlign: isMobile ? "center" : "unset" }}
      >
        <Flex
          direction="column"
          margin={isMobile ? "0 0 2rem" : "0 auto 4rem"}
          justify="center"
          align="center"
          gap={isMobile ? "1.3rem" : "1rem"}
        >
          <Text
            type="h2"
            text="WHAT WE OFFER AT THRILLERS TRAVELS"
            size={isMobile ? 20 : 30}
            weight={700}
            styles={{ lineHeight: isMobile ? "33px" : "48px" }}
          />
          <Text
            type="p"
            text="Here are all we offer at Thrillers Travels"
            color="#606060"
            size={16}
            weight={400}
            width={620}
            styles={{ textAlign: "center" }}
          />
        </Flex>

        {isMobile ? (
          <>
            <Wrapper>
              <Image
                src="/assets/images/influencer/subHeroImg.png"
                alt=""
                styles={{
                  borderRadius: "8px",
                  width: "100%",
                  objectFit: "cover",
                }}
                height={isMobile ? 384 : 576}
              />
              <OfferCard>
                <Flex gap=".8rem">
                  <Image
                    src="/assets/images/influencer/user2.png"
                    alt=""
                    width={52}
                    height={52}
                  />
                  <Flex direction="column">
                    <Text type="p" text="Daniella Frank" />
                    <Flex justify="flex-start" align="center" gap=".5rem">
                      <AiFillStar color="#FFA800" />{" "}
                      <Text type="p" text="4.8" />
                    </Flex>
                  </Flex>
                </Flex>
              </OfferCard>

              <OfferCardTwo>
                <Flex gap=".8rem" align={isMobile ? "flex-start" : "center"}>
                  <Image
                    src="/assets/images/influencer/user1.png"
                    alt=""
                    width={isMobile ? 48 : 52}
                    height={isMobile ? 48 : 52}
                  />
                  <Flex
                    direction="column"
                    justify="flex-start"
                    align="flex-start"
                  >
                    <Text
                      type="p"
                      text="Felix Peters"
                      weight={400}
                      size={isMobile ? 16 : 18}
                    />
                    <Text
                      type="p"
                      text="Thrillers Travels has always been the best travel platform"
                      color="#606060"
                      size={isMobile ? 12 : 14}
                      width={isMobile ? 215 : 237}
                      styles={{ textAlign: "left" }}
                    />
                  </Flex>
                </Flex>
              </OfferCardTwo>
            </Wrapper>
            <Flex
              justify={isMobile ? "flex-start" : "space-between"}
              direction="column"
              gap={isMobile ? "1.5rem" : "0px"}
              margin={isMobile ? "5.5rem 0" : "2rem 0"}
              align={isMobile ? "flex-start" : "center"}
            >
              <Flex
                direction="row"
                margin="0 auto"
                align="flex-start"
                gap=".8rem"
              >
                <SmallBox>
                  <RiPlaneLine size="1.5rem" className="icon" />
                </SmallBox>
                <Flex
                  direction="column"
                  gap=".5rem"
                  justify={isMobile ? "flex-start" : "center"}
                  align={isMobile ? "flex-start" : "center"}
                >
                  <Text
                    type="h3"
                    text="Flight Booking"
                    weight={600}
                    size={isMobile ? 20 : 22}
                  />
                  <Text
                    type="p"
                    text="Experience seamless flight booking with Thrillers Travels. We're your ticket to exploring the world. We ensure hassle-free reservations, competitive fares, and travel itineraries tailored to your needs"
                    weight={400}
                    size={isMobile ? 14 : 16}
                    color={isMobile ? "#414141" : "#000000"}
                    width={isMobile ? 300 : 400}
                    styles={{ textAlign: isMobile ? "start" : "center" }}
                  />
                </Flex>
              </Flex>

              <Flex
                direction="row"
                margin="0 auto"
                align="flex-start"
                gap=".8rem"
              >
                <SmallBox>
                  <GiPassport size="1.5rem" className="icon" />
                </SmallBox>
                <Flex
                  direction="column"
                  gap=".5rem"
                  justify={isMobile ? "flex-start" : "center"}
                  align={isMobile ? "flex-start" : "center"}
                >
                  <Text
                    type="h3"
                    text="Visa Application"
                    weight={600}
                    size={isMobile ? 20 : 22}
                  />
                  <Text
                    type="p"
                    text="Simplify your visa application process with Thrillers Travels. Our experts guide you through the intricate details, making obtaining the necessary visas a breeze."
                    weight={400}
                    size={isMobile ? 14 : 16}
                    color={isMobile ? "#414141" : "#000000"}
                    width={isMobile ? 300 : 400}
                    styles={{ textAlign: isMobile ? "start" : "center" }}
                  />
                </Flex>
              </Flex>

              <Flex
                direction="row"
                margin="0 auto"
                align="flex-start"
                gap=".8rem"
              >
                <SmallBox>
                  <IoBed size="1.5rem" className="icon" />
                </SmallBox>
                <Flex
                  direction="column"
                  gap=".5rem"
                  justify={isMobile ? "flex-start" : "center"}
                  align={isMobile ? "flex-start" : "center"}
                >
                  <Text
                    type="h3"
                    text="Rent Stays"
                    weight={600}
                    size={isMobile ? 20 : 22}
                  />
                  <Text
                    type="p"
                    text="Find your home away from home with Thrillers Travels' rent stay services. We offer a range of accommodation options, from cozy apartments to luxurious villas, tailored to your destination"
                    weight={400}
                    size={isMobile ? 14 : 16}
                    color={isMobile ? "#414141" : "#000000"}
                    width={isMobile ? 300 : 400}
                    styles={{ textAlign: isMobile ? "start" : "center" }}
                  />
                </Flex>
              </Flex>
            </Flex>
          </>
        ) : (
          <Grid columns={isMobile ? "1" : "2"} gap={isMobile ? "1rem" : "2rem"}>
            <Flex
              justify={isMobile ? "flex-start" : "space-between"}
              direction="column"
              gap="0px"
              margin="2rem 0"
              align={isMobile ? "flex-start" : "center"}
            >
              <Flex
                direction="row"
                margin="0 auto"
                align="flex-start"
                gap=".8rem"
                justify="flex-start"
              >
                <SmallBox>
                  <RiPlaneLine size="1.5rem" className="icon" />
                </SmallBox>
                <Flex
                  direction="column"
                  gap=".5rem"
                  justify="flex-start"
                  align="flex-start"
                >
                  <Text
                    type="h3"
                    text="Flight Booking"
                    weight={600}
                    size={22}
                  />
                  <Text
                    type="p"
                    text="Experience seamless flight booking with Thrillers Travels. We're your ticket to exploring the world. We ensure hassle-free reservations, competitive fares, and travel itineraries tailored to your needs"
                    weight={400}
                    size={16}
                    width={isMobile ? 300 : 400}
                    styles={{ textAlign: "left" }}
                  />
                </Flex>
              </Flex>

              <Flex
                direction="row"
                margin="0 auto"
                align="flex-start"
                gap=".8rem"
                justify="flex-start"
              >
                <SmallBox>
                  <GiPassport size="1.5rem" className="icon" />
                </SmallBox>
                <Flex
                  direction="column"
                  gap=".5rem"
                  justify="flex-start"
                  align="flex-start"
                >
                  <Text
                    type="h3"
                    text="Visa Application"
                    weight={600}
                    size={22}
                  />
                  <Text
                    type="p"
                    text="Simplify your visa application process with Thrillers Travels. Our experts guide you through the intricate details, making obtaining the necessary visas a breeze."
                    weight={400}
                    size={16}
                    width={isMobile ? 300 : 400}
                    styles={{ textAlign: "left" }}
                  />
                </Flex>
              </Flex>

              <Flex
                direction="row"
                margin="0 auto"
                align="flex-start"
                gap=".8rem"
                justify="flex-start"
              >
                <SmallBox>
                  <IoBed size="1.5rem" className="icon" />
                </SmallBox>
                <Flex
                  direction="column"
                  gap=".5rem"
                  justify="flex-start"
                  align="flex-start"
                >
                  <Text type="h3" text="Rent Stays" weight={600} size={22} />
                  <Text
                    type="p"
                    text="Find your home away from home with Thrillers Travels' rent stay services. We offer a range of accommodation options, from cozy apartments to luxurious villas, tailored to your destination"
                    weight={400}
                    size={16}
                    width={isMobile ? 300 : 400}
                    styles={{ textAlign: "left" }}
                  />
                </Flex>
              </Flex>
            </Flex>

            <Wrapper>
              <Image
                src="/assets/images/influencer/subHeroImg.png"
                alt=""
                styles={{
                  borderRadius: "8px",
                  width: "100%",
                  objectFit: "cover",
                }}
                height={isMobile ? 384 : 576}
              />
              <OfferCard>
                <Flex gap=".8rem">
                  <Image
                    src="/assets/images/influencer/user2.png"
                    alt=""
                    width={52}
                    height={52}
                  />
                  <Flex direction="column">
                    <Text type="p" text="Daniella Frank" />
                    <Flex justify="flex-start" align="center" gap=".5rem">
                      <AiFillStar color="#FFA800" />{" "}
                      <Text type="p" text="4.8" />
                    </Flex>
                  </Flex>
                </Flex>
              </OfferCard>

              <OfferCardTwo>
                <Flex gap=".8rem" align={isMobile ? "flex-start" : "center"}>
                  <Image
                    src="/assets/images/influencer/user1.png"
                    alt=""
                    width={isMobile ? 48 : 52}
                    height={isMobile ? 48 : 52}
                  />
                  <Flex
                    direction="column"
                    justify="flex-start"
                    align="flex-start"
                  >
                    <Text
                      type="p"
                      text="Felix Peters"
                      weight={400}
                      size={isMobile ? 16 : 18}
                    />
                    <Text
                      type="p"
                      text="Thrillers Travels has always been the best travel platform"
                      color="#606060"
                      size={isMobile ? 12 : 14}
                      width={isMobile ? 215 : 237}
                      styles={{ textAlign: "left" }}
                    />
                  </Flex>
                </Flex>
              </OfferCardTwo>
            </Wrapper>
          </Grid>
        )}
      </Flex>

      <Flex
        margin={isMobile ? "-5rem 0" : "10rem auto"}
        justify={isMobile ? "center" : "space-between"}
        align={isMobile ? "center" : "flex-start"}
        styles={{ textAlign: "left" }}
        width="100%"
        gap="1.5rem"
        direction={isMobile ? "column" : "row"}
      >
        <Flex
          gap={isMobile ? "1.3rem" : "1rem"}
          width={isMobile ? "100%" : "50%"}
          direction={isMobile ? "column" : "row"}
          align={isMobile ? "center" : "flex-end"}
        >
          <Image
            src="/assets/images/influencer/frame1.png"
            alt=""
            height={isMobile ? 375 : 506}
            width={isMobile ? 369 : 378}
            styles={{
              objectFit: "cover",
              borderRadius: isMobile ? "20px" : "auto",
            }}
          />
          <Flex
            direction={isMobile ? "row" : "column"}
            gap=".5rem"
            justify={isMobile ? "center" : "flex-end"}
          >
            <Image
              src="/assets/images/influencer/frame2.png"
              alt=""
              height={isMobile ? 112 : 144}
              width={isMobile ? 121 : 151}
              styles={{ objectFit: "cover", height: "100px" }}
            />
            <Image
              src="/assets/images/influencer/frame3.png"
              alt=""
              height={isMobile ? 112 : 144}
              width={isMobile ? 121 : 151}
              styles={{ objectFit: "cover", height: "100px" }}
            />
            <Image
              src="/assets/images/influencer/frame4.png"
              alt=""
              height={isMobile ? 112 : 144}
              width={isMobile ? 121 : 151}
              styles={{ objectFit: "cover", height: "100px" }}
            />
          </Flex>
        </Flex>

        <Flex
          width={isMobile ? "100%" : "43%"}
          align={isMobile ? "center" : "flex-start"}
        >
          <Flex
            direction="column"
            margin={isMobile ? "2rem 0" : "0 auto 2rem"}
            gap={isMobile ? "1.3rem" : "1rem"}
          >
            <Text
              type="h2"
              text="PREPARE YOURSELF TO SEE THE WORLD WITH US"
              size={isMobile ? 20 : 30}
              weight={700}
              styles={{ lineHeight: isMobile ? "30px" : "40px" }}
            />
            <Text
              type="p"
              text="Prepare for an exhilarating global adventure with Thrillers Travels by following these steps: Dream big and envision your ideal destinations, research to make informed choices, budget wisely with our assistance, consult our experts, pack smart, prioritize health and safety, ensure your documentation is in order with our visa assistance, stay informed, embrace local culture, and embark on your journey with an open heart. Thrillers Travels is your partner in turning travel dreams into unforgettable memories."
              color="#606060"
              size={16}
              weight={400}
              styles={{ textAlign: "left" }}
            />
            <Button
              width={isMobile ? "100%" : "50%"}
              margin="2rem 0 0"
              background={ttColors.dark}
            >
              <Text type="h3" text="Get Started" weight={500} size={16} />
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default InfluencerPage;
