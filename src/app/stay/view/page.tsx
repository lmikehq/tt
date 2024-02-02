"use client";

import Section from "@/components/molecules/section";
import BreadCrumbPane from "@/components/molecules/stays/view/BreadCrumbPane";
import ChooseYourRoom from "@/components/molecules/stays/view/ChooseYourRoom";
import CompareSimilarHotels from "@/components/molecules/stays/view/CompareSimilarHotels";
import CompareSlider from "@/components/molecules/stays/view/CompareSlider";
import DescriptionOfHotel from "@/components/molecules/stays/view/DescriptionOfHotel";
import HeroImageGrid from "@/components/molecules/stays/view/HeroImageGrid";
import HotelAmenities from "@/components/molecules/stays/view/HotelAmenities";
import HotelReviews from "@/components/molecules/stays/view/HotelReviews";
import LikeSimilarHotels from "@/components/molecules/stays/view/LikeSimilarHotels";
import Location from "@/components/molecules/stays/view/Location";
import Policies from "@/components/molecules/stays/view/Policies";
import StayDetails from "@/components/molecules/stays/view/StayDetails";
import RecentlyViewedList from "@/components/molecules/stays/view/recently-viewed/RecentlyViewedList";
import { Span } from "@/components/molecules/stays/view/styles";
import SectionLayout from "@/components/templates/SectionLayout";
import Flex from "@/components/templates/flex";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { Box, Checkbox } from "@mui/material";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { useRouter } from "next/navigation";
import { useSearchTripAdvisorStay, useViewSingleStay, useViewTripAdvisorStayReviews, useViewTripAdvisorStayDetails, useViewTripAdvisorStayNearby } from "@/lib/hooks/stay/search.hook";
import { ViewSingleStayRequestInput, convertRoomForGuestsToString, extractRoomForGuestsFromString } from "@/lib/types/request-models/stay/search.type";
import { useUserPreferencesStore } from "@/lib/store/preferences.store";
import { sampleReviews, sampleStayDetails, sampleStayNearby, sampleViewStay } from "@/lib/types/response-models/stay/search.type";
import { useQueryParams } from "@/hooks/useNext";
const sample = {
    name: '',
    latitude: '',
    longitude: '',
    address: '',
}

const testId = "transcorp_hilton_abuja, test_hotel_do_not_book"
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const StayViewPage = () => {
    const router = useRouter();
    const { isMobile } = useScreenResolution();
    const { queryParams } = useQueryParams()
    const { preFerredCurrency, preferredLanguage } = useUserPreferencesStore((state) => state);

    const requestParams: ViewSingleStayRequestInput = {
        id: queryParams?.id ?? "",
        checkin: queryParams?.checkIn ?? "2024-01-22",
        checkout: queryParams?.checkOut ?? "2024-01-26",
        residency: "ng",
        language: preferredLanguage,
        // guests: extractRoomForGuestsFromString(queryParams?.guests ?? { adults: 2, children: [] }),
        guests: [{ adults: 2, children: [] }],
        currency: preFerredCurrency,
    };

    const { data: stayResponse, isLoading: isLoadingStay, refetch } = useViewSingleStay(requestParams, {
        enabled: requestParams?.id ? true : false,
    });
    const { data: findStayResponse, isFetching: isFetchingFindStay } = useSearchTripAdvisorStay({
        searchQuery: stayResponse ? stayResponse?.name : '',
        // latLong: stayResponse?.latitude ? `${stayResponse?.latitude},${stayResponse?.longitude}` : '',
        // address: stayResponse?.address,
    }, {
        enabled: stayResponse ? true : false,
    });
    const { data: stayDetailsResponse, isFetching: isFetchingStayDetails } = useViewTripAdvisorStayDetails({
        locationId: `${findStayResponse?.data[0].location_id}`,
    }, {
        enabled: findStayResponse?.data ? true : false,
    });
    const { data: stayReviewsResponse, isFetching: isFetchingStayReviews } = useViewTripAdvisorStayReviews({
        locationId: `${findStayResponse?.data[0].location_id}`,
    }, {
        enabled: findStayResponse?.data ? true : false,
    });
    const { data: stayNearbyResponse, isFetching: isFetchingStayNearby } = useViewTripAdvisorStayNearby({
        latLong: stayResponse?.latitude ? `${stayResponse?.latitude},${stayResponse?.longitude}` : '',
    }, {
        enabled: findStayResponse?.data ? true : false,
    });

    // const stayReviewsResponse = sampleReviews.data
    // const stayDetailsResponse = sampleStayDetails
    // const stayNearbyResponse = sampleStayNearby.data
    const stayImages = stayResponse?.images.map(img => img.replace('{size}', '1024x768'))
    
    const handleGoBack = () => {
        router.back();
    };
    

    return (
        <SectionLayout>
            {!isMobile ? (
                <BreadCrumbPane stayResponse={stayResponse!} />
            ) : (
                <Span style={{ margin: "10px 0px" }}>
                    <Flex justify="space-between" align="center">
                        <Span>
                            <ArrowBackIosOutlinedIcon
                                onClick={handleGoBack}
                                style={{ cursor: "pointer", fontSize: "24px" }}
                            />
                        </Span>
                        <Span>
                            <Checkbox
                                {...label}
                                icon={<FavoriteBorder />}
                                checkedIcon={
                                    <Favorite
                                        style={{
                                            color: "var(--color-favorite)",
                                        }}
                                    />
                                }
                                disableRipple
                                disableTouchRipple
                                disableFocusRipple
                                sx={{
                                    "& .MuiSvgIcon-root": {
                                        fontSize: 28,
                                        padding: 0,
                                    },
                                }}
                                id="favorite-hotels-checkbox"
                            />
                        </Span>
                    </Flex>
                </Span>
            )}
            <HeroImageGrid
                images={stayImages}
                stayResponse={stayResponse!}
            />
            <Box
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: 28,
                    padding: 0,
                  },
                }}
            >
                {stayResponse && 
                    <Section>
                        <StayDetails
                            stayResponse={stayResponse}
                            stayDetails={stayDetailsResponse!}
                            loading={isLoadingStay}
                        />
                        <ChooseYourRoom
                            stayResponse={stayResponse}
                            refetch={refetch}
                            loading={isLoadingStay}
                        />
                        <LikeSimilarHotels
                            loading={isLoadingStay}
                        />
                        <Location
                            stayResponse={stayResponse}
                            stayDetails={stayDetailsResponse!}
                            nearbyLocations={stayNearbyResponse?.data ?? []}
                        />
                        <DescriptionOfHotel
                            stayResponse={stayResponse}
                        />
                        <HotelAmenities
                            stayResponse={stayResponse}
                        />
                        <CompareSlider />
                        <Policies
                            stayResponse={stayResponse}
                        />
                        {stayReviewsResponse &&
                            <HotelReviews
                                reviews={stayReviewsResponse.data ?? []}
                                stayDetails={stayDetailsResponse!}
                            />
                        }
                        {/* <CompareSimilarHotels /> */}
                    </Section>
                }
                <Section>
                    <RecentlyViewedList />
                </Section>
            </Box>
        </SectionLayout>
    );
};


export default StayViewPage;
