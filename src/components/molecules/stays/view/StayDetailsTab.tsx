import CustomTabWidget from "@/components/organisms/shared/CustomTabWidget";
import Section from "../../section";
import Flex from "@/components/templates/flex";
import Text from "@/components/atoms/text";
import Image from "@/components/atoms/image";
import { Grid } from "@/components/templates/grid";
import {
    BiChevronRight,
    BiCurrentLocation,
    BiSolidCircle,
    BiSolidEditLocation,
    BiSolidLocationPlus,
    BiSolidStar,
} from "react-icons/bi";
import { ttColors } from "@/lib/theme/colors";
import {
    formatPriceWithoutCurrency,
    getCurrency,
} from "@/lib/extensions/helpers/formatPrice";
import Button from "@/components/atoms/button";

const StayDetailsTab = () => {
    return (
        <Section
            styles={{
                borderRadius: "16px",
                border: "1px solid #EAEAEA",
                background: "#FFF",
            }}
            padding={"3rem 1.75rem"}
        >
            <Section>
                <CustomTabWidget
                    tabTitles={[
                        "Overview",
                        "Rooms",
                        "Location",
                        "Description",
                        "Policies",
                    ].map((el) => ({ label: el }))}
                    tabContents={[
                        // eslint-disable-next-line react/jsx-key
                        <OverViewTabContent />,
                        // eslint-disable-next-line react/jsx-key
                        <RoomsTabContent />,
                        // eslint-disable-next-line react/jsx-key
                        <LocationTabContent />,
                        // eslint-disable-next-line react/jsx-key
                        <DescriptionTabContent />,
                        // eslint-disable-next-line react/jsx-key
                        <PoliciesTabContent />,
                        // eslint-disable-next-line react/jsx-key
                    ].map((el) => (
                        // eslint-disable-next-line react/jsx-key
                        <Section padding={"3rem 0 0 0"}>{el}</Section>
                    ))}
                />
            </Section>
        </Section>
    );
};

export default StayDetailsTab;

