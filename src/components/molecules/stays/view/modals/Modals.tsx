import Modal from "@mui/material/Modal";
import React, { Dispatch, SetStateAction } from "react";
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

const ModalCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const ModalScroll = styled.div`
  width: 900px;
  height: 500px;
  overflow: hidden;
  border-radius: 20px;
  &.map_scroll,
  &.gallery {
    width: 100%;
    height: 100%;
    border-radius: 0px;
  }
  &.amenities_scroll {
    height: 600px !important;
  }
  &.search_box {
    width: 600px;
  }
  @media screen and (max-width: 900px) {
    width: 100%;
    height: 100%;
    border-radius: 0px;
  }
`;
const ModalWrapper = styled.div`
  height: 500px;
  overflow-y: auto;
  background: white;
  &.map_wrapper,
  &.gallery_modal {
    height: 100%;
  }
  &.amenities_modal {
    height: 600px !important;
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
  return (
    <Modal open={open} onClose={handleClose}>
      <ModalCenter>
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

export const ChangeSearchModal = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <ModalCenter>
        <ModalScroll className="search_box">
          <ModalWrapper>
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
                text="Hotels available in New York from 24 - 25 October 2023"
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
  hiddenReviews,
  toggleReviewVisibility,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <ModalCenter>
        <ModalScroll>
          <ModalWrapper>
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
