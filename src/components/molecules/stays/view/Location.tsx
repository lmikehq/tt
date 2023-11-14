import Flex from "@/components/templates/flex";
import { Container, GridLayout, Header, MapBox, Span } from "./styles";
import Text from "@/components/atoms/text";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import FlightIcon from "@mui/icons-material/Flight";

const Location = () => {
  return (
    <>
      <Container style={{ width: "100%" }}>
        <Header id="location" style={{ width: "100%", marginBottom: "30px" }}>
          <Flex direction="column">
            <Text
              type="h4"
              text="Location"
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
              text="Black Prince Interchange, London, DA5 1ND, United Kingdom"
            ></Text>
          </Flex>
        </Header>
        <MapBox></MapBox>
        <GridLayout className="amenities_grid location_grid">
          <ul style={{ listStyle: "none" }}>
            <Span style={{ marginBottom: "20px" }}>
              <Flex gap="10px" align="center">
                <LocationOnIcon style={{ fontSize: "18px" }} />
                <Text type="h5" text="What’s Nearby?" weight={"bold"}></Text>
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
                    <Text type="p" size={14} text="Lake Superior - 380m"></Text>
                  </li>
                  <li>
                    <Text type="p" size={14} text="Magnus Theater - 9km"></Text>
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
            </Span>
          </ul>
          <ul style={{ listStyle: "none" }}>
            <Span style={{ marginBottom: "20px" }}>
              <Flex gap="10px" align="center">
                <RestaurantMenuIcon style={{ fontSize: "18px" }} />
                <Text type="h5" text="What’s Nearby?" weight={"bold"}></Text>
              </Flex>
              <Flex
                gap="30px"
                align="flex-start"
                styles={{ marginTop: "10px" }}
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
                      text="Lakehead Beer Co - 600m"
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
            </Span>
          </ul>
          <ul style={{ listStyle: "none" }}>
            <Span style={{ marginBottom: "20px" }}>
              <Flex gap="10px" align="center">
                <FlightIcon style={{ fontSize: "18px" }} />
                <Text type="h5" text="Airports" weight={"bold"}></Text>
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
                    <Text type="p" size={14} text="Lake Superior - 8km"></Text>
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
            </Span>
          </ul>
        </GridLayout>
      </Container>
    </>
  );
};

export default Location;
