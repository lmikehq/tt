import { FlightLocationService } from "@/lib/services/flight/location.service";
import SearchInputAsLocationTypes from "./SearchInputAsLocationTypes";
import { useEffect, useRef, useState } from "react";
import { da } from "date-fns/locale";
import Location from "@/lib/types/response-models/flight/location.type";
import { useUserStore } from "@/lib/store/useStore";

interface LocationSearchSelectInputProps {
    onChange: (value: Location) => void;
    value?: Location;
    placeholder: string;
}

const LocationSearchSelectInput = ({
    onChange,
    value,
    placeholder,
}: LocationSearchSelectInputProps) => {
    const [locations, setLocations] = useState<Location[]>([]);
    const [searchText, setSearchText] = useState<string>("");
    const [defaultLocations, setDefaultLocations] = useState<Location[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { geoInfo } = useUserStore((state) => state);

    const mountedRef = useRef(false);

    const fetchLocations = async ({
        latitude,
        longitude,
    }: {
        latitude?: string;
        longitude?: string;
    }) => {
        try {
            setLoading(true);
            const data = await FlightLocationService.fetchLocations({
                data: { term: searchText },
                latitude,
                longitude,
            });
            // console.log(data?.locations, "data");
            setLoading(false);
            setLocations(data.locations ?? []);
            return locations;
        } catch (error) {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!mountedRef.current) {
            const { latitude, longitude } = geoInfo ?? {};

            fetchLocations({ latitude, longitude }).then((data) =>
                setDefaultLocations(data ?? [])
            );

            mountedRef.current = true;
        }

        fetchLocations({});
    }, [searchText]);

    return (
        <SearchInputAsLocationTypes
            locations={
                locations?.length == 0 && !searchText
                    ? defaultLocations
                    : locations
            }
            handleSetSearchText={({ text }) => setSearchText(text)}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            loading={loading}
        />
    );
};

export default LocationSearchSelectInput;
