import React, { CSSProperties } from "react";
import { GridLayout, Span } from "../../styles";
import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import { AmenityGroup } from "@/lib/types/response-models/stay/search.type";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import WifiIcon from "@mui/icons-material/Wifi";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import PetsIcon from "@mui/icons-material/Pets";
import SpaIcon from "@mui/icons-material/Spa";
import { HeatPumpOutlined, GrassRounded, ViewColumn, Diversity3Rounded, DirectionsCar, TransferWithinAStation, LocalParking, ChildCare, PinDrop, Bed, LocalHospitalOutlined, Wifi, Pets, Language, WatchLater, ChildFriendly, BedroomBaby, LocalDining, Payments, LunchDining, StickyNote2 } from "@mui/icons-material";
import { PiBabyFill, PiCheckCircle } from "react-icons/pi";
import { GiMeal } from "react-icons/gi";
import { FaWheelchair } from "react-icons/fa6";
import { LuParkingSquare } from "react-icons/lu";
import { IoLocationSharp } from "react-icons/io5";

export const pickIcon = (val: string, styles?: CSSProperties ) => {
    // const fontSize = size
    switch (String(val).toLowerCase()) {
        case 'free breakfast': return <FreeBreakfastIcon style={{ ...styles }} />;
        case 'free wi-fi': return <WifiIcon style={{ ...styles }} />;
        case 'air conditioning': return <AcUnitIcon style={{ ...styles }} />;
        case 'heating': return <HeatPumpOutlined style={{ ...styles }} />;
        case 'garden': return <GrassRounded style={{ ...styles }} />;
        case 'pets': return <PetsIcon style={{ ...styles }} />;
        case 'terrace': return <ViewColumn style={{ ...styles }} />;
        case 'family room': return <Diversity3Rounded style={{ ...styles }} />;
        case 'airport transportation': return <DirectionsCar style={{ ...styles }} />;
        case 'transfer services': return <TransferWithinAStation style={{ ...styles }} />;
        case 'offsite parking reservations required': return <LocalParking style={{ ...styles }} />;
        case 'family/kid friendly': return <ChildCare style={{ ...styles }} />;
        case 'general': return <PinDrop style={{ ...styles }} />;
        case 'rooms': return <Bed style={{ ...styles }} />;
        case 'internet': return <Wifi style={{ ...styles }} />;
        case 'transfer': return <TransferWithinAStation style={{ ...styles }} />;
        case 'languages spoken': return <Language style={{ ...styles }} />;
        case 'parking': return <LuParkingSquare style={{ ...styles }} />;
        case 'kids': return <PiBabyFill style={{ ...styles }} />;
        case 'children': return <ChildFriendly style={{ ...styles }} />;
        case 'cot': return <BedroomBaby style={{ ...styles }} />;
        case 'meals': return <LocalDining style={{ ...styles }} />;
        case 'meal': return <LocalDining style={{ ...styles }} />;
        case 'children_meal': return <LunchDining style={{ ...styles }} />;
        case 'accessibility': return <FaWheelchair style={{ ...styles }} />;
        case 'beauty and wellness': return <LocalHospitalOutlined style={{ ...styles }} />;
        case 'pets': return <Pets style={{ ...styles }} />;
        case 'location': return <IoLocationSharp style={{ ...styles }} />;
        case 'at the apartment': return <Bed style={{ ...styles }} />;
        case 'check_in_check_out': return <WatchLater style={{ ...styles }} />;
        case 'extra_bed': return <Bed style={{ ...styles }} />;
        case 'deposit': return <Payments style={{ ...styles }} />;
        case 'additional': return <StickyNote2 style={{ ...styles }} />;
        default: return <PiCheckCircle style={{ ...styles }} />;
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
                    {pickIcon(am, { fontSize: '28px' })}
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
