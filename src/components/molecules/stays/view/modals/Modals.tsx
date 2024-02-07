import Modal from "@mui/material/Modal";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import styled from "styled-components";
import Flex from "@/components/templates/flex";
import Section from "../../../section";
import { BsChevronBarLeft } from "react-icons/bs";
import Text from "@/components/atoms/text";
import { ttColors } from "@/lib/theme/colors";
import { CustomRadioGroup } from "../../../radio";
import { Span } from "../styles";
import CloseIcon from "@mui/icons-material/Close";
import AmenitiesBox from "./components/AmenitiesBox";
import SearchBox from "./components/SearchBox";
import GalleryBox from "./components/GalleryBox";
import SectionLayout from "@/components/templates/SectionLayout";
import ReviewListBox from "./components/ReviewListBox";
import FilterBox from "./components/FilterBox";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { AmenityGroup, Rate, ViewSingleStayResponse } from "@/lib/types/response-models/stay/search.type";
import { ViewTripAdvisorStayReviewsResponse } from "@/lib/types/request-models/stay/search.type";
import GoogleMap from "../GoogleMap";
import { FiltersInterface } from "../ChooseYourRoom";


const ModalCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  &.amenities {
    overflow-y: auto;
    @media screen and (max-width: 900px) {
      overflow-y: none;
    }
  }
`;
const ModalScroll = styled.div`
  width: 900px;
  height: 500px;
  // overflow: hidden;
  background: white;
  border-radius: 20px;
  &.map_scroll,
  &.gallery {
    width: 100%;
    height: 100%;
    border-radius: 0px;
  }
  &.amenities_scroll {
    width: 1000px;
    height: 2030px;
    margin-top: 1350px;
    background: white;
    margin-bottom: 20px;
  }
  &.search_box {
    width: 600px;
  }
  @media screen and (max-width: 900px) {
    width: 100%;
    height: 100%;
    border-radius: 0px;
    &.amenities_scroll {
      width: 100%;
      height: 100%;
      margin-top: 0px;
      margin-bottom: 0px;
      overflow-y: auto;
    }
    &.search_box {
      width: 100%;
    }
  }
`;
const ModalWrapper = styled.div`
  height: 500px;

  &.map_wrapper,
  &.gallery_modal {
    height: 100vh;
  }
  &.review_wrapper,
  &.gallery_modal {
    overflow-y: auto;
  }
  &.amenities_modal {
    height: 100%vh;
    // height: 100vh !important;
    // height: 1000px;
  }
  @media screen and (max-width: 900px) {
    width: 100%;
    height: 100%;
  }
