import { Divider } from "@/components/atoms/divider";
import Text from "@/components/atoms/text";
import Section from "@/components/molecules/section";
import Flex from "@/components/templates/flex";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { ttColors } from "@/lib/theme/colors";
import { Box } from "@mui/material";
import React from "react";

function OverviewSystem() {
  const { isMobile } = useScreenResolution()

  return (
    <Section>
      <Box
        sx={{
          background: "white",
          padding: "1rem",
          border: "1px solid #E9E8FC",
          borderRadius: "12px",
        }}
      >
        <Flex gap="1rem" align="flex-start" padding="1rem">
          <Box
            style={{
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "50px",
              height: "50px",
              backgroundImage: "url('/assets/images/flights/EgyptAirLogo.jpg')",
              borderRadius: "50%",
              border: "1.5px solid #B6B6B6",
            }}
          />
          <Flex direction="column" align="center">
            <Flex justify="space-between">
              <Text text={"EgyptAir Airlines"} type="p" />
              <Text text={"16h 45m (+1d)"} type="p" />
            </Flex>
            <Flex justify="space-between">
              <Text
                text={"FIG4312"}
                type="p"
                size={"1rem"}
                color="#7BBBD6"
                weight={500}
              />
              <Text text={"7:00 AM - 4:15 PM"} type="p" size={"1rem"} />
            </Flex>
            <Flex justify="space-between">
              <Text text={"Departure"} type="p" size={"1rem"} color="#7BBBD6" />
              <Text
                text={"2h 45m in HML"}
                type="p"
                size={"1rem"}
                color="#7BBBD6"
              />
            </Flex>
          </Flex>
        </Flex>
        <Divider direction="horizontal" />
        <Flex gap="1rem" align="flex-start" padding="1rem">
          <Box
            style={{
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "50px",
              height: "50px",
              backgroundImage: "url('/assets/images/flights/EgyptAirLogo.jpg')",
              borderRadius: "100%",
              border: "1.5px solid #B6B6B6",
            }}
          />
          <Flex direction="column" align="center">
            <Flex justify="space-between">
              <Text text={"EgyptAir Airlines"} type="p" />
              <Text text={"16h 45m (+1d)"} type="p" />
            </Flex>
            <Flex justify="space-between">
              <Text
                text={"FIG4312"}
                type="p"
                size={"1rem"}
                color="#7BBBD6"
                weight={500}
              />
              <Text text={"7:00 AM - 4:15 PM"} type="p" size={"1rem"} />
            </Flex>
            <Flex justify="space-between">
              <Text text={"Retrun"} type="p" size={"1rem"} color="#7BBBD6" />
              <Text
                text={"2h 45m in HML"}
                type="p"
                size={"1rem"}
                color="#7BBBD6"
              />
            </Flex>
          </Flex>
        </Flex>
      </Box>
      <Box
        sx={{
          marginY: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <Flex gap="1rem" justify={isMobile ? "space-between" : "flex-end"} align="center">
          <Text type="p" text="Base Fare" />
          <Text type="p" text="$ 1800.00" color="#606060" />
        </Flex>

        <Flex gap="1rem" justify={isMobile ? "space-between" : "flex-end"} align="center">
          <Text type="p" text="Taxes and charges" />
          <Text type="p" text="$ 200.00" color="#606060" />
        </Flex>

        <Flex gap="1rem" justify={isMobile ? "space-between" : "flex-end"} align="center">
          <Text type="p" text="Service charges" />
          <Text type="p" text="$ 135" color="#606060" />
        </Flex>

        <Flex gap="1rem" justify={isMobile ? "space-between" : "flex-end"} align="center">
          <Text type="p" text="Thrillers discount" />
          <Text type="p" text="-$ 100" color="#606060" />
        </Flex>

        <Flex gap="1rem" justify={isMobile ? "space-between" : "flex-end"} align="center">
          <Text type="p" text="Total" />
          <Text type="p" text="$ 2,035" color="#606060" />
        </Flex>
      </Box>
    </Section>
  );
}

export default OverviewSystem;
