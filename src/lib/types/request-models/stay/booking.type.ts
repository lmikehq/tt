import { RoomForGuest } from "./search.type";

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
    first_name?: string;
    last_name?: string;
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
    // partner: StayOrderBookingFinishPartner;
    language: string;
    rooms: StayOrderBookingFinishRoom[];
    object_id: string;
    payment_type: StayOrderBookingFinishPaymentType;
}

export interface GuestRoomsFormDataInterface {
    [key: string]: {
        guests: (StayOrderBookingFinishRoomGuest & { required: boolean })[];
        displayOtherGuests: boolean;
    };
}
export const generateInitialFormDataForRoomsAndGuests = (
    rooms: RoomForGuest[]
) => {
    let roomsData: GuestRoomsFormDataInterface = {};
    rooms.forEach(
        (el, index) =>
            (roomsData[`${index}`] = {
                guests: Array.from(
                    { length: el.adults + el.children.length },
                    (el, index) => ({
                        first_name: "",
                        last_name: "",
                        required: index == 0,
                    })
                ),
                displayOtherGuests: false,
            })
    );

    return roomsData;
};

export const convertGuestRoomsFormDataToList = (
    formData: GuestRoomsFormDataInterface
): StayOrderBookingFinishRoom[] => {
    const guestsList: StayOrderBookingFinishRoom[] = [];

    Object.keys(formData).forEach((roomKey) => {
        const room = formData[roomKey];

        const guests: StayOrderBookingFinishRoomGuest[] = [];

        room.guests.forEach((guest) => {
            if (guest.first_name || guest.last_name) {
                guests.push({
                    first_name: guest.first_name,
                    last_name: guest.last_name,
                });
            }
        });

        guestsList.push({
            guests,
        });
    });

    return guestsList;
};
