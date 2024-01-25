import { CountryType } from "@/components/molecules/serviceTabs/components/visa";
import { SeatRowWithSegmentCodeInterface } from "../../response-models/flight/booking.type";
import { OneFlightType, AirlineInterface } from "@/lib/extensions/context";
const airlines = require("airline-iata-code");
const sortedAirlines: { [k: string]: AirlineInterface } = {};
airlines().forEach((e: AirlineInterface) => {
    sortedAirlines[e.Airline] = e;
});

interface PaymentDetails {
    status: string;
    token: string;
    encrypted_cvv: string;
    bin_number: string;
    last_4_digits: string;
    holder_name: string;
    expiration: string;
    vendor: string;
    issuer: string | null;
    country_code: string;
    level: string;
    type: string;
    pass_luhn_validation: boolean;
    // risk_assessment: {
    //   correlationId: string;
    //   version: string;
    //   status: string;
    // };
}

export enum PassengerCategory {
    ADULT = "adult",
    CHILD = "child",
    INFANT = "infant",
}
export enum PassengerCategoryDesc {
    adult = "Adult (Over 11 years)",
    child = "Child (2 - 11 years)",
    infant = "Infant (Under 2 years)",
}

export interface Passenger {
    name: string;
    surname: string;
    phone?: string;
    email?: string;
    cardno: string;
    birthday: string; // YYYY-MM-DD format
    nationality?: CountryType | string; // ISO 3166-1 alpha-2 format (2 letter format)
    title: string;
    expiration: string; // expiration of passport, YYYY-MM-DD format
    category: string;
    currency: string;
}

export interface PassengerFormInterface {
    name: string;
    surname: string;

    cardno: string;
    birthday: string; // YYYY-MM-DD format
    nationality?: CountryType | string; // ISO 3166-1 alpha-2 format (2 letter format)
    title: string;
    expiration: string; // expiration of passport, YYYY-MM-DD format
    category: PassengerCategory;
    currency: string;
}
export interface ContactDetailsInterface {
    email: string;
    phone: string;
}
export interface CombinationPrice {
    currency: string;
    amount: number;
    base: number;
    service: number;
    service_flat: number;
    merchant: number;
}

export interface CombinationConditions {
    passenger_groups: string[];
}
export interface Combination {
    indices: number[];
    category: string;
    conditions: CombinationConditions;
    price: CombinationPrice;
}

export interface Baggage {
    combination: Combination;
    passengers: number[];
}

export interface CardInfo {
    number: string;
    cvv: string;
    expirationMonth: string;
    expirationYear: string;
    holder: string;
}

export interface SearchFlightsRequestQuery {
    fly_from?: string;
    fly_to?: string;
    date_from?: string;
    date_to?: string;
    fly_days_type?: string;
    fly_days?: string;
    curr?: string;
    stops?: string;
    adults?: number;
    children?: number;
    infants?: number;
    selected_cabins?: string;
    atime_from?: string;
    atime_to?: string;
    dtime_from?: string;
    dtime_to?: string;
    return_from?: string;
    return_to?: string;
    ret_dtime_from?: string;
    ret_dtime_to?: string;
    ret_atime_from?: string;
    ret_atime_to?: string;
    adult_hold_bag?: string;
    adult_hand_bag?: string;
    child_hold_bag?: string;
    child_hand_bag?: string;
    price_from?: number;
    price_to?: number;
    select_airlines?: string;
    vehicle_type?: string;
    max_stopovers?: number;
    max_fly_duration?: number;
    page?: number;
    limit?: number;
    sort?: string;
}

export interface SearchMultiFlightRequestQuery {
    requests: SearchFlightsRequestQuery[];
}
export interface CheckFlightsRequestInput {
    booking_token: string;
    session_id?: string;
}
export interface CheckFlightsQuery {
    booking_token?: string;
    session_id?: string;
    bnum: number;
    adults?: number;
    children?: number;
    infants?: number;
    currency?: string;
}
export interface CheckSeatingRequestInput {
    ancillaries: string[];
    booking_token: string;
    currency: string;
    passengers: Pick<Passenger, "birthday" | "category" | "nationality">[];
    session_id: string;
}

interface SeatingOption {
    segment_code: string;
    option: string;
    price: {
        amount: string;
        currency: string;
        base: string;
        service: string;
        service_flat: string;
        merchant: string;
    };
}
export interface SeatingSeatPrice {
    amount: string;
    currency: string;
    base: string;
    service: string;
    service_flat: string;
    merchant: string;
}
interface SeatingSeat {
    seat: string;
    passenger_idx: number;
    price: SeatingSeatPrice;
}

export interface ParticularSeatingOption {
    segment_code: string;
    option: string;
    seats: SeatingSeat[];
}
interface AdditionalServices {
    seating: (SeatingOption | ParticularSeatingOption)[];
}
export interface SaveBookingRequestInput {
    health_declaration_checked: boolean;
    lang: string;
    passengers: Passenger[];
    booking_token: string;
    session_id: string;
    new_user_email?: string;
    user?: string;
    seatId: string[];
    baggage: Baggage[];
    additional_services?: AdditionalServices | null;
}
export interface TokenizeDataRequestInput {
    card: CardInfo;
    payment: {
        order_id: string;
        token: string;
        gate: string;
        email: string;
    };
    booking_id: string;
    order_id: string;
    paymentToken: string;
}
export interface ConfirmPaymentZoozRequestInput {
    payment_details: PaymentDetails;
    booking_id: string;
    order_id: string;
    paymentToken: string;
    paymentMethodToken: string;
    sandbox: boolean;
    language: string;
}
export interface PassengerBaggageCombinationInterface {
    hand_bag: Combination;
    hold_bag: Combination;
}

export const arrangeBaggageDataForOrdering = (
    passengers: PassengerBaggageCombinationInterface[]
): Baggage[] => {
    let baggageData: Baggage[] = [];

    const checkIfBaggageCombinationIsAlreadyRegistered = (
        indices: number[],
        category: string
    ) => {
        return baggageData.findIndex(
            (baggageGroup) =>
                JSON.stringify(baggageGroup.combination.indices) ===
                    JSON.stringify(indices) &&
                baggageGroup.combination.category === category
        );
    };

    const arrangeForBaggageType = ({
        type,
    }: {
        type: "hand_bag" | "hold_bag";
    }) => {
        passengers.forEach((passenger, passengerIndex) => {
            //
            //
            const bagCombinationIndex =
                checkIfBaggageCombinationIsAlreadyRegistered(
                    passenger[type].indices,
                    passenger[type].category
                );
            if (bagCombinationIndex === -1) {
                baggageData = [
                    ...baggageData,
                    {
                        combination: passenger[type],
                        passengers: [passengerIndex],
                    },
                ];
            } else {
                baggageData[bagCombinationIndex].passengers = [
                    ...baggageData[bagCombinationIndex].passengers,
                    passengerIndex,
                ];
            }
        });
    };

    arrangeForBaggageType({ type: "hold_bag" });
    arrangeForBaggageType({ type: "hand_bag" });

    return baggageData;
};

export const findSeatWithPassengerIndex = ({
    index,
    particularSeats,
}: {
    index: number;
    particularSeats: ParticularSeatingOption[];
}): string | null => {
    for (const segment of particularSeats) {
        for (const seat of segment.seats) {
            if (seat.passenger_idx === index) {
                return "Seat " + seat.seat;
            }
        }
    }

    return null;
};

export const updateSeatAvailability = ({
    rows,
    seatName,
    selected,
}: {
    rows: SeatRowWithSegmentCodeInterface[];
    seatName: string;
    selected: boolean;
}) => {
    return rows.map((row) => {
        const updatedSeatGroups = row.seat_groups.map((seatGroup) => {
            return seatGroup.map((seat) => {
                if (seat.name === seatName) {
                    // Update the state of the seat
                    return { ...seat, selected };
                }
                return seat;
            });
        });

        // Return the updated row with modified seat groups
        return { ...row, seat_groups: updatedSeatGroups };
    });
};

export const shareCheckedAndCabinBaggage = ({
    adults,
    children,
    cabin,
    checked,
}: {
    adults: number;
    children: number;
    cabin: number;
    checked: number;
}): {
    child_hand_bag: string;
    child_hold_bag: string;
    adult_hand_bag: string;
    adult_hold_bag: string;
} => {
    const adultsAndChildren = adults + children;
    const shareCabinBags = (numPass: number, numBags: number) => {
        const arrBags = Array.from({ length: numBags }).fill(1);
        const arrPass = Array.from({ length: numPass }).fill(0);

        return arrPass.map((e) => {
            let val = arrBags.length > 0 ? 1 : 0;
            arrBags.pop();
            return val;
        });
    };
    const shareCheckedBags = (numPass: number, numBags: number) => {
        const arrBags = Array.from({ length: numBags }).fill(1);
        const arrPass = Array.from({ length: numPass }).fill(0);
        arrBags.forEach((e, ind, arr) => {
            arrPass[ind % numPass] = Number(arrPass[ind % numPass]) + 1;
        });
        return arrPass;
    };

    const sharedCabin = shareCabinBags(adultsAndChildren, cabin);
    const sharedChecked = shareCheckedBags(adultsAndChildren, checked);
    const adultHandBags =
        adults > 0 ? sharedCabin.slice(0, adults).join(",") : "0";
    const adultHoldBags =
        adults > 0 ? sharedChecked.slice(0, adults).join(",") : "0";
    const childHandBags =
        children > 0 ? sharedCabin.slice(adults).join(",") : "0";
    const childHoldBags =
        children > 0 ? sharedChecked.slice(adults).join(",") : "0";

    return {
        child_hand_bag: childHandBags,
        child_hold_bag: childHoldBags,
        adult_hand_bag: adultHandBags,
        adult_hold_bag: adultHoldBags,
    };
};

