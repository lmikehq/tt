import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import Button from "@atom/button";
import Flex from "@components/templates/flex";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@mui/material/Pagination";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import SortedRoomsTab from "./sortedRoomsTab";
import MidListFilter from "./midListFilter";
import RoomSlider from "./roomSlider";
import RoomBox from "./roomsBox";
import { extractSearchParamsFromUrl } from "@/lib/extensions/helpers/constructQuery";
import SkeletonLoader from "@/components/organisms/SkeletonLoader/Skeleton";
import { ttColors } from "@/lib/theme/colors";
import { Mode } from "@/lib/types";
import { Skeleton } from "@mui/material";
import StaySkeletonLoader from "@/components/organisms/SkeletonLoader/StaySkelecton";
import Favorite from "@mui/icons-material/Favorite";
import { Grid } from "@/components/templates/grid";
import { useSearchStays } from "@/lib/hooks/stay/search.hook";
import { useStaySearchStore } from "@/lib/store/stay/search.store";
import { HotelBySearchInterface } from "@/lib/types/response-models/stay/search.type";
import { useUserPreferencesStore } from "@/lib/store/preferences.store";
import {
    ManyStaysRequestInput,
    extractRoomForGuestsFromString,
} from "@/lib/types/request-models/stay/search.type";

// FavoriteBoxSkeleton Component
export const FavoriteBoxSkeleton: React.FC = () => (
    <Flex
        justify="flex-end"
        position="absolute"
        styles={{ top: "20px", right: "20px" }}
        height="100%"
        width="100%"
    >
        <Favorite
            style={{
                color: "var(--color-light-gray)",
                borderRadius: "50%",
                padding: "10px",
                background: "white",
                fontSize: "50px",
            }}
        />
    </Flex>
);

// HotelBoxSkeleton Component
function HotelBoxSkeleton() {
    const arr = Array(4).fill(0);
    const { isMobile } = useScreenResolution();

    return (
        <React.Fragment>
            {arr.map((e, index) => (
                <Flex
                    width="100%"
                    justify="space-between"
                    background={ttColors.light}
                    borderRadius="10px"
                    key={index}
                    gap="20px"
                    styles={{ marginBottom: "20px" }}
                    overflow="hidden"
                    direction={isMobile ? "column" : "row"}
                >
                    {/* Left Side with Image and Favorite Icon */}
                    <Flex
                        width={isMobile ? "100%" : "38%"}
                        className="left_side"
                        position="relative"
                        overflow="hidden"
                    >
                        <StaySkeletonLoader
                            tabs={1}
                            textWidth="50%"
                            rectangularHeight={350}
                            rectangularWidth="100%"
                            containerProps={{
                                sx: { borderRadius: "12px" },
                            }}
                        />
                        {/* Favorite Box */}
                        <FavoriteBoxSkeleton />
                    </Flex>

                    {/* Right Side */}
                    <Flex
                        width={isMobile ? "100%" : "62%"}
                        direction="column"
                        className="right_side"
                    >
                        <Flex
                            align="center"
                            justify="space-between"
                            gap="10%"
                            width="100%"
                        >
                            <StaySkeletonLoader
                                tabs={1}
                                rectangularHeight={55}
                                rectangularWidth="100%"
                            />

                            <StaySkeletonLoader
                                text
                                tabs={1}
                                textHeight={60}
                                textWidth="100%"
                            />
                        </Flex>
                        <Flex align="center" gap="10px" width="100%">
                            <StaySkeletonLoader text tabs={1} textWidth="80%" />
                            <Flex justify="flex-start">
                                <StaySkeletonLoader
                                    text
                                    tabs={1}
                                    textHeight={40}
                                    textWidth="80%"
                                />
                            </Flex>
                        </Flex>
                        <Flex align="center" gap="10%" width="100%">
                            <StaySkeletonLoader
                                tabs={1}
                                rectangularHeight={60}
                                rectangularWidth="60%"
                            />
                            <Grid
                                columns={"0px"}
                                style={{
                                    gridTemplateColumns: "1fr 1fr 1fr",
                                    gap: "20px",
                                }}
                                width="60%"
                            >
                                <StaySkeletonLoader
                                    tabs={1}
                                    text={false}
                                    rectangularHeight="20px"
                                    rectangularWidth="20px"
                                />{" "}
                                <StaySkeletonLoader
                                    tabs={1}
                                    text={false}
                                    rectangularHeight="20px"
                                    rectangularWidth="20px"
                                />{" "}
                                <StaySkeletonLoader
                                    tabs={1}
                                    text={false}
                                    rectangularHeight="20px"
                                    rectangularWidth="20px"
                                />{" "}
                                <StaySkeletonLoader
                                    tabs={1}
                                    text={false}
                                    rectangularHeight="20px"
                                    rectangularWidth="20px"
                                />{" "}
                                <StaySkeletonLoader
                                    tabs={1}
                                    text={false}
                                    rectangularHeight="20px"
                                    rectangularWidth="20px"
                                />{" "}
                                <StaySkeletonLoader
                                    tabs={1}
                                    text={false}
                                    rectangularHeight="20px"
                                    rectangularWidth="20px"
                                />
                            </Grid>
                        </Flex>
                        <Flex
                            align="center"
                            gap="20px"
                            width="100%"
                            justify="space-between"
                            margin="15px 0px"
                        >
                            <StaySkeletonLoader
                                text
                                tabs={1}
                                textHeight={40}
                                textWidth="100%"
                            />
                            <StaySkeletonLoader
                                text
                                tabs={1}
                                textHeight={40}
                                textWidth="100%"
                            />{" "}
                            <StaySkeletonLoader
                                text
                                tabs={1}
                                textHeight={40}
                                textWidth="100%"
                            />
                        </Flex>
                        <Flex
                            styles={{ marginTop: "10px" }}
                            align="center"
                            justify="space-between"
                            gap="10%"
                            width="100%"
                        >
                            <Flex direction="column">
                                <StaySkeletonLoader
                                    tabs={1}
                                    rectangularHeight={55}
                                    rectangularWidth="70%"
                                />
                                <StaySkeletonLoader
                                    tabs={1}
                                    text
                                    textWidth="70%"
                                />
                            </Flex>

                            <StaySkeletonLoader
                                text
                                tabs={1}
                                textHeight={80}
                                textWidth="100%"
                            />
                        </Flex>
                    </Flex>
                </Flex>
            ))}
        </React.Fragment>
    );
}

