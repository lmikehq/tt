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
import { BiCheck } from "react-icons/bi";
import { ttColors } from "@/lib/theme/colors";
import { seatClass as seatCategory } from "@/lib/types/response-models/flight/booking.type";

const SingleSeatBox = styled.div<{ bgColor?: string }>`
    background-color: ${({ bgColor }) => bgColor};
    height: 32px;
    width: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
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

    const computeSeatColor = ({
        seatClass,
        selected,
        availability,
    }: {
        seatClass: string;
        availability: string;
        selected?: boolean;
    }) => {
        if (selected) return "#ec5c81";
        if (availability == SeatAvailability.unavailable) return "#E9E8FC";
        switch (seatClass) {
            case "standard":
                return seatCategory.standard.color;

            case "Extra legroom seat":
                return seatCategory.extra_legroom_seat.color;
            case "premium":
                return seatCategory.premium.color;
        }
    };
    return (
        <Grid columns={`${seatGroup.length}`} width="fit-content" gap="5px">
            <Popper id={id} open={open} anchorEl={anchorEl} transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Box>
                            <Section
                                padding="13px"
                                styles={{
                                    backgroundColor: "#333333",
                                    borderRadius: "8px",
                                }}
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
                                            text={
                                                popperDetails.currency +
                                                " " +
                                                popperDetails.amount
                                            }
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
                        seat.state == SeatAvailability.unavailable ||
                        seat.selected
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
                    bgColor={computeSeatColor({
                        seatClass: seat.seat_class,
                        availability: seat.state,
                        selected: seat.selected,
                    })}
                >
                    {seat.selected ? (
                        <BiCheck color={ttColors.light} size={16} />
                    ) : null}
                </SingleSeatBox>
            ))}
        </Grid>
    );
};

export default SeatGroupPane;
