import React, { useState } from "react";
import { Container, GridLayout, Span } from "../view/styles";
import Flex from "@/components/templates/flex";
import Text from "@/components/atoms/text";
import WifiIcon from "@mui/icons-material/Wifi";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import PetsIcon from "@mui/icons-material/Pets";
import ZoomInMapIcon from "@mui/icons-material/ZoomInMap";
import BedIcon from "@mui/icons-material/Bed";
import SmokeFreeIcon from "@mui/icons-material/SmokeFree";
import CollectionsIcon from "@mui/icons-material/Collections";
import { GalleryModal } from "../view/modals/Modals";
import { ViewSingleStayResponse } from "@/lib/types/response-models/stay/search.type";
import dayjs from "dayjs";

interface HotelDetailProps {
    hotel: ViewSingleStayResponse;
    checkInDate: string;
    checkOutDate: string;
    durationDays: number;
}

function HotelDetail({
    hotel,
    checkInDate,
    checkOutDate,
    durationDays,
}: HotelDetailProps) {
    const [open, setOpen] = useState({
        gallery: false,
    });

    return (
        <Container className="hotel_details_container">
            <Span style={{ marginBottom: "15px" }}>
                <Flex direction="column">
                    <Span style={{ position: "relative" }}>
                        <img
                            src="/assets/images/stays/image1.jpg"
                            alt=""
                            style={{ width: "100%", height: "auto" }}
                        />
                        <Span
                            onClick={() =>
                                setOpen((prev) => ({
                                    ...prev,
                                    gallery: true,
                                }))
                            }
                            style={{
                                position: "absolute",
                                right: "10px",
                                color: "var(--default-color)",
                                bottom: "20px",
                                backgroundColor: "var(--secondary-color)",
                                padding: "8px",
                                borderRadius: "20px",
                                cursor: "pointer",
                            }}
                        >
                            <Flex align="center" gap="5px">
                                <CollectionsIcon />
                                <Text type="p" text="1/35"></Text>
                            </Flex>
                        </Span>
                    </Span>
                </Flex>

                {/* GALLERY MODAL*/}
                <GalleryModal
                    open={open.gallery}
                    handleClose={() =>
                        setOpen((prev) => ({
                            ...prev,
                            gallery: false,
                        }))
                    }
                />
                <Span style={{ padding: "10px 25px" }}>
                    <Flex direction="column" styles={{ marginBottom: "10px" }}>
                        <Text type="h2" weight={600} text={hotel.name} />
                        <Text
                            type="p"
                            weight={500}
                            color="var(--text-gray-color)"
                            text={hotel.address}
                        ></Text>
                    </Flex>
                    <Flex direction="column">
                        <Flex justify="space-between" align="center">
                            <Span>
                                <Flex direction="column">
                                    <Text
                                        size={16}
                                        type="p"
                                        text="Check-In"
                                    ></Text>
                                    <Text
                                        type="h3"
                                        weight={600}
                                        text={checkInDate}
                                    ></Text>
                                    <Text
                                        size={16}
                                        type="p"
                                        text={`From ${dayjs(
                                            hotel.check_in_time,
                                            "HH:mm:ss"
                                        ).format("HH:mm")}`}
                                    ></Text>
                                </Flex>
                            </Span>
                            <Span className="border"></Span>
                            <Span>
                                <Flex direction="column">
                                    <Text
                                        size={16}
                                        type="p"
                                        text="Check-Out"
                                    ></Text>
                                    <Text
                                        type="h3"
                                        weight={600}
                                        text={checkOutDate}
                                    ></Text>
                                    <Text
                                        size={14}
                                        type="p"
                                        text={`From ${dayjs(
                                            hotel.check_out_time,
                                            "HH:mm:ss"
                                        ).format("HH:mm")}`}
                                    ></Text>
                                </Flex>
                            </Span>
                        </Flex>
                        <Flex
                            align="center"
                            justify="space-between"
                            margin="20px 0px"
                        >
                            <Span>
                                <Flex direction="column">
                                    <Text
                                        size={16}
                                        type="p"
                                        text="Rooms"
                                    ></Text>
                                    <Text
                                        type="h3"
                                        weight={600}
                                        text={`${
                                            hotel.facts.rooms_number
                                        } Room${
                                            hotel.facts.rooms_number == 1
                                                ? ""
                                                : "s"
                                        }`}
                                    ></Text>
                                </Flex>
                            </Span>
                            <Span className="border"></Span>
                            <Span>
                                <Flex direction="column">
                                    <Text
                                        size={16}
                                        type="p"
                                        text="Duration"
                                    ></Text>
                                    <Text
                                        type="h3"
                                        weight={600}
                                        text={`${durationDays} day${
                                            durationDays == 1 ? "" : "s"
                                        }`}
                                    ></Text>
                                </Flex>
                            </Span>
                        </Flex>
                    </Flex>
                    <Span>
                        <GridLayout className="stay_details_grid">
                            <Flex gap="8px" align="center">
                                <ZoomInMapIcon style={{ fontSize: "20px" }} />
                                <Text
                                    whiteSpace="nowrap"
                                    type="p"
                                    size={16}
                                    weight={400}
                                    text="40 m²"
                                />
                            </Flex>
                            <Flex
                                gap="8px"
                                align="center"
                                className="flex-end"
                                justify="flex-end"
                            >
                                <PetsIcon style={{ fontSize: "20px" }} />
                                <Text
                                    whiteSpace="nowrap"
                                    type="p"
                                    size={16}
                                    weight={400}
                                    text="Pet Friendly"
                                />
                            </Flex>{" "}
                            <Flex gap="8px" align="center">
                                <FreeBreakfastIcon
                                    style={{ fontSize: "20px" }}
                                />
                                <Text
                                    whiteSpace="nowrap"
                                    type="p"
                                    size={16}
                                    weight={400}
                                    text="Meals not included"
                                />
                            </Flex>
                            <Flex
                                gap="8px"
                                align="center"
                                className="flex-end"
                                justify="flex-end"
                            >
                                <BedIcon style={{ fontSize: "20px" }} />
                                <Text
                                    whiteSpace="nowrap"
                                    type="h1"
                                    size={16}
                                    weight={400}
                                    text="1 King Bed"
                                />
                            </Flex>{" "}
                            <Flex gap="8px" align="center">
                                <WifiIcon style={{ fontSize: "20px" }} />
                                <Text
                                    whiteSpace="nowrap"
                                    type="h1"
                                    size={16}
                                    weight={400}
                                    text="WiFi"
                                />
                            </Flex>{" "}
                            <Flex
                                gap="8px"
                                align="center"
                                className="flex-end"
                                justify="flex-end"
                            >
                                <SmokeFreeIcon style={{ fontSize: "20px" }} />
                                <Text
                                    whiteSpace="nowrap"
                                    type="h1"
                                    size={16}
                                    weight={400}
                                    text="No Smoking"
                                />
                            </Flex>
                        </GridLayout>
                    </Span>
                </Span>
            </Span>
        </Container>
    );
}

export default HotelDetail;
