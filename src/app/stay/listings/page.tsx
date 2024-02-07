"use client";
import React, { useEffect, useRef } from "react";
import SectionLayout from "@components/templates/SectionLayout";
import RoomList from "@/components/molecules/stays/components/roomList";
import { useStaySearchStore } from "@/lib/store/stay/search.store";
import {
    constructQueryFromParams,
} from "@/lib/extensions/helpers/constructQuery";
import { useRouter, useSearchParams } from "next/navigation";
import {
    StaySearchFilters,
    StaySearchInitialQuery,
} from "@/lib/types/request-models/stay/search.type";
import dayjs from "dayjs";
import { useQueryParams } from "@/hooks/useNext";


function Page() {
    const {
        staySearchFilters,
        staySearchSort,
        staySearchMeta,
        stayTabInitialSearchQuery,
        updateStayTabInitialQuery,
        updateStaySearchFilters,
    } = useStaySearchStore((state) => state);
    const router = useRouter();
    const { queryParams } = useQueryParams()
    const searchParams = useSearchParams();

    const regionId = searchParams.get("regionId") ?? "";
    const checkIn = searchParams.get("checkIn") ?? "";
    const checkOut = searchParams.get("checkOut") ?? "";
    const guests = searchParams.get("guests") ?? "";
    const countryCode = searchParams.get("countryCode") ?? "";
    const star = searchParams.get("star") ?? "";

    useEffect(() => {
        const initialSearchQuery: StaySearchInitialQuery = {
            regionId,
            countryCode,
            star,
            checkIn,
            checkOut,
            guests,
        };
        const query = constructQueryFromParams(
            {
                ...initialSearchQuery,
                ...staySearchFilters,
                sort: staySearchSort,
                ...staySearchMeta,
            },
            {
                initialize: false,
            }
        );
        const currentUrl = new URL(window.location.href);
        // Append the new query string
        currentUrl.search = query;
        // Replace the URL in the browser without a page reload
        router.replace(currentUrl.toString());
    }, [staySearchFilters, staySearchSort, staySearchMeta]);

    //This useEffect extracts data from the URL
    useEffect(() => {
        const filters: StaySearchFilters = {
            popularTypes: queryParams.popularTypes?.split(","),
            meals: queryParams.meals,
            amenity: queryParams.amenity?.split(","),
            apartmentType: queryParams.apartmentType?.split(","),
            star: queryParams.star?.split(","),
            guestRating: queryParams.guestRating?.split(","),
            cancellationPolicy: queryParams.cancellationPolicy?.split(","),
            bedType: queryParams.bedType?.split(","),
            room: queryParams.room?.split(","),
            minAmount: queryParams.minAmount
                ? parseInt(queryParams.minAmount)
                : undefined,
            maxAmount: queryParams.maxAmount
                ? parseInt(queryParams.maxAmount)
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
            <RoomList />
        </SectionLayout>
    );
}

export default Page;
