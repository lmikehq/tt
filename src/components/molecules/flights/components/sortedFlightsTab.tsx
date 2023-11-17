import Flex from "@components/templates/flex";
import Text from "@atom/text";
import dayjs from "dayjs";
import React, { Dispatch, SetStateAction } from "react";
import { styled } from "styled-components";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { ttColors } from "@/lib/theme/colors";
import { FlightInfo } from "@/lib/types/response-models/flight/booking.type";
import { useFlightBookingStore } from "@/lib/store/flight/booking.store";
import { Mode } from "@/lib/types";
import ProgressLoader from "@/components/organisms/Loader/ProgressLoader";
import { useUserPreferencesStore } from "@/lib/store/preferences.store";
import { formatPrice } from "@/lib/extensions/helpers/formatPrice";

export const FlightContainer = styled.div`
    box-shadow: 0px 4px 16px 0px #8dd3bb1a;
    border: 1px solid #8dd3bb1a;
    background: linear-gradient(0deg, #ffffff, #ffffff);
    display: flex;
    padding: 1rem;
    margin: 0 0 0.5rem 0;
    align-items: center;
    border-radius: 12.5px;
    width: 100%;

    @media only screen and (max-width: 992px) {
        background: none;
        border: none;
        box-shadow: none;
        margin: 0;
        padding: 0;
    }
`;

export const ButtonBox = styled.div<{
    active: boolean;
    width?: string;
    isMobile?: boolean;
}>`
    background: ${({ active }) => (active ? "#06062A" : "transparent")};
    color: ${({ active }) => (active ? "white" : "#606060")};
    padding: 1rem 1.5rem;
    border-radius: 12px;
    cursor: pointer;
    width: ${(props) => props.width || props.isMobile ? "max-content" : "24.6%"};
    min-width: ${(props) => (props.width || props.isMobile ? "49%" : "24.6%")};
    display: flex;
    justify-content: center;

    h1 {
        color: ${({ active }) => (active ? "white" : ttColors.primary)};
    }

    &:hover {
        background: ${({ active }) => (active ? "" : "#F3F3FF")};
    }

    @media only screen and (max-width: 992px) {
        svg {
            display: ${({ active }) => (active ? "inline-flex" : "none")};
        }
    }
`;

type sortProps = {
    best: { price: number; duration: string };
    cheapest: { price: number; duration: string };
    fastest: { price: number; duration: string };
    earliest: { price: number; duration: string; date: string; };
    data: FlightInfo[];
    updateSearchQueryHandler: (updatedParams: Record<string, any>) => void;
};

function SortOption({
    label,
    price,
    flightTime,
    flightDate,
    isLoading,
}: {
    label: string;
    price?: number;
    flightTime?: string;
    flightDate?: string;
    isLoading: boolean;
    
}) {
    const { isMobile } = useScreenResolution();
    const { preFerredCurrency, conversionRate } = useUserPreferencesStore((state) => state);

    return (
        <Flex
            direction="column"
            gap=".5rem"
            align="center"
            justify={isMobile ? "center" : "flex-start"}
            padding=".5rem 0"
            width="100%"
            styles={{ minWidth: "100%" }}
        >
            <Flex
                gap="1rem"
                align="center"
                justify={isMobile ? "center" : "flex-start"}
            >
                <Text type="p" text={label} />
            </Flex>
            <Flex
                direction={isMobile ? "column" : "row"}
                gap=".5rem"
                align="center"
            >
                {price &&
                    <Text
                        type={isMobile ? "h1" : "p"}
                        text={
                            isLoading ? "-" : `${formatPrice({ total: price, currency: preFerredCurrency })}`
                        }
                        weight={600}
                    />
                }
                {flightTime &&
                    <Text
                        type="p"
                        text={isLoading ? "-" : flightTime}
                        whiteSpace="nowrap"
                        weight={600}
                    />
                }
                {flightDate &&
                    <Text
                        type="p"
                        text={isLoading ? "-" : flightDate}
                        whiteSpace="nowrap"
                        weight={600}
                    />
                }
            </Flex>
        </Flex>
    );
}

function SortedFlightsTab(props: sortProps) {
    const { isMobile } = useScreenResolution();
    const { searchFlightsMode, searchQuery } = useFlightBookingStore((state) => state);
    const isLoading = searchFlightsMode === Mode.loading;

    return (
        <FlightContainer>
            {isLoading ? (
                <Flex padding={isMobile ? ".5rem 1.5rem" : ".5rem 1rem"} direction="column" gap=".8rem">
                    <Text type="h3" text={`Looking for flights from ${searchQuery?.fly_from} to ${searchQuery?.fly_to}`} weight={600} size={20} />
                    <Text type="p" size={14} text="for selected dates" color={ttColors.lighterGray} />
                    <ProgressLoader />
                </Flex>
            ) : (
                <Flex justify={isMobile ? "space-between" : "flex-start"} gap={isMobile ? "1rem" : "0.2rem"} margin="0 0" overflowX="auto" className="scroll-custom">
                    <ButtonBox
                        isMobile={isMobile}
                        active={searchQuery?.sort === "quality"}
                        onClick={() => props.updateSearchQueryHandler({ sort: "quality" })}
                    >
                        <SortOption
                            label="Best"
                            price={props.best.price}
                            isLoading={isLoading}
                        />
                    </ButtonBox>

                    <ButtonBox
                        isMobile={isMobile}
                        active={searchQuery?.sort === "price"}
                        onClick={() => props.updateSearchQueryHandler({ sort: "price" })}
                    >
                        <SortOption
                            label="Cheapest"
                            price={props.cheapest.price}
                            isLoading={isLoading}
                        />
                    </ButtonBox>

                    <ButtonBox
                        isMobile={isMobile}
                        active={searchQuery?.sort === "duration"}
                        onClick={() => props.updateSearchQueryHandler({ sort: "duration" })}
                    >
                        <SortOption
                            label="Fastest"
                            flightTime={props.fastest.duration}
                            isLoading={isLoading}
                        />
                    </ButtonBox>

                    <ButtonBox
                        isMobile={isMobile}
                        active={searchQuery?.sort === "date"}
                        onClick={() => props.updateSearchQueryHandler({ sort: "date" })}
                        >
                        <SortOption
                            label="Earliest"
                            flightDate={props.earliest.date}
                            isLoading={isLoading}
                        />
                    </ButtonBox>

                    {/* {!isMobile &&
                        <Flex direction="column" justify="center" align="center" gap=".2rem" padding="0 0rem 0 0">
                            <Text type="p" text="Sort" color="#606060" whiteSpace="nowrap" />
                            <BsSortUp size={30} color="#606060" />
                        </Flex>
                    } */}
                </Flex>
            )}
        </FlightContainer>
    );
}

export default SortedFlightsTab;
