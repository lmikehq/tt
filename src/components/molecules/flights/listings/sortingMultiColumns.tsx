import Flex from "@/components/templates/flex";
import { useQueryParams } from "@/hooks/useNext";
import {
    AirlineInterface,
    FlightContext,
    OneFlightType,
} from "@/lib/extensions/context";
import { useSearchMultiFlightStore } from "@/lib/store/flight/multi/search.store";
import { useUserPreferencesStore } from "@/lib/store/preferences.store";

import React, { ReactNode, useContext, useMemo, useState } from "react";
import { MdCancel } from "react-icons/md";
import { formatDate } from "@/lib/utilFns";

import PriceAlerts from "../components/priceAlerts";
import { debounce } from "debounce";
import Slider from "../../slider";
import Text from "@/components/atoms/text";
import { Panel, convertTime } from "./sortingColumns";
import PlusMinusButton from "@/components/organisms/flights/PlusMinusButton";
import { CustomRadioGroup } from "../../radio";
import SearchStringInput from "../../searchInputs/searchStringInput";
import CheckBox from "../../checkbox";
import { ButtonBox } from "../components/sortedMultiFlightsTab";
import { ttColors } from "@/lib/theme/colors";
import { IoCaretDown } from "react-icons/io5";
import { capCase } from "@/lib/utilFns";
import { LuSearch } from "react-icons/lu";
import { formatPrice } from "@/lib/extensions/helpers/formatPrice";
import { Counter } from "@/components/organisms/dropdownMenu";
import dayjs from "dayjs";
import {
    checkIfFieldIsFiltered,
    extractFlightDataFromParams,
} from "@/lib/types/request-models/flight/multi/search.type";
import styled from "styled-components";
import { translateCabin } from "../../serviceTabs/components/flight";
import { FlightSortEnum } from "@/lib/types/request-models/flight/booking.type";
import { useRouter, useSearchParams } from "next/navigation";
const airlines = require("airline-iata-code");
const sortedAirlines: { [k: string]: AirlineInterface } = {};
airlines().forEach((e: AirlineInterface) => {
    sortedAirlines[e.Airline] = e;
});

const stopOptions = [
    { value: "", label: "Any" },
    { value: "0", label: "Non-Stop" },
    { value: "1", label: "Up to 1 stop" },
    { value: "2", label: "Up to 2 stops" },
];
const cabinOptions = [
    { value: "M", label: "Economy" },
    { value: "W", label: "Economy Premium" },
    { value: "C", label: "Business" },
    { value: "F", label: "First Class" },
];

const defaultAcc = {
    bags: false,
    stops: false,
    airlines: false,
    // alliance: false,
    times: false,
    duration: false,
    price: false,
    cabin: false,
};

const Tag = styled.div`
    background: #87ceeb;
    border-radius: 4px;
    color: white;
    padding: 0.6em 0.5rem;
    display: flex;
    justify-content: space-between;
    max-width: 310px;
`;
interface AccordionProps {
    isOpen: boolean;
    onToggle: (x: number) => void;
    children: ReactNode;
    index: number;
    title: string;
}
function Accordion({
    isOpen,
    onToggle,
    children,
    index,
    title,
}: AccordionProps) {
    return (
        <Flex
            border={`1px solid ${ttColors.lightestGray}`}
            direction="column"
            borderRadius=".5rem"
            gap="2rem"
        >
            <Flex
                justify="space-between"
                padding="2rem 1.5rem"
                onClick={onToggle}
            >
                <Text type="p" text={title} weight={600} />
                <IoCaretDown size={20} color={ttColors.lighterGray} />
            </Flex>
            {isOpen ? (
                <Flex direction="column" padding="0 1.5rem">
                    {children}
                </Flex>
            ) : null}
        </Flex>
    );
}

