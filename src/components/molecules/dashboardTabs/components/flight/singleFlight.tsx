import Image from "@/components/atoms/image";
import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import { Grid } from "@/components/templates/grid";
import { FlightHistory, TextContainer } from "../flight";
import FlightIcon from "public/assets/icons/dashboard/plane-track.svg";
import SimplePopper from "@/components/organisms/SimplePopper/SimplePopper";
import { useState } from "react";
import { DashboardFlightBookingProps } from "@/lib/types/response-models/dashboard";
import { formatFlightDate, formatFlightTime } from "@/lib/extensions/helpers/flight";

type Props = {
  flight: DashboardFlightBookingProps;
};

export const SingleFlightComp = ({ flight }: Props) => {
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

  const { day, month } = formatFlightDate(flight.departureTime);

  const flightTime = formatFlightTime(flight.departureTime);
  const arrivalTime = formatFlightTime(flight.arrivalTime);

  const { day: returnDay, month: returnMonth } = formatFlightDate(flight?.arrivalTime);

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
                  text={flight.takeOffAirport}
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
                text={flight?.destinationAirport}
                margin="0px 0px .5rem"
              // onMouseEnter={handleHover}
              // onMouseLeave={reset}
              />
              {/* <SimplePopper open={open} anchorEl={anchorEl}>
                <Text
                  type="h3"
                  text={flight?.destinationAirport}
                  margin="0px 0px .5rem"
                />
              </SimplePopper> */}

              <Text
                type="p"
                text={arrivalTime}
                color="#606060"
                weight={600}
                size={16}
                styles={{
                  letterSpacing: "0.1rem",
                }}
              />
            </Flex>
            {/* <Text type="p" text={flight?.destinationLocation} color="#929292" /> */}
          </Flex>
          <Flex direction="column" align="flex-start" width="35%">
            <Text
              type="h3"
              text="ONE WAY"
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
    </FlightHistory>
  );
};


export const MobileSingleFlightComp = ({ flight }: Props) => {

  const { day, month } = formatFlightDate(flight?.departureTime);

  const flightTime = formatFlightTime(flight.departureTime);
  const arrivalTime = formatFlightTime(flight.arrivalTime);

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
                  text={flight.destinationAirport}
                  size={16}
                  weight={500}
                />

                <Text
                  type="p"
                  text={arrivalTime}
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
            text="ONE WAY"
            size={18}
            weight={600}
            color="#7BBBD6"
            styles={{
              transform: "rotate(-90deg)",
              // width: "100%"
            }}
          />
        </Flex>
      </Grid>
    </FlightHistory>
  );
};