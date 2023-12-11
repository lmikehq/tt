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
                            text="Offers a budget-friendly approach to travel "
                            size={16}
                            styles={{ display: "inline" }}
                        />
                        <Text
                            type="p"
                            text="by consolidating individual flights, train, or bus tickets "
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
                        text="For example, choosing separate tickets for New York → Amsterdam and Amsterdam → Prague may be more economical than a direct ticket from New York to Prague, leading us to arrange these distinct flights for you."
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
                        text="However, there's a catch:"
                    />
                    <Text
                        type="p"
                        text="This unofficial itinerary isn't endorsed by the carriers, and they absolve themselves of any responsibility for the unofficial connections involved in self-transfer."
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
                                    text="You might find it necessary to "
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
                                    text="exit the visa-free zone "
                                    weight={600}
                                    styles={{
                                        lineHeight: "200%",
                                        display: "inline",
                                    }}
                                />
                                <Text
                                    type="p"
                                    text="(the area beyond security control, where the gates are) to recheck your baggage, check in for your next flight, change terminals, or simply due to the airport's design."
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
                                    text="Such as a  "
                                    size={16}
                                    styles={{
                                        lineHeight: "200%",
                                        display: "inline",
                                    }}
                                />
                                <Text
                                    type="p"
                                    text="delayed flight "
                                    size={16}
                                    weight={600}
                                    styles={{
                                        lineHeight: "200%",
                                        display: "inline",
                                    }}
                                />
                                <Text
                                    type="p"
                                    text=" leading to a missed second flight, the carrier responsible for the disruption will only assist with flights within their reservation. "
                                    size={16}
                                    styles={{
                                        lineHeight: "200%",
                                        display: "inline",
                                    }}
                                />
                                <Text
                                    type="p"
                                    text="They won't facilitate finding replacements or issuing refunds for any other missed flights, "
                                    size={16}
                                    weight={600}
                                    styles={{
                                        lineHeight: "200%",
                                        display: "inline",
                                    }}
                                />
                                <Text
                                    type="p"
                                    text="and this includes any additional compensation you might legally be entitled to."
                                    size={16}
                                    styles={{
                                        lineHeight: "200%",
                                        display: "inline",
                                    }}
                                />
                            </Section>
                        </Flex>
                        {/* <Flex gap={"1.45rem"} styles={{ marginBottom: "0rem" }}>
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
                        </Flex> */}
                    </Section>
                </Section>

                <Section styles={{ marginBottom: "2.875rem" }}>
                    <Text
                        type="h4"
                        styles={{ marginBottom: "1rem", lineHeight: "200%" }}
                        size={22}
                        weight={600}
                        text="Concerning the rechecking of your baggage between flights"
                    />
                    <Text
                        type="p"
                        text={`If you have checked baggage or if the airline places your cabin baggage in the cargo hold, a "recheck" is necessary. Here's the process:`}
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
                                text="Collect your baggage at the transfer airport, go to the baggage claim area, locate the belt with your previous flight number"
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
                                text="Leave the visa-free zone, take your baggage to the check-in counter for your next flight."
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
                                text="Go through security and customs to the gate of your next flight, following a similar process to that of your departure airport."
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
                        text="We typically offer online check-in and send boarding passes in advance. However, if you don't have your boarding pass, you'll need to leave the visa-free zone to check in."
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
                        text="You might need to go through immigration even if you don't have checked baggage and are already checked in for the next flight."
                        size={16}
                        styles={{ marginBottom: "1.5rem", lineHeight: "200%" }}
                    />
                    <Text
                        type="p"
                        text="At certain airports, passport control and immigration may occur immediately upon arrival. If a visa or COVID-19-related documents are required to enter the country, they'll also be necessary for the self-transfer."
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
                            text="The same documents required as if the transfer country were your final destination."
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
                            text="At large airports, you might need to transfer between "
                            styles={{ lineHeight: "200%", display: "inline" }}
                            size={16}
                        />
                        <Text
                            type="p"
                            text="different terminals, "
                            styles={{ lineHeight: "200%", display: "inline" }}
                            size={16}
                            weight={600}
                        />
                        <Text
                            type="p"
                            text=" as they may not be interconnected."
                            size={16}
                            styles={{ lineHeight: "200%", display: "inline" }}
                        />
                    </Section>
                </Section>
                {/* <Section styles={{ marginBottom: "2.875rem" }}>
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
                </Section> */}
            </Section>
        </SectionLayout>
    );
};

export default SelfTransferPage;
