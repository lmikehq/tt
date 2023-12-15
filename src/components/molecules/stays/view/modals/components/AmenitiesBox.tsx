import React from "react";
import { GridLayout, Span } from "../../styles";
import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import { AmenityGroup } from "@/lib/types/response-models/stay/search.type";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import WifiIcon from "@mui/icons-material/Wifi";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import PetsIcon from "@mui/icons-material/Pets";
import SpaIcon from "@mui/icons-material/Spa";
import { HeatPumpOutlined, GrassRounded, ViewColumn, Diversity3Rounded, DirectionsCar, TransferWithinAStation, LocalParking, ChildCare } from "@mui/icons-material";
import { PiCheckCircle } from "react-icons/pi";

export const pickAmenityIcon = (val: string) => {
    switch (val) {
        case 'Free Breakfast': return <FreeBreakfastIcon style={{ fontSize: '28px '}} />;
        case 'Free Wi-Fi': return <WifiIcon style={{ fontSize: '28px '}} />;
        case 'Air conditioning': return <AcUnitIcon style={{ fontSize: '28px '}} />;
        case 'Heating': return <HeatPumpOutlined style={{ fontSize: '28px '}} />;
        case 'Garden': return <GrassRounded style={{ fontSize: '28px '}} />;
        case 'Pets': return <PetsIcon style={{ fontSize: '28px '}} />;
        case 'Terrace': return <ViewColumn style={{ fontSize: '28px '}} />;
        case 'Family room': return <Diversity3Rounded style={{ fontSize: '28px '}} />;
        case 'Airport transportation': return <DirectionsCar style={{ fontSize: '28px '}} />;
        case 'Transfer services': return <TransferWithinAStation style={{ fontSize: '28px '}} />;
        case 'Offsite parking reservations required': return <LocalParking style={{ fontSize: '28px '}} />;
        case 'Family/Kid Friendly': return <ChildCare style={{ fontSize: '28px '}} />;
        default: return <PiCheckCircle size="28px" />;
    }
}

interface AmenitiesBoxProps {
    amenities: AmenityGroup[];
    sortedAmenities: string[];
}

function AmenitiesBox({ amenities, sortedAmenities } : AmenitiesBoxProps) {
  return (
    <Span>
        <Text
            type="h1"
            size={20}
            weight={500}
            margin={"0 0 1rem 0"}
            text="Popular Amenities"
        />
        <GridLayout className="stay_details_grid">
            {sortedAmenities.map((am, index) => 
                <Flex gap="8px" align="center" key={`modal-amenity-${index}`}>
                    {pickAmenityIcon(am)}
                    <Text
                        whiteSpace="nowrap"
                        type="h1"
                        size={16}
                        weight={400}
                        text={am}
                    />
                </Flex>
            )}
        </GridLayout>
          
        <Flex direction="column" margin="2rem 0 0" gap="2rem">
            {amenities.map((am, index) => 
                <Flex direction="column" gap=".5rem" key={`full-amenity-${index}`}>
                    <Text type="h2" size={20} weight={500} text={am.group_name} />
                    <ul style={{ marginLeft: "25px" }}>
                        {am.amenities.map((desc, index) =>
                            <li key={`am-item-${index}`}>
                                <Text type="p" text={desc}></Text>
                            </li>
                        )}
                    </ul>
                </Flex>
            )}
            {/* <Flex direction="column" gap=".5rem">
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
            </Flex> */}
      </Flex>
    </Span>
  );
}

export default AmenitiesBox;
