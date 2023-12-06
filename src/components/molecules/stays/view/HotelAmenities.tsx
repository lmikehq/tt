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
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const HotelAmenities = () => {
  const { isMobile } = useScreenResolution();
  //============
  //TOGGLE BOX
  //============
  const [openBoxes, setOpenBoxes] = useState<number[]>([]);

  const toggleBox = (index: number) => {
    setOpenBoxes((prevOpenBoxes) => {
      const isOpen = prevOpenBoxes.includes(index);

      if (isOpen) {
        return prevOpenBoxes.filter((boxIndex) => boxIndex !== index);
      } else {
        return [...prevOpenBoxes, index];
      }
    });
  };

  return (
    <>
      <Container style={{ width: "100%" }}>
        <Header style={{ width: "100%", marginBottom: "30px" }}>
          <Flex direction="column">
            <Text
              type="h4"
              size={17}
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
            <ul style={{ listStyle: "none" }} className="mobile_box">
              <Flex justify="space-between" cursor="pointer">
                <Flex gap="10px" align="center" onClick={() => toggleBox(0)}>
                  <PinDropIcon style={{ fontSize: "18px" }} />
                  <Text
                    type="h5"
                    size={16}
                    whiteSpace="nowrap"
                    text="General"
                    weight={"bold"}
                  ></Text>
                </Flex>
                {isMobile ? (
                  <>
                    {openBoxes.includes(0) ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </>
                ) : (
                  ""
                )}
              </Flex>
              {isMobile && (
                <>
                  {openBoxes.includes(0) && (
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
                            whiteSpace="nowrap"
                            size={14}
                            text="Air conditioning"
                          ></Text>
                        </li>
                        <li>
                          <Text
                            type="p"
                            whiteSpace="nowrap"
                            size={14}
                            text="All Spaces Non-Smoking "
                          ></Text>{" "}
                        </li>
                        <li>
                          <Text
                            type="p"
                            whiteSpace="nowrap"
                            size={14}
                            text="Express check"
                          ></Text>
                        </li>
                        <li>
                          <Text
                            type="p"
                            whiteSpace="nowrap"
                            size={14}
                            text="Garden"
                          ></Text>
                        </li>
                        <li>
                          <Text
                            type="p"
                            whiteSpace="nowrap"
                            size={14}
                            text="Heating"
                          ></Text>
                        </li>
                        <li>
                          <Text
                            type="p"
                            whiteSpace="nowrap"
                            size={14}
                            text="Newspapers"
                          ></Text>
                        </li>
                        <li>
                          <Text
                            type="p"
                            whiteSpace="nowrap"
                            size={14}
                            text="Reception desk"
                          ></Text>
                        </li>
                        <li>
                          <Text
                            type="p"
                            whiteSpace="nowrap"
                            size={14}
                            text="Security guard"
                          ></Text>
                        </li>
                        <li>
                          <Text
                            type="p"
                            whiteSpace="nowrap"
                            size={14}
                            text="Smoke-free property"
                          ></Text>
                        </li>
                        <li>
                          <Text
                            type="p"
                            whiteSpace="nowrap"
                            size={14}
                            text="Television in lobby"
                          ></Text>
                        </li>
                        <li>
                          <Text
                            type="p"
                            whiteSpace="nowrap"
                            size={14}
                            text="Terrace"
                          ></Text>
                        </li>
                      </Span>
                    </Flex>
                  )}
                </>
              )}
              {!isMobile && (
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
                        whiteSpace="nowrap"
                        size={14}
                        text="Air conditioning"
                      ></Text>
                    </li>
                    <li>
                      <Text
                        type="p"
                        size={14}
                        text="All Spaces Non-Smoking "
                      ></Text>{" "}
                    </li>
                    <li>
                      <Text
                        type="p"
                        whiteSpace="nowrap"
                        size={14}
                        text="Express check"
                      ></Text>
                    </li>
                    <li>
                      <Text
                        type="p"
                        whiteSpace="nowrap"
                        size={14}
                        text="Garden"
                      ></Text>
                    </li>
                    <li>
                      <Text
                        type="p"
                        whiteSpace="nowrap"
                        size={14}
                        text="Heating"
                      ></Text>
                    </li>
                    <li>
                      <Text
                        type="p"
                        whiteSpace="nowrap"
                        size={14}
                        text="Newspapers"
                      ></Text>
                    </li>
                    <li>
                      <Text
                        type="p"
                        whiteSpace="nowrap"
                        size={14}
                        text="Reception desk"
                      ></Text>
                    </li>
                    <li>
                      <Text
                        type="p"
                        whiteSpace="nowrap"
                        size={14}
                        text="Security guard"
                      ></Text>
                    </li>
                    <li>
                      <Text
                        type="p"
                        size={14}
                        text="Smoke-free property"
                      ></Text>
                    </li>
                    <li>
                      <Text
                        type="p"
                        size={14}
                        text="Television in lobby"
                      ></Text>
                    </li>
                    <li>
                      <Text
                        type="p"
                        whiteSpace="nowrap"
                        size={14}
                        text="Terrace"
                      ></Text>
                    </li>
                  </Span>
                </Flex>
              )}
            </ul>
            <ul style={{ listStyle: "none" }} className="mobile_box">
              <Flex justify="space-between" cursor="pointer">
                <Flex gap="10px" align="center" onClick={() => toggleBox(1)}>
                  <BedIcon style={{ fontSize: "18px" }} />
                  <Text
                    type="h5"
                    size={16}
                    whiteSpace="nowrap"
                    text="Rooms"
                    weight={"bold"}
                  ></Text>
                </Flex>
                {isMobile ? (
                  <>
                    {openBoxes.includes(1) ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </>
                ) : (
                  ""
                )}
              </Flex>
              {isMobile && (
                <>
                  {openBoxes.includes(1) && (
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
                            whiteSpace="nowrap"
                            size={14}
                            text="Cable TV"
                          ></Text>
                        </li>
                        <li>
                          <Text
                            type="p"
                            whiteSpace="nowrap"
                            size={14}
                            text="Family room"
                          ></Text>{" "}
                        </li>
                        <li>
                          <Text
                            type="p"
                            whiteSpace="nowrap"
                            size={14}
                            text="Non-smoking rooms"
                          ></Text>
                        </li>
                        <li>
                          <Text
                            type="p"
                            whiteSpace="nowrap"
                            size={14}
                            text="Room service"
                          ></Text>
                        </li>
                        <li>
                          <Text
                            type="p"
                            whiteSpace="nowrap"
                            size={14}
                            text="Shower"
                          ></Text>
                        </li>
                        <li>
                          <Text
                            type="p"
                            whiteSpace="nowrap"
                            size={14}
                            text="Shower/Bathtub"
                          ></Text>
                        </li>
                        <li>
                          <Text
                            type="p"
                            whiteSpace="nowrap"
                            size={14}
                            text="TV"
                          ></Text>
                        </li>
                        <li>
                          <Text
                            type="p"
                            whiteSpace="nowrap"
                            size={14}
                            text="Wardrobe/Closet"
                          ></Text>
                        </li>
                      </Span>
                    </Flex>
                  )}
                </>
              )}
              {!isMobile && (
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
                        whiteSpace="nowrap"
                        size={14}
                        text="Cable TV"
                      ></Text>
                    </li>
                    <li>
                      <Text
                        type="p"
                        whiteSpace="nowrap"
                        size={14}
                        text="Family room"
                      ></Text>{" "}
                    </li>
                    <li>
                      <Text
                        type="p"
                        whiteSpace="nowrap"
                        size={14}
                        text="Non-smoking rooms"
                      ></Text>
                    </li>
                    <li>
                      <Text
                        type="p"
                        whiteSpace="nowrap"
                        size={14}
                        text="Room service"
                      ></Text>
                    </li>
                    <li>
                      <Text
                        type="p"
                        whiteSpace="nowrap"
                        size={14}
                        text="Shower"
                      ></Text>
                    </li>
                    <li>
                      <Text
                        type="p"
                        whiteSpace="nowrap"
                        size={14}
                        text="Shower/Bathtub"
                      ></Text>
                    </li>
                    <li>
                      <Text
                        type="p"
                        whiteSpace="nowrap"
                        size={14}
                        text="TV"
                      ></Text>
                    </li>
                    <li>
                      <Text
                        type="p"
                        whiteSpace="nowrap"
                        size={14}
                        text="Wardrobe/Closet"
                      ></Text>
                    </li>
                  </Span>
                </Flex>
              )}
            </ul>
            <ul style={{ listStyle: "none" }}>
              <Span style={{ marginBottom: "20px" }} className="mobile_box">
                <Flex justify="space-between">
                  <Flex gap="10px" align="center" onClick={() => toggleBox(2)}>
                    <GiMeal style={{ fontSize: "18px" }} />
                    <Text
                      type="h5"
                      size={16}
                      whiteSpace="nowrap"
                      text="Meals"
                      weight={"bold"}
                    ></Text>
                  </Flex>
                  {isMobile ? (
                    <>
                      {openBoxes.includes(2) ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </Flex>
                {isMobile && (
                  <>
                    {openBoxes.includes(2) && (
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
                              whiteSpace="nowrap"
                              size={14}
                              text="Breakfast"
                            ></Text>
                          </li>
                          <li>
                            <Text
                              type="p"
                              size={14}
                              text="Breakfast/lunch to go"
                            ></Text>{" "}
                          </li>
                          <li>
                            <Text
                              type="p"
                              whiteSpace="nowrap"
                              size={14}
                              text="Restaurant"
                            ></Text>
                          </li>
                          <li>
                            <Text
                              type="p"
                              size={14}
                              text="Vending machine"
                            ></Text>
                          </li>
                        </Span>
                      </Flex>
                    )}
                  </>
                )}
                {!isMobile && (
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
                          whiteSpace="nowrap"
                          size={14}
                          text="Breakfast"
                        ></Text>
                      </li>
                      <li>
                        <Text
                          type="p"
                          size={14}
                          text="Breakfast/lunch to go"
                        ></Text>{" "}
                      </li>
                      <li>
                        <Text
                          type="p"
                          whiteSpace="nowrap"
                          size={14}
                          text="Restaurant"
                        ></Text>
                      </li>
                      <li>
                        <Text
                          type="p"
                          whiteSpace="nowrap"
                          size={14}
                          text="Vending machine"
                        ></Text>
                      </li>
                    </Span>
                  </Flex>
                )}
              </Span>
              <Span className="mobile_box">
                <Flex justify="space-between">
                  <Flex gap="10px" align="center" onClick={() => toggleBox(3)}>
                    <TranslateIcon style={{ fontSize: "18px" }} />
                    <Text
                      type="h5"
                      size={16}
                      whiteSpace="nowrap"
                      text="Language"
                      weight={"bold"}
                    ></Text>
                  </Flex>
                  {isMobile ? (
                    <>
                      {openBoxes.includes(3) ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </Flex>
                {isMobile && (
                  <>
                    {openBoxes.includes(3) && (
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
                              whiteSpace="nowrap"
                              size={14}
                              text="English"
                            ></Text>
                          </li>
                          <li>
                            <Text
                              type="p"
                              whiteSpace="nowrap"
                              size={14}
                              text="French"
                            ></Text>{" "}
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
                    )}
                  </>
                )}
                {!isMobile && (
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
                          whiteSpace="nowrap"
                          size={14}
                          text="English"
                        ></Text>
                      </li>
                      <li>
                        <Text
                          type="p"
                          whiteSpace="nowrap"
                          size={14}
                          text="French"
                        ></Text>{" "}
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
                )}
              </Span>
            </ul>
            <ul style={{ listStyle: "none" }} className="mobile_box">
              <Flex justify="space-between">
                <Flex gap="10px" align="center" onClick={() => toggleBox(4)}>
                  <FaWheelchair style={{ fontSize: "18px" }} />
                  <Text
                    type="h5"
                    size={16}
                    whiteSpace="nowrap"
                    text="Accessibility"
                    weight={"bold"}
                  ></Text>
                </Flex>
                {isMobile ? (
                  <>
                    {openBoxes.includes(4) ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </>
                ) : (
                  ""
                )}
              </Flex>
              {isMobile && (
                <>
                  {openBoxes.includes(4) && (
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
                            whiteSpace="nowrap"
                            size={14}
                            text="Accessibility features"
                          ></Text>
                        </li>
                        <li>
                          <Text
                            type="p"
                            whiteSpace="nowrap"
                            size={14}
                            text="Wheelchair Accessible"
                          ></Text>{" "}
                        </li>
                      </Span>
                    </Flex>
                  )}
                </>
              )}
              {!isMobile && (
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
              )}
            </ul>
            <ul className="listFive mobile_box" style={{ listStyle: "none" }}>
              <Flex justify="space-between">
                <Flex gap="10px" align="center" onClick={() => toggleBox(5)}>
                  <PiBabyFill style={{ fontSize: "18px" }} />
                  <Text
                    type="h5"
                    size={16}
                    whiteSpace="nowrap"
                    text="Kids"
                    weight={"bold"}
                  ></Text>
                </Flex>
                {isMobile ? (
                  <>
                    {openBoxes.includes(5) ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </>
                ) : (
                  ""
                )}
              </Flex>
              {isMobile && (
                <>
                  {openBoxes.includes(5) && (
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
                            whiteSpace="nowrap"
                            size={14}
                            text="Children's playground"
                          ></Text>
                        </li>
                        <li>
                          <Text
                            type="p"
                            whiteSpace="nowrap"
                            size={14}
                            text="Family/Kid Friendly"
                          ></Text>{" "}
                        </li>
                      </Span>
                    </Flex>
                  )}
                </>
              )}
              {!isMobile && (
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
              )}
            </ul>
            <ul className="listSix mobile_box" style={{ listStyle: "none" }}>
              <Flex justify="space-between">
                <Flex gap="10px" align="center" onClick={() => toggleBox(6)}>
                  <LuParkingSquare style={{ fontSize: "18px" }} />
                  <Text
                    type="h5"
                    size={16}
                    whiteSpace="nowrap"
                    text="Parking"
                    weight={"bold"}
                  ></Text>
                </Flex>
                {isMobile ? (
                  <>
                    {openBoxes.includes(6) ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </>
                ) : (
                  ""
                )}
              </Flex>
              {isMobile && (
                <>
                  {openBoxes.includes(6) && (
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
                            whiteSpace="nowrap"
                            size={14}
                            text="Free parking"
                          ></Text>
                        </li>
                        <li>
                          <Text
                            type="p"
                            whiteSpace="nowrap"
                            size={14}
                            text="Parking nearby"
                          ></Text>{" "}
                        </li>
                      </Span>
                    </Flex>
                  )}
                </>
              )}
              {!isMobile && (
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
                        whiteSpace="nowrap"
                        size={14}
                        text="Free parking"
                      ></Text>
                    </li>
                    <li>
                      <Text
                        type="p"
                        whiteSpace="nowrap"
                        size={14}
                        text="Parking nearby"
                      ></Text>{" "}
                    </li>
                  </Span>
                </Flex>
              )}
            </ul>
            <ul style={{ listStyle: "none" }} className="mobile_box">
              <Flex justify="space-between">
                <Flex gap="10px" align="center" onClick={() => toggleBox(7)}>
                  <LocalHospitalOutlinedIcon style={{ fontSize: "18px" }} />
                  <Text
                    type="h5"
                    size={16}
                    text="Beauty and Wellness"
                    weight={"bold"}
                  ></Text>
                </Flex>
                {isMobile ? (
                  <>
                    {openBoxes.includes(7) ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </>
                ) : (
                  ""
                )}
              </Flex>
              {isMobile && (
                <>
                  {openBoxes.includes(7) && (
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
                            whiteSpace="nowrap"
                            size={14}
                            text="First Aid Kit"
                          ></Text>
                        </li>
                      </Span>
                    </Flex>
                  )}
                </>
              )}
              {!isMobile && (
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
                        whiteSpace="nowrap"
                        size={14}
                        text="First Aid Kit"
                      ></Text>
                    </li>
                  </Span>
                </Flex>
              )}
            </ul>
            <ul className="listEight mobile_box" style={{ listStyle: "none" }}>
              <Flex justify="space-between">
                <Flex gap="10px" align="center" onClick={() => toggleBox(8)}>
                  <WifiIcon style={{ fontSize: "18px" }} />
                  <Text
                    type="h5"
                    size={16}
                    whiteSpace="nowrap"
                    text="Internet"
                    weight={"bold"}
                  ></Text>
                </Flex>
                {isMobile ? (
                  <>
                    {openBoxes.includes(8) ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </>
                ) : (
                  ""
                )}
              </Flex>
              {isMobile && (
                <>
                  {openBoxes.includes(8) && (
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
                            whiteSpace="nowrap"
                            size={14}
                            text="Free Wifi"
                          ></Text>
                        </li>
                      </Span>
                    </Flex>
                  )}
                </>
              )}
              {!isMobile && (
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
                        whiteSpace="nowrap"
                        size={14}
                        text="Free Wifi"
                      ></Text>
                    </li>
                  </Span>
                </Flex>
              )}
            </ul>{" "}
            <ul className="listNine mobile_box" style={{ listStyle: "none" }}>
              <Flex justify="space-between" cursor="pointer">
                <Flex gap="10px" align="center" onClick={() => toggleBox(9)}>
                  <PetsIcon style={{ fontSize: "18px" }} />
                  <Text
                    type="h5"
                    size={16}
                    whiteSpace="nowrap"
                    text="Pets"
                    weight={"bold"}
                  ></Text>
                </Flex>
                {isMobile ? (
                  <>
                    {openBoxes.includes(9) ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </>
                ) : (
                  ""
                )}
              </Flex>
              {isMobile && (
                <>
                  {openBoxes.includes(9) && (
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
                            whiteSpace="nowrap"
                            size={14}
                            text="Pets allowed"
                          ></Text>
                        </li>
                      </Span>
                    </Flex>
                  )}
                </>
              )}
              {!isMobile && (
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
                        whiteSpace="nowrap"
                        size={14}
                        text="Pets allowed"
                      ></Text>
                    </li>
                  </Span>
                </Flex>
              )}
            </ul>
          </GridLayout>
        </Span>
      </Container>
    </>
  );
};

export default HotelAmenities;
