'use client'

import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import { ttColors } from "@/lib/theme/colors";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import { Box } from "@mui/material";
import { BiTransferAlt } from "react-icons/bi";
import { FlightStopType } from "../flight/booking/steps/TripSummary";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";


interface TripSummaryDetailsProps {
    flightStops?: FlightStopType[]
}


const Dot = ({ size = 14, color, top, bottom }: { size?: number; color?: string; top?: string; bottom?: string }) => (
    <Box
        width={`${size}px`}
        height="14px"
        borderRadius="50%"
        border={`1px solid ${ttColors.lighterGray}`}
        bgcolor={color ?? 'white'}
        position="absolute"
        right={`-${size / 2}px`}
        top={top}
        bottom={bottom}
    />
)

function LineText({ text }: { text: string }) {
    const { isMobile } = useScreenResolution()
    return (
        <Text text={text} type="p" size={isMobile ? 13 : 14} />
    )
}

function TransferDuration({ duration, state, isMobile }: { duration: string; state: string; isMobile: boolean; }) {
    return (
        <Flex padding={isMobile ? "3rem 0rem 3rem" : "3rem 0rem 3rem"} gap={isMobile ? ".5rem" : "1rem"}>
            <BiTransferAlt size={30} />
            <Flex gap="0.25rem" align="flex-start" direction="column">
                <Text type="p" weight={600} size={15} text={`Transfer Duration: ${duration}`} />
                <Text type="p" size={isMobile ? 13 : 15} text={`Transfer in ${state}`} />
            </Flex>
        </Flex>
    )
}

function AirportLocation({
    time,
    date,
    airport,
    location,
    order,
    isMobile
}: { time: string, date: string; airport: string; location: string; order: number; isMobile: boolean }) {
    const shortLoc = String(location).slice(0, 3).toUpperCase()
    return (
        <Flex direction="column" gap=".5rem" width={isMobile ? "46%" : "30%"} styles={{ order }}>
            <Flex gap={isMobile ? ".5rem" : "1rem"}>
                <Text type="p" text={time} size={16} weight={600} />
                <Text type="p" text={shortLoc} size={16} weight={600} />
            </Flex>
            <LineText text={date} />
            <LineText text={airport} />
            <LineText text={location} />
        </Flex>
    );
}

function TimeOfFlight({
    time,
    airline,
    order,
    width,
    margin,
    isMobile
}: { time: string; airline: string; order: number; width: string; margin: string; isMobile: boolean; }) {
    return (
        <Flex direction="column" styles={{ order, width, margin }}>
            <Flex gap={isMobile ? ".75rem" : "1rem"} align="center" margin="0 0 0.5rem 0">
                <TimerOutlinedIcon />
                <Text type="p" weight="bold" text={time} />
            </Flex>

            <Flex gap=".6rem" align="center" width="96%">
                <Box
                    style={{
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        width: "30px",
                        height: "30px",
                        border: `1px solid ${ttColors.lightestGray}`,
                        borderRadius: "50px",
                        backgroundImage: "url('/assets/images/flights/EgyptAirLogo.jpg')",
                    }}
                />
                <LineText text={airline} />
            </Flex>
        </Flex>
    )
}

function OneTrip({ index, chain, last, flight }: { index: number; chain: boolean; last: boolean; flight: FlightStopType }) {
    const { isMobile } = useScreenResolution()
    
    return (
        <Flex height="max-content">
            {chain && (last ? 
                <Box
                    height="5px"
                    width="2px"
                    bgcolor={ttColors.lightestGray}
                    marginRight={isMobile ? "35px" : "40px"}
                    position="relative"
                >
                    <Dot bottom="-10px" />
                </Box> : 
                <Box
                    height="100%"
                    minHeight={isMobile ? "390px" : "270px"}
                    width="2px"
                    bgcolor={ttColors.lightestGray}
                    marginRight={isMobile ? "35px" : "40px"}
                    position="relative"
                >
                    <Dot top="0px" />
                    {index !== 5 && <Dot bottom={isMobile ? "90px" : "90px"} color={ttColors.red} />}
                </Box>
                )
            }
            <Box width="100%">
                <Flex justify="space-between" wrap="wrap">
                    <AirportLocation
                        time={flight.departure.time}
                        date={flight.departure.date}
                        airport={flight.departure.airport}
                        location={flight.departure.location}
                        isMobile={isMobile}
                        order={1}
                    />
                    <TimeOfFlight
                        time="6h 35'"
                        airline="EgyptAir Airlines KL588"
                        order={isMobile ? 3 : 2}
                        width={isMobile ? "100%" : "30%"}
                        margin={isMobile ? "2.5rem 0 0" : "0"}
                        isMobile={isMobile}
                    />
                    <AirportLocation
                        time={flight.arrival.time}
                        date={flight.arrival.date}
                        airport={flight.arrival.airport}
                        location={flight.arrival.location}
                        isMobile={isMobile}
                        order={isMobile ? 2 : 3}
                    />
                </Flex>

                {!last &&
                    <TransferDuration
                        duration="6h 35'"
                        state="Amsterdam"
                        isMobile={isMobile}
                    />
                }
            </Box>
        </Flex>
    )
}

export default function TripSummaryDetails({ flightStops = [] }: TripSummaryDetailsProps) {
    const { isMobile } = useScreenResolution()

    return (
        <Box bgcolor={ttColors.ghostWhite} padding={isMobile ? "2rem 2rem 2rem 2px" : "2rem"}>
            {flightStops.map((e, index, arr) => 
                <OneTrip
                    key={`flight-stop ${index}`}
                    index={index}
                    chain={flightStops.length > 1}
                    last={(index + 1) === arr.length}
                    flight={e}
                />
            )}
        </Box>
    )
}
