import Flex from "@/components/templates/flex";
import { Grid } from "@/components/templates/grid";
import {
  SeatAvailability,
  SeatInterface,
} from "@/lib/types/response-models/flight/booking.type";
import { Box, Fade, Popover, Popper, Typography } from "@mui/material";
import React, { useState } from "react";
import { styled } from "styled-components";
import Section from "../../section";
import Text from "@/components/atoms/text";

const SingleSeatBox = styled.div<{ bgColor?: string }>`
  background-color: ${({ bgColor }) => bgColor};
  height: 32px;
  width: 22px;
  border-radius: 4px;
  cursor: pointer;
`;
interface SeatGroupProps {
  seatGroup: SeatInterface[];
  selectSeat(params: { seat: SeatInterface }): void;
}
const SeatGroupPane = ({ seatGroup, selectSeat }: SeatGroupProps) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const [popperDetails, setPopperDetails] = useState({
    seatName: "",
    seatClass: "",
    currency: "",
    amount: "",
  });

  const handleMouseEnter = ({
    event,
    seatName,
    seatClass,
    currency,
    amount,
  }: {
    event: React.MouseEvent<HTMLDivElement>;
    seatName: string;
    seatClass: string;
    currency: string;
    amount: string;
  }) => {
    setPopperDetails({
      seatName,
      seatClass,
      currency,
      amount,
    });
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

  const computeSeatColor = ({ seatClass }: { seatClass: string }) => {
    return "#F17400";
  };
  return (
    <Grid columns={`${seatGroup.length}`} width="fit-content" gap="5px">
      <Popper id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box>
              <Section
                padding="13px"
                styles={{ backgroundColor: "#333333", borderRadius: "8px" }}
              >
                <Flex align="center" gap="12px">
                  <Section>
                    <Text
                      size={20}
                      weight={600}
                      color="white"
                      text={popperDetails.seatName}
                      type="p"
                    />
                  </Section>
                  <Section>
                    <Text
                      size={14}
                      weight={400}
                      color="white"
                      text={popperDetails.seatClass}
                      type="p"
                    />
                    <Text
                      size={14}
                      weight={500}
                      color="white"
                      text={popperDetails.currency + " " + popperDetails.amount}
                      type="p"
                    />
                  </Section>
                </Flex>
              </Section>
            </Box>
          </Fade>
        )}
      </Popper>
      {seatGroup.map((seat) => (
        <SingleSeatBox
          key={"seat-" + seat.name}
          onClick={() =>
            seat.state == SeatAvailability.unavailable
              ? null
              : selectSeat({ seat })
          }
          onMouseEnter={(event) =>
            handleMouseEnter({
              event,
              seatName: seat.name,
              seatClass: seat.seat_class,
              currency: seat.price.currency,
              amount: seat.price.amount,
            })
          }
          onMouseLeave={handleClose}
          bgColor={
            seat.state == SeatAvailability.unavailable
              ? "#E9E8FC"
              : computeSeatColor({ seatClass: seat.seat_class })
          }
        />
      ))}
    </Grid>
  );
};

export default SeatGroupPane;
