"use client";
import Section from "src/components/molecules/section";
import Flex from "@components/templates/flex";
import { ChangeEvent, useState } from "react";
import Button from "@atom/button";
import Text from "@atom/text";
import { useRouter } from "next/navigation";
import sleep from "@lib/extensions/helpers/sleep";
import Spinner from "@molecule/icons/spinner";
import { ttColors } from "@lib/theme/colors";
import Input from "@atom/input";
import { styled } from "styled-components";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Location from "@/lib/types/response-models/flight/location.type";
import LocationSearchSelectInput from "@/components/organisms/locationInputs/KiwiLocationSearchSelectInput";
import { DatePicker } from "@/components/organisms/customDatePicker";
import { ClickAwayListener } from "@mui/material";
import StaysMenu from "@organism/staysMenu";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import dayjs from "dayjs";
import { useStaySearchStore } from "@/lib/store/stay/search.store";
import { constructQueryFromParams } from "@/lib/extensions/helpers/constructQuery";
import { formatDate } from "@/lib/utilFns";
import RateHawkLocationSearchInput from "@/components/organisms/locationInputs/RateHawkLocationSearchSelectInput";
import { RateHawkRegionType } from "@/lib/types/response-models/stay/location.type";
import { convertRoomForGuestsToString } from "@/lib/types/request-models/stay/search.type";
// STYLES
const FlexBox = styled.div`
    display: flex;
    align-items: center;
    max-width: 50%;
    justify-content: flex-start;
    gap: 10px;
    margin-bottom: 20px;
`;
const FlexItems = styled.div``;

const Span = styled.div`
    position: relative;
`;

