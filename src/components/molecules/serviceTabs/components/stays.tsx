"use client";
import Section from "src/components/molecules/section";
import Flex from "src/components/atoms/flex";
import { CustomRadioGroup } from "src/components/atoms/radio";
import { useEffect, useState } from "react";
import FlightModule from "src/components/atoms/flightModule";
import Button from "src/components/atoms/button";
import { HiPlus } from "react-icons/hi2";
import Text from "src/components/atoms/text";
import { styled } from "styled-components";
import { useRouter } from "next/navigation";
import sleep from "src/lib/sleep";
import Spinner from "src/components/icons/spinner";
import { ttColors } from "theme/colors";
import Input from "src/components/atoms/input";
import { DatePicker } from "src/components/atoms/datepicker";
import { ClickAwayListener } from "@mui/material";
import StaysMenu from "src/components/atoms/staysMenu";
import { ButtonWrapper } from "./flight";
import { useScreenResolution } from "hook/useScreenResolution";

function Stays() {
  const [data, setData] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { isMobile } = useScreenResolution();

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
    <Section padding="2rem 0" height="unset" styles={{ position: "relative" }}>
      <Flex align="center" direction={isMobile ? "column" : "row"} gap=".5rem">
        <Flex
          direction="column"
          gap=".75rem"
          styles={{ marginBottom: isMobile ? "1.2rem" : "0" }}
        >
          <Text
            type="label"
            size={isMobile ? 16 : 18}
            text="Where do you want to stay?"
          />
          <Input
            placeholder="Enter Destination or Hotel Name"
            styles={{ fontFamily: "poppins" }}
          />
        </Flex>
        <Flex
          direction="column"
          gap=".75rem"
          styles={{ marginBottom: isMobile ? "1.2rem" : "0" }}
        >
          <Text type="label" size={isMobile ? 16 : 18} text="Check In" />
          <DatePicker placeholder="Select Date" position="start" />
        </Flex>

        <Flex
          direction="column"
          gap=".75rem"
          styles={{ marginBottom: isMobile ? "1.2rem" : "0" }}
        >
          <Text type="label" size={isMobile ? 16 : 18} text="Return" />
          <DatePicker placeholder="Select Date" position="start" />
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
      <ButtonWrapper>
        <Button
          width="100%"
          borderRadius="4px"
          cursor="pointer"
          onClick={async () => {
            if (loading) return;
            setLoading(true);
            await sleep(200);
            router.push(`https://www.booking.com/`);
          }}
        >
          {loading ? (
            <Spinner fill={ttColors.primary} size={"45px"} />
          ) : (
            <Text type="p" text="Search for Hotels" size={18} weight={500} />
          )}
        </Button>
      </ButtonWrapper>
    </Section>
  );
}

export default Stays;
