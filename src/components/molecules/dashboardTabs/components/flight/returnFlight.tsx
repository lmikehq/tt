import { Grid } from "@/components/templates/grid";
import { FlightHistory, TextContainer } from "../flight";
import Flex from "@/components/templates/flex";
import Text from "@/components/atoms/text";
import Image from "@/components/atoms/image";
import { Divider } from "@/components/atoms/divider";
import FlightIcon from "public/assets/icons/dashboard/plane-track.svg";
import { useState } from "react";
import SimplePopper from "@/components/organisms/SimplePopper/SimplePopper";
import { DashboardFlightBookingProps, DashboardReturnFlightBookingProps } from "@/lib/types/response-models/dashboard";
import { formatFlightDate, formatFlightTime } from "@/lib/extensions/helpers/flight";
import Section from "@/components/molecules/section";

type Props = {
  flight: DashboardReturnFlightBookingProps;
};

export const ReturnFlightComp = ({ flight }: Props) => {
  // const [open, setOpen] = useState(false);
  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // const handleHover = (e: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(e.currentTarget);
  //   setOpen((prev) => !prev);
  // };

  // const reset = () => {
  //   setAnchorEl(null);
  //   setOpen(false);
  // };

  const { day, month } = formatFlightDate(flight?.departureTime);

  const flightTime = formatFlightTime(flight?.departureTime);
  const arrivalTime = formatFlightTime(flight?.arrivalTime);

  const { day: returnDay, month: returnMonth } = formatFlightDate(flight?.returnPayload.arrivalTime);

  const returnDepartureTime = formatFlightTime(flight?.returnPayload?.depatureTime);
  const returnArrivalTime = formatFlightTime(flight?.returnPayload?.arrivalTime);

  return (
    <FlightHistory>
      <Grid columns={''} style={{ gridTemplateColumns: '1fr 200px 1.5fr' }} align="center" gap="80px" padding="28px 24px">

        <Flex gap="1.5rem" align="center">
          <Flex direction="column" align="center" justify="flex-start" width="15%">
            <Text type="h1" text={day} size={48} weight={600} />
            <Text
              type="p"
              text={month}
              size={20}
              weight={200}
              styles={{ position: "relative", top: "-10px" }}
            />
          </Flex>
          <Flex justify="flex-start" gap="18px">
            <Flex direction="column" width="max-content">
              <Text
                type="h3"
                text={flight?.takeOffAirport}
                margin="0px 0px .5rem"
              // onMouseEnter={handleHover}
              // onMouseLeave={reset}
              />
              {/* <SimplePopper open={open} anchorEl={anchorEl}>
                <Text
                  type="h3"
                  text="Murtala Muhammed Airport"
                  margin="0px 0px .5rem"
                />
              </SimplePopper> */}

              <Text
                type="p"
                text={flightTime}
                color="#606060"
                weight={600}
                size={16}
                styles={{
                  letterSpacing: "0.1rem",
                }}
              />
            </Flex>
            {/* <Text type="p" text={flight?.takeOffLocation} color="#929292" /> */}
          </Flex>
        </Flex>

        <Flex direction="column" align="center" gap="1rem">
          <Image src={FlightIcon} alt="" width={119} height={20} />
          <TextContainer>
            <Text type="p" text={`${flight?.numOfStopovers} Stops`} />
          </TextContainer>
        </Flex>

        <Flex gap="1.5rem" align="center">
          <Flex direction="column" align="center" justify="flex-start" width="15%">
            <Text type="h1" text={returnDay} size={48} weight={600} />
            <Text
              type="p"
              text={returnMonth}
              size={20}
              weight={200}
              styles={{ position: "relative", top: "-10px" }}
            />
          </Flex>

          <Flex justify="flex-start" gap="18px">
            <Flex direction="column" width="max-content">
              <Text
                type="h3"
                text={flight?.stopOverArray[flight?.stopOverArray.length - 1].destinationAirport}
                margin="0px 0px .5rem"
              />

              <Text
                type="p"
                text={returnArrivalTime}
                color="#606060"
                weight={600}
                size={16}
                styles={{
                  letterSpacing: "0.1rem",
                }}
              />
            </Flex>
            {/* <Text type="p" text={flight?.takeOffLocation} color="#929292" /> */}
          </Flex>
          <Flex direction="column" align="flex-start" width="30%">
            <Text
              type="h3"
              text="ROUND"
              size={28}
              weight={600}
              color="#7BBBD6"
              styles={{
                transform: "rotate(-90deg)",
              }}
            />
          </Flex>
        </Flex>
      </Grid>

      {/* <Grid columns={''} style={{ gridTemplateColumns: '1fr auto 1fr' }} align="center" gap="80px" padding="28px 24px">
        <Flex gap="1.5rem" align="center">
          <Flex direction="column" align="center" width="15%">
            <Text type="h1" text={returnDay} size={48} weight={600} />
            <Text
              type="p"
              text={returnMonth}
              size={20}
              weight={200}
              styles={{ position: "relative", top: "-10px" }}
            />
          </Flex>
          <Flex justify="flex-start" gap="18px">
            <Flex direction="column" width="max-content">
              <Text
                type="h3"
                text={flight.stopOverArray[flight.stopOverArray.length - 1].destinationAirport}
                margin="0px 0px .5rem"
              />

              <Text
                type="p"
                text={returnDepartureTime}
                color="#606060"
                weight={600}
                size={16}
                styles={{
                  letterSpacing: "0.1rem",
                }}
              />
            </Flex>
            <Text type="p" text="LAG" color="#929292" />
          </Flex>
        </Flex>

        <Flex direction="column" align="center" gap="1rem">
          <Image src={FlightIcon} alt="" width={119} height={20} />
          <TextContainer>
            <Text type="p" text="3 Stops" />
          </TextContainer>
        </Flex>

        <Flex gap="0rem" align="center">
          <Flex justify="flex-start" gap="18px">
            <Flex direction="column" width="max-content">
              <Text
                type="h3"
                text="Düsseldorf International Ai..."
                margin="0px 0px .5rem"
              />

              <Text
                type="p"
                text={returnArrivalTime}
                color="#606060"
                weight={600}
                size={16}
                styles={{
                  letterSpacing: "0.1rem",
                }}
              />
            </Flex>
            <Text type="p" text="DUS" color="#929292" />
          </Flex>
          <Flex direction="column" align="flex-start" width="30%">
            <Text
              type="h3"
              text="RETURN"
              size={28}
              weight={600}
              color="#7BBBD6"
              styles={{
                transform: "rotate(-90deg)",
              }}
            />
          </Flex>
        </Flex>
      </Grid> */}

    </FlightHistory>
  );
};

