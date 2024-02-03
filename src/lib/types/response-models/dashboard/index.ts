export type DashboardPaymentInfo = {
  _id: string;
  totalAmount: number;
  status: string;
  description: string;
  paymentIntent: string;
  reference: string;
  isPartPayment: boolean;
  updatedAt: string;
};

export interface PaymentProp {
  _id: string;
  totalAmount: number;
  status: string;
  paymentIntent: string;
  reference: string;
  isPartPayment: boolean;
  updatedAt: string;
}


export interface NotificationProps {
  _id: string;
  notificationType: string;
  message: string;
  status: 'UNREAD' | 'READ';
  notificationFor: string;
  userName: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardFlightBookingProps {
  _id: string;
  flightType: 'ONE WAY' | 'RETURN' | 'MULTI CITY';
  bookingId: number;
  totalAmount: number;
  ticketPrice: string;
  numOfStopovers: number;
  stopOverArray: {
    flightNum: string;
    airport: string;
    takeOffAirport: string;
    destinationAirport: string;
    departureTime: string;
  }[];
  seatId: any[];
  paymentToken: string;
  flightNum: string;
  airlineIata: string;
  takeOffAirport: string;
  takeOffLocation: string;
  src: string;
  destinationAirport: string;
  destinationLocation: string;
  dst: string;
  airline: string;
  flightCategory: string;
  sp_fee: string;
  departureTime: string;
  arrivalTime: string;
  status: string;
  passengerInfo: {
    title: string;
    name: string;
    surname: string;
    cardno: string;
    expiration: number;
    nationality: string;
    birthday: string;
    category: string;
    bid: number;
    created_at: string;
    updated_at: string;
    pk: number;
    insurance_sent: any;
    checkin: string;
    visa: any;
    issuer: string;
  }[];
  passengerDetails: {
    email: string;
    phoneNumber: string;
  }[];
  isReceived: boolean;
  isConfirmed: boolean;
  isCancelled: boolean;
  isFullyBooked: boolean;
  hasCompletedPayment: boolean;
  bookingProcessingDelay: boolean;
  hasPriceChanged: boolean;
  hasScheduleChanged: boolean;
  hasRequestedRefund: boolean;
  isRefunded: boolean;
  pricing: {
    adult: {
      currency: string;
      amount: string;
      base: string;
      service: string;
      service_flat: string;
      merchant: string;
    };
    child: {
      currency: string;
      amount: string;
      base: string;
      service: string;
      service_flat: string;
      merchant: string;
    };
    infant: {
      currency: string;
      amount: string;
      base: string;
      service: string;
      service_flat: string;
      merchant: string;
    };
  };
  hasErrors: boolean;
  errorsActionRequired: boolean;
  errorObject: any[];
  pnrStatus: string;
  pnrAvailabilityDate: string | boolean;
  userID: string;
  createdAt: string;
  updatedAt: string;
  baggage?: {
    [key: string]: {
      category: string;
      height: number;
      width: number;
      length: number;
      weight: number;
      count: number;
    }[];
  };
  itinerary?: {
    segments: {
      type: string;
      src: string;
      dst: string;
      iata: string;
      departure_time_utc: string;
      pnr: string;
      pnr_availability_from_utc: string | null;
      boarding_document_availability_from_utc: string;
      boarding_document_availability_to_utc: string;
      boarding_documents_link: string | null;
      mobile_boarding_documents_link: string | null;
      card_copy_links: string[];
      carrier: {
        code: string;
        name: string;
        public_code: string;
        segment_code: number;
      };
      operating_carrier: {
        code: string;
        name: string;
        public_code: string;
        segment_code: number;
      };
      cabin_class: string;
      departure: {
        time: {
          utc: string;
          local: string;
        };
      };
      arrival: {
        time: {
          utc: string;
          local: string;
        };
      };
      return: null;
      passengers: {
        [key: string]: {
          name: string;
          surname: string;
          birthday: string;
          pnr: string;
          gds_ticket_number: string;
          boarding_document_link: string | null;
          mobile_boarding_document_link: string | null;
        };
      };
    }[];
    boarding_documents_link: string | null;
    eticket_link: string;
    invoice_link: string;
  };
}


// blogCarousel on _dev_ branch, copy the slidercard from line 232 in LikeSimilarHotels.tsx
export interface ReceiptProp {
  gateway: string;
  method: string;
  totalAmount: number;
  currency: string;
  description: string;
  paymentIntent: string;
  reference: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  accountType: string;
  role: string;
  resetPasswordExpires: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isDeleted: boolean;
  accountStatus: string;
  signUpMedium: string;
  createdAt: string;
  updatedAt: string;
  profilePicture: string;
  devices: {
    status: string;
  };
  address: string;
}


interface Room {
  match_hash: string;
  daily_prices: string[];
  meal: string;
  payment_options: {
    payment_types: {
      amount: string;
      show_amount: string;
      currency_code: string;
      show_currency_code: string;
      by: string | null;
      is_need_credit_card_data: boolean;
      is_need_cvc: boolean;
      type: string;
      tax_data: {
        taxes: {
          name: string;
          included_by_supplier: boolean;
          amount: string;
          currency_code: string;
        }[];
      };
      cancellation_penalties: {
        policies: {
          start_at: string | null;
          end_at: string | null;
          amount_charge: string;
          amount_show: string;
        }[];
        free_cancellation_before: string | null;
      };
    }[];
  };
  rg_ext: {
    class: number;
    quality: number;
    sex: number;
    bathroom: number;
    bedding: number;
    family: number;
    capacity: number;
    club: number;
    bedrooms: number;
    balcony: number;
    view: number;
    floor: number;
  };
  room_name: string;
  serp_filters: string[];
  allotment: number;
  amenities_data: string[];
  any_residency: boolean;
  deposit: string | null;
  no_show: {
    amount: string;
    currency_code: string;
    from_time: string;
  };
  room_data_trans: {
    main_room_type: string;
    main_name: string;
    bathroom: string | null;
    bedding_type: string | null;
    misc_room_type: string | null;
  };
}

interface Region {
  id: number;
  country_code: string;
  iata: string;
  name: string;
  type: string;
}

// FAVOURITES
export interface HotelRoomFavourite {
  _id: string;
  id: string;
  address: string;
  images: string[];
  name: string;
  region: Region;
  rates: Room[];
}

// STAYS BOOKING HISTORY
export interface HotelBookingHistory {
  _id: string;
  userID: string;
  checkInDate: string;
  checkOutDate: string;
  partnerOrderId: string;
  isTokenized: boolean;
  paymentOptions: {
    amount: string;
    currency_code: string;
    is_need_credit_card_data: boolean;
    is_need_cvc: boolean;
    type: string;
  }[];
  rooms: {
    first_name: string;
    last_name: string;
  }[];
  status: string;
  hotelId: string;
  hotelPayload: {
    image: string;
    rating: number;
    name: string;
    region: string;
  };
  bookHash: string;
  itemId: string;
  orderId: string;
  createdAt: string;
  updatedAt: string;
}

// REFERRAL
export interface ReferralProp {
  _id: string;
  user: {
    name: string;
    profilePic: string | null;
    email: string;
  };
  referrer: string;
  status: string;
  isClaimed: boolean;
  firstService: string;
  createdAt: string;
  updatedAt: string;
}

// VISA

export interface VisaResponseProp {
  _id: string;
  homeCountry: {
    name: string;
    code: string;
  };
  destination: {
    name: string;
    code: string;
  };
  applicationType: string;
  primaryTraveller: {
    personalDetails: {
      firstName: string;
      lastName: string;
    };
  };
  uniqueVisaId: string;
  payments: {
    _id: string;
    gateway: string;
    method: string;
    totalAmount: number;
    currency: string;
    status: string;
    description: string;
    oneTime: boolean;
    fee: number;
    service: string;
    paymentIntent: string;
    reference: string;
    checkoutUrl: string;
    isPartPayment: boolean;
    serviceID: string;
    user: string;
    userName: string;
    createdAt: string;
    updatedAt: string;
  }[];
  infoRequests: any[]; // Assuming this can be of any type
  applicationStatus: string;
  usedFormFeeVoucher: boolean;
  updatedAt: string;
}

export interface GetBankNamesProp {
  id: number,
  code: string,
  name: string;
}