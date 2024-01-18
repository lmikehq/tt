export interface StayOrderBookingRequestResponse {
    success: boolean;
    bookingData: BookingData;
}

export interface BookingData {
    _id: string;
    userID: string;
    partnerOrderId: string;
    hotelId: string;
    bookHash: string;
    itemId: string;
    orderId: string;
    createdAt: string;
    updatedAt: string;
    paymentOptions: StayPaymentOption[];
}

export interface StayPaymentOption {
    amount: string;
    currency_code: string;
    is_need_credit_card_data: boolean;
    is_need_cvc: boolean;
    recommended_price: null;
    type: StayPaymentOptionType;
}

export enum StayPaymentOptionType {
    Deposit = "deposit",
    Now = "now",
}

export interface StayCreditTokenizationResponse {
    success: boolean;
    message: string;
}