export const passengerAndBaggageDetails: PassengerFormInterface = {
    name: "",
    surname: "",
    cardno: "",
    birthday: "",
    nationality: { code: "NG", name: "Nigeria", flag: "s" },
    title: "",
    expiration: "",
    category: PassengerCategory.ADULT,
    currency: "usd",
};
// export const passengerAndBaggageDetails: PassengerFormInterface = {
//     name: "a",
//     surname: "a",

//     cardno: "q",
//     birthday: "1965-09-09",
//     nationality: { code: "NG", name: "Nigeria", flag: "s" },
//     title: "Mr",
//     expiration: "2026-08-09",
//     category: PassengerCategory.ADULT,
//     currency: "usd",
// };
export const saveBookingDetails: SaveBookingRequestInput = {
    health_declaration_checked: true,
    lang: "en",
    new_user_email: "",
    passengers: [],
    booking_token: "",
    session_id: "",
    baggage: [],
    seatId: [],
    // additional_services: null,
};

export const cardDetails: CardInfo = {
    number: "",
    cvv: "",
    expirationMonth: "",
    expirationYear: "",
    holder: "",
};

export const contactDetails: ContactDetailsInterface = {
    email: "",
    phone: "",
};
// export const contactDetails: ContactDetailsInterface = {
//     email: "olallere@gmail.com",
//     phone: "0908909889",
// };


export interface MultiFlightQuery {
    cabinBags: number;
    checkedBags: number;
    price: [number, number];
    departTime: [string, string];
    arrivalTime: [string, string],
    stopOver: [number, number],
    travelTime: [number, number],
    cabin: string;
    stops: string;
    airlines: string[];
    alliance: string[];
}
export const defaultMultiQuery: MultiFlightQuery = {
    cabinBags: 1,
    checkedBags: 0,
    price: [0, 20000],
    departTime: ["0:00", "23:59"],
    arrivalTime: ["0:00", "23:59"],
    stopOver: [2, 48],
    travelTime: [2, 48],
    cabin: 'M',
    stops: '',
    airlines: [],
    alliance: [],
}

export const parseMultiFlightQuery = (params: MultiFlightQuery, flight?: OneFlightType) => {
    const adults = Number(flight?.adults);
    const children = Number(flight?.children);
    const adultsAndChildren = adults + children;

    const shareCabinBags = (numPass: number, numBags: number) => {
        const arrBags = Array.from({ length: numBags }).fill(1);
        const arrPass = Array.from({ length: numPass }).fill(0);
        return arrPass.map((e) => {
            let val = arrBags.length > 0 ? 1 : 0;
            arrBags.pop();
            return val;
        });
    };

    const shareCheckedBags = (numPass: number, numBags: number) => {
        const arrBags = Array.from({ length: numBags }).fill(1);
        const arrPass = Array.from({ length: numPass }).fill(0);
        arrBags.forEach((e, ind, arr) => {
            arrPass[ind % numPass] = Number(arrPass[ind % numPass]) + 1;
        });
        return arrPass;
    };

    const sharedCabin = shareCabinBags(adultsAndChildren, params.cabinBags);
    const sharedChecked = shareCheckedBags(adultsAndChildren, params.cabinBags);
    const adultHandBags = adults > 0 ? sharedCabin.slice(0, adults).join(",") : undefined;
    const adultHoldBags = adults > 0 ? sharedChecked.slice(0, adults).join(",") : undefined;
    const childHandBags = children > 0 ? sharedCabin.slice(adults).join(",") : undefined;
    const childHoldBags = children > 0 ? sharedChecked.slice(adults).join(",") : undefined;

    return {
        adult_hand_bag: String(adultHandBags),
        adult_hold_bag: String(adultHoldBags),
        child_hand_bag: children > 0 ? String(childHandBags) : undefined,
        child_hold_bag: children > 0 ? String(childHoldBags) : undefined,
        select_airlines: params.airlines.map((e) => sortedAirlines[e]?.IATACode).join(","),
        select_airlines_exclude: false,
        max_sector_stopovers: params.stops,
        dtime_from: params?.departTime[0],
        dtime_to: params?.departTime[1],
        atime_from: params?.arrivalTime[0],
        atime_to: params?.arrivalTime[1],
        max_fly_duration: params.travelTime[1],
        stopover_from: params.stopOver[0],
        stopover_to: params.stopOver[1],
        price_from: params.price[0],
        price_to: params.price[1],
        selected_cabins: params.cabin,
    };
}