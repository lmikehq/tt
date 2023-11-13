import Flex from "@/components/templates/flex";
import { Container, GridLayout, Header, Span } from "./styles";
import Text from "@/components/atoms/text";
import PinDropIcon from "@mui/icons-material/PinDrop";
import BedIcon from "@mui/icons-material/Bed";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

const DescriptionOfHotel = () => {
  return (
    <>
      <Container style={{ width: "100%" }}>
        <Header style={{ width: "100%", marginBottom: "30px" }}>
          <Flex direction="column">
            <Text
              type="h4"
              text="Description of the Hotel"
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
              text="Discover all you need to know about the hotel"
            ></Text>
          </Flex>
        </Header>
        <GridLayout className="description_grid">
          <Span>
            <Span style={{ marginBottom: "25px" }}>
              <Flex gap="10px" align="center" styles={{ marginBottom: "10px" }}>
                <PinDropIcon style={{ fontSize: "19px" }} />
                <Text
                  type="h5"
                  weight={"bold"}
                  size={15}
                  text="Location"
                ></Text>
              </Flex>
              <Text
                type="p"
                size={14}
                color="var(--text-gray-color)"
                text="Want to take a rest and explore the city? Hotel «New York Marriott Marquis» is located in New York. This hotel is located in 3 km from the city center. You can take a walk and explore the neighbourhood area of the hotel — Broadway, Times Square and Times Square – 42nd Street."
              ></Text>
            </Span>
            <Span>
              <Flex gap="10px" align="center" styles={{ marginBottom: "10px" }}>
                <BedIcon style={{ fontSize: "19px" }} />
                <Text type="h5" weight={"bold"} size={15} text="Hotel"></Text>
              </Flex>
              <Text
                type="p"
                size={14}
                color="var(--text-gray-color)"
                text="You can stop by the bar. You can stop by the restaurant. Have a cup of coffee in the cafe and, who knows, maybe it’s going to be the best one in the city. Want to be always on-line? Wi-Fi is available. If you travel by car, there’s a paid parking zone at the hotel. The following services are also available for the guests: a massage room, a spa center and a recreation club. Guests who love doing sports will be able to enjoy a fitness center and a gym. To book an excursion, consult the tour assistance desk of the hotel."
              ></Text>
            </Span>
          </Span>
          <Span>
            <Flex direction="column">
              <Text
                type="h4"
                weight={"bold"}
                text="Facts about the Hotel"
              ></Text>
              <Flex direction="column" styles={{ margin: "10px 0px" }}>
                <Text
                  type="p"
                  size={14}
                  color="var(--text-gray-color)"
                  text="Year of construction"
                ></Text>
                <Text type="h5" weight={"bold"} text={`${2001}`}></Text>
              </Flex>
              <Flex direction="column" styles={{ margin: "10px 0px" }}>
                <Text
                  type="p"
                  size={14}
                  color="var(--text-gray-color)"
                  text="Year of renovation"
                ></Text>
                <Text type="h5" weight={"bold"} text={`${2020}`}></Text>
              </Flex>
              <Flex direction="column" styles={{ margin: "10px 0px" }}>
                <Flex align="center" gap="8px" styles={{ marginBottom: "5px" }}>
                  <Text
                    type="p"
                    size={14}
                    color="var(--text-gray-color)"
                    text="Socket Type"
                  ></Text>
                  <ErrorOutlineOutlinedIcon
                    style={{
                      fontSize: "19px",
                      color: "var(--text-gray-color)",
                    }}
                  />
                </Flex>
                <Text
                  type="h5"
                  weight={"bold"}
                  text="North American 120 V / 60 Hz"
                ></Text>
                <Text
                  type="h5"
                  weight={"bold"}
                  styles={{ marginTop: "10px" }}
                  text="North American (grounded) 120 V / 60 Hz"
                ></Text>
              </Flex>
              <Flex direction="column" styles={{ margin: "10px 0px" }}>
                <Text
                  type="p"
                  size={14}
                  color="var(--text-gray-color)"
                  text="Rooms and floors number"
                ></Text>
                <Text
                  type="h5"
                  weight={"bold"}
                  text="1957 rooms 49 floors"
                ></Text>
              </Flex>
            </Flex>
          </Span>
        </GridLayout>
      </Container>
    </>
  );
};

export default DescriptionOfHotel;
