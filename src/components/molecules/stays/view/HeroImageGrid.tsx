import Flex from "@/components/templates/flex";
import Section from "../../section";
import { Grid } from "@/components/templates/grid";
import Image from "@/components/atoms/image";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { MobileImageBox } from "../components/styles";
import Slider from "react-slick";
import { Span } from "./styles";
import Text from "@/components/atoms/text";
import CollectionsIcon from "@mui/icons-material/Collections";
import { GalleryModal } from "./modals/Modals";
import { useState } from "react";

//MOBILE SETTINGS
const MobileSliderSettings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
};

interface Room {
  images: string[];
}

const rooms: Room[] = [
  {
    images: [
      "/assets/images/stays/room1.jpeg",
      "/assets/images/topCountries/Canada.jpeg",
      "/assets/images/stays/image3.png",
      "/assets/images/topCountries/Canada.jpeg",
    ],
  },
];
const HeroImageGrid = () => {
  const { isMobile } = useScreenResolution();

  const [open, setOpen] = useState({
    gallery: false,
  });
  return (
    <Section styles={{ marginBottom: !isMobile ? "37px" : "0px" }}>
      {!isMobile ? (
        <Grid columns={"2"} gap=".5rem">
          <Section
            styles={{ maxHeight: "600px", overflow: "hidden" }}
            borderRadius="12px"
          >
            <Image
              onClick={() =>
                setOpen((prev) => ({
                  ...prev,
                  gallery: true,
                }))
              }
              alt="stay"
              src={"/assets/images/topCountries/Canada.jpeg"}
              styles={{
                width: "100%",
                height: "120%",
                objectFit: "cover",
                cursor: "pointer",
              }}
            />
          </Section>
          <Section styles={{ maxHeight: "600px" }}>
            <Grid columns={"2"} gap=".5rem">
              <Section styles={{ overflow: "hidden" }} borderRadius="6px">
                <Image
                  onClick={() =>
                    setOpen((prev) => ({
                      ...prev,
                      gallery: true,
                    }))
                  }
                  alt="stay"
                  src={"/assets/images/topCountries/Canada.jpeg"}
                  styles={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                />
              </Section>
              <Section styles={{ overflow: "hidden" }} borderRadius="6px">
                <Image
                  onClick={() =>
                    setOpen((prev) => ({
                      ...prev,
                      gallery: true,
                    }))
                  }
                  alt="stay"
                  src={"/assets/images/topCountries/Canada.jpeg"}
                  styles={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                />
              </Section>
              <Section styles={{ overflow: "hidden" }} borderRadius="6px">
                <Image
                  onClick={() =>
                    setOpen((prev) => ({
                      ...prev,
                      gallery: true,
                    }))
                  }
                  alt="stay"
                  src={"/assets/images/topCountries/Canada.jpeg"}
                  styles={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                />
              </Section>
              <Section
                styles={{ overflow: "hidden", position: "relative" }}
                borderRadius="6px"
              >
                <Image
                  onClick={() =>
                    setOpen((prev) => ({
                      ...prev,
                      gallery: true,
                    }))
                  }
                  alt="stay"
                  src={"/assets/images/topCountries/Canada.jpeg"}
                  styles={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                />
                <Span
                  style={{
                    position: "absolute",
                    right: "20px",
                    color: "var(--default-color)",
                    bottom: "20px",
                    backgroundColor: "var(--secondary-color)",
                    padding: "8px",
                    borderRadius: "20px",
                    cursor: "pointer",
                  }}
                >
                  <Flex align="center" gap="5px">
                    <CollectionsIcon />
                    <Text type="p" text="1/35"></Text>
                  </Flex>
                </Span>
              </Section>
            </Grid>
          </Section>
        </Grid>
      ) : (
        <MobileImageBox className="stay_page_slider">
          <Slider {...MobileSliderSettings} className="slick-slider">
            {rooms.map((room, roomIndex) =>
              room.images.map((image, imageIndex) => (
                <span
                  key={`${roomIndex}-${imageIndex}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                  }}
                >
                  <img
                    src={image}
                    alt=""
                    className="slick_slider_room_img_img"
                    style={{
                      width: "100%",
                      borderRadius: "12.5px",
                    }}
                  />
                </span>
              ))
            )}
          </Slider>
          <Span
            style={{
              position: "absolute",
              right: "10px",
              color: "var(--default-color)",
              bottom: "20px",
              backgroundColor: "var(--secondary-color)",
              padding: "8px",
              borderRadius: "20px",
              cursor: "pointer",
            }}
          >
            <Flex align="center" gap="5px">
              <CollectionsIcon />
              <Text type="p" text="1/35"></Text>
            </Flex>
          </Span>
        </MobileImageBox>
      )}
      {/* SEARCH MODAL*/}
      <GalleryModal
        open={open.gallery}
        handleClose={() =>
          setOpen((prev) => ({
            ...prev,
            gallery: false,
          }))
        }
      />
    </Section>
  );
};

export default HeroImageGrid;
