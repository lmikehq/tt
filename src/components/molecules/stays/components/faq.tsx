import { styled } from "styled-components";
import Section from "src/components/molecules/section";
import { useState } from "react";
import Flex from "@components/templates/flex";
import Text from "@atom/text";
import ShowButton from "@molecule/showButton";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";

const Box = styled.div<{ color: string; border: string }>`
  border: 3px solid ${(props) => props.border};
  background: ${(props) => props.color};
  width: 100%;
  height: 100%;
  padding: 15px 0;
  border-width: 1px 0px;

  &:first-child {
    border-top: 0;
  }

  &:last-child {
    border-bottom: 0;
  }
  @media (max-width: 900px) {
    padding: 1rem;
  }
`;

const BlueText = styled.div`
  color: #4a7181;
  font-weight: 400;
  font-size: 18px;
  width: 52%;
  @media (max-width: 900px) {
    width: 100%;
    font-size: 1rem;
  }
`;

interface BoxTypes {
  box1: boolean;
  box2: boolean;
  box3: boolean;
  box4: boolean;
}

function Faq() {
  const [box, setBox] = useState<BoxTypes>({
    box1: false,
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
  const { isMobile } = useScreenResolution();

  return (
    <Section padding="2rem 0">
      <Box
        color={box.box1 ? "#F3FAFD" : "white"}
        border={box.box1 ? "#7BBBD6" : "#CDD6DA40"}
      >
        <Flex direction="column" gap=".75rem">
          <Flex align="center" justify="space-around">
            {isMobile ? null : (
              <Text
                type="h1"
                text="01"
                size={35}
                weight={700}
                color={box.box1 ? "#6092A7" : "#3C3C4380"}
              />
            )}
            <Flex width={isMobile ? "100%" : "52%"}>
              <Text
                type="h1"
                text="Can I modify or cancel my booking after confirmation?"
                size={isMobile ? 18 : 25}
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
                {`Yes, you can often modify or cancel bookings, but this may be
                subject to property policies and timelines. Check the specific
                booking details for information about modifications and`}
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
            {isMobile ? null : (
              <Text
                type="h1"
                text="02"
                size={35}
                weight={700}
                color={box.box2 ? "#6092A7" : "#3C3C4380"}
              />
            )}
            <Flex width={isMobile ? "100%" : "52%"}>
              <Text
                type="h1"
                text="Is my personal information safe when booking?"
                size={isMobile ? 18 : 25}
                weight={box.box2 ? 700 : 500}
                color={box.box2 ? "#6092A7" : "#3C3C4380"}
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
            {isMobile ? null : (
              <Text
                type="h1"
                text="03"
                size={35}
                weight={700}
                color={box.box3 ? "#6092A7" : "#3C3C4380"}
              />
            )}
            <Flex width={isMobile ? "100%" : "52%"}>
              <Text
                type="h1"
                text="Is my payment information secure on the website?"
                size={isMobile ? 18 : 25}
                weight={box.box3 ? 700 : 500}
                color={box.box3 ? "#6092A7" : "#3C3C4380"}
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
                Yes, your payment information is secure on the website as we
                wouldn’t be asking you for your card credentials. All payment
                will be handled by a 3rd party.
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
            {isMobile ? null : (
              <Text
                type="h1"
                text="04"
                size={35}
                weight={700}
                color={box.box4 ? "#6092A7" : "#3C3C4380"}
              />
            )}
            <Flex width={isMobile ? "100%" : "52%"}>
              <Text
                type="h1"
                text="Can I book hotels and car rentals alongside my flight on the same website?"
                size={isMobile ? 18 : 25}
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
                Yes, you can book hotels and car rentals alongside your flight,
                But for now Thrillers Travels is still working on that and will
                be available for you soon. Stay tuned.
              </BlueText>
            )}
          </Flex>
        </Flex>
      </Box>
    </Section>
  );
}

export default Faq;
