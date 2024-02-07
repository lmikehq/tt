import { StayPaymentOption } from "@/lib/types/response-models/stay/booking.type";
import { Span } from "../view/styles";
import FreeCancellation from "./FreeCancellation";
import HotelDetail from "./HotelDetail";
import PriceDetail from "./PriceDetail";
import SelectCurrency from "./SelectCurrency";
import {
    ViewSingleStayResponse,
} from "@/lib/types/response-models/stay/search.type";
import dayjs from "dayjs";
import { useQueryParams } from "@/hooks/useNext";


interface RightColumnProps {
    hotel?: ViewSingleStayResponse;
}

const RightColumn = ({ hotel }: RightColumnProps) => {
    const { queryParams } = useQueryParams();

    return (
        <Span>
            {hotel && (
                <>
                    <HotelDetail
                        hotel={hotel}
                        checkInDate={dayjs(queryParams?.checkIn).format("MMM DD,YYYY")}
                        checkOutDate={dayjs(queryParams?.checkOut).format("MMM DD,YYYY")}
                        durationDays={dayjs(queryParams?.checkOut).diff(
                            dayjs(queryParams?.checkIn),
                            "day"
                        )}
                    />
                    {/* <PriceDetail
                        guests={queryParams?.guests}
                        hotel={hotel}
                        durationDays={dayjs(queryParams?.checkOut).diff(
                            dayjs(queryParams?.checkIn),
                            "day"
                        )}
                    /> */}
                    {hotel.rates[0].payment_options.payment_types[0].cancellation_penalties.free_cancellation_before && (
                        <FreeCancellation
                            freeCancelationBefore={
                                hotel.rates[0].payment_options
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
