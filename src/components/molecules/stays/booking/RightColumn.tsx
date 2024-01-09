import { StayPaymentOption } from "@/lib/types/response-models/stay/booking.type";
import { Span } from "../view/styles";
import FreeCancellation from "./FreeCancellation";
import HotelDetail from "./HotelDetail";
import PriceDetail from "./PriceDetail";
import SelectCurrency from "./SelectCurrency";
import { sampleViewStay } from "@/lib/types/response-models/stay/search.type";

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
    return (
        <Span>
            <HotelDetail hotel={stayResponse} />
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
