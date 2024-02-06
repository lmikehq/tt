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


export interface StayBookingPaymentRequest {
    gateway: string;
    currency: string;
    service: string;
    serviceID: string;
    paymentIntent: string;
    amount: number;
    user?: string;
}

export interface StayBookingPaymentResponse {
    data: { link: string;  };
    message: string;
    status: string;
    // success: boolean;
    // bookingData: BookingData
}


export interface StayCheckBookingRequest {
    id?: string;
}

export type StayCheckBookingResponse = SingleStayCheckBookingResponse[]

export interface SingleStayCheckBookingResponse {
    _id: string;
    userID: string;
    checkInDate: string;
    checkOutDate: string;
    partnerOrderId: string;
    isTokenized: boolean;
    paymentOptions?: (PaymentOptionsEntity)[] | null;
    rooms?: (RoomsEntity)[] | null;
    status: string;
    hotelId: string;
    hotelPayload: HotelPayload;
    bookHash: string;
    itemId: string;
    orderId: string;
    createdAt: string;
    updatedAt: string;
}

export interface PaymentOptionsEntity {
    amount: string;
    currency_code: string;
    is_need_credit_card_data: boolean;
    is_need_cvc: boolean;
    recommended_price?: null;
    type: string;
}
export interface RoomsEntity {
    first_name: string;
    last_name: string;
}
export interface HotelPayload {
    image: string;
    rating: number;
    name: string;
    region: Region;
}
export interface Region {
    id: number;
    country_code: string;
    iata: string;
    name: string;
    type: string;
}
