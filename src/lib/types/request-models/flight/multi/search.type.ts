import {
    SearchFlightsRequestQuery,
    SearchFlightsRequestQueryClass,
} from "@/lib/types/request-models/flight/booking.type";
import { extractSearchParamsFromUrl } from "@/lib/extensions/helpers/constructQuery";
import { keys } from "ts-transformer-keys";

import {
    SearchMultiFlightRequestQuery,
    shareCheckedAndCabinBaggage,
} from "../booking.type";

export const extractFlightDataFromParams = ({
    flyFrom,
    url,
}: {
    flyFrom: string;
    url: string;
}) => {
    const formattedData: any[] = flyFrom.split("~").map((e) => ({
        fly_from: e,
    }));
    console.log(formattedData, "formm");
    let urlData = extractSearchParamsFromUrl({ url });
    const adults = Number(urlData.adults);
    const children = Number(urlData.children);
    const cabin = Number(urlData.cabinBags);
    const checked = Number(urlData.checkedBags);

    const sharedBags = shareCheckedAndCabinBaggage({
        adults,
        children,
        cabin,
        checked,
    });

    urlData = {
        ...urlData,
        ...sharedBags,
    };

    delete urlData.checkedBags;
    delete urlData.cabinBags;

    console.log(flyFrom, urlData, formattedData);
    Object.keys(urlData).forEach((key) => {
        if (urlData[key].split("~").length > 1) {
            urlData[key].split("~").forEach((el, i) => {
                if (el == "x") return;
                formattedData.splice(i, 1, {
                    ...formattedData[i],
                    [key]: el,
                });
            });
        } else {
            formattedData[0][key] = urlData[key];
        }
    });

    return formattedData;
};
type FlightFilters = Omit<
    SearchFlightsRequestQuery,
    | "fly_from"
    | "fly_to"
    | "date_from"
    | "stops"
    | "adults"
    | "children"
    | "infants"
    | "adult_hold_bag"
    | "adult_hand_bag"
    | "child_hold_bag"
    | "child_hand_bag"
    | "curr"
>;
export const parseMultiFlightFilters = (
    params: SearchMultiFlightRequestQuery
): FlightFilters => {
    const fieldsToOmit = [
        "fly_from",
        "fly_to",
        "date_from",
        "stops",
        "cabin",
        "adults",
        "children",
        "infants",
        "adult_hold_bag",
        "adult_hand_bag",
        "child_hold_bag",
        "child_hand_bag",
        "curr",
        "sort",
        "limit",
    ];
    const objectKeys = Object.keys(new SearchFlightsRequestQueryClass());
    let queryParams: FlightFilters = {};
    objectKeys.forEach((key) => {
        if (fieldsToOmit.includes(key)) return;
        let values: string[] = [];
        params.requests.forEach((flight) => {
            values.push(flight[key] ? `${flight[key]}` : "x");
        });
        const allX = values.every((element) => element === "x");
        if (allX) return;
        queryParams[key] = values.join("~");
    });
    return queryParams;
};

export const extractFlightFiltersFromURL = ({
    flyFrom,
    url,
}: {
    flyFrom: string;
    url: string;
}) => {
    const formattedData: any[] = flyFrom.split("~").map((e) => ({
        fly_from: e,
    }));
    const fieldsToOmit = [
        "fly_from",
        "fly_to",
        "date_from",
        "stops",
        "cabin",
        "adults",
        "children",
        "infants",
        "cabinBags",
        "checkedBags",
    ];
    let urlData = extractSearchParamsFromUrl({ url });

    fieldsToOmit.forEach((el) => delete urlData[el]);

    Object.keys(urlData).forEach((key) => {
        if (urlData[key].split("~").length > 1) {
            urlData[key].split("~").forEach((el, i) => {
                if (el == "x") return;
                formattedData.splice(i, 1, {
                    ...formattedData[i],
                    [key]: el,
                });
            });
        } else {
            formattedData[0][key] = urlData[key];
        }
    });

    return formattedData;
};
