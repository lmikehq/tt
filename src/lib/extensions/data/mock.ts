import { DashboardFlightBookingProps, HotelBookingHistory, HotelRoomFavourite } from "@/lib/types/response-models/dashboard";

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
    flightType: 'MULTI CITY',
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


export const mockUserDashboardLikes: HotelRoomFavourite = {
  _id: "655ca968fb18ae3389c84d30",
  address: "Albay Sadri Alantar Sokak 24-30, Istanbul",
  images: [
    "https://cdn.worldota.net/t/{size}/content/97/4f/974f621e557fabf65a1fb3f487915044c5becba5.jpeg",
    // Add other image URLs here...
  ],
  name: "Canka Residence",
  region: {
    id: 1639,
    country_code: "TR",
    iata: "IST",
    name: "Istanbul",
    type: "City",
  },
  "rates": [
    {
      "match_hash": "m-cbca702f-f092-5422-8f24-7dff84b596fc",
      "daily_prices": [
        "0.40",
        "0.40",
        "0.40",
        "0.40",
        "0.40"
      ],
      "meal": "nomeal",
      "payment_options": {
        "payment_types": [
          {
            "amount": "75.00",
            "show_amount": "2.00",
            "currency_code": "HNL",
            "show_currency_code": "EUR",
            "by": null,
            "is_need_credit_card_data": false,
            "is_need_cvc": false,
            "type": "hotel",
            "tax_data": {
              "taxes": [
                {
                  "name": "city_tax",
                  "included_by_supplier": false,
                  "amount": "3691.61",
                  "currency_code": "HNL"
                },
                {
                  "name": "electricity_fee",
                  "included_by_supplier": true,
                  "amount": "0.06",
                  "currency_code": "EUR"
                },
                {
                  "name": "service_fee",
                  "included_by_supplier": false,
                  "amount": "14.56",
                  "currency_code": "HNL"
                },
                {
                  "name": "vat",
                  "included_by_supplier": false,
                  "amount": "333.07",
                  "currency_code": "HNL"
                }
              ]
            },
            "cancellation_penalties": {
              "policies": [
                {
                  "start_at": null,
                  "end_at": null,
                  "amount_charge": "75.00",
                  "amount_show": "2.00"
                }
              ],
              "free_cancellation_before": null
            }
          }
        ]
      },
      "rg_ext": {
        "class": 3,
        "quality": 2,
        "sex": 0,
        "bathroom": 1,
        "bedding": 3,
        "family": 0,
        "capacity": 2,
        "club": 0,
        "bedrooms": 0,
        "balcony": 0,
        "view": 0,
        "floor": 0
      },
      "room_name": "Standard Double room (shared bathroom) (full double bed)",
      "serp_filters": [],
      "allotment": 13,
      "amenities_data": [
        "non-smoking"
      ],
      "any_residency": true,
      "deposit": null,
      "no_show": {
        "amount": "15.00",
        "currency_code": "HNL",
        "from_time": "12:00:00"
      },
      "room_data_trans": {
        "main_room_type": "Standard Double room (shared bathroom)",
        "main_name": "Standard Double room",
        "bathroom": "shared bathroom",
        "bedding_type": "full double bed",
        "misc_room_type": null
      }
    },
    {
      "match_hash": "m-192663bf-46a0-54db-a5c6-69850846561a",
      "daily_prices": [
        "0.48",
        "0.48",
        "0.48",
        "0.48",
        "0.48"
      ],
      "meal": "nomeal",
      "payment_options": {
        "payment_types": [
          {
            "amount": "2.41",
            "show_amount": "2.41",
            "currency_code": "EUR",
            "show_currency_code": "EUR",
            "by": "credit_card",
            "is_need_credit_card_data": true,
            "is_need_cvc": true,
            "type": "now",
            "tax_data": {
              "taxes": [
                {
                  "name": "city_tax",
                  "included_by_supplier": false,
                  "amount": "3691.61",
                  "currency_code": "HNL"
                },
                {
                  "name": "electricity_fee",
                  "included_by_supplier": true,
                  "amount": "0.07",
                  "currency_code": "EUR"
                },
                {
                  "name": "service_fee",
                  "included_by_supplier": false,
                  "amount": "14.56",
                  "currency_code": "HNL"
                },
                {
                  "name": "vat",
                  "included_by_supplier": false,
                  "amount": "333.07",
                  "currency_code": "HNL"
                }
              ]
            },
            "cancellation_penalties": {
              "policies": [
                {
                  "start_at": null,
                  "end_at": null,
                  "amount_charge": "2.41",
                  "amount_show": "2.41"
                }
              ],
              "free_cancellation_before": null
            }
          }
        ]
      },
      "rg_ext": {
        "class": 3,
        "quality": 2,
        "sex": 0,
        "bathroom": 1,
        "bedding": 3,
        "family": 0,
        "capacity": 2,
        "club": 0,
        "bedrooms": 0,
        "balcony": 0,
        "view": 0,
        "floor": 0
      },
      "room_name": "Standard Double room (shared bathroom) (full double bed)",
      "serp_filters": [],
      "allotment": 13,
      "amenities_data": [
        "non-smoking"
      ],
      "any_residency": true,
      "deposit": null,
      "no_show": {
        "amount": "15.00",
        "currency_code": "HNL",
        "from_time": "12:00:00"
      },
      "room_data_trans": {
        "main_room_type": "Standard Double room (shared bathroom)",
        "main_name": "Standard Double room",
        "bathroom": "shared bathroom",
        "bedding_type": "full double bed",
        "misc_room_type": null
      }
    },
    {
      "match_hash": "m-c96b899e-e879-5507-9293-3dc530ea2c62",
      "daily_prices": [
        "0.60",
        "0.60",
        "0.60",
        "0.60",
        "0.60"
      ],
      "meal": "nomeal",
      "payment_options": {
        "payment_types": [
          {
            "amount": "100.00",
            "show_amount": "3.00",
            "currency_code": "HNL",
            "show_currency_code": "EUR",
            "by": null,
            "is_need_credit_card_data": false,
            "is_need_cvc": false,
            "type": "hotel",
            "tax_data": {
              "taxes": [
                {
                  "name": "city_tax",
                  "included_by_supplier": false,
                  "amount": "3691.61",
                  "currency_code": "HNL"
                },
                {
                  "name": "electricity_fee",
                  "included_by_supplier": true,
                  "amount": "0.09",
                  "currency_code": "EUR"
                },
                {
                  "name": "service_fee",
                  "included_by_supplier": false,
                  "amount": "19.42",
                  "currency_code": "HNL"
                },
                {
                  "name": "vat",
                  "included_by_supplier": false,
                  "amount": "333.07",
                  "currency_code": "HNL"
                }
              ]
            },
            "cancellation_penalties": {
              "policies": [
                {
                  "start_at": null,
                  "end_at": null,
                  "amount_charge": "100.00",
                  "amount_show": "3.00"
                }
              ],
              "free_cancellation_before": null
            }
          }
        ]
      },
      "rg_ext": {
        "class": 3,
        "quality": 2,
        "sex": 0,
        "bathroom": 2,
        "bedding": 3,
        "family": 0,
        "capacity": 2,
        "club": 0,
        "bedrooms": 0,
        "balcony": 0,
        "view": 0,
        "floor": 0
      },
      "room_name": "Standard Double room (full double bed)",
      "serp_filters": [
        "has_bathroom"
      ],
      "allotment": 5,
      "amenities_data": [
        "non-smoking"
      ],
      "any_residency": true,
      "deposit": null,
      "no_show": {
        "amount": "100.00",
        "currency_code": "HNL",
        "from_time": "12:00:00"
      },
      "room_data_trans": {
        "main_room_type": "Standard Double room",
        "main_name": "Standard Double room",
        "bathroom": null,
        "bedding_type": "full double bed",
        "misc_room_type": null
      }
    },
    {
      "match_hash": "m-312703e0-cab8-57a4-a588-4e65ea1fbc8c",
      "daily_prices": [
        "5.60",
        "5.60",
        "5.60",
        "5.60",
        "5.60"
      ],
      "meal": "nomeal",
      "payment_options": {
        "payment_types": [
          {
            "amount": "755.00",
            "show_amount": "28.00",
            "currency_code": "HNL",
            "show_currency_code": "EUR",
            "by": null,
            "is_need_credit_card_data": false,
            "is_need_cvc": false,
            "type": "hotel",
            "tax_data": {
              "taxes": [
                {
                  "name": "city_tax",
                  "included_by_supplier": false,
                  "amount": "3691.61",
                  "currency_code": "HNL"
                },
                {
                  "name": "electricity_fee",
                  "included_by_supplier": true,
                  "amount": "0.82",
                  "currency_code": "EUR"
                },
                {
                  "name": "service_fee",
                  "included_by_supplier": false,
                  "amount": "146.60",
                  "currency_code": "HNL"
                },
                {
                  "name": "vat",
                  "included_by_supplier": false,
                  "amount": "333.07",
                  "currency_code": "HNL"
                }
              ]
            },
            "cancellation_penalties": {
              "policies": [
                {
                  "start_at": null,
                  "end_at": null,
                  "amount_charge": "755.00",
                  "amount_show": "28.00"
                }
              ],
              "free_cancellation_before": null
            }
          }
        ]
      },
      "rg_ext": {
        "class": 6,
        "quality": 0,
        "sex": 0,
        "bathroom": 2,
        "bedding": 0,
        "family": 0,
        "capacity": 0,
        "club": 0,
        "bedrooms": 0,
        "balcony": 1,
        "view": 0,
        "floor": 0
      },
      "room_name": "Apartment with balcony",
      "serp_filters": [
        "has_bathroom"
      ],
      "allotment": 29,
      "amenities_data": [
        "non-smoking"
      ],
      "any_residency": true,
      "deposit": null,
      "no_show": {
        "amount": "151.00",
        "currency_code": "HNL",
        "from_time": "12:00:00"
      },
      "room_data_trans": {
        "main_room_type": "Apartment with balcony",
        "main_name": "Apartment with balcony",
        "bathroom": null,
        "bedding_type": null,
        "misc_room_type": null
      }
    }
  ]
};


