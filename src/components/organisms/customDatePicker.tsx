"use client";

import Button from "@/components/atoms/button";
import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import { ttColors } from "@/lib/theme/colors";
import {
  MouseEventHandler,
  Ref,
  SyntheticEvent,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { IoCalendarOutline } from "react-icons/io5";
import { styled } from "styled-components";
import { Box, PopperPlacementType, Stack } from "@mui/material";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { PiCaretDoubleLeftBold, PiCaretDoubleRightBold } from "react-icons/pi";
import dayjs from "dayjs";


interface CustomDatePickerProps {
  minDate?: Date;
  maxDate?: Date;
  monthsShown?: number;
  endDate?: Date;
  startDate?: Date;
  onChange(
    date: Date | null,
    event: SyntheticEvent<any, Event> | undefined
  ): void;
  selected?: Date;
  value?: Date;
  placeholder?: string;
  position?: PopperPlacementType;
  disabled?: boolean;
  views?: ("day" | "month" | "year")[];
  error?: any;
  format?: string;
  width?: string;
  height?: string;
  selectsRange?: boolean;
  border?: string;
}
const InputContainer = styled.div<{ width: string; height?: string; }>`
    position: relative;
    display: inline-block;
    width: ${(props) => props.width ?? "100%"};
`;
// height: ${(props) => props.height}

const DateIcon = styled.span`
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    font-size: 20px;
    display: inline-flex;
`;
const DateInput = styled.input<{ width?: string; border?: string; }>`
  height: 45px;
  font-size: 15px;
  font-family: Poppins;
  color: ${ttColors.grayishAsh}
  width: ${(props) => props.width ?? "100%"};
  border-radius: 4px;
  padding-left: 40px !important;
  padding-right: 10px;
  box-sizing: border-box;
  background-color: transparent;
  cursor: pointer;
  // border: 1px solid #bdbdbd;
  outline: none;
  border: ${(props) => props.border ? props.border : '1px solid #bdbdbd'};
  &:hover {
    border: ${(props) => props.border ? props.border : `1px solid ${ttColors.primary}`};
  }
  &:focus {
    border: ${(props) => props.border ? props.border : `1px solid ${ttColors.primary}`};
  }
  &:focus-visible {
    border: ${(props) => props.border ? props.border : `1px solid ${ttColors.primary}`};
    outline: none !important;
  }
  &.error {
    border: 0;
    outline: 1px solid red;
  }
  &::placeholder {
    color: #929292 !important;
    font-weight: 400 !important;
  }
`;

export const DatePicker = ({
  minDate,
  maxDate,
  selected,
  value,
  endDate,
  startDate,
  onChange,
  monthsShown = 1,
  placeholder,
  disabled,
  width,
  height,
  position,
  format,
  selectsRange,
  border
}: CustomDatePickerProps) => {
  const { isMobile } = useScreenResolution();
  const fieldRef = useRef<HTMLDivElement>(null);
  const [fieldWidth, setFieldWidth] = useState("300px");

  useEffect(
    () => setFieldWidth(`${fieldRef?.current?.clientWidth}px`),
    [fieldRef?.current]
  );

  return (
    <Flex direction="column" width="100%">
      <ReactDatePicker
        popperContainer={({ children }) => (
          <Box
            ref={fieldRef}
            sx={{
              "& .react-datepicker": {
                display: 'flex' // added this code to flex the display when months = 2
              },
              "& .react-datepicker__month-container": {
                width: `${isMobile ? fieldWidth : '340px'} !important`,
                padding: '14px 20px 20px !important',
              },
              "& .react-datepicker__day-names": {
                marginTop: '10px !important',
                fontFamily: 'Poppins',
              },
              "& .react-datepicker__day-name, .react-datepicker__day, .react-datepicker__time-name": {
                width: 'calc(100%/7.5) !important',
                fontFamily: 'Poppins',
              },
              "& .react-datepicker__month": {
                margin: "0 !important",
              },
            }}
            width="100%"
            position="relative"
          >
            {children}
          </Box>
        )}
        dateFormat={format}
        wrapperClassName="w-full"
        selected={(value || selected) ?? undefined}
        startDate={startDate}
        minDate={minDate}
        maxDate={maxDate}
        endDate={endDate}
        onChange={onChange}
        monthsShown={monthsShown}
        disabled={disabled}
        popperPlacement={position ?? "bottom-start"}
        popperProps={{ width: "20px" }}
        placeholderText={placeholder}
        withPortal={false}
        showIcon={false}
        selectsRange={selectsRange}
        useWeekdaysShort={true}
        disabledKeyboardNavigation={true}
        customInput={
          <CustomDatePickerInput
            width={width}
            height={height}
            placeholder={placeholder}
            value={dayjs(value).toString()}
            border={border}
          />
        }
        shouldCloseOnSelect={true}
        formatWeekDay={(day) => (
          <>{day.substring(0, 3).toUpperCase()}</>
        )}
        renderCustomHeader={({
          monthDate,
          customHeaderCount,
          decreaseMonth,
          increaseMonth,
        }) => (
          <Flex align="center" justify="space-between">
            <Button
              onClick={decreaseMonth}
              width="fit-content"
              background="transparent"
              styles={
                monthsShown == 2
                  ? customHeaderCount === 1
                    ? { visibility: "hidden" }
                    : {}
                  : {}
              }
            >
              <PiCaretDoubleLeftBold color="#333333" size={16} />
            </Button>
            <Text
              text={monthDate.toLocaleString("en-US", {
                month: "long",
                year: "numeric",
              })}
              type="p"
              size={16}
              weight={700}
              styles={{ overflow: 'unset' }}
            />

            <Button
              onClick={increaseMonth}
              width="fit-content"
              background="transparent"
              styles={
                monthsShown == 2
                  ? customHeaderCount === 0
                    ? { visibility: "hidden" }
                    : {}
                  : {}
              }
            >
              <PiCaretDoubleRightBold color="#333333" size={16} />
            </Button>
          </Flex>
          // <div>
          //   <button
          //     aria-label="Previous Month"
          //     className={
          //       "react-datepicker__navigation react-datepicker__navigation--previous"
          //     }
          //     style={customHeaderCount === 1 ? { visibility: "hidden" } : {}}
          //     onClick={decreaseMonth}
          //   >
          //     <BiChevronLeft color="#333333" size={24} />
          //   </button>
          //   <span className="react-datepicker__current-month">
          //     <Text
          //       text={monthDate.toLocaleString("en-US", {
          //         month: "long",
          //         year: "numeric",
          //       })}
          //       type="p"
          //       size={18}
          //       weight={700}
          //     />
          //   </span>
          //   <button
          //     aria-label="Next Month"
          //     className={
          //       "react-datepicker__navigation react-datepicker__navigation--next"
          //     }
          //     style={customHeaderCount === 1 ? { visibility: "hidden" } : {}}
          //     onClick={increaseMonth}
          //   >
          //     <BiChevronRight color="#333333" size={24} />
          //   </button>
          // </div>
        )}
      />
    </Flex>
  );
};

// eslint-disable-next-line react/display-name
export const CustomDatePickerInput = forwardRef(
  (
    {
      value,
      onClick,
      width,
      height,
      placeholder,
      border
    }: {
      value?: string;
      onClick?: MouseEventHandler<HTMLInputElement>;
      width?: string;
      height?: string;
      placeholder?: string;
      border?: string;
    },
    ref: Ref<HTMLDivElement>
  ) => (
    <InputContainer ref={ref} width={width ?? "100%"}>
      <DateIcon>
        <IoCalendarOutline size={22} color={ttColors.lighterGray} />
      </DateIcon>
      <DateInput
        placeholder={placeholder ?? "dd/mm/yyyy"}
        value={value}
        onClick={onClick}
        readOnly
        className={''}
        style={{ width: "100%", fontFamily: 'Poppins' }}
        border={border}
      />
    </InputContainer>
  )
);
