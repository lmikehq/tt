import Text from "@/components/atoms/text";
import Section from "../../../section";
import Flex from "@/components/templates/flex";
import RecentlyViewedTile from "./RecentlyViewedTile";

const RecentlyViewedList = () => {
    return (
        <Section>
            <Section margin={"0 0 1.75rem 0"}>
                <Text type="h1" size={24} weight={600} text="Recently viewed" />
            </Section>
            <Section>
                <Flex direction="column" gap="0.875rem">
                    <RecentlyViewedTile />
                    <RecentlyViewedTile />
                    <RecentlyViewedTile />
                </Flex>
            </Section>
        </Section>
    );
};

export default RecentlyViewedList;
