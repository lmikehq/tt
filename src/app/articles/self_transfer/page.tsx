import Button from "@/components/atoms/button";
import Image from "@/components/atoms/image";
import Text from "@/components/atoms/text";
import Section from "@/components/molecules/section";
import SectionLayout from "@/components/templates/SectionLayout";
import Flex from "@/components/templates/flex";
import { Theme, ttColors } from "@/lib/theme/colors";
import {
    BiLike,
    BiSolidBulb,
    BiSolidDislike,
    BiSolidLike,
    BiSolidSquare,
} from "react-icons/bi";
import { BsFillHandThumbsUpFill } from "react-icons/bs";

const SelfTransferPage = () => {
    return (
        <SectionLayout>
            <Section padding={"4.375rem 0 0 0"}>
                <Text
                    type="h4"
                    styles={{ marginBottom: "2.5rem" }}
                    size={40}
                    weight={700}
                    text="Self-transfer travel hack"
                />
                <Section styles={{ marginBottom: "2.5rem" }}>
                    <Section styles={{ marginBottom: "0.75rem" }}>
                        <Text
                            type="p"
                            text="The self-transfer travel hack makes travel cheaper "
                            size={16}
                            styles={{ display: "inline" }}
                        />
                        <Text
                            type="p"
                            text="by combining separate flights, train, or bus tickets "
                            size={16}
                            weight={600}
                            styles={{ display: "inline" }}
                        />
                        <Text
                            type="p"
                            text="into unique itineraries."
                            size={16}
                            styles={{ display: "inline" }}
                        />
                    </Section>
                    <Text
                        type="p"
                        text="Example: A direct ticket from New York to Prague is more expensive than 2 separate tickets New York → Amsterdam and Amsterdam → Prague, so we book you these separate flights."
                        size={16}
                        styles={{ fontStyle: "italic", lineHeight: "200%" }}
                    />
                </Section>
                <Section styles={{ marginBottom: "2.875rem" }}>
                    <Text
                        type="h4"
                        styles={{ marginBottom: "1rem" }}
                        size={22}
                        weight={600}
                        text="What’s the catch?"
                    />
                    <Text
                        type="p"
                        text="This isn’t an official itinerary offered by the carriers and they won’t take responsibility for the unofficial connections with self-transfer."
                        size={16}
                        styles={{ marginBottom: "1.5rem", lineHeight: "200%" }}
                    />
                    <Section>
                        <Flex gap={"1.45rem"} styles={{ marginBottom: "1rem" }}>
                            <BiSolidSquare
                                size={14}
                                color={ttColors.primary}
                                style={{ flex: "none", marginTop: "0.5rem" }}
                            />
                            <Section>
                                <Text
                                    text="You might need to "
                                    type="p"
                                    size={16}
                                    styles={{
                                        lineHeight: "200%",
                                        display: "inline",
                                    }}
                                />
                                <Text
                                    type="p"
                                    size={16}
                                    text="leave the visa-free zone "
                                    weight={600}
                                    styles={{
                                        lineHeight: "200%",
                                        display: "inline",
                                    }}
                                />
                                <Text
                                    type="p"
                                    text="the area behind security control, where the gates are) during layover and enter the layover country to recheck your baggage, check in for your next flight, change terminals, or simply because of the airport’s design."
                                    size={16}
                                    styles={{
                                        lineHeight: "200%",
                                        display: "inline",
                                    }}
                                />
                            </Section>
                        </Flex>
                        <Flex
                            gap={"1.45rem"}
                            styles={{ marginBottom: "1.5rem" }}
                        >
                            <BiSolidSquare
                                size={14}
                                color={ttColors.primary}
                                style={{ flex: "none", marginTop: "0.5rem" }}
                            />
                            <Section>
                                <Text
                                    type="p"
                                    text="If there are "
                                    size={16}
                                    styles={{
                                        lineHeight: "200%",
                                        display: "inline",
                                    }}
                                />
                                <Text
                                    type="p"
                                    text="delays or disruptions "
                                    size={16}
                                    weight={600}
                                    styles={{
                                        lineHeight: "200%",
                                        display: "inline",
                                    }}
                                />
                                <Text
                                    type="p"
                                    text="during travel — like a delayed flight that will cause you to miss your second flight — the carrier who caused the disruption will only help you with flights that are part of their reservation. "
                                    size={16}
                                    styles={{
                                        lineHeight: "200%",
                                        display: "inline",
                                    }}
                                />
                                <Text
                                    type="p"
                                    text="They won’t help you find a replacement or issue a refund for any other flights you missed. "
                                    size={16}
                                    weight={600}
                                    styles={{
                                        lineHeight: "200%",
                                        display: "inline",
                                    }}
                                />
                                <Text
                                    type="p"
                                    text="And the same applies to any extra compensation you might be legally entitled to — only the disrupted carrier reservation will be taken into consideration."
                                    size={16}
                                    styles={{
                                        lineHeight: "200%",
                                        display: "inline",
                                    }}
                                />
                            </Section>
                        </Flex>
                        <Flex gap={"1.45rem"} styles={{ marginBottom: "0rem" }}>
                            <Section
                                width="28px"
                                styles={{ flex: "none", marginTop: "0.5rem" }}
                            >
                                <Image
                                    src={"/assets/icons/articles/bulb_icon.svg"}
                                    alt="idea"
                                    width={28}
                                    height={28}
                                />
                            </Section>
                            <Text
                                type="p"
                                text="To stay covered in situations like this, we recommend adding the Kiwi.com Guarantee. With Kiwi.com Guarantee, we’ll cover another flight to your destination for you or give you a full instant refund. Check this article to find out more about your rights when your trip gets canceled, changed, or delayed."
                                size={16}
                                styles={{
                                    fontStyle: "italic",
                                    lineHeight: "200%",
                                }}
                            />
                        </Flex>
                    </Section>
                </Section>

                <Section styles={{ marginBottom: "2.875rem" }}>
                    <Text
                        type="h4"
                        styles={{ marginBottom: "1rem", lineHeight: "200%" }}
                        size={22}
                        weight={600}
                        text="Rechecking your baggage between flights"
                    />
                    <Text
                        type="p"
                        text="If you have checked baggage or if the airline takes your cabin baggage into the cargo hold, you will need to “recheck” it. Here’s how to do it:"
                        size={16}
                        styles={{ marginBottom: "1.5rem", lineHeight: "200%" }}
                    />
                    <Section>
                        <Flex gap={"1.45rem"} styles={{ marginBottom: "1rem" }}>
                            <BiSolidSquare
                                size={14}
                                color={ttColors.primary}
                                style={{ flex: "none", marginTop: "0.5rem" }}
                            />
                            <Text
                                type="p"
                                text="Collect your baggage at the transfer airport. Go to the Baggage claim area and look for the belt with your previous flight number."
                                size={16}
                                styles={{ lineHeight: "200%" }}
                            />
                        </Flex>
                        <Flex
                            gap={"1.45rem"}
                            styles={{ marginBottom: "1.5rem" }}
                        >
                            <BiSolidSquare
                                size={14}
                                color={ttColors.primary}
                                style={{ flex: "none", marginTop: "0.5rem" }}
                            />
                            <Text
                                type="p"
                                text="Get out of the visa-free zone and take your baggage to the check-in counter (or baggage drop) for your next flight."
                                size={16}
                                styles={{ lineHeight: "200%" }}
                            />
                        </Flex>
                        <Flex
                            gap={"1.45rem"}
                            styles={{ marginBottom: "1.5rem" }}
                        >
                            <BiSolidSquare
                                size={14}
                                color={ttColors.primary}
                                style={{ flex: "none", marginTop: "0.5rem" }}
                            />
                            <Text
                                type="p"
                                text="Go through security and customs to the gate of your next flight — just like you did at your departure airport."
                                size={16}
                                styles={{ lineHeight: "200%" }}
                            />
                        </Flex>
                        <Flex gap={"1.45rem"} styles={{ marginBottom: "0rem" }}>
                            <Section
                                width="28px"
                                styles={{ flex: "none", marginTop: "0.5rem" }}
                            >
                                <Image
                                    src={
                                        "/assets/icons/articles/warning_icon.svg"
                                    }
                                    alt="warning"
                                    width={28}
                                    height={28}
                                />
                            </Section>
                            <Text
                                type="p"
                                text="If the self-transfer is too short, we won’t offer you checked baggage at all — you would not have enough time to recheck it. You’ll see this before you book your trip."
                                size={16}
                                styles={{
                                    fontStyle: "italic",
                                    lineHeight: "200%",
                                }}
                            />
                        </Flex>
                    </Section>
                </Section>
                <Section styles={{ marginBottom: "2.875rem" }}>
                    <Text
                        type="h4"
                        styles={{ marginBottom: "1rem", lineHeight: "200%" }}
                        size={22}
                        weight={600}
                        text="Check-in for your next flight"
                    />
                    <Text
                        type="p"
                        text="We usually offer to check you in online and send you your boarding passes in advance. But if you do not have your boarding pass for your next flight, you will need to go out of the visa-free zone to check in."
                        size={16}
                        styles={{ marginBottom: "1.5rem", lineHeight: "200%" }}
                    />
                </Section>
                <Section styles={{ marginBottom: "2.875rem" }}>
                    <Text
                        type="h4"
                        styles={{ marginBottom: "1rem", lineHeight: "200%" }}
                        size={22}
                        weight={600}
                        text="Going through immigration"
                    />
                    <Text
                        type="p"
                        text="You might need to leave the visa-free zone even if you don’t have checked baggage and are already checked in for the next flight."
                        size={16}
                        styles={{ marginBottom: "1.5rem", lineHeight: "200%" }}
                    />
                    <Text
                        type="p"
                        text="At some airports, you go through passport control and immigration right after arrival. If you need a visa or documents related to COVID-19 to enter the country, you will also need it for the self-transfer."
                        size={16}
                        styles={{ marginBottom: "1.5rem", lineHeight: "200%" }}
                    />
                    <Flex gap={"1.45rem"} styles={{ marginBottom: "0rem" }}>
                        <Section
                            width="28px"
                            styles={{ flex: "none", marginTop: "0.5rem" }}
                        >
                            <Image
                                src={"/assets/icons/articles/warning_icon.svg"}
                                alt="warning"
                                width={28}
                                height={28}
                            />
                        </Section>
                        <Text
                            type="p"
                            text="You’ll need the same documents as if the transfer country were your final destination. You’ll find more info here."
                            size={16}
                            styles={{ fontStyle: "italic", lineHeight: "200%" }}
                        />
                    </Flex>
                </Section>

                <Section styles={{ marginBottom: "2.875rem" }}>
                    <Text
                        type="h4"
                        styles={{ marginBottom: "1rem", lineHeight: "200%" }}
                        size={22}
                        weight={600}
                        text="Transfer between different airport terminals"
                    />
                    <Section>
                        <Text
                            type="p"
                            text="At some large airports, you might also need to travel to a "
                            styles={{ lineHeight: "200%", display: "inline" }}
                            size={16}
                        />
                        <Text
                            type="p"
                            text="different terminal. "
                            styles={{ lineHeight: "200%", display: "inline" }}
                            size={16}
                            weight={600}
                        />
                        <Text
                            type="p"
                            text="The terminals might not be connected."
                            size={16}
                            styles={{ lineHeight: "200%", display: "inline" }}
                        />
                    </Section>
                </Section>
                <Section styles={{ marginBottom: "2.875rem" }}>
                    <Text
                        type="h4"
                        styles={{ marginBottom: "1rem", lineHeight: "200%" }}
                        size={22}
                        weight={600}
                        text="Did this article help you?"
                    />
                    <Flex gap="0.5rem">
                        <Button background={ttColors.lightAsh}>
                            <Flex gap="6px">
                                <BiSolidLike
                                    size={20}
                                    color={Theme.TextColor}
                                />{" "}
                                <Text
                                    type="p"
                                    weight={600}
                                    size={16}
                                    text="Yes"
                                    color={Theme.TextColor}
                                />
                            </Flex>
                        </Button>
                        <Button background={ttColors.lightAsh}>
                            <Flex gap="6px">
                                <BiSolidDislike
                                    size={20}
                                    color={Theme.TextColor}
                                />{" "}
                                <Text
                                    type="p"
                                    weight={600}
                                    size={16}
                                    text="No"
                                    color={Theme.TextColor}
                                />
                            </Flex>
                        </Button>
                    </Flex>
                </Section>
            </Section>
        </SectionLayout>
    );
};

export default SelfTransferPage;
