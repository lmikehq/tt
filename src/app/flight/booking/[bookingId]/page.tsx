'use client'

import Link from "@/components/atoms/link";
import Text from "@/components/atoms/text";
import ErrorPage from "@/components/molecules/errorPage/ErrorPage";
import BookingDetails from "@/components/molecules/flights/booking/BookingDetails";
import Spinner from "@/components/molecules/icons/spinner";
import SectionLayout from "@/components/templates/SectionLayout";
import Flex from "@/components/templates/flex";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import {useFlightBookingStore} from "@/lib/store/flight/booking.store";
import { ttColors } from "@/lib/theme/colors";
import {Mode} from "@/lib/types";
import { Box } from "@mui/material";
import {useEffect} from "react";
import { BsArrowRightShort } from "react-icons/bs";

const mockBooking = {
    "server_time": 1659013714,
    "pnum": 2,
    "flights": [
        {
            "id": "19ef25584b140000425e072f_0",
            "combination_trip_id": "19ef25584b140000425e072f",
            "original_trip_id": "19ef25584b140000425e072f",
            "dst": "BGY",
            "src": "VIE",
            "flight_no": "7360",
            "operating_flight_no": "7360",
            "carrier_segment_code": "7360",
            "airline": {
                "id": 11,
                "code": "FR",
                "iata_code": "FR",
                "icao_code": "RYR",
                "code_public": "FR",
                "name": "Ryanair",
                "alliance": null,
                "url": "",
                "checkin": 1,
                "close_booking_hours": 6,
                "booking_doc_needed": 1,
                "airport_checkin": 55,
                "passengers_in_search": 1,
                "doing_online_checkin": 1,
                "maximum_passengers": 9,
                "grade": "A",
                "virtual_card_req": false,
                "country": "IE",
                "carrier_type": "airline",
                "parent_carrier": null,
                "checkin_closure": 2,
                "shorter_stopovers_allowed": 1,
                "allowed_booking_window": null,
                "deprecated": false,
                "book_fee": 0,
                "fee_airline": 0,
                "search_priority": 0,
                "fee_instead": 0,
                "fee_percent": 0,
                "flight_change_fee": 50,
                "fee_reason": "",
                "threshold_child": 2,
                "threshold_teen": 12,
                "threshold_adult": 16,
                "fees_per_source": {},
                "affil_url": null,
                "temporary_disabled": null,
                "non_active_reason": "",
                "lcc": null,
                "active": 1,
                "iatacode": "FR",
                "is_passenger_cardholder": null,
                "is_private_fares_allowed": null,
                "luggage_only_during_checkin_airlines": null,
                "luggage_only_on_web": null,
                "mmb_link": "https://www.ryanair.com/gb/en/check-in?cmpid=itineraryrmail_gb_reservation_check" +
                    "in_button",
                "payment_card_copy_eticket_requirement": false,
                "skip_subairline_merge": null,
                "Name": "Ryanair",
                "iata": "FR",
                "hide_name": false
            },
            "operating_airline": {
                "iata": "FR",
                "name": "Ryanair",
                "public_code": "FR",
                "hide_name": false
            },
            "scraping_start": 0,
            "extras": "FR",
            "vehicle": {
                "type": "aircraft"
            },
            "src_terminal": null,
            "dst_terminal": null,
            "passengers_flight_check": {
                "1": {
                    "eur": 39.19,
                    "invalid": false,
                    "last_checked": 1659013714
                },
                "2": {
                    "eur": 39.19,
                    "invalid": false,
                    "last_checked": 1659013714
                }
            },
            "price": 39.19,
            "eur_children": 39.19,
            "eur_infants": 24.16,
            "eur": 39.19,
            "found_on": "",
            "invalid": 0,
            "timestamp": "2022-07-28T13:08:34.000Z",
            "refreshed": "1970-01-01T00:00:00.000Z",
            "refresh_ttl": 120,
            "refresh_period": 5,
            "fare_basis": "",
            "fare_category": "M",
            "fare_restriction": null,
            "fare_class": null,
            "baggage_fare": "",
            "source": "",
            "combination_prices": [
                {
                    "segment_included_bags": [
                        {
                            "amount": 0,
                            "concept": "pcs"
                        }
                    ],
                    "price": 39.19
                }
            ],
            "price_id": "FPGe8lWEsUAABCXgcvAgAAAAe7AAEAAAAA",
            "seats": 4,
            "source_name": "",
            "source_url": "",
            "checkin": "2022-08-15T14:30:00.000Z",
            "src_country": "AT",
            "dst_country": "IT",
            "src_station": "Vienna International Airport",
            "dst_station": "Milan Bergamo International Airport",
            "infants_conditions": {
                "trolley": false,
                "hand_weight": 0
            },
            "max_passengers_for_price": 1,
            "src_name": "Vienna",
            "dst_name": "Milan",
            "hiding_reason": null,
            "return": 0,
            "is_self_transfer": false,
            "bags_recheck_required": false,
            "bags_recheck_disclaimer": "",
            "segment_pricing": {
                "adult": {
                    "currency": "EUR",
                    "amount": "45.735",
                    "base": "39.19",
                    "service": "0",
                    "service_flat": "6.545",
                    "merchant": "0"
                },
                "child": {
                    "currency": "EUR",
                    "amount": "45.735",
                    "base": "39.19",
                    "service": "0",
                    "service_flat": "6.545",
                    "merchant": "0"
                },
                "infant": {
                    "currency": "EUR",
                    "amount": "30.705",
                    "base": "24.16",
                    "service": "0",
                    "service_flat": "6.545",
                    "merchant": "0"
                }
            },
            "local_arrival": "2022-08-16T15:50:00.000Z",
            "utc_arrival": "2022-08-16T13:50:00.000Z",
            "local_departure": "2022-08-16T14:30:00.000Z",
            "utc_departure": "2022-08-16T12:30:00.000Z"
        }
    ],
    "flights_checked": true,
    "flights_to_check": false,
    "flights_real_checked": true,
    "flights_invalid": false,
    "max_passengers": 9,
    "document_options": {
        "document_need": 1,
        "checkin_date": 1660573800,
        "airport_checkin_price": 55
    },
    "visas_agreement_requiered": true,
    "transfers": [],
    "route": [
        "VIE", "BGY"
    ],
    "book_fee": 0,
    "fee_airline": 0,
    "extra_fee": 0,
    "flights_price": 78.38,
    "passenger_change": true,
    "price_change": false,
    "total": 91.47,
    "orig_price_usage": false,
    "sp_fee": 13.09,
    "flight_real_price": 78.38,
    "one_passenger": 45.73,
    "credits_price": 91.47,
    "tickets_price": 91.47,
    "orig_price": 91.47,
    "adults_price": 45.74,
    "children_price": 45.74,
    "infants_price": 0,
    "infants_conditions": {
        "trolley": true,
        "hand_weight": 5
    },
    "sandbox": true,
    "status": "success",
    "passengers": [
        {
            "title": "mr",
            "name": "Test",
            "surname": "Test",
            "cardno": "12345",
            "expiration": 1893456000,
            "nationality": "cz",
            "birthday": "1990-01-01",
            "category": "adult",
            "bid": 257967413,
            "created_at": "2022-07-28T13:08:42.000Z",
            "updated_at": "2022-07-28T13:08:42.000Z",
            "pk": 46957217,
            "insurance_sent": null,
            "checkin": "",
            "visa": null,
            "issuer": ""
        }, {
            "title": "mr",
            "name": "Test",
            "surname": "Testus",
            "cardno": "12345",
            "expiration": 1893456000,
            "nationality": "cz",
            "birthday": "2012-01-01",
            "category": "child",
            "bid": 257967413,
            "created_at": "2022-07-28T13:08:42.000Z",
            "updated_at": "2022-07-28T13:08:42.000Z",
            "pk": 46957218,
            "insurance_sent": null,
            "checkin": "",
            "visa": null,
            "issuer": ""
        }
    ],
    "baggage": [
        {
            "id": null,
            "booking_id": null,
            "passenger_id": 0,
            "flight_id": null,
            "segment_code": "19ef25584b140000425e072f_0",
            "additional_booking_id": null,
            "bag": {
                "dimensions_sum": 85,
                "weight": 20,
                "length": 40,
                "height": 25,
                "width": 20,
                "category": "personal_item",
                "id": 8787
            },
            "index": null,
            "is_hold": false,
            "price": {
                "currency": "EUR",
                "amount": "0",
                "base": "0",
                "service": "0",
                "service_flat": "0",
                "merchant": "0"
            },
            "universal_id": "None",
            "deleted_at": null
        },
        {
            "id": null,
            "booking_id": null,
            "passenger_id": 1,
            "flight_id": null,
            "segment_code": "19ef25584b140000425e072f_0",
            "additional_booking_id": null,
            "bag": {
                "dimensions_sum": 85,
                "weight": 10,
                "length": 40,
                "height": 25,
                "width": 20,
                "category": "personal_item",
                "id": 8787
            },
            "index": null,
            "is_hold": false,
            "price": {
                "currency": "EUR",
                "amount": "0",
                "base": "0",
                "service": "0",
                "service_flat": "0",
                "merchant": "0"
            },
            "universal_id": "None",
            "deleted_at": null
        },
        {
            "id": null,
            "booking_id": null,
            "passenger_id": 1,
            "flight_id": null,
            "segment_code": "19ef25584b140000425e072f_0",
            "additional_booking_id": null,
            "bag": {
                "dimensions_sum": 85,
                "weight": 10,
                "length": 40,
                "height": 25,
                "width": 20,
                "category": "personal_item",
                "id": 8787
            },
            "index": null,
            "is_hold": false,
            "price": {
                "currency": "EUR",
                "amount": "0",
                "base": "0",
                "service": "0",
                "service_flat": "0",
                "merchant": "0"
            },
            "universal_id": "None",
            "deleted_at": null
        },
    ],
    "auth_token": "1f1ad32a-1f32-4a32-aeee-2888dfe101c3",
    "booking_id": 257967413,
    "promocode": {
        "used": false,
        "discount": 0
    },
    "transaction_id": "sandbox_257967413",
    "status_code": 200,
    "zooz_token": null,
    "eur_payment_price": 91.47
}

export default function ViewBooking({params} : {
    params: { bookingId: string }
}) {
    const { isMobile } = useScreenResolution()
    const {checkBookingDetails, bookingDetailsMode, bookingDetailsResponse} = useFlightBookingStore((state) => state);

    useEffect(() => {
        // checkBookingDetails({ bookingId: params.bookingId })
    }, [params.bookingId])

    return (
        <Box bgcolor={ttColors.primary300} padding="2rem 0 4rem">
            <SectionLayout>
                {bookingDetailsMode === Mode.loading ? (
                    <Spinner size="60px" />
                ) : bookingDetailsMode === Mode.error ? (
                        <ErrorPage text="Sorry, No booking found">
                            <Link href="/contact" style={{ display: 'flex' }}>
                                <Text type="p" size={isMobile ? 14 : 16} text="Try contacting us for help" styles={{ textDecoration: 'underline' }} />
                                <BsArrowRightShort size={24} />
                            </Link>
                        </ErrorPage>
                ) : (
                    <BookingDetails booking={mockBooking} />
                )}
            </SectionLayout>
        </Box>
    )
}