export const MobileReturnFlightComp = ({ flight }: Props) => {
  const { day, month } = formatFlightDate(flight?.departureTime);

  const flightTime = formatFlightTime(flight?.departureTime);
  const arrivalTime = formatFlightTime(flight?.arrivalTime);

  const { day: returnDay, month: returnMonth } = formatFlightDate(flight?.returnPayload.arrivalTime);

  const returnDepartureTime = formatFlightTime(flight?.returnPayload?.depatureTime);
  const returnArrivalTime = formatFlightTime(flight?.returnPayload?.arrivalTime);

  return (
    <FlightHistory>
      <Grid columns={''} gap="18px" padding="22px 10px" style={{ gridTemplateColumns: "10% 1fr 10%" }}>
        <Flex direction="column" align="center" justify="center">
          <Text type="h1" text={day} size={28} weight={600} />
          <Text
            type="p"
            text={month}
            size={16}
            weight={200}
            styles={{ position: "relative", top: "-10px" }}
          />
          <Text type="p" weight={600} text="To" />

          <Text type="h1" text={returnDay} size={28} weight={600} />
          <Text
            type="p"
            text={returnMonth}
            size={16}
            weight={200}
            styles={{ position: "relative", top: "-10px" }}
          />
        </Flex>

        <Flex direction="column" gap="18px">
          <Flex justify="flex-start">
            <Flex direction="column" gap="12px">
              <Text
                type="h3"
                text={flight.takeOffAirport}
                size={16}
                weight={500}
              />

              <Text
                type="p"
                text={flightTime}
                color="#606060"
                weight={600}
                size={16}
                styles={{
                  letterSpacing: "0.1rem",
                }}
              />
            </Flex>
            {/* <Text type="p" text={flight.takeOffLocation} color="#929292" /> */}
          </Flex>

          <Flex direction="row" align="center" gap="1rem">
            <Image src={FlightIcon} alt="" width={119} height={20} />
            <TextContainer>
              <Text type="p" size={12} text={`${flight.numOfStopovers} Stops`} />
            </TextContainer>
          </Flex>

          <Flex gap="0rem" align="center">
            <Flex justify="flex-start">
              <Flex direction="column" gap="12px">
                <Text
                  type="h3"
                  text={flight?.stopOverArray[flight?.stopOverArray.length - 1].destinationAirport}
                  size={16}
                  weight={500}
                />

                <Text
                  type="p"
                  text={returnArrivalTime}
                  color="#606060"
                  weight={600}
                  size={16}
                  styles={{
                    letterSpacing: "0.1rem",
                  }}
                />
              </Flex>
              {/* <Text type="p" text={flight.destinationLocation} color="#929292" /> */}
            </Flex>
          </Flex>
        </Flex>

        <Flex direction="column" align="center" justify="center">
          <Text
            type="h3"
            text="ROUND"
            size={18}
            weight={600}
            color="#7BBBD6"
            styles={{
              transform: "rotate(-90deg)",
            }}
          />
        </Flex>
      </Grid>
    </FlightHistory>
  );
};

/**
 * <Flex direction="column" align="center" justify="center">
          <Text
            type="h3"
            text="DEPART"
            size={18}
            weight={600}
            color="#7BBBD6"
            styles={{
              transform: "rotate(-90deg)",
            }}
          />
        </Flex>
 */