const OverViewTabContent = () => {
    return (
        <Section>
            <Flex gap="1rem">
                <Section width="65%">
                    <Text
                        type="h1"
                        size={32}
                        weight={600}
                        text="The Ritz London"
                        margin={"0 0 0.75rem 0"}
                    />
                    <Text
                        type="p"
                        size={16}
                        weight={400}
                        text="Black Prince Interchange, London, DA5 1ND, United Kingdom"
                        margin={"0 0 1.5rem 0"}
                    />
                    <Flex gap="0rem" margin="0 0 1.5rem 0" align="center">
                        <Flex>
                            <Image
                                alt="location"
                                src={
                                    "/assets/icons/stay/view/location_radius_icon.svg"
                                }
                                width={24}
                                height={24}
                            />
                            <Text type="p" text="4.3km away" />
                        </Flex>
                        <Flex>
                            <BiSolidStar
                                color={ttColors.sunsetYellow}
                                size={20}
                            />
                            <BiSolidStar
                                color={ttColors.sunsetYellow}
                                size={20}
                            />
                            <BiSolidStar
                                color={ttColors.sunsetYellow}
                                size={20}
                            />
                            <BiSolidStar
                                color={ttColors.sunsetYellow}
                                size={20}
                            />
                        </Flex>
                    </Flex>
                    <Flex gap="1rem" align="center" wrap="wrap">
                        <Flex gap="0.5rem" align="center">
                            <Text
                                type="p"
                                size={24}
                                weight={600}
                                text={getCurrency()}
                            />
                            <Text
                                type="p"
                                size={30}
                                weight={600}
                                text={formatPriceWithoutCurrency(81500)}
                            />
                        </Flex>
                        <Flex
                            margin={"0 0 3rem 0"}
                            align="center"
                            gap="0.875rem"
                        >
                            <Text
                                type="p"
                                text="4.0"
                                size={30}
                                weight={600}
                                styles={{ flex: "none" }}
                            />
                            <Flex gap="0.6rem">
                                <Image
                                    alt="location"
                                    src={
                                        "/assets/icons/stay/view/view_camera_icon.svg"
                                    }
                                    width={24}
                                    height={24}
                                />
                                <Flex direction="column">
                                    <Flex>
                                        <BiSolidCircle
                                            size={14}
                                            color={ttColors.successGreen}
                                        />
                                        <BiSolidCircle
                                            size={14}
                                            color={ttColors.successGreen}
                                        />
                                        <BiSolidCircle
                                            size={14}
                                            color={ttColors.successGreen}
                                        />
                                        <BiSolidCircle
                                            size={14}
                                            color={ttColors.successGreen}
                                        />
                                    </Flex>
                                    <Text type="p" text="1000 reviews" />
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Text
                        type="h1"
                        size={20}
                        weight={500}
                        margin={"0 0 2rem 0"}
                        text="Popular Amenities"
                    />
                    <Grid columns="2" style={{ rowGap: "1.5rem" }}>
                        <Flex gap="0.875rem" align="center">
                            <Image
                                alt="location"
                                src={"/assets/icons/stay/view/coffee_icon.svg"}
                                width={32}
                                height={32}
                            />
                            <Text
                                type="h1"
                                size={16}
                                weight={400}
                                text="Breakfast Available"
                            />
                        </Flex>
                        <Flex gap="0.875rem" align="center">
                            <Image
                                alt="location"
                                src={"/assets/icons/stay/view/spa_icon.svg"}
                                width={32}
                                height={32}
                            />
                            <Text type="h1" size={16} weight={400} text="Spa" />
                        </Flex>{" "}
                        <Flex gap="0.875rem" align="center">
                            <Image
                                alt="location"
                                src={
                                    "/assets/icons/stay/view/solid_wifi_icon.svg"
                                }
                                width={32}
                                height={32}
                            />
                            <Text
                                type="h1"
                                size={16}
                                weight={400}
                                text="Free WiFi"
                            />
                        </Flex>{" "}
                        <Flex gap="0.875rem" align="center">
                            <Image
                                alt="location"
                                src={"/assets/icons/stay/view/pet_icon.svg"}
                                width={32}
                                height={32}
                            />
                            <Text
                                type="h1"
                                size={16}
                                weight={400}
                                text="Pet Friendly"
                            />
                        </Flex>{" "}
                        <Flex gap="0.875rem" align="center">
                            <Image
                                alt="location"
                                src={"/assets/icons/stay/view/parking_icon.svg"}
                                width={32}
                                height={32}
                            />
                            <Text
                                type="h1"
                                size={16}
                                weight={400}
                                text="Parking available"
                            />
                        </Flex>
                        <Flex gap="0.875rem" align="center">
                            <Image
                                alt="location"
                                src={"/assets/icons/stay/view/ac_unit_icon.svg"}
                                width={32}
                                height={32}
                            />
                            <Text
                                type="h1"
                                size={16}
                                weight={400}
                                text="Air conditioning"
                            />
                        </Flex>
                    </Grid>
                    {/* <Text /> */}
                </Section>
                <Section width="35%">
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
                        text="22 Portman Square, London, England, W1H 6LW"
                        size={16}
                        weight={500}
                    />
                    <Button
                        background="transparent"
                        width="fit-content"
                        padding="0"
                    >
                        <Flex align="center" justify="flex-start">
                            <Text
                                type="p"
                                text="Show in map"
                                color={ttColors.primary}
                            />
                            <BiChevronRight
                                color={ttColors.primary}
                                size={24}
                            />
                        </Flex>
                    </Button>
                </Section>
            </Flex>
        </Section>
    );
};
const RoomsTabContent = () => {
    return <Section>Rooms</Section>;
};
const LocationTabContent = () => {
    return <Section>Location</Section>;
};
const DescriptionTabContent = () => {
    return <Section>Description</Section>;
};
const PoliciesTabContent = () => {
    return <Section>Policies</Section>;
};
