'use client'

import Button from '@/components/atoms/button'
import { Divider } from '@/components/atoms/divider'
import Text from '@/components/atoms/text'
import Flex from '@/components/templates/flex'
import { Grid } from '@/components/templates/grid'
import { FlightContext } from '@/lib/extensions/context'
import { useClipboard } from '@/lib/extensions/helpers/copyToClipboard'
import { formatPrice } from '@/lib/extensions/helpers/formatPrice'
import { useScreenResolution } from '@/lib/extensions/hook/useScreenResolution'
import { useUserPreferencesStore } from '@/lib/store/preferences.store'
import { ttColors } from '@/lib/theme/colors'
import { FlightCabins, FlightInterface, GetFlightBookingByIdResponse } from '@/lib/types/response-models/flight/booking.type'
import { allCaps, capCase } from '@/lib/utilFns'
import { Box, Stack } from '@mui/material'
import dayjs from 'dayjs'
import React, { useContext, useMemo } from 'react'
import { BiShieldQuarter, BiSolidPlaneTakeOff } from 'react-icons/bi'
import { BsCreditCardFill, BsFillHandbagFill } from 'react-icons/bs'
import { GoCheckCircleFill } from 'react-icons/go'
import { HiMiniUser } from 'react-icons/hi2'
import { IoCopy } from 'react-icons/io5'
import { PiDotsThreeCircle } from 'react-icons/pi'
var advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)


function HeaderDetail({ name, value }: { name: string; value: string | number; }) {
    const { isMobile } = useScreenResolution()

    return (
        <Stack direction="column" alignItems="flex-start" spacing=".4rem">
            <Text type="p" text={name} size={13} color='white' styles={{ textTransform: 'uppercase' }} />
            <Text type="p" text={String(value ?? '')} size={isMobile ? 14 : 16} color='white' weight={600} styles={{ textTransform: 'uppercase' }} />
        </Stack>
    )
}

function FieldDetail({ name, value, last }: { name: string; value?: string | number; last?: boolean }) {
    const { isMobile } = useScreenResolution()

    return (
        <Flex justify="space-between" borderBottom={last ? '' : `1px solid ${ttColors.lightestGray}`} padding='1.7rem 0'>
            <Text type="p" text={name} size={isMobile ? 14 : 14} color={ttColors.blackLight} styles={{ minWidth: isMobile ? "25%" : ''}} />
            <Text type="p" text={String(value ?? '')} size={isMobile ? 14 : 14} weight={600} />
        </Flex>
    )
}

