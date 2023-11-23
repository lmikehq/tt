import { CountryType } from "@/components/molecules/serviceTabs/components/visa";
import { mockCountry } from "../../schema";
import { SeatRowWithSegmentCodeInterface } from "../../response-models/flight/booking.type";

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
    nationality: string; // ISO 3166-1 alpha-2 format (2 letter format)
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
    nationality: CountryType; // ISO 3166-1 alpha-2 format (2 letter format)
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
        indices: number[]
    ) => {
        return baggageData.findIndex(
            (baggageGroup) =>
                baggageGroup.combination.indices.toString() ==
                indices.toString()
        );
    };

    const arrangeForBaggageType = ({
        type,
    }: {
        type: "hand_bag" | "hold_bag";
    }) => {
        passengers.forEach((passenger, passengerIndex) => {
            console.log(passenger);
            console.log("  passenger[type].indices", passenger[type]);
            const bagCombinationIndex =
                checkIfBaggageCombinationIsAlreadyRegistered(
                    passenger[type].indices
                );
            if (bagCombinationIndex == -1) {
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
    new_user_email: "olal1ewsaeth14@gmail.com",
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
