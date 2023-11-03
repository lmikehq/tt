import Flex from "@components/templates/flex";
import Text from "@atom/text";
import { Divider } from "@atom/divider";
import dayjs, { Dayjs } from "dayjs";
import { styled } from "styled-components";
import { BsShare } from "react-icons/bs";
import { ttColors } from "@lib/theme/colors";
import { MdOutlineLuggage } from "react-icons/md";
import { AiOutlineShopping } from "react-icons/ai";
import Button from "@atom/button";
import Dot from "@/components/atoms/dot";
import { Box } from "@mui/material";
import FlightDepartureIcon from "./flightDepartureIcon";
import StopsPill from "./stopsPill";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { calculateTime } from "@/utils/convertTime";
import { FlightInfo } from "@/lib/types/response-models/flight/booking.type";
import React from "react";

type flightProps = {
    departureCountryCode: string;
    arrivalCountryCode: string;
    airportName1: string;
    airportName2: string;
    departureDate: dayjs.Dayjs;
    arrivalDate: dayjs.Dayjs;
    price: number;
    label: string;
    bookingToken: string;
    stops: number;
    seats: number;
    carryOn: number;
    hold: number;
    flight: FlightInfo;
    selectFlight(params: { bookingToken: string }): void;
    flightStop: string;
};

const FlightContainer = styled.div`
  box-shadow: 0px 4px 16px 0px #8dd3bb1a;
  border: 1px solid #e7e7e7;
  background: linear-gradient(0deg, #ffffff, #ffffff);
  margin: 1rem 0;
  border-radius: 12.5px;
  width: 100%;
`;

const IconBorders = styled.div`
  padding: 0.5rem 0.6rem;
  border: 1px solid ${ttColors.primary};
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  border-radius: 8px;
  gap: 0.5rem;
`;

