import { StayPaymentOption } from "@/lib/types/response-models/stay/booking.type";
import { Span } from "../view/styles";
import FreeCancellation from "./FreeCancellation";
import HotelDetail from "./HotelDetail";
import PriceDetail from "./PriceDetail";
import SelectCurrency from "./SelectCurrency";
import { sampleViewStay } from "@/lib/types/response-models/stay/search.type";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";

interface RightColumnProps {
    paymentOptions: StayPaymentOption[];
    currentPaymentOption?: StayPaymentOption;
    onChangePaymentOption: (id: string) => void;
}

const RightColumn = ({
    paymentOptions,
    currentPaymentOption,
    onChangePaymentOption,
}: RightColumnProps) => {
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
            <PriceDetail />
            <FreeCancellation />
            <SelectCurrency
                paymentOptions={paymentOptions}
                currentPaymentOption={currentPaymentOption}
                onChangePaymentOption={onChangePaymentOption}
            />
        </Span>
    );
};

export default RightColumn;
