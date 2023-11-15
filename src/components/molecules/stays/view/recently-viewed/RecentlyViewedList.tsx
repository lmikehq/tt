import Text from "@/components/atoms/text";
import Section from "../../../section";
import Flex from "@/components/templates/flex";
import RecentlyViewedTile from "./RecentlyViewedTile";
import { Span } from "../styles";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";

const RecentlyViewedList = () => {
  const { isMobile } = useScreenResolution();

  return (
    <Span>
      <Section
        styles={{ marginTop: isMobile ? "-20px" : "20px", marginBottom: "20px" }}
      >
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
