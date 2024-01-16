import styled from "styled-components";
import NoVisaApplication from "./noApplication";
import VisaDashboardHeader from "./visaDashboardHeader";
// import NoVisaBg from "@image/background.png"
// import FlightImg from "@image/flight.png"
import Text from "@atom/text";
import Image from "@atom/image";
import FlightIcon from "public/assets/icons/dashboard/plane-track.svg";
import { ttColors } from "@lib/theme/colors";
import Flex from "@/components/templates/flex";
import Center from "@/components/templates/center";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { Divider } from "@mui/material";
import { Grid } from "@/components/templates/grid";
import { useState } from "react";
import SimplePopper from "@/components/organisms/SimplePopper/SimplePopper";

const FlightWrapper = styled.div`
    background: ${ttColors.defaultColor};
    align-items: center;
    margin-top: 15px;

    & button {
        width: 154px !important;
    }

    @media screen and (max-width: 900px) {
        height: fit-content;
        padding: 20px 16px;
    }
`;
const History = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
    // height: 311px;
    border: 1px solid #e7e7e7;
    border-radius: 14px;
`;

const NotificationWrapper = styled.div`
    background: ${ttColors.defaultColor};
    align-items: center;
    margin-top: 15px;

    & button {
        width: 154px !important;
    }

    @media screen and (max-width: 900px) {
        height: fit-content;
        padding: 20px 16px;
    }
`;

const TextContainer = styled.div`
    background: #f3f3ff;
    padding: 10px;
    border-radius: 20px;
    width: 88px;
    text-align: center;
    justify-content: center;
