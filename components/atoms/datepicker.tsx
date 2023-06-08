"use client";

import { addDays } from "date-fns";
import { useState } from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as MuiDatepicker } from "@mui/x-date-pickers/DatePicker";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { TextField } from "@mui/material";
import Section from "@molecule/section";
import { Dayjs } from "dayjs";

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
      minDate={new Date()}
      disabledDates={disabledDates}
    />
  );
};

interface DatePickerProps {
  value?: Dayjs;
  onChange: (value: any) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({ onChange, value }) => {
  const currentDate = new Date();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiDatepicker
        value={value}
        onChange={onChange}
        disablePast
        sx={{
          width: "100%",
          cursor: "pointer",
        }}
        // renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};
