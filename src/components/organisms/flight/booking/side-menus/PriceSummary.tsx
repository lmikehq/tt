import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import { ttColors } from "@/lib/theme/colors";
import { Box } from "@mui/material";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import Image from "@/components/atoms/image";
import { GoCheckCircleFill } from "react-icons/go";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { useFlightBookingStore } from "@/lib/store/flight/booking.store";


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
    basePrice?: number;
    taxes?: number;
    serviceCharges?: number;
    discount?: number;
    departureBags?: number | boolean;
    returnBags?: number | boolean;
    countdown?: string;
}

function PriceSummary({ }: PriceSummaryProps) {
    const { isMobile } = useScreenResolution()
    const { saveBooking, checkFlightsResponse, saveBookingDetails, setSaveBookingDetails, setStep } = useFlightBookingStore((state) => state);

    const basePrice = checkFlightsResponse?.flights_price ?? 0
    const taxes = checkFlightsResponse?.extra_fee ?? 0
    const serviceCharges = checkFlightsResponse?.sp_fee ?? 0
    const bagsPrice = 0
    const totalPrice = checkFlightsResponse?.tickets_price ?? 0
    const currency = checkFlightsResponse?.currency ?? 'USD'

    const departureBags = 0
    const countdown = `0h 0m`

    return (
        <Box>
            <Flex direction="column" gap=".5rem" margin="0 0 2rem">
                <Text type="h3" weight={600} text="Price Summary" />
                <Text type="p" size={14} text="Taxes and service charges included" />
            </Flex>

            <Flex direction="column" gap=".6rem" margin="0 0 2rem">
                <Detail name="Base Fare" value={basePrice} currency={currency} />
                <Detail name="Service Charges" value={serviceCharges} currency={currency} />
                <Detail name="Checked Baggage Price" value={bagsPrice} currency={currency} />
                {/* <Detail name="Taxes and Charges" value={taxes} currency={currency} /> */}
            </Flex>

            <Flex margin="0 0 2rem">
                <Detail name={`Total (${currency})`} value={totalPrice} currency={currency} bold />
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
                <Detail name="No of Bags" value={departureBags} plain />
            </Flex>

            <Flex justify="flex-start" align="center" gap="1rem" margin="0 0 3rem">
                <TimerOutlinedIcon />
                <Text type="p" size={15} weight={600} text={`This booking will be unavailable in ${countdown}`} />
            </Flex>

            <Image
                width={isMobile ? 320 : 384}
                height={525}
                src="/assets/images/flights/baggage.png"
                alt="Baggage"
                styles={{ width: isMobile ? "100%" : "100%" }}
            />
        </Box>
    )
}

export default PriceSummary