`;

export const GalleryModal = ({
    stayResponse,
    images = [],
    open,
    handleClose,
}: {
    stayResponse: ViewSingleStayResponse;
    images: string[];
    open: boolean;
    handleClose: () => void;
}) => {
  useEffect(() => {
    const handleBodyOverflow = () => {
      document.documentElement.style.overflow = open ? "hidden" : "auto";
      document.body.style.overflow = open ? "hidden" : "auto";
    };
    handleBodyOverflow();
    return () => {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalCenter>
        <ModalScroll className="gallery">
          <ModalWrapper className="gallery_modal">
            <SectionLayout style={{ height: '100vh', overflowY: 'auto' }}>
              <Flex
                padding="1rem 0 0"
                align="center"
                gap="20px"
                justify="space-between"
              >
                <Text type="h2" text={stayResponse?.name ?? "Hotel"} weight={600} />
                <Flex
                  align="center"
                  justify="center"
                  background={ttColors.grayishAsh}
                  width="40px"
                  height="40px"
                  borderRadius="50%"
                  cursor="pointer"
                  onClick={handleClose}
                >
                  <CloseIcon style={{ fontSize: "19px" }} />
                </Flex>
              </Flex>
              <Span>
                <GalleryBox
                    images={images}
                />
              </Span>
            </SectionLayout>
          </ModalWrapper>
        </ModalScroll>
      </ModalCenter>
    </Modal>
  );
};


export const MapModal = ({
    open,
    handleClose,
    stayResponse,
    lat,
    lng,
} : {
    open: boolean;
    handleClose: () => void;
    stayResponse?: ViewSingleStayResponse;
    lat: string | number;
    lng: string | number;
}) => {
    const { isMobile } = useScreenResolution()
//   useEffect(() => {
//     const handleBodyOverflow = () => {
//       document.documentElement.style.overflow = open ? "hidden" : "auto";
//       document.body.style.overflow = open ? "hidden" : "auto";
//     };
//     handleBodyOverflow();
//     return () => {
//       document.documentElement.style.overflow = "auto";
//       document.body.style.overflow = "auto";
//     };
//   }, [open]);
    return (
        <Modal open={open} onClose={handleClose}>
            <Flex
                direction="column"
                align="flex-start"
                background="white"
                padding="2rem"
                gap="2rem"
                width={isMobile ? "95vw" : "60vw"}
                height={isMobile ? "95vh" : "95vh"}
                borderRadius="16px"
                margin="0 auto"
                overflowY="scroll"
                className="scroll-custom"
            >
                <Flex padding="1rem" align="center" gap="20px">
                    <CloseIcon
                        style={{ fontSize: "24px", cursor: "pointer" }}
                        onClick={handleClose}
                    />
                    <Text
                        type="h4"
                        text={stayResponse?.address ?? 'Address'}
                        weight={600}
                    />
                </Flex>
                <GoogleMap
                    lat={lat}
                    lng={lng}
                />
            </Flex>
        </Modal>
    );
};
export const AmenitiesModal = ({
    open,
    handleClose,
    amenities,
    sortedAmenities,
}: {
    open: boolean;
    handleClose: () => void;
    amenities: AmenityGroup[];
    sortedAmenities: string[];
}) => {
    const { isMobile } = useScreenResolution()
//   useEffect(() => {
//     const handleBodyOverflow = () => {
//       document.documentElement.style.overflow = open ? "hidden" : "auto";
//       document.body.style.overflow = open ? "hidden" : "auto";
//     };
//     handleBodyOverflow();
//     return () => {
//       document.documentElement.style.overflow = "auto";
//       document.body.style.overflow = "auto";
//     };
//   }, [open]);

return (
    <Modal open={open} onClose={handleClose}>
        <Flex
            direction="column"
            align="flex-start"
            background="white"
            padding="2rem 2rem 3rem 2.5rem"
            gap="2rem"
            width={isMobile ? "95vw" : "60vw"}
            height={isMobile ? "95vh" : "95vh"}
            borderRadius="16px"
            margin="0 auto"
            overflowY="scroll"
            className="scroll-custom"
          >
            <Flex justify="space-between">
                <Text type="h1" size={23} text="Hotel Amenities" weight={600} />
                <CloseIcon
                    style={{ fontSize: "24px", cursor: "pointer" }}
                    onClick={handleClose}
                />
            </Flex>
            <AmenitiesBox
                amenities={amenities}
                sortedAmenities={sortedAmenities}
            />
        </Flex>
    </Modal>
  );
};

type OptionType = { value: string, label: string };
// FILTER MODAL
interface FilterModalProps {
    filters: FiltersInterface;
    setFilters: React.Dispatch<React.SetStateAction<FiltersInterface>>;
    bedsOptions: OptionType[];
    mealOptions: OptionType[];
    cancellationOptions: OptionType[];
    paymentOptions: OptionType[];
    open: boolean;
    handleClose: () => void;
    handleSubmit: () => void;
    resetFilters: () => void;
    loading: boolean;
    items: Rate[];
}

export const FilterModal = ({
    filters,
    setFilters,
    open,
    handleClose,
    bedsOptions,
    mealOptions,
    cancellationOptions,
    paymentOptions,
    handleSubmit,
    resetFilters,
    loading,
    items,
}: FilterModalProps) => {
    useEffect(() => {
        const handleBodyOverflow = () => {
        document.documentElement.style.overflow = open ? "hidden" : "auto";
        document.body.style.overflow = open ? "hidden" : "auto";
        };
        handleBodyOverflow();
        return () => {
        document.documentElement.style.overflow = "auto";
        document.body.style.overflow = "auto";
        };
    }, [open]);
  return (
    <Modal open={open} onClose={handleClose}>
      <ModalCenter>
        <ModalScroll className="map_scroll">
          <ModalWrapper className="map_wrapper">
            <Flex
              padding="1rem"
              align="center"
              gap="20px"
              justify="space-between"
            >
              <Text type="h3" text="Filters" weight={600} />{" "}
              <CloseIcon
                style={{ fontSize: "20px", cursor: "pointer" }}
                onClick={handleClose}
              />
            </Flex>
            <Span style={{ padding: "15px" }}>
                <FilterBox
                    filters={filters}
                    setFilters={setFilters}
                    bedsOptions={bedsOptions}
                    mealOptions={mealOptions}
                    cancellationOptions={cancellationOptions}
                    paymentOptions={paymentOptions}
                    handleSubmit={handleSubmit}
                    resetFilters={resetFilters}
                    loading={loading}
                    items={items}
                />
            </Span>
          </ModalWrapper>
        </ModalScroll>
      </ModalCenter>
    </Modal>
  );
};

// TEXT TRUNCATE
function truncateText(text: string, maxWords: number): string {
  const words: string[] = text.split(" ");
  if (words.length <= maxWords) {
    return text;
  }
  return words.slice(0, maxWords).join(" ") + " ...";
}

export const ChangeSearchModal = ({
    open,
    handleClose,
}: {
    open: boolean;
    handleClose: () => void;
}) => {
    const { isMobile } = useScreenResolution()
    let HotelName = "Hotels available";

    useEffect(() => {
        const handleBodyOverflow = () => {
            document.documentElement.style.overflow = open ? "hidden" : "auto";
            document.body.style.overflow = open ? "hidden" : "auto";
            };
            handleBodyOverflow();
        return () => {
            document.documentElement.style.overflow = "auto";
            document.body.style.overflow = "auto";
        };
    }, [open]);


    return (
        <Modal open={open} onClose={handleClose}>
            <ModalCenter>
                <ModalScroll className="search_box" style={{ marginTop: isMobile ? '' : '-30vh' }}>
                <ModalWrapper className="search_wrapper">
                    <Flex
                    padding="10px 35px"
                    align="center"
                    justify="space-between"
                    gap="20px"
                    styles={{ marginTop: "20px" }}
                    >
                    <Text
                        type="h1"
                        size={23}
                        text={`${truncateText(HotelName, 5)}`}
                        weight={600}
                    />
                    <CloseIcon
                        style={{ fontSize: "29px", cursor: "pointer" }}
                        onClick={handleClose}
                    />
                    </Flex>
                    <Span style={{ padding: "15px" }}>
                    <SearchBox onClose={handleClose} />
                    </Span>
                </ModalWrapper>
                </ModalScroll>
            </ModalCenter>
        </Modal>
    );
};

interface Reviews {
  name: string;
  rating: number;
  title: string;
  comment: string;
  cleanliness: number;
  service: number;
  sleepQuality: number;
  value: number;
  location: number;
  commentDate: string;
  stayedIn: string;
  rooms: number;
}

interface ReviewModalProps {
  open: boolean;
  handleClose: () => void;
  reviews: ViewTripAdvisorStayReviewsResponse['data'];
  hiddenReviews: number[];
  toggleReviewVisibility: (index: number) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  open,
  handleClose,
  reviews,
}) => {
  useEffect(() => {
    const handleBodyOverflow = () => {
      document.documentElement.style.overflow = open ? "hidden" : "auto";
      document.body.style.overflow = open ? "hidden" : "auto";
    };
    handleBodyOverflow();
    return () => {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    };
  }, [open]);
  return (
    <Modal open={open} onClose={handleClose}>
      <ModalCenter>
        <ModalScroll className="review_scroll">
          <ModalWrapper className="review_wrapper">
            <Flex padding="1rem" align="center" gap="20px">
              <Flex direction="column">
                <Text type="h4" text="Reviews" weight={600} />
                <Text type="p" text="The Ritz London, United Kingdom"></Text>
              </Flex>
              <CloseIcon
                style={{ fontSize: "19px", cursor: "pointer" }}
                onClick={handleClose}
              />
            </Flex>
            <Span style={{ padding: "15px" }}>
              <ReviewListBox reviews={reviews} />
            </Span>
          </ModalWrapper>
        </ModalScroll>
      </ModalCenter>
    </Modal>
  );
};
