import Flex from "@/components/templates/flex";
import { Container, GridLayout, Header, Span } from "./styles";
import Text from "@/components/atoms/text";
import PinDropIcon from "@mui/icons-material/PinDrop";
import BedIcon from "@mui/icons-material/Bed";
import { GiMeal } from "react-icons/gi";
import { FaWheelchair } from "react-icons/fa";
import { PiBabyFill } from "react-icons/pi";
import { LuParkingSquare } from "react-icons/lu";
import WifiIcon from "@mui/icons-material/Wifi";
import TranslateIcon from "@mui/icons-material/Translate";
import PetsIcon from "@mui/icons-material/Pets";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";

const HotelAmenities = () => {
  return (
    <>
      <Container style={{ width: "100%" }}>
        <Header style={{ width: "100%", marginBottom: "30px" }}>
          <Flex direction="column">
            <Text
              type="h4"
              text="Hotel Amenities"
              weight={600}
              styles={{
                whiteSpace: "nowrap",
                textOverflow: "unset",
                width: "100%",
                marginBottom: "10px",
              }}
            ></Text>
            <Text
              type="p"
              size={14}
              color="var(--text-gray-color)"
              text="List of things to benefit from the hotel"
            ></Text>
          </Flex>
        </Header>
        <Span style={{ width: "100%" }}>
          <GridLayout className="amenities_grid">
            <ul style={{ listStyle: "none" }}>
              <Flex gap="10px" align="center">
                <PinDropIcon style={{ fontSize: "18px" }} />
                <Text type="h5" text="General" weight={"bold"}></Text>
              </Flex>
              <Flex
                gap="30px"
                align="flex-start"
                styles={{ marginTop: "10px" }}
              >
                <Span></Span>
                <Span style={{ lineHeight: "27px" }}>
                  <li>
                    <Text type="p" size={14} text="Air conditioning"></Text>
                  </li>
                  <li>
                    <Text
                      type="p"
                      size={14}
                      text="All Spaces Non-Smoking "
                    ></Text>{" "}
                  </li>
                  <li>
                    <Text type="p" size={14} text="Express check"></Text>
                  </li>
                  <li>
                    <Text type="p" size={14} text="Garden"></Text>
                  </li>
                  <li>
                    <Text type="p" size={14} text="Heating"></Text>
                  </li>
                  <li>
                    <Text type="p" size={14} text="Newspapers"></Text>
                  </li>
                  <li>
                    <Text type="p" size={14} text="Reception desk"></Text>
                  </li>
                  <li>
                    <Text type="p" size={14} text="Security guard"></Text>
                  </li>
                  <li>
                    <Text type="p" size={14} text="Smoke-free property"></Text>
                  </li>
                  <li>
                    <Text type="p" size={14} text="Television in lobby"></Text>
                  </li>
                  <li>
                    <Text type="p" size={14} text="Terrace"></Text>
                  </li>
                </Span>
              </Flex>
            </ul>
            <ul style={{ listStyle: "none" }}>
              <Flex gap="10px" align="center">
                <BedIcon style={{ fontSize: "18px" }} />
                <Text type="h5" text="Rooms" weight={"bold"}></Text>
              </Flex>
              <Flex
                gap="30px"
                align="flex-start"
                styles={{ marginTop: "10px" }}
              >
                <Span></Span>
                <Span style={{ lineHeight: "27px" }}>
                  <li>
                    <Text type="p" size={14} text="Cable TV"></Text>
                  </li>
                  <li>
                    <Text type="p" size={14} text="Family room"></Text>{" "}
                  </li>
                  <li>
                    <Text type="p" size={14} text="Non-smoking rooms"></Text>
                  </li>
                  <li>
                    <Text type="p" size={14} text="Room service"></Text>
                  </li>
                  <li>
                    <Text type="p" size={14} text="Shower"></Text>
                  </li>
                  <li>
                    <Text type="p" size={14} text="Shower/Bathtub"></Text>
                  </li>
                  <li>
                    <Text type="p" size={14} text="TV"></Text>
                  </li>
                  <li>
                    <Text type="p" size={14} text="Wardrobe/Closet"></Text>
                  </li>
                </Span>
              </Flex>
            </ul>
            <ul style={{ listStyle: "none" }}>
              <Span style={{ marginBottom: "20px" }}>
                <Flex gap="10px" align="center">
                  <GiMeal style={{ fontSize: "18px" }} />
                  <Text type="h5" text="Meals" weight={"bold"}></Text>
                </Flex>
                <Flex
                  gap="30px"
                  align="flex-start"
                  styles={{ marginTop: "10px" }}
                >
                  <Span></Span>
                  <Span style={{ lineHeight: "27px" }}>
                    <li>
                      <Text type="p" size={14} text="Breakfast"></Text>
                    </li>
                    <li>
                      <Text
                        type="p"
                        size={14}
                        text="Breakfast/lunch to go"
                      ></Text>{" "}
                    </li>
                    <li>
                      <Text type="p" size={14} text="Restaurant"></Text>
                    </li>
                    <li>
                      <Text type="p" size={14} text="Vending machine"></Text>
                    </li>
                  </Span>
                </Flex>
              </Span>
              <Span>
                <Flex gap="10px" align="center">
                  <TranslateIcon style={{ fontSize: "18px" }} />
                  <Text type="h5" text="Language" weight={"bold"}></Text>
                </Flex>
                <Flex
                  gap="30px"
                  align="flex-start"
                  styles={{ marginTop: "10px" }}
                >
                  <Span></Span>
                  <Span style={{ lineHeight: "27px" }}>
                    <li>
                      <Text type="p" size={14} text="English"></Text>
                    </li>
                    <li>
                      <Text type="p" size={14} text="French"></Text>{" "}
                    </li>
                    <li>
                      <Text
                        type="p"
                        size={14}
                        text="Multi-language staff"
                      ></Text>
                    </li>
                  </Span>
                </Flex>
              </Span>
            </ul>
            <ul style={{ listStyle: "none" }}>
              <Span style={{ marginBottom: "20px" }}>
                <Flex gap="10px" align="center">
                  <FaWheelchair style={{ fontSize: "18px" }} />
                  <Text type="h5" text="Accessibility" weight={"bold"}></Text>
                </Flex>
                <Flex
                  gap="30px"
                  align="flex-start"
                  styles={{ marginTop: "10px" }}
                >
                  <Span></Span>
                  <Span style={{ lineHeight: "27px" }}>
                    <li>
                      <Text
                        type="p"
                        size={14}
                        text="Accessibility features"
                      ></Text>
                    </li>
                    <li>
                      <Text
                        type="p"
                        size={14}
                        text="Wheelchair Accessible"
                      ></Text>{" "}
                    </li>
                  </Span>
                </Flex>
              </Span>
            </ul>
            <ul className="listFive" style={{ listStyle: "none" }}>
              <Span style={{ marginBottom: "20px" }}>
                <Flex gap="10px" align="center">
                  <PiBabyFill style={{ fontSize: "18px" }} />
                  <Text type="h5" text="Kids" weight={"bold"}></Text>
                </Flex>
                <Flex
                  gap="30px"
                  align="flex-start"
                  styles={{ marginTop: "10px" }}
                >
                  <Span></Span>
                  <Span style={{ lineHeight: "27px" }}>
                    <li>
                      <Text
                        type="p"
                        size={14}
                        text="Children's playground"
                      ></Text>
                    </li>
                    <li>
                      <Text
                        type="p"
                        size={14}
                        text="Family/Kid Friendly"
                      ></Text>{" "}
                    </li>
                  </Span>
                </Flex>
              </Span>
            </ul>
            <ul className="listSix" style={{ listStyle: "none" }}>
              <Span style={{ marginBottom: "20px" }}>
                <Flex gap="10px" align="center">
                  <LuParkingSquare style={{ fontSize: "18px" }} />
                  <Text type="h5" text="Parking" weight={"bold"}></Text>
                </Flex>
                <Flex
                  gap="30px"
                  align="flex-start"
                  styles={{ marginTop: "10px" }}
                >
                  <Span></Span>
                  <Span style={{ lineHeight: "27px" }}>
                    <li>
                      <Text type="p" size={14} text="Free parking"></Text>
                    </li>
                    <li>
                      <Text type="p" size={14} text="Parking nearby"></Text>{" "}
                    </li>
                  </Span>
                </Flex>
              </Span>
            </ul>
            <ul style={{ listStyle: "none" }}>
              <Span style={{ marginBottom: "20px" }}>
                <Flex gap="10px" align="center">
                  <LocalHospitalOutlinedIcon style={{ fontSize: "18px" }} />
                  <Text
                    type="h5"
                    text="Beauty and Wellness"
                    weight={"bold"}
                  ></Text>
                </Flex>
                <Flex
                  gap="30px"
                  align="flex-start"
                  styles={{ marginTop: "10px" }}
                >
                  <Span></Span>
                  <Span style={{ lineHeight: "27px" }}>
                    <li>
                      <Text type="p" size={14} text="First Aid Kit"></Text>
                    </li>
                  </Span>
                </Flex>
              </Span>
            </ul>
            <ul className="listEight" style={{ listStyle: "none" }}>
              <Span style={{ marginBottom: "20px" }}>
                <Flex gap="10px" align="center">
                  <WifiIcon style={{ fontSize: "18px" }} />
                  <Text type="h5" text="Internet" weight={"bold"}></Text>
                </Flex>
                <Flex
                  gap="30px"
                  align="flex-start"
                  styles={{ marginTop: "10px" }}
                >
                  <Span></Span>
                  <Span style={{ lineHeight: "27px" }}>
                    <li>
                      <Text type="p" size={14} text="Free Wifi"></Text>
                    </li>
                  </Span>
                </Flex>
              </Span>
            </ul>{" "}
            <ul className="listNine" style={{ listStyle: "none" }}>
              <Span style={{ marginBottom: "20px" }}>
                <Flex gap="10px" align="center">
                  <PetsIcon style={{ fontSize: "18px" }} />
                  <Text type="h5" text="Pets" weight={"bold"}></Text>
                </Flex>
                <Flex
                  gap="30px"
                  align="flex-start"
                  styles={{ marginTop: "10px" }}
                >
                  <Span></Span>
                  <Span style={{ lineHeight: "27px" }}>
                    <li>
                      <Text type="p" size={14} text="Pets allowed"></Text>
                    </li>
                  </Span>
                </Flex>
              </Span>
            </ul>
          </GridLayout>
        </Span>
      </Container>
    </>
  );
};

export default HotelAmenities;
