import { DashboardFlightBookingProps } from "@/lib/types/response-models/dashboard";

const mockVisa = {
  "applicationType": "Single",
  "visaType": "Work",
  "primaryTraveller": {
    "firstName": "TestDavid",
    "lastName": "TestDavid",
    "travellingBy": "Airplane",
    "middleName": "",
    "email": "testdavid@gmail.com",
    "homeCountry": {
      "name": "Nigeria",
      "code": "NG"
    },
    "destination": {
      "name": "Canada",
      "code": "CA"
    },
    "placeOfBirth": "Nigeria",
    "phoneNumber": "2349155044880",
    "stateOfOrigin": "Lagos",
    "placeOfOrigin": "Lagos",
    "nativeLanguage": "English",
    "meansOfId": "National ID Card",
    "idNumber": "7682",
    "issueDate": "23/02/2022",
    "expiryDate": "23/04/2024",
    "address": "red",
    "countryOfCitizen": "Nigeria",
    "dateOfBirth": "23/03/2000",
    "gender": "Male",
    "maritalStatus": "Single",
    "partnersName": "",
    "passportNumber": "34",
    "passportIssuedCountry": "Nigeria",
    "passportExpiryDate": "23/03/2024",
    "tripPurpose": "GO",
    "tuberculosis": "false",
    "mentalDisorder": "false",
    "remainbeyondValidity": "false",
    "refusedBefore": "false",
    "arrestedBefore": "false",
    "servedInMilitary": "false",
    "memberOfViolentGroup": "false",
    "participatedInViolentActivities": "false",
    "education": [
      {
        "school": "Cove",
        "degree": "Bachelor of Science (BSc)",
        "cgpa": "4.2",
        "location": "Ota",
        "fieldOfStudy": "Computer Science",
        "startYear": 2022,
        "endYear": null,
        "stillAtSchool": true
      }
    ],
    "employment": [
      {
        "companyName": "Thrillers",
        "jobTitle": "Eng",
        "employmentType": "Full-Time",
        "companyLocation": "Lekki",
        "startYear": 2022,
        "endYear": null,
        "stillWorking": true
      }
    ]
  },
  "familyMembers": [],
  "documents": [
    {
      "name": "CV",
      "url": "https://res.cloudinary.com/thrillers-travels/image/upload/v1701758276/TestDavid1701758273054-files/thcwdmppnds9eyalyjgd.png"
    }
  ]
};

export const mockFlightBooking: DashboardFlightBookingProps[] = [
  {
    _id: "65855d2b46e6a6437258e958",
    flightType: 'ONE WAY',
    bookingId: 480745969,
    totalAmount: 14973.567,
    ticketPrice: "14973.567",
    numOfStopovers: 2,
    stopOverArray: [
      {
        flightNum: "1406",
        airport: "Qatar Airways",
        takeOffAirport: "Murtala Muhammed International",
        destinationAirport: "Hamad International",
        departureTime: "2023-12-23T19:20:00.000Z"
      },
      {
        flightNum: "1188",
        airport: "Qatar Airways",
        takeOffAirport: "Hamad International",
        destinationAirport: "King Abdulaziz International",
        departureTime: "2023-12-24T17:45:00.000Z"
      },
      {
        flightNum: "41",
        airport: "Saudi Arabian Airlines",
        takeOffAirport: "King Abdulaziz International",
        destinationAirport: "Los Angeles International",
        departureTime: "2023-12-25T09:15:00.000Z"
      }
    ],
    seatId: [],
    paymentToken: "4c47e9c8-a0b0-11ee-a2a0-cb756f84668f",
    flightNum: "1406",
    airlineIata: "QR",
    takeOffAirport: "Murtala Muhammed International",
    takeOffLocation: "Lagos, NG",
    src: "LOS",
    destinationAirport: "Hamad International",
    destinationLocation: "Doha, QA",
    dst: "DOH",
    airline: "Qatar Airways",
    flightCategory: "F",
    sp_fee: "989.23",
    departureTime: "2023-12-23T19:20:00.000Z",
    arrivalTime: "2023-12-24T05:55:00.000Z",
    status: "IS_CONFIRMED",
    passengerInfo: [
      {
        title: "mr",
        name: "Test",
        surname: "Test",
        cardno: "D25845822",
        expiration: 1786320000,
        nationality: "ng",
        birthday: "1997-11-11",
        category: "adult",
        bid: 480745969,
        created_at: "2023-12-22T09:55:54.000Z",
        updated_at: "2023-12-22T09:55:54.000Z",
        pk: 78545694,
        insurance_sent: null,
        checkin: "",
        visa: null,
        issuer: ""
      }
    ],
    passengerDetails: [
      {
        email: "elvis.osujic@gmail.com",
        phoneNumber: "+44857282842"
      }
    ],
    isReceived: true,
    isConfirmed: true,
    isCancelled: false,
    isFullyBooked: true,
    hasCompletedPayment: false,
    bookingProcessingDelay: false,
    hasPriceChanged: false,
    hasScheduleChanged: false,
    hasRequestedRefund: false,
    isRefunded: false,
    pricing: {
      adult: {
        currency: "EUR",
        amount: "4192.392",
        base: "3862.65",
        service: "0",
        service_flat: "329.742",
        merchant: "0"
      },
      child: {
        currency: "EUR",
        amount: "4192.392",
        base: "3862.65",
        service: "0",
        service_flat: "329.742",
        merchant: "0"
      },
      infant: {
        currency: "EUR",
        amount: "4192.392",
        base: "3862.65",
        service: "0",
        service_flat: "329.742",
        merchant: "0"
      }
    },
    hasErrors: false,
    errorsActionRequired: false,
    errorObject: [],
    pnrStatus: "AVAILABLE",
    pnrAvailabilityDate: false,
    userID: "6505837d4614f28e7c0903fb",
    createdAt: "2023-12-22T09:55:55.388Z",
    updatedAt: "2023-12-22T14:33:14.694Z",
    baggage: {
      "36873672": [
        {
          category: "personal_item",
          height: 25,
          width: 20,
          length: 40,
          weight: 3,
          count: 1
        },
        {
          category: "cabin_bag",
          height: 40,
          width: 20,
          length: 55,
          weight: 10,
          count: 1
        }
      ]
    },
    itinerary: {
      segments: [
        {
          type: "flight",
          src: "MAD",
          dst: "BOD",
          iata: "FR",
          departure_time_utc: "2022-01-13T13:25:00+00:00",
          pnr: "1TEST1",
          pnr_availability_from_utc: null,
          boarding_document_availability_from_utc: "2022-01-12T13:25:00+00:00",
          boarding_document_availability_to_utc: "2022-01-13T11:25:00+00:00",
          boarding_documents_link: null,
          mobile_boarding_documents_link: null,
          card_copy_links: [],
          carrier: {
            code: "FR",
            name: "Ryanair",
            public_code: "FR",
            segment_code: 100
          },
          operating_carrier: {
            code: "FR",
            name: "Ryanair",
            public_code: "FR",
            segment_code: 100
          },
          cabin_class: "economy",
          departure: {
            time: {
              utc: "2022-01-13T13:25:00+00:00",
              local: "2022-01-13T14:25:00+01:00"
            }
          },
          arrival: {
            time: {
              utc: "2022-01-13T14:40:00+00:00",
              local: "2022-01-13T15:40:00+01:00"
            }
          },
          return: null,
          passengers: {
            "36873672": {
              name: "TEST",
              surname: "TEST",
              birthday: "1985-01-01",
              pnr: "1TEST1",
              gds_ticket_number: "123-456789",
              boarding_document_link: null,
              mobile_boarding_document_link: null
            }
          }
        }
      ],
      boarding_documents_link: null,
      eticket_link: "https://mailing-files-dropzone.s3.eu-west-1.amazonaws.com/0000000000_E-ticket_passenger_52c0625b77f4295c3b241b226960f6cd.pdf?v=0000000000",
      invoice_link: "https://skypicker-invoices.s3-eu-west-1.amazonaws.com/invoice_2022_000000_000000.pdf"
    }
  }
];

interface Room {
  name: string;
  location: string;
  distance: string;
  reviews: number;
  rating: number;
  price: number;
  image: string;
  images: string[];
}

export const rooms: Room[] = [
  {
    name: "The Ritz London",
    location: "City Center",
    distance: "0.5 miles",
    reviews: 10,
    rating: 3,
    price: 81000,
    image: "/assets/images/stays/image1.jpg",
    images: [
      "/assets/images/stays/room1.jpeg",
      "/assets/images/stays/image2.jpg",
      "/assets/images/stays/image3.png",
      "/assets/images/stays/room4.jpg",
    ],
  },
  {
    name: "The Ritz London",
    location: "Suburb Area",
    distance: "1 mile",
    reviews: 15,
    rating: 4.8,
    price: 81000,
    image: "/assets/images/stays/room2.jpeg",
    images: [
      "/assets/images/stays/room1.jpeg",
      "/assets/images/stays/image2.jpg",
      "/assets/images/stays/image3.png",
      "/assets/images/stays/room4.jpg",
    ],
  },
  {
    name: "The Ritz London",
    location: "Downtown",
    distance: "0.3 miles",
    reviews: 8,
    rating: 4.2,
    price: 81000,
    image: "/assets/images/stays/room3.jpg",
    images: [
      "/assets/images/stays/room1.jpeg",
      "/assets/images/stays/image2.jpg",
      "/assets/images/stays/image3.png",
      "/assets/images/stays/room4.jpg",
    ],
  },
  {
    name: "The Ritz London",
    location: "Downtown",
    distance: "0.3 miles",
    reviews: 8,
    rating: 4.2,
    price: 81000,
    image: "/assets/images/stays/room3.jpg",
    images: [
      "/assets/images/stays/room1.jpeg",
      "/assets/images/stays/image2.jpg",
      "/assets/images/stays/image3.png",
      "/assets/images/stays/room4.jpg",
    ],
  },
];
