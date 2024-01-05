export interface StayOrderBookingRequestResponse {
    success: boolean;
    bookingData: BookingData;
    paymentOptions: StayPaymentOption[];
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
}

export interface StayPaymentOption {
    amount: string;
    currency_code: string;
    is_need_credit_card_data: boolean;
    is_need_cvc: boolean;
    recommended_price: null;
    type: Type;
}

export enum Type {
    Deposit = "deposit",
    Now = "now",
}

export interface StayCreditTokenizationResponse {
    success: boolean;
    message: string;
}
