"use client";

import Filter from "./filters";
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

const TimeBox = styled.div`
    background: #f3f3ff;
    border-radius: 8px;
`;

const options = [
    { value: "any", label: "Any" },
    { value: "non", label: "Non-Stop" },
    { value: "1stop", label: "Up to 1 stop" },
    { value: "2stop", label: "Up to 2 stops" },
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

const cabin = [
    "All Cabins",
    "Economy",
    "Premium Economy",
    "Business",
    "First Class",
];

const Tag = styled.div`
  background: #87ceeb;
  border-radius: 4px;
  color: white;
  padding: 0.625em 0.875rem;
  display: flex;
  flex-direction: column;
  max-width: 310px;
  margin: 1.5rem 0 0;
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
            <Divider direction="horizontal" />
        </Flex>
    )
}

function SortingColumns() {
  const [filterData, setFilterData] = useState<FilterData>({
        bags: {
            cabin: 0,
            checked: 0,
        },
        stops: "",
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
                max: 25
            },
            travelTime: {
                min: 2,
                max: 25,
            },
        },
        price: {
            min: 0,
            max: 40000
        },
        cabin: [],
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

  const [columnState, setColumnState] = useState({
    bags: false,
    stops: false,
    airlines: false,
    times: false,
    alliance: false,
    duration: false,
    price: false,
    cabin: false,
  });

  type ColumnName = keyof typeof columnState;

  const toggleColumn = (columnName: ColumnName) => {
    setColumnState((prevState) => ({
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
        actionType === "add" ? currentValue + 1 : Math.max(currentValue - 1, 0);
      return {
        ...prevState,
        bags: {
          ...prevState.bags,
          [bagType]: newValue,
        },
      };
    });
  };

  const handleStops = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setFilterData((prev) => {
      return {
        ...prev,
        stops: value === "on" ? name : value,
      };
    });
  };

    type checkType = "cabin" | "alliance" | "airlines";
    
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
    };
    
  type FilterName = keyof typeof filterState;

    const toggleState = (filterName: FilterName) => {
        setFilterState((prevState) => ({
            ...prevState,
            [filterName]: !prevState[filterName],
        }))
    }
    
    const handleSlider = (newValue: number[] | number, group: string, name: string) => {
        if (!!group) {
            setFilterData((prevFilterData) => ({
                ...prevFilterData,
                [group]: {
                    ...prevFilterData[group],
                    [name]: {
                        min: newValue[0],
                        max: newValue[1],
                    },
                },
            }));
        } else {
            setFilterData((prevFilterData) => ({
                ...prevFilterData,
                [name]: {
                    min: newValue[0],
                    max: newValue[1],
                },
            }));
        }
    };


  const filteredTags = useMemo(() => {
    return Object.entries(filterState).map(([key, value]) => {
      if (value) {
        return (
          <Tag key={key}>
            {key} <HiXMark size={25} />
          </Tag>
        );
      }
      return null;
    });
  }, [filterState]);

  const trueValuesCount = useMemo(() => {
    return Object.values(filterState).filter((value) => value === true).length;
  }, [filterState]);

    useEffect(() => {
        console.log('fff', filterData)
    }, [filterData])

    
  return (
    <Flex direction="column">
        <PriceAlerts />
        <Flex direction="column" padding="1rem 0" gap=".5rem">
            {trueValuesCount > 0 && (
                <Text
                    type="p"
                    text={`${trueValuesCount} Filters Active`}
                    weight={500}
                />
            )}
            <Grid columns="2" gap=".5rem">
                {filteredTags}
            </Grid>
        </Flex>
          
        {/* Number of Bags */}
        <Panel
            title="Bags"
            toggle={() => toggleColumn("bags")}
            isActive={columnState.bags}
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
                    <PlusMinusButton
                    onClick={() => handleBags("cabin", "subtract")}
                    >
                    <Text type="p" text="-" />
                    </PlusMinusButton>
                    <Text type="p" text={filterData.bags.cabin.toString()} />
                    <PlusMinusButton onClick={() => handleBags("cabin", "add")}>
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
                <Flex gap=".75rem" align="center" justify="flex-end">
                    <PlusMinusButton
                    onClick={() => handleBags("checked", "subtract")}
                    >
                    <Text type="p" text="-" />
                    </PlusMinusButton>
                    <Text type="p" text={filterData.bags.checked.toString()} />
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
            toggle={() => toggleColumn("stops")}
            isActive={columnState.stops}
        >
            <Flex direction="column" align="flex-start" gap=".5rem">
                <CustomRadioGroup
                options={options}
                name="flight"
                onChange={(x) => handleStops(x)}
                justifyContent="flex-end"
                align="flex-start"
                direction="column"
                />
                <CheckBox
                    name="overnight"
                    checked={filterData.stops === "overnight"}
                    onChange={(x) => handleStops(x)}
                    style={{ paddingLeft: '5px', fontSize: '14px' }}
                >
                <Text
                    type="p"
                    text="Allow overnight stopovers"
                    whiteSpace="nowrap"
                    size={14}
                />
                </CheckBox>
            </Flex>
        </Panel>
          
        {/* Airlines */}
        <Panel
            title="Airlines"
            toggle={() => toggleColumn("airlines")}
            isActive={columnState.airlines}
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
            toggle={() => toggleColumn("times")}
            isActive={columnState.times}
        >
            <Flex direction="column">
                <Flex gap=".5rem" align="center" justify="space-between" borderRadius="8px" background={ttColors.grayishAsh}>
                    <ButtonBox active={true}>
                        <Text type="p" text="Departure" weight={500} size={14} />
                    </ButtonBox>
                    <ButtonBox active={false}>
                        <Text type="p" text="Return" weight={500} size={14} />
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
                {/* <Text
                    type="p"
                    text="All Day"
                    size={16}
                    weight={500}
                    color="#7BBBD6"
                /> */}
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
            toggle={() => toggleColumn("alliance")}
            isActive={columnState.alliance}
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
            toggle={() => toggleColumn("duration")}
            isActive={columnState.duration}
        >
            <div>
                <Flex direction="column" gap=".25rem" padding=".5rem 0">
                <Text type="p" text="Max Travel Time" size={18} weight={500} />
                {/* <Text
                    type="p"
                    text="Any"
                    size={16}
                    weight={500}
                    color="#7BBBD6"
                /> */}
                <Slider
                    marks={[
                        { value: 2, label: `${filterData.duration.travelTime.min} Hours` },
                        { value: 25, label: `${filterData.duration.travelTime.max} Hours` },
                    ]}
                    defaultValue={[2, 25]}
                    onChange={(event, newValue) => handleSlider(newValue, 'duration', "travelTime")}
                    min={2}
                    max={25}
                />
                </Flex>
                <Flex direction="column" gap=".25rem" padding=".5rem 0">
                <Text type="p" text="Stop Overs" size={18} weight={500} />
                {/* <Text
                    type="p"
                    text="2 - 25 Hours"
                    size={16}
                    weight={500}
                    color="#7BBBD6"
                /> */}
                <Slider
                    marks={[
                        { value: 2, label: `${filterData.duration.stopOver.min} Hours` },
                        { value: 25, label: `${filterData.duration.stopOver.max} Hours` },
                    ]}
                    defaultValue={[2, 25]}
                    onChange={(event, newValue) => handleSlider(newValue, 'duration', "stopOver")}
                    min={2}
                    max={25}
                />
                </Flex>
            </div>
        </Panel>

        {/* Price */}
        <Panel
            title="Price"
            toggle={() => toggleColumn("price")}
            isActive={columnState.price}
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
                defaultValue={[0, 40000]}
                onChange={(event, newValue) => handleSlider(newValue, '', "price")}
            />
        </Panel>
          
        {/* Cabin */}
        <Panel
            title="Cabin"
            toggle={() => toggleColumn("cabin")}
            isActive={columnState.cabin}
        >
            <Flex direction="column" gap=".25rem">
                {cabin.map((cabin, index) => (
                <CheckBox
                    key={index}
                    name={cabin}
                    checked={filterData.cabin.includes(cabin)}
                    onChange={(e) => handleCheck(e, "cabin")}
                >
                    <Text type="p" text={cabin} size={14} />
                </CheckBox>
                ))}
            </Flex>
              
        </Panel>
    </Flex>
  );
};

export default SortingColumns;
