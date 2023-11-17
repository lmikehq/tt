import React from "react";
import { Container, Header } from "../view/styles";
import Text from "@/components/atoms/text";

function CheckingIn() {
  return (
    <Container>
      <Header>
        <Text type="h2" text="Who is checking in?"></Text>
      </Header>
    </Container>
  );
}

export default CheckingIn;
