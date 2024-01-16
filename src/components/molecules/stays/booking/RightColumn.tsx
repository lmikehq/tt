import { StayPaymentOption } from "@/lib/types/response-models/stay/booking.type";
import { Span } from "../view/styles";
import FreeCancellation from "./FreeCancellation";
import HotelDetail from "./HotelDetail";
import PriceDetail from "./PriceDetail";
import SelectCurrency from "./SelectCurrency";
import {
    ViewSingleStayResponse,
    sampleViewStay,
} from "@/lib/types/response-models/stay/search.type";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import { useViewSingleStay } from "@/lib/hooks/stay/search.hook";
import {
    ViewSingleStayRequestInput,
    extractRoomForGuestsFromString,
} from "@/lib/types/request-models/stay/search.type";
import { useUserPreferencesStore } from "@/lib/store/preferences.store";

interface RightColumnProps {
    // hotel: ViewSingleStayResponse;
}

const RightColumn = ({}: RightColumnProps) => {
    // const stayResponse = sampleViewStay;
    const searchParams = useSearchParams();

    const id = searchParams.get("id");
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");
    const guests = searchParams.get("guests") ?? "";
    const { preFerredCurrency, preferredLanguage } = useUserPreferencesStore(
        (state) => state
    );

    const requestParams: ViewSingleStayRequestInput = {
        // id: "transcorp_hilton_abuja" ?? id ?? "",
        id: "test_hotel_do_not_book" ?? id ?? "",
        checkin: checkIn ?? "2024-01-18",
        checkout: checkOut ?? "2024-01-19",
        residency: "gb",
        language: preferredLanguage,
        guests: extractRoomForGuestsFromString(guests ?? ""),
        currency: preFerredCurrency,
    };

    const { data: stayResponse, isFetching } = useViewSingleStay(
        requestParams,
        {
            enabled: id ? true : false,
        }
    );

    return (
        <Span>
            {stayResponse && (
                <>
                    <HotelDetail
                        hotel={stayResponse}
                        checkInDate={dayjs(checkIn).format("MMM DD,YYYY")}
                        checkOutDate={dayjs(checkOut).format("MMM DD,YYYY")}
                        durationDays={dayjs(checkOut).diff(
                            dayjs(checkIn),
                            "day"
                        )}
                    />
                    <PriceDetail
                        guests={guests}
                        hotel={stayResponse}
                        durationDays={dayjs(checkOut).diff(
                            dayjs(checkIn),
                            "day"
                        )}
                    />
                    {stayResponse.rates[0].payment_options.payment_types[0]
                        .cancellation_penalties.free_cancellation_before && (
                        <FreeCancellation
                            freeCancelationBefore={
                                stayResponse.rates[0].payment_options
                                    .payment_types[0].cancellation_penalties
                                    .free_cancellation_before!
                            }
                        />
                    )}
                </>
            )}
        </Span>
    );
};

export default RightColumn;
