import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import { ttColors } from "@/lib/theme/colors";
import { Box, Stack } from "@mui/material";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import Image from "@/components/atoms/image";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { useFlightBookingStore } from "@/lib/store/flight/booking.store";
import { useEffect, useState } from "react";
import { Definitions } from "@/lib/types/response-models/flight/check_flight.type";
import Modal from "@/components/organisms/modal";
import Button from "@/components/atoms/button";
import { BsCursor } from "react-icons/bs";


function Detail({ name, value, currency = "USD", negative, bold, plain }: { name: string; value: number | string; currency?: string; negative?: boolean; bold?: boolean; plain?: boolean; }) {
    return (
        <Flex justify="space-between" align="flex-end">
            <Text
                type="p"
                size={14}
                text={name}
                weight={bold ? 500 : 400}
                color={(bold || plain) ? ttColors.dark : ttColors.lighterGray}
            />
            <Text
                type="p"
                size={bold ? 22 : 14}
                text={`${negative ? "- " : ""}${plain ? "" : currency} ${value}`}
                weight={bold ? 600 : 400}
                color={bold ? ttColors.dark : ttColors.lighterGray}
            />
        </Flex>
    )
}

interface PriceSummaryProps {
    checkedBags: { order: { [key: number]: number[] }; definition?: Definitions }
}


function StillBookingModal({ isOpen, onClose, to }: { isOpen: boolean; onClose: VoidFunction; to?: string; }) {
    const { isMobile } = useScreenResolution()

    return (
        <Modal open={isOpen} handleClose={onClose}>
            <Stack direction='column' spacing={5} bgcolor='white' padding={6} width={isMobile ? '90vw' : '30vw'} borderRadius='16px'>
                <Text type='h2' text="Flight Booking" weight={600} size={22} />
                <Text type='h2' text="Prices and arrangements available in trips change periodically.
                Try to complete your booking within the next 15 minutes." size={15} />

                <Stack width='100%' alignItems='center' spacing={2}>
                    <Button width="100%" startIcon={<BsCursor color='white'/>} onClick={onClose}>Continue Booking</Button>
                </Stack>
            </Stack>
        </Modal>
    )
}

function PriceSummary({ checkedBags }: PriceSummaryProps) {
    const { isMobile } = useScreenResolution()
    const { saveBooking, checkFlightsResponse, saveBookingDetails, setSaveBookingDetails, setStep } = useFlightBookingStore((state) => state);
    const [countdown, setCountdown] = useState(30 * 60)
    const [isOpenModal, setIsOpenModal] = useState(false);
    
    const countMins = Math.floor(countdown / 60)
    const countSecs = (countdown % 60).toFixed(0)
    
    const basePrice = Number(checkFlightsResponse?.flights_price).toFixed(2) ?? 0
    const serviceCharges = Number(checkFlightsResponse?.sp_fee).toFixed(2) ?? 0
    const countofBags = Object.values(checkedBags.order).flat()
    const countofBagsPrices = Object.values(checkedBags.order).flat().map(e => checkFlightsResponse?.baggage?.definitions?.hold_bag[e]?.price?.amount)
    const bagsPrice = Number(countofBagsPrices.reduce((prev, curr) => Number(prev ?? 0) + Number(curr ?? 0), 0)).toFixed(2)
    const totalPrice = Number(checkFlightsResponse?.tickets_price).toFixed(2) ?? 0
    const currency = checkFlightsResponse?.currency ?? 'USD'
    
    const departureBags = countofBags.length
    
    
    useEffect(() => { 
        const interval = setInterval(() => { 
            setCountdown(prev => {
                if (prev === (15 * 60)) {
                    setIsOpenModal(true)
                }
                return prev === 0 ? (30 * 60) : prev - 1
            }); 
        }, 1000); 
        return () => clearInterval(interval); 
    }, []);


    return (
        <Box>
            <Flex direction="column" gap=".5rem" margin="0 0 2rem">
                <Text type="h3" weight={600} text="Price Summary" />
                <Text type="p" size={14} text="Taxes and service charges included" />
            </Flex>

            <Flex direction="column" gap=".6rem" margin="0 0 2rem">
                <Detail name="Base Fare" value={basePrice} currency={currency} />
                <Detail name="Service Charges" value={serviceCharges} currency={currency} />
                {countofBags.length > 0 &&
                    <Detail name={`${countofBags.length}x Checked Baggage`} value={bagsPrice} currency={currency} />
                }
            </Flex>

            <Flex margin="0 0 2rem">
                <Detail name='Total Fee' value={totalPrice} currency={currency} bold />
            </Flex>

            {/* <Flex
                background={ttColors.grayishAsh}
                border={`1px solid ${ttColors.brown}`}
                borderRadius="10px"
                padding="1rem"
                gap="1rem"
                margin="0 0 2rem"
            >
                <GoCheckCircleFill color={ttColors.lighterGray} size={24} />
                <Text type="p" size={14} weight={500} text="Eligible for Flexible Travel Dates" />
            </Flex> */}

            <Flex direction="column" gap=".5rem" margin="0 0 2rem">
                <Text type="h3" weight={600} text="Check-In Baggage" />
                <Text type="p" size={14} text="Details on baggage needed to travel" />
            </Flex>

            <Flex direction="column" gap=".6rem" margin="0 0 3rem">
                <Detail name="Bags" value={departureBags} plain />
            </Flex>

            <Flex justify="flex-start" align="center" gap="1rem" margin="0 0 3rem">
                <TimerOutlinedIcon />
                <Text type="p" size={15} weight={600} text={`This booking will be unavailable in ${countMins}m ${countSecs}s`} />
            </Flex>

            <Image
                width={isMobile ? 320 : 384}
                height={525}
                src="/assets/images/flights/baggage.png"
                alt="Baggage"
                styles={{ width: isMobile ? "100%" : "100%" }}
            />

            <StillBookingModal
                isOpen={isOpenModal}
                onClose={() => setIsOpenModal(false)}
            />
        </Box>
    )
}

export default PriceSummary