export const mockStaysBookingHistory: HotelBookingHistory[] = [
  {
    "_id": "65b8f4f2a7865de9710e0524",
    "userID": "65545b98a7255b4e8c0beaae",
    "checkInDate": "2024-02-05",
    "checkOutDate": "2024-02-20",
    "partnerOrderId": "0d16465f-43ed-4ca9-8e64-5b6eaa895db0",
    "isTokenized": false,
    "paymentOptions": [
      {
        "amount": "9",
        "currency_code": "USD",
        "is_need_credit_card_data": true,
        "is_need_cvc": true,
        "type": "now"
      },
      {
        "amount": "8",
        "currency_code": "EUR",
        "is_need_credit_card_data": true,
        "is_need_cvc": true,
        "type": "now"
      },
      {
        "amount": "7",
        "currency_code": "GBP",
        "is_need_credit_card_data": true,
        "is_need_cvc": true,
        "type": "now"
      },
      {
        "amount": "14",
        "currency_code": "AUD",
        "is_need_credit_card_data": true,
        "is_need_cvc": true,
        "type": "now"
      },
      {
        "amount": "16",
        "currency_code": "BGN",
        "is_need_credit_card_data": true,
        "is_need_cvc": true,
        "type": "now"
      },
      {
        "amount": "43",
        "currency_code": "MYR",
        "is_need_credit_card_data": true,
        "is_need_cvc": true,
        "type": "now"
      },
      {
        "amount": "37",
        "currency_code": "PLN",
        "is_need_credit_card_data": true,
        "is_need_cvc": true,
        "type": "now"
      },
      {
        "amount": "42",
        "currency_code": "RON",
        "is_need_credit_card_data": true,
        "is_need_cvc": true,
        "type": "now"
      },
      {
        "amount": "12",
        "currency_code": "SGD",
        "is_need_credit_card_data": true,
        "is_need_cvc": true,
        "type": "now"
      },
      {
        "amount": "174",
        "currency_code": "ZAR",
        "is_need_credit_card_data": true,
        "is_need_cvc": true,
        "type": "now"
      }
    ],
    "rooms": [
      {
        "first_name": "Marty",
        "last_name": "Quatro"
      },
      {
        "first_name": "Marta",
        "last_name": "Quatro"
      }
    ],
    "status": "PENDING",
    "hotelId": "test_hotel_do_not_book",
    "hotelPayload": {
      "image": "https://cdn.worldota.net/t/{size}/content/97/4f/974f621e557fabf65a1fb3f487915044c5becba5.jpeg",
      "rating": 4,
      name: "Marriott Hotel",
      region: "Lagos, Nigeria"
    },
    "bookHash": "h-7e3536e6-2c52-5689-97f7-952a399414bd",
    "itemId": "76401240",
    "orderId": "58088363",
    "createdAt": "2024-01-30T13:09:06.231Z",
    "updatedAt": "2024-01-30T13:09:06.231Z"
  },
];