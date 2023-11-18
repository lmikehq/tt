import React from "react";
import { Container, GridLayout, Header, Span } from "../view/styles";
import Text from "@/components/atoms/text";
import Input from "@/components/atoms/input";
import Section from "../../section";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import Flex from "@/components/templates/flex";
import { Checkbox, FormControlLabel } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { FaUserPlus } from "react-icons/fa";

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
          <Flex direction="column" margin="10px 0px">
            <FormControlLabel
              control={
                <Checkbox
                  className="mui-checked"
                  disableFocusRipple
                  disableRipple
                />
              }
              label={
                <Text
                  type="p"
                  text="Receive text alerts about this trip. Message and data rates may apply."
                  styles={{ fontSize: "15px", width: "fit-content" }}
                />
              }
            />
          </Flex>
          <Flex align="center" gap="10px">
            <FaUserPlus style={{ fontSize: "20px" }} />
            <Text type="p" text="Add name(s) of other guests"></Text>
          </Flex>
          <Flex
            align="center"
            gap="10px"
            margin="10px 0px"
            cursor="pointer"
            width="fit-content"
          >
            <Text type="p" weight={500} text="Special Requests"></Text>
            <KeyboardArrowDownIcon />
          </Flex>
        </Span>
      </Span>
    </Container>
  );
}

export default CheckingIn;
