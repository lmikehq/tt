"use client";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker as MuiDatepicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { addDays } from "date-fns";
import { Dayjs } from "dayjs";
import { useState } from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { TextField } from "./input";
import { TextFieldProps } from "@mui/material";

interface BlockDatePickerProps {
  value?: Range;
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
}

export const BlockDatePicker: React.FC<BlockDatePickerProps> = ({
  value,
  onChange,
  disabledDates,
}) => {
  const [state, setState] = useState({
    selection1: {
      startDate: addDays(new Date(), -6),
      endDate: new Date(),
      key: "selection1",
    },
    selection2: {
      startDate: addDays(new Date(), 1),
      endDate: addDays(new Date(), 7),
      key: "selection2",
    },
  });
  value = state.selection2;
  return (
    <DateRange
      rangeColors={["#262626"]}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction="vertical"
      showDateDisplay={false}
      // minDate={new Date()}
      disabledDates={disabledDates}
    />
  );
};

interface DatePickerProps {
  value?: Dayjs | null;
  onChange?: (value: any) => void;
  views?: ('year' | 'month' | 'day' )[];
  disabled?: boolean;
  label?: string;
  minDate?: Dayjs | null;
  maxDate?: Dayjs;
  placeholder?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({ onChange, value, views, disabled, label, minDate, maxDate, placeholder }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiDatepicker
        label={label}
        value={value}
        onChange={onChange}
        views={views}
        disabled={disabled}
        minDate={minDate}
        maxDate={maxDate}
        sx={{
          width: "100%",
          cursor: "pointer",
          "& input": {
            color: "#1C1B1F",
            fontWeight: 100,
          },
        }}
        slotProps={{
          textField: {
            placeholder: placeholder,
            error: false
          }
        }}
      />
    </LocalizationProvider>
  );
};
