"use client";

import Button from "@/components/atoms/button";
import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import { ttColors } from "@/lib/theme/colors";
import dayjs from "dayjs";
import {
  MouseEventHandler,
  Ref,
  SyntheticEvent,
  forwardRef,
} from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { IoCalendarOutline } from "react-icons/io5";
import { styled } from "styled-components";


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
    position?: "start";
    disabled?: boolean;
    views?: ("day" | "month" | "year")[];
    error?: any;
    format?: string;
    width?: string;
    height?: string;
}
const InputContainer = styled.div<{ width: string; height?: string }>`
    position: relative;
    display: inline-block;
    width: ${(props) => props.width ?? '100%'}
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
const DateInput = styled.input<{ width?: string }>`
  height: 45px;
  width: ${(props) => props.width ?? '100%'};
  border-radius: 4px;
  font-size: 16px;
  padding-left: 40px !important;
  padding-right: 10px;
  box-sizing: border-box;
  background-color: transparent;
  cursor: pointer;
  border: 1px solid #bdbdbd;
  &:hover {
    border: 1px solid ${ttColors.primary};
  }
  &:focus {
    border: 1px solid ${ttColors.primary};
  }
  &:focus-visible {
    border: 1px solid ${ttColors.primary};
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
    height
}: CustomDatePickerProps) => {

  return (
    <ReactDatePicker
        selected={value || selected}
        startDate={startDate}
        minDate={minDate}
        maxDate={maxDate}
        endDate={endDate}
        onChange={onChange}
        monthsShown={monthsShown}
        disabled={disabled}
        withPortal={true}
        placeholderText={placeholder}
        showIcon={false}
        disabledKeyboardNavigation={true}
        customInput={<CustomDatePickerInput width={width} height={height} />}
        shouldCloseOnSelect={false}
        formatWeekDay={(day) => <>{day.substring(0, 3).toUpperCase()}</>}
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
                <BiChevronLeft color="#333333" size={24} />
            </Button>
            <Text
                text={monthDate.toLocaleString("en-US", {
                month: "long",
                year: "numeric",
                })}
                type="p"
                size={18}
                weight={700}
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
                <BiChevronRight color="#333333" size={24} />
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
  );
};

// eslint-disable-next-line react/display-name
export const CustomDatePickerInput = forwardRef(
    (
    {
        value,
        onClick,
        width,
        height
    }: {
        value?: string;
        onClick?: MouseEventHandler<HTMLInputElement>;
        width?: string;
        height?: string;
    },
    ref: Ref<HTMLDivElement>
  ) => (
        <InputContainer ref={ref} width={width ?? '100%'}>
            <DateIcon>
                <IoCalendarOutline size={24} />
            </DateIcon>
            <DateInput
                placeholder="dd/mm/yyyy"
                value={value}
                onClick={onClick}
                readOnly
            />
        </InputContainer>
    )
);