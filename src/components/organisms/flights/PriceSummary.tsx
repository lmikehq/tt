import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import { ttColors } from "@/lib/theme/colors";
import { Box } from "@mui/material";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import PlusMinusButton from "./PlusMinusButton";
import Image from "@/components/atoms/image";

export default function PriceSumary() {
  return (
    <Box>
      <Text type="h3" text="Price Summary" />
      <Text type="p" text="Taxes and service charges included" />

      <Box
        sx={{
          marginY: "2rem",
          color: ttColors.lighterGray,
        }}
      >
        <Flex justify="space-between" align="center">
          <Text type="p" text="Base Fare" />
          <Text type="p" text="$ 1800.00" />
        </Flex>

        <Flex justify="space-between" align="center">
          <Text type="p" text="Taxes and charges" />
          <Text type="p" text="$ 200.00" />
        </Flex>

        <Flex justify="space-between" align="center">
          <Text type="p" text="Service charges" />
          <Text type="p" text="$ 135" />
        </Flex>

        <Flex justify="space-between" align="center">
          <Text type="p" text="Thrillers discount" />
          <Text type="p" text="-$ 100" />
        </Flex>
      </Box>

      <Flex margin="2rem auto" justify="space-between" align="center">
        <Text type="p" text="Total (USD)" />
        <Text type="p" text="$ 2,035" size={"2rem"} weight="medium" />
      </Flex>

      <Box
        sx={{
          backgroundColor: ttColors.grayishAsh,
          border: `1px solid ${ttColors.brown}`,
          borderRadius: "10px",
          padding: "1rem",
          marginBottom: "2rem",
        }}
      >
        <Flex>
          <Text type="p" text="Eligible for Flexible Travel Dates" />
        </Flex>
      </Box>

      <Box sx={{ marginY: "1rem" }}>
        <Text type="h3" text="Passengers" />
        <Text type="p" text="Select Number of persons to book flight" />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "1rem",
            marginBottom: "2rem",
          }}
        >
          <Text type="p" text="Adults" />

          <Box>
            <Flex align="center" gap="1rem">
              <PlusMinusButton>-</PlusMinusButton>
              <Text type="p" text={"0"} />
              <PlusMinusButton>+</PlusMinusButton>
            </Flex>
          </Box>
        </Box>
      </Box>

      <Box sx={{ marginY: "2rem" }}>
        <Text type="h3" text="Check-In Baggage" />
        <Text type="p" text="Details on baggage needed to travel" />

        <Box sx={{ marginY: "2rem" }}>
          <Flex justify="space-between" align="center">
            <Text type="p" text="Departure" />
            <Text type="p" text={"No bags"} color={ttColors.lighterGray} />
          </Flex>
          <Flex justify="space-between" align="center">
            <Text type="p" text="Return" />
            <Text type="p" text={"No bags"} color={ttColors.lighterGray} />
          </Flex>
        </Box>
      </Box>

      <Box>
        <Flex justify="space-between" align="center">
          <TimerOutlinedIcon />
          <Text type="p" text={`This booking will be unavailable in 17h 40m`} />
        </Flex>
      </Box>

      <Image
        width={384}
        height={525}
        src="/assets/images/flights/baggage.png"
        alt="Baggage"
      />
    </Box>
  );
}
