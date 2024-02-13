import Flex from "@/components/templates/flex";
import { Container, GridLayout, Header, Span } from "./styles";
import Text from "@/components/atoms/text";
import PetsIcon from "@mui/icons-material/Pets";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { ReactElement, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ViewSingleStayResponse } from "@/lib/types/response-models/stay/search.type";
import { pickIcon } from "./modals/components/AmenitiesBox";
import { ttColors } from "@/lib/theme/colors";

interface AmenitySectionProps {
    isOpen: boolean,
    toggle: (x: number) => void,
    index: number,
    icon: ReactElement,
    title: string,
    items: string[];
}
function AmenitySection({ isOpen, toggle, index, icon, title, items }: AmenitySectionProps) {
    const { isMobile } = useScreenResolution()
    return (
        <ul
            style={{ listStyle: "none" }}
            // className="mobile_box"
        >
            <Flex justify="space-between" onClick={() => toggle(index)}>
                <Flex gap="10px" align="center">
                    {pickIcon(title, { fontSize: '1.4rem' })}
                    <Text
                        type="h5"
                        size={16}
                        text={title}
                        weight={"bold"}
                    />
                </Flex>
                {isMobile ? isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon /> : null}
            </Flex>
            {(isMobile ? isOpen : true) && (
                <Flex
                    direction="column"
                    gap=".5rem"
                    align="flex-start"
                    styles={{ padding: ".8rem 0 0 2rem" }}
                >
                    {items.map((item, index) =>
                        <li key={`item-${index}`}>
                            <Text
                                type="p"
                                size={13}
                                text={item}
                                color={ttColors.foundation.gray}
                            />
                        </li>
                    )}
                </Flex>
            )}
        </ul>
    )
} 

interface HotelAmenitiesProps {
    stayResponse?: ViewSingleStayResponse;
}

const HotelAmenities = ({ stayResponse }: HotelAmenitiesProps) => {
    const [openBoxes, setOpenBoxes] = useState<number[]>([0]);

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
              size={18}
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
                {stayResponse?.amenity_groups.map((am, index) => 
                    <AmenitySection
                        key={`amenity-${index}`}
                        title={am.group_name}
                        items={am.amenities}
                        index={index}
                        icon={<PetsIcon style={{ fontSize: "18px" }} />}
                        toggle={toggleBox}
                        isOpen={openBoxes.includes(index)}
                    />
                )}
          </GridLayout>
        </Span>
      </Container>
    </>
  );
};

export default HotelAmenities;
