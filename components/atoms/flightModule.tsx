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
import { useScreenResolution } from "hook/useScreenResolution";

interface flightProps {
  value: string;
  index: number;
  length: number;
  handleDeleteFlight: (index: number) => void;
}

const FlightCircle = styled.div<{ value: string }>`
  position: absolute;
  left: 0;
  right: 0;
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
    setData(
      `${data.count.adults} Adult, ${data.count.children} Children, ${data.class}`
    );
  };

  const open = Boolean(anchorEl);
  const { isMobile } = useScreenResolution();
  return (
    <Section padding="2rem 0 0 0 " height="unset">
      <Flex
        direction={isMobile ? "column" : "row"}
        align={isMobile ? "flex-start" : "center"}
        gap=".5rem"
      >
        <Flex
          direction="column"
          gap=".75rem"
          styles={{ marginBottom: isMobile ? "1.2rem" : "0" }}
        >
          <Text type="label" size={isMobile ? 16 : 18} text="From" />
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
              <IoLocationOutline size={isMobile ? 20 : 25} />
              <Text
                type="p"
                size={isMobile ? 16 : 18}
                text={state.departureCountry}
                color="black"
              />
            </Flex>
          </SearchInput>
        </Flex>
        {/* <Section styles={{ position: "relative" }} width="fit-content">
          <FlightCircle value={value}>
            <GoArrowSwitch color={ttColors.primary} size={30} />
          </FlightCircle>
        </Section> */}
        <Flex
          direction="column"
          gap=".75rem"
          styles={{ marginBottom: isMobile ? "1.2rem" : "0" }}
        >
          <Text type="label" size={isMobile ? 16 : 18} text="To" />
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
              <IoLocationOutline size={isMobile ? 20 : 25} />
              <Text
                type="p"
                size={isMobile ? 16 : 18}
                text={state.arrivalCountry}
                color="black"
              />
            </Flex>
          </SearchInput>
        </Flex>
        <Flex
          direction="column"
          gap=".75rem"
          styles={{ marginBottom: isMobile ? "1.2rem" : "0" }}
        >
          <Text type="label" size={isMobile ? 16 : 18} text="Depart" />
          <DatePicker
            placeholder="Select Date"
            position="start"
            value={state.departureDate}
            minDate={state.departureDate}
            onChange={(e) => {
              dispatch({ type: "SET_DEPARTURE_DATE", payload: e });
            }}
          />
        </Flex>
        {value !== "one-way" && (
          <Flex
            direction="column"
            gap=".75rem"
            styles={{ marginBottom: isMobile ? "1.2rem" : "0" }}
          >
            <Text type="label" size={isMobile ? 16 : 18} text="Return" />
            <DatePicker
              placeholder="Select Date"
              position="start"
              value={state.returnDate}
              minDate={state.departureDate}
              onChange={(e) => {
                dispatch({ type: "SET_RETURN_DATE", payload: e });
              }}
            />
          </Flex>
        )}
        <Flex
          direction="column"
          gap=".75rem"
          styles={{ marginBottom: isMobile ? "1.2rem" : "0" }}
        >
          <Text
            type="label"
            size={isMobile ? 16 : 18}
            text="Cabin & Travelers"
          />
          <ClickAwayListener onClickAway={handleClose}>
            <div>
              <Input
                onClick={handleClick}
                placeholder="Click me to open dropdown"
                value={data}
                styles={{ fontFamily: "poppins" }}
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
