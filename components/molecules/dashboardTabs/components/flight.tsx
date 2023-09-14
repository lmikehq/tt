import styled from "styled-components";
import NoVisaApplication from "./noApplication";
import VisaDashboardHeader from "./visaDashboardHeader";
import NoVisaBg from "@image/background.png";
import FlightImg from "@image/flight.png";
import { ttColors } from "theme/colors";
import Flex from "@atom/flex";
import Text from "@atom/text";
import Image from "@atom/image";
import FlightIcon from "@image/flightBooking.png";
import Center from "@atom/center";
import { useScreenResolution } from "hook/useScreenResolution";
import { Divider } from "@atom/divider";

const FlightWrapper = styled.div`
  background: ${ttColors.defaultColor};
  align-items: center;
  margin-top: 15px;

  & button {
    width: 154px !important;
  }

  @media screen and (max-width: 900px) {
    height: fit-content;
    padding: 20px 16px;
  }
`;
const History = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
  padding: 28px 24px;
  height: fit-content;
  border: 1px solid #e7e7e7;
  border-radius: 14px;

  @media screen and (max-width: 900px) {
    padding: 15px;
  }
`;

const NotificationWrapper = styled.div`
  background: ${ttColors.defaultColor};
  align-items: center;
  margin-top: 15px;

  & button {
    width: 154px !important;
  }

  @media screen and (max-width: 900px) {
    height: fit-content;
    padding: 20px 16px;
  }
`;

const TextContainer = styled.div`
  background: #f3f3ff;
  padding: 10px;
  border-radius: 20px;
  width: 88px;
  text-align: center;
  justify-content: center;

  @media screen and (max-width: 900px) {
    padding: 5px;
  }
`;

const Flight = () => {
  const { isMobile } = useScreenResolution();

  const content = {
    title: "You’ve booked no Flight Ticket yet - Let’s help you get Started",
    links: [
      { text: "Search Flights", url: "/flight" },
      { text: "Search Stays", url: "/stays" },
    ],
  };
  return (
    <FlightWrapper>
      <VisaDashboardHeader headerText="All Flight Applications" />

      <Center margin={isMobile ? "3.5rem 0px" : "10rem 0"} height="25rem">
        <NoVisaApplication noVisaImage={FlightImg} content={content} />
      </Center>
      <Flex direction="column" gap="1rem">
        <History>
          <Flex
            justify="space-between"
            width="100%"
            gap="1.2rem"
            align="center"
          >
            <Flex direction="column" align="center" width="5%">
              <Text
                type="h1"
                text="25"
                size={isMobile ? 28 : 48}
                weight={600}
              />
              <Text
                type="p"
                text="Aug"
                size={isMobile ? 16 : 20}
                weight={200}
                styles={{ position: "relative", top: "-10px" }}
              />
            </Flex>

            <Flex direction={isMobile ? "column" : "row"} gap="1.5rem">
              <Flex justify="flex-start">
                <Flex direction="column">
                  <Text
                    type="h3"
                    text="Murtala Muhammed Airport"
                    margin="0px 0px .5rem"
                    size={isMobile ? "13px" : "16px"}
                  />

                  <Text
                    type="p"
                    text="11:25"
                    color="#606060"
                    weight={600}
                    size={isMobile ? "17px" : "20px"}
                    styles={{
                      letterSpacing: "0.1rem",
                    }}
                  />
                </Flex>
                <Text
                  type="p"
                  text="LAG"
                  color="#929292"
                  size={isMobile ? "13px" : "16px"}
                />
              </Flex>

              <Flex
                direction={isMobile ? "row" : "column"}
                align="center"
                gap="1rem"
              >
                <Image src={FlightIcon} alt="" width={119} height={20} />
                <TextContainer>
                  <Text type="p" text="3 Stops" />
                </TextContainer>
              </Flex>

              <Flex justify="flex-start">
                <Flex direction="column">
                  <Text
                    type="h3"
                    text="Murtala Muhammed Airport"
                    margin="0px 0px .5rem"
                    size={isMobile ? "13px" : "16px"}
                  />

                  <Text
                    type="p"
                    text="11:25"
                    color="#606060"
                    weight={600}
                    size={16}
                    styles={{
                      letterSpacing: "0.1rem",
                    }}
                  />
                </Flex>
                <Text
                  type="p"
                  text="DUS"
                  color="#929292"
                  size={isMobile ? "13px" : "16px"}
                />
              </Flex>
            </Flex>

            <Flex direction="column" align="center" width="5%">
              <Text
                type="h3"
                text="DEPART"
                size={isMobile ? 18 : 28}
                weight={600}
                color="#7BBBD6"
                styles={{
                  transform: "rotate(-90deg)",
                }}
              />
            </Flex>
          </Flex>
          <Divider direction="horizontal" margin="1.5rem 0px" />
          <Flex
            justify="space-between"
            width="100%"
            gap="1.2rem"
            align="center"
          >
            <Flex direction="column" align="center" width="5%">
              <Text
                type="h1"
                text="12"
                size={isMobile ? 28 : 48}
                weight={600}
              />
              <Text
                type="p"
                text="Sept"
                size={isMobile ? 16 : 20}
                weight={200}
                styles={{ position: "relative", top: "-10px" }}
              />
            </Flex>

            <Flex direction={isMobile ? "column" : "row"} gap="1.5rem">
              <Flex justify="flex-start">
                <Flex direction="column">
                  <Text
                    type="h3"
                    text="Murtala Muhammed Airport"
                    margin="0px 0px .5rem"
                    size={isMobile ? "13px" : "16px"}
                  />

                  <Text
                    type="p"
                    text="11:25"
                    color="#606060"
                    weight={600}
                    size={isMobile ? "17px" : "20px"}
                    styles={{
                      letterSpacing: "0.1rem",
                    }}
                  />
                </Flex>
                <Text
                  type="p"
                  text="LAG"
                  color="#929292"
                  size={isMobile ? "13px" : "16px"}
                />
              </Flex>

              <Flex
                direction={isMobile ? "row" : "column"}
                align="center"
                gap="1rem"
              >
                <Image src={FlightIcon} alt="" width={119} height={20} />
                <TextContainer>
                  <Text type="p" text="3 Stops" />
                </TextContainer>
              </Flex>

              <Flex justify="flex-start">
                <Flex direction="column">
                  <Text
                    type="h3"
                    text="Murtala Muhammed Airport"
                    margin="0px 0px .5rem"
                    size={isMobile ? "13px" : "16px"}
                  />

                  <Text
                    type="p"
                    text="11:25"
                    color="#606060"
                    weight={600}
                    size={16}
                    styles={{
                      letterSpacing: "0.1rem",
                    }}
                  />
                </Flex>
                <Text
                  type="p"
                  text="DUS"
                  color="#929292"
                  size={isMobile ? "13px" : "16px"}
                />
              </Flex>
            </Flex>

            <Flex direction="column" align="center" width="5%">
              <Text
                type="h3"
                text="RETURN"
                size={isMobile ? 18 : 28}
                weight={600}
                color="#7BBBD6"
                styles={{
                  transform: "rotate(-90deg)",
                }}
              />
            </Flex>
          </Flex>
        </History>
      </Flex>
    </FlightWrapper>
  );
};

export default Flight;
