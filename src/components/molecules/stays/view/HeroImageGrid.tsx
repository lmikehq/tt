import Flex from "@/components/templates/flex";
import Section from "../../section";
import { Grid } from "@/components/templates/grid";
import Image from "@/components/atoms/image";

const HeroImageGrid = () => {
    return (
        <Section styles={{ marginBottom: "37px" }}>
            <Grid columns={"2"} gap=".5rem">
                <Section
                    styles={{ height: "560px", overflow: "hidden" }}
                    borderRadius="12px"
                >
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
                <Section styles={{ height: "560px" }}>
                    <Grid columns={"2"} gap=".5rem">
                        <Section
                            styles={{ height: "276px", overflow: "hidden" }}
                            borderRadius="6px"
                        >
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
                        <Section
                            styles={{ height: "276px", overflow: "hidden" }}
                            borderRadius="6px"
                        >
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
                        <Section
                            styles={{ height: "276px", overflow: "hidden" }}
                            borderRadius="6px"
                        >
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
                        <Section
                            styles={{ height: "276px", overflow: "hidden" }}
                            borderRadius="6px"
                        >
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
                    </Grid>
                </Section>
            </Grid>
        </Section>
    );
};

export default HeroImageGrid;
