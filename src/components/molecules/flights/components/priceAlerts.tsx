import Switch from "@/components/molecules/switch";
import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import { ttColors } from "@/lib/theme/colors";
import { Box } from "@mui/material";
import Section from "../../section";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";


export default function PriceAlerts() {
    const { isMobile } = useScreenResolution()
  return (
    <Section margin="0 0 1rem 0">
        <Flex width={"100%"} direction="column" gap="1rem" background={ttColors.grayishAsh} padding="1.5rem 1rem" borderRadius="10px">
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
            </Flex>
        </Section>
    );
}
