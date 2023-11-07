"use client";

import Filter from "./filters";
import LoadingButton from '@mui/lab/LoadingButton';
import React, { ReactNode, useEffect, useMemo } from "react";
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
import { SearchInputAsString } from "@organism/searchInput";
import { LuSearch } from "react-icons/lu";
import Button from "@/components/atoms/button";
import { ttColors } from "@/lib/theme/colors";
import Slider from "../../slider";
import { ButtonBox } from "../components/sortedFlightsTab";
import dayjs from "dayjs";
import { HiXMark } from "react-icons/hi2";
import { Grid } from "@/components/templates/grid";
import { Divider } from "@/components/atoms/divider";
import { useFlightBookingStore } from "@/lib/store/flight/booking.store";
import { extractSearchParamsFromUrl } from "@/lib/extensions/helpers/constructQuery";
import { Mode } from "@/lib/types";

const TimeBox = styled.div`
    background: #f3f3ff;
    border-radius: 8px;
`;

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

const airlines = [
    "Air Canada",
    "WestJet",
    "Air Transat",
    "Porter Airlines",
    "Sunwing Airlines",
    "Delta Air Lines",
    "United Airlines",
    "American Airlines",
    "British Airways",
    "Lufthansa",
];

const alliance = ["Oneworld", "SkyTeam", "Star Alliance", "Value Alliance"];

const initFilterData = {
    bags: {
        cabin: 0,
        checked: 0,
    },
    stops: "any",
    airlines: airlines,
    times: {
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
            max: 48
        },
        travelTime: {
            min: 2,
            max: 48,
        },
    },
    price: {
        min: 0,
        max: 40000
    },
    cabin: "",
}

const Tag = styled.div`
  background: #87ceeb;
  border-radius: 4px;
  color: white;
  padding: 0.625em 0.875rem;
  display: flex;
  justify-content: space-between;
  max-width: 310px;
`;


function Panel({ title, toggle, isActive, children }: { title: string; toggle: (x: string) => void; isActive: boolean; children?: ReactNode; } ) {
    return (
        <Flex direction="column">
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
            <Divider direction="horizontal" px="1px" />
        </Flex>
    )
}

