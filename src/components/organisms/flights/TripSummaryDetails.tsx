import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import { Box } from "@mui/material";
import { BiTransferAlt } from "react-icons/bi";

interface ITransferDurationProps {
  duration: string;
  state: string;
}

function TransferDuration({ duration, state }: ITransferDurationProps) {
  return (
    <Box>
      <Flex gap="0.5rem" align="center">
        <BiTransferAlt size={"32"} />
        <Text type="p" weight="bold" text={`Transfer Duration ${duration}`} />
      </Flex>
      <Text type="p" text={`Transfer in ${state}`} />
    </Box>
  );
}

function AirportLocation() {
  return (
    <Box>
      <Text type="p" weight="bold" text={`22:00 LAG`} />
      <Text type="p" text="Sat, 26 Aug" />
      <Text type="p" text="Murtala Muhammed, TI," />
      <Text type="p" text="Lagos (Nigeria)" />
    </Box>
  );
}

function TimeOfFlight() {
  return (
    <Box>
      <Flex gap="1rem" align="center" margin="0 0 0.5rem 0">
        <TimerOutlinedIcon />

        <Text type="p" weight="bold" text="6h 35'" />
      </Flex>

      <Flex gap="1rem" align="center">
        <Box
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "30px",
            height: "30px",
            border: "1px solid gray",
            borderRadius: "50px",
            backgroundImage: "url('/assets/images/flights/EgyptAirLogo.jpg')",
          }}
        />
        <Text type="p" text="EgyptAir Airlines KL588" />
      </Flex>
    </Box>
  );
}

export default function TripSummaryDetails() {
  return (
    <Box
      sx={{
        display: "grid",
        rowGap: "1rem",
        backgroundColor: "#F9F9FF",
        padding: "2rem",
      }}
    >
      <Flex justify="space-between">
        <AirportLocation />
        <TimeOfFlight />
        <AirportLocation />
      </Flex>

      <TransferDuration duration="6h 35'" state="Amsterdam" />

      <Flex justify="space-between">
        <AirportLocation />
        <TimeOfFlight />
        <AirportLocation />
      </Flex>

      <TransferDuration duration="6h 35'" state="Amsterdam" />

      <Flex justify="space-between">
        <AirportLocation />
        <TimeOfFlight />
        <AirportLocation />
      </Flex>
    </Box>
  );
}
