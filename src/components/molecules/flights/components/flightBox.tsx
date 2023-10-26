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
  seats:number;
  carryOn:number;
  hold:number;
  selectFlight(params: { bookingToken: string }): void;
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
  padding: 0.75rem;
  height: 4em;
  border: 2px solid ${ttColors.primary};
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  border-radius: 8px;
  gap: 0.5rem;
`;

const LabelBox = styled.div`
  padding: 0.5rem;
  background: #f3fafd;
  width: 20%;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function FlightBox(props: flightProps) {
  const { isMobile } = useScreenResolution();
  function getRandomNumber() {
    return Math.floor(Math.random() * 5) + 1;
  }

  function formatDate(day: Dayjs) {
    return day.format("dddd, MMMM D");
  }

  const randomHourDeparture = Math.floor(Math.random() * 24);
  const randomMinuteDeparture = Math.floor(Math.random() * 60);

  const randomHourArrival = Math.floor(Math.random() * 24);
  const randomMinuteArrival = Math.floor(Math.random() * 60);

  const departureTime = dayjs()
    .add(randomHourDeparture, "hour")
    .add(randomMinuteDeparture, "minute");
  const arrivalTime = dayjs()
    .add(1, "day")
    .add(randomHourDeparture + randomHourArrival, "hour")
    .add(randomMinuteDeparture + randomMinuteArrival, "minute");

  const diffInMinutes = arrivalTime.diff(departureTime, "minute");

  const hours = Math.floor(diffInMinutes / 60);
  const minutes = diffInMinutes % 60;

  const interval = `${hours} hr ${minutes} mins`;

  const formattedDepartureTime = departureTime.format("HH:mm");
  const formattedArrivalTime = arrivalTime.format("HH:mm");

  const price = Number(props.price?.toFixed(0)).toLocaleString();

  return (
    <FlightContainer>
      <Box
        sx={{
          display: isMobile ? "flex" : "grid",
          flexDirection: "column",
          width: "100%",
          gridTemplateColumns: "8fr 1fr 6fr",
        }}>
        <Flex direction="column" padding="1rem">
          {props.label !== "" && (
            <LabelBox>
              <Text type="p" text={props.label} color="#4A7181" />
            </LabelBox>
          )}

          <Box
            sx={{
              color: ttColors.lighterGray,
              fontWeight: "medium",
            }}>
            <Flex align="center" gap="5px" margin="1rem 0">
              <Text type="p" text="Depart" />
              <Dot fontSize="5rem" />
              <Text type="p" text={formatDate(props.departureDate)} />
            </Flex>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "25px 1fr",
            }}>
            <FlightDepartureIcon />

            <Flex direction="column" gap="1rem" margin="0 1rem">
              <Flex direction="column" gap="1rem">
                <Flex gap="1rem">
                  <Text
                    type="p"
                    weight={"bold"}
                    text={formattedDepartureTime}
                  />
                  <Text type="p" text={props.airportName1} />
                  <Text type="p" text={props.departureCountryCode} />
                </Flex>
                <Flex align={"center"} gap="1rem">
                  <Text type="p" color={ttColors.lighterGray} text={'ade'} />
                  <StopsPill numberOfStops={props.stops} />
                </Flex>
                <Flex gap="1rem">
                  <Text type="p" weight={"bold"} text={formattedArrivalTime} />
                  <Text type="p" text={props.airportName2} />
                  <Text type="p" text={props.arrivalCountryCode} />
                </Flex>
              </Flex>
            </Flex>
          </Box>

          <Divider
            direction="horizontal"
            borderStyle="dotted"
            margin="1rem 0"
          />

          <Flex direction="column">
            <Box
              sx={{
                color: ttColors.lighterGray,
                fontWeight: "medium",
              }}>
              <Flex align="center" gap="5px" margin="1rem 0">
                <Text type="p" text="Return" />
                <Dot fontSize="5rem" />
                <Text type="p" text={formatDate(props.arrivalDate)} />
              </Flex>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "25px 1fr",
              }}>
              <FlightDepartureIcon />

              <Flex direction="column" gap="1rem" margin="0 1rem">
                <Flex direction="column" gap="1rem">
                  <Flex gap="1rem">
                    <Text
                      type="p"
                      weight={"bold"}
                      text={formattedDepartureTime}
                    />
                    <Text type="p" text={props.airportName1} />
                    <Text type="p" text={props.departureCountryCode} />
                  </Flex>
                  <Flex align={"center"} gap="1rem">
                    <Text
                      type="p"
                      color={ttColors.lighterGray}
                      text={interval}
                    />
                    <StopsPill numberOfStops={props.stops} />
                  </Flex>
                  <Flex gap="1rem">
                    <Text
                      type="p"
                      weight={"bold"}
                      text={formattedArrivalTime}
                    />
                    <Text type="p" text={props.airportName2} />
                    <Text type="p" text={props.arrivalCountryCode} />
                  </Flex>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Flex>
        <Divider direction="vertical" borderStyle="dotted" margin="0" />
        <Flex
          direction="column"
          padding="2rem"
          justify="space-between"
          height="480px">
          <Flex align="center">
            <Flex gap=".5rem">
              <IconBorders>
                <Text
                  type="p"
                  text={props.hold}
                  weight={500}
                  size={isMobile ? 16 : 18}
                />
                <MdOutlineLuggage size={isMobile ? 25 : 30} color="#929292" />
              </IconBorders>
              <IconBorders>
                <Text
                  type="p"
                  text={props.carryOn}
                  weight={500}
                  size={isMobile ? 16 : 18}
                />
                <AiOutlineShopping size={isMobile ? 25 : 30} color="#929292" />
              </IconBorders>
            </Flex>
            {!isMobile && <BsShare size={30} />}
          </Flex>
          <Flex
            direction={isMobile ? "column-reverse" : "column"}
            gap=".1rem"
            padding={isMobile ? "2rem 0" : ""}>
            <Text
              type="h1"
              text={`${props.seats ? props.seats : 0} seat(s) left at this price`}
              weight={500}
              size={18}
              color="#929292"
            />
            <Text type="h1" text={`$ ${price}`} weight={600} size={40} />
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
