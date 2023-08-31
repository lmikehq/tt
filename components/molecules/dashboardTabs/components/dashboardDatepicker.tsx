import React from "react";
import { DateRangePicker, DateRange } from "mui-daterange-picker";

type Props = {};

const DashboardDatePicker: React.FunctionComponent<Props> = (props) => {
  const [open, setOpen] = React.useState(false);
  const [dateRange, setDateRange] = React.useState<DateRange>({});

  const toggle = () => setOpen(!open);

  return (
    <DateRangePicker
      open={true}
      toggle={toggle}
      onChange={(range) => setDateRange(range)}
    />
  );
};

export default DashboardDatePicker;

