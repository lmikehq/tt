import React, { useMemo, useState } from "react";
import { Box, Checkbox } from "@mui/material";
import Section from "../../section";
import Flex from "@/components/templates/flex";
import Text from "@/components/atoms/text";
import Image from "@/components/atoms/image";
import { BiChevronRight } from "react-icons/bi";
import { ttColors } from "@/lib/theme/colors";
import { Rating } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import {
  formatPriceWithoutCurrency,
  getCurrency,
} from "@/lib/extensions/helpers/formatPrice";
import Button from "@/components/atoms/button";
import { Container, GridLayout, Header, Span, Tab } from "./styles";
import { styled } from "@mui/material/styles";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { FlexBox } from "../components/styles";
import { AmenitiesModal, MapModal } from "./modals/Modals";
import StayDetailSkeleton from "./skeleton/StayDetailSkeleton";
import { ViewSingleStayResponse } from "@/lib/types/response-models/stay/search.type";
import { pickIcon } from "./modals/components/AmenitiesBox";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "var(--color-green)",
  },
  "& .MuiRating-iconHover": {
    color: "var(--color-green)",
  },
});

interface TabProps {
  id: string;
  label: string;
}

const tabs: TabProps[] = [
  { id: "overview", label: "Overview" },
  { id: "rooms", label: "Rooms" },
  { id: "location", label: "Location" },
  { id: "descriptions", label: "Descriptions" },
  { id: "policies", label: "Policies" },
];

interface StayDetailsProps {
    stayResponse: ViewSingleStayResponse;
}

function StayDetails({ stayResponse }: StayDetailsProps) {
    const { isMobile } = useScreenResolution();

    const [activeTab, setActiveTab] = useState("overview");

    const handleTabClick = (id: string) => {
        setActiveTab(id);
    };

    const [open, setOpen] = useState({
        map: false,
        amenities: false,
    });
    
    const response: any = {}

    const sortedAmenities = useMemo(() => 
        stayResponse?.amenity_groups.reduce((prev, curr) => [...prev, ...curr.amenities], [] as string[])
    , [stayResponse?.amenity_groups])

  return (
    <Container>
      <Header id="overview">
        <Tab>
          <Flex gap="20px">
            {tabs.map((tab) => (
              <a
                key={tab.id}
                className={`anchor ${tab.id === activeTab ? "active" : ""}`}
                href={`#${tab.id}`}
                onClick={() => handleTabClick(tab.id)}
              >
                <Text size={18} type="p" text={tab.label} weight={600}></Text>
              </a>
            ))}
          </Flex>
        </Tab>
      </Header>
      {/* <Span>
        <StayDetailSkeleton />
      </Span> */}
      <Box
        sx={{
            display: "grid",
            gridTemplateColumns: isMobile ? "100%" : "65% auto",
            gap: "30px",
        }}
      >
        <Section>
          <Flex align="center" justify="space-between">
            <Text
              whiteSpace="nowrap"
              type="h1"
              size={32}
              weight={600}
              text={stayResponse.name}
            />
            {!isMobile && (
              <Checkbox
                {...label}
                icon={<FavoriteBorder />}
                checkedIcon={
                  <Favorite style={{ color: "var(--color-favorite)" }} />
                }
                disableRipple
                disableTouchRipple
                disableFocusRipple
                sx={{
                  "& .MuiSvgIcon-root": { fontSize: 28, padding: 0 },
                }}
                id="favorite-hotels-checkbox"
              />
            )}
          </Flex>
          <Text
            type="p"
            size={15}
            weight={400}
            color="var(--text-gray-color)"
            text={stayResponse.address}
            margin={"0 0 1.5rem 0"}
          />
          <Flex align="center">
            <Flex>
              <Image
                alt="location"
                src={"/assets/icons/stay/view/location_radius_icon.svg"}
                width={24}
                height={24}
              />
              <Text type="p" text="4.3km away" />
            </Flex>
            <Flex>
              <Rating
                // style={{
                //     marginLeft: "-4px",
                //     marginBottom: "5px",
                //     fontSize: "20px",
                // }}
                name="rating"
                precision={0.5}
                readOnly
                max={5}
                value={stayResponse.star_rating ?? 4}
              />
            </Flex>
          </Flex>
          <FlexBox className="stay_wrap" style={{ margin: "15px 0px 2.5rem" }}>
            <Flex gap="5px" align="center">
              <Text type="p" size={24} weight={600} text={getCurrency()} />
              <Text
                type="p"
                size={30}
                weight={600}
                text={formatPriceWithoutCurrency(81500)}
              />
            </Flex>
            <Flex align="center" gap="8px">
              <Text
                type="p"
                text="4.0"
                size={30}
                weight={600}
                styles={{ flex: "none" }}
              />
              <Flex gap="8px" align="center">
                <Image
                  alt="location"
                  src={"/assets/icons/stay/view/view_camera_icon.svg"}
                  width={24}
                  height={24}
                />
                <Flex direction="column">
                  <Flex>
                    <StyledRating
                      name="customized-color"
                      defaultValue={4}
                      getLabelText={(value: number) =>
                        `${value} Heart${value !== 1 ? "s" : ""}`
                      }
                      readOnly
                      precision={0.5}
                      icon={<CircleIcon fontSize="inherit" />}
                      emptyIcon={<CircleOutlinedIcon fontSize="inherit" />}
                      style={{
                        fontSize: "15px",
                      }}
                    />
                  </Flex>
                  <Text whiteSpace="nowrap" type="p" text="1000 reviews" />
                </Flex>
              </Flex>
            </Flex>
          </FlexBox>
          <Text
            type="h1"
            size={20}
            weight={500}
            margin={"0 0 1.5rem 0"}
            text="Popular Amenities"
          />
          <GridLayout className="stay_details_grid" style={{ margin: "0 0 1.5rem" }}>
            {sortedAmenities.slice(0, 6).map((am, index) =>
                <Flex gap="8px" align="center" key={`amenity-${index}`}>
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
          <Button background="transparent" width="fit-content" padding="0 0" height="fit-content">
              <Text
                type="p"
                weight={500}
                text="See more.."
                color={ttColors.primary}
                onClick={() =>
                  setOpen((prev) => ({
                    ...prev,
                    amenities: true,
                  }))
                }
              />
          </Button>
        </Section>
        <Section>
          <Section margin="0 0 10px 0">
            <Image
              alt="stay"
              src={"/assets/images/topCountries/Canada.jpeg"}
              styles={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Section>
          <Text
            type="p"
            text={stayResponse.address}
            size={16}
            weight={500}
          />
          <Button background="transparent" width="fit-content" padding="0">
            <Flex align="center" justify="flex-start">
              <Text
                type="p"
                weight={500}
                onClick={() =>
                  setOpen((prev) => ({
                    ...prev,
                    map: true,
                  }))
                }
                text="Show in map"
                color={ttColors.primary}
              />
              <BiChevronRight color={ttColors.primary} size={24} />
            </Flex>
          </Button>
        </Section>
        </Box> 
          
        <AmenitiesModal
            open={open.amenities}
            handleClose={() =>
                setOpen((prev) => ({
                    ...prev,
                    amenities: false,
                }))
            }
            amenities={stayResponse.amenity_groups}
            sortedAmenities={sortedAmenities}
        />
        <MapModal
            open={open.map}
            handleClose={() =>
                setOpen((prev) => ({
                    ...prev,
                    map: false,
                }))
            }
            stayResponse={stayResponse}
        />
    </Container>
  );
}

export default StayDetails;