function AvailableRooms() {
    const { isMobile } = useScreenResolution();

    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");
    const guests = searchParams.get("guests");
    const { preFerredCurrency, preferredLanguage } = useUserPreferencesStore(
        (state) => state
    );

    const staysRequestParams = (): ManyStaysRequestInput => ({
        checkin: checkIn ?? "",
        checkout: checkOut ?? "",
        residency: "ng",
        language: preferredLanguage,
        guests: extractRoomForGuestsFromString(guests ?? ""),
        currency: preFerredCurrency,
    });

    const { staySearchFilters } = useStaySearchStore((state) => state);

    const { data = [], isFetching } = useSearchStays({
        query: { ...staySearchFilters },
        payload: staysRequestParams(),
    });
    const hotels = data as HotelBySearchInterface[];
    const router = useRouter();

    const [sortType, setSortType] = useState("best");

    return (
        <div>
            {!isMobile && (
                <SortedRoomsTab
                    bestPrice={1}
                    topReviews={1}
                    lowestPrice={1}
                    starRatings={1}
                    distance={"s"}
                    sortType={sortType}
                    hotels={hotels}
                    setSortType={setSortType}
                />
            )}
            {!isFetching ? (
                hotels
                    ?.slice(0, 4)
                    .map((hotel, index) => (
                        <RoomBox hotel={hotel} index={index} key={index} />
                    ))
            ) : (
                <HotelBoxSkeleton />
            )}
            <MidListFilter
                sortType={sortType}
                ratings={1}
                prices={1}
                setSortType={setSortType}
            />
            <RoomSlider hotels={hotels} />
            {hotels?.slice(4).map((hotel, index) => (
                <RoomBox hotel={hotel} index={index} key={index} />
            ))}
            <Flex justify="center" styles={{ marginTop: "40px" }}>
                <span className="pagination">
                    <Pagination
                        className="paginationItemStyle"
                        count={10}
                        color="primary"
                        variant="outlined"
                        shape="rounded"
                    />
                </span>
            </Flex>
        </div>
    );
}

export default AvailableRooms;
