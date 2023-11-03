import { FlightLocationService } from "@/lib/services/flight/location.service";
import SearchInputAsLocationTypes from "./SearchInputAsLocationTypes";
import { useEffect, useRef, useState } from "react";
import { da } from "date-fns/locale";
import Location from "@/lib/types/response-models/flight/location.type";

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

    const mountedRef = useRef(false);

    const fetchLocations = async ({
        latitude,
        longitude,
    }: {
        latitude?: number;
        longitude?: number;
    }) => {
        try {
            const data = await FlightLocationService.fetchLocations({
                data: { term: searchText },
                latitude,
                longitude,
            });
            console.log(data, "data");
            setLocations(data.locations);
            return locations;
        } catch (error) {
            setLocations([]);
        }
    };

    useEffect(() => {
        if (!mountedRef.current) {
            if (navigator.geolocation) {
                // Ask for permission to access the user's location
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        // Get the latitude and longitude from the position object
                        const { latitude, longitude } = position.coords;

                        fetchLocations({ latitude, longitude }).then((data) =>
                            setDefaultLocations(data ?? [])
                        );
                    },
                    (error) => {
                        console.error("Error getting location:", error);
                    }
                );
            } else {
                console.error("Geolocation is not supported by your browser.");
            }
            mountedRef.current = true;
        }

        fetchLocations({});
    }, [searchText]);

    return (
        <SearchInputAsLocationTypes
            locations={
                locations.length == 0 && !searchText
                    ? defaultLocations
                    : locations
            }
            handleSetSearchText={({ text }) => setSearchText(text)}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
        />
    );
};

export default LocationSearchSelectInput;
