import styled from "styled-components";
import Text from "@atom/text";
import { ttColors } from "theme/colors";
import Flex from "@atom/flex";
import { Grid } from "@atom/grid";
import Button from "@atom/button";
import { useScreenResolution } from "hook/useScreenResolution";
import { FaFileDownload } from "react-icons/fa";
import VisaDashboardHeader from "./visaDashboardHeader";
import Section from "@molecule/section";
import FlightIcon from "@image/flightBooking.png";
import Image from "@atom/image";



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

const Notification = () => {
  const { isMobile } = useScreenResolution();

  return (
    <Section
      margin="10x 0"
      styles={{
        borderRadius: "14px",
        padding: ".5rem 1.5rem",
      }}
    >
      <VisaDashboardHeader headerText="All Flight Applications" />

      <NotificationWrapper>
        <Flex direction="column" gap="1rem">
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
        </Flex>
      </NotificationWrapper>
    </Section>
  );
};

export default Notification;
