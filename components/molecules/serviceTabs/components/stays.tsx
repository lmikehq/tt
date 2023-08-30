import Section from "@molecule/section";
import Visa from "./visa";
import Flex from "@atom/flex";
import Text from "@atom/text";
import Input from "@atom/input";
import { DatePicker } from "@atom/datepicker";
import { ClickAwayListener } from "@mui/material";
import { useState } from "react";
import StaysMenu from "@atom/staysMenu";

function Stays() {
  const [data, setData] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDataChange = (data: any) => {
    setData(`${data.count.adults} Adult, ${data.count.children} Children, ${data.count.rooms} Rooms`);
  };

  const open = Boolean(anchorEl)

  return (
    <Section padding="2rem 0">
      <Flex align="center" gap=".5rem">
        <Flex direction="column" gap=".75rem">
          <Text type="h3" text="Going to" />
          <Input
            placeholder="Current Location"
          />
        </Flex>
        <Flex direction="column" gap=".75rem">
          <Text type="h3" text="Check In" />
          <DatePicker placeholder="Select Date" position="start"/>
        </Flex>

          <Flex direction="column" gap=".75rem">
            <Text type="h3" text="Return" />
            <DatePicker placeholder="Select Date" position="start"/>
          </Flex>
        
        <Flex direction="column" gap=".75rem">
          <Text type="h3" text="Guests and Rooms" />
          <ClickAwayListener onClickAway={handleClose}>
            <div>
              <Input
                onClick={handleClick}
                placeholder="Click me to open dropdown"
                value={data}
              />
              {open && <StaysMenu onDataChange={handleDataChange} />}
            </div>
          </ClickAwayListener>
        </Flex>
      </Flex>
    </Section>
  );
}

export default Stays;
