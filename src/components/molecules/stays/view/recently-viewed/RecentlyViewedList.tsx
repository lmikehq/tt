import Text from "@/components/atoms/text";
import Section from "../../../section";
import Flex from "@/components/templates/flex";
import RecentlyViewedTile from "./RecentlyViewedTile";
import { Span } from "../styles";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { SearchRecentlyViewedStaysResponse } from "@/lib/types/response-models/stay/search.type";


const RecentlyViewedList = ({ hotels }: { hotels: SearchRecentlyViewedStaysResponse }) => {
  const { isMobile } = useScreenResolution();

  return (
    <Span>
      <Section
        styles={{ marginTop: isMobile ? "-20px" : "20px", marginBottom: "20px" }}
      >
        <Text type="h1" size={24} weight={600} text="Recently viewed" />
      </Section>
        <Section>
        {hotels.length === 0 ? (
            <Flex direction="column" align="center" gap="1rem" padding="6rem 0" background="white" borderRadius=".5rem" >
                <Text
                    type="p"
                    weight={500}
                    text="No recently viewed hotels"
                />
            </Flex>
        ) : (
            <Flex direction="column" gap="0.875rem">
                <RecentlyViewedTile hotels={hotels} />
            </Flex>
        )}
      </Section>
    </Span>
  );
};

export default RecentlyViewedList;
