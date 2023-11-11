"use client";

import Section from "src/components/molecules/section";
import React, { useState } from "react";
import Flex from "@components/templates/flex";
import Text from "@atom/text";
import SearchInput from "./searchInput";
import { ttColors } from "@lib/theme/colors";
import { DatePicker } from "./customDatePicker";
import { ClickAwayListener } from "@mui/material";
import Input from "@atom/input";
import DropdownMenu from "./dropdownMenu";
import { styled } from "styled-components";
import { HiXMark } from "react-icons/hi2";
import { CountryType } from "src/components/molecules/serviceTabs/components/visa";
import { OneFlightType } from "@lib/extensions/context";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import dayjs from "dayjs";
import { GoArrowSwitch } from "react-icons/go";
import Button from "../atoms/button";
import LocationSearchSelectInput from "./LocationSearchSelectInput";
import Location from "@/lib/types/response-models/flight/location.type";

interface flightProps {
    stops: string;
    flight: OneFlightType;
    length?: number;
    canDelete?: boolean;
    handleUpdate?: (
        flight: OneFlightType,
        data: Partial<OneFlightType>
    ) => void;
    handleDelete?: (flight: OneFlightType) => void;
}
export type FlightCountType = {
    adults: number;
    children: number;
    infants: number;
    cabinBaggage: number;
    checkedBaggage: number;
    flightClass: string;
};

const FlightCircle = styled.div`
    border: 1px solid #b6b6b6;
    position: absolute;
    top: 2px;
    right: -12px;
    background: white;
    width: 1.65rem;
    height: 1.65rem;
    padding: 0.25rem;
    border-radius: 100%;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-items: center;
`;

const TravellersDropdownContainer = styled.div`
    position: relative;
`;

