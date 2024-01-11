"use client";
import { FlightLocationService } from "@/lib/services/flight/location.service";
import SearchInputAsLocationTypes from "../SearchInputAsLocationTypes";
import { useEffect, useRef, useState } from "react";
import { da } from "date-fns/locale";
import { useUserStore } from "@/lib/store/useStore";
import { RateHawkHotelType, RateHawkRegionType } from "@/lib/types/response-models/stay/location.type";
import { useSearchRateHawkLocations } from "@/lib/hooks/stay/search.hook";

interface RateHawkLocationSearchInputProps {
    onChange: (value: RateHawkRegionType | RateHawkHotelType) => void;
    value?: RateHawkRegionType | RateHawkHotelType;
    placeholder: string;
    showHotels: boolean;
}

const RateHawkLocationSearchInput = ({
    onChange,
    value,
    placeholder,
    showHotels,
}: RateHawkLocationSearchInputProps) => {
    const [searchText, setSearchText] = useState<string>("");

    const { data, isFetching } = useSearchRateHawkLocations(
        {
            query: searchText,
            language: "en",
        },
        { enabled: searchText ? true : false }
    );
    const { regions = [], hotels = [] } = data?.data ?? {};

    return (
        <SearchInputAsLocationTypes
            locations={showHotels ? hotels : regions}
            handleSetSearchText={({ text }) => setSearchText(text)}
            value={value}
            onChange={(value) => showHotels ? onChange(value as RateHawkHotelType) : onChange(value as RateHawkRegionType)}
            placeholder={placeholder}
            loading={isFetching}
            showHotels={showHotels}
        />
    );
};

export default RateHawkLocationSearchInput;