function FlightDetail({ departure, arrival, last, stops }: {
    flight?: FlightInterface;
    departure: {
        cabin: string;
        utc_departure: string;
        src: string;
        src_name: string;
        src_station: string;
        airlineIata: string;
    };
    arrival: {
        cabin: string;
        utc_arrival: string;
        dst: string;
        dst_name: string;
        dst_station: string;
        airlineIata: string;
    };
    last?: boolean;
    stops: number
}) {
    const { isMobile } = useScreenResolution()
    const flightContext = useContext(FlightContext)
    const flightState = flightContext?.state
    const departureTime = dayjs(departure.utc_departure).format("HH:mm")
    const arrivalTime = dayjs(arrival.utc_arrival).format("HH:mm")
    const duration = (utcDeparture: string, utcArrival: string) => {
        const differenceMins = dayjs(utcArrival).diff(dayjs(utcDeparture), 'minute')
        const hoursLeft = Math.floor(differenceMins / 60)
        const minsLeft = differenceMins % 60
        return `${hoursLeft}h ${minsLeft}m`
    }
    const cabin = FlightCabins[departure.cabin]

    return (
        <Grid gap={isMobile ? "1.5rem" : "1rem"} columns={5} padding='1.3rem 0' style={{ gridTemplateColumns: isMobile ? "1fr 1fr" : '.3fr 1fr .5fr 1fr .3fr', borderBottom: last ? '' : `1px solid ${ttColors.lightestGray}` }}>
            {!isMobile &&
                <Flex>
                    <img
                        src={flightState?.airlines[departure.airlineIata]?.logo}
                        alt={`airline-${flightState?.airlines[departure.airlineIata]?.Airline}`}
                        width={isMobile ? "50px" : "60px"}
                        height={isMobile ? "50px" : "60px"}
                        style={{ borderRadius: '50%', border: `1px solid ${ttColors.lightestGray}` }}
                    />
                </Flex>
            }
            <Flex direction='column' gap=".4rem">
                <Flex gap=".5rem">
                    <Text type="p" text={departureTime} size={isMobile ? 15 : 16} weight={600} />
                    <Text type="p" text={`(${departure.src})`} size={isMobile ? 15 : 16} color={ttColors.foundation.gray} />
                </Flex>
                <Text type="p" text={departure.src_name} size={isMobile ? 14 : 14} />
                <Text type="p" text={departure.src_station} size={isMobile ? 14 : 14} color={ttColors.foundation.gray} />
            </Flex>
            {!isMobile &&
                <Flex direction='column' align='center' justify='center' gap="0rem" padding='0 2rem 0 0'>
                    <Text type="p" text={duration(departure.utc_departure, arrival.utc_arrival)} size={isMobile ? 14 : 14} color={ttColors.foundation.gray} />
                    <Flex align='center'>
                        <Box width="12px" height="10px" borderRadius="50%" border={`1px solid ${ttColors.foundation.black}`} bgcolor='white'></Box>
                        <Flex borderBottom={`1px solid ${ttColors.lightestGray}`}></Flex>
                        <Box width="12px" height="10px" borderRadius="50%" border={`1px solid ${ttColors.foundation.black}`} bgcolor='white'></Box>
                    </Flex>
                    {stops > 0 && <Text type="p" text={`${stops} ${stops > 1 ? "stops" : "stop"}`} size={isMobile ? 14 : 14} color={ttColors.foundation.gray} />}
                </Flex>
            }
            <Flex direction='column' gap=".4rem">
                <Flex gap=".5rem">
                    <Text type="p" text={arrivalTime} size={isMobile ? 15 : 16} weight={600} />
                    <Text type="p" text={`(${arrival.dst})`} size={isMobile ? 15 : 16} color={ttColors.foundation.gray} />
                </Flex>
                <Text type="p" text={arrival.dst_name} size={isMobile ? 14 : 14} />
                <Text type="p" text={arrival.dst_station} size={isMobile ? 14 : 14} color={ttColors.foundation.gray} />
            </Flex>
            {isMobile &&
                <Flex>
                    <img
                        src={flightState?.airlines[departure.airlineIata]?.logo}
                        alt={`airline-${flightState?.airlines[departure.airlineIata]?.Airline}`}
                        width={isMobile ? "50px" : "60px"}
                        height={isMobile ? "50px" : "60px"}
                        style={{ borderRadius: '50%', border: `1px solid ${ttColors.lightestGray}` }}
                    />
                </Flex>
            }
            <Flex direction='column' gap=".4rem">
                <Text type="p" text={cabin} size={isMobile ? 14 : 14} color={ttColors.foundation.gray} />
                <Text type="p" text={duration(departure.utc_departure, arrival.utc_arrival)} size={isMobile ? 15 : 16} weight={600} />
            </Flex>
        </Grid>
    )
}

