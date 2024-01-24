"use client";

import React, { ReactNode, useContext, useEffect, useMemo } from "react";
import { useState } from "react";
import { FilterData } from "@/lib/types/request-models/flight/filter";
import PriceAlerts from "../components/priceAlerts";
import Flex from "@/components/templates/flex";
import styled from "styled-components";
import PlusMinusButton from "@/components/organisms/flights/PlusMinusButton";
import Text from "@atom/text";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import CheckBox from "@molecule/checkbox";
import { CustomRadioGroup } from "@molecule/radio";
import { LuSearch } from "react-icons/lu";
import { ttColors } from "@/lib/theme/colors";
import Slider from "../../slider";
import { ButtonBox } from "../components/sortedFlightsTab";
import dayjs from "dayjs";
import { Divider } from "@/components/atoms/divider";
import { useFlightBookingStore } from "@/lib/store/flight/booking.store";
import { extractSearchParamsFromUrl } from "@/lib/extensions/helpers/constructQuery";
import { AirlineInterface, FlightContext } from "@/lib/extensions/context";
import { capCase, cleanObject } from "@/lib/utilFns";
import { useQueryParams } from "@/hooks/useNext";
import { MdCancel } from "react-icons/md";
import SearchStringInput from "../../searchInputs/searchStringInput";
import { SearchFlightsRequestQuery } from "@/lib/types/request-models/flight/booking.type";
import { formatPrice } from "@/lib/extensions/helpers/formatPrice";
import { useUserPreferencesStore } from "@/lib/store/preferences.store";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { debounce } from "debounce";
const airlines = require("airline-iata-code");
const sortedAirlines: { [k: string]: AirlineInterface } = {};
airlines().forEach((e: AirlineInterface) => {
    sortedAirlines[e.Airline] = e;
});

const stopOptions = [
    { value: "any", label: "Any" },
    { value: 0, label: "Non-Stop" },
    { value: 1, label: "Up to 1 stop" },
    { value: 2, label: "Up to 2 stops" },
];

const cabinOptions = [
    { value: "M", label: "Economy" },
    { value: "W", label: "Economy Premium" },
    { value: "C", label: "Business" },
    { value: "F", label: "First Class" },
];

const alliance = ["Oneworld", "SkyTeam", "Star Alliance", "Value Alliance"];

const Tag = styled.div`
    background: #87ceeb;
    border-radius: 4px;
    color: white;
    padding: 0.6em 0.5rem;
    display: flex;
    justify-content: space-between;
    max-width: 310px;
`;


export const convertTime = (value: number) => {
    const minutes = value * 15;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const formattedTime = dayjs()
        .set("hour", hours)
        .set("minute", remainingMinutes)
        .format("HH:mm");
    switch (value) {
        case 0:
            return "0:00";
        case 96:
            return "23:59";
        default:
            return formattedTime;
    }
};

export function Panel({
    title,
    toggle,
    isActive,
    children,
    last,
}: {
    title: string;
    toggle: (x: string) => void;
    isActive: boolean;
    children?: ReactNode;
    last?: boolean;
}) {
    return (
        <Flex
            direction="column"
            margin={last ? "0 0 1rem" : ""}
            styles={{ position: "sticky", top: "0" }}
        >
            <Flex
                align="center"
                justify="space-between"
                padding="1rem 0"
                onClick={() => toggle("times")}
                cursor="pointer"
                margin="0 0 5px 0"
            >
                <Text type="p" text={title} weight={500} color="#06062A" />
                {isActive ? (
                    <BsChevronUp color={ttColors.lighterGray} size={20} />
                ) : (
                    <BsChevronDown color={ttColors.lighterGray} size={20} />
                )}
            </Flex>
            {isActive && children}
            {!last && <Divider direction="horizontal" px="1px" />}
        </Flex>
    );
}

