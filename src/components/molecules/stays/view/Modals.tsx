import Modal from "@mui/material/Modal";
import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import Flex from "@/components/templates/flex";
import Section from "../../section";
import { BsChevronBarLeft } from "react-icons/bs";
import Text from "@/components/atoms/text";
import Button from "@/components/atoms/button";
import { ttColors } from "@/lib/theme/colors";
import { CustomRadioGroup } from "../../radio";
import CheckBox from "../../checkbox";
import { Span } from "./styles";
import MapBox from "./MapBox";
import CloseIcon from "@mui/icons-material/Close";
import AmenitiesBox from "./AmenitiesBox";

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

  @media screen and (max-width: 900px) {
    width: 100%;
    height: 100%;
  }
`;

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
        <ModalScroll>
          <ModalWrapper>
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
        <ModalScroll>
          <ModalWrapper>
            <Flex
              padding="10px 35px"
              align="center"
              justify="space-between"
              gap="20px"
              styles={{ marginTop: "20px" }}
            >
              <Text type="h1" size={25} text="Hotel Amenities" weight={600} />
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