function FlightModule({
    stops,
    flight,
    handleUpdate,
    handleDelete,
    canDelete,
}: flightProps) {
    const { isMobile } = useScreenResolution();

    const formatDisplayText = (data: FlightCountType) => {
        const kids = data.children + data.infants;
        const bags = data.cabinBaggage + data.checkedBaggage;
        return `${data.adults} ${data.adults > 1 ? "Adults" : "Adult"}${
            kids > 0 ? `, ${kids} ${kids === 1 ? "Child" : "Children"}` : ""
        }, ${data.flightClass}${
            bags > 0 ? `, ${bags} ${bags === 1 ? "Bag" : "Bags"}` : ""
        }`;
    };

    const defText = formatDisplayText(flight);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const today = dayjs().toDate();

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDataChange = (data: FlightCountType) => {
        handleUpdate && handleUpdate(flight, data);
    };

    return (
        <Section padding=".75rem 0 0 0 " height="unset">
            <Flex
                direction={isMobile ? "column" : "row"}
                align={isMobile ? "flex-start" : "center"}
                gap=".5rem"
            >
                <Flex
                    direction="column"
                    gap=".5rem"
                    styles={{ marginBottom: isMobile ? "1.2rem" : "0" }}
                >
                    <Text
                        type="label"
                        size={isMobile ? 16 : 16}
                        text="From"
                        weight={500}
                    />
                    {/* <SearchInput
                    options={COUNTRY_FLAGS.map((x) => ({
                        name: x.name,
                        flag: x.flag,
                        code: x.code,
                    }))}
                    onChange={(x: CountryType) => handleUpdate && handleUpdate(flight, { departureCountry: x })}
                    value={flight.departureCountry ?? ""}
                    placeholder="Current Location"
                >
                    <Flex gap={isMobile ? "0.7rem" : ".6rem"} cursor="pointer" overflowX="hidden">
                        <IoLocationOutline size={isMobile ? 20 : 22} />
                        <Text
                            type="p"
                            size={14}
                            text={flight.departureCountry?.name ?? 'Current Location'}
                            color="black"
                        />
                    </Flex>
                </SearchInput> */}
                    <LocationSearchSelectInput
                        onChange={(x: Location) =>
                            handleUpdate &&
                            handleUpdate(flight, { departureCountry: x })
                        }
                        value={flight.departureCountry}
                        placeholder="Current location"
                    />
                </Flex>
                {!isMobile && (
                    <Flex styles={{ position: "relative" }} width="fit-content">
                        <FlightCircle>
                            <GoArrowSwitch color={ttColors.primary} size={24} />
                        </FlightCircle>
                    </Flex>
                )}
                <Flex
                    direction="column"
                    gap=".5rem"
                    styles={{ marginBottom: isMobile ? "1.2rem" : "0" }}
                >
                    <Text
                        type="label"
                        size={isMobile ? 16 : 16}
                        text="To"
                        weight={500}
                    />
                    <LocationSearchSelectInput
                        value={flight.arrivalCountry}
                        onChange={(x: Location) =>
                            handleUpdate &&
                            handleUpdate(flight, { arrivalCountry: x })
                        }
                        placeholder="Where to?"
                    />
                </Flex>
                <Flex
                    direction="column"
                    gap=".5rem"
                    styles={{ marginBottom: isMobile ? "1.2rem" : "0" }}
                >
                    <Text
                        type="label"
                        size={isMobile ? 16 : 16}
                        text="Depart"
                        weight={500}
                    />
                    <DatePicker
                        placeholder="Select Date"
                        position="start"
                        value={flight.departureDate?.toDate()}
                        minDate={today}
                        onChange={(e) =>
                            handleUpdate &&
                            handleUpdate(flight, { departureDate: dayjs(e) })
                        }
                    />
                </Flex>
                {stops !== "one-way" && (
                    <Flex
                        direction="column"
                        gap=".5rem"
                        styles={{ marginBottom: isMobile ? "1.2rem" : "0" }}
                    >
                        <Text
                            type="label"
                            size={isMobile ? 16 : 16}
                            text="Return"
                            weight={500}
                        />
                        <DatePicker
                            placeholder="Select Date"
                            position="start"
                            value={flight.returnDate?.toDate()}
                            minDate={flight.departureDate?.toDate()}
                            onChange={(e) =>
                                handleUpdate &&
                                handleUpdate(flight, { returnDate: dayjs(e) })
                            }
                        />
                    </Flex>
                )}
                <Flex
                    direction="column"
                    gap=".5rem"
                    styles={{ marginBottom: isMobile ? "1.2rem" : "0" }}
                >
                    <Text
                        type="label"
                        size={isMobile ? 16 : 16}
                        text="Cabin & Travelers"
                        weight={500}
                    />
                    <ClickAwayListener onClickAway={handleClose}>
                        <TravellersDropdownContainer>
                            <Input
                                onClick={handleClick}
                                placeholder="Click me to open dropdown"
                                value={defText}
                                styles={{
                                    fontFamily: "poppins",
                                    cursor: "pointer",
                                    fontSize: "14px",
                                }}
                            />
                            {open && (
                                <DropdownMenu
                                    onDataChange={handleDataChange}
                                    isMobile={isMobile}
                                    data={flight}
                                />
                            )}
                        </TravellersDropdownContainer>
                    </ClickAwayListener>
                </Flex>

                {canDelete && !isMobile && (
                    <Flex
                        width="fit-content"
                        styles={{ minWidth: "30px" }}
                        padding="0px 0px 0px"
                        cursor="pointer"
                        alignSelf="flex-end"
                        onClick={() => handleDelete && handleDelete(flight)}
                    >
                        <HiXMark size={30} color={ttColors.gray} />
                    </Flex>
                )}
            </Flex>

            {stops === "multi-city" && (
                <Flex
                    justify={isMobile ? "flex-end" : "flex-start"}
                    padding="0px 0px 20px"
                >
                    {canDelete && isMobile && (
                        <Flex
                            width="fit-content"
                            styles={{ minWidth: "30px" }}
                            padding="0"
                            cursor="pointer"
                            alignSelf="flex-end"
                            onClick={() => handleDelete && handleDelete(flight)}
                        >
                            <Button
                                padding=".5rem 1rem"
                                height="auto"
                                endIcon={
                                    <HiXMark
                                        size={26}
                                        color={ttColors.ghostWhite}
                                    />
                                }
                            >
                                Remove
                            </Button>
                        </Flex>
                    )}
                </Flex>
            )}
        </Section>
    );
}

export default FlightModule;