function SortingColumns({ onClose }: { onClose?: () => void }) {
    const { searchFlights, searchFlightsMode, updateSearchQuery, searchQuery } =
        useFlightBookingStore((state) => state);
    const { preFerredCurrency, conversionRate } = useUserPreferencesStore(
        (state) => state
    );

    const flightContext = useContext(FlightContext);
    const flightState = flightContext?.state,
        dispatch = flightContext?.dispatch;
    const { queryParams } = useQueryParams();
    const { isMobile } = useScreenResolution();

    const initFilterData = {
        bags: {
            cabin: 0,
            checked: 0,
        },
        stops: "any",
        airlines: [],
        departTimes: {
            depart: {
                min: "0:00",
                max: "23:59",
            },
            arrival: {
                min: "0:00",
                max: "23:59",
            },
        },
        returnTimes: {
            depart: {
                min: "0:00",
                max: "23:59",
            },
            arrival: {
                min: "0:00",
                max: "23:59",
            },
        },
        alliance: [],
        duration: {
            stopOver: {
                min: 2,
                max: 48,
            },
            travelTime: {
                min: 2,
                max: 48,
            },
        },
        price: {
            min: 0,
            max: parseInt((20000 * conversionRate).toFixed(0)),
        },
        cabin: "M",
    };

    const [filterData, setFilterData] = useState<FilterData>({
        ...initFilterData,
        bags: {
            cabin: Number(
                Number(queryParams?.cabinBags) ?? initFilterData.bags.cabin
            ),
            checked: Number(
                Number(queryParams?.checkedBags) ?? initFilterData.bags.checked
            ),
        },
        price: {
            min: Number(searchQuery?.price_from ?? initFilterData.price.min),
            max: Number(searchQuery?.price_to ?? initFilterData.price.max),
        },
        departTimes: {
            arrival: {
                min:
                    searchQuery?.atime_from ??
                    initFilterData.departTimes.arrival.min,
                max:
                    searchQuery?.atime_to ??
                    initFilterData.departTimes.depart.max,
            },
            depart: {
                min:
                    searchQuery?.dtime_from ??
                    initFilterData.departTimes.depart.min,
                max:
                    searchQuery?.dtime_to ??
                    initFilterData.departTimes.depart.max,
            },
        },
        returnTimes: {
            arrival: {
                min:
                    searchQuery?.ret_atime_from ??
                    initFilterData.returnTimes.arrival.min,
                max:
                    searchQuery?.ret_atime_to ??
                    initFilterData.returnTimes.depart.max,
            },
            depart: {
                min:
                    searchQuery?.ret_dtime_from ??
                    initFilterData.returnTimes.depart.min,
                max:
                    searchQuery?.ret_dtime_to ??
                    initFilterData.returnTimes.depart.max,
            },
        },
        duration: {
            stopOver: {
                min: initFilterData.duration.stopOver.min,
                max: Number(
                    searchQuery?.max_stopovers ??
                        initFilterData.duration.stopOver.max
                ),
            },
            travelTime: {
                min: initFilterData.duration.travelTime.min,
                max: Number(
                    searchQuery?.max_fly_duration ??
                        initFilterData.duration.travelTime.max
                ),
            },
        },
        cabin: searchQuery?.selected_cabins ?? initFilterData?.cabin,
        stops: searchQuery?.stops ?? initFilterData?.stops,
    });

    const [filterState, setFilterState] = useState({
        bags: false,
        stops: false,
        airlines: false,
        times: false,
        alliance: false,
        duration: false,
        price: false,
        cabin: false,
    });

    type FilterName = keyof typeof filterData;

    const [activeTimes, setActiveTimes] = useState("depart");

    const [activeFilters, setActiveFilters] = useState<{
        list: string[];
        active: boolean;
    }>({
        list: [],
        active: false,
    });

    const setFilter = (value: string) => {
        setActiveFilters((prev) => ({
            ...prev,
            list: prev.list.includes(value) ? prev.list : [...prev.list, value],
        }));
    };

    const removeFilter = (value: string) => {
        setActiveFilters((prev) => ({
            ...prev,
            list: prev.list.includes(value)
                ? prev.list.filter((e) => e !== value)
                : prev.list,
        }));
        setFilterData((prev) => {
            const newFilter = {
                ...prev,
                [value]: initFilterData[value as FilterName],
            };
            handleFilterResults(newFilter);
            return { ...newFilter };
        });
    };

    const resetFilters = () => {
        setFilterData(initFilterData);
        setActiveFilters((prev) => ({
            ...prev,
            list: [],
            active: false,
        }));
        handleFilterResults(initFilterData);
    };

    const toggleFilter = (columnName: keyof typeof filterState) => {
        setFilterState((prevState) => ({
            ...prevState,
            [columnName]: !prevState[columnName],
        }));
    };

    const maxBags = useMemo(() => {
        const adults =
            Number(queryParams?.adults) === flightState?.fleet[0]?.adults
                ? flightState?.fleet[0]?.adults
                : Number(queryParams?.adults);
        const children =
            Number(queryParams?.children) === flightState?.fleet[0]?.children
                ? flightState?.fleet[0]?.children
                : Number(queryParams?.children);
        return {
            cabinBaggage: adults + children,
            checkedBaggage: (adults + children) * 2,
        };
    }, [flightState?.fleet, queryParams]);

    const handleBags = (
        bagType: "cabin" | "checked",
        actionType: "add" | "subtract"
    ) => {
        setFilterData((prevState) => {
            const currentValue = prevState.bags[bagType];
            const newValue =
                actionType === "add"
                    ? Math.min(
                          currentValue + 1,
                          bagType === "cabin"
                              ? maxBags.cabinBaggage
                              : maxBags.checkedBaggage
                      )
                    : Math.max(currentValue - 1, 0);
            dispatch &&
                dispatch({
                    type: "UPDATE_MULTI_FLIGHT",
                    payload: {
                        index: 0,
                        data: {
                            [bagType === "cabin"
                                ? "cabinBaggage"
                                : "checkedBaggage"]: newValue,
                        },
                    },
                });
            return {
                ...prevState,
                bags: {
                    ...prevState.bags,
                    [bagType]: newValue,
                },
            };
        });
        setFilter("bags");
    };

    const handleRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setFilterData((prev) => {
            return {
                ...prev,
                [name]: value === "on" ? name : value,
            };
        });
        setFilter(name);
    };

    type checkType = "alliance" | "airlines";

    const handleCheck = (value: string, checkType: checkType) => {
        setFilterData((prev) => ({
            ...prev,
            [checkType]: prev[checkType].includes(value)
                ? prev[checkType].filter((item) => item !== value)
                : [...prev[checkType], value],
        }));
        setFilter(checkType);
    };

    const handleTimeChange = debounce(
        (
            newValue: number | number[],
            time: "arrival" | "depart" | "travelTime" | "stopOver"
        ) => {
            const newMinTime = Array.isArray(newValue)
                ? convertTime(newValue[0])
                : convertTime(newValue);
            const newMaxTime = Array.isArray(newValue)
                ? convertTime(newValue[1])
                : convertTime(newValue);
            const group = ["travelTime", "stopOver"].includes(time)
                ? "duration"
                : activeTimes === "depart"
                ? "departTimes"
                : "returnTimes";

            setFilterData((prevFilterData) => ({
                ...prevFilterData,
                [group]: {
                    ...prevFilterData[group],
                    [time]: {
                        min: newMinTime,
                        max: newMaxTime,
                    },
                },
            }));
            setFilter(group);
        },
        800
    );

    const handleSlider = debounce(
        (
            newValue: number | number[],
            group: "duration" | "price",
            name: string
        ) => {
            const theValue = Array.isArray(newValue) ? newValue : [0, 0];
            if (group === "price") {
                setFilterData((prevFilterData) => ({
                    ...prevFilterData,
                    [name]: {
                        min: Number(theValue[0]).toFixed(0),
                        max: Number(theValue[1]).toFixed(0),
                    },
                }));
            } else {
                setFilterData((prevFilterData) => ({
                    ...prevFilterData,
                    [group]: {
                        ...prevFilterData[group],
                        [name]: {
                            min: theValue[0],
                            max: theValue[1],
                        },
                    },
                }));
            }
            setFilter(group);
        },
        800
    );

    const filteredTags = useMemo(
        () =>
            activeFilters.list.map((e, index) => (
                <Tag key={index} style={{ background: ttColors.dark }}>
                    <Text
                        type="p"
                        color="white"
                        text={capCase(e)}
                        margin="0 .5rem 0 0"
                    />{" "}
                    <Flex width="min-content" onClick={() => removeFilter(e)}>
                        <MdCancel size={25} color="white" cursor="pointer" />
                    </Flex>
                </Tag>
            )),
        [activeFilters]
    );

    const parseQuery = (data: FilterData): SearchFlightsRequestQuery => {
        const flight = flightState?.fleet[0];
        const adults = Number(flight?.adults);
        const children = Number(flight?.children);
        const adultsAndChildren = adults + children;

        const shareCabinBags = (numPass: number, numBags: number) => {
            const arrBags = Array.from({ length: numBags }).fill(1);
            const arrPass = Array.from({ length: numPass }).fill(0);

            return arrPass.map((e) => {
                let val = arrBags.length > 0 ? 1 : 0;
                arrBags.pop();
                return val;
            });
        };
        const shareCheckedBags = (numPass: number, numBags: number) => {
            const arrBags = Array.from({ length: numBags }).fill(1);
            const arrPass = Array.from({ length: numPass }).fill(0);
            arrBags.forEach((e, ind, arr) => {
                arrPass[ind % numPass] = Number(arrPass[ind % numPass]) + 1;
            });
            return arrPass;
        };

        const sharedCabin = shareCabinBags(adultsAndChildren, data.bags.cabin);
        const sharedChecked = shareCheckedBags(
            adultsAndChildren,
            data.bags.checked
        );
        const adultHandBags =
            adults > 0 ? sharedCabin.slice(0, adults).join(",") : undefined;
        const adultHoldBags =
            adults > 0 ? sharedChecked.slice(0, adults).join(",") : undefined;
        const childHandBags =
            children > 0 ? sharedCabin.slice(adults).join(",") : undefined;
        const childHoldBags =
            children > 0 ? sharedChecked.slice(adults).join(",") : undefined;

        const newParams = {
            ...searchQuery,
            adult_hand_bag: String(adultHandBags),
            adult_hold_bag: String(adultHoldBags),
            child_hand_bag: children > 0 ? String(childHandBags) : undefined,
            child_hold_bag: children > 0 ? String(childHoldBags) : undefined,
            select_airlines: data.airlines
                .map((e) => sortedAirlines[e]?.IATACode)
                .join(","),
            select_airlines_exclude: false,
            max_sector_stopovers: data.stops === "any" ? "" : data.stops,
            dtime_from: activeFilters.list.includes("times")
                ? data.departTimes.depart.min
                : undefined,
            dtime_to: activeFilters.list.includes("times")
                ? data.departTimes.depart.max
                : undefined,
            atime_from: activeFilters.list.includes("times")
                ? data.departTimes.arrival.min
                : undefined,
            atime_to: activeFilters.list.includes("times")
                ? data.departTimes.arrival.max
                : undefined,
            ret_dtime_from:
                flightState?.stops === "round"
                    ? data.returnTimes.depart.min
                    : undefined,
            ret_dtime_to:
                flightState?.stops === "round"
                    ? data.returnTimes.depart.max
                    : undefined,
            ret_atime_from:
                flightState?.stops === "round"
                    ? data.returnTimes.arrival.min
                    : undefined,
            ret_atime_to:
                flightState?.stops === "round"
                    ? data.returnTimes.arrival.max
                    : undefined,
            max_fly_duration: activeFilters.list.includes("duration")
                ? data.duration.travelTime.max
                : undefined,
            stopover_from: activeFilters.list.includes("duration")
                ? `${data.duration.stopOver.min}:00`
                : undefined,
            stopover_to: activeFilters.list.includes("duration")
                ? `${data.duration.stopOver.max}:00`
                : undefined,
            price_from: activeFilters.list.includes("price")
                ? data.price.min
                : undefined,
            price_to: activeFilters.list.includes("price")
                ? data.price.max
                : undefined,
            selected_cabins: data.cabin,
            sort: searchQuery?.sort,
        };
        return newParams;
    };

    const handleFilterResults = (data: FilterData) => {
        const parsed = parseQuery(data);
        updateSearchQuery({ data: cleanObject(parsed) });
        searchFlights({ data: cleanObject(parsed) }).then((res) => {
            setActiveFilters((prev) => ({ ...prev, active: true }));
        });
        onClose && onClose();
    };

    useEffect(() => {
        setFilterData((prev) => ({
            ...prev,
            bags: {
                ...prev.bags,
                cabin: Number(queryParams?.cabinBags) ?? prev.bags.cabin,
                checked: Number(queryParams?.checkedBags) ?? prev.bags.checked,
            },
        }));
    }, [queryParams]);

    useEffect(() => {
        activeFilters.list.length > 0 && handleFilterResults(filterData);
    }, [
        filterData.bags,
        filterData.price,
        filterData.departTimes,
        filterData.returnTimes,
        filterData.duration,
        filterData.airlines,
        filterData.alliance,
        filterData.cabin,
        filterData.stops,
    ]);

    return (
        <Flex direction="column">
            <PriceAlerts />

            {activeFilters.list.length > 0 && (
                <Flex direction="column" padding="1rem 0" gap=".5rem">
                    <Flex justify="space-between">
                        <Text
                            type="p"
                            color="#06062A"
                            text={`${activeFilters.list.length} Filters Active`}
                            weight={500}
                        />
                        <Text
                            type="p"
                            color={ttColors.primary}
                            text="Clear"
                            styles={{ textDecoration: "underline" }}
                            weight={500}
                            onClick={resetFilters}
                            cursor="pointer"
                        />
                    </Flex>
                    <Flex gap=".5rem" wrap="wrap">
                        {filteredTags}
                    </Flex>
                </Flex>
            )}

            {/* Number of Bags */}
            <Panel
                title="Bags"
                toggle={() => toggleFilter("bags")}
                isActive={filterState.bags}
            >
                <Flex
                    direction="column"
                    justify="center"
                    gap="1rem"
                    padding="1rem 0"
                >
                    <Flex align="center" justify="space-between">
                        <Text
                            type="p"
                            text="Cabin Baggage"
                            size={14}
                            whiteSpace="nowrap"
                        />
                        <Flex
                            width="50%"
                            gap=".5rem"
                            align="center"
                            justify="flex-end"
                        >
                            <PlusMinusButton
                                isDisabled={filterData.bags.cabin === 0}
                                onClick={() => handleBags("cabin", "subtract")}
                            >
                                <Text type="p" text="-" />
                            </PlusMinusButton>
                            <Text
                                type="p"
                                text={filterData.bags.cabin.toString()}
                                width="1.5rem"
                                textAlign="center"
                            />
                            <PlusMinusButton
                                isDisabled={
                                    filterData.bags.cabin >=
                                    maxBags.cabinBaggage
                                }
                                onClick={() => handleBags("cabin", "add")}
                            >
                                <Text type="p" text="+" />
                            </PlusMinusButton>
                        </Flex>
                    </Flex>
                    <Flex align="center" justify="space-between">
                        <Text
                            type="p"
                            text="Checked Baggage"
                            size={14}
                            whiteSpace="nowrap"
                        />
                        <Flex
                            width="50%"
                            gap=".5rem"
                            align="center"
                            justify="flex-end"
                        >
                            <PlusMinusButton
                                isDisabled={filterData.bags.checked === 0}
                                onClick={() =>
                                    handleBags("checked", "subtract")
                                }
                            >
                                <Text type="p" text="-" />
                            </PlusMinusButton>
                            <Text
                                type="p"
                                text={filterData.bags.checked.toString()}
                                width="1.5rem"
                                textAlign="center"
                            />
                            <PlusMinusButton
                                isDisabled={
                                    filterData.bags.checked >=
                                    maxBags.checkedBaggage
                                }
                                onClick={() => handleBags("checked", "add")}
                            >
                                <Text type="p" text="+" />
                            </PlusMinusButton>
                        </Flex>
                    </Flex>
                </Flex>
            </Panel>

            {/* Number of Stops */}
            <Panel
                title="Stops"
                toggle={() => toggleFilter("stops")}
                isActive={filterState.stops}
            >
                <Flex direction="column" align="flex-start" gap=".5rem">
                    <CustomRadioGroup
                        options={stopOptions}
                        name="stops"
                        value={filterData.stops}
                        onChange={(x) => handleRadio(x)}
                        justifyContent="flex-end"
                        align="flex-start"
                        direction="column"
                    />
                </Flex>
            </Panel>

            {/* Airlines */}
            <Panel
                title="Airlines"
                toggle={() => toggleFilter("airlines")}
                isActive={filterState.airlines}
            >
                <Flex direction="column" gap=".5rem">
                    <Flex direction="column" align="space-between" gap=".5rem">
                        <SearchStringInput
                            placeholder="Search Airlines"
                            options={Object.keys(sortedAirlines)}
                            onChange={(e: any) => handleCheck(e, "airlines")}
                            icon={<LuSearch color="#929292" size={20} />}
                        />
                    </Flex>
                    <Flex direction="column" gap="0rem" margin=".5rem 0 0">
                        {filterData.airlines.map((airline, index) => (
                            <CheckBox
                                key={index}
                                checked={true}
                                name={airline}
                                onChange={() =>
                                    handleCheck(airline, "airlines")
                                }
                            >
                                <Text type="p" text={airline} size={15} />
                            </CheckBox>
                        ))}
                    </Flex>
                </Flex>
            </Panel>

            {/* Times */}
            <Panel
                title="Times"
                toggle={() => toggleFilter("times")}
                isActive={filterState.times}
            >
                <Flex direction="column">
                    <Flex
                        gap=".5rem"
                        align="center"
                        padding="1rem"
                        justify="space-between"
                        borderRadius="8px"
                        background={ttColors.grayishAsh}
                    >
                        <ButtonBox
                            active={activeTimes === "depart"}
                            width="50%"
                            onClick={() => setActiveTimes("depart")}
                        >
                            <Text
                                type="p"
                                text="Departure"
                                weight={500}
                                size={16}
                            />
                        </ButtonBox>
                        <ButtonBox
                            active={activeTimes === "return"}
                            width="50%"
                            onClick={() => setActiveTimes("return")}
                        >
                            <Text
                                type="p"
                                text="Return"
                                weight={500}
                                size={16}
                            />
                        </ButtonBox>
                    </Flex>
                    <Flex direction="column" gap=".25rem" padding="1rem 0">
                        <Text type="p" text="Departure" weight={500} />
                        <Slider
                            marks={[
                                {
                                    value: 0,
                                    label:
                                        activeTimes === "depart"
                                            ? filterData.departTimes.depart.min
                                            : filterData.returnTimes.depart.min,
                                },
                                {
                                    value: 96,
                                    label:
                                        activeTimes === "depart"
                                            ? filterData.departTimes.depart.max
                                            : filterData.returnTimes.depart.max,
                                },
                            ]}
                            defaultValue={[0, 96]}
                            onChange={(event, newValue) =>
                                handleTimeChange(newValue, "depart")
                            }
                            min={0}
                            max={96}
                        />
                    </Flex>
                    <Flex direction="column" gap=".25rem" padding="1rem 0">
                        <Text type="p" text="Arrival" weight={500} />
                        <Slider
                            marks={[
                                {
                                    value: 0,
                                    label:
                                        activeTimes === "depart"
                                            ? filterData.departTimes.arrival.min
                                            : filterData.returnTimes.arrival
                                                  .min,
                                },
                                {
                                    value: 96,
                                    label:
                                        activeTimes === "depart"
                                            ? filterData.departTimes.arrival.max
                                            : filterData.returnTimes.arrival
                                                  .max,
                                },
                            ]}
                            defaultValue={[0, 96]}
                            onChange={(event, newValue) =>
                                handleTimeChange(newValue, "arrival")
                            }
                            min={0}
                            max={96}
                        />
                    </Flex>
                </Flex>
            </Panel>

            {/* Alliance */}
            <Panel
                title="Alliance"
                toggle={() => toggleFilter("alliance")}
                isActive={filterState.alliance}
            >
                <Flex direction="column" gap="0">
                    {alliance.map((alliance, index) => (
                        <CheckBox
                            key={index}
                            checked={filterData.alliance.includes(alliance)}
                            name={alliance}
                            onChange={(e) => handleCheck(alliance, "alliance")}
                        >
                            <Text type="p" text={alliance} size={16} />
                        </CheckBox>
                    ))}
                </Flex>
            </Panel>

            {/* Duration */}
            <Panel
                title="Duration"
                toggle={() => toggleFilter("duration")}
                isActive={filterState.duration}
            >
                <div>
                    <Flex direction="column" gap=".25rem" padding=".5rem 0">
                        <Text
                            type="p"
                            text="Max Travel Time"
                            size={16}
                            weight={500}
                        />
                        <Slider
                            marks={[
                                {
                                    value: 2,
                                    label: `${filterData.duration.travelTime.min} Hours`,
                                },
                                {
                                    value: 48,
                                    label: `${filterData.duration.travelTime.max} Hours`,
                                },
                            ]}
                            defaultValue={[
                                filterData.duration.travelTime.min,
                                filterData.duration.travelTime.max,
                            ]}
                            onChange={(event, newValue) =>
                                handleSlider(newValue, "duration", "travelTime")
                            }
                            min={2}
                            max={48}
                            leftOffset="20px"
                            rightOffset="-100px"
                        />
                    </Flex>
                    <Flex direction="column" gap=".25rem" padding=".5rem 0">
                        <Text
                            type="p"
                            text="Stop Overs"
                            size={16}
                            weight={500}
                        />
                        <Slider
                            marks={[
                                {
                                    value: 2,
                                    label: `${filterData.duration.stopOver.min} Hours`,
                                },
                                {
                                    value: 48,
                                    label: `${filterData.duration.stopOver.max} Hours`,
                                },
                            ]}
                            defaultValue={[
                                filterData.duration.stopOver.min,
                                filterData.duration.stopOver.max,
                            ]}
                            onChange={(event, newValue) =>
                                handleSlider(newValue, "duration", "stopOver")
                            }
                            min={2}
                            max={48}
                            leftOffset="20px"
                            rightOffset="-100px"
                        />
                    </Flex>
                </div>
            </Panel>

            {/* Price */}
            <Panel
                title="Price"
                toggle={() => toggleFilter("price")}
                isActive={filterState.price}
            >
                <Text
                    type="p"
                    text={`${formatPrice({
                        total: filterData.price.min,
                        currency: preFerredCurrency,
                        numberOfDecimalDigits: 0,
                    })} - ${formatPrice({
                        total: filterData.price.max,
                        currency: preFerredCurrency,
                        numberOfDecimalDigits: 0,
                    })}`}
                    size={16}
                    weight={500}
                    color="#7BBBD6"
                />
                <Slider
                    marks={[
                        {
                            value: 0,
                            label: formatPrice({
                                total: filterData.price.min,
                                currency: preFerredCurrency,
                                numberOfDecimalDigits: 0,
                            }),
                        },
                        {
                            value: 20000 * conversionRate,
                            label: formatPrice({
                                total: filterData.price.max,
                                currency: preFerredCurrency,
                                numberOfDecimalDigits: 0,
                            }),
                        },
                    ]}
                    defaultValue={[filterData.price.min, filterData.price.max]}
                    onChange={(event, newValue) =>
                        handleSlider(newValue, "price", "price")
                    }
                    min={0}
                    max={20000 * conversionRate}
                    step={250}
                    rightOffset="-160px"
                />
            </Panel>

            {/* Cabin */}
            <Panel
                title="Cabin"
                toggle={() => toggleFilter("cabin")}
                isActive={filterState.cabin}
                last
            >
                <Flex direction="column" gap=".25rem" margin="0 0 1.5rem 0">
                    <CustomRadioGroup
                        options={cabinOptions}
                        name="cabin"
                        onChange={(x) => handleRadio(x)}
                        value={filterData.cabin}
                        justifyContent="flex-end"
                        align="flex-start"
                        direction="column"
                    />
                </Flex>
            </Panel>

            {/* <LoadingButton
                onClick={() => handleFilterResults(filterData)}
                variant="contained"
                style={{
                    backgroundColor: ttColors.primary,
                    boxShadow: "none",
                    padding: ".9rem 0",
                }}
                loading={searchFlightsMode === Mode.loading}
            >
                <Text type="p" text="Apply" />
            </LoadingButton> */}
        </Flex>
    );
}

export default SortingColumns;
