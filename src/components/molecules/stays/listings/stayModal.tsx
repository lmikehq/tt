import Modal from "@mui/material/Modal";
import React, { Dispatch, SetStateAction } from "react";
import SortingColumns from "./sortingColumns";
import styled from "styled-components";
import Flex from "@/components/templates/flex";
import Section from "../../section";
import { BsChevronBarLeft } from "react-icons/bs";
import Text from "@/components/atoms/text";
import Button from "@/components/atoms/button";
import { ttColors } from "@/lib/theme/colors";
import { CustomRadioGroup } from "../../radio";
import CheckBox from "../../checkbox";

const ModalWrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  background: white;
`;

export const FilterModal = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Section>
        <ModalWrapper>
          <Flex padding="1rem" align="center" justify="space-between">
            <BsChevronBarLeft onClick={handleClose} />
            <Text type="h1" text="Filter" weight={600} />
            <Button width="max-content" background="none" onClick={handleClose}>
              <Text type="h3" text="Done" color={ttColors.primary} />
            </Button>
          </Flex>
          <Section padding="2rem">
            <SortingColumns />
          </Section>
        </ModalWrapper>
      </Section>
    </Modal>
  );
};

export const SortModal = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const options = [
    { value: "favorite", label: "My Favourite Hotels" },
    { value: "best", label: "Best" },
    { value: "expensive", label: "Price (High to Low)" },
    { value: "cheap", label: "Price (Low to High)" },
    { value: "guest", label: "Guest Ratings" },
    { value: "lowestRatings", label: "Star Ratings (5 to 1)" },
    { value: "highestRatings", label: "Star Ratings (1 to 5)" },
  ];

  return (
    <Modal open={open} onClose={handleClose}>
      <Section>
        <ModalWrapper>
          <Flex padding="1rem" align="center" justify="space-between">
            <BsChevronBarLeft onClick={handleClose} />
            <Text type="h1" text="Sort" weight={600} />
            <Button width="max-content" background="none" onClick={handleClose}>
              <Text type="h3" text="Done" color={ttColors.primary} />
            </Button>
          </Flex>
          <Section padding="2rem">
            <Flex direction="column" align="flex-start" gap=".5rem">
              <CustomRadioGroup
                options={options}
                name="room"
                onChange={(e: any) => console.log(e.target.value)}
                justifyContent="flex-end"
                align="flex-start"
                direction="column"
              />
            </Flex>
          </Section>
        </ModalWrapper>
      </Section>
    </Modal>
  );
};
