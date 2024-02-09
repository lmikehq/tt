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
import { Box, Checkbox, Stack } from "@mui/material";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { useRouter } from "next/navigation";
import { useSearchTripAdvisorStay, useViewSingleStay, useViewTripAdvisorStayReviews, useViewTripAdvisorStayDetails, useViewTripAdvisorStayNearby, useSearchRecentlyViewedStays, useSearchSimilarStays, useSearchLikedStays } from "@/lib/hooks/stay/search.hook";
import { StaySearchFilters, ViewSingleStayRequestInput, convertRoomForGuestsToString, extractRoomForGuestsFromString } from "@/lib/types/request-models/stay/search.type";
import { useUserPreferencesStore } from "@/lib/store/preferences.store";
import { useQueryParams } from "@/hooks/useNext";
import React, { useEffect, useMemo, useState } from "react";
import { useUserStore } from "@/lib/store/useStore";
import AuthModal from "@/components/organisms/auth/AuthModal";
import Text from "@/components/atoms/text";
import Button from "@/components/atoms/button";
import { constructQueryFromParams } from "@/lib/extensions/helpers/constructQuery";
import Modal from "@/components/organisms/modal";
import { ttColors } from "@/lib/theme/colors";
import { FaQuestion } from "react-icons/fa6";
import ChooseYourRoomSkeleton from "@/components/molecules/stays/view/skeleton/ChooseYourRoomSkeleton";
import StayDetailSkeleton from "@/components/molecules/stays/view/skeleton/StayDetailSkeleton";
import { useStaySearchStore } from "@/lib/store/stay/search.store";
import dayjs from "dayjs";
import { rateHawkResourceClient } from "@/lib/axios/axios-client";
import withLikeHotel from "@/components/HOCs/withLikeHotel";
import FavouriteCheckBox from "@/components/molecules/FavouriteCheckBox";
const label = { inputProps: { "aria-label": "Checkbox demo" } };


function RefreshModal({
    isOpen,
    onClose,
    to,
    refresh,
}: {
    isOpen: boolean;
    onClose: VoidFunction;
    to?: string;
    refresh: () => void;
}) {
    const { isMobile } = useScreenResolution();
    const handleClick = () => { 
        onClose();
        refresh();
    }

    return (
        <Modal open={isOpen} handleClose={onClose}>
            <Stack
                direction="column"
                alignItems="center"
                spacing={3}
                bgcolor="white"
                paddingX={6}
                paddingY={4}
                width={isMobile ? "95vw" : "35vw"}
                borderRadius="16px"
            >
                <Flex width="100%" justify="center">
                    <Flex
                        width="max-content"
                        padding="1rem"
                        borderRadius="50%"
                        background={ttColors.primary100}
                    >
                        <FaQuestion size={28} color={ttColors.primary600} />
                    </Flex>
                </Flex>

                <Text
                    type="h2"
                    text="Still Searching?"
                    weight={600}
                    size={25}
                    textAlign="center"
                />
                <Text
                    type="h2"
                    text="The availability of these results could have changed. To access the most up-to-date prices, kindly refresh your search."
                    size={14}
                    color={ttColors.lighterGray}
                    textAlign="center"
                />

                <Stack width="100%" alignItems="center" spacing={2}>
                    <Button
                        width="100%"
                        padding="1.8rem 0"
                        onClick={handleClick}
                        background={ttColors.dark}
                    >
                        Refresh Search
                    </Button>
                </Stack>
            </Stack>
        </Modal>
    );
}

function AuthPlaceholder({ text, children, onOpen }: { text: string; children: JSX.Element; onOpen: () => void; }) {
    const { user } = useUserStore();

    if (user?.email) {
        return children
    } else return (
        <Flex direction="column" align="center" gap="1rem" padding="6rem 0" background="white" borderRadius=".5rem">
            <Button onClick={onOpen}>
                <Text
                    type="p"
                    text="Login"
                    weight={600}
                />
            </Button>
            <Text
                type="p"
                text={text}
            />
        </Flex>
    )
}


