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

interface RightColumnProps {
    guests: string;
    // hotel: ViewSingleStayResponse;
}

const RightColumn = ({ guests }: RightColumnProps) => {
    const stayResponse = sampleViewStay;
    const searchParams = useSearchParams();
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");
    return (
        <Span>
            <HotelDetail
                hotel={stayResponse}
                checkInDate={dayjs(checkIn).format("MMM DD,YYYY")}
                checkOutDate={dayjs(checkOut).format("MMM DD,YYYY")}
                durationDays={dayjs(checkOut).diff(dayjs(checkIn), "day")}
            />
            <PriceDetail
                guests={guests}
                hotel={stayResponse}
                durationDays={dayjs(checkOut).diff(dayjs(checkIn), "day")}
            />
            <FreeCancellation />
        </Span>
    );
};

export default RightColumn;
