import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import styled from "styled-components";

const Box = styled.div`
  padding: 12px 18px;
  background: #f7f7f7;
  width: max-content;
  border-radius: 30px;
`;

export const RelatedTopic = () => {
  return (
    <>
      <Flex direction="column" gap="2rem">
        <Text type="h3" text="Related Travel Topics" size="20px" weight={600} />
        <Flex width="425px" wrap="wrap" gap="1rem">
          <Box>
            <Text type="p" text="#Travel Tips" size="16px" color="#414141" />
          </Box>
          <Box>
            <Text
              type="p"
              text="#Travel Deals and Packages"
              size="16px"
              color="#414141"
            />
          </Box>
          <Box>
            <Text
              type="p"
              text="#Travel Inspiration"
              size="16px"
              color="#414141"
            />
          </Box>
          <Box>
            <Text
              type="p"
              text="#Destination Guides"
              size="16px"
              color="#414141"
            />
          </Box>
          <Box>
            <Text
              type="p"
              text="#Travel Inspiration"
              size="16px"
              color="#414141"
            />
          </Box>
          <Box>
            <Text
              type="p"
              text="#Destination Guides"
              size="16px"
              color="#414141"
            />
          </Box>
          <Box>
            <Text type="p" text="#Family Travel" size="16px" color="#414141" />
          </Box>
          <Box>
            <Text
              type="p"
              text="#Adventure Travel"
              size="16px"
              color="#414141"
            />
          </Box>
          <Box>
            <Text type="p" text="#SoloTravel" size="16px" color="#414141" />
          </Box>
          <Box>
            <Text type="p" text="#RoadTrip" size="16px" color="#414141" />
          </Box>
          <Box>
            <Text type="p" text="#Travel Tips" size="16px" color="#414141" />
          </Box>
          <Box>
            <Text type="p" text="#Journey" size="16px" color="#414141" />
          </Box>
          <Box>
            <Text type="p" text="#TravelDiaries" size="16px" color="#414141" />
          </Box>
          <Box>
            <Text type="p" text="#Explore" size="16px" color="#414141" />
          </Box>
          <Box>
            <Text type="p" text="#TravelGoals" size="16px" color="#414141" />
          </Box>
          <Box>
            <Text
              type="p"
              text="#TravelCommunity"
              size="16px"
              color="#414141"
            />
          </Box>
        </Flex>
      </Flex>
    </>
  );
};