function BookingHeader({ booking } : { booking: GetFlightBookingByIdResponse }) {
    const { isMobile } = useScreenResolution()
    const { copyToClipboard } = useClipboard()

    // const bookingComplete = booking?.status !== 'IN_PROGRESS'
    const paymentComplete = booking?.hasCompletedPayment

    return (
        <Stack direction="column" alignItems="center" bgcolor='white' borderRadius="8px" spacing="2.8rem" padding="4rem 1.7rem 2rem" margin="0 0 3rem 0">
            <Stack direction="column" alignItems="center" spacing="1.2rem">
                {paymentComplete ? <GoCheckCircleFill size={60} color={ttColors.primaryLight} />  : <PiDotsThreeCircle size={60} color={ttColors.primaryLight} />}
                <Text type='h1' text='Booking Flight Successful' weight={700} size={isMobile ? 20 : 28} />
                <Text
                    width={isMobile ? "80%" : "60%"}
                    textAlign='center'
                    type='p'
                    text="Your flight booking has been successfully confirmed! Keep an eye on your email as we'll be sending you the details shortly."
                    size={isMobile ? 15 : 16}
                />
            </Stack>

            <Flex direction={isMobile ? "column": "row"} justify='center' align="center" gap="1rem">
                <Flex
                    width='max-content'
                    border={`2px dotted ${ttColors.primary600}`}
                    borderRadius='4px'
                    padding='.5rem 1rem'
                    gap="1rem"
                    cursor='pointer'
                    align='center'
                    onClick={() => copyToClipboard(String(booking?.bookingId), 'Booking ID Copied')}
                >
                    <Flex>
                        <Text type="p" text="Booking ID" />
                        <Text type="span" text={`: ${String(booking?.bookingId)}`} weight={600} />
                    </Flex>
                    <IoCopy color={ttColors.primaryLight} size={20} />
                </Flex>
                <Button background={ttColors.dark} padding='0 1.5rem' width='max-content' onClick={() => window.print()}>
                    <Text type="p" text='Print Itinerary' />
                </Button>
            </Flex>

            <Grid columns={isMobile ? 2 : 5} gap={isMobile ? "1.5rem" : "1rem"} padding={isMobile ? '1.5rem 1.8rem': '1.5rem 2rem'} style={{ borderRadius: '8px', backgroundColor: ttColors.primary600 }}>
                <HeaderDetail name="BOOKING ID" value={booking?.bookingId} />
                <HeaderDetail name={booking?.pnr ? "PNR" : "PNR STATUS"} value={booking?.pnr ? booking?.pnr?.segments[0]?.pnr : booking?.pnrStatus} />
                <HeaderDetail name="BOOKING DATE" value={dayjs(booking?.createdAt).format('MMM DD, YYYY')} />
                <HeaderDetail name="FLIGHT NUMBER" value={`${booking?.airlineIata} ${booking?.flightNum}`} />
                {/* <HeaderDetail name="SEAT NUMBER" value={booking?.seatId[0] ?? ''} /> */}
                <HeaderDetail name="PAYMENT STATUS:" value={paymentComplete ? "SUCCESSFUL" : "PENDING"} />
            </Grid>
        </Stack>
    )
}

function FlightDetails({ booking }: { booking: GetFlightBookingByIdResponse }) {
    const { isMobile } = useScreenResolution()
    
    const sortedHandBaggage = useMemo(() => booking?.baggageInfo?.filter(e => !e.is_hold).reduce((prev, curr) => {
        if (prev[curr.bag.weight]) {
            return ({ ...prev, [curr.bag.weight]: [...prev[curr.bag.weight], 'one']})
        } else {
            return ({ ...prev, [curr.bag.weight]: ['one'] })
        }
    }, {} as { [k: number]: string[] }), [booking?.baggageInfo])

    const sortedHoldBaggage = useMemo(() => booking?.baggageInfo?.filter(e => e.is_hold).reduce((prev, curr) => {
        if (prev[curr.bag.weight]) {
            return ({ ...prev, [curr.bag.weight]: [...prev[curr.bag.weight], 'one']})
        } else {
            return ({ ...prev, [curr.bag.weight]: ['one'] })
        }
    }, {} as { [k: number]: string[] }), [booking?.baggageInfo])

    const handBagCount = Object.values(sortedHandBaggage ?? {}).length
    const holdBagCount = Object.values(sortedHoldBaggage ?? {}).length

    const handBaggageText = Object.values(sortedHandBaggage ?? {}).length === 0 ? 'No Hand Baggage' : Object.keys(sortedHandBaggage ?? {}).map(e => `${e}kg(${sortedHandBaggage[Number(e)].length})`).join(', ')
    const holdBaggageText = Object.values(sortedHoldBaggage ?? {}).length === 0 ? 'No Hold Baggage' : Object.keys(sortedHoldBaggage ?? {}).map(e => `${e}kg(${sortedHoldBaggage[Number(e)].length})`).join(', ')


    return (
        <Stack direction="column" margin="0 0 3rem 0" spacing="1rem">
            <Text type='h2' text="Flight Details" weight={500} size={isMobile ? 16: 18} />
            <Stack direction="column" bgcolor='white' borderRadius="8px" padding="1rem 2rem 3rem 1.7rem" spacing="1.5rem">
                <Flex direction='column'>
                    <Flex padding='.7rem 0 .7rem' gap=".8rem">
                        <BiSolidPlaneTakeOff color={ttColors.primaryLight} size={24} />
                        <Text type="p" text={`Depart: ${booking?.src} - ${booking?.dst}`} size={isMobile ? 16 : 18} color={ttColors.primaryLight} weight={500} />
                    </Flex>
                    <Divider direction='horizontal' px="1px" color={ttColors.lightestGray} />
                </Flex>

                <Flex justify='space-between' direction={isMobile ? "column" : "row"}>
                    <Text width={isMobile ? "100%" : "20%"} type="p" text={dayjs(booking?.departureTime).format('MMM Do, YYYY')} size={isMobile ? 14 : 14} weight={isMobile ? 500 : 400} />
                    <Flex direction='column' gap="1rem">
                        <FlightDetail
                            departure={{
                                cabin: booking?.flightCategory,
                                utc_departure: booking?.departureTime,
                                src: booking?.src,
                                src_name: booking?.takeOffLocation,
                                src_station: booking?.takeOffAirport,
                                airlineIata: booking?.airlineIata
                            }}
                            arrival={{
                                cabin: booking?.flightCategory,
                                utc_arrival: booking?.arrivalTime,
                                dst: booking?.dst,
                                dst_name: booking?.destinationLocation,
                                dst_station: booking?.destinationAirport,
                                airlineIata: booking?.airlineIata
                            }}
                            stops={booking?.numOfStopovers}
                            last
                        />
                        <Flex padding=".8rem 1rem" gap=".8rem" borderRadius='4px' background={ttColors.primary300} justify='flex-start' align="center">
                            <BsFillHandbagFill size={18} />
                            <Text
                                type="p"
                                text={`${handBagCount > 0 ? `Hand Baggage ${handBaggageText}` : handBaggageText} . ${holdBagCount > 0 ? `Hold Baggage ${holdBaggageText}` : holdBaggageText}`}
                                size={isMobile ? 14 : 15}
                            />
                        </Flex>
                    </Flex>
                </Flex>

            </Stack>
        </Stack>
    )
}

