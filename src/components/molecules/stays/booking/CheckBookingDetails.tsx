'use client'

import Button from '@/components/atoms/button'
import { Divider } from '@/components/atoms/divider'
import Text from '@/components/atoms/text'
import Flex from '@/components/templates/flex'
import { Grid } from '@/components/templates/grid'
import { useQueryParams } from '@/hooks/useNext'
import { useClipboard } from '@/lib/extensions/helpers/copyToClipboard'
import { useScreenResolution } from '@/lib/extensions/hook/useScreenResolution'
import { ttColors } from '@/lib/theme/colors'
import { SingleStayCheckBookingResponse } from '@/lib/types/response-models/stay/booking.type'
import { allCaps, capCase } from '@/lib/utilFns'
import { Stack } from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'
import { BiShieldQuarter } from 'react-icons/bi'
import { GoCheckCircleFill } from 'react-icons/go'
import { HiMiniUser } from 'react-icons/hi2'
import { IoIosPricetag } from 'react-icons/io'
import { IoBed, IoCopy } from 'react-icons/io5'
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


function BookingHeader({ booking } : { booking: SingleStayCheckBookingResponse }) {
    const { isMobile } = useScreenResolution()
    const { copyToClipboard } = useClipboard()
    const { queryParams } = useQueryParams()

    const paymentComplete = booking.paymentConfirmed

    return (
        <Stack direction="column" alignItems="center" bgcolor='white' borderRadius="8px" spacing="2.8rem" padding="4rem 1.7rem 2rem" margin="0 0 3rem 0">
            <Stack direction="column" alignItems="center" spacing="1.2rem">
                {paymentComplete ? <GoCheckCircleFill size={60} color={ttColors.primaryLight} />  : <PiDotsThreeCircle size={60} color={ttColors.primaryLight} />}
                <Text type='h1' text={`Hotel Booking ${paymentComplete ? 'Successful' : 'Pending'}`} weight={700} size={isMobile ? 20 : 28} />
                <Text
                    width={isMobile ? "80%" : "65%"}
                    textAlign='center'
                    type='p'
                    text={`Your hotel booking ${queryParams?.status === 'cancelled' ? " is pending. Please complete payment to confirm your booking." : " has been successfully confirmed! Keep an eye on your email as we'll be sending you the details shortly."}`}
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
                    onClick={() => copyToClipboard(String(booking?.orderId), 'Booking ID Copied')}
                >
                    <Flex>
                        <Text type="p" text="Booking ID" />
                        <Text type="span" text={`: ${String(booking?.orderId)}`} weight={600} />
                    </Flex>
                    <IoCopy color={ttColors.primaryLight} size={20} />
                </Flex>
                <Button background={ttColors.dark} padding='0 1.5rem' width='max-content' onClick={() => window.print()}>
                    <Text type="p" text='Print Itinerary' />
                </Button>
            </Flex>

            <Grid columns={isMobile ? 2 : 5} gap={isMobile ? "1.5rem" : "1rem"} padding={isMobile ? '1.5rem 1.8rem': '1.5rem 2rem'} style={{ borderRadius: '8px', backgroundColor: ttColors.primary600 }}>
                <HeaderDetail name="BOOKING DATE" value={dayjs(booking?.createdAt).format('MMM DD, YYYY')} />
                <HeaderDetail name="CHECK-IN DATE" value={dayjs(booking?.checkInDate).format('MMM DD, YYYY')} />
                <HeaderDetail name="CHECK-OUT DATE" value={dayjs(booking?.checkOutDate).format('MMM DD, YYYY')} />
                <HeaderDetail name="PAYMENT STATUS" value={paymentComplete ? "SUCCESSFUL" : "PENDING"} />
                <HeaderDetail name="BOOKING CODE" value={booking?.partnerOrderId ?? 'PENDING'} />
            </Grid>
        </Stack>
    )
}

function HotelDetails({ booking }: { booking: SingleStayCheckBookingResponse }) {
    const { isMobile } = useScreenResolution()
    const hotel = booking.hotelPayload

    return (
        <Stack direction="column" margin="0 0 3rem 0" spacing="1rem">
            <Text type='h2' text="Hotel Details" weight={500} size={isMobile ? 16 : 18} />
            
            <Stack direction="column" bgcolor='white' borderRadius="8px" padding="1rem 2rem 3rem 1.7rem" spacing="1.5rem">
                <Flex direction='column'>
                    <Flex padding='.7rem 0 .7rem' gap=".8rem">
                        <IoBed color={ttColors.primaryLight} size={24} />
                        <Text type="p" text="Hotel Information" size={isMobile ? 16 : 18} color={ttColors.primaryLight} weight={500} />
                    </Flex>
                    <Divider direction='horizontal' px="1px" color={ttColors.lightestGray} />
                </Flex>

                <Flex direction='column'>
                    <FieldDetail name="Name" value={`${hotel.name}, ${hotel.region?.name ?? ''} ${hotel.region?.country_code ?? ''}`} />
                    <FieldDetail name="Address" value={hotel.address} />
                </Flex>
                
                {/* <Flex direction='column' gap="1rem">
                    <FieldDetail name="Email" value={hotel?.email} />
                    <FieldDetail name="Phone Number" value={hotel?.phone_number} />
                    <FieldDetail name="Hotel Amenities" value={hotel.serp_filters.map(e => capCase(e)).join(', ')} />
                </Flex> */}

            </Stack>
        </Stack>
    )
}

