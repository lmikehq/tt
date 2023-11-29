import React, { useState } from "react";
import { Span } from "../../styles";
import Flex from "@/components/templates/flex";
import Text from "@/components/atoms/text";
import Input from "@/components/atoms/input";
import { DatePicker } from "@/components/organisms/customDatePicker";
import Button from "@/components/atoms/button";
import Spinner from "../../../../icons/spinner";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { ttColors } from "@/lib/theme/colors";
import Dropdown from "@/components/organisms/dropdown";

function SearchBox() {
    const { isMobile } = useScreenResolution();

    const [submissionState, setSubmissionState] = useState({
        loading: false,
        //properties needed
    });

    const [guest, setGuest] = useState("guest");
    const options = [
        { value: "guest", label: "Select guest" },
        { value: "2 adult", label: "2 Adult" },
        { value: "3 children", label: "3 Children" },
        { value: "all inclusive", label: "All Inclusive" },
    ];

    const handleSubmit = () => {};
    return (
        <Span style={{ padding: "0px 20px" }}>
            <Flex direction="column">
                <Flex
                    direction="column"
                    gap=".5rem"
                    styles={{ marginBottom: "1.2rem" }}
                >
                    <Text type="p" text="Where do you want to stay?"></Text>
                    <Input
                        // placeholder="New York, United States of America"
                        height="3rem"
                    />
                </Flex>
                <Flex gap="20px" direction={isMobile ? "column" : "row"}>
                    <Flex
                        direction="column"
                        gap=".5rem"
                        styles={{ marginBottom: "1.2rem" }}
                    >
                        <Text
                            type="label"
                            size={16}
                            text="Check-In"
                            weight={400}
                        />
                        <DatePicker
                            placeholder="Select Date"
                            onChange={(e) => {}}
                        />
                    </Flex>
                    <Flex
                        direction="column"
                        gap=".5rem"
                        styles={{
                            marginBottom: "1.2rem",
                        }}
                    >
                        <Text
                            type="label"
                            size={16}
                            text="Check-Out"
                            weight={400}
                        />
                        <DatePicker
                            placeholder="Select Date"
                            onChange={(e) => {}}
                        />
                    </Flex>
                </Flex>
                <Flex>
                    <Flex
                        direction="column"
                        gap=".5rem"
                        styles={{ marginBottom: "1.2rem" }}
                    >
                        <Text
                            type="label"
                            size={16}
                            text="Guests & Rooms"
                            weight={400}
                        />
                        <Dropdown
                            options={options}
                            className="mui_select"
                            width="100%"
                            height="45px"
                            selectedValue={guest}
                            setSelectedValue={setGuest}
                        />
                    </Flex>
                </Flex>
                <Flex>
                    <Button
                        width="100%"
                        margin=".5rem 0"
                        color="white"
                        background={
                            submissionState.loading
                                ? ttColors.dark
                                : ttColors.dark
                        }
                        onClick={handleSubmit}
                    >
                        {submissionState.loading ? (
                            <Spinner size="40px" fill={"white"} />
                        ) : (
                            <Text
                                type="p"
                                text="Search Again"
                                color={"white"}
                                size="16px"
                            />
                        )}
                    </Button>
                </Flex>
            </Flex>
        </Span>
    );
}

export default SearchBox;
