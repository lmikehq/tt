"use client";
import Section from "@molecule/section";
import React, { useState, useContext } from "react";
import Flex from "./flex";
import Text from "./text";
import SearchInput from "./searchInput";
import { COUNTRY_FLAGS } from "data/COUNTRY_FLAGS";
import { IoLocationOutline } from "react-icons/io5";
import { GoArrowSwitch } from "react-icons/go";
import { ttColors } from "theme/colors";
import { DatePicker } from "./datepicker";
import { ClickAwayListener } from "@mui/material";
import Input from "./input";
import DropdownMenu from "./dropdownMenu";
import { styled } from "styled-components";
import { HiXMark } from "react-icons/hi2";
import { CountryType } from "@molecule/serviceTabs/components/visa";
import { flightContext } from "context";

interface flightProps {
  value: string;
  index: number;
  length: number;
  handleDeleteFlight: (index: number) => void;
}

const FlightCircle = styled.div<{ value: string }>`
  position: absolute;
  left: ${(props) => (props.value === "one-way" ? "31%" : "27.5%")};
  margin-top: 2.5rem;
  background: white;
  border: 1px solid #b6b6b6;
  width: 2rem;
  height: 2rem;
  padding: 0.25rem;
  border-radius: 100%;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-items: center;
`;

function FlightModule({
  value,
  index,
  handleDeleteFlight,
  length,
}: flightProps) {
  const context = flightContext();

  if (!context) {
    throw new Error("flightContext must be used within a FlightProvider");
  }

  const { state, dispatch } = context;

  const [data, setData] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDataChange = (data: any) => {
    setData(`${data.count.adults} Adult, ${data.count.children} Children, ${data.class}`);
  };

  const open = Boolean(anchorEl);

  return (
    <Section padding="2rem 0">
      <Flex align="center" gap=".5rem">
        <Flex direction="column" gap=".75rem">
          <Text type="h3" text="From" />
          <SearchInput
            options={COUNTRY_FLAGS.map((x) => ({
              name: x.name,
              flag: x.flag,
              code: x.code,
            }))}
            onChange={(x: CountryType) => {
              dispatch({ type: "SET_DEPARTURE", payload: x.name });
            }}
            value={state.departureCountry}
            placeholder="Current Location"
          >
            <Flex gap="1rem" cursor="pointer">
              <IoLocationOutline size={25} />
              <Text type="p" text={state.departureCountry} color="black" />
            </Flex>
          </SearchInput>
        </Flex>
        <FlightCircle value={value}>
          <GoArrowSwitch color={ttColors.primary} size={30} />
        </FlightCircle>
        <Flex direction="column" gap=".75rem">
          <Text type="h3" text="To" />
          <SearchInput
            options={COUNTRY_FLAGS.map((x) => ({
              name: x.name,
              flag: x.flag,
              code: x.code,
            }))}
            value={state.arrivalCountry}
            onChange={(x: CountryType) => {
              dispatch({ type: "SET_ARRIVAL", payload: x.name });
            }}
            placeholder="Where to?"
          >
            <Flex gap="1rem" cursor="pointer">
              <IoLocationOutline size={25} />
              <Text type="p" text={state.arrivalCountry} color="black" />
            </Flex>
          </SearchInput>
        </Flex>
        <Flex direction="column" gap=".75rem">
          <Text type="h3" text="Depart" />
          <DatePicker placeholder="Select Date" position="start"
              value={state.departureDate}
              minDate={state.departureDate}
              onChange={(e) => {
                dispatch({ type: "SET_DEPARTURE_DATE", payload: e });
              }}
              />
        </Flex>
        {value !== "one-way" && (
          <Flex direction="column" gap=".75rem">
            <Text type="h3" text="Return" />
            <DatePicker placeholder="Select Date" position="start"
              value={state.returnDate}
              minDate={state.departureDate}
              onChange={(e) => {
                dispatch({ type: "SET_RETURN_DATE", payload: e });
              }}
              />
          </Flex>
        )}
        <Flex direction="column" gap=".75rem">
          <Text type="h3" text="Cabin & Travelers" />
          <ClickAwayListener onClickAway={handleClose}>
            <div>
              <Input
                onClick={handleClick}
                placeholder="Click me to open dropdown"
                value={data}
              />
              {open && <DropdownMenu onDataChange={handleDataChange} />}
            </div>
          </ClickAwayListener>
        </Flex>
        {length >= 1 && (
          <Section width="0" padding="2rem 0 0 0">
            <HiXMark
              size={30}
              color={ttColors.gray}
              onClick={() => handleDeleteFlight(index)}
              cursor="pointer"
            />
          </Section>
        )}
      </Flex>
    </Section>
  );
}

export default FlightModule;