function PassengerDetails({ booking }: { booking: SingleStayCheckBookingResponse }) {
    const { isMobile } = useScreenResolution()
    const rooms = booking.rooms ?? []

    return (
        <Stack direction="column" bgcolor='white' borderRadius="8px" spacing="1.5rem" padding="1rem 2rem 3rem 1.7rem" margin="0 0 3rem 0">
            <Flex direction='column'>
                <Flex padding='.7rem 0 .7rem' gap=".8rem">
                    <HiMiniUser color={ttColors.primaryLight} size={24} />
                    <Text type="p" text={rooms?.length > 1 ? "Passengers" : "Passenger"} size={isMobile ? 16 : 18} color={ttColors.primaryLight} weight={500} />
                </Flex>
                <Divider direction='horizontal' px="1px" color={ttColors.lightestGray} />
            </Flex>

            {rooms?.length > 0 && rooms?.map((room, index, arr) => {
                const guestsCount = room.guests.length
                return (
                    <Flex direction='column' key={`room-${index}`}>
                        {index === 0 && <FieldDetail name="Contact Email" value={booking.userEmail} />}
                        {index === 0 && <FieldDetail name="Contact Phone" value={booking.userPhone} />}
                        <Text
                            type="p"
                            text={`Room ${index + 1}`}
                            size={isMobile ? 16 : 18}
                            weight={500}
                            margin='1.5rem 0 1rem'
                        />
                        {guestsCount > 0 && room.guests.map((guest, ind) =>
                            <FieldDetail name={`Guest ${ind + 1}`} value={`${allCaps(guest.first_name)} ${allCaps(guest.last_name)}`} key={`field-detail-${ind}`} />
                        )}
                        <FieldDetail name="No of Guests" value={guestsCount} />
                    </Flex>
                )}
            )}
            <FieldDetail name="No of Rooms" value={rooms.length} last />
        </Stack>
    )
}


function PriceDetails({ booking }: { booking: SingleStayCheckBookingResponse }) {
    const { isMobile } = useScreenResolution()
    const adultsCount = booking.rooms?.reduce((prev, curr) => [...prev, ...curr?.guests], [] as any[]).length ?? 0
    const noOfDays = dayjs(booking.checkOutDate).diff(booking.checkInDate, 'days')
    const payment = booking?.paymentOptions?.find(e => e.currency_code === 'USD') ?? booking?.paymentOptions?.find(e => e.currency_code === 'EUR') ?? (booking?.paymentOptions ?? [])[0]  

    return (
        <Stack direction="column" bgcolor='white' borderRadius="8px" spacing="1.5rem" padding="1rem 2rem 3rem 1.7rem" margin="0 0 3rem 0">
            <Flex direction='column'>
                <Flex padding='.7rem 0 .7rem' gap=".8rem">
                    <IoIosPricetag color={ttColors.primaryLight} size={24} />
                    <Text type="p" text="Price Details" size={isMobile ? 16 : 18} color={ttColors.primaryLight} weight={500} />
                </Flex>
                <Divider direction='horizontal' px="1px" color={ttColors.lightestGray} />
            </Flex>

            <Flex direction='column'>
                <Text type="p" text="Hotel Details" size={isMobile ? 16 : 18} weight={500} margin="0 0 1rem" />
                {adultsCount > 0 && <FieldDetail name={`Adults x${adultsCount}`} value={payment?.amount ?? '0'} />}
                <FieldDetail name='No of Days' value={`${noOfDays} days`} />
                <FieldDetail name="Total Fare" value={`${payment?.currency_code} ${parseFloat(payment?.amount).toFixed(2)}`} />
            </Flex>

            {/* <Flex direction='column'>
                <Text type="p" text="Special Request" size={isMobile ? 16 : 18} weight={500} margin="0 0 1rem" />
                <FieldDetail name="Late Check-out" value={`${booking?.currency_code} ${booking?.price}`} />
                <FieldDetail name="Breakfast Inclusive" value={`${booking?.currency_code} ${booking?.price}`} />
                <FieldDetail name="City View Room" value={`${booking?.currency_code} ${booking?.price}`} last />
            </Flex> */}

            <Flex justify='space-between'>
                <Text width="auto" type="p" text="Total Amount" size={isMobile ? 16 : 18} weight={500} />
                <Text width="auto" type="p" text={`${payment?.currency_code} ${parseFloat(payment?.amount).toFixed(2)}`} size={isMobile ? 16 : 18} weight={600} />
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

function CheckBookingDetails({ booking }: { booking: SingleStayCheckBookingResponse }) {
    return (
        <React.Fragment>
            <BookingHeader booking={booking} />
            <HotelDetails booking={booking} />
            <PassengerDetails booking={booking} />
            <PriceDetails booking={booking} />
            <TermsAndCancellation />
        </React.Fragment>
    )
}
export default CheckBookingDetails