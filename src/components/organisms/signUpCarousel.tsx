import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Section from "src/components/molecules/section";
import { useScreenResolution } from "@lib/hook/useScreenResolution";

interface SignUpCarouselProps {
  images: string[];
}

const SignUpCarousel: React.FC<SignUpCarouselProps> = ({ images }) => {
  const { isMobile } = useScreenResolution();
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <Section styles={{ display: isMobile ? "none" : "block" }}>
      <Slider {...settings}>
        {images.map((imageSrc, index) => (
          <div key={index}>
            <img
              src={imageSrc}
              alt={`background image ${index}`}
              width="100%"
              height="798px"
              style={{ borderRadius: "30px", objectFit: "cover" }}
            />
          </div>
        ))}
      </Slider>
    </Section>
  );
};

export default SignUpCarousel;
