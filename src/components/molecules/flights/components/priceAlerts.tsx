import Switch from "@/components/molecules/switch";
import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import { ttColors } from "@/lib/theme/colors";
import { Box } from "@mui/material";
import Section from "../../section";

export default function PriceAlerts() {
  return (

    <Section margin="0 0 1rem 0">
      <Box width={"100%"} bgcolor={ttColors.grayishAsh} padding="1rem" borderRadius="10px">
            <Flex>
                <Switch
                    label={<Text type="h4" weight="bold" text="Set up price alert" />}
                />
            </Flex>

            <Text
                type="p"
                size={14}
                text="Receive alerts when the prices for this route change."
            />
            </Box>
        </Section>
    );
}
