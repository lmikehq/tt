export interface StayOrderBookingReguestInput {
    userId: string;
    hotel_id: string;
    book_hash: string;
    user_ip: string;
}

export interface StayCreditTokenizationInput {
    object_id: string; //----> Item Id from the make booking
    user_first_name: string;
    user_last_name: string;
}

export interface StayOrderBookingFinishRoomGuest {
    first_name: string;
    last_name: string;
}
export interface StayOrderBookingFinishRoom {
    guests: StayOrderBookingFinishRoomGuest[];
}
export interface StayOrderBookingFinishUser {
    email: string;
    comment: string;
    phone: string;
}

export interface StayOrderBookingFinishPartner {
    partner_order_id: string;
}
export interface StayOrderBookingFinishPaymentType {
    type: "now" | "later";
    amount: string;
    currency_code: string;
    init_uuid?: string;
}
export interface StayOrderBookingFinishInput {
    user: StayOrderBookingFinishUser;
    partner: StayOrderBookingFinishPartner;
    language: string;
    rooms: StayOrderBookingFinishRoom[];
    object_id: string;
    payment_type: StayOrderBookingFinishPaymentType;
}
