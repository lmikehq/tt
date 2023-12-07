import React from "react";
import { Container, Header, Span } from "../view/styles";
import Flex from "@/components/templates/flex";
import Text from "@/components/atoms/text";
import Section from "../../section";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import Input from "@/components/atoms/input";

function Payment() {
  const { isMobile } = useScreenResolution();

  return (
    <Container>
      <Header>
        <Flex direction="column" gap="10px">
          <Text weight={600} type="h3" text="Payment Details"></Text>
          <Text
            type="p"
            text="Your personal information secured with us."
          ></Text>
        </Flex>
      </Header>
      <Span>
        <Flex gap="20px" align="center" wrap="wrap">
          <img
            style={{ maxHeight: "40px" }}
            src="/assets/images/stays/master.png"
            alt=""
          />
          <img
            style={{ maxHeight: "40px" }}
            src="/assets/images/stays/visa.png"
            alt=""
          />
          <img
            style={{ height: "40px" }}
            src="/assets/images/stays/discover.png"
            alt=""
          />

          <img
            style={{ maxWidth: "40px", maxHeight: "45px" }}
            src="/assets/images/stays/jcb.jpeg"
            alt=""
          />
          <img
            style={{ maxHeight: "40px" }}
            src="/assets/images/stays/dinners.png"
            alt=""
          />
        </Flex>
      </Span>
      <Span>
        <Flex direction="column">
          <Section>
            <Text
              type="p"
              text="Name of Card"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
              size={isMobile ? "14.5px" : "16px"}
            />
            <Input placeholder="Enter Card Name" height="3rem" />
          </Section>
          <Section>
            <Text
              type="p"
              text="Card Number"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
              size={isMobile ? "14.5px" : "16px"}
            />
            <Input placeholder="Enter Card Number" height="3rem" />
          </Section>
          <Flex
            align="center"
            gap={isMobile ? "10px" : "20px"}
            styles={{ flexDirection: isMobile ? "column" : "row" }}
          >
            <Section>
              <Text
                type="p"
                text="Expiry Date"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                size={isMobile ? "14.5px" : "16px"}
              />
              <Input placeholder="Enter Expiry Date" height="3rem" />
            </Section>
            <Section>
              <Text
                type="p"
                text="CVV"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                size={isMobile ? "14.5px" : "16px"}
              />
              <Input
                placeholder="Enter CVV (3 numbers at the back)"
                height="3rem"
              />
            </Section>
          </Flex>
        </Flex>
      </Span>
    </Container>
  );
}

export default Payment;
