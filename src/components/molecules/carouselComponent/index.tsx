import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { Grid } from "@components/templates/grid";
import Text from "@atom/text";
import { ttColors } from "@lib/theme/colors";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";

// Here's your styled card
const CarouselWrapper = styled.div`
  .slick-slide div {
    outline: none;
  }

  & h1 {
    margin-bottom: 1rem;
    font-weight: 600;
    color: ${ttColors.primary};
  }
`;
const CarouselCard = styled.div`
  padding: 20px;
  background: #fff;
  height: 320px;
  border-radius: 10px;
  margin: 1rem auto;
  border: 1px solid #ddd;

  &:hover {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    border: 2px solid ${ttColors.primary};
  }

  @media screen and (max-width: 900px) {
    height: 250px;
  }
`;

const CardTitle = styled.h2`
  margin: 0;
  color: ${ttColors.dark};
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const CardDescription = styled.p`
  color: #333;
  line-height: 1.8;
`;

const StyledSlider = styled(Slider)`
  .slick-slide > div {
    margin: 0 10px; // Adjust this value to control the gap between slides
  }
`;

// The CarouselCard component
const Carousel: React.FC<{
  items: { id: number; title: string; description: string }[];
}> = ({ items }) => {
  const { isMobile } = useScreenResolution();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <CarouselWrapper>
      <Text
        type="h1"
        text="Our Core Values"
        size={isMobile ? "2rem" : "2.5rem"}
      />
      <StyledSlider {...settings}>
        {items.map((item) => (
          <Grid columns="1fr" gap="1rem" key={item.id}>
            <CarouselCard>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CarouselCard>
          </Grid>
        ))}
      </StyledSlider>
    </CarouselWrapper>
  );
};

export default Carousel;
