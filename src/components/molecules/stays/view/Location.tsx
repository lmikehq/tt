import Flex from "@/components/templates/flex";
import { Container, GridLayout, Header, Span } from "./styles";
import Text from "@/components/atoms/text";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import FlightIcon from "@mui/icons-material/Flight";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MapBox from "./modals/components/MapBox";

const Location = () => {
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
        <Header id="location" style={{ width: "100%", marginBottom: "30px" }}>
          <Flex direction="column">
            <Text
              type="h4"
              text="Location"
              weight={600}
              size={18}
              styles={{
                marginBottom: "10px",
              }}
            ></Text>
            <Text
              type="p"
              size={14}
              color="var(--text-gray-color)"
              text="Black Prince Interchange, London, DA5 1ND, United Kingdom"
            ></Text>
          </Flex>
        </Header>
        {/* MAP */}
        <Span style={{ maxHeight: "350px" }}>
          <MapBox />
        </Span>
        {/*  */}
        <GridLayout className="amenities_grid location_grid">
          <ul style={{ listStyle: "none" }} className="mobile_box">
            <Span style={{ marginBottom: isMobile ? "" : "20px" }}>
              <Flex justify="space-between" cursor="pointer">
                <Flex
                  gap="10px"
                  align="center"
                  className="head_box"
                  onClick={() => toggleBox(0)}
                >
                  <LocationOnIcon style={{ fontSize: "18px" }} />
                  <Text
                    type="h5"
                    size={16}
                    text="What’s Nearby?"
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
                      className="list_box"
                    >
                      <Span></Span>
                      <Span style={{ lineHeight: "27px" }}>
                        <li>
                          <Text
                            type="p"
                            size={14}
                            text="Prince Arthur's Landing - 6km"
                          ></Text>
                        </li>
                        <li>
                          <Text
                            type="p"
                            size={14}
                            text="OLG Casino Thunder Bay - 4km"
                          ></Text>
                        </li>
                        <li>
                          <Text
                            type="p"
                            size={14}
                            text="Lake Superior - 380m"
                          ></Text>
                        </li>
                        <li>
                          <Text
                            type="p"
                            size={14}
                            text="Magnus Theater - 9km"
                          ></Text>
                        </li>
                        <li>
                          <Text
                            type="p"
                            size={14}
                            text="Hillcrest Park - 800m"
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
                  className="list_box"
                >
                  <Span></Span>
                  <Span style={{ lineHeight: "27px" }}>
                    <li>
                      <Text
                        type="p"
                        size={14}
                        text="Prince Arthur's Landing - 6km"
                      ></Text>
                    </li>
                    <li>
                      <Text
                        type="p"
                        size={14}
                        text="OLG Casino Thunder Bay - 4km"
                      ></Text>
                    </li>
                    <li>
                      <Text
                        type="p"
                        size={14}
                        text="Lake Superior - 380m"
                      ></Text>
                    </li>
                    <li>
                      <Text
                        type="p"
                        size={14}
                        text="Magnus Theater - 9km"
                      ></Text>
                    </li>
                    <li>
                      <Text
                        type="p"
                        size={14}
                        text="Hillcrest Park - 800m"
                      ></Text>
                    </li>
                  </Span>
                </Flex>
              )}
            </Span>
          </ul>
          <ul style={{ listStyle: "none" }} className="mobile_box">
            <Span style={{ marginBottom: isMobile ? "" : "20px" }}>
              <Flex justify="space-between" cursor="pointer">
                <Flex
                  gap="10px"
                  align="center"
                  className="head_box"
                  onClick={() => toggleBox(1)}
                >
                  <RestaurantMenuIcon style={{ fontSize: "18px" }} />
                  <Text
                    type="h5"
                    size={16}
                    text="What’s Nearby?"
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
                      className="list_box"
                    >
                      <Span></Span>
                      <Span style={{ lineHeight: "27px" }}>
                        <li>
                          <Text
                            type="p"
                            size={14}
                            text="McDonald's - 10km"
                          ></Text>
                        </li>
                        <li>
                          <Text
                            type="p"
                            size={14}
                            text="Red Lion Smokehouse - 2km"
                          ></Text>
                        </li>
                        <li>
                          <Text
                            type="p"
                            size={14}
                            text="Lakehead_box Beer Co - 600m"
                          ></Text>
                        </li>
                        <li>
                          <Text type="p" size={14} text="On Deck - 8km"></Text>
                        </li>
                        <li>
                          <Text
                            type="p"
                            size={14}
                            text="Madhouse - 950m"
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
                  className="list_box"
                >
                  <Span></Span>
                  <Span style={{ lineHeight: "27px" }}>
                    <li>
                      <Text type="p" size={14} text="McDonald's - 10km"></Text>
                    </li>
                    <li>
                      <Text
                        type="p"
                        size={14}
                        text="Red Lion Smokehouse - 2km"
                      ></Text>
                    </li>
                    <li>
                      <Text
                        type="p"
                        size={14}
                        text="Lakehead_box Beer Co - 600m"
                      ></Text>
                    </li>
                    <li>
                      <Text type="p" size={14} text="On Deck - 8km"></Text>
                    </li>
                    <li>
                      <Text type="p" size={14} text="Madhouse - 950m"></Text>
                    </li>
                  </Span>
                </Flex>
              )}
            </Span>
          </ul>
          <ul style={{ listStyle: "none" }} className="mobile_box">
            <Span style={{ marginBottom: isMobile ? "" : "20px" }}>
              <Flex justify="space-between" cursor="pointer">
                <Flex
                  gap="10px"
                  align="center"
                  className="head_box"
                  onClick={() => toggleBox(2)}
                >
                  <FlightIcon style={{ fontSize: "18px" }} />
                  <Text
                    type="h5"
                    size={16}
                    text="Airports"
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
                      className="list_box"
                    >
                      <Span></Span>
                      <Span style={{ lineHeight: "27px" }}>
                        <li>
                          <Text
                            type="p"
                            size={14}
                            text="Prince Arthur's Landing - 3km"
                          ></Text>
                        </li>
                        <li>
                          <Text
                            type="p"
                            size={14}
                            text="OLG Casino Thunder Bay - 6km"
                          ></Text>
                        </li>
                        <li>
                          <Text
                            type="p"
                            size={14}
                            text="Lake Superior - 8km"
                          ></Text>
                        </li>
                        <li>
                          <Text
                            type="p"
                            size={14}
                            text="Magnus Theater - 14km"
                          ></Text>
                        </li>
                        <li>
                          <Text
                            type="p"
                            size={14}
                            text="Hillcrest Park - 17km"
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
                  className="list_box"
                >
                  <Span></Span>
                  <Span style={{ lineHeight: "27px" }}>
                    <li>
                      <Text
                        type="p"
                        size={14}
                        text="Prince Arthur's Landing - 3km"
                      ></Text>
                    </li>
                    <li>
                      <Text
                        type="p"
                        size={14}
                        text="OLG Casino Thunder Bay - 6km"
                      ></Text>
                    </li>
                    <li>
                      <Text
                        type="p"
                        size={14}
                        text="Lake Superior - 8km"
                      ></Text>
                    </li>
                    <li>
                      <Text
                        type="p"
                        size={14}
                        text="Magnus Theater - 14km"
                      ></Text>
                    </li>
                    <li>
                      <Text
                        type="p"
                        size={14}
                        text="Hillcrest Park - 17km"
                      ></Text>
                    </li>
                  </Span>
                </Flex>
              )}
            </Span>
          </ul>
        </GridLayout>
      </Container>
    </>
  );
};

export default Location;