function PassengerDetails({ booking }: { booking: GetFlightBookingByIdResponse }) {
    const { isMobile } = useScreenResolution()
    return (
        <Stack direction="column" bgcolor='white' borderRadius="8px" spacing="1.5rem" padding="1rem 2rem 3rem 1.7rem" margin="0 0 3rem 0">
            <Flex direction='column'>
                <Flex padding='.7rem 0 .7rem' gap=".8rem">
                    <HiMiniUser color={ttColors.primaryLight} size={24} />
                    <Text type="p" text={booking?.passengerInfo?.length > 1 ? "Passengers" : "Passenger"} size={isMobile ? 16 : 18} color={ttColors.primaryLight} weight={500} />
                </Flex>
                <Divider direction='horizontal' px="1px" color={ttColors.lightestGray} />
            </Flex>

            {booking?.passengerInfo?.length > 0 &&
                booking?.passengerInfo?.map((passenger, index) =>
                <Flex direction='column' key={`passenger-${index}`}>
                    <Text type="p"
                        text={`${allCaps(passenger.title)} ${allCaps(passenger.name)} ${allCaps(passenger.surname)} (${capCase(passenger.category)}${index === 0 ? " - Lead" : ""})`}
                        size={isMobile ? 16 : 18}
                        weight={500}
                    />
                    <FieldDetail name="Email" value={booking?.passengerDetails ? booking?.passengerDetails[index]?.email : ''} />
                    <FieldDetail name="Phone Number" value={booking?.passengerDetails ? booking?.passengerDetails[index]?.phoneNumber : ''} />
                    <FieldDetail name="Seat Details" value={booking?.seatId[index]} last />
                    {/* <FieldDetail name="Extra Baggage" value={""} last/> */}
                </Flex>    
            )}
        </Stack>
    )
}

