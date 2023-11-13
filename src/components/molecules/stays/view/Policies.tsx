import Text from "@/components/atoms/text";
import { Container, GridLayout, Header, Span } from "./styles";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import Flex from "@/components/templates/flex";
import PetsIcon from "@mui/icons-material/Pets";
import { ttColors } from "@/lib/theme/colors";
import { PiBabyFill } from "react-icons/pi";

const Policies = () => {
  return (
    <>
      <Container style={{ padding: "25px" }}>
        <Span>
          <Header>
            <Text type="h4" weight={"bold"} text="Policies"></Text>
          </Header>
          <GridLayout style={{ justifyContent: "space-between" }}>
            <ul>
              <Text type="h5" text="Check-In" weight={"bold"}></Text>
              <Flex
                gap="30px"
                align="flex-start"
                styles={{ marginTop: "10px", color: "var(--text-gray-color)" }}
              >
                <WatchLaterIcon
                  style={{ fontSize: "16px", position: "relative", top: "5px" }}
                />
                <Span>
                  <li>
                    <Text
                      type="p"
                      size={14}
                      text="Check-in from 3 PM - midnight"
                    ></Text>
                  </li>
                  <li>
                    {" "}
                    <Text
                      type="p"
                      size={14}
                      text=" Late check-in subject to availability"
                    ></Text>{" "}
                  </li>
                  <li>
                    <Text
                      type="p"
                      size={14}
                      text="Express check-in available"
                    ></Text>
                  </li>
                  <li>
                    <Text
                      type="p"
                      size={14}
                      text="Minimum check-in age: 18"
                    ></Text>
                  </li>
                </Span>
              </Flex>
            </ul>
            <ul>
              <Text type="h5" text="Check-Out" weight={"bold"}></Text>
              <Flex
                gap="30px"
                align="flex-start"
                styles={{ marginTop: "10px", color: "var(--text-gray-color)" }}
              >
                <WatchLaterIcon
                  style={{ fontSize: "16px", position: "relative", top: "5px" }}
                />
                <Span>
                  <li>
                    <Text
                      type="p"
                      size={14}
                      text="Check-out before noon"
                    ></Text>
                  </li>
                  <li>
                    <Text
                      type="p"
                      size={14}
                      text="Late check-out subject to availability"
                    ></Text>
                  </li>
                  <li>
                    <Text
                      type="p"
                      size={14}
                      text="A late check-out fee will be charged"
                    ></Text>
                  </li>
                  <li>
                    <Text
                      type="p"
                      size={14}
                      text="Express check-out available"
                    ></Text>
                  </li>
                </Span>{" "}
              </Flex>
            </ul>
            <ul>
              <Text type="h5" text="Pets" weight={"bold"}></Text>
              <Flex
                gap="30px"
                align="flex-start"
                styles={{ marginTop: "10px", color: "var(--text-gray-color)" }}
              >
                <PetsIcon
                  style={{ fontSize: "16px", position: "relative", top: "5px" }}
                />
                <Span>
                  <li>
                    <Text
                      type="p"
                      size={14}
                      text="Pets are charged of GBP 40.00"
                    ></Text>{" "}
                  </li>
                  <li>
                    <Text
                      type="p"
                      size={14}
                      text="Service animals are welcome"
                    ></Text>
                  </li>
                  <li>
                    <Text
                      type="p"
                      size={14}
                      text="There is Food and water bowls"
                    ></Text>{" "}
                  </li>
                </Span>
              </Flex>
            </ul>
            <ul>
              <Text type="h5" text="Kids" weight={"bold"}></Text>
              <Flex
                gap="30px"
                align="flex-start"
                styles={{ marginTop: "10px", color: "var(--text-gray-color)" }}
              >
                <PiBabyFill
                  style={{ fontSize: "20px", position: "relative", top: "5px" }}
                />
                <Span>
                  <li>
                    <Text type="p" size={14} text="Children are welcome"></Text>
                  </li>
                  <li>
                    <Text
                      type="p"
                      size={14}
                      text="Rollaway/extra beds are available for GBP 80.0 per night"
                    ></Text>
                  </li>
                </Span>
              </Flex>
            </ul>
          </GridLayout>
        </Span>
        <Span style={{ marginTop: "30px" }}>
          <Header>
            <Text type="h4" size={15} weight={"bold"} text="Payment"></Text>
          </Header>
          <Span style={{ marginBottom: "20px" }}>
            <Flex gap="20px" align="center">
              <img
                style={{ width: "40px", height: "40px" }}
                src="/assets/images/stays/express.png"
                alt=""
              />
              <img
                style={{ height: "40px" }}
                src="/assets/images/stays/dinners.png"
                alt=""
              />
              <img
                style={{ width: "40px", height: "40px" }}
                src="/assets/images/stays/jcb.jpeg"
                alt=""
              />
              <img
                style={{ height: "40px" }}
                src="/assets/images/stays/master.png"
                alt=""
              />
              <img
                style={{ height: "65px" }}
                src="/assets/images/stays/visa.png"
                alt=""
              />
            </Flex>
          </Span>
          <Span>
            <ul>
              <Text
                type="h5"
                text="Additional Information"
                weight={"bold"}
              ></Text>
              <Flex
                gap="30px"
                align="flex-start"
                styles={{ marginTop: "10px", color: "var(--text-gray-color)" }}
              >
                <StickyNote2Icon
                  style={{ fontSize: "16px", position: "relative", top: "5px" }}
                />
                <Span>
                  <li>
                    <Text
                      type="p"
                      size={14}
                      text="Taxes and fees are paid only by bank card."
                    ></Text>
                  </li>
                  <li>
                    <Text
                      type="p"
                      size={14}
                      text="The reception is open around the clock, however, if a guest plans to check in after 8:00 PM, it is necessary to call the hotel and notify in advance."
                    ></Text>{" "}
                  </li>
                  <li>
                    <Text
                      type="p"
                      size={14}
                      text="To check-in to the hotel, guests should provide a certificate of COVID-19 vaccination."
                    ></Text>
                  </li>
                  <li>
                    <Text
                      type="p"
                      size={14}
                      text="Extra-person charges may apply and vary depending on property policy"
                    ></Text>
                  </li>
                  <li>
                    <Text
                      type="p"
                      size={14}
                      text="Government-issued photo identification and a credit card, debit card, or cash deposit may be required at check-in for incidental charges"
                    ></Text>
                  </li>
                  <li>
                    <Text
                      type="p"
                      size={14}
                      text="This property accepts credit cards, debit cards, and cash"
                    ></Text>
                  </li>
                  <li>
                    <Text
                      type="p"
                      size={14}
                      text="Safety features at this property include a carbon monoxide detector, a fire extinguisher, a smoke detector, a security system, and a first aid kit"
                    ></Text>
                  </li>
                </Span>
              </Flex>
            </ul>
          </Span>
        </Span>
      </Container>
    </>
  );
};

export default Policies;
