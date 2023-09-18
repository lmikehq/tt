import Flex from "@atom/flex";
import Text from "@atom/text";
import { Divider } from "@atom/divider";
import dayjs, { Dayjs } from "dayjs";
import { FaPlane } from "react-icons/fa";
import { styled } from "styled-components";
import { BsShare } from "react-icons/bs";
import { ttColors } from "theme/colors";
import { MdOutlineLuggage } from "react-icons/md";
import { AiOutlineShopping } from "react-icons/ai";
import Button from "@atom/button";

type flightProps = {
  departureCountryCode: string;
  arrivalCountryCode: string;
  airportName1: string;
  airportName2: string;
  departureDate: dayjs.Dayjs;
  arrivalDate: dayjs.Dayjs;
  price: number;
  label: string
};

const FlightContainer = styled.div`
    box-shadow: 0px 4px 16px 0px #8DD3BB1A;
    border: 1px solid #E7E7E7;
    background: linear-gradient(0deg, #FFFFFF, #FFFFFF);
    margin: 1rem 2rem;
    border-radius: 12.5px;
`

const IconBorders = styled.div`
  padding: .75rem;
  height: 4em;
  border: 2px solid ${ttColors.primary};
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  border-radius: 8px;
  gap: 0.5rem;
`

const LabelBox = styled.div`
  padding: .5rem;
  background: #F3FAFD;
  width: 20%;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`

function FlightBox(props: flightProps) {
  function getRandomNumber() {
    return Math.floor(Math.random() * 5) + 1
  }

  function formatDate (day: Dayjs) {
    return day.format('dddd, MMMM D')
  }

  const randomHourDeparture = Math.floor(Math.random() * 24);
  const randomMinuteDeparture = Math.floor(Math.random() * 60);
  
  const randomHourArrival = Math.floor(Math.random() * 24);
  const randomMinuteArrival = Math.floor(Math.random() * 60);
  
  const departureTime = dayjs().add(randomHourDeparture, 'hour').add(randomMinuteDeparture, 'minute');
  const arrivalTime = dayjs().add(1, 'day').add(randomHourDeparture + randomHourArrival, 'hour').add(randomMinuteDeparture + randomMinuteArrival, 'minute');
  
  const diffInMinutes = arrivalTime.diff(departureTime, 'minute');
  
  const hours = Math.floor(diffInMinutes / 60);
  const minutes = diffInMinutes % 60;
  
  const interval = `${hours} hr ${minutes} mins`;
  
  const formattedDepartureTime = departureTime.format('HH:mm');
  const formattedArrivalTime = arrivalTime.format('HH:mm');
  
  const price = Number(props.price?.toFixed(0)).toLocaleString();
  
  return (
    <FlightContainer>
        <Flex>
          <Flex direction="column" padding="1rem">
            {props.label !== "" && (<LabelBox>
              <Text type="p" text={props.label} color="#4A7181"/>
            </LabelBox>)}
            <Flex align="center" gap=".5rem" padding="1.5rem">
              <Text type="p" text="Depart" />
              &middot;
              <Text type="p" text={formatDate(props.departureDate)} />
            </Flex>
            <Flex direction="column" gap="1rem" padding="2rem">
              <Flex direction="column" gap="1rem">
                <Flex gap="1rem">
                  <Text type="p" text={formattedDepartureTime} />
                  <Text type="p" text={props.airportName1} />
                  <Text type="p" text={props.departureCountryCode} />
                </Flex>
                <Flex gap="1rem">
                  <Text type="p" text={interval} />
                  <Text type="p" text={`${getRandomNumber()} stops`} />
                </Flex>
                <Flex gap="1rem">
                  <Text type="p" text={formattedArrivalTime} />
                  <Text type="p" text={props.airportName2} />
                  <Text type="p" text={props.arrivalCountryCode} />
                </Flex>
              </Flex>
            </Flex>
            <Divider direction="horizontal" borderStyle="dotted" />
            <Flex align="center" gap=".5rem" padding="1.5rem">
              <Text type="p" text="Return" />
              &middot;
              <Text type="p" text={formatDate(props.arrivalDate)} />
            </Flex>
            <Flex direction="column" gap="1rem" padding="2rem">
              <FaPlane />
              <Flex direction="column" gap="1rem">
                <Flex gap="1rem">
                  <Text type="p" text={formattedDepartureTime} />
                  <Text type="p" text={props.airportName1} />
                  <Text type="p" text={props.departureCountryCode} />
                </Flex>
                <Flex gap="1rem">
                  <Text type="p" text={interval} />
                  <Text type="p" text={`${getRandomNumber()} stops`} />
                </Flex>
                <Flex gap="1rem">
                  <Text type="p" text={formattedArrivalTime} />
                  <Text type="p" text={props.airportName2} />
                  <Text type="p" text={props.arrivalCountryCode} />
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Divider direction="vertical" borderStyle="dotted" />
          <Flex direction="column" padding="2rem" justify="space-between">
            <Flex align="center">
              <Flex gap=".5rem">
                <IconBorders>
                  <Text type="p" text={getRandomNumber().toString()} weight={500} size={18}/>
                  <MdOutlineLuggage size={30} />
                </IconBorders>
                <IconBorders>
                  <Text type="p" text={getRandomNumber().toString()} weight={500} size={18}/>
                  <AiOutlineShopping size={30} />
                </IconBorders>
              </Flex>
              <BsShare size={30}/>
            </Flex>
            <Flex direction="column" gap=".1rem">
              <Text type="h1" text={`${getRandomNumber()} seats left at this price`} weight={500} size={18} color="#929292"/>
              <Text type="h1" text={`$ ${price}`} weight={600} size={40}/>
            </Flex>
            <Button
              background="#7BBBD6"
              width="100%"
              padding="2rem 0"
            >
              <Text type="h1" text="Select" weight={600} size={18} font="Montserrat"/>
            </Button>
          </Flex>
        </Flex>
    </FlightContainer>
  );
}

export default FlightBox;
