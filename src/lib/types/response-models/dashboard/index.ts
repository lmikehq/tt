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


