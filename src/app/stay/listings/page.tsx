"use client";
import React, { useEffect, useRef } from "react";
import SectionLayout from "@components/templates/SectionLayout";
import RoomList from "@/components/molecules/stays/components/roomList";
import { useStaySearchStore } from "@/lib/store/stay/search.store";
import {
    constructQueryFromParams,
    extractSearchParamsFromUrl,
} from "@/lib/extensions/helpers/constructQuery";
import { useRouter } from "next/navigation";
import { StaySearchFilters } from "@/lib/types/request-models/stay/search.type";

function Page() {
    const {
        staySearchFilters,
        staySearchSort,
        staySearchMeta,
        updateStaySearchFilters,
    } = useStaySearchStore((state) => state);
    const router = useRouter();

    const mountedRef = useRef(false);

    //This useEffect updates the URL
    useEffect(() => {
        const query = constructQueryFromParams(
            { ...staySearchFilters, sortBy: staySearchSort, ...staySearchMeta },
            {
                initialize: false,
            }
        );
        const currentUrl = new URL(window.location.href);

        // Append the new query string
        currentUrl.search += "&" + query;

        // Replace the URL in the browser without a page reload
        router.replace(currentUrl.toString());
    }, [staySearchFilters, staySearchSort, staySearchMeta]);

    //This useEffect extracts data from the URL

    useEffect(() => {
        const params = extractSearchParamsFromUrl({
            url: window.location.href,
        });
        const filters: StaySearchFilters = {
            popularTypes: params.popularTypes?.split(","),
            meals: params.meals?.split(","),
            propertyTypes: params.propertyTypes?.split(","),
            starRating: params.starRating?.split(","),
            guestRating: params.guestRating?.split(","),
            cancellationPolicy: params.cancellationPolicy?.split(","),
            bedType: params.bedType?.split(","),
            room: params.room?.split(","),
            minAmount: params.minAmount
                ? parseInt(params.minAmount)
                : undefined,
            maxAmount: params.maxAmount
                ? parseInt(params.maxAmount)
                : undefined,
        };
        console.log(filters, "filters");
        updateStaySearchFilters(filters);
    }, []);

    return (
        <SectionLayout>
            <RoomList />
        </SectionLayout>
    );
}

export default Page;
