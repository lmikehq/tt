import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import React, { useEffect, useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Slider from "react-slick";
import {
  SlideCard,
  SlideContent,
  SlideList,
  SliderImgBox,
  SliderWidth,
} from "./components/styles";
import Link from "@/components/atoms/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// REACT SLICK BUTTON
const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div className="control_btn stay_landing l_flex" onClick={onClick}>
      <button className="prev l_flex">
        <KeyboardArrowLeftIcon className="icon" />
      </button>
    </div>
  );
};

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div className="control_btn stay_landing" onClick={onClick}>
      <button className="next l_flex">
        <KeyboardArrowRightIcon className="icon" />
      </button>
    </div>
  );
};

interface Destination {
  name: string;
  image: string;
  num_hotels: number;
}

const destinations: Destination[] = [
  {
    name: "Dubai",
    image: "/assets/images/stays/img1.png",
    num_hotels: 1300,
  },
  {
    name: "France",
    image: "/assets/images/stays/img2.png",
    num_hotels: 1200,
  },
  {
    name: "Turkey",
    image: "/assets/images/stays/img3.png",
    num_hotels: 326,
  },
  {
    name: "Turkey",
    image: "/assets/images/stays/img3.png",
    num_hotels: 326,
  },
];
function TrendingDestination() {
  const { isMobile } = useScreenResolution();

  //===========
  //REACT SLICK
  //===========
  const [slidesToShow, setSlidesToShow] = useState(1);
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1200) {
        setSlidesToShow(Math.min(3, destinations.length));
      } else if (screenWidth >= 600) {
        setSlidesToShow(Math.min(2, destinations.length));
      } else {
        setSlidesToShow(Math.min(1, destinations.length));
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [destinations.length]);

  const SliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div>
      <Flex direction="column">
        <Flex
          direction="column"
          gap=".65rem"
          wrap={isMobile ? "unset" : "wrap"}
          styles={{ marginBottom: "20px" }}
        >
          <Text
            type="h1"
            text="Trending Destinations"
            font="Montserrat"
            weight={700}
            size={36}
          />
          <Text
            type="p"
            text="Here are the most popular choices for travellers from Nigeria."
            size={18}
            whiteSpace={isMobile ? "unset" : "nowrap"}
          />
        </Flex>
      </Flex>
      <SlideContent className="stay_slider_content">
        <SliderWidth className="stay_slider_height">
          <Slider {...SliderSettings} className="">
            {destinations.map((destination, index) => (
              <SlideCard key={index}>
                <SlideList>
                  <SliderImgBox className="stay_landing_trending">
                    <Link href="" className="image-container">
                      <img
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "12px",
                        }}
                        src={destination.image}
                        alt={destination.name}
                      />
                    </Link>
                  </SliderImgBox>

                  <Flex direction="column" className="text_styles">
                    <Link href="">
                      <Text
                        type="h2"
                        text={destination.name}
                        weight={"bold"}
                        color="#ffffff"
                        styles={{
                          fontSize: "22px",
                        }}
                      ></Text>{" "}
                    </Link>
                    <Text
                      type="p"
                      color="#ffffff"
                      text={`${destination.num_hotels} Hotels`}
                    ></Text>
                  </Flex>
                </SlideList>
              </SlideCard>
            ))}
          </Slider>
        </SliderWidth>
      </SlideContent>
    </div>
  );
}

export default TrendingDestination;
