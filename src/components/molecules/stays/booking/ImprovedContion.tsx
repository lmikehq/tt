import React from "react";
import { Container, Header } from "../view/styles";
import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";

function ImprovedCondition() {
  return (
    <Container>
      <Header>
        <Flex direction="column" gap="10px">
          <Text type="h2" text="Improved conditions"></Text>
          <Text
            type="p"
            text="We'll make the request for extra services and inform you once they've been approved"
          ></Text>
        </Flex>
      </Header>
    </Container>
  );
}

export default ImprovedCondition;
