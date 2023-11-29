"use client";
import { FlightLocationService } from "@/lib/services/flight/location.service";
import SearchInputAsLocationTypes from "../SearchInputAsLocationTypes";
import { useEffect, useRef, useState } from "react";
import { da } from "date-fns/locale";
import { useUserStore } from "@/lib/store/useStore";
import { RateHawkRegionType } from "@/lib/types/response-models/stay/location.type";
import { useSearchRateHawkLocations } from "@/lib/hooks/stay/search.hook";

interface RateHawkLocationSearchInputProps {
    onChange: (value: RateHawkRegionType) => void;
    value?: RateHawkRegionType;
    placeholder: string;
}

const RateHawkLocationSearchInput = ({
    onChange,
    value,
    placeholder,
}: RateHawkLocationSearchInputProps) => {
    const [searchText, setSearchText] = useState<string>("");

    const { data, isFetching } = useSearchRateHawkLocations(
        {
            query: searchText,
            language: "en",
        },
        { enabled: searchText ? true : false }
    );
    const { regions = [] } = data?.data ?? {};

    return (
        <SearchInputAsLocationTypes
            locations={regions}
            handleSetSearchText={({ text }) => setSearchText(text)}
            value={value}
            onChange={(value) => onChange(value as RateHawkRegionType)}
            placeholder={placeholder}
            loading={isFetching}
        />
    );
};

export default RateHawkLocationSearchInput;
