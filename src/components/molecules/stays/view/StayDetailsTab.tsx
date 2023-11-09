import CustomTabWidget from "@/components/organisms/shared/CustomTabWidget";
import Section from "../../section";
import Flex from "@/components/templates/flex";
import Text from "@/components/atoms/text";
import Image from "@/components/atoms/image";
import { Grid } from "@/components/templates/grid";
import {
    BiCurrentLocation,
    BiSolidEditLocation,
    BiSolidLocationPlus,
    BiSolidStar,
} from "react-icons/bi";

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
                    <Text type="h1" text="The Ritz London" />
                    <Text
                        type="p"
                        text="Black Prince Interchange, London, DA5 1ND, United Kingdom"
                    />
                    <Flex gap="1rem">
                        <Flex width="fit-content">
                            <BiCurrentLocation />
                            <Text type="p" text="4.3km away" />
                        </Flex>
                        <Flex>
                            <BiSolidStar />
                            <BiSolidStar />
                            <BiSolidStar />
                            <BiSolidStar />
                        </Flex>
                    </Flex>
                    <Text type="h1" text="The Ritz London" />
                    <Grid></Grid>
                    <Text />
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
