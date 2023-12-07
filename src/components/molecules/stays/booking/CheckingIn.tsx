import React, { useState } from "react";
import {
  BtnDetails,
  Container,
  GridLayout,
  Header,
  Span,
} from "../view/styles";
import Text from "@/components/atoms/text";
import Input, { TextField } from "@/components/atoms/input";
import Section from "../../section";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import Flex from "@/components/templates/flex";
import { Checkbox, FormControlLabel } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { FaUserMinus, FaUserPlus } from "react-icons/fa";
import PhoneInput from "react-phone-number-input";
import { ttColors } from "@/lib/theme/colors";
import Divider from "@mui/material/Divider";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function CheckingIn() {
  const { isMobile } = useScreenResolution();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const [isGridVisible, setIsGridVisible] = useState(false);

  const handleToggleGrid = () => {
    setIsGridVisible(!isGridVisible);
  };
  // const [value, setValue] = useState<string | undefined>("");

  return (
    <Container style={{ overflow: "hidden" }}>
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
            <Input placeholder="Enter Your Phone Number" height="3rem" />
            {/* <Flex>
              <PhoneInput
                style={{ height: "30px", width: "100%" }}
                placeholder="Enter Your Phone Number"
                value={value}
                defaultCountry="NG"
                onChange={(phoneNumber: string) => setValue(phoneNumber)}
              />
            </Flex> */}
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
            <Flex align="center" gap="20px" width="100%" overflow="hidden">
              <BtnDetails
                style={{
                  backgroundColor: "var(--primary-light-color)",
                  border: "1px solid var(--primary-color)",
                  cursor: "default",
                }}
              >
                <Flex>
                  <Text
                    weight={500}
                    size={15}
                    whiteSpace="nowrap"
                    type="p"
                    text="The 2nd Guest"
                  ></Text>
                </Flex>
              </BtnDetails>
              <Flex>
                <Divider style={{ width: "100%" }} />
              </Flex>
            </Flex>
          </Flex>
          <Span>
            {isGridVisible && (
              <GridLayout>
                <Section>
                  <Text
                    type="p"
                    text="First Name"
                    margin=".7rem 0 .2rem"
                    size="16px"
                  />
                  <Input placeholder="Enter First Name" height="3rem" />
                </Section>
                <Section>
                  <Text
                    type="p"
                    text="Last Name"
                    margin=".7rem 0 .2rem"
                    size="16px"
                  />
                  <Input placeholder="Enter Last Name" height="3rem" />
                </Section>
              </GridLayout>
            )}

            <Flex
              align="center"
              gap="10px"
              margin="8px 0px"
              onClick={handleToggleGrid}
              styles={{ cursor: "pointer" }}
            >
              {isGridVisible ? (
                <FaUserMinus style={{ fontSize: "20px" }} />
              ) : (
                <FaUserPlus style={{ fontSize: "20px" }} />
              )}
              <Text
                weight={500}
                type="p"
                text={
                  isGridVisible
                    ? "Remove name(s) of other guests"
                    : "Add name(s) of other guests"
                }
              />
            </Flex>
          </Span>

          <Span>
            <Flex
              align="center"
              gap="10px"
              margin="10px 0px"
              cursor="pointer"
              width="fit-content"
              onClick={handleToggle}
            >
              <Text type="p" weight={600} text="Special Requests"></Text>
              {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </Flex>

            {isExpanded && (
              <Flex direction="column">
                <Flex>
                  <Text
                    type="p"
                    text="Hotel accommodations may consider special requests based on their discretion and availability. If you wish to ensure specific services, kindly reach out to our Customer Support for guaranteed options."
                  ></Text>
                </Flex>
                <Span style={{ marginTop: "20px" }}>
                  <textarea
                    name="text"
                    placeholder="Enter request here"
                    style={{
                      width: "100%",
                      padding: "10px",
                      fontSize: "16px",
                      fontFamily: "var(--poppins-font)",
                      resize: "none",
                      borderRadius: "9px",
                      minHeight: "200px",
                      border: "1px solid var(--color-light-gray)",
                      outlineColor: ttColors.primary,
                      outlineWidth: "1px",
                    }}
                  ></textarea>
                </Span>
              </Flex>
            )}
          </Span>
        </Span>
      </Span>
    </Container>
  );
}

export default CheckingIn;
