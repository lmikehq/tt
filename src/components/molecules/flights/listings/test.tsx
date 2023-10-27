import CheckBox from "@molecule/checkbox";
import { Divider } from "@atom/divider";
import Flex from "@components/templates/flex";
import { CustomRadioGroup } from "@molecule/radio";
// import { SearchInputAsString } from "@organism/searchInput";
import { SearchInputAsString } from "@organism/searchInput";
import Text from "@atom/text";
import Section from "src/components/molecules/section";
import React, { useMemo, useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { LuSearch } from "react-icons/lu";
import { ButtonBox } from "../components/sortedFlightsTab";
import { styled } from "styled-components";
import PriceAlerts from "../components/priceAlerts";
import Button from "@/components/atoms/button";
import { ttColors } from "@/lib/theme/colors";
import Slider from "../../slider";
import PlusMinusButton from "@/components/organisms/flights/PlusMinusButton";
import { HiXMark } from "react-icons/hi2";
import { Grid } from "@/components/templates/grid";
import { fileURLToPath } from "url";
import dayjs from "dayjs";
import { FilterData } from "@/lib/types/request-models/flight/filter";

const Tag = styled.div`
  background: #87ceeb;
  border-radius: 4px;
  color: white;
  padding: 0.625em 0.875rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  svg {
    font-weight: bold;
    background: white;
    color: #87ceeb;
    border-radius: 50%;
    padding: 0.25em;
  }
`;

function SortingColumns() {
  const [filterData, setFilterData] = useState<FilterData>({
    bags: {
      cabin: 0,
      checked: 0,
    },
    stops: '',
    airlines: [],
    times: {
      depart: {
        min: "0:00",
        max: "23:59"
      },
      arrival: {
        min: "0:00",
        max: "23:59"
      },
    },
    alliance: [],
    duration: {
      stops: {
        min: 2,
        max: 25
      },
    },
    price: 0,
    cabin: [],
  });

  console.log(filterData);
  
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

  const handleTimeChange = (newValue: number | number[], time: 'arrival' | 'depart') => {
    const newMinTime = Array.isArray(newValue) ? convertTime(newValue[0]) : convertTime(newValue);
    const newMaxTime = Array.isArray(newValue)? convertTime(newValue[1]) : convertTime(newValue);
    setFilterData((prevFilterData) => ({
      ...prevFilterData,
      times: {
        ...prevFilterData.times,
        [time]: {
          min: newMinTime,
          max: newMaxTime,
        },
      },
    }));
  };

  const options = [
    { value: "any", label: "Any" },
    { value: "non", label: "Nonstop" },
    { value: "1stop", label: "Up to 1 stop" },
    { value: "2stop", label: "Up to 2 stops" },
  ];

  const marks = [
    {
      value: 0,
      label: "$0",
    },
    {
      value: 100,
      label: "Max",
    },
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

  const TimeBox = styled.div`
    background: #f3f3ff;
    padding: 0.5rem;
    border-radius: 8px;
  `;

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

  const toggleState = (filterName: FilterName) => {
    setFilterState((prevState) => ({
      ...prevState,
      [filterName]: !prevState[filterName],
    }));
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

  return (
    <Flex direction="column" maxWidth="310px" margin="1.5rem 0 0">
      <PriceAlerts />
      <Flex direction="column" padding="1rem 0" gap=".5rem" className="">
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
      <Flex direction="column">
        <Flex
          align="center"
          justify="space-between"
          padding="1rem 0"
          onClick={() => toggleColumn("bags")}
          cursor="pointer"
        >
          <Text type="p" text="Bags" weight={500} color="#06062A" />
          {columnState.bags ? (
            <BsChevronUp color="#06062A" size={20} />
          ) : (
            <BsChevronDown color="#06062A" size={20} />
          )}
        </Flex>
        {columnState.bags && (
          <Flex direction="column" justify="center" gap="1rem" padding="1rem 0">
            <Flex align="center" justify="space-between">
              <Text
                type="p"
                text="Cabin Baggage"
                size={14.5}
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
                size={14.5}
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
        )}
        <Divider direction="horizontal" />
      </Flex>
      <Flex direction="column">
        <Flex
          align="center"
          justify="space-between"
          padding="1rem 0"
          onClick={() => toggleColumn("stops")}
        >
          <Text type="p" text="Stops" weight={500} color="#06062A" />
          {columnState.stops ? (
            <BsChevronUp color="#06062A" size={20} />
          ) : (
            <BsChevronDown color="#06062A" size={20} />
          )}
        </Flex>
        {columnState.stops && (
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
            >
              <Text
                type="p"
                text="Allow overnight stopovers"
                whiteSpace="nowrap"
              />
            </CheckBox>
          </Flex>
        )}
        <Divider direction="horizontal" />
      </Flex>
      <Flex direction="column">
        <Flex
          align="center"
          justify="space-between"
          padding="1rem 0"
          onClick={() => toggleColumn("airlines")}
          cursor="pointer"
        >
          <Text type="p" text="Airlines" weight={500} color="#06062A" />
          {columnState.airlines ? (
            <BsChevronUp color="#06062A" size={20} />
          ) : (
            <BsChevronDown color="#06062A" size={20} />
          )}
        </Flex>
        {columnState.airlines && (
          <Flex direction="column" gap=".5rem">
            <Flex justify="space-between" align="center" gap=".5rem">
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
            <Button variant="link" padding="1rem 0" underlined={false}>
              Show less
            </Button>
          </Flex>
        )}
        <Divider direction="horizontal" />
      </Flex>
      <Flex direction="column" gap=".5rem">
        <Flex
          align="center"
          justify="space-between"
          padding="1rem 0"
          onClick={() => toggleColumn("times")}
          cursor="pointer"
        >
          <Text type="p" text="Times" weight={500} color="#06062A" />
          {columnState.times ? (
            <BsChevronUp color="#06062A" size={20} />
          ) : (
            <BsChevronDown color="#06062A" size={20} />
          )}
        </Flex>
        {columnState.times && (
          <Flex direction="column">
            <TimeBox>
              <Flex gap=".5rem" align="center" justify="center">
                <ButtonBox active={true}>
                  <Text type="p" text="Departure" weight={500} />
                </ButtonBox>
                <ButtonBox active={false}>
                  <Text type="p" text="Return" weight={500} />
                </ButtonBox>
              </Flex>
            </TimeBox>
            <Flex direction="column" gap=".25rem" padding="1rem 0">
              <Text type="p" text="Departure" size={18} weight={500} />
              <Text
                type="p"
                text="All Day"
                size={16}
                weight={500}
                color="#7BBBD6"
              />

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
              <Text type="p" text="Arrival" size={18} weight={500} />
              <Text
                type="p"
                text="All Day"
                size={16}
                weight={500}
                color="#7BBBD6"
              />
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
        )}
      </Flex>
      <Divider direction="horizontal" />
      <Flex direction="column">
        <Flex
          align="center"
          justify="space-between"
          padding="1rem 0"
          onClick={() => toggleColumn("alliance")}
        >
          <Text type="p" text="Alliance" weight={500} color="#06062A" />
          {columnState.alliance ? (
            <BsChevronUp color="#06062A" size={20} />
          ) : (
            <BsChevronDown color="#06062A" size={20} />
          )}
        </Flex>
        {columnState.alliance && (
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
        )}
        <Divider direction="horizontal" />
      </Flex>
      <Flex direction="column">
        <Flex
          align="center"
          justify="space-between"
          padding="1rem 0"
          onClick={() => toggleColumn("duration")}
          cursor="pointer"
        >
          <Text type="p" text="Duration" weight={500} color="#06062A" />
          {columnState.duration ? (
            <BsChevronUp color="#06062A" size={20} />
          ) : (
            <BsChevronDown color="#06062A" size={20} />
          )}
        </Flex>
        {columnState.duration && (
          <div>
            <Flex direction="column" gap=".25rem" padding=".5rem 0">
              <Text type="p" text="Max Travel Time" size={18} weight={500} />
              <Text
                type="p"
                text="Any"
                size={16}
                weight={500}
                color="#7BBBD6"
              />
              <Slider
                marks={[{ value: 100, label: "Max" }]}
                defaultValue={[0, 100]}
                onChange={() => toggleState("duration")}
              />
            </Flex>
            <Flex direction="column" gap=".25rem" padding=".5rem 0">
              <Text type="p" text="Stop Overs" size={18} weight={500} />
              <Text
                type="p"
                text="2 - 25 Hours"
                size={16}
                weight={500}
                color="#7BBBD6"
              />
              <Slider
                marks={[
                  { value: 2, label: `${filterData.duration.stops.min} Hours` },
                  { value: 25, label: `${filterData.duration.stops.max} Hours` },
                ]}
                defaultValue={[2, 25]}
                onChange={(event, newValue: number | number[]) => {
                  if (Array.isArray(newValue)) {
                    setFilterData((prevFilterData) => ({
                      ...prevFilterData,
                      duration: {
                        stops: {
                          min: newValue[0],
                          max: newValue[1],
                        }
                      },
                    }));
                  }
                }}
                min={2}
                max={25}
              />
            </Flex>
          </div>
        )}
        <Divider direction="horizontal" />
      </Flex>
      <Flex direction="column">
        <Flex
          align="center"
          justify="space-between"
          padding="1rem 0"
          onClick={() => toggleColumn("price")}
          cursor="pointer"
        >
          <Text type="p" text="Price" weight={500} color="#06062A" />
          {columnState.price ? (
            <BsChevronUp color="#06062A" size={20} />
          ) : (
            <BsChevronDown color="#06062A" size={20} />
          )}
        </Flex>
        <Text
          type="p"
          text="$0 - $40,000"
          size={16}
          weight={500}
          color="#7BBBD6"
        />
        {columnState.price && (
          <Slider
            defaultValue={[0, 100]}
            marks={marks}
            onChange={() => toggleState("price")}
          />
        )}
        <Divider direction="horizontal" />
      </Flex>
      <Flex direction="column">
        <Flex
          align="center"
          justify="space-between"
          padding="1rem 0"
          onClick={() => toggleColumn("cabin")}
          cursor="pointer"
        >
          <Text type="p" text="Cabin" weight={500} color="#06062A" />
          {columnState.cabin ? (
            <BsChevronUp color="#06062A" size={20} />
          ) : (
            <BsChevronDown color="#06062A" size={20} />
          )}
        </Flex>
        {columnState.cabin && (
          <Flex direction="column" gap=".25rem">
            {cabin.map((cabin, index) => (
              <CheckBox
                key={index}
                name={cabin}
                checked={filterData.cabin.includes(cabin)}
                onChange={(e) => handleCheck(e, "cabin")}
              >
                <Text type="p" text={cabin} size={16} />
              </CheckBox>
            ))}
          </Flex>
        )}
        <Divider direction="horizontal" />
      </Flex>
    </Flex>
  );
}

export default SortingColumns;
