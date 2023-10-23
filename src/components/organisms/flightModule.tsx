"use client";
import Section from "src/components/molecules/section";
import React, { useState } from "react";
import Flex from "@components/templates/flex";
import Text from "@atom/text";
import SearchInput from "./searchInput";
import { COUNTRY_FLAGS } from "@lib/extensions/data/COUNTRY_FLAGS";
import { IoLocationOutline } from "react-icons/io5";
import { ttColors } from "@lib/theme/colors";
import { DatePicker } from "./datepicker";
import { ClickAwayListener } from "@mui/material";
import Input from "@atom/input";
import DropdownMenu from "./dropdownMenu";
import { styled } from "styled-components";
import { HiXMark } from "react-icons/hi2";
import { CountryType } from "src/components/molecules/serviceTabs/components/visa";
import { useFlightContext } from "@lib/extensions/context";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import dayjs from "dayjs";

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

const TravellersDropdownContainer = styled.div`
  position: relative;
  z-index: 2;
`;

function FlightModule({
  value,
  index,
  handleDeleteFlight,
  length,
}: flightProps) {
  const context = useFlightContext();
  const { isMobile } = useScreenResolution();

  if (!context) {
    throw new Error("flightContext must be used within a FlightProvider");
  }

  const { state, dispatch } = context;

  const [data, setData] = useState("1 Adult, Economy");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const today = dayjs().toDate();

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDataChange = (data: any) => {
    const kids = data.children + data.infants;
    setData(
      `${data.adults} Adult, ${
        kids > 0 ? `${kids} ${kids === 1 ? "Child" : "Children"}, ` : ""
      }${data.class}`
    );
  };

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
              dispatch({ type: "SET_DEPARTURE", payload: x });
            }}
            value={state.departureCountry}
            placeholder="Current Location"
          >
            <Flex gap={isMobile ? "0.7rem" : "1rem"} cursor="pointer">
              <IoLocationOutline size={isMobile ? 20 : 22} />
              <Text
                type="p"
                size={16}
                text={state.departureCountry.name}
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
              dispatch({ type: "SET_ARRIVAL", payload: x });
            }}
            placeholder="Where to?"
          >
            <Flex gap={isMobile ? "0.7rem" : "1rem"} cursor="pointer">
              <IoLocationOutline size={isMobile ? 20 : 22} />
              <Text
                type="p"
                size={16}
                text={state.arrivalCountry.name}
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
            value={state.departureDate.toDate()}
            minDate={today}
            onChange={(e) => {
              dispatch({ type: "SET_DEPARTURE_DATE", payload: dayjs(e) });
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
              value={state.returnDate.toDate()}
              minDate={state.departureDate.toDate()}
              onChange={(e) => {
                dispatch({ type: "SET_RETURN_DATE", payload: dayjs(e) });
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
            <TravellersDropdownContainer>
              <Input
                onClick={handleClick}
                placeholder="Click me to open dropdown"
                value={data}
                styles={{ fontFamily: "poppins", cursor: "pointer" }}
              />
              {open && (
                <DropdownMenu
                  onDataChange={handleDataChange}
                  isMobile={isMobile}
                />
              )}
            </TravellersDropdownContainer>
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