const LabelBox = styled.div`
  padding: 0.5rem 1rem;
  background: #f3fafd;
  width: auto;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function FlightBox(props: flightProps) {
    const { isMobile } = useScreenResolution();

    function formatDate(day: Dayjs) {
        return day.format("dddd, MMMM D");
    }

    const timeDifference = (utcDeparture: string, utcArrival: string) => {
        const differenceMins = dayjs(utcArrival).diff(dayjs(utcDeparture), 'minute')
        const hoursLeft = Math.floor(differenceMins / 60)
        const minsLeft = differenceMins % 60
        return `${hoursLeft}h ${minsLeft}m`
    }

    const startRoute = props.flight.route[0]
    const endRoute = props.flight.route[props.flight.route.length - 1]

    const price = Number(props.price?.toFixed(0)).toLocaleString();

return (
    <FlightContainer>
      <Box
        sx={{
            display: isMobile ? "flex" : "grid",
            flexDirection: "column",
            width: "100%",
            gridTemplateColumns: "9fr 1fr 5fr",
        }}>

        {/* Left */}      
        <Flex direction="column" gap=".5rem" padding="1rem 1rem 2rem 1.5rem" height="100%" justify="center">
          {!!props.label && (
            <LabelBox>
              <Text type="p" text={props.label} color="#4A7181" />
            </LabelBox>
          )}
                  
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "40px 1fr",
                    alignItems: 'center'
                }}>
                <FlightDepartureIcon reverse />

                <Flex direction="column" gap="1rem" margin="0 1rem">
                    <Flex align="center" gap="5px" margin="1rem 0" styles={{ color: ttColors.lighterGray, fontWeight: "medium" }}>
                        <Text type="p" text="Depart" />
                        <Dot fontSize="5rem" />
                        <Text type="p" text={formatDate(props.departureDate)} />
                    </Flex>
                    <Flex gap="1.4rem">
                    <Text type="p" weight={"bold"} text={dayjs(startRoute.utc_departure).format("HH: mm")} />
                    <Text type="p" text={`${startRoute.operating_carrier}-${startRoute.operating_flight_no}`} />
                    <Text type="p" text={startRoute.cityFrom} />
                    </Flex>
                    <Flex align={"center"} gap="1rem">
                    <Text type="p" color={ttColors.lighterGray} text={timeDifference(startRoute.utc_departure, startRoute.utc_arrival)} />
                    <StopsPill numberOfStops={props.stops} />
                    </Flex>
                    <Flex gap="1.4rem">
                    <Text type="p" weight={"bold"} text={dayjs(startRoute.utc_arrival).format("HH: mm")} />
                    <Text type="p" text={`${startRoute.operating_carrier}-${startRoute.operating_flight_no}`} />
                    <Text type="p" text={startRoute.cityTo} />
                    </Flex>
                </Flex>
            </Box>

            {props.flightStop === 'round' &&
                <React.Fragment>
                    <Divider
                      direction="horizontal"
                      borderStyle="dotted"
                      margin="1rem 0"
                    />
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "25px 1fr",
                            alignItems: 'center'
                        }}
                    >
                    <FlightDepartureIcon />

                    <Flex direction="column" gap="1rem" margin="0 1rem">
                        <Flex align="center" gap="5px" margin="1rem 0" styles={{ color: ttColors.lighterGray, fontWeight: "medium" }}>
                            <Text type="p" text="Return" />
                            <Dot fontSize="5rem" />
                            <Text type="p" text={formatDate(props.arrivalDate)} />
                        </Flex>
                        <Flex gap="1.4rem">
                            <Text type="p" weight={"bold"} text={dayjs(endRoute.utc_departure).format("HH: mm")} />
                            <Text type="p" text={`${endRoute.operating_carrier}-${endRoute.operating_flight_no}`} />
                            <Text type="p" text={endRoute.cityFrom} />
                        </Flex>
                        <Flex align={"center"} gap="1rem">
                            <Text type="p" color={ttColors.lighterGray} text={timeDifference(endRoute.utc_departure, endRoute.utc_arrival)}/>
                            <StopsPill numberOfStops={props.stops} />
                        </Flex>
                        <Flex gap="1.4rem">
                            <Text type="p" weight={"bold"} text={dayjs(endRoute.utc_arrival).format("HH: mm")} />
                            <Text type="p" text={`${endRoute.operating_carrier}-${endRoute.operating_flight_no}`} />
                            <Text type="p" text={endRoute.cityTo} />
                        </Flex>
                        </Flex>
                    </Box>
                </React.Fragment>    
            }
        </Flex>
              

        <Divider direction="vertical" borderStyle="dotted" margin="0" style={{ width: 'max-content' }} />
              
        {/* Right */}
        <Flex
          direction="column"
          padding="2rem 2rem 2rem 0"
          justify="space-between"
            height="100%"
            gap="2rem"
        >
          <Flex align="center">
            <Flex gap=".5rem">
              <IconBorders>
                <Text
                  type="p"
                  text={props.hold.toString()}
                  weight={500}
                  size={isMobile ? 16 : 18}
                />
                <MdOutlineLuggage size={isMobile ? 25 : 30} color="#929292" />
              </IconBorders>
              <IconBorders>
                <Text
                  type="p"
                  text={props.carryOn.toString()}
                  weight={500}
                  size={isMobile ? 16 : 18}
                />
                <AiOutlineShopping size={isMobile ? 25 : 30} color="#929292" />
              </IconBorders>
            </Flex>
            {!isMobile && <BsShare size={23} />}
          </Flex>
          <Flex
            direction={isMobile ? "column-reverse" : "column"}
            gap=".5rem"
            padding={isMobile ? "2rem 0" : ""}>
            <Text
              type="h1"
              text={`${props.seats ?? 0} seat(s) left at this price`}
              weight={500}
              size={16}
              color="#929292"
            />
            <Text type="h1" text={`$ ${price}`} weight={600} size={36} />
          </Flex>

          <Button
            background="#7BBBD6"
            width="100%"
            padding="2rem 0"
            onClick={() =>
              props.selectFlight({ bookingToken: props.bookingToken })
            }>
            <Text
              type="h1"
              text="Select"
              weight={600}
              size={18}
              font="Montserrat"
            />
          </Button>
        </Flex>
              
      </Box>
    </FlightContainer>
  );
}

export default FlightBox;
