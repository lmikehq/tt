import Modal from "@mui/material/Modal";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import styled from "styled-components";
import Flex from "@/components/templates/flex";
import Section from "../../../section";
import { BsChevronBarLeft } from "react-icons/bs";
import Text from "@/components/atoms/text";
import Button from "@/components/atoms/button";
import { ttColors } from "@/lib/theme/colors";
import { CustomRadioGroup } from "../../../radio";
import CheckBox from "../../../checkbox";
import { Span } from "../styles";
import MapBox from "./components/MapBox";
import CloseIcon from "@mui/icons-material/Close";
import AmenitiesBox from "./components/AmenitiesBox";
import SearchBox from "./components/SearchBox";
import GalleryBox from "./components/GalleryBox";
import SectionLayout from "@/components/templates/SectionLayout";
import ReviewListBox from "./components/ReviewListBox";
import FilterBox from "./components/FilterBox";

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
    height: 100%;
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
  open,
  handleClose,
}: {
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
            <SectionLayout>
              <Flex
                padding="1rem 0"
                align="center"
                gap="20px"
                justify="space-between"
              >
                <Text type="h2" text="The Ritz London Hotel" weight={600} />
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
                <GalleryBox />
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
}: {
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
        <ModalScroll className="map_scroll">
          <ModalWrapper className="map_wrapper">
            <Flex padding="1rem" align="center" gap="20px">
              <CloseIcon
                style={{ fontSize: "19px", cursor: "pointer" }}
                onClick={handleClose}
              />
              <Text
                type="h4"
                text="The Ritz London, United Kingdom"
                weight={600}
              />
            </Flex>
            <Span style={{ padding: "15px" }}>
              <MapBox />
            </Span>
          </ModalWrapper>
        </ModalScroll>
      </ModalCenter>
    </Modal>
  );
};
export const AmenitiesModal = ({
  open,
  handleClose,
}: {
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
    <Modal disableScrollLock={true} open={open} onClose={handleClose}>
      <ModalCenter className="amenities">
        <ModalScroll className="amenities_scroll">
          <ModalWrapper className="amenities_modal">
            <Flex
              padding="10px 35px"
              align="center"
              justify="space-between"
              gap="20px"
              styles={{ marginTop: "20px" }}
            >
              <Text type="h1" size={23} text="Hotel Amenities" weight={600} />
              <CloseIcon
                style={{ fontSize: "29px", cursor: "pointer" }}
                onClick={handleClose}
              />
            </Flex>
            <Span style={{ padding: "15px" }}>
              <AmenitiesBox />
            </Span>
          </ModalWrapper>
        </ModalScroll>
      </ModalCenter>
    </Modal>
  );
};

interface FilterItem {
  name: string;
  images: string[];
  //Other properties here
}

// FILTER MODAL
interface FilterModalProps {
  open: boolean;
  handleClose: () => void;
  beds: string;
  setBeds: React.Dispatch<React.SetStateAction<string>>;
  bedsOptions: { value: string; label: string }[];
  selectedMealCheckboxValues: string[];
  setSelectedMealCheckboxValues: React.Dispatch<React.SetStateAction<string[]>>;
  mealOptions: { value: string; displayValue: string }[];
  cancellation: string;
  setCancellation: React.Dispatch<React.SetStateAction<string>>;
  cancellationOptions: { value: string; label: string }[];
  selectedPaymentCheckboxValues: string[];
  setSelectedPaymentCheckboxValues: React.Dispatch<
    React.SetStateAction<string[]>
  >;
  paymentOptions: { value: string; displayValue: string }[];
  submissionState: {
    loading: boolean;
    //MORE PROPERTIES
  };
  setSubmissionState: React.Dispatch<
    React.SetStateAction<{
      loading: boolean;
      //MORE PROPERTIES
    }>
  >;
  handleSubmit: () => void;
  // resetAllFilters: () => void;
  // totalSelectedOptions: number;
  filterItems: FilterItem[];
}

export const FilterModal = ({
  open,
  handleClose,
  beds,
  setBeds,
  bedsOptions,
  selectedMealCheckboxValues,
  setSelectedMealCheckboxValues,
  mealOptions,
  cancellation,
  setCancellation,
  cancellationOptions,
  selectedPaymentCheckboxValues,
  setSelectedPaymentCheckboxValues,
  paymentOptions,
  submissionState,
  setSubmissionState,
  handleSubmit,
  // resetAllFilters,
  // totalSelectedOptions,
  filterItems,
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
              {/* Pass down the props to FilterBox */}
              <FilterBox
                beds={beds}
                setBeds={setBeds}
                bedsOptions={bedsOptions}
                selectedMealCheckboxValues={selectedMealCheckboxValues}
                setSelectedMealCheckboxValues={setSelectedMealCheckboxValues}
                mealOptions={mealOptions}
                cancellation={cancellation}
                setCancellation={setCancellation}
                cancellationOptions={cancellationOptions}
                selectedPaymentCheckboxValues={selectedPaymentCheckboxValues}
                setSelectedPaymentCheckboxValues={
                  setSelectedPaymentCheckboxValues
                }
                paymentOptions={paymentOptions}
                submissionState={submissionState}
                setSubmissionState={setSubmissionState}
                handleSubmit={handleSubmit}
                // resetAllFilters={resetAllFilters}
                // totalSelectedOptions={totalSelectedOptions}
                filterItems={filterItems}
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
  let HotelName = "Hotels available in New York from 24 - 25 October 2023";
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
        <ModalScroll className="search_box">
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
              <SearchBox />
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
  reviews: Reviews[];
  hiddenReviews: number[];
  toggleReviewVisibility: (index: number) => void;
}
interface ReviewModalProps {
  open: boolean;
  handleClose: () => void;
  reviews: Reviews[];
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
