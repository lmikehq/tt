'use client'

import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import { ttColors } from "@/lib/theme/colors";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import { BiTransferAlt } from "react-icons/bi";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { Flight } from "@/lib/types/response-models/flight/check_flight.type";
import { formatDate } from "@/lib/utilFns";
import dayjs from "dayjs";
import { Box } from "@mui/material";
import { FlightContext } from "@/lib/extensions/context";
import { useContext } from "react";


interface TripSummaryDetailsProps {
    flights: Flight[]
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
        <Text text={text} type="p" size={isMobile ? 13 : 13} />
    )
}

function TransferDuration({ duration, location }: { duration: string; location: string; }) {
    const { isMobile } = useScreenResolution()
    return (
        <Flex padding={isMobile ? "3rem 0rem 3rem" : "3rem 0rem 3rem"} gap={isMobile ? ".5rem" : "1rem"}>
            <BiTransferAlt size={30} />
            <Flex gap="0.25rem" align="flex-start" direction="column">
                <Text type="p" weight={600} size={15} text={`Transfer Duration: ${duration}`} />
                <Text type="p" size={isMobile ? 13 : 15} text={`Transfer in ${location}`} />
            </Flex>
        </Flex>
    )
}

function AirportLocation({
    datetime,
    airport,
    location,
    shortLocation,
    order,
}: { datetime: string, airport: string; location: string; shortLocation: string; order: number; }) {
    const { isMobile } = useScreenResolution()
    const date = formatDate(dayjs(datetime), 'ddd, DD MMM')
    const time = formatDate(dayjs(datetime), 'HH: mm')
    
    return (
        <Flex direction="column" gap=".5rem" width={isMobile ? "46%" : "30%"} styles={{ order }}>
            <Flex gap={isMobile ? ".5rem" : "1rem"}>
                <Text type="p" text={time} size={16} weight={600} />
                <Text type="p" text={shortLocation} size={16} weight={600} />
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
    logo,
    order,
    width,
    margin,
}: { time: string; airline: string; logo: string; order: number; width: string; margin: string; }) {
    const { isMobile } = useScreenResolution()
    
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
                        width: isMobile ? "45px" : "55px",
                        height: isMobile ? "45px" : "50px",
                        border: `1px solid ${ttColors.lightestGray}`,
                        borderRadius: "50px",
                        backgroundColor: 'white',
                        backgroundImage: `url(${logo})`,
                    }}
                />
                <LineText text={airline} />
            </Flex>
        </Flex>
    )
}

function OneTrip({ index, chain, last, flight, nextFlight }: { index: number; chain: boolean; last: boolean; flight: Flight; nextFlight?: Flight; }) {
    const { isMobile } = useScreenResolution()
    const flightContext = useContext(FlightContext)
    const flightState = flightContext?.state

    const arrivalMins = dayjs(flight?.utc_arrival).diff(dayjs(flight?.utc_departure), 'minute')
    const arrivalHoursLeft = Math.floor(arrivalMins / 60)
    const arrivalMinsLeft = arrivalMins % 60

    const layoverMins = nextFlight ? dayjs(nextFlight?.utc_departure).diff(dayjs(flight?.utc_arrival), 'minute') : 0
    const layoverHoursLeft = Math.floor(layoverMins / 60)
    const layoverMinsLeft = layoverMins % 60

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
                    minHeight={isMobile ? "430px" : "270px"}
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
                        datetime={flight?.utc_departure}
                        shortLocation={flight?.src_country}
                        airport={flight?.src_station}
                        location={`${flight?.src_name} (${flight?.src_country})`}
                        order={1}
                    />
                    <TimeOfFlight
                        time={`${arrivalHoursLeft}h ${arrivalMinsLeft}m`}
                        airline={`${flight?.airline.name}, ${flight?.airline.code_public}${flight?.flight_no}`}
                        logo={flightState?.airlines[flight?.airline.iata_code]?.logo ?? ""}
                        order={isMobile ? 3 : 2}
                        width={isMobile ? "100%" : "30%"}
                        margin={isMobile ? "2.5rem 0 0" : "0"}
                    />
                    <AirportLocation
                        datetime={flight?.utc_arrival}
                        shortLocation={flight?.dst_country}
                        airport={flight?.dst_station}
                        location={`${flight?.dst_name} (${flight?.dst_country})`}
                        order={isMobile ? 2 : 3}
                    />
                </Flex>

                {!last &&
                    <TransferDuration
                        duration={`${layoverHoursLeft}h ${layoverMinsLeft}m`}
                        location={flight?.dst_name}
                    />
                }
            </Box>
        </Flex>
    )
}

function TripSummaryDetails({ flights = [] }: TripSummaryDetailsProps) {
    const { isMobile } = useScreenResolution()

    return (
        <Box bgcolor={ttColors.ghostWhite} padding={isMobile ? "3rem 2rem 4rem 2px" : "2rem"}>
            {flights.map((e, index, arr) => 
                <OneTrip
                    key={`flight-stop ${index}`}
                    index={index}
                    chain={flights.length > 1}
                    last={(index + 1) === arr.length}
                    flight={e}
                    nextFlight={arr[index + 1]}
                />
            )}
        </Box>
    )
}

export default TripSummaryDetails
