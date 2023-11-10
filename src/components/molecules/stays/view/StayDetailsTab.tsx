import CustomTabWidget from "@/components/organisms/shared/CustomTabWidget";
import Section from "../../section";
import Flex from "@/components/templates/flex";
import Text from "@/components/atoms/text";
import Image from "@/components/atoms/image";
import { Grid } from "@/components/templates/grid";
import {
    BiCurrentLocation,
    BiSolidCircle,
    BiSolidEditLocation,
    BiSolidLocationPlus,
    BiSolidStar,
} from "react-icons/bi";
import { ttColors } from "@/lib/theme/colors";
import { formatPriceWithoutCurrency } from "@/lib/extensions/helpers/formatPrice";

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
            <Flex gap="2.25rem">
                <Section width="62%">
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
                    <Flex gap="2rem">
                        <Flex>
                            <Text type="p" text={} />
                            <Text
                                type="p"
                                text={formatPriceWithoutCurrency(81500)}
                            />
                        </Flex>
                        <Flex gap="0.875rem">
                            <Text type="p" text="4.0" />
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
                                    </Flex>
                                    <Text type="p" text="1000 reviews" />
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Text
                        type="h1"
                        margin={"0 0 3rem 0"}
                        text="The Ritz London"
                    />
                    <Grid columns="2">
                        <></>
                    </Grid>
                    {/* <Text /> */}
                </Section>
                <Section width="38%">
                    <Section>
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
