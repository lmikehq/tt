"use client";
import SearchInputAsLocationTypes from "../SearchInputAsLocationTypes";
import { useState } from "react";
import { RateHawkRegionType } from "@/lib/types/response-models/stay/location.type";
import { useSearchRateHawkLocations } from "@/lib/hooks/stay/search.hook";

interface RateHawkLocationSearchInputProps {
    onChange: (value: RateHawkRegionType) => void;
    value?: RateHawkRegionType;
    placeholder: string;
    showHotels?: boolean;
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
    const { regions = [], hotels = [] as any[] } = data?.data ?? {};

    return (
        <SearchInputAsLocationTypes
            locations={showHotels ? hotels : regions}
            handleSetSearchText={({ text }) => setSearchText(text)}
            value={value}
            onChange={(value) => onChange(value as RateHawkRegionType)}
            placeholder={placeholder}
            loading={isFetching}
            showHotels={showHotels}
        />
    );
};

export default RateHawkLocationSearchInput;