`;

const Flight = () => {
    const { isMobile } = useScreenResolution();
    const content = {
        title: "You’ve booked no Flight Ticket yet - Let’s help you get Started",
        links: [
            { text: "Search Flights", url: "/flight" },
            { text: "Search Stays", url: "/stays" },
        ],
    };

    // function NoFlightImg() {
    //   return <Image src="/assets/images/flight.png" alt="" />;
    // }

    const flightArr: number[] = [1];

    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleHover = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
        setOpen((prev) => !prev);
    };

    const reset = () => {
        setAnchorEl(null);
        setOpen(false);
    };

    return (
        <FlightWrapper>
            <VisaDashboardHeader headerText="All Flight Applications" />

            {flightArr.length > 0 ? (
                <Flex direction="column" gap="1rem">
                    {isMobile ? (
                        <MobileFlight />
                    ) : (
                        <History>
                            <Grid
                                columns={""}
                                style={{ gridTemplateColumns: "1fr auto 1fr" }}
                                align="flex-start"
                                gap="80px"
                                padding="28px 24px"
                            >
                                <Flex gap="1.5rem" align="flex-start">
                                    <Flex
                                        direction="column"
                                        align="center"
                                        justify="flex-start"
                                        width="15%"
                                    >
                                        <Text
                                            type="h1"
                                            text="25"
                                            size={48}
                                            weight={600}
                                        />
                                        <Text
                                            type="p"
                                            text="Aug"
                                            size={20}
                                            weight={200}
                                            styles={{
                                                position: "relative",
                                                top: "-10px",
                                            }}
                                        />
                                    </Flex>
                                    <Flex justify="flex-start" gap="18px">
                                        <Flex
                                            direction="column"
                                            width="max-content"
                                        >
                                            <Text
                                                type="h3"
                                                text="Murtala Muhammed Airport"
                                                margin="0px 0px .5rem"
                                                onMouseEnter={handleHover}
                                                onMouseLeave={reset}
                                            />
                                            <SimplePopper
                                                open={open}
                                                anchorEl={anchorEl}
                                            >
                                                <Text
                                                    type="h3"
                                                    text="Murtala Muhammed Airport"
                                                    margin="0px 0px .5rem"
                                                />
                                            </SimplePopper>

                                            <Text
                                                type="p"
                                                text="11:25"
                                                color="#606060"
                                                weight={600}
                                                size={16}
                                                styles={{
                                                    letterSpacing: "0.1rem",
                                                }}
                                            />
                                        </Flex>
                                        <Text
                                            type="p"
                                            text="LAG"
                                            color="#929292"
                                        />
                                    </Flex>
                                </Flex>

                                <Flex
                                    direction="column"
                                    align="center"
                                    gap="1rem"
                                >
                                    <Image
                                        src={FlightIcon}
                                        alt=""
                                        width={119}
                                        height={20}
                                    />
                                    <TextContainer>
                                        <Text type="p" text="3 Stops" />
                                    </TextContainer>
                                </Flex>

                                <Flex gap="0rem" align="center">
                                    <Flex justify="flex-start" gap="18px">
                                        <Flex
                                            direction="column"
                                            width="max-content"
                                        >
                                            <Text
                                                type="h3"
                                                text="Düsseldorf International Ai..."
                                                margin="0px 0px .5rem"
                                            />

                                            <Text
                                                type="p"
                                                text="11:25"
                                                color="#606060"
                                                weight={600}
                                                size={16}
                                                styles={{
                                                    letterSpacing: "0.1rem",
                                                }}
                                            />
                                        </Flex>
                                        <Text
                                            type="p"
                                            text="DUS"
                                            color="#929292"
                                        />
                                    </Flex>
                                    <Flex
                                        direction="column"
                                        align="flex-start"
                                        width="20%"
                                    >
                                        <Text
                                            type="h3"
                                            text="DEPART"
                                            size={28}
                                            weight={600}
                                            color="#7BBBD6"
                                            styles={{
                                                transform: "rotate(-90deg)",
                                            }}
                                        />
                                    </Flex>
                                </Flex>
                            </Grid>

                            <Grid
                                columns={""}
                                style={{ gridTemplateColumns: "1fr auto 1fr" }}
                                align="flex-start"
                                gap="80px"
                                padding="28px 24px"
                            >
                                <Flex gap="1.5rem" align="flex-start">
                                    <Flex
                                        direction="column"
                                        align="center"
                                        width="15%"
                                    >
                                        <Text
                                            type="h1"
                                            text="12"
                                            size={48}
                                            weight={600}
                                        />
                                        <Text
                                            type="p"
                                            text="Sept"
                                            size={20}
                                            weight={200}
                                            styles={{
                                                position: "relative",
                                                top: "-10px",
                                            }}
                                        />
                                    </Flex>
                                    <Flex justify="flex-start" gap="18px">
                                        <Flex
                                            direction="column"
                                            width="max-content"
                                        >
                                            <Text
                                                type="h3"
                                                text="Murtala Muhammed Airport"
                                                margin="0px 0px .5rem"
                                            />

                                            <Text
                                                type="p"
                                                text="11:25"
                                                color="#606060"
                                                weight={600}
                                                size={16}
                                                styles={{
                                                    letterSpacing: "0.1rem",
                                                }}
                                            />
                                        </Flex>
                                        <Text
                                            type="p"
                                            text="LAG"
                                            color="#929292"
                                        />
                                    </Flex>
                                </Flex>

                                <Flex
                                    direction="column"
                                    align="center"
                                    gap="1rem"
                                >
                                    <Image
                                        src={FlightIcon}
                                        alt=""
                                        width={119}
                                        height={20}
                                    />
                                    <TextContainer>
                                        <Text type="p" text="3 Stops" />
                                    </TextContainer>
                                </Flex>

                                <Flex gap="0rem" align="center">
                                    <Flex justify="flex-start" gap="18px">
                                        <Flex
                                            direction="column"
                                            width="max-content"
                                        >
                                            <Text
                                                type="h3"
                                                text="Düsseldorf International Ai..."
                                                margin="0px 0px .5rem"
                                            />

                                            <Text
                                                type="p"
                                                text="11:25"
                                                color="#606060"
                                                weight={600}
                                                size={16}
                                                styles={{
                                                    letterSpacing: "0.1rem",
                                                }}
                                            />
                                        </Flex>
                                        <Text
                                            type="p"
                                            text="DUS"
                                            color="#929292"
                                        />
                                    </Flex>
                                    <Flex
                                        direction="column"
                                        align="flex-start"
                                        width="20%"
                                    >
                                        <Text
                                            type="h3"
                                            text="RETURN"
                                            size={28}
                                            weight={600}
                                            color="#7BBBD6"
                                            styles={{
                                                transform: "rotate(-90deg)",
                                            }}
                                        />
                                    </Flex>
                                </Flex>
                            </Grid>
                        </History>
                    )}
                </Flex>
            ) : (
                <Center>
                    <NoVisaApplication
                        noVisaImage={"/assets/images/flight.png"}
                        content={content}
                    />
                </Center>
            )}
        </FlightWrapper>
    );
};

export default Flight;

const MobileFlight = () => {
    return (
        <History>
            <Grid
                columns={""}
                gap="18px"
                padding="22px 10px"
                style={{ gridTemplateColumns: "10% 1fr 10%" }}
            >
                <Flex direction="column" align="center" justify="center">
                    <Text type="h1" text="15" size={28} weight={600} />
                    <Text
                        type="p"
                        text="Aug"
                        size={16}
                        weight={200}
                        styles={{ position: "relative", top: "-10px" }}
                    />
                </Flex>

                <Flex direction="column" gap="18px">
                    <Flex justify="flex-start">
                        <Flex direction="column" gap="12px">
                            <Text
                                type="h3"
                                text="Murtala Muhammed Airport"
                                size={16}
                                weight={500}
                            />

                            <Text
                                type="p"
                                text="11:25"
                                color="#606060"
                                weight={600}
                                size={20}
                                styles={{
                                    letterSpacing: "0.1rem",
                                }}
                            />
                        </Flex>
                        <Text type="p" text="LAG" color="#929292" />
                    </Flex>

                    <Flex direction="row" align="center" gap="1rem">
                        <Image
                            src={FlightIcon}
                            alt=""
                            width={119}
                            height={20}
                        />
                        <TextContainer>
                            <Text type="p" text="3 Stops" />
                        </TextContainer>
                    </Flex>

                    <Flex gap="0rem" align="center">
                        <Flex justify="flex-start">
                            <Flex direction="column" gap="12px">
                                <Text
                                    type="h3"
                                    text="Düsseldorf International Ai..."
                                    size={16}
                                    weight={500}
                                />

                                <Text
                                    type="p"
                                    text="11:25"
                                    color="#606060"
                                    weight={600}
                                    size={20}
                                    styles={{
                                        letterSpacing: "0.1rem",
                                    }}
                                />
                            </Flex>
                            <Text type="p" text="DUS" color="#929292" />
                        </Flex>
                    </Flex>
                </Flex>

                <Flex direction="column" align="center" justify="center">
                    <Text
                        type="h3"
                        text="DEPART"
                        size={18}
                        weight={600}
                        color="#7BBBD6"
                        styles={{
                            transform: "rotate(-90deg)",
                        }}
                    />
                </Flex>
            </Grid>
            <Divider sx={{ margin: "0 20px" }} />

            <Grid
                columns={""}
                gap="18px"
                padding="22px 10px"
                style={{ gridTemplateColumns: "10% 1fr 10%" }}
            >
                <Flex direction="column" align="center" justify="center">
                    <Text
                        type="h1"
                        text="15"
                        size={28}
                        weight={600}
                        margin={0}
                    />
                    <Text
                        type="p"
                        text="Aug"
                        size={16}
                        weight={200}
                        styles={{ position: "relative", top: "-10px" }}
                    />
                </Flex>

                <Flex direction="column" gap="18px">
                    <Flex justify="flex-start">
                        <Flex direction="column" gap="12px">
                            <Text
                                type="h3"
                                text="Murtala Muhammed Airport"
                                size={16}
                                weight={500}
                            />

                            <Text
                                type="p"
                                text="11:25"
                                color="#606060"
                                weight={600}
                                size={20}
                                styles={{
                                    letterSpacing: "0.1rem",
                                }}
                            />
                        </Flex>
                        <Text type="p" text="LAG" color="#929292" />
                    </Flex>

                    <Flex direction="row" align="center" gap="1rem">
                        <Image
                            src={FlightIcon}
                            alt=""
                            width={119}
                            height={20}
                        />
                        <TextContainer>
                            <Text type="p" text="3 Stops" />
                        </TextContainer>
                    </Flex>

                    <Flex gap="0rem" align="center">
                        <Flex justify="flex-start">
                            <Flex direction="column" gap="12px">
                                <Text
                                    type="h3"
                                    text="Düsseldorf International Ai..."
                                    size={16}
                                    weight={500}
                                />

                                <Text
                                    type="p"
                                    text="11:25"
                                    color="#606060"
                                    weight={600}
                                    size={20}
                                    styles={{
                                        letterSpacing: "0.1rem",
                                    }}
                                />
                            </Flex>
                            <Text type="p" text="DUS" color="#929292" />
                        </Flex>
                    </Flex>
                </Flex>

                <Flex direction="column" align="center" justify="center">
                    <Text
                        type="h3"
                        text="DEPART"
                        size={18}
                        weight={600}
                        color="#7BBBD6"
                        styles={{
                            transform: "rotate(-90deg)",
                        }}
                    />
                </Flex>
            </Grid>
        </History>
    );
};