function Stays() {
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

    const open = Boolean(anchorEl);
    const { stayTabInitialSearchQuery, updateStayTabInitialQuery } =
        useStaySearchStore((state) => state);

    const { roomForGuests, stars } = stayTabInitialSearchQuery;
    const validateStaySearchFilter =
        stayTabInitialSearchQuery.location &&
        stayTabInitialSearchQuery.checkInDate &&
        stayTabInitialSearchQuery.checkOutDate &&
        stayTabInitialSearchQuery.roomForGuests.length > 0
            ? true
            : false;

    const computeStaySearchQuery = () => {
        const params = {
            regionId: stayTabInitialSearchQuery.location?.id,
            countryCode: stayTabInitialSearchQuery.location?.country_code ?? '',
            stars: stayTabInitialSearchQuery.stars
                ? stayTabInitialSearchQuery.stars[0]
                : 3,
            checkIn: formatDate(
                stayTabInitialSearchQuery.checkInDate ?? dayjs(),
                "YYYY-MM-DD"
            ),
            checkOut: formatDate(
                stayTabInitialSearchQuery.checkOutDate ?? dayjs(),
                "YYYY-MM-DD"
            ),
            guests: convertRoomForGuestsToString(roomForGuests),
        };

        return constructQueryFromParams(params);
    };
    const computeGuestsAndRoomsString = () => {
        const rooms = roomForGuests.length;
        let guests = 0;

        for (let index = 0; index < roomForGuests.length; index++) {
            const room = roomForGuests[index];
            guests += room.adults + room.children.length;
        }
        return `${rooms} room${rooms == 1 ? "" : "s"} for ${guests} guest${
            guests == 1 ? "" : "s"
        }`;
    };

    const handleStarsGroupChanged = (val: string) => {
        // Check if the value is already in the array
        const value = parseInt(val);
        const isSelected = stayTabInitialSearchQuery.stars?.includes(value);

        if (isSelected) {
            // If the value is already selected, remove it
            updateStayTabInitialQuery({
                ...stayTabInitialSearchQuery,
                stars: stars?.filter((item) => item !== value),
            });
        } else {
            // If the value is not selected, add it
            updateStayTabInitialQuery({
                ...stayTabInitialSearchQuery,
                stars: [...(stars ?? []), value],
            });
        }
    };
    return (
        <Section
            padding={"2rem 0 1rem 0"}
            height="unset"
            styles={{ position: "relative" }}
        >
            <FlexBox>
                <FlexItems>
                    <FormControlLabel
                        control={
                            <Checkbox
                                disableFocusRipple
                                disableRipple
                                sx={{
                                    color: ttColors.primary,
                                    "&.Mui-checked": {
                                        color: ttColors.primary,
                                    },
                                }}
                                value={5}
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>
                                ) =>
                                    handleStarsGroupChanged(event.target.value)
                                }
                            />
                        }
                        label="5 stars"
                    />
                </FlexItems>
                <FlexItems>
                    <FormControlLabel
                        control={
                            <Checkbox
                                disableFocusRipple
                                disableRipple
                                sx={{
                                    color: ttColors.primary,
                                    "&.Mui-checked": {
                                        color: ttColors.primary,
                                    },
                                }}
                                value={4}
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>
                                ) =>
                                    handleStarsGroupChanged(event.target.value)
                                }
                            />
                        }
                        label="4 stars"
                    />
                </FlexItems>
                <FlexItems>
                    <FormControlLabel
                        control={
                            <Checkbox
                                disableFocusRipple
                                disableRipple
                                sx={{
                                    color: ttColors.primary,
                                    "&.Mui-checked": {
                                        color: ttColors.primary,
                                    },
                                }}
                                value={3}
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>
                                ) =>
                                    handleStarsGroupChanged(event.target.value)
                                }
                            />
                        }
                        label="3 stars"
                    />
                </FlexItems>{" "}
                <FlexItems>
                    <FormControlLabel
                        control={
                            <Checkbox
                                disableFocusRipple
                                disableRipple
                                sx={{
                                    color: ttColors.primary,
                                    "&.Mui-checked": {
                                        color: ttColors.primary,
                                    },
                                }}
                                value={2}
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>
                                ) =>
                                    handleStarsGroupChanged(event.target.value)
                                }
                            />
                        }
                        label="2 stars"
                    />
                </FlexItems>
            </FlexBox>
            <Flex
                align="center"
                direction={isMobile ? "column" : "row"}
                gap=".5rem"
                styles={{ paddingBottom: "20px" }}
            >
                <Flex
                    direction="column"
                    gap=".5rem"
                    styles={{ marginBottom: isMobile ? "1.2rem" : "0" }}
                >
                    <Text
                        type="label"
                        size={isMobile ? 16 : 18}
                        text="Your stay preference?"
                    />
                    <Span>
                        <RateHawkLocationSearchInput
                            onChange={(x: RateHawkRegionType) =>
                                updateStayTabInitialQuery({
                                    ...stayTabInitialSearchQuery,
                                    location: x,
                                })
                            }
                            value={stayTabInitialSearchQuery.location}
                            placeholder="Enter Destination or Hotel Name"
                        />
                    </Span>
                </Flex>
                <Flex
                    direction="column"
                    gap=".5rem"
                    styles={{ marginBottom: isMobile ? "1.2rem" : "0" }}
                >
                    <Text
                        type="label"
                        size={isMobile ? 16 : 18}
                        text="Check In"
                    />
                    <DatePicker
                        placeholder="Select Date"
                        minDate={today}
                        value={stayTabInitialSearchQuery.checkInDate?.toDate()}
                        format="yyyy-mm-dd"
                        onChange={(e) => {
                            updateStayTabInitialQuery({
                                ...stayTabInitialSearchQuery,
                                checkInDate: dayjs(e),
                            });
                        }}
                    />
                </Flex>

                <Flex
                    direction="column"
                    gap=".5rem"
                    styles={{ marginBottom: isMobile ? "1.2rem" : "0" }}
                >
                    <Text
                        type="label"
                        size={isMobile ? 16 : 18}
                        text="Return"
                    />
                    <DatePicker
                        placeholder="Select Date"
                        format="yyyy-mm-dd"
                        minDate={today}
                        value={stayTabInitialSearchQuery.checkOutDate?.toDate()}
                        onChange={(e) =>
                            updateStayTabInitialQuery({
                                ...stayTabInitialSearchQuery,
                                checkOutDate: dayjs(e),
                            })
                        }
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
                                value={computeGuestsAndRoomsString()}
                                styles={{
                                    fontFamily: "poppins",
                                    cursor: "pointer",
                                    fontSize: "14px",
                                }}
                            />
                            {open && <StaysMenu />}
                        </div>
                    </ClickAwayListener>
                </Flex>
            </Flex>

            <Flex
                justify="flex-end"
                margin={isMobile ? "1rem 0 0" : "1.5rem 0 0"}
            >
                <Button
                    width={isMobile ? "100%" : "300px"}
                    padding="0 1.5rem"
                    borderRadius="4px"
                    background={ttColors.dark}
                    disabled={!validateStaySearchFilter}
                    onClick={async () => {
                        if (loading) return;
                        setLoading(true);
                        await sleep(200);
                        router.push(
                            `/stay/listings${computeStaySearchQuery()}`
                        );
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
