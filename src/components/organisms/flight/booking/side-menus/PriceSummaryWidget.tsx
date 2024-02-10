import Section from "@/components/molecules/section";
import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import { Detail } from "./PriceSummary";

interface PriceSummaryWidgetProps {
    basePrice: string;
    serviceCharge: string;
    discount: string;
    totalPrice: string;
    currency: string;
}
const PriceSummaryWidget = ({
    basePrice,
    serviceCharge,
    discount,
    totalPrice,
    currency,
}: PriceSummaryWidgetProps) => {
    return (
        <Section>
            <Flex direction="column" gap=".5rem" margin="0 0 2rem">
                <Text type="h3" weight={600} text="Price Summary" />
                <Text
                    type="p"
                    size={14}
                    text="Taxes and service charges included"
                />
            </Flex>

            <Flex direction="column" gap=".6rem" margin="0 0 2rem">
                <Detail
                    name="Base Fare"
                    value={basePrice}
                    currency={currency}
                    plain={true}
                />
                <Detail
                    name="Service Charges"
                    value={serviceCharge}
                    currency={currency}
                    plain={true}
                />
                <Detail
                    name="Thrillers Discount"
                    value={discount}
                    currency={currency}
                    plain={true}
                    negative
                />
            </Flex>

            <Flex margin="0 0 2rem">
                <Detail
                    name="Total Fee"
                    value={totalPrice}
                    currency={currency}
                    plain={true}
                    bold
                />
            </Flex>
        </Section>
    );
};

export default PriceSummaryWidget;
