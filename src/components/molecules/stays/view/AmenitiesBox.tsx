import React from "react";
import { GridLayout, Span } from "./styles";
import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import WifiIcon from "@mui/icons-material/Wifi";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import PetsIcon from "@mui/icons-material/Pets";
import SpaIcon from "@mui/icons-material/Spa";

function AmenitiesBox() {
  return (
    <Span style={{ padding: "0px 20px" }}>
      <Text
        type="h1"
        size={20}
        weight={500}
        margin={"0 0 2rem 0"}
        text="Popular Amenities"
      />
      <GridLayout className="stay_details_grid">
        <Flex gap="8px" align="center">
          <FreeBreakfastIcon style={{ fontSize: "28px" }} />
          <Text
            whiteSpace="nowrap"
            type="h1"
            size={16}
            weight={400}
            text="Breakfast Available"
          />
        </Flex>
        <Flex gap="8px" align="center">
          <SpaIcon style={{ fontSize: "28px" }} />
          <Text
            whiteSpace="nowrap"
            type="h1"
            size={16}
            weight={400}
            text="Spa"
          />
        </Flex>{" "}
        <Flex gap="8px" align="center">
          <WifiIcon style={{ fontSize: "28px" }} />
          <Text
            whiteSpace="nowrap"
            type="h1"
            size={16}
            weight={400}
            text="Free WiFi"
          />
        </Flex>{" "}
        <Flex gap="8px" align="center">
          <PetsIcon style={{ fontSize: "28px" }} />
          <Text
            whiteSpace="nowrap"
            type="h1"
            size={16}
            weight={400}
            text="Pet Friendly"
          />
        </Flex>{" "}
        <Flex gap="8px" align="center">
          <LocalParkingIcon style={{ fontSize: "28px" }} />
          <Text
            whiteSpace="nowrap"
            type="h1"
            size={16}
            weight={400}
            text="Parking available"
          />
        </Flex>
        <Flex gap="8px" align="center">
          <AcUnitIcon style={{ fontSize: "28px" }} />
          <Text
            whiteSpace="nowrap"
            type="h1"
            size={16}
            weight={400}
            text="Air conditioning"
          />
        </Flex>
      </GridLayout>
      <Span>
        <Flex direction="column" styles={{ marginTop: "20px" }}>
          <Text type="h2" size={20} weight={500} text="Internet" />
          <Span style={{ marginLeft: "25px" }}>
            <ul>
              <li>
                <Text type="p" text="Available in all rooms: Free WiFi"></Text>
              </li>
              <li>
                <Text
                  type="p"
                  text="Available in some public areas: Free WiFi"
                ></Text>
              </li>
            </ul>
          </Span>
        </Flex>
        <Flex direction="column" styles={{ marginTop: "20px" }}>
          <Text
            type="h2"
            size={20}
            weight={500}
            text="Parking and Transportation"
          />
          <Span style={{ marginLeft: "25px" }}>
            <ul>
              <li>
                <Text type="p" text="Free offsite parking"></Text>
              </li>
              <li>
                <Text
                  type="p"
                  text="Wheelchair-accessible parking available"
                ></Text>
              </li>
              <li>
                <Text
                  type="p"
                  text="Onsite parking includes off-street options"
                ></Text>
              </li>
            </ul>
          </Span>
        </Flex>
        <Flex direction="column" styles={{ marginTop: "20px" }}>
          <Text type="h2" size={20} weight={500} text="Food and Drinks" />
          <Span style={{ marginLeft: "25px" }}>
            <ul>
              <li>
                <Text
                  type="p"
                  text="Daily breakfast to-go available for a fee: CAD 6 per person"
                ></Text>
              </li>
              <li>
                <Text type="p" text="A bar/lounge"></Text>
              </li>
              <li>
                <Text type="p" text="A coffee shop/cafe"></Text>
              </li>
              <li>
                <Text type="p" text="A restaurant"></Text>
              </li>
            </ul>
          </Span>
        </Flex>
        <Flex direction="column" styles={{ marginTop: "20px" }}>
          <Text type="h2" size={20} weight={500} text="Things to do" />
          <Span style={{ marginLeft: "25px" }}>
            <ul>
              <li>
                <Text type="p" text="24-hour gym"></Text>
              </li>
            </ul>
          </Span>
        </Flex>
        <Flex direction="column" styles={{ marginTop: "20px" }}>
          <Text type="h2" size={20} weight={500} text="Family Friendly" />
          <Span style={{ marginLeft: "25px" }}>
            <ul>
              <li>
                <Text type="p" text="In-room refrigerator"></Text>
              </li>
            </ul>
          </Span>
        </Flex>
        <Flex direction="column" styles={{ marginTop: "20px" }}>
          <Text type="h2" size={20} weight={500} text="Conveniences" />
          <Span style={{ marginLeft: "25px" }}>
            <ul>
              <li>
                <Text type="p" text="24-hour front desk"></Text>
              </li>{" "}
              <li>
                <Text type="p" text="ATM"></Text>
              </li>{" "}
              <li>
                <Text type="p" text="Luggage storage"></Text>
              </li>
              <li>
                <Text type="p" text="Newspapers in lobby"></Text>
              </li>{" "}
              <li>
                <Text type="p" text="Safe at front desk"></Text>
              </li>
            </ul>
          </Span>
        </Flex>
        <Flex direction="column" styles={{ marginTop: "20px" }}>
          <Text type="h2" size={20} weight={500} text="Guest Services" />
          <Span style={{ marginLeft: "25px" }}>
            <ul>
              <li>
                <Text type="p" text="Daily housekeeping"></Text>
              </li>{" "}
              <li>
                <Text type="p" text="Wedding services"></Text>
              </li>{" "}
            </ul>
          </Span>
        </Flex>
        <Flex direction="column" styles={{ marginTop: "20px" }}>
          <Text type="h2" size={20} weight={500} text="Business Services" />
          <Span style={{ marginLeft: "25px" }}>
            <ul>
              <li>
                <Text type="p" text="3 meeting rooms"></Text>
              </li>{" "}
              <li>
                <Text
                  type="p"
                  text="6,512 square feet of conference space"
                ></Text>
              </li>{" "}
              <li>
                <Text type="p" text="Business center"></Text>
              </li>
            </ul>
          </Span>
        </Flex>{" "}
        <Flex direction="column" styles={{ marginTop: "20px" }}>
          <Text type="h2" size={20} weight={500} text="Accessibility" />
          <Span style={{ marginLeft: "25px" }}>
            <ul>
              <li>
                <Text
                  type="p"
                  text="if you have requests for specific accessibility needs, please contact the property using the information on the reservation confirmation received after booking."
                ></Text>
              </li>{" "}
              <li>
                <Text
                  type="p"
                  text="Accessible bathroom available in select rooms"
                ></Text>
              </li>{" "}
              <li>
                <Text type="p" text="Assistive listening devices"></Text>
              </li>
              <li>
                <Text type="p" text="Braille/raised signage"></Text>
              </li>
              <li>
                <Text type="p" text="Elevator"></Text>
              </li>
              <li>
                <Text type="p" text="Height-adjustable showerhead"></Text>
              </li>
              <li>
                <Text
                  type="p"
                  text="In-room accessibility available in select rooms"
                ></Text>
              </li>
              <li>
                <Text type="p" text="Lever door handles"></Text>
              </li>
              <li>
                <Text
                  type="p"
                  text="Roll-in shower available in select rooms"
                ></Text>
              </li>
              <li>
                <Text type="p" text="Stair-free path to entrance"></Text>
              </li>
              <li>
                <Text
                  type="p"
                  text="Valet for wheelchair-equipped vehicles"
                ></Text>
              </li>
              <li>
                <Text type="p" text="Visual alarms in hallways"></Text>
              </li>
              <li>
                <Text type="p" text="Well-lit path to entrance"></Text>
              </li>
              <li>
                <Text
                  type="p"
                  text="Wheelchair accessible (may have limitations)"
                ></Text>
              </li>
              <li>
                <Text
                  type="p"
                  text="Wheelchair-accessible business center"
                ></Text>
              </li>
              <li>
                <Text type="p" text="Wheelchair-accessible gym"></Text>
              </li>
              <li>
                <Text type="p" text="Wheelchair-accessible lounge"></Text>
              </li>
              <li>
                <Text type="p" text="Wheelchair-accessible parking"></Text>
              </li>
              <li>
                <Text
                  type="p"
                  text="Wheelchair-accessible path of travel"
                ></Text>
              </li>
              <li>
                <Text
                  type="p"
                  text="Wheelchair-accessible path to elevator"
                ></Text>
              </li>
              <li>
                <Text
                  type="p"
                  text="Wheelchair-accessible public washroom"
                ></Text>
              </li>
              <li>
                <Text
                  type="p"
                  text="Wheelchair-accessible registration desk"
                ></Text>
              </li>
              <li>
                <Text type="p" text="Wheelchair-accessible restaurant"></Text>
              </li>
              <li>
                <Text type="p" text="Wheelchairs on site"></Text>
              </li>
            </ul>
          </Span>
        </Flex>
        <Flex direction="column" styles={{ marginTop: "20px" }}>
          <Text type="h2" size={20} weight={500} text="Outdoors" />
          <Span style={{ marginLeft: "25px" }}>
            <ul>
              <li>
                <Text type="p" text="On the waterfront"></Text>
              </li>{" "}
            </ul>
          </Span>
        </Flex>
        <Flex direction="column" styles={{ marginTop: "20px" }}>
          <Text type="h2" size={20} weight={500} text="More" />
          <Span style={{ marginLeft: "25px" }}>
            <ul>
              <li>
                <Text type="p" text="Smoke-free property"></Text>
              </li>{" "}
            </ul>
          </Span>
        </Flex>
      </Span>
    </Span>
  );
}

export default AmenitiesBox;
