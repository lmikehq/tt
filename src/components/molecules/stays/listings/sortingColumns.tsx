import CheckBox from "@molecule/checkbox";
import { Divider } from "@atom/divider";
import Flex from "@components/templates/flex";
import { CustomRadioGroup } from "@molecule/radio";
// import { SearchInputAsString } from "@organism/searchInput";
import { SearchInputAsString } from "@organism/searchInput";
import Text from "@atom/text";
import Section from "src/components/molecules/section";
import React, { useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { LuSearch } from "react-icons/lu";
import { styled } from "styled-components";

import Button from "@/components/atoms/button";
import { ttColors } from "@/lib/theme/colors";
import Slider from "../../slider";
import PlusMinusButton from "@/components/organisms/flights/PlusMinusButton";
import { ButtonBox } from "../components/sortedRoomsTab";
import FavoriteHotels from "../components/favoriteHotels";
import PriceAlerts from "../components/priceAlerts";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

function SortingColumns() {
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
    popular: false,
    property: false,
    price: false,
    rating: false,
    guestRating: false,
    policy: false,
    services: false,
    plan: false,
    rooms: false,
    bed: false,
  });

  type ColumnName = keyof typeof columnState;

  const toggleColumn = (columnName: ColumnName) => {
    setColumnState((prevState) => ({
      ...prevState,
      [columnName]: !prevState[columnName],
    }));
  };

  return (
    <Flex direction="column">
      <PriceAlerts />
      <FavoriteHotels />
      <Flex direction="column">
        <Flex
          align="center"
          justify="space-between"
          padding="1rem 0"
          onClick={() => toggleColumn("popular")}
          cursor="pointer"
        >
          <Text type="p" text="Popular Type" weight={500} color="#06062A" />
          <BsChevronDown color="#06062A" size={20} />
        </Flex>
        {columnState.popular && (
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Label"
            />
          </FormGroup>
        )}
      </Flex>
      <Divider direction="horizontal" />
      <Flex direction="column">
        <Flex
          align="center"
          justify="space-between"
          padding="1rem 0"
          onClick={() => toggleColumn("property")}
        >
          <Text type="p" text="Property Type" weight={500} color="#06062A" />
          <BsChevronDown color="#06062A" size={20} />
        </Flex>
        {columnState.property && (
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
      </Flex>
      <Divider direction="horizontal" />
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
        <Text
          type="p"
          text="$0 - $40,000"
          size={16}
          weight={500}
          color="#7BBBD6"
        />
        {columnState.price && <Slider defaultValue={[0, 100]} marks={marks} />}
      </Flex>
      <Divider direction="horizontal" />
      <Flex direction="column">
        <Flex
          align="center"
          justify="space-between"
          padding="1rem 0"
          onClick={() => toggleColumn("rating")}
          cursor="pointer"
        >
          <Text type="p" text="Star Rating" weight={500} color="#06062A" />
          <BsChevronDown color="#06062A" size={20} />
        </Flex>
        {columnState.rating && (
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
              <CheckBox key={index} checked={false}>
                <Text type="p" text={airline} size={16} />
              </CheckBox>
            ))}
            <Button variant="link" padding="1rem 0" underlined={false}>
              Show less
            </Button>
          </Flex>
        )}
      </Flex>
      <Divider direction="horizontal" />
      <Flex direction="column" gap=".5rem">
        <Flex
          align="center"
          justify="space-between"
          padding="1rem 0"
          onClick={() => toggleColumn("guestRating")}
          cursor="pointer"
        >
          <Text type="p" text="Guest Rating" weight={500} color="#06062A" />
          <BsChevronDown color="#06062A" size={20} />
        </Flex>
        {columnState.guestRating && (
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
          onClick={() => toggleColumn("policy")}
          cursor="pointer"
        >
          <Text
            type="p"
            text="Cancellation Policy"
            weight={500}
            color="#06062A"
          />
          <BsChevronDown color="#06062A" size={20} />
        </Flex>
        {columnState.policy && (
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
      </Flex>
      <Divider direction="horizontal" />
      <Flex direction="column">
        <Flex
          align="center"
          justify="space-between"
          padding="1rem 0"
          onClick={() => toggleColumn("services")}
        >
          <Text
            type="p"
            text="Facilities & Services"
            weight={500}
            color="#06062A"
          />
          <BsChevronDown color="#06062A" size={20} />
        </Flex>
        {columnState.services && (
          <div>
            {alliance.map((airline, index) => (
              <CheckBox key={index} checked={false}>
                <Text type="p" text={airline} size={16} />
              </CheckBox>
            ))}
          </div>
        )}
      </Flex>
      <Divider direction="horizontal" />
      <Flex direction="column">
        <Flex
          align="center"
          justify="space-between"
          padding="1rem 0"
          onClick={() => toggleColumn("plan")}
          cursor="pointer"
        >
          <Text type="p" text="Meal Plan" weight={500} color="#06062A" />
          <BsChevronDown color="#06062A" size={20} />
        </Flex>
        {columnState.plan && (
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
      </Flex>
      <Divider direction="horizontal" />
      <Flex direction="column">
        <Flex
          align="center"
          justify="space-between"
          padding="1rem 0"
          onClick={() => toggleColumn("rooms")}
          cursor="pointer"
        >
          <Text type="p" text="Number of Rooms" weight={500} color="#06062A" />
          <BsChevronDown color="#06062A" size={20} />
        </Flex>
        {columnState.rooms && (
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
      </Flex>
      <Divider direction="horizontal" />
      <Flex direction="column">
        <Flex
          align="center"
          justify="space-between"
          padding="1rem 0"
          onClick={() => toggleColumn("bed")}
          cursor="pointer"
        >
          <Text type="p" text="Bed Type" weight={500} color="#06062A" />
          <BsChevronDown color="#06062A" size={20} />
        </Flex>
        {columnState.bed && (
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
      </Flex>
    </Flex>
  );
}

export default SortingColumns;
