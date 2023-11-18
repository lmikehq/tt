import React from "react";
import { Container, Header } from "../view/styles";
import Flex from "@/components/templates/flex";
import Text from "@/components/atoms/text";

function BookingDetails() {
  return (
    <Container>
      <Header>
        <Flex direction="column" gap="10px">
          <Text weight={600} type="h3" text="Booking Details"></Text>
          <Text
            type="p"
            text="Enter your booking details for reservation"
          ></Text>
        </Flex>
      </Header>
    </Container>
  );
}

export default BookingDetails;
