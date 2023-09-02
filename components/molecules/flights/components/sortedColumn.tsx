import CheckBox from "@atom/checkbox";
import { Divider } from "@atom/divider";
import Flex from "@atom/flex";
import { CustomRadioGroup } from "@atom/radio";
import { SearchInputAsString } from "@atom/searchInput";
import Text from "@atom/text";
import Section from "@molecule/section";
import { Slider } from "@mui/material";
import React, { useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { LuSearch } from "react-icons/lu";
import { ttColors } from "theme/colors";
import { ButtonBox } from "./sortedFlightsTab";
import { styled } from "styled-components";

function SortedColumn() {
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

  return (
    <Section>
      <Flex direction="column">
        <Flex direction="column">
          <Flex
            align="center"
            justify="space-between"
            padding="1rem 0"
            onClick={() => toggleColumn("bags")}
            cursor="pointer"
          >
            <Text type="p" text="Bags" weight={500} color="#06062A" />
            <BsChevronDown color="#06062A" size={20} />
          </Flex>
          {columnState.bags && (
            <Flex
              direction="column"
              justify="center"
              gap="1rem"
              padding="1rem 0"
            >
              <Flex align="center" justify="space-between">
                <Text
                  type="p"
                  text="Cabin Babbage"
                  size={14.5}
                  whiteSpace="nowrap"
                />
                <Flex gap=".75rem" align="center" justify="flex-end">
                  <AiOutlineMinusCircle size={30} />
                  <Text type="p" text="0" />
                  <AiOutlinePlusCircle size={30} />
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
                  <AiOutlineMinusCircle size={30} />
                  <Text type="p" text="0" />
                  <AiOutlinePlusCircle size={30} />
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
            <BsChevronDown color="#06062A" size={20} />
          </Flex>
          {columnState.stops && (
            <Flex direction="column" align="flex-start" gap=".5rem">
              <CustomRadioGroup
                options={options}
                name="flight"
                onChange={(e: any) => console.log(e.target.value)}
                justifyContent="flex-end"
                align="flex-start"
                direction="column"
              />
              <CheckBox checked={false}>
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
            <BsChevronDown color="#06062A" size={20} />
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
                <Text
                  type="p"
                  text="Select all"
                  color="#6092A7"
                  weight={600}
                  whiteSpace="nowrap"
                  size={14}
                />
              </Flex>
              {airlines.map((airline, index) => (
                <CheckBox key={index} checked={false}>
                  <Text type="p" text={airline} size={16} />
                </CheckBox>
              ))}
              <Text type="p" text="Show less" color="#6092A7" weight={600} />
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
            <BsChevronDown color="#06062A" size={20} />
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
                    { value: 0, label: "0:00" },
                    { value: 100, label: "23:59" },
                  ]}
                  defaultValue={[0, 100]}
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
                    { value: 0, label: "0:00" },
                    { value: 100, label: "23:59" },
                  ]}
                  defaultValue={[0, 100]}
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
            <BsChevronDown color="#06062A" size={20} />
          </Flex>
          {columnState.alliance && (
            <div>
              {alliance.map((airline, index) => (
                <CheckBox key={index} checked={false}>
                  <Text type="p" text={airline} size={16} />
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
            <BsChevronDown color="#06062A" size={20} />
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
                  defaultValue={100}
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
                    { value: 0, label: "2 Hours" },
                    { value: 100, label: "25 Hours" },
                  ]}
                  defaultValue={[0, 100]}
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
            <BsChevronDown color="#06062A" size={20} />
          </Flex>
          {columnState.price && <Slider defaultValue={0} marks={marks} />}
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
            <BsChevronDown color="#06062A" size={20} />
          </Flex>
          {columnState.cabin && (
            <Flex direction="column" gap=".75rem">
              <CheckBox checked={false}>
                <Text type="p" text="All Cabins" whiteSpace="nowrap" />
              </CheckBox>
              <CheckBox checked={false}>
                <Text type="p" text="Economy" whiteSpace="nowrap" />
              </CheckBox>
              <CheckBox checked={false}>
                <Text type="p" text="Premium Economy" whiteSpace="nowrap" />
              </CheckBox>
              <CheckBox checked={false}>
                <Text type="p" text="Business" whiteSpace="nowrap" />
              </CheckBox>
              <CheckBox checked={false}>
                <Text
                  type="p"
                  text="First Class"
                  whiteSpace="nowrap"
                  weight={400}
                />
              </CheckBox>
            </Flex>
          )}
          <Divider direction="horizontal" />
        </Flex>
      </Flex>
    </Section>
  );
}

export default SortedColumn;
