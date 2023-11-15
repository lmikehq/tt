"use client";
import Section from "src/components/molecules/section";
import Flex from "@components/templates/flex";
import { useState } from "react";
import Button from "@atom/button";
import Text from "@atom/text";
import { useRouter } from "next/navigation";
import sleep from "@lib/extensions/helpers/sleep";
import Spinner from "@molecule/icons/spinner";
import { ttColors } from "@lib/theme/colors";
import Input from "@atom/input";
import { DatePicker } from "@/components/organisms/customDatePicker";
import { ClickAwayListener } from "@mui/material";
import StaysMenu from "@organism/staysMenu";
import { ButtonWrapper } from "./flight";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import dayjs from "dayjs";


function Stays() {
    const [data, setData] = useState("");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const { isMobile } = useScreenResolution();
    
    const today = dayjs().toDate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDataChange = (data: any) => {
    setData(
      `${data.count.adults} Adult, ${data.count.children} Children, ${data.count.rooms} Rooms`
    );
  };

  const open = Boolean(anchorEl);

  return (
    <Section
      padding={"2rem 0 1rem 0"}
      height="unset"
      styles={{ position: "relative" }}
    >
      <Flex align="center" direction={isMobile ? "column" : "row"} gap=".5rem">
        <Flex
          direction="column"
          gap=".5rem"
          styles={{ marginBottom: isMobile ? "1.2rem" : "0" }}
        >
            <Text
                type="label"
                size={isMobile ? 16 : 16}
                text="Your stay preference?"
            />
            <Input
                placeholder="Enter Destination or Hotel Name"
                styles={{ fontFamily: "poppins" }}
            />
        </Flex>
        <Flex
          direction="column"
          gap=".5rem"
          styles={{ marginBottom: isMobile ? "1.2rem" : "0" }}
        >
            <Text
                type="label"
                size={isMobile ? 16 : 16}
                text="Check In"
            />
            <DatePicker
                placeholder="Select Date"
                minDate={today}
                onChange={(e) => null}
            />
        </Flex>

        <Flex
          direction="column"
          gap=".5rem"
          styles={{ marginBottom: isMobile ? "1.2rem" : "0" }}
        >
            <Text
                type="label"
                size={isMobile ? 16 : 16}
                text="Return"
            />
            <DatePicker
                placeholder="Select Date"
                minDate={today}
                onChange={(e) => null}
            />
        </Flex>

        <Flex
          direction="column"
          gap=".75rem"
          styles={{ marginBottom: isMobile ? "1.2rem" : "0" }}
        >
          <Text
            type="label"
            size={isMobile ? 16 : 18}
            text="Guests and Rooms"
          />
          <ClickAwayListener onClickAway={handleClose}>
            <div>
              <Input
                onClick={handleClick}
                placeholder="Click me to open dropdown"
                value={data}
                styles={{ fontFamily: "poppins" }}
              />
              {open && <StaysMenu onDataChange={handleDataChange} />}
            </div>
          </ClickAwayListener>
        </Flex>
          </Flex>
          
      <Flex justify="flex-end" margin={isMobile ? "1rem 0 0" : "1.5rem 0 0"}>
        <Button
          width={isMobile ? "100%" : "300px"}
          padding="0 1.5rem"
          borderRadius="4px"
          background={ttColors.dark}
          onClick={async () => {
            if (loading) return;
            setLoading(true);
            await sleep(200);
            router.push(`https://www.booking.com/`);
          }}
        >
          {loading ? (
            <Spinner fill={ttColors.primary} size={"36px"} />
          ) : (
            <Text type="p" text="Search for Hotels" weight={500} />
          )}
        </Button>
      </Flex>
    </Section>
  );
}

export default Stays;
