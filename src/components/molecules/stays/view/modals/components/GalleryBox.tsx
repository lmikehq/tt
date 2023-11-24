import React, { useState } from "react";
import { BtnDetails, Header, Span } from "../../styles";
import { Grid } from "@/components/templates/grid";
import Section from "../../../../section";
import Image from "@/components/atoms/image";
import Flex from "@/components/templates/flex";
import Text from "@/components/atoms/text";
import { ttColors } from "@/lib/theme/colors";
import Button from "@/components/atoms/button";
import CollectionsIcon from "@mui/icons-material/Collections";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import {
  ControlBtn,
  ImgBox,
  ImgWidth,
  LargeImg,
  SmallImg,
  SmallSlideImg,
} from "../../../components/styles";
import Slider from "react-slick";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface Room {
  images: string[];
}
const rooms: Room[] = [
  {
    images: [
      "/assets/images/stays/room1.jpeg",
      "/assets/images/stays/image1.jpg",
      "/assets/images/stays/room4.jpg",
      "/assets/images/stays/room5.jpg",
      "/assets/images/stays/image2.jpg",
    ],
  },
];

//SLIDER SETTINGS
const SliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: false,
  arrow: false,
};

function GalleryBox() {
  const { isMobile } = useScreenResolution();

  //===============
  //Image Selection
  //===============
  const [selectedImage, setSelectedImage] = useState(rooms[0].images[0]); // Initialize with the first image
  const handleImageChange = (newImage: string) => {
    setSelectedImage(newImage);
  };

  const getPreviousImage = (currentImage: string) => {
    const images = rooms[0].images;
    const currentIndex = images.indexOf(currentImage);
    if (currentIndex > 0) {
      return images[currentIndex - 1];
    } else {
      return images[images.length - 1];
    }
  };

  const getNextImage = (currentImage: string) => {
    const images = rooms[0].images;
    const currentIndex = images.indexOf(currentImage);
    if (currentIndex < images.length - 1) {
      return images[currentIndex + 1];
    } else {
      return images[0];
    }
  };

  const [activeView, setActiveView] = useState<"grid_view" | "slide_show">(
    "grid_view"
  );

  return (
    <Span>
      <Header style={{ margin: "20px 0px" }}>
        <Flex justify="space-between" align="center" className="gallery_switch">
          <Flex>
            <BtnDetails
              onClick={() => setActiveView("grid_view")}
              style={{
                cursor: "pointer",
                backgroundColor: ttColors.grayishAsh,
                padding: "10px ",
              }}
              className="full_width"
            >
              <Text
                weight={500}
                size={15}
                whiteSpace="nowrap"
                type="p"
                text={`All Images (${35})`}
              ></Text>
            </BtnDetails>
          </Flex>
          <Flex justify="flex-end" width="fit-content" className="flex_end">
            <Button
              margin=".5rem 0"
              color="white"
              width="fit-content"
              padding="0px 10px"
              onClick={() => setActiveView("slide_show")}
            >
              <Flex gap="8px" align="center">
                <CollectionsIcon />
                <Text
                  type="p"
                  whiteSpace="nowrap"
                  text="Slideshow View"
                  color={"white"}
                  size={"16px"}
                />
              </Flex>
            </Button>
          </Flex>
        </Flex>
      </Header>
      {activeView === "grid_view" && (
        <Span className="grid_view">
          <Grid columns={"2"} gap=".5rem">
            <Section
              styles={{ maxHeight: "600px", overflow: "hidden" }}
              borderRadius="12px"
            >
              <Image
                alt="stay"
                src={"/assets/images/topCountries/Canada.jpeg"}
                styles={{
                  width: "100%",
                  height: "120%",
                  objectFit: "cover",
                }}
              />
            </Section>
            <Section styles={{ maxHeight: "600px" }}>
              <Grid columns={"2"} gap=".5rem">
                <Section styles={{ overflow: "hidden" }} borderRadius="6px">
                  <Image
                    alt="stay"
                    src={"/assets/images/topCountries/Canada.jpeg"}
                    styles={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Section>
                <Section styles={{ overflow: "hidden" }} borderRadius="6px">
                  <Image
                    alt="stay"
                    src={"/assets/images/topCountries/Canada.jpeg"}
                    styles={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Section>
                <Section styles={{ overflow: "hidden" }} borderRadius="6px">
                  <Image
                    alt="stay"
                    src={"/assets/images/topCountries/Canada.jpeg"}
                    styles={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Section>
                <Section
                  styles={{ overflow: "hidden", position: "relative" }}
                  borderRadius="6px"
                >
                  <Image
                    alt="stay"
                    src={"/assets/images/topCountries/Canada.jpeg"}
                    styles={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Section>
              </Grid>
            </Section>
          </Grid>
          <Flex styles={{ margin: "10px 0px", maxHeight: "300px" }}>
            <Flex gap="10px">
              <Section styles={{ overflow: "hidden" }} borderRadius="6px">
                <Image
                  alt="stay"
                  src={"/assets/images/topCountries/Canada.jpeg"}
                  styles={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Section>
              <Section styles={{ overflow: "hidden" }} borderRadius="6px">
                <Image
                  alt="stay"
                  src={"/assets/images/topCountries/Canada.jpeg"}
                  styles={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Section>
              <Section
                styles={{ overflow: "hidden", position: "relative" }}
                borderRadius="6px"
              >
                <Image
                  alt="stay"
                  src={"/assets/images/topCountries/Canada.jpeg"}
                  styles={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Section>
            </Flex>
          </Flex>
        </Span>
      )}

      {activeView === "slide_show" && (
        <Span className="slide_show">
          <ImgBox>
            <Span style={{ height: "100%" }}>
              <LargeImg className="img_large_gallery">
                <Flex justify="center" width="100%">
                  <ImgWidth style={{}}>
                    <img
                      style={{
                        width: "100%",
                        maxHeight: "550px",
                        objectFit: "cover",
                        borderRadius: "12px",
                      }}
                      src={selectedImage}
                      alt={"room.name"}
                    />
                  </ImgWidth>
                </Flex>
              </LargeImg>
              <ControlBtn className="control_gallery ">
                <Flex justify="space-between">
                  <Flex
                    align="center"
                    justify="center"
                    background={ttColors.grayishAsh}
                    width="40px"
                    height="40px"
                    borderRadius="50%"
                    cursor="pointer"
                    onClick={() => {
                      const previousImage = getPreviousImage(selectedImage);
                      handleImageChange(previousImage);
                    }}
                  >
                    <ArrowBackIosIcon
                      style={{
                        color: ttColors.dark,
                        position: "relative",
                        left: "4px",
                      }}
                    />
                  </Flex>
                  <Flex
                    align="center"
                    justify="center"
                    background={ttColors.grayishAsh}
                    width="40px"
                    height="40px"
                    borderRadius="50%"
                    cursor="pointer"
                    onClick={() => {
                      const nextImage = getNextImage(selectedImage);
                      handleImageChange(nextImage);
                    }}
                  >
                    <ArrowForwardIosIcon style={{ color: ttColors.dark }} />
                  </Flex>
                </Flex>
              </ControlBtn>
            </Span>
            <SmallImg className="img_small img_small_gallery">
              <Flex justify="center">
                <ImgWidth style={{ width: "81%" }}>
                  <Slider {...SliderSettings} className="">
                    {rooms[0].images.map((x) => (
                      <SmallSlideImg
                        className={`${
                          x === selectedImage
                            ? "selected_room_img selected_room_gallery"
                            : "selected_room_gallery"
                        }`}
                        key={x}
                      >
                        <span
                          style={{ maxHeight: "230px" }}
                          onClick={() => setSelectedImage(x)}
                        >
                          <img
                            src={x}
                            alt=""
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              cursor: "pointer",
                            }}
                          />
                        </span>
                      </SmallSlideImg>
                    ))}
                  </Slider>
                </ImgWidth>
              </Flex>
            </SmallImg>
          </ImgBox>
        </Span>
      )}
    </Span>
  );
}

export default GalleryBox;
