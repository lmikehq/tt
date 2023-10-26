import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import { ttColors } from "@/lib/theme/colors";
import { Box } from "@mui/material";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import Image from "@/components/atoms/image";
import { GoCheckCircleFill } from "react-icons/go";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";


function Detail({ name, value, currency = "$", negative, bold, plain }: { name: string; value: number | string; currency?: string; negative?: boolean; bold?: boolean; plain?: boolean; }) {
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

function PriceSumary({
    basePrice = 1800.00,
    taxes = 200.00,
    serviceCharges = 135.00,
    discount = 100.00,
    departureBags = 0,
    returnBags = 0,
    countdown = "17h 40m"
}: PriceSummaryProps) {
    const { isMobile } = useScreenResolution()
    const totalPrice = (basePrice + taxes + serviceCharges + discount)

    const bagsDepart = `${departureBags === 0 ? "No" : departureBags} bags`
    const bagsReturn = `${returnBags === 0 ? "No" : returnBags} bags`

    return (
        <Box>
            <Flex direction="column" gap=".5rem" margin="0 0 2rem">
                <Text type="h3" weight={500} text="Price Summary" />
                <Text type="p" size={14} text="Taxes and service charges included" />
            </Flex>

            <Flex direction="column" gap=".6rem" margin="0 0 2rem">
                <Detail name="Base Fare" value={basePrice} />
                <Detail name="Taxes and Charges" value={taxes} />
                <Detail name="Service Charges" value={serviceCharges} />
                <Detail name="Thrillers Discount" value={discount} negative />
            </Flex>

            <Flex margin="0 0 2rem">
                <Detail name="Total (USD)" value={totalPrice} bold />
            </Flex>

            <Flex
                background={ttColors.grayishAsh}
                border={`1px solid ${ttColors.brown}`}
                borderRadius="10px"
                padding="1rem"
                gap="1rem"
                margin="0 0 2rem"
            >
                <GoCheckCircleFill color={ttColors.lighterGray} size={24} />
                <Text type="p" size={14} weight={500} text="Eligible for Flexible Travel Dates" />
            </Flex>

            <Flex direction="column" gap=".5rem" margin="0 0 2rem">
                <Text type="h3" weight={500} text="Check-In Baggage" />
                <Text type="p" size={14} text="Details on baggage needed to travel" />
            </Flex>

            <Flex direction="column" gap=".6rem" margin="0 0 3rem">
                <Detail name="Departure" value={bagsDepart} plain />
                <Detail name="Return" value={bagsReturn} plain />
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
                styles={{ width: "100%" }}
            />
        </Box>
    )
}

export default PriceSumary