import { styled } from "styled-components";
import Section from "@molecule/section";
import { useState } from "react";
import Flex from "@atom/flex";
import Text from "@atom/text";
import ShowButton from "@atom/showButton";

const Box = styled.div<{ color: string; border: string }>`
  border: 3px solid ${(props) => props.border};
  background: ${(props) => props.color};
  width: 100%;
  height: 100%;
  padding: 3rem 0;
  border-width: 3px 0px;

  &:first-child {
    border-top: 0;
  }

  &:last-child {
    border-bottom: 0;
  }
`;

const BlueText = styled.div`
  color: #4a7181;
  font-weight: 400;
  font-size: 18px;
  width: 52%;
`;

interface BoxTypes {
  box1: boolean;
  box2: boolean;
  box3: boolean;
  box4: boolean;
}

function FAQ() {
  const [box, setBox] = useState<BoxTypes>({
    box1: true,
    box2: false,
    box3: false,
    box4: false,
  });

  const handleClick = (box: keyof BoxTypes) => {
    setBox((prev) => ({
      ...prev,
      [box]: !prev[box],
    }));
  };

  return (
    <Section padding="2rem 0">
      <Box
        color={box.box1 ? "#F3FAFD" : "white"}
        border={box.box1 ? "#7BBBD6" : "#CDD6DA40"}
      >
        <Flex direction="column" gap=".75rem">
          <Flex align="center" justify="space-around">
            <Text
              type="h1"
              text="01"
              size={48}
              weight={700}
              color={box.box1 ? "#6092A7" : "#3C3C4380"}
            />
            <Flex width="52%">
              <Text
                type="h1"
                text="Can I modify or cancel my booking after confirmation?"
                size={32}
                weight={box.box1 ? 700 : 500}
                color={box.box1 ? "#6092A7" : "#3C3C4380"}
              />
            </Flex>
            <ShowButton
              active={box.box1}
              handleClick={() => handleClick("box1")}
            />
          </Flex>
          <Flex justify="center">
            {box.box1 && (
              <BlueText>
                Yes, you can often modify or cancel bookings, but this may be
                subject to property policies and timelines. Check the specific
                booking details for information about modifications and
                cancellations.
              </BlueText>
            )}
          </Flex>
        </Flex>
      </Box>
      <Box
        color={box.box2 ? "#F3FAFD" : "white"}
        border={box.box2 ? "#7BBBD6" : "#CDD6DA40"}
      >
        <Flex direction="column" gap=".75rem">
          <Flex align="center" justify="space-around">
            <Text
              type="h1"
              text="02"
              size={48}
              weight={700}
              color={box.box2 ? "#6092A7" : "#3C3C4380"}
            />
            <Flex width="52%">
              <Text
                type="h1"
                text="Is my personal information safe when booking?
                  "
                size={32}
                weight={box.box2 ? 700 : 500}
                color={box.box2 ? "#6092A7" : "#3C3C4380"}
                whiteSpace="nowrap"
              />
            </Flex>
            <ShowButton
              active={box.box2}
              handleClick={() => handleClick("box2")}
            />
          </Flex>
          <Flex justify="center">
            {box.box2 && (
              <BlueText>
                Yes, we prioritize your privacy. Our website employs advanced
                security measures to protect your personal and
                payment information.
              </BlueText>
            )}
          </Flex>
        </Flex>
      </Box>
      <Box
        color={box.box3 ? "#F3FAFD" : "white"}
        border={box.box3 ? "#7BBBD6" : "#CDD6DA40"}
      >
        <Flex direction="column" gap=".75rem">
          <Flex align="center" justify="space-around">
            <Text
              type="h1"
              text="03"
              size={48}
              weight={700}
              color={box.box3 ? "#6092A7" : "#3C3C4380"}
            />
            <Flex width="52%">
              <Text
                type="h1"
                text="How will I receive confirmation of my booking?
                "
                size={32}
                weight={box.box3 ? 700 : 500}
                color={box.box3 ? "#6092A7" : "#3C3C4380"}
                whiteSpace="nowrap"
              />
            </Flex>
            <ShowButton
              active={box.box3}
              handleClick={() => handleClick("box3")}
            />
          </Flex>
          <Flex justify="center">
            {box.box3 && (
              <BlueText>
                After completing your booking, you'll receive an email
                confirmation with all the details you need, including check-in
                instructions and contact information for the property.
              </BlueText>
            )}
          </Flex>
        </Flex>
      </Box>
      <Box
        color={box.box4 ? "#F3FAFD" : "white"}
        border={box.box4 ? "#7BBBD6" : "#CDD6DA40"}
      >
        <Flex direction="column" gap=".75rem">
          <Flex align="center" justify="space-around">
            <Text
              type="h1"
              text="04"
              size={48}
              weight={700}
              color={box.box4 ? "#6092A7" : "#3C3C4380"}
            />
            <Flex width="52.5%">
              <Text
                type="h1"
                text="What happens if I arrive late for check-in?
                "
                size={32}
                weight={box.box4 ? 700 : 500}
                color={box.box4 ? "#6092A7" : "#3C3C4380"}
              />
            </Flex>
            <ShowButton
              active={box.box4}
              handleClick={() => handleClick("box4")}
            />
          </Flex>
          <Flex justify="center">
            {box.box4 && (
              <BlueText>
                If you anticipate arriving late, it's a good idea to inform the
                property in advance. Many places offer 24/7 check-in options or
                have procedures for late arrivals.
              </BlueText>
            )}
          </Flex>
        </Flex>
      </Box>
    </Section>
  );
}

export default FAQ;