function SortingColumns({ onClose }: { onClose?: () => void; }) {
    const {
        searchFlights,
        searchFlightsMode,
        updateSearchQuery,
        searchQuery,
    } = useFlightBookingStore((state) => state);
    const searchParams = extractSearchParamsFromUrl({ url: window.location.href });

    const [filterData, setFilterData] = useState<FilterData>({
        ...initFilterData,
        bags: {
            cabin: Number(searchParams?.adult_hold_bag ?? initFilterData.bags.cabin),
            checked: Number(searchParams?.adult_hand_bag ?? initFilterData.bags.checked),
        },
        price: {
            min: Number(searchParams?.price_from ?? initFilterData.price.min),
            max: Number(searchParams?.price_to ?? initFilterData.price.max),
        },
        times: {
            arrival: {
                min: searchParams?.atime_from ?? initFilterData.times.arrival.min,
                max: searchParams?.atime_to ?? initFilterData.times.depart.max,
            },
            depart: {
                min: searchParams?.dtime_from ?? initFilterData.times.depart.min,
                max: searchParams?.dtime_to ?? initFilterData.times.depart.max,
            }
        },
        duration: {
            stopOver: {
                min: initFilterData.duration.stopOver.min,
                max: Number(searchParams?.max_stopovers ?? initFilterData.duration.stopOver.max),
            },
            travelTime: {
                min: initFilterData.duration.travelTime.min,
                max: Number(searchParams?.max_fly_duration ?? initFilterData.duration.travelTime.max),
            }
        },
        cabin: searchParams?.selected_cabins ?? initFilterData?.cabin,
        stops: searchParams?.stops ?? initFilterData?.stops,
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
  
  type FilterName = keyof typeof filterState;
  
    const [activeFilters, setActiveFilters] = useState<{ list: string[]; active: boolean; }>({
        list: [],
        active: false,
    })

    const setFilter = (value: string) => {
        setActiveFilters(prev => ({
            ...prev,
            list: prev.list.includes(value) ? prev.list : [...prev.list, value]
        }))
    }

    const resetFilters = () => {
        setFilterData(initFilterData)
        setActiveFilters(prev => ({
            ...prev,
            list: [],
            active: false,
        }))
        handleFilterResults(initFilterData)
    }

  const toggleFilter = (columnName: FilterName) => {
        setFilterState((prevState) => ({
            ...prevState,
            [columnName]: !prevState[columnName],
        }));
    };

    const handleBags = (
        bagType: "cabin" | "checked",
        actionType: "add" | "subtract"
    ) => {
        setFilterData((prevState) => {
        const currentValue = prevState.bags[bagType];
        const newValue =
            actionType === "add" ? Math.min(currentValue + 1, 10) : Math.max(currentValue - 1, 0);
        return {
            ...prevState,
            bags: {
            ...prevState.bags,
            [bagType]: newValue,
            },
        };
        });
        setFilter('bags')
    };

  const handleRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setFilterData((prev) => {
      return {
        ...prev,
        [name]: value === "on" ? name : value,
      };
    });
      setFilter('stops')
  };

    type checkType = "alliance" | "airlines";
    
  const handleCheck = (
    event: React.ChangeEvent<HTMLInputElement>,
    checkType: checkType
  ) => {
    const { name } = event.target;
    setFilterData((prev) => {
      const prevArray = prev[checkType] || [];
      if (prevArray.includes(name)) {
        return {
          ...prev,
          [checkType]: prevArray.filter((item) => item !== name),
        };
      } else {
        return {
          ...prev,
          [checkType]: [...prevArray, name],
        };
      }
    });
      setFilter(checkType)
    };
    
    const handleCheckAll = (
        event: React.ChangeEvent<HTMLInputElement>,
        checkType: checkType,
        allOptions: any[]
    ) => {
        setFilterData((prev) => ({
            ...prev,
            [checkType]: allOptions,
        })
        )
        setFilter(checkType)
    }

    const convertTime = (value: number) => {
        const minutes = value * 15;
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        const formattedTime = dayjs().set('hour', hours).set('minute', remainingMinutes).format('HH:mm');
        switch (value) {
        case 0:
            return "0:00";
        case 96:
            return "23:59";
        default:
            return formattedTime;
        }
    };


  const handleTimeChange = (newValue: number | number[], time: 'arrival' | 'depart' | 'travelTime' | 'stopOver') => {
    const newMinTime = Array.isArray(newValue) ? convertTime(newValue[0]) : convertTime(newValue);
      const newMaxTime = Array.isArray(newValue) ? convertTime(newValue[1]) : convertTime(newValue);
      const group = ['travelTime', 'stopOver'].includes(time) ? 'duration' : 'times'
    
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
        setFilter(group)
    };
    
    const handleSlider = (newValue: number | number[], group: 'duration' | 'price', name: string) => {
        const theValue = Array.isArray(newValue) ? newValue : [0, 0]
        if (group === 'price') {
            setFilterData((prevFilterData) => ({
                ...prevFilterData,
                [name]: {
                    min: theValue[0],
                    max: theValue[1],
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
        setFilter(group)
    };

    const filteredTags = useMemo(() =>
        activeFilters.list.map((e, index) =>
            <Tag key={index}>
                {e} <HiXMark size={25} />
            </Tag>
        )
    , [activeFilters]);
    
    const handleFilterResults = (data: FilterData) => {
        const newParams = {
            ...searchParams,
            adult_hold_bag: String(data.bags.cabin),
            adult_hand_bag: String(data.bags.checked),
            max_sector_stopovers: data.stops === 'any' ? '' : data.stops,
            dtime_from: data.times.depart.min,
            dtime_to: data.times.depart.max,
            atime_from: data.times.arrival.min,
            atime_to: data.times.arrival.max,
            max_fly_duration: data.duration.travelTime.max,
            stopover_from: `${data.duration.stopOver.min}:00`,
            stopover_to: `${data.duration.stopOver.max}:00`,
            price_from: data.price.min,
            price_to: data.price.max,
            selected_cabins: data.cabin,
        }
        updateSearchQuery({ data: newParams });
        searchFlights({ data: newParams })
            .then(res => {
                setActiveFilters(prev => ({ ...prev, active: true }))
            })
        
        onClose && onClose()
    }


    
  return (
    <Flex direction="column">
        <PriceAlerts />
        {activeFilters.list.length > 0 &&
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
                        styles={{ textDecoration: 'underline' }}
                        weight={500}
                        onClick={resetFilters}
                    />
                </Flex>
                <Grid columns="2" gap=".5rem">
                    {filteredTags}
                </Grid>
            </Flex>
        }
          
        {/* Number of Bags */}
        <Panel
            title="Bags"
            toggle={() => toggleFilter("bags")}
            isActive={filterState.bags}
        >
            <Flex direction="column" justify="center" gap="1rem" padding="1rem 0">
                <Flex align="center" justify="space-between">
                <Text
                    type="p"
                    text="Cabin Baggage"
                    size={14}
                    whiteSpace="nowrap"
                />
                <Flex gap=".75rem" align="center" justify="flex-end">
                    <PlusMinusButton onClick={() => handleBags("cabin", "subtract")}>
                        <Text type="p" text="-"/>
                    </PlusMinusButton>
                    <Text type="p" text={filterData.bags.cabin.toString()} width="1.5rem" textAlign="center" />
                    <PlusMinusButton onClick={() => handleBags("cabin", "add")}>
                        <Text type="p" text="+"/>
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
                <Flex gap=".75rem" align="center" justify="flex-end">
                    <PlusMinusButton onClick={() => handleBags("checked", "subtract")}>
                        <Text type="p" text="-" />
                    </PlusMinusButton>
                    <Text type="p" text={filterData.bags.checked.toString()} width="1.5rem" textAlign="center" />
                    <PlusMinusButton onClick={() => handleBags("checked", "add")}>
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
                {/* <CheckBox
                    name="overnight"
                    checked={filterData.stops === "overnight"}
                    onChange={(x) => handleRadio(x)}
                    style={{ paddingLeft: '5px', fontSize: '14px' }}
                >
                <Text
                    type="p"
                    text="Allow overnight stopovers"
                    whiteSpace="nowrap"
                    size={14}
                />
                </CheckBox> */}
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
                <SearchInputAsString
                    options={airlines}
                    onChange={(e: any) => console.log(e)}
                    placeholder="Search Airlines"
                >
                    <LuSearch color="#929292" size={20} />
                </SearchInputAsString>

                <Button
                    variant="link"
                    underlined={false}
                    color={ttColors.primaryLight}
                    onClick={e => handleCheckAll(e, 'airlines', airlines)}
                >
                    Select all
                </Button>
                </Flex>
                {airlines.map((airline, index) => (
                <CheckBox
                    key={index}
                    checked={filterData.airlines.includes(airline)}
                    name={airline}
                    onChange={(e) => handleCheck(e, "airlines")}
                >
                    <Text type="p" text={airline} size={16} />
                </CheckBox>
                ))}
                {/* <Button variant="link" padding="1rem 0" underlined={false}>
                Show less
                </Button> */}
            </Flex>
        </Panel>
          
        {/* Times */}
        <Panel
            title="Times"
            toggle={() => toggleFilter("times")}
            isActive={filterState.times}
        >
            <Flex direction="column">
                <Flex gap=".5rem" align="center" padding="1rem" justify="space-between" borderRadius="8px" background={ttColors.grayishAsh}>
                    <ButtonBox active={true} width="50%">
                        <Text type="p" text="Departure" weight={500} size={16} />
                    </ButtonBox>
                    <ButtonBox active={false} width="50%">
                        <Text type="p" text="Return" weight={500} size={16} />
                    </ButtonBox>
                </Flex>
                <Flex direction="column" gap=".25rem" padding="1rem 0">
                    <Text type="p" text="Departure" weight={500} />
                    {/* <Text
                        type="p"
                        text="All Day"
                        size={16}
                        weight={500}
                        color="#7BBBD6"
                    /> */}
                    <Slider
                        marks={[
                            { value: 0, label: filterData.times.depart.min },
                            { value: 96, label: filterData.times.depart.max },
                        ]}
                        defaultValue={[0, 96]}
                        onChange={(event, newValue) => handleTimeChange(newValue, 'depart')}
                        min={0}
                        max={96}
                    />
                </Flex> 
                <Flex direction="column" gap=".25rem" padding="1rem 0">
                    <Text type="p" text="Arrival" weight={500} />
                    <Slider
                        marks={[
                            { value: 0, label: filterData.times.arrival.min },
                            { value: 96, label: filterData.times.arrival.max },
                        ]}
                        defaultValue={[0, 96]}
                        onChange={(event, newValue) => handleTimeChange(newValue, 'arrival')}
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
            <div>
                {alliance.map((alliance, index) => (
                    <CheckBox
                        key={index}
                        checked={filterData.alliance.includes(alliance)}
                        name={alliance}
                        onChange={(e) => handleCheck(e, "alliance")}
                    >
                        <Text type="p" text={alliance} size={16} />
                    </CheckBox>
                ))}
            </div>
        </Panel>
              
        {/* Duration */}
        <Panel
            title="Duration"
            toggle={() => toggleFilter("duration")}
            isActive={filterState.duration}
        >
            <div>
                <Flex direction="column" gap=".25rem" padding=".5rem 0">
                    <Text type="p" text="Max Travel Time" size={16} weight={500} />
                    <Slider
                        marks={[
                            { value: 2, label: `${filterData.duration.travelTime.min} Hours` },
                            { value: 48, label: `${filterData.duration.travelTime.max} Hours` },
                        ]}
                        defaultValue={[filterData.duration.travelTime.min, filterData.duration.travelTime.max]}
                        onChange={(event, newValue) => handleSlider(newValue, 'duration', "travelTime")}
                        min={2}
                        max={48}
                    />
                </Flex>
                <Flex direction="column" gap=".25rem" padding=".5rem 0">
                    <Text type="p" text="Stop Overs" size={16} weight={500} />
                    <Slider
                        marks={[
                            { value: 2, label: `${filterData.duration.stopOver.min} Hours` },
                            { value: 48, label: `${filterData.duration.stopOver.max} Hours` },
                        ]}
                        defaultValue={[filterData.duration.stopOver.min, filterData.duration.stopOver.max]}
                        onChange={(event, newValue) => handleSlider(newValue, 'duration', "stopOver")}
                        min={2}
                        max={48}
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
                text="$0 - $40,000"
                size={16}
                weight={500}
                color="#7BBBD6"
            />
            <Slider
                marks={[
                    { value: 0, label: `$${filterData.price.min}` },
                    { value: 40000, label: `$${filterData.price.max}` },
                ]}
                defaultValue={[filterData.price.min, filterData.price.max]}
                onChange={(event, newValue) => handleSlider(newValue, 'price', "price")}
                min={0}
                max={40000}
                step={250}
            />
        </Panel>
          
        {/* Cabin */}
        <Panel
            title="Cabin"
            toggle={() => toggleFilter("cabin")}
            isActive={filterState.cabin}
        >
              <Flex direction="column" gap=".25rem">
                  <CustomRadioGroup
                    options={cabinOptions}
                    name="cabin"
                    onChange={(x) => handleRadio(x)}
                    justifyContent="flex-end"
                    align="flex-start"
                    direction="column"
                />
                {/* {cabin.map((cabin, index) => (
                <CheckBox
                    key={index}
                    name={cabin}
                    checked={filterData.cabin.includes(cabin)}
                    onChange={(e) => handleCheck(e, "cabin")}
                >
                    <Text type="p" text={cabin} size={14} />
                </CheckBox>
                ))} */}
            </Flex>
              
        </Panel>
          
            <LoadingButton
                onClick={() => handleFilterResults(filterData)}
                variant="contained"
                style={{ backgroundColor: ttColors.primary, boxShadow: 'none', padding: ".9rem 0" }}
                loading={searchFlightsMode === Mode.loading}
            >
              <Text type="p" text="Apply"/>
          </LoadingButton>
    </Flex>
  );
};

export default SortingColumns;
