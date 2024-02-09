import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
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
import { Box, Skeleton } from "@mui/material";
import StaySkeletonLoader from "@/components/organisms/SkeletonLoader/StaySkelecton";
import Favorite from "@mui/icons-material/Favorite";
import { Grid } from "@/components/templates/grid";
import { useSearchLikedStays, useSearchStays } from "@/lib/hooks/stay/search.hook";
import { useStaySearchStore } from "@/lib/store/stay/search.store";
import { HotelBySearchInterface } from "@/lib/types/response-models/stay/search.type";
import { useUserPreferencesStore } from "@/lib/store/preferences.store";
import {
  ManyStaysRequestInput,
  extractRoomForGuestsFromString,
} from "@/lib/types/request-models/stay/search.type";
import Spinner from "../../icons/spinner";
import Text from "@/components/atoms/text";
import { useQueryParams } from "@/hooks/useNext";
import { useUserStore } from "@/lib/store/useStore";

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
            <Flex align="center" justify="space-between" gap="10%" width="100%">
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
                <StaySkeletonLoader tabs={1} text textWidth="70%" />
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
    const { queryParams } = useQueryParams()
    const { preFerredCurrency, preferredLanguage } = useUserPreferencesStore(
        (state) => state
    );
    const { user } = useUserStore()

    const staysRequestParams: ManyStaysRequestInput = {
        region_id: queryParams?.regionId ?? "",
        checkin: queryParams?.checkIn ?? "",
        checkout: queryParams?.checkOut ?? "",
        residency: "ng",
        language: preferredLanguage,
        currency: preFerredCurrency,
        guests: extractRoomForGuestsFromString(queryParams?.guests ?? ""),
    };

    const {
        staySearchFilters,
        updateStaySearchMeta,
        staySearchMeta,
        staySearchSort,
    } = useStaySearchStore((state) => state);


    const { data, isFetching } = useSearchStays({
        query: {
            ...staySearchFilters,
            meals: staySearchFilters.meals ? staySearchFilters?.meals : undefined,
            amenity: (staySearchFilters?.amenity ?? []).some(e => !!e) ? staySearchFilters.amenity : undefined,
            apartmentType: (staySearchFilters?.apartmentType ?? []).some(e => !!e) ? staySearchFilters.apartmentType : undefined,
            bedType: (staySearchFilters?.bedType ?? []).some(e => !!e) ? staySearchFilters.bedType : undefined,
            room: (staySearchFilters?.room ?? []).some(e => !!e) ? staySearchFilters.room : undefined,
            star: (staySearchFilters?.star ?? []).some(e => !!e) ? staySearchFilters.star : undefined,
            sort: staySearchSort ?? undefined,
            regionId: staySearchFilters?.regionId ?? undefined,
            currentPage: staySearchMeta?.currentPage ?? undefined
        },
        payload: staysRequestParams,
    });

    const { data: likedHotels } = useSearchLikedStays({ enabled: !!user?._id })

    const hotels = data?.hotelArray as HotelBySearchInterface[] ?? [];
    const hotelCount = data?.count ?? 0
    const limit = staySearchFilters.limit ?? 20
    const currentPage = staySearchMeta?.currentPage ?? 1
    const totalPages = Math.ceil(hotelCount > 20 ? hotelCount/limit : 1)
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
                    setSortType={setSortType}
                    hotels={hotels}
                />
            )}

            {isFetching ? (
                <HotelBoxSkeleton />
            ) : hotels.length === 0 ? (
                <Flex padding="5rem 0" justify="center">
                    <Text
                        type="p"
                        text="Sorry no hotels found"
                        weight={500}
                        size={18}
                    />
                </Flex>
            ) : hotels?.slice(0, 4).map((hotel, index) => (
                    <RoomBox hotel={hotel} index={index} key={index} likedHotels={likedHotels}  />
                ))
            }
            {/* <MidListFilter
                sortType={sortType}
                ratings={1}
                prices={1}
                setSortType={setSortType}
            /> */}
            {/* <RoomSlider hotels={hotels} /> */}

            {isFetching ? (
                <HotelBoxSkeleton />
            ) : hotels.length > 0 && hotels?.slice(4).map((hotel, index) => (
                <RoomBox hotel={hotel} index={index} key={index} likedHotels={likedHotels}  />
            ))}

            <Box
                sx={{
                    ".MuiPagination-ul": {
                        width: '100%',
                        justifyContent: 'center'
                    }
                }}
            >
                <Pagination
                    page={currentPage}
                    count={totalPages}
                    onChange={(ev, page) => 
                        updateStaySearchMeta({
                            ...staySearchMeta,
                            currentPage: page
                        })
                    }
                    size="large"
                    variant="outlined"
                    shape="rounded"
                    color="primary"
                />
            </Box>
        </div>
    );
}

export default AvailableRooms;