function PriceDetails({ booking }: { booking: GetFlightBookingByIdResponse }) {
    const { isMobile } = useScreenResolution()
    const { preFerredCurrency, conversionRate } = useUserPreferencesStore((state) => state);

    const adultsCount = booking?.passengerInfo?.filter(e => e?.category === 'adult').length
    const childrenCount = booking?.passengerInfo?.filter(e => e?.category === 'child').length
    const infantsCount = booking?.passengerInfo?.filter(e => e?.category === 'infant').length

    const calcPrice = (price: string | number = 0) => {
        return formatPrice({
            total: Number(price) * conversionRate,
            currency: preFerredCurrency,
        })
    }    

    return (
        <Stack direction="column" bgcolor='white' borderRadius="8px" spacing="1.5rem" padding="1rem 2rem 3rem 1.7rem" margin="0 0 3rem 0">
            <Flex direction='column'>
                <Flex padding='.7rem 0 .7rem' gap=".8rem">
                    <BsCreditCardFill color={ttColors.primaryLight} size={24} />
                    <Text type="p" text="Price Details" size={isMobile ? 16 : 18} color={ttColors.primaryLight} weight={500} />
                </Flex>
                <Divider direction='horizontal' px="1px" color={ttColors.lightestGray} />
            </Flex>

            <Flex direction='column'>
                <Text type="p" text="Ticket Details" size={isMobile ? 16 : 18} weight={500} margin="0 0 1rem" />
                {adultsCount > 0 && <FieldDetail name={`Adults x${adultsCount}`} value={calcPrice(booking?.pricing?.adult?.amount ?? 0)} />}
                {childrenCount > 0 && <FieldDetail name={`Children x${childrenCount}`} value={calcPrice(booking?.pricing?.child?.amount ?? 0)} />}
                {infantsCount > 0 && <FieldDetail name={`Infants x${infantsCount}`} value={calcPrice(booking?.pricing?.infant?.amount ?? 0)} />}
                <FieldDetail name="Total Fare" value={calcPrice(booking?.ticketPrice)} />
                <FieldDetail name="Service Charge" value={calcPrice(booking?.sp_fee)} />
            </Flex>

            <Flex direction='column'>
                <Text type="p" text="Flight Add-On" size={isMobile ? 16 : 18} weight={500} margin="0 0 1rem" />
                <FieldDetail name="SMS Reminder" value={calcPrice(0)} />
                <FieldDetail name="Call Reminder" value={calcPrice(0)} />
                <FieldDetail name="Ticket Details via SMS and WhatsApp" value={calcPrice(0)} last />
            </Flex>

            <Flex justify='space-between'>
                <Text width="auto" type="p" text="Total Amount" size={isMobile ? 16 : 18} weight={500} />
                <Text width="auto" type="p" text={calcPrice(booking?.totalAmount)} size={isMobile ? 16 : 18} weight={600} />
            </Flex>
        </Stack>
    )
}

function TermsAndCancellation() {
    const { isMobile } = useScreenResolution()

    return (
        <Stack direction="column" bgcolor='white' borderRadius="8px" spacing="1rem" padding="1rem 1.7rem 2.5rem">
            <Flex direction='column'>
                <Flex padding='.6rem 0 .5rem' gap=".8rem">
                    <BiShieldQuarter color={ttColors.primaryLight} size={24} />
                    <Text type="p" text="Terms and Cancellation Policy" size={isMobile ? 16 : 18} color={ttColors.primaryLight} weight={500} />
                </Flex>
                <Divider direction='horizontal' px="1px" color={ttColors.lightestGray} />
            </Flex>

            <Text
                type="p"
                text="Your booking with Thrillers Travels is confirmed upon full payment. Cancellations made 14 days or more before the travel date are eligible for a full refund, less any applicable administrative fees. For cancellations within 7 to 13 days of the travel date, a specified cancellation fee will be assessed. Cancellations within 6 days or less, as well as no-shows and early check-outs, are non-refundable. Changes to bookings, including date changes or room category upgrades, are subject to availability and may incur additional charges, which will be communicated to you in advance. We strongly recommend travelers to secure comprehensive travel insurance to safeguard against unexpected events that may disrupt your travel plans. Please note that Thrillers Travels is not responsible for any loss, damage, or injury incurred during your trip, and we advise all travelers to take appropriate precautions and adhere to local laws and customs. Additionally, force majeure events, such as natural disasters or political unrest, may impact travel plans, and Thrillers Travels will not be liable for changes or cancellations arising from such circumstances. By booking with us, you agree to these terms and conditions. We look forward to providing you with a memorable travel experience, and we wish you safe and enjoyable travels!"
                size={isMobile ? 14 : 15}
            />
        </Stack>
    )
}

function BookingDetails({ booking }: { booking: GetFlightBookingByIdResponse }) {
    return (
        <React.Fragment>
            <BookingHeader booking={booking} />
            <FlightDetails booking={booking} />
            <PassengerDetails booking={booking} />
            <PriceDetails booking={booking} />
            <TermsAndCancellation />
        </React.Fragment>
    )
}
export default BookingDetails