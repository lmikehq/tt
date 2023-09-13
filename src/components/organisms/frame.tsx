"use client";
import styled from "styled-components";
import Text from "@atom/text";
import { Grid } from "@components/templates/grid";
import Image from "@atom/image";
import { FaPaperPlane } from "react-icons/fa";
import Button from "@atom/button";
import { useRouter } from "next/navigation";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import Flex from "@components/templates/flex";
import SectionLayout from "@components/templates/sectionLayout";

const FrameWrapper = styled.div`
  margin: 5rem 0;
`;
const ServiceCard = styled.div`
  display: block;
  height: 25rem;

  & img {
    // width: 100%;
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

    & h2 {
      margin-top: 4.5rem;
      // font-weight: 900;
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
      left: 0
    }
  }
`;

const serviceCard = [
  {
    id: 1,
    img: "/assets/images/serviceCard/visas.png",
    title: "Visas",
    description: "Apply for a visa to over 200 countries around the world.",
    button: "Book visa",
    icon: <FaPaperPlane size={14} />,
    url: "/visa",
  },

  {
    id: 2,
    img: "/assets/images/serviceCard/flight.png",
    title: "Flights",
    description:
      "Travel the world with cheap flights, exclusive deals, and more.",
    button: "Search flights",
    icon: <FaPaperPlane size={14} />,
    url: "/flight",
  },

  {
    id: 3,
    img: "/assets/images/serviceCard/travel.png",
    title: "Travel Guide",
    description: "Get the best travel tips from our experts",
    button: "Explore guide",
    icon: <FaPaperPlane size={14} />,
    url: "/contact-us",
  },

  {
    id: 4,
    img: "/assets/images/serviceCard/hotel.png",
    title: "Hotels",
    description: "Book hotels in over 100 countries around the world.",
    button: "Show hotels",
    icon: <FaPaperPlane size={14} />,
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
      <SectionLayout>
        <Grid
          columns={isMobile ? "1fr" : "2"}
          gap="2rem"
          style={{
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          }}
        >
          {serviceCard.map((item) => (
            <ServiceCard key={item.id} style={{ position: "relative" }}>
              <Image src={item.img} alt="card image" />
              <FrameInfo>
                <Text type="h2" text={item.title} weight={700} />
                <Text type="p" text={item.description} />
                <Button
                  zIndex="1"
                  background="var(--primary-color)"
                  padding="1rem 1.3rem"
                  styles={{
                    width: isMobile ? "50%" : "40%",
                    marginTop: isMobile ? ".5rem" : "0",
                  }}
                  color="var(--secondary-color)"
                  onClick={applyButton}
                >
                  <Flex gap=".5rem" justify="center" align="center">
                    {item.icon}
                    <Text type="span" text={item.button} whiteSpace="nowrap" />
                  </Flex>
                </Button>
              </FrameInfo>
            </ServiceCard>
          ))}
        </Grid>
      </SectionLayout>
    </FrameWrapper>
  );
};

export default Frame;
