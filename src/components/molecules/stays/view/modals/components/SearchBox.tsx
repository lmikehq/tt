import React, { useState } from "react";
import { Span } from "../../styles";
import Flex from "@/components/templates/flex";
import Text from "@/components/atoms/text";
import Input from "@/components/atoms/input";
import { DatePicker } from "@/components/organisms/customDatePicker";
import Button from "@/components/atoms/button";
import Spinner from "../../../../icons/spinner";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { ttColors } from "@/lib/theme/colors";
import { useQueryParams } from "@/hooks/useNext";
import RateHawkLocationSearchInput from "@/components/organisms/locationInputs/RateHawkLocationSearchSelectInput";
import { useStaySearchStore } from "@/lib/store/stay/search.store";
import { RateHawkRegionType } from "@/lib/types/response-models/stay/location.type";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utilFns";
import dayjs from "dayjs";
import { constructQueryFromParams } from "@/lib/extensions/helpers/constructQuery";
import { convertRoomForGuestsToString } from "@/lib/types/request-models/stay/search.type";
import { ClickAwayListener } from "@mui/material";
import StaysMenu from "@organism/staysMenu";


function SearchBox() {
    const { isMobile } = useScreenResolution();
    const { queryParams } = useQueryParams();
    const { push } = useRouter()
    const { stayTabInitialSearchQuery, updateStayTabInitialQuery } = useStaySearchStore((state) => state);
    const { roomForGuests } = stayTabInitialSearchQuery

    const [submissionState, setSubmissionState] = useState({
        loading: false,
        //properties needed
    });

    const [guest, setGuest] = useState("");
    const options = [
        { value: "", label: "Select Guest" },
        { value: "2 adult", label: "2 Adult" },
        { value: "3 children", label: "3 Children" },
        { value: "all inclusive", label: "All Inclusive" },
    ];

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const menuOpen = Boolean(anchorEl);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    const computeGuestsAndRoomsString = () => {
        const rooms = roomForGuests.length;
        let guests = 0;

        for (let index = 0; index < roomForGuests.length; index++) {
            const room = roomForGuests[index];
            guests += room.adults + room.children.length;
        }
        return `${rooms} room${rooms == 1 ? "" : "s"} for ${guests} guest${guests == 1 ? "" : "s"}`;
    };

    const computeStaySearchQuery = () => {
        const params = {
            regionId: stayTabInitialSearchQuery.location?.id,
            countryCode: stayTabInitialSearchQuery.location?.country_code,
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
            //! guest array from listings page
            guests: convertRoomForGuestsToString([]),
        };
        return constructQueryFromParams(params);
    };

    const handleSubmit = () => {
        if (queryParams?.regionId === String(stayTabInitialSearchQuery?.location?.id ?? '')) {
            //refresh rates
            push(`/stay/view`)
        } else {
            push(`/stay/listings${computeStaySearchQuery()}`)
        }
    };

    console.log('initQ', stayTabInitialSearchQuery)
    

    return (
        <Span style={{ padding: "0px 20px" }}>
            <Flex direction="column">
                <Flex
                    direction="column"
                    gap=".5rem"
                    styles={{ marginBottom: "1.2rem" }}
                >
                    <Text type="p" text="Where do you want to stay?"></Text>
                    <RateHawkLocationSearchInput
                        onChange={(x: RateHawkRegionType) =>
                            updateStayTabInitialQuery({
                                ...stayTabInitialSearchQuery,
                                location: x,
                            })
                        }
                        value={stayTabInitialSearchQuery.location}
                        placeholder="Enter Destination or Hotel Name"
                        showHotels
                    />
                </Flex>
                <Flex gap="20px" direction={isMobile ? "column" : "row"}>
                    <Flex
                        direction="column"
                        gap=".5rem"
                        styles={{ marginBottom: "1.2rem" }}
                    >
                        <Text
                            type="label"
                            size={16}
                            text="Check-In"
                            weight={400}
                        />
                        <DatePicker
                            placeholder="Select Date"
                            onChange={(e) => 
                                updateStayTabInitialQuery({
                                    ...stayTabInitialSearchQuery,
                                    checkInDate: dayjs(e)
                                })
                            }
                            value={stayTabInitialSearchQuery?.checkInDate ? new Date(stayTabInitialSearchQuery?.checkInDate?.toString() ?? '') : undefined}
                            minDate={new Date()}
                        />
                    </Flex>
                    <Flex
                        direction="column"
                        gap=".5rem"
                        styles={{
                            marginBottom: "1.2rem",
                        }}
                    >
                        <Text
                            type="label"
                            size={16}
                            text="Check-Out"
                            weight={400}
                        />
                        <DatePicker
                            placeholder="Select Date"
                            onChange={(e) =>
                                updateStayTabInitialQuery({
                                    ...stayTabInitialSearchQuery,
                                    checkOutDate: dayjs(e)
                                })
                            }
                            value={stayTabInitialSearchQuery?.checkOutDate ? new Date(stayTabInitialSearchQuery?.checkOutDate?.toString() ?? '') : undefined}
                            minDate={new Date(stayTabInitialSearchQuery?.checkOutDate?.toString() ?? '')}
                        />
                    </Flex>
                </Flex>
                <Flex>
                    <Flex
                        direction="column"
                        gap=".5rem"
                        styles={{ marginBottom: "1.2rem" }}
                    >
                        <Text
                            type="label"
                            size={16}
                            text="Guests & Rooms"
                            weight={400}
                        />
                        <ClickAwayListener onClickAway={handleCloseMenu}>
                            <div>
                                <Input
                                    onClick={handleOpenMenu}
                                    placeholder="Click me to open dropdown"
                                    value={computeGuestsAndRoomsString()}
                                    styles={{
                                        fontFamily: "poppins",
                                        cursor: "pointer",
                                        fontSize: "14px",
                                    }}
                                />
                                {menuOpen && <StaysMenu />}
                            </div>
                        </ClickAwayListener>
                    </Flex>
                </Flex>
                <Flex>
                    <Button
                        width="100%"
                        margin=".5rem 0"
                        color="white"
                        background={
                            submissionState.loading
                                ? ttColors.dark
                                : ttColors.dark
                        }
                        onClick={handleSubmit}
                    >
                        {submissionState.loading ? (
                            <Spinner size="40px" fill={"white"} />
                        ) : (
                            <Text
                                type="p"
                                text="Search Again"
                                color={"white"}
                                size="16px"
                            />
                        )}
                    </Button>
                </Flex>
            </Flex>
        </Span>
    );
}

export default SearchBox;
