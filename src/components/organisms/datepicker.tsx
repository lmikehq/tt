"use client";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker as MuiDatepicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { addDays, startOfDay } from "date-fns";
import { Dayjs } from "dayjs";
import { useState } from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { IoCalendarOutline } from "react-icons/io5";
import { ttColors } from "@lib/theme/colors";

import "dayjs/locale/en-gb";

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
  views?: ("year" | "month" | "day")[];
  disabled?: boolean;
  label?: string;
  minDate?: Dayjs | null;
  maxDate?: Dayjs;
  placeholder?: string;
  position?: "start";
  height?: string;
  error?: boolean;
  format?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  onChange,
  value,
  views,
  disabled,
  label,
  minDate,
  maxDate,
  height,
  placeholder,
  position,
  error,
  format,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
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
            fontWeight: 400,
            padding: " 0 14px",

            height: height || "45px",
            fontFamily: "'Poppins', sans-serif",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: `${ttColors.primary} !important`,
          },
          "&:hover .MuiInputBase-root": {
            color: `${ttColors.primary} !important`,
          },
          "& .MuiInputBase-root": {
            flexDirection: position === "start" ? "row-reverse" : "row",
          },
        }}
        slotProps={{
          textField: {
            placeholder: placeholder,
            error: error,
          },
        }}
        slots={{
          openPickerIcon: IoCalendarOutline,
        }}
        format={format}
      />
    </LocalizationProvider>
  );
};
