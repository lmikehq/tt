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
import { styled } from "styled-components";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Location from "@/lib/types/response-models/flight/location.type";
import LocationSearchSelectInput from "@/components/organisms/LocationSearchSelectInput";
import { DatePicker } from "@/components/organisms/customDatePicker";
import { ClickAwayListener } from "@mui/material";
import StaysMenu from "@organism/staysMenu";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import dayjs from "dayjs";
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

export type RoomCountType = {
    adults: number;
    children: number;
    infants: number;
    rooms: number;
};

const room: RoomCountType = {
    adults: 2,
    children: 1,
    infants: 0,
    rooms: 1,
};

export interface RoomStay {
    roomCount: RoomCountType;
    data: string;
    destinationHotel: Location;
}

function Stays() {
    const [data, setData] = useState("");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const { isMobile } = useScreenResolution();

    const today = dayjs().toDate();

    // FORMAT TEXT
    const formatDisplayText = (data: RoomCountType) => {
        const kids = data.children + data.infants;
        return `${data.adults} ${data.adults > 1 ? "Adults" : "Adult"}${
            kids > 0 ? `, ${kids} ${kids === 1 ? "Child" : "Children"}` : ""
        }
    `;
    };

    const defText = formatDisplayText(room);

    const [displayText, setDisplayText] = useState(defText);

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

    // LOCATION SEARCH
    const [stay, setStay] = useState<RoomStay>({
        roomCount: {
            adults: 2,
            children: 1,
            infants: 0,
            rooms: 1,
        },
        data: "",
        destinationHotel: {
            id: "ibadan-id",
            int_id: 123,
            airport_int_id: 456,
            active: true,
            code: "IBD",
            icao: "ABC123",
            name: "",
            slug: "ibadan",
            slug_en: "ibadan-en",
            alternative_names: [],
            rank: 1,
            global_rank_dst: 1,
            dst_popularity_score: 0.8,
            timezone: "Africa/Lagos",
            country: {
                id: "nigeria-id",
                name: "Nigeria",
                slug: "nigeria",
                code: "NG",
            },
            city: {
                id: "ibadan-city-id",
                name: "Ibadan",
                code: "IBD",
                nearby_country: null,
                slug: "ibadan",
                subdivision: null,
                autonomous_territory: null,
                country: {
                    id: "nigeria-id",
                    name: "Nigeria",
                    slug: "nigeria",
                    code: "NG",
                },
                region: {
                    id: "ibadan-region-id",
                    name: "Ibadan Region",
                    slug: "ibadan-region",
                },
                continent: {
                    id: "africa-id",
                    name: "Africa",
                    slug: "africa",
                    code: "AF",
                },
            },
            location: {
                lon: "7.4951",
                lat: "4.3517",
            },
            alternative_departure_points: [],
            tags: [],
            providers: [],
            special: [],
            tourist_region: [],
            car_rentals: [],
            new_ground: false,
            example: false,
            routing_priority: 1,
            type: "city",
        },
    });

    const handleUpdate = (
        selectedStay: RoomStay,
        updatedData: { destinationHotel: Location }
    ) => {
        setStay({ ...selectedStay, ...updatedData });
    };

    const open = Boolean(anchorEl);

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
                            />
                        }
                        label="Free Cancellation"
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
                            />
                        }
                        label="3 stars"
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
                        <LocationSearchSelectInput
                            onChange={(x: Location) =>
                                handleUpdate &&
                                handleUpdate(stay, { destinationHotel: x })
                            }
                            value={stay.destinationHotel}
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
                        size={isMobile ? 16 : 18}
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
                                value={displayText}
                                styles={{
                                    fontFamily: "poppins",
                                    cursor: "pointer",
                                    fontSize: "14px",
                                }}
                            />
                            {open && (
                                <StaysMenu
                                    onDataChange={handleDataChange}
                                    isMobile={isMobile}
                                    data={room}
                                />
                            )}
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
                    onClick={async () => {
                        if (loading) return;
                        setLoading(true);
                        await sleep(200);
                        router.push("/stay/listings");
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
