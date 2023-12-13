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