const StayViewPage = () => {
    const router = useRouter();
    const { isMobile } = useScreenResolution();
    const { queryParams } = useQueryParams();
    const { preFerredCurrency, preferredLanguage } = useUserPreferencesStore((state) => state);
    const [authOpen, setAuthOpen] = useState(false);
    const { updateStaySearchFilters, staySearchFilters, stayTabInitialSearchQuery, updateStayTabInitialQuery } = useStaySearchStore()
    const { user } = useUserStore()

    const [modal, setModal] = useState({
        isOpenRefresh: false,
    });

    const requestParams: ViewSingleStayRequestInput = {
        id: queryParams?.id,
        checkin: queryParams?.checkIn,
        checkout: queryParams?.checkOut,
        residency: "ng",
        language: preferredLanguage,
        currency: preFerredCurrency,
        guests: extractRoomForGuestsFromString(queryParams?.guests ?? ''),
    };

    const { data: stayResponse, isFetching: isLoadingStay, isError, refetch } = useViewSingleStay(requestParams, {
        enabled: requestParams?.id ? true : false,
    });

    const { data: recentlyViewed, isFetching: isLoadingRecentlyViewed, isError: isErrorRecentlyViewed } = useSearchRecentlyViewedStays({
        enabled: (!!user?._id && requestParams?.id) ? true : false,
    });

    const { data: similarStays, isFetching: isLoadingSimilarStays, isError: isErrorSimilarStays } = useSearchSimilarStays({ query: { user: user?._id ?? '' } }, {
        enabled: (!!user?._id && requestParams?.id) ? true : false,
    });

    const { data: findStayResponse, isFetching: isFetchingFindStay } = useSearchTripAdvisorStay({
        searchQuery: stayResponse ? stayResponse?.name : '',
        address: stayResponse?.address,
        // latLong: stayResponse?.latitude ? `${stayResponse?.latitude},${stayResponse?.longitude}` : '',
    }, {
        enabled: false,
    });
    const { data: stayDetailsResponse, isFetching: isFetchingStayDetails } = useViewTripAdvisorStayDetails({
        locationId: `${findStayResponse?.data[0].location_id}`,
    }, {
        enabled: false,
    });
    const { data: stayReviewsResponse, isFetching: isFetchingStayReviews } = useViewTripAdvisorStayReviews({
        locationId: `${findStayResponse?.data[0].location_id}`,
    }, {
        enabled: false,
    });
    const { data: stayNearbyResponse, isFetching: isFetchingStayNearby } = useViewTripAdvisorStayNearby({
        latLong: stayResponse?.latitude ? `${stayResponse?.latitude},${stayResponse?.longitude}` : '',
    }, {
        enabled: false,
    });

    const stayImages = useMemo(() => stayResponse?.images.map((img: string) => img.replace('{size}', '1024x768')) ?? [], [stayResponse])
    
    const handleGoBack = () => {
        router.back();
    };

    const EnhancedFavouriteCheckBox = withLikeHotel(FavouriteCheckBox);
    const { data: likedHotels } = useSearchLikedStays({ enabled: !!user?._id })

    useEffect(() => {
        if (isError || !queryParams?.checkIn || !queryParams?.checkOut || !queryParams?.guests ) {
            router.push(`/stay/listings${constructQueryFromParams(queryParams)}`)
        }
    }, [isError])
    
    useEffect(() => {
        const interval = setTimeout(() => {
            setModal((prev) => ({ ...prev, isOpenRefresh: true }));
        }, 600000);
        return () => clearInterval(interval);
    }, []);

    //This useEffect extracts data from the URL
    useEffect(() => {
        const filters: StaySearchFilters = {
            popularTypes: queryParams?.popularTypes?.split(","),
            meals: queryParams?.meals,
            amenity: queryParams?.amenity?.split(","),
            apartmentType: queryParams?.apartmentType?.split(","),
            star: queryParams?.star?.split(","),
            guestRating: queryParams?.guestRating?.split(","),
            cancellationPolicy: queryParams?.cancellationPolicy?.split(","),
            bedType: queryParams?.bedType?.split(","),
            room: queryParams?.room?.split(","),
            minAmount: queryParams?.minAmount
                ? parseInt(queryParams?.minAmount)
                : undefined,
            maxAmount: queryParams?.maxAmount
                ? parseInt(queryParams?.maxAmount)
                : undefined,
            limit: 20,
            regionId: queryParams?.regionId ?? undefined
        };
        updateStaySearchFilters(filters);
        updateStayTabInitialQuery({
            ...stayTabInitialSearchQuery,
            checkInDate: !!queryParams?.checkIn ? dayjs(queryParams?.checkIn) : dayjs().add(1, 'day'),
            checkOutDate: !!queryParams?.checkOut ? dayjs(queryParams?.checkOut) : dayjs().add(2, 'day'),
        })
    }, []);


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
                        <Flex width='max-content'>
                            <EnhancedFavouriteCheckBox
                                id={stayResponse?.id ?? ''}
                                liked={likedHotels?.some(e => e.id === stayResponse?.id)}
                            />
                        </Flex>
                    </Flex>
                </Span>
            )}

            {isLoadingStay ? (
                <StayDetailSkeleton />
            ) : (
                <HeroImageGrid
                    images={stayImages}
                    stayResponse={stayResponse!}
                />
            )}
            <Box
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: 28,
                    padding: 0,
                  },
                }}
            >
                <Section>
                    <StayDetails
                        stayResponse={stayResponse}
                        stayDetails={stayDetailsResponse!}
                        loading={isLoadingStay}
                    />

                    {isLoadingStay ? (
                        <StayDetailSkeleton />
                    ) : (
                        <React.Fragment>
                            <ChooseYourRoom
                                stayResponse={stayResponse}
                                stayImages={stayImages}
                                refetch={refetch}
                                loading={isLoadingStay}
                            />
                            <AuthPlaceholder text='Login to view similar hotels' onOpen={() => setAuthOpen(true)}>
                                <LikeSimilarHotels
                                    hotels={similarStays ?? []}
                                />
                            </AuthPlaceholder>
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
                            {/* <CompareSlider /> */}
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
                            <AuthPlaceholder text='Login to view recently viewed hotels' onOpen={() => setAuthOpen(true)}>
                                <RecentlyViewedList
                                    hotels={recentlyViewed ?? []}
                                />
                            </AuthPlaceholder>
                        </React.Fragment>
                    )}
                </Section>
            </Box>

            <AuthModal
                open={authOpen}
                handleClose={() => setAuthOpen(false)}
            />

            <RefreshModal
                isOpen={modal.isOpenRefresh}
                onClose={() =>
                    setModal((prev) => ({
                        ...prev,
                        isOpenRefresh: false,
                    }))
                }
                refresh={refetch}
            />
        </SectionLayout>
    );
};


export default StayViewPage;
