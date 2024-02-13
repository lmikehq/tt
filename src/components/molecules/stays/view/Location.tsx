import Flex from "@/components/templates/flex";
import { Container, GridLayout, Header, MapBoxTag, Span } from "./styles";
import Text from "@/components/atoms/text";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import FlightIcon from "@mui/icons-material/Flight";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ViewSingleStayResponse } from "@/lib/types/response-models/stay/search.type";
import { ViewTripAdvisorStayDetailsResponse, ViewTripAdvisorStayNearbyResponse } from "@/lib/types/request-models/stay/search.type";
import { allCaps, capCase } from "@/lib/utilFns";
import GoogleMap from "./GoogleMap";


interface StayDetailsProps {
    stayResponse?: ViewSingleStayResponse;
    nearbyLocations: ViewTripAdvisorStayNearbyResponse['data'];
    stayDetails: ViewTripAdvisorStayDetailsResponse
}

const Location = ({ stayResponse, stayDetails, nearbyLocations = [] } : StayDetailsProps) => {
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
              text={stayResponse?.address ?? ''}
            ></Text>
          </Flex>
        </Header>      

        <GoogleMap
            lat={stayResponse?.latitude}
            lng={stayResponse?.longitude}
            zoom={20}
        />
              
        {nearbyLocations.length > 0 && 
            <ul style={{ listStyle: "none", width: '100%' }} className="mobile_box">
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
                        text="What's Nearby?"
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
                            {nearbyLocations.map((nearby, index) =>
                                <li key={`nearby-${index}`}>
                                    <Text
                                        type="p"
                                        size={14}
                                        text={`${nearby?.name} - ${nearby?.distance}km ${allCaps(nearby?.bearing)}`}
                                    ></Text>
                                </li>
                            )}
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
                    <Span style={{ lineHeight: "27px", width: '100%' }}>
                        {nearbyLocations.map((nearby, index) =>
                            <li key={`nearby-${index}`}>
                                <Text
                                    type="p"
                                    size={14}
                                    text={`${nearby?.name} - ${parseFloat(nearby?.distance).toFixed(1)}km ${capCase(nearby?.bearing)}`}
                                ></Text>
                            </li>
                        )}
                    </Span>
                    </Flex>
                )}
                </Span>
            </ul>
        }
      </Container>
    </>
  );
};

export default Location;
