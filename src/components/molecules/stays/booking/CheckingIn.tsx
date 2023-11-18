import React from "react";
import { Container, GridLayout, Header, Span } from "../view/styles";
import Text from "@/components/atoms/text";
import Input from "@/components/atoms/input";
import Section from "../../section";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import Flex from "@/components/templates/flex";

function CheckingIn() {
  const { isMobile } = useScreenResolution();

  return (
    <Container>
      <Header>
        <Text weight={600} type="h3" text="Who is checking in?"></Text>
      </Header>
      <Span>
        <GridLayout>
          <Section>
            <Text
              type="p"
              text="First Name"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
              size={isMobile ? "14.5px" : "16px"}
            />
            <Input placeholder="Enter First Name" height="3rem" />
          </Section>
          <Section>
            <Text
              type="p"
              text="Last Name"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
              size={isMobile ? "14.5px" : "16px"}
            />
            <Input placeholder="Enter Last Name" height="3rem" />
          </Section>
          <Section>
            <Text
              type="p"
              text="Email Address"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
              size={isMobile ? "14.5px" : "16px"}
            />
            <Input placeholder="Enter Email Address" height="3rem" />
          </Section>
          <Section>
            <Text
              type="p"
              text="Phone Number"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
              size={isMobile ? "14.5px" : "16px"}
            />
            <Input placeholder="Enter Your Phone Number " height="3rem" />
          </Section>
        </GridLayout>
        <Span>
          <Flex direction="column"></Flex>
        </Span>
      </Span>
    </Container>
  );
}

export default CheckingIn;
