import styled from "styled-components";
import NoVisaApplication from "./noApplication";
import VisaDashboardHeader from "./visaDashboardHeader";
import NoVisaBg from "@image/background.png";
import FlightImg from "@image/flight.png";
import Text from "@atom/text";
import Image from "@atom/image";
import FlightIcon from "@image/flightBooking.png";
import { ttColors } from "@lib/theme/colors";

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

    width: 100%;
    height: 311px;
    border: 1px solid #e7e7e7;
    border-radius: 14px;
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
`;

const Flight = () => {
    const content = {
        title: "You’ve booked no Flight Ticket yet - Let’s help you get Started",
        links: [
            { text: "Search Tickets", url: "/flight" },
            { text: "Search Stays", url: "/stays" },
        ],
    };

    // function NoFlightImg() {
    //   return <Image src="/assets/images/flight.png" alt="" />;
    // }

    return (
        <FlightWrapper>
            <VisaDashboardHeader headerText="All Flight Applications" />
            <NoVisaApplication
                noVisaImage={"/assets/images/flight.png"}
                content={content}
            />
            {/* <Flex direction="column" gap="1rem">
        <History>
          <Flex
            justify="space-between"
            width="100%"
            gap="1rem"
            align="center"
            padding="28px 24px"
          >
            <Flex gap="1.5rem" align="center">
              <Flex direction="column" align="center" width="10%">
                <Text type="h1" text="25" size={48} weight={600} />
                <Text
                  type="p"
                  text="Aug"
                  size={20}
                  weight={200}
                  styles={{ position: "relative", top: "-10px" }}
                />
              </Flex>
              <Flex justify="flex-start">
                <Flex direction="column">
                  <Text
                    type="h3"
                    text="Murtala Muhammed Airport"
                    margin="0px 0px .5rem"
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
                <Text type="p" text="LAG" color="#929292" />
              </Flex>
            </Flex>

            <Flex direction="column" align="center" gap="1rem">
              <Image src={FlightIcon} alt="" width={119} height={20} />
              <TextContainer>
                <Text type="p" text="3 Stops" />
              </TextContainer>
            </Flex>

            <Flex gap="0rem" align="center">
              <Flex justify="flex-start">
                <Flex direction="column">
                  <Text
                    type="h3"
                    text="Murtala Muhammed Airport"
                    margin="0px 0px .5rem"
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
                <Text type="p" text="DUS" color="#929292" />
              </Flex>
              <Flex direction="column" align="flex-start" width="20%">
                <Text
                  type="h3"
                  text="DEPART"
                  size={28}
                  weight={600}
                  color="#7BBBD6"
                  styles={{
                    transform: "rotate(-90deg)",
                  }}
                />
              </Flex>
            </Flex>
          </Flex>

          <Flex
            justify="space-between"
            width="100%"
            gap="1rem"
            align="center"
            padding="28px 24px"
          >
            <Flex gap="1.5rem" align="center">
              <Flex direction="column" align="center" width="10%">
                <Text type="h1" text="12" size={48} weight={600} />
                <Text
                  type="p"
                  text="Sept"
                  size={20}
                  weight={200}
                  styles={{ position: "relative", top: "-10px" }}
                />
              </Flex>
              <Flex justify="flex-start">
                <Flex direction="column">
                  <Text
                    type="h3"
                    text="Murtala Muhammed Airport"
                    margin="0px 0px .5rem"
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
                <Text type="p" text="LAG" color="#929292" />
              </Flex>
            </Flex>

            <Flex direction="column" align="center" gap="1rem">
              <Image src={FlightIcon} alt="" width={119} height={20} />
              <TextContainer>
                <Text type="p" text="3 Stops" />
              </TextContainer>
            </Flex>

            <Flex gap="0rem" align="center">
              <Flex justify="flex-start">
                <Flex direction="column">
                  <Text
                    type="h3"
                    text="Murtala Muhammed Airport"
                    margin="0px 0px .5rem"
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
                <Text type="p" text="DUS" color="#929292" />
              </Flex>
              <Flex direction="column" align="flex-start" width="20%">
                <Text
                  type="h3"
                  text="RETURN"
                  size={28}
                  weight={600}
                  color="#7BBBD6"
                  styles={{
                    transform: "rotate(-90deg)",
                  }}
                />
              </Flex>
            </Flex>
          </Flex>
        </History>
      </Flex> */}
        </FlightWrapper>
    );
};

export default Flight;
