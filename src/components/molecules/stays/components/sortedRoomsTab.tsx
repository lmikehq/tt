import Flex from "@components/templates/flex";
import Text from "@atom/text";
import React, { Dispatch, SetStateAction } from "react";
import { BsInfoCircle, BsSortUp } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { styled } from "styled-components";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { ttColors } from "@/lib/theme/colors";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { Span } from "./styles";
import { HotelBySearchInterface } from "@/lib/types/response-models/stay/search.type";
import {
    HotelPropertyTypes,
    StaySearchSortEnum,
} from "@/lib/types/request-models/stay/search.type";
import { useStaySearchStore } from "@/lib/store/stay/search.store";
import { capCase } from "@/lib/utilFns";

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip
        placement="top-start"
        {...props}
        arrow
        classes={{ popper: className }}
    />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: "var(--secondary-color)",
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "var(--secondary-color)",
        position: "relative",
        bottom: "12px",
        left: "0px",
        fontSize: "16px",
    },
}));

export const RoomContainer = styled.div`
    box-shadow: 0px 4px 16px 0px #8dd3bb1a;
    border: 1px solid #e7e7e7;
    background: linear-gradient(0deg, #ffffff, #ffffff);
    margin-bottom: 2rem;
    padding: 0.5rem;
    border-radius: 12.5px;
    width: 100%;
    overflow: hidden;
`;

export const ButtonBox = styled.div<{ active: boolean }>`
    background: ${({ active }) => (active ? "#06062A" : "transparent")};
    color: ${({ active }) => (active ? "white" : "#606060")};
    padding: 1rem;
    border-radius: 12.5px;
    cursor: pointer;

    h1 {
        color: ${({ active }) => (active ? "white" : ttColors.primary)};
    }

    @media only screen and (max-width: 992px) {
        svg {
            display: ${({ active }) => (active ? "inline-flex" : "none")};
        }
    }
`;

const DivTag = styled.div`
    overflow-x: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`;

type sortProps = {
    bestPrice: number;
    topReviews: number;
    lowestPrice: number;
    starRatings: number;
    distance: string;
    setSortType: Dispatch<SetStateAction<string>>;
    sortType: string;
    hotels: HotelBySearchInterface[];
};

interface Hotel {
    name: string;
    address: string;
    distance: string;
    reviews: number;
    star_rating: number;
    price: number;
    images: string[];
}

function SortedRoomsTab(props: sortProps) {
    const { isMobile } = useScreenResolution();
    const { hotels } = props;
    const { staySearchSort, updateStaySearchSort, stayTabInitialSearchQuery } = useStaySearchStore(
        (state) => state
    );
    return (
        <>
            <Flex
                gap="10px"
                align="center"
                justify={isMobile ? "center" : "flex-start"}
                styles={{ marginBottom: "30px" }}
            >
                <Text
                    type="p"
                    text={`${hotels?.length} hotels found in ${stayTabInitialSearchQuery?.location?.name}`}
                    styles={{ fontWeight: "600" }}
                ></Text>

                <BsInfoCircle
                    size={20}
                    style={{ color: "var(--primary-color)" }}
                />
            </Flex>
            <RoomContainer>
                <DivTag>
                    <Flex
                        justify={isMobile ? "center" : "space-between"}
                        styles={{ width: "100%" }}
                    >
                        {Object.keys(StaySearchSortEnum).map((item, index) => {
                            const value =
                                StaySearchSortEnum[
                                    item as keyof typeof StaySearchSortEnum
                                ];
                            return (
                                <ButtonBox
                                    key={"sort-" + index}
                                    active={staySearchSort === value}
                                    onClick={() => updateStaySearchSort(value)}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <Flex
                                        align={"center"}
                                        padding=".05rem 1.25rem"
                                    >
                                        <Text
                                            type="p"
                                            text={capCase(item, '_')}
                                            styles={{
                                                position: "relative",
                                                right: "10px",
                                            }}
                                        />
                                        <BootstrapTooltip
                                            title="We believe you will like these stays with your preferences in mind, considering factors like location, amenities, reviews, and price, ensuring a stay tailored just for you."
                                            placement="top-start"
                                            style={{ flex: "none" }}
                                            arrow
                                        >
                                            {staySearchSort == value ? (
                                                <BsInfoCircle size={20} />
                                            ) : (
                                                <></>
                                            )}
                                        </BootstrapTooltip>
                                    </Flex>
                                </ButtonBox>
                            );
                        })}

                        {isMobile && (
                            <ButtonBox
                                active={props.sortType === "best"}
                                onClick={() => props.setSortType("best")}
                            >
                                <Flex
                                    direction="column"
                                    justify="center"
                                    gap=".5rem"
                                    padding=".5rem 1.25rem"
                                >
                                    <Flex
                                        gap="10px"
                                        align="center"
                                        justify="center"
                                    >
                                        <Text type="p" text="Best" />
                                        {props.sortType === "best" && (
                                            <BsInfoCircle size={20} />
                                        )}
                                    </Flex>
                                    <Flex
                                        direction={isMobile ? "column" : "row"}
                                        gap=".5rem"
                                        align="center"
                                    >
                                        <Text
                                            type={isMobile ? "h1" : "p"}
                                            text={`$${Number(
                                                props.bestPrice?.toFixed(0)
                                            ).toLocaleString()}`}
                                            weight={600}
                                        />
                                        {!isMobile && <GoDotFill size={15} />}
                                        <Text
                                            type="p"
                                            text="20 h 32 m"
                                            whiteSpace="nowrap"
                                        />
                                    </Flex>
                                </Flex>
                            </ButtonBox>
                        )}
                    </Flex>
                </DivTag>
            </RoomContainer>
        </>
    );
}

export default SortedRoomsTab;
