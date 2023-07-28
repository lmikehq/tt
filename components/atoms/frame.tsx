"use client";
import styled from "styled-components";
import Text from "@atom/text";
import { Grid } from "@atom/grid";
import Image from "next/image";
import { FaPaperPlane } from "react-icons/fa";
import Button from "@atom/button";
import FrameLayout from "@layout/sectionLayout";
import VisaImg from "@image/serviceCard/visas.png";
import FlightImg from "@image/serviceCard/flight.png";
import HotelImg from "@image/serviceCard/hotel.png";
import TravelImg from "@image/serviceCard/travel.png";
import { useRouter } from "next/navigation";
import { useScreenResolution } from "hook/useScreenResolution";
import Flex from "./flex";

const FrameWrapper = styled.div`
  margin: 5rem 0;
`;
const ServiceCard = styled.div`
  display: block;

  & img {
    width: 100%;
    height: 25rem;
    border-radius: 24px;
  }
`;

const FrameInfo = styled.div`
    position: absolute;
    width: 100%;
    height: 12.25rem;
    // width: 35.4rem;
    height: 16.5rem;
    left: 0;
    top: 8.6rem;
    text-align: center;
    color: var(--default-color);

    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 17%,
      rgba(18, 18, 18, 0.75) 48.67%
    );

    
    border-radius: 0px 0px 24px 24px;

    & h3 {
      margin-top: 4.5rem;
      font-weight: 700;
      font-size: 40px;
      line-height: 60px;
      padding-bottom: 0.5rem;
    }

    & p {
      padding-bottom: 0.5rem;
      font-weight: 400;
      font-size: 16px;
      line-height: 20px;
      text-align: center;
      height: 40px;
      margin: 0 auto;
      margin-bottom: 1rem;

      @media screen and (max-width: 600px){
        width: 85%;
      }
    }

    & button {
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
    }
  }
`;

const serviceCard = [
  {
    id: 1,
    img: VisaImg,
    title: "Visas",
    description:
      "Search Flights & Places Hire to our most popular destinations",
    button: "Book visa",
    icon: <FaPaperPlane />,
  },

  {
    id: 2,
    img: FlightImg,
    title: "Flights",
    description:
      "Search Flights & Places Hire to our most popular destinations",
    button: "Search flights",
    icon: <FaPaperPlane />,
  },

  {
    id: 3,
    img: TravelImg,
    title: "Travel Guide",
    description:
      "Search Flights & Places Hire to our most popular destinations",
    button: "Explore guide",
    icon: <FaPaperPlane />,
  },

  {
    id: 4,
    img: HotelImg,
    title: "Hotels",
    description:
      "Search Flights & Places Hire to our most popular destinations",
    button: "Show hotels",
    icon: <FaPaperPlane />,
  },
];

const Frame: React.FC = () => {
  const { isMobile } = useScreenResolution();
  const router = useRouter();

  const applyButton = () => {
    router.push("/visa");
  };

  return (
    <FrameWrapper style={{ marginTop: isMobile ? "3rem" : "5rem" }}>
      <FrameLayout>
        <Grid columns={isMobile ? "1fr" : "repeat(2, 1fr)"} gap="2rem">
          {serviceCard.map((item) => (
            <ServiceCard key={item.id} style={{ position: "relative" }}>
              <Image src={item.img} alt="card image" />
              <FrameInfo>
                <Text type="h3" text={item.title} />
                <Text type="p" text={item.description} />
                <Button
                  zIndex="1"
                  background="var(--primary-color)"
                  padding="1rem 1.3rem"
                  styles={{ width: isMobile ? "50%" : "27%" }}
                  color="var(--secondary-color)"
                  onClick={applyButton}
                >
                  <Flex gap=".5rem">
                    {item.icon}
                    <Text type="span" text={item.button} whiteSpace="nowrap" />
                  </Flex>
                </Button>
              </FrameInfo>
            </ServiceCard>
          ))}
        </Grid>
      </FrameLayout>
    </FrameWrapper>
  );
};

export default Frame;
