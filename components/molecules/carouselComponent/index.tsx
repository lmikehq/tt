// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import styled from "styled-components";

// import React from "react";
// import Slider from "react-slick";

// const StyledCard = styled.div`
//   border-left: 2px solid #19013b;
//   box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.07),
//               0 5px 15px 0 hsla(0, 0%, 0%, 0.1);
//   padding: 16px;
//   margin: 16px 0;
//   background: white;
// `;

// const CardTitle = styled.h3`
//   margin-bottom: 1rem;
// `;

// const CardDescription = styled.p`
//   margin-bottom: 1rem;
// `;

// interface CarouselCardProps {
//   title?: string;
//   description?: string;
//   children: ReactNode;
//   settings: Settings;
// }

// const Carousel: React.FC<CarouselCardProps> = ({ children }) => {
//     return (
//       <StyledCard>
//         <CardTitle>{title}</CardTitle>
//         <CardDescription>{description}</CardDescription>
//         <Carousel {...settings}>{children}</Carousel>
//       </StyledCard>
//     );
// };

// export default Carousel;

// below
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { Grid } from "@atom/grid";
import Text from "@atom/text";
import { ttColors } from "theme/colors";



// Here's your styled card
const CarouselWrapper = styled.div`
  .slick-slide div {
    outline: none;
  }

  & h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    font-weight: 600;
    color: ${ttColors.primary};
  }
`;
const CarouselCard = styled.div`
  padding: 20px;
  background: #fff;
  height: 300px;
  border-radius: 10px;
  margin: 1rem auto;
  border: 1px solid #ddd;

  &:hover {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  }
`;

const CardTitle = styled.h2`
  margin: 0;
  color: #19013b;
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
  

 

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <CarouselWrapper>
      <Text type="h1" text="Our Core Values" />
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
