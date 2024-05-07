import Modal from "@mui/material/Modal";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import styled from "styled-components";
import Flex from "@/components/templates/flex";
import Section from "../../section";
import { BsChevronBarLeft } from "react-icons/bs";
import Text from "@/components/atoms/text";
import Button from "@/components/atoms/button";
import { ttColors } from "@/lib/theme/colors";
import { CustomRadioGroup } from "../../radio";
import SortingColumns from "./sortingColumns";
import DeletePriceAlertBox from "../components/DeletePriceAlertBox";
import { useStaySearchStore } from "@/lib/store/stay/search.store";
import { StaySearchSortEnum } from "@/lib/types/request-models/stay/search.type";
import { RateHawkRegionType } from "@/lib/types/response-models/stay/location.type";
import GoogleMap from "../view/GoogleMap";
import { LocationData } from "@/lib/store/useStore";

const ModalCenter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;
const ModalWrapper = styled.div`
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    background: white;
    &.price_wrapper {
        width: 500px;
        height: max-content;
        border-radius: 10px;
    }
`;

export const FilterModal = ({
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
            <Section>
                <ModalWrapper>
                    <Flex padding="1rem" align="center" justify="space-between">
                        <BsChevronBarLeft onClick={handleClose} />
                        <Text type="h1" text="Filter" weight={600} />
                        <Button
                            width="max-content"
                            background="none"
                            onClick={handleClose}
                        >
                            <Text
                                type="h3"
                                text="Done"
                                color={ttColors.primary}
                            />
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
    const { staySearchSort, updateStaySearchSort } = useStaySearchStore(
        (state) => state
    );

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

    const options = [
        { label: "Highest Stars (5 to 1)", value: "HIGHEST_STAR" },
        { label: "Lowest Stars (1 to 5)", value: "LOWEST_STAR" },
        { label: "Highest Price (High to Low)", value: "HIGHEST_PRICE" },
        { label: "Lowest Price (Low to High)", value: "LOWEST_PRICE" },
        { label: "None", value: undefined },
    ];

    const handleChange = (val: string) => {
        updateStaySearchSort(val as StaySearchSortEnum);
        handleClose();
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Section>
                <ModalWrapper>
                    <Flex padding="1rem" align="center" justify="space-between">
                        <BsChevronBarLeft onClick={handleClose} />
                        <Text type="h1" text="Sort" weight={600} />
                        <Button
                            width="max-content"
                            background="none"
                            onClick={handleClose}
                        >
                            <Text
                                type="h3"
                                text="Done"
                                color={ttColors.primary}
                            />
                        </Button>
                    </Flex>
                    <Section padding="2rem">
                        <Flex direction="column" align="flex-start" gap=".5rem">
                            <CustomRadioGroup
                                options={options}
                                name="room"
                                onChange={(e: any, val) =>
                                    handleChange(val ?? "")
                                }
                                value={staySearchSort}
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

export const PriceAlertModal = ({
    open,
    setOpen,
    handleClose,
}: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<{ alert: boolean }>>;
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
                <ModalWrapper className="price_wrapper">
                    <Section padding="2rem">
                        <DeletePriceAlertBox setOpen={setOpen} />
                    </Section>
                </ModalWrapper>
            </ModalCenter>
        </Modal>
    );
};

export const MapModal = ({
    location,
    open,
    handleClose,
}: {
    location?: LocationData | null;
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
            <Section>
                <ModalWrapper>
                    <Flex padding="1rem" align="center" justify="space-between">
                        <BsChevronBarLeft onClick={handleClose} />
                        <Text type="h1" text="Map" weight={600} />
                        <Button
                            width="max-content"
                            background="none"
                            onClick={handleClose}
                        >
                            <Text
                                type="h3"
                                text="Done"
                                color={ttColors.primary}
                            />
                        </Button>
                    </Flex>
                    <Section height="100%" padding="2rem 1.5rem">
                        <GoogleMap
                            containerStyles={{ height: "90%" }}
                            lat={location?.latitude}
                            lng={location?.longitude}
                        />
                    </Section>
                </ModalWrapper>
            </Section>
        </Modal>
    );
};
