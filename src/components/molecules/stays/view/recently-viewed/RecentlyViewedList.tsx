import Text from "@/components/atoms/text";
import Section from "../../../section";
import Flex from "@/components/templates/flex";
import RecentlyViewedTile from "./RecentlyViewedTile";
import { Span } from "../styles";

const RecentlyViewedList = () => {
  return (
    <Span>
      <Section styles={{ marginTop: "20px", marginBottom: "10px" }}>
        <Text type="h1" size={24} weight={600} text="Recently viewed" />
      </Section>
      <Section>
        <Flex direction="column" gap="0.875rem">
          <RecentlyViewedTile />
        </Flex>
      </Section>
    </Span>
  );
};

export default RecentlyViewedList;
