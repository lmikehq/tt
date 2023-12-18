import Text from "@/components/atoms/text";
import { GridLayout, Span } from "@/components/molecules/stays/view/styles";
import Flex from "@/components/templates/flex";
import React from "react";

function LanguageList() {
  return (
    <Span style={{ padding: "0px 20px" }}>
      <Flex direction="column">
        <Text type="h3" weight={500} text="Suggested for you"></Text>
        <GridLayout className="amenities_grid">
          <Span className="top_five_languages">
            <Flex align="center">
              <Span className="country_flag">
                <img src="" alt="" />
              </Span>
              <Span>
                <Text type="p" text="" weight={500}></Text>
              </Span>
            </Flex>
          </Span>
        </GridLayout>
      </Flex>
      <Flex direction="column" styles={{ marginTop: "20px" }}>
        <Text type="h3" weight={500} text="All Languages"></Text>
        <GridLayout className="amenities_grid">
          <Span className="all_languages">
            <Flex align="center">
              <Span className="country_flag">
                <img src="" alt="" />
              </Span>
              <Span>
                <Text type="p" text="" weight={500}></Text>
              </Span>
            </Flex>
          </Span>
        </GridLayout>
      </Flex>
    </Span>
  );
}

export default LanguageList;