interface SortingMultiColumnsProps {
    onClose?: () => void;
}
function SortingMultiColumns({ onClose }: SortingMultiColumnsProps) {
    const {
        searchMultiCityQuery,
        updateMultiCityQueryAtIndex,
        updateSearchMultiCityQuery,
    } = useSearchMultiFlightStore((s) => s);
    const { preFerredCurrency, conversionRate } = useUserPreferencesStore(
        (s) => s
    );
    const flightContext = useContext(FlightContext);
    const flightState = flightContext?.state;
    const dispatch = flightContext?.dispatch;

    const [openAcc, setOpenAcc] = useState(defaultAcc);
    const router = useRouter();

    const [openTimes, setOpenTimes] = useState("departure");

    const onToggleAcc = (type: string) => {
        setOpenAcc((prev) => ({
            ...prev,
            [type]: !prev[type as keyof typeof prev],
        }));
    };

    const maxBags = useMemo(
        () => ({
            cabinBaggage:
                (flightState?.fleet[0].adults ?? 0) +
                (flightState?.fleet[0].children ?? 0),
            checkedBaggage:
                ((flightState?.fleet[0].adults ?? 0) +
                    (flightState?.fleet[0].children ?? 0)) *
                2,
        }),
        [flightState]
    );

    const handleTwoSliderDebounce = debounce(
        ({
            min,
            max,
            minField,
            maxField,
            index,
        }: {
            min: string | number;
            max: string | number;
            minField: string;
            maxField: string;
            index: number;
        }) => {
            updateMultiCityQueryAtIndex(index, {
                [minField]: min,
                [maxField]: max,
            });
        },
        800
    );

    const handleUpdateMultiFlight = (
        index: number,
        data: Partial<OneFlightType>
    ) => {
        dispatch &&
            dispatch({
                type: "UPDATE_MULTI_FLIGHT",
                payload: { index, data },
            });
    };

    const computeActiveFilters = useMemo(() => {
        let active: string[] = [];
        Object.keys(defaultAcc).forEach((el) => {
            switch (el) {
                case "stops":
                    if (
                        checkIfFieldIsFiltered({
                            fieldName: "max_stopovers",
                            filters: searchMultiCityQuery,
                        })
                    ) {
                        active.push("stops");
                    }
                    break;
                case "times":
                    if (
                        checkIfFieldIsFiltered({
                            fieldName: "atime_from",
                            filters: searchMultiCityQuery,
                        }) ||
                        checkIfFieldIsFiltered({
                            fieldName: "atime_to",
                            filters: searchMultiCityQuery,
                        }) ||
                        checkIfFieldIsFiltered({
                            fieldName: "dtime_from",
                            filters: searchMultiCityQuery,
                        }) ||
                        checkIfFieldIsFiltered({
                            fieldName: "dtime_to",
                            filters: searchMultiCityQuery,
                        })
                    ) {
                        active.push("times");
                    }
                    break;
                case "airlines":
                    if (
                        checkIfFieldIsFiltered({
                            fieldName: "select_airlines",
                            filters: searchMultiCityQuery,
                        })
                    ) {
                        active.push("airlines");
                    }
                    break;
                case "duration":
                    if (
                        checkIfFieldIsFiltered({
                            fieldName: "max_fly_duration",
                            filters: searchMultiCityQuery,
                        }) ||
                        checkIfFieldIsFiltered({
                            fieldName: "stopover_from",
                            filters: searchMultiCityQuery,
                        }) ||
                        checkIfFieldIsFiltered({
                            fieldName: "stopover_to",
                            filters: searchMultiCityQuery,
                        })
                    ) {
                        active.push("duration");
                    }
                    break;
                case "price":
                    if (
                        checkIfFieldIsFiltered({
                            fieldName: "price_from",
                            filters: searchMultiCityQuery,
                        }) ||
                        checkIfFieldIsFiltered({
                            fieldName: "price_to",
                            filters: searchMultiCityQuery,
                        })
                    ) {
                        active.push("price");
                    }
                    break;
                case "cabin":
                    if (
                        checkIfFieldIsFiltered({
                            fieldName: "selected_cabins",
                            filters: searchMultiCityQuery,
                        })
                    ) {
                        active.push("cabin");
                    }
                    break;
            }
        });

        return active;
    }, [JSON.stringify(searchMultiCityQuery)]);

    const filteredTags = useMemo(
        () =>
            computeActiveFilters.map((e, index) => (
                <Tag key={index} style={{ background: ttColors.dark }}>
                    <Text
                        type="p"
                        color="white"
                        text={capCase(e)}
                        margin="0 .5rem 0 0"
                    />{" "}
                    <Flex width="min-content" onClick={() => {}}>
                        <MdCancel size={25} color="white" cursor="pointer" />
                    </Flex>
                </Tag>
            )),
        [JSON.stringify(computeActiveFilters)]
    );

    const resetFilters = () => {
        const flights = flightState?.fleet ?? [];
        const flight = flights![0];

        const adults = flight?.adults;
        const children = flight?.children;
        const infants = flight?.infants;
        const cabin = translateCabin(flight?.flightClass);
        const cabinBags = flight?.cabinBaggage;
        const checkedBags = flight?.checkedBaggage;
        const flyFrom = flights
            .map(
                (flight, index) =>
                    (index != 0 ? `~` : ``) +
                    (flight.departureCountry?.id ??
                        flight.departureCountry?.code)
            )
            .join("");
        console.log("another", flight?.departureDate);
        const url = `flight/listings?fly_from=${flyFrom}&fly_to=${flights
            .map(
                (flight, index) =>
                    (index != 0 ? `~` : ``) +
                    (flight.arrivalCountry?.id ?? flight.arrivalCountry?.code)
            )
            .join("")}&date_from=${flights
            .map(
                (flight, index) =>
                    (index != 0 ? `~` : ``) +
                    formatDate(flight?.departureDate ?? dayjs())
            )
            .join("")}&stops=${
            flightState?.stops
        }&cabin=${cabin}&adults=${adults}&children=${children}&infants=${infants}&cabinBags=${cabinBags}&checkedBags=${checkedBags}&multi=true
            `;
        const link = "https://localhost:3000/" + url;
        console.log(link);
        const data = extractFlightDataFromParams({
            url: link,
            flyFrom,
        });
        if (data) {
            let requests = data;
            requests[0] = {
                ...requests[0],
                curr: preFerredCurrency,
                sort: requests[0].sort ?? FlightSortEnum.best,
                limit: 50,
            };
            console.log(data, "data");
            updateSearchMultiCityQuery({ requests: data });
            window.history.replaceState(null, "", `/${url}`);
            // router.push("/flight/listings");
        }
    };

    return (
        <Flex direction="column">
            <PriceAlerts />

            {computeActiveFilters.length > 0 && (
                <Flex direction="column" padding="1rem 0" gap=".5rem">
                    <Flex justify="space-between">
                        <Text
                            type="p"
                            color="#06062A"
                            text={`${computeActiveFilters.length} Filters Active`}
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
                toggle={() => onToggleAcc("bags")}
                isActive={openAcc.bags}
            >
                <Flex
                    direction="column"
                    justify="center"
                    gap="1rem"
                    padding="1rem 0"
                    margin="0 0 1rem"
                    key={`filter-stops-bags`}
                >
                    <Flex align="center" justify="space-between">
                        <Text
                            type="p"
                            text="Cabin Baggage"
                            size={14}
                            whiteSpace="nowrap"
                        />
                        <Counter
                            value={
                                flightState?.fleet[0].cabinBaggage.toString() ??
                                "0"
                            }
                            onAdd={() =>
                                !(
                                    flightState?.fleet[0].cabinBaggage ==
                                    maxBags.cabinBaggage
                                ) &&
                                handleUpdateMultiFlight(0, {
                                    cabinBaggage:
                                        (flightState?.fleet[0].cabinBaggage ??
                                            0) + 1,
                                })
                            }
                            onSubtract={() =>
                                !(
                                    (flightState?.fleet[0].cabinBaggage ?? 0) <=
                                    0
                                ) &&
                                handleUpdateMultiFlight(0, {
                                    cabinBaggage:
                                        (flightState?.fleet[0].cabinBaggage ??
                                            1) - 1,
                                })
                            }
                            disabledAdd={
                                flightState?.fleet[0].cabinBaggage ==
                                maxBags.cabinBaggage
                            }
                            disabledSubtract={
                                (flightState?.fleet[0].cabinBaggage ?? 0) <= 0
                            }
                        />
                    </Flex>
                    <Flex align="center" justify="space-between">
                        <Text
                            type="p"
                            text="Checked Baggage"
                            size={14}
                            whiteSpace="nowrap"
                        />
                        <Counter
                            value={
                                flightState?.fleet[0].checkedBaggage.toString() ??
                                "0"
                            }
                            onAdd={() =>
                                !(
                                    flightState?.fleet[0].checkedBaggage ==
                                    maxBags.checkedBaggage
                                ) &&
                                handleUpdateMultiFlight(0, {
                                    checkedBaggage:
                                        (flightState?.fleet[0].checkedBaggage ??
                                            0) + 1,
                                })
                            }
                            onSubtract={() =>
                                !(
                                    (flightState?.fleet[0].checkedBaggage ??
                                        0) <= 0
                                ) &&
                                handleUpdateMultiFlight(0, {
                                    checkedBaggage:
                                        (flightState?.fleet[0].checkedBaggage ??
                                            1) - 1,
                                })
                            }
                            disabledAdd={
                                flightState?.fleet[0].checkedBaggage ==
                                maxBags.checkedBaggage
                            }
                            disabledSubtract={
                                (flightState?.fleet[0].checkedBaggage ?? 0) <= 0
                            }
                        />
                    </Flex>
                </Flex>
            </Panel>

            {/* Number of Stops */}
            <Panel
                title="Stops"
                toggle={() => onToggleAcc("stops")}
                isActive={openAcc.stops}
            >
                {searchMultiCityQuery.requests.map((req, index) => (
                    <Flex
                        direction="column"
                        gap=".5rem"
                        margin="0 0 1rem"
                        key={`filter-stops-${index}`}
                    >
                        <Text
                            type="p"
                            text={`${flightState?.fleet[index].departureCountry?.name} to ${flightState?.fleet[index].arrivalCountry?.name}`}
                            weight={500}
                        />
                        <Flex direction="column" align="flex-start" gap=".5rem">
                            <CustomRadioGroup
                                options={stopOptions}
                                name="stops"
                                value={
                                    searchMultiCityQuery.requests[index]
                                        ?.max_stopovers
                                }
                                onChange={(ev) =>
                                    updateMultiCityQueryAtIndex(index, {
                                        max_stopovers: ev.target.value,
                                    })
                                }
                                justifyContent="flex-end"
                                align="flex-start"
                                direction="column"
                            />
                        </Flex>
                    </Flex>
                ))}
            </Panel>

            {/* Airlines */}
            <Panel
                title="Airlines"
                toggle={() => onToggleAcc("airlines")}
                isActive={openAcc.airlines}
            >
                {searchMultiCityQuery.requests.map((req, index) => (
                    <Flex
                        direction="column"
                        gap=".5rem"
                        margin="0 0 1rem"
                        key={`filter-stops-${index}`}
                    >
                        <Text
                            type="p"
                            text={`${capCase(
                                flightState?.fleet[index].departureCountry?.name
                            )} to ${capCase(
                                flightState?.fleet[index].arrivalCountry?.name
                            )}`}
                            weight={500}
                        />
                        <Flex
                            direction="column"
                            align="space-between"
                            gap=".5rem"
                        >
                            <SearchStringInput
                                placeholder="Search Airlines"
                                options={Object.keys(sortedAirlines)}
                                onChange={(ev: any) => {
                                    const iata = airlines().find(
                                        (e: AirlineInterface) => e.Airline == ev
                                    ).IATACode;
                                    if (
                                        searchMultiCityQuery.requests[
                                            index
                                        ].select_airlines
                                            ?.split(",")
                                            .includes(iata)
                                    )
                                        return;

                                    updateMultiCityQueryAtIndex(index, {
                                        select_airlines: searchMultiCityQuery
                                            .requests[index].select_airlines
                                            ? [
                                                  searchMultiCityQuery.requests[
                                                      index
                                                  ].select_airlines,
                                                  iata,
                                              ].join(",")
                                            : iata,
                                    });
                                }}
                                icon={<LuSearch color="#929292" size={20} />}
                            />
                        </Flex>
                        {searchMultiCityQuery.requests[index]
                            .select_airlines && (
                            <Flex
                                direction="column"
                                gap="0rem"
                                margin=".5rem 0 0"
                            >
                                {searchMultiCityQuery.requests[
                                    index
                                ].select_airlines
                                    ?.split(",")
                                    .map((iata, i) => {
                                        const airlineObj: AirlineInterface =
                                            airlines().find(
                                                (e: AirlineInterface) =>
                                                    e.IATACode == iata
                                            );

                                        const airline = airlineObj.Airline;
                                        return (
                                            <CheckBox
                                                key={index}
                                                checked={true}
                                                name={airline}
                                                onChange={() => {
                                                    // const airlines=[...(searchMultiCityQuery.requests[index].select_airlines?.split(',')??[])]
                                                    // airlines=airlines.filter(el=>el==iata)
                                                    updateMultiCityQueryAtIndex(
                                                        index,
                                                        {
                                                            select_airlines:
                                                                searchMultiCityQuery.requests[
                                                                    index
                                                                ].select_airlines
                                                                    ?.split(",")
                                                                    .filter(
                                                                        (el) =>
                                                                            el !=
                                                                            iata
                                                                    )
                                                                    .join(","),
                                                        }
                                                    );
                                                }}
                                            >
                                                <Text
                                                    type="p"
                                                    text={airline}
                                                    size={15}
                                                />
                                            </CheckBox>
                                        );
                                    })}
                            </Flex>
                        )}
                    </Flex>
                ))}
            </Panel>

            {/* Times */}
            <Panel
                title="Times"
                toggle={() => onToggleAcc("times")}
                isActive={openAcc.times}
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
                            active={openTimes === "departure"}
                            width="100%"
                            onClick={() => setOpenTimes("departure")}
                        >
                            <Text
                                type="p"
                                text="Departure"
                                weight={500}
                                size={16}
                            />
                        </ButtonBox>
                        <ButtonBox
                            active={openTimes === "return"}
                            width="50%"
                            onClick={() => setOpenTimes("return")}
                        >
                            <Text
                                type="p"
                                text="Arrival"
                                weight={500}
                                size={16}
                            />
                        </ButtonBox>
                    </Flex>
                    {openTimes === "departure"
                        ? searchMultiCityQuery.requests.map((req, index) => (
                              <Flex
                                  direction="column"
                                  gap=".25rem"
                                  padding="1rem 0"
                                  margin="0 0 1rem"
                                  key={`filter-times-${index}`}
                              >
                                  <Text
                                      type="p"
                                      text={`Depart from ${flightState?.fleet[index].departureCountry?.name}`}
                                      weight={500}
                                  />
                                  <Slider
                                      marks={[
                                          {
                                              value: 0,
                                              label:
                                                  searchMultiCityQuery.requests[
                                                      index
                                                  ].dtime_from ?? "00:00",
                                          },
                                          {
                                              value: 23,
                                              label:
                                                  searchMultiCityQuery.requests[
                                                      index
                                                  ].dtime_to ?? "23:00",
                                          },
                                      ]}
                                      defaultValue={[
                                          parseInt(
                                              (
                                                  searchMultiCityQuery.requests[
                                                      index
                                                  ].dtime_from ?? "00:00"
                                              ).split(":")[0]
                                          ),
                                          parseInt(
                                              (
                                                  searchMultiCityQuery.requests[
                                                      index
                                                  ].dtime_to ?? "23:00"
                                              ).split(":")[0]
                                          ),
                                      ]}
                                      onChange={(event, value) =>
                                          handleTwoSliderDebounce({
                                              min: dayjs()
                                                  .hour((value as number[])[0])
                                                  .minute(0)
                                                  .format("HH:mm"),
                                              max: dayjs()
                                                  .hour((value as number[])[1])
                                                  .minute(0)
                                                  .format("HH:mm"),
                                              minField: "dtime_from",
                                              maxField: "dtime_to",
                                              index,
                                          })
                                      }
                                      min={0}
                                      max={23}
                                  />
                              </Flex>
                          ))
                        : searchMultiCityQuery.requests.map((req, index) => (
                              <Flex
                                  direction="column"
                                  gap=".25rem"
                                  padding="1rem 0"
                                  margin="0 0 1rem"
                                  key={`filter-stops-${index}`}
                              >
                                  <Text
                                      type="p"
                                      text={`Arrive in ${flightState?.fleet[index].arrivalCountry?.name}`}
                                      weight={500}
                                  />
                                  <Slider
                                      marks={[
                                          {
                                              value: 0,
                                              label:
                                                  searchMultiCityQuery.requests[
                                                      index
                                                  ].atime_from ?? "00:00",
                                          },
                                          {
                                              value: 23,
                                              label:
                                                  searchMultiCityQuery.requests[
                                                      index
                                                  ].atime_to ?? "23:00",
                                          },
                                      ]}
                                      defaultValue={[
                                          parseInt(
                                              (
                                                  searchMultiCityQuery.requests[
                                                      index
                                                  ].atime_from ?? "00:00"
                                              ).split(":")[0]
                                          ),
                                          parseInt(
                                              (
                                                  searchMultiCityQuery.requests[
                                                      index
                                                  ].atime_to ?? "23:00"
                                              ).split(":")[0]
                                          ),
                                      ]}
                                      onChange={(event, value) =>
                                          handleTwoSliderDebounce({
                                              min: dayjs()
                                                  .hour((value as number[])[0])
                                                  .minute(0)
                                                  .format("HH:mm"),
                                              max: dayjs()
                                                  .hour((value as number[])[1])
                                                  .minute(0)
                                                  .format("HH:mm"),
                                              minField: "atime_from",
                                              maxField: "atime_to",
                                              index,
                                          })
                                      }
                                      min={0}
                                      max={23}
                                  />
                              </Flex>
                          ))}
                </Flex>
            </Panel>

            {/* Duration */}
            <Panel
                title="Duration"
                toggle={() => onToggleAcc("duration")}
                isActive={openAcc.duration}
            >
                {searchMultiCityQuery.requests.map((req, index) => (
                    <Flex
                        direction="column"
                        gap=".5rem"
                        margin="0 0 1rem"
                        key={`filter-stops-${index}`}
                    >
                        <Text
                            type="p"
                            text={`${flightState?.fleet[index].departureCountry?.name} to ${flightState?.fleet[index].arrivalCountry?.name}`}
                            weight={500}
                        />
                        <div>
                            <Flex
                                direction="column"
                                gap=".25rem"
                                padding=".5rem 0"
                            >
                                <Text
                                    type="p"
                                    text="Max Travel Time"
                                    size={16}
                                    weight={500}
                                />
                                <Slider
                                    marks={[
                                        {
                                            value: 48,
                                            label: `${
                                                searchMultiCityQuery.requests[
                                                    index
                                                ].max_fly_duration ?? 48
                                            } Hour${
                                                searchMultiCityQuery.requests[
                                                    index
                                                ].max_fly_duration == 1
                                                    ? ""
                                                    : "s"
                                            }`,
                                        },
                                    ]}
                                    defaultValue={
                                        (searchMultiCityQuery.requests[index]
                                            .max_fly_duration as number) ?? 48
                                    }
                                    onChange={(event, value) =>
                                        updateMultiCityQueryAtIndex(index, {
                                            max_fly_duration: value as number,
                                        })
                                    }
                                    min={2}
                                    max={48}
                                    leftOffset="20px"
                                    rightOffset="-100px"
                                />
                            </Flex>
                            <Flex
                                direction="column"
                                gap=".25rem"
                                padding=".5rem 0"
                            >
                                <Text
                                    type="p"
                                    text="Stop Overs"
                                    size={16}
                                    weight={500}
                                />
                                <Slider
                                    marks={[
                                        {
                                            value: 0,
                                            label:
                                                searchMultiCityQuery.requests[
                                                    index
                                                ].stopover_from ?? "00:00",
                                        },
                                        {
                                            value: 48,
                                            label:
                                                searchMultiCityQuery.requests[
                                                    index
                                                ].stopover_to ?? "48:00",
                                        },
                                    ]}
                                    defaultValue={[0, 48]}
                                    value={[
                                        parseInt(
                                            (
                                                searchMultiCityQuery.requests[
                                                    index
                                                ].stopover_from ?? "00:00"
                                            ).split(":")[0]
                                        ),
                                        parseInt(
                                            (
                                                searchMultiCityQuery.requests[
                                                    index
                                                ].stopover_to ?? "48:00"
                                            ).split(":")[0]
                                        ),
                                    ]}
                                    onChange={(event, value) =>
                                        handleTwoSliderDebounce({
                                            min: dayjs()
                                                .hour((value as number[])[0])
                                                .minute(0)
                                                .format("HH:mm"),
                                            minField: "stopover_from",
                                            max: dayjs()
                                                .hour((value as number[])[1])
                                                .minute(0)
                                                .format("HH:mm"),
                                            maxField: "stopover_to",
                                            index,
                                        })
                                    }
                                    min={0}
                                    max={48}
                                />
                            </Flex>
                        </div>
                    </Flex>
                ))}
            </Panel>

            {/* Price */}
            <Panel
                title="Price"
                toggle={() => onToggleAcc("price")}
                isActive={openAcc.price}
            >
                {searchMultiCityQuery.requests.map((req, index) => (
                    <Flex
                        direction="column"
                        gap=".5rem"
                        margin="0 0 1rem"
                        key={`filter-stops-${index}`}
                    >
                        <Text
                            type="p"
                            text={`${flightState?.fleet[index].departureCountry?.name} to ${flightState?.fleet[index].arrivalCountry?.name}`}
                            weight={500}
                        />
                        <Text
                            type="p"
                            text={`${formatPrice({
                                total: (searchMultiCityQuery.requests[index]
                                    ?.price_from ??
                                    `${0 * conversionRate}`) as number,
                                currency: preFerredCurrency,
                                numberOfDecimalDigits: 0,
                            })} - ${formatPrice({
                                total: (searchMultiCityQuery.requests[index]
                                    ?.price_to ??
                                    `${20000 * conversionRate}`) as number,
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
                                        total: 0,
                                        currency: preFerredCurrency,
                                        numberOfDecimalDigits: 0,
                                    }),
                                },
                                {
                                    value: 20000 * conversionRate,
                                    label: formatPrice({
                                        total: 20000 * conversionRate,
                                        currency: preFerredCurrency,
                                        numberOfDecimalDigits: 0,
                                    }),
                                },
                            ]}
                            defaultValue={[
                                (searchMultiCityQuery.requests[index]
                                    ?.price_from ?? "0") as number,
                                (searchMultiCityQuery.requests[index]
                                    ?.price_to ??
                                    `${20000 * conversionRate}`) as number,
                            ]}
                            value={[
                                (searchMultiCityQuery.requests[index]
                                    ?.price_from ?? "0") as number,
                                (searchMultiCityQuery.requests[index]
                                    ?.price_to ??
                                    `${20000 * conversionRate}`) as number,
                            ]}
                            onChange={(event, value) => {
                                // handleSlider(index, value, "price")
                                console.log((value as number[])[0], "newnu");
                                handleTwoSliderDebounce({
                                    min: (value as number[])[0] || 0,
                                    max: (value as number[])[1],
                                    minField: "price_from",
                                    maxField: "price_to",
                                    index,
                                });
                            }}
                            min={0}
                            max={20000 * conversionRate}
                            step={250 * conversionRate}
                            rightOffset="-160px"
                        />
                    </Flex>
                ))}
            </Panel>

            {/* Cabin */}
            <Panel
                title="Cabin"
                toggle={() => onToggleAcc("cabin")}
                isActive={openAcc.cabin}
                last
            >
                {searchMultiCityQuery.requests.map((req, index) => (
                    <Flex
                        direction="column"
                        gap=".5rem"
                        margin="0 0 1rem"
                        key={`filter-stops-${index}`}
                    >
                        <Text
                            type="p"
                            text={`${flightState?.fleet[index].departureCountry?.name} to ${flightState?.fleet[index].arrivalCountry?.name}`}
                            weight={500}
                        />
                        <Flex
                            direction="column"
                            gap=".25rem"
                            margin="0 0 1.5rem 0"
                        >
                            <CustomRadioGroup
                                options={cabinOptions}
                                name="cabin"
                                onChange={(ev) =>
                                    updateMultiCityQueryAtIndex(index, {
                                        selected_cabins: ev.target.value,
                                    })
                                }
                                value={
                                    searchMultiCityQuery.requests[index]
                                        .selected_cabins
                                }
                                justifyContent="flex-end"
                                align="flex-start"
                                direction="column"
                            />
                        </Flex>
                    </Flex>
                ))}
            </Panel>
        </Flex>
    );
}

export default SortingMultiColumns;
