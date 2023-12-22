import React, { useState } from "react";
import {
    BtnDetails,
    Container,
    GridLayout,
    Header,
    Span,
} from "../view/styles";
import Text from "@/components/atoms/text";
import Input, { TextField } from "@/components/atoms/input";
import Section from "../../section";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import Flex from "@/components/templates/flex";
import { Checkbox, FormControlLabel } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { FaUserMinus, FaUserPlus } from "react-icons/fa";
import PhoneInput from "react-phone-number-input";
import { ttColors } from "@/lib/theme/colors";
import Divider from "@mui/material/Divider";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useFormik } from "formik";
import {
    RoomForGuest,
    numberOfGuestsInRooms,
} from "@/lib/types/request-models/stay/search.type";
import { generateInitialFormDataForRoomsAndGuests } from "@/lib/types/request-models/stay/booking.type";
import { generateValidationSchemaForRoomsAndGuests } from "@/lib/extensions/schemas/stay/booking.schema";
import FirstAndLastNameInput from "./widgets/FirstAndLastName";
import ordinal from "ordinal";

interface CheckingInProps {
    guests: RoomForGuest[];
}

function CheckingIn({ guests }: CheckingInProps) {
    const { isMobile } = useScreenResolution();
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    const [isGridVisible, setIsGridVisible] = useState(false);

    const handleToggleGrid = () => {
        setIsGridVisible(!isGridVisible);
    };
    // const [value, setValue] = useState<string | undefined>("");

    const roomsAndGuestsDataFormik = useFormik({
        initialValues: generateInitialFormDataForRoomsAndGuests(guests),
        enableReinitialize: true,
        validateOnMount: true,
        validationSchema: generateValidationSchemaForRoomsAndGuests(guests),
        onSubmit: (values) => {},
    });

    return (
        <Container style={{ overflow: "hidden" }}>
            <Header>
                <Text weight={600} type="h3" text="Who is checking in?"></Text>
            </Header>
            <Span>
                {guests.map((room, index) => (
                    <Section key={"room" + index} margin="0 0 1rem 0">
                        <Section>
                            <Text
                                type="h4"
                                weight={600}
                                text={`Room ${index + 1}`}
                            />
                        </Section>
                        <FirstAndLastNameInput
                            namePrefix={`${index}.guests.0`}
                            formik={roomsAndGuestsDataFormik}
                        />
                        <Span>
                            {roomsAndGuestsDataFormik.values[`${index}`]
                                .displayOtherGuests &&
                                Array.from(
                                    {
                                        length:
                                            room.adults +
                                            room.children.length -
                                            1,
                                    },
                                    (_, i) => (
                                        <Section
                                            key={"room" + index + "guest" + i}
                                        >
                                            {/* Guest DIVIDER */}
                                            <Flex
                                                direction="column"
                                                margin="10px 0px"
                                            >
                                                <Flex
                                                    align="center"
                                                    gap="20px"
                                                    width="100%"
                                                    overflow="hidden"
                                                >
                                                    <BtnDetails
                                                        style={{
                                                            backgroundColor:
                                                                "var(--primary-light-color)",
                                                            border: "1px solid var(--primary-color)",
                                                            cursor: "default",
                                                        }}
                                                    >
                                                        <Flex>
                                                            <Text
                                                                weight={500}
                                                                size={15}
                                                                whiteSpace="nowrap"
                                                                type="p"
                                                                text={`${ordinal(
                                                                    i + 2
                                                                )} Guest`}
                                                            ></Text>
                                                        </Flex>
                                                    </BtnDetails>
                                                    <Flex>
                                                        <Divider
                                                            style={{
                                                                width: "100%",
                                                            }}
                                                        />
                                                    </Flex>
                                                </Flex>
                                            </Flex>

                                            <FirstAndLastNameInput
                                                namePrefix={`${index}.guests.${
                                                    i + 1
                                                }`}
                                                formik={
                                                    roomsAndGuestsDataFormik
                                                }
                                            />
                                        </Section>
                                    )
                                )}

                            <Flex
                                align="center"
                                gap="10px"
                                margin="8px 0px"
                                onClick={() =>
                                    roomsAndGuestsDataFormik.setFieldValue(
                                        `${index}.displayOtherGuests`,
                                        !roomsAndGuestsDataFormik.values[
                                            `${index}`
                                        ].displayOtherGuests
                                    )
                                }
                                styles={{ cursor: "pointer" }}
                            >
                                {roomsAndGuestsDataFormik.values[`${index}`]
                                    .displayOtherGuests ? (
                                    <FaUserMinus style={{ fontSize: "20px" }} />
                                ) : (
                                    <FaUserPlus style={{ fontSize: "20px" }} />
                                )}
                                <Text
                                    weight={500}
                                    type="p"
                                    text={
                                        isGridVisible
                                            ? "Remove name(s) of other guests"
                                            : "Add name(s) of other guests"
                                    }
                                />
                            </Flex>
                        </Span>
                    </Section>
                ))}
                <Section>
                    <Flex
                        align="center"
                        gap="10px"
                        margin="10px 0px"
                        cursor="pointer"
                        width="fit-content"
                        onClick={handleToggle}
                    >
                        <Text
                            type="p"
                            weight={600}
                            text="Special Requests"
                        ></Text>
                        {isExpanded ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </Flex>

                    {isExpanded && (
                        <Flex direction="column">
                            <Flex>
                                <Text
                                    type="p"
                                    text="Hotel accommodations may consider special requests based on their discretion and availability. If you wish to ensure specific services, kindly reach out to our Customer Support for guaranteed options."
                                ></Text>
                            </Flex>
                            <Span style={{ marginTop: "20px" }}>
                                <textarea
                                    name="text"
                                    placeholder="Enter request here"
                                    style={{
                                        width: "100%",
                                        padding: "10px",
                                        fontSize: "16px",
                                        fontFamily: "var(--poppins-font)",
                                        resize: "none",
                                        borderRadius: "9px",
                                        minHeight: "200px",
                                        border: "1px solid var(--color-light-gray)",
                                        outlineColor: ttColors.primary,
                                        outlineWidth: "1px",
                                    }}
                                ></textarea>
                            </Span>
                        </Flex>
                    )}
                </Section>
            </Span>
        </Container>
    );
}

export default CheckingIn;
