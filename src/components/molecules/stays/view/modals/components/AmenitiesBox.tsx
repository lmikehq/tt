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
import { HeatPumpOutlined, GrassRounded, ViewColumn, Diversity3Rounded, DirectionsCar, TransferWithinAStation, LocalParking, ChildCare, PinDrop, Bed, LocalHospitalOutlined, Wifi, Pets, Language, WatchLater, ChildFriendly, BedroomBaby, LocalDining, Payments, LunchDining, StickyNote2, FitnessCenter, SmokingRooms, Pool, Spa, HotTub, Kitchen, BeachAccess, Bathroom } from "@mui/icons-material";
import { PiBabyFill, PiCheckCircle } from "react-icons/pi";
import { GiMeal } from "react-icons/gi";
import { FaWheelchair } from "react-icons/fa6";
import { LuParkingSquare } from "react-icons/lu";
import { IoLocationSharp } from "react-icons/io5";
import { Box } from "@mui/material";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";

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
        case 'has_internet': return <Wifi style={{ ...styles }} />;
        case 'has_fitness': return <FitnessCenter style={{ ...styles }} />;
        case 'has_parking': return <LuParkingSquare style={{ ...styles }} />;
        case 'has_smoking': return <SmokingRooms style={{ ...styles }} />;
        case 'has_pool': return <Pool style={{ ...styles }} />;
        case 'has_spa': return <Spa style={{ ...styles }} />;
        case 'air_conditioning': return <AcUnitIcon style={{ ...styles }} />;
        case 'has_jacuzzi': return <HotTub style={{ ...styles }} />;
        case 'has_airport_transfer': return <TransferWithinAStation style={{ ...styles }} />;
        case 'kitchen': return <Kitchen style={{ ...styles }} />;
        case 'beach': return <BeachAccess style={{ ...styles }} />;
        case 'has_pets': return <Pets style={{ ...styles }} />;
        case 'has_bathroom': return <Bathroom style={{ ...styles }} />;
        default: return <PiCheckCircle style={{ ...styles }} />;
    }
}

interface AmenitiesBoxProps {
    amenities: AmenityGroup[];
    sortedAmenities: string[];
}

function AmenitiesBox({ amenities, sortedAmenities }: AmenitiesBoxProps) {
    const { isMobile } = useScreenResolution()
  return (
    <Flex direction='column' gap='2.5rem'>
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
          
        <Box
            display='grid'
            gridTemplateColumns={isMobile ? '1fr' : '1fr 1fr'}
            margin="2rem 0 0"
            gap="2rem"
        >
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
      </Box>
    </Flex>
  );
}

export default AmenitiesBox;
