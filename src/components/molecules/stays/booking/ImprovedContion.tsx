import React, { useState } from "react";
import { Container, Header, Span } from "../view/styles";
import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import { Checkbox, FormControlLabel } from "@mui/material";
import { FlexBox } from "../components/styles";
import Dropdown from "@/components/organisms/dropdown";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";

function ImprovedCondition() {
    const { isMobile } = useScreenResolution();

    const [meal, setMeal] = useState("meal");
    const options = [
        { value: "meal", label: "Select Meal" },
        { value: "half board", label: "Half Board" },
        { value: "full board", label: "Full Board" },
        { value: "all inclusive", label: "All Inclusive" },
    ];
    return (
        <Container>
            <Header>
                <Flex direction="column" gap="10px">
                    <Text
                        weight={600}
                        type="h3"
                        text="Improved conditions"
                    ></Text>
                    <Text
                        type="p"
                        text="We'll make the request for extra services and inform you once they've been approved"
                    ></Text>
                </Flex>
            </Header>
            <Span style={{ width: "100%" }}>
                <FlexBox
                    className="booking_improve_box"
                    // style={{ padding: "10px 0px" }}
                >
                    <Span>
                        <Flex direction="column" width="fit-content">
                            <FormControlLabel
                                sx={{ padding: "0" }}
                                control={
                                    <Checkbox
                                        className="mui-checked"
                                        disableFocusRipple
                                        disableRipple
                                        style={{ fontSize: "30px" }}
                                    />
                                }
                                label={
                                    <Text
                                        type="p"
                                        text="Meal Type"
                                        weight={600}
                                        styles={{
                                            fontSize: "18px",
                                            width: "fit-content",
                                        }}
                                    />
                                }
                            />{" "}
                        </Flex>
                        <Text
                            type="p"
                            text="Upgrade the meal type"
                            styles={{
                                fontSize: "15px",
                                marginLeft: "30px",
                                width: "fit-content",
                            }}
                        />
                    </Span>
                    <Span
                        style={{
                            position: "relative",
                            top: "10px",
                            width: isMobile ? "100%" : "",
                        }}
                    >
                        <Flex
                            direction="column"
                            justify="flex-end"
                            width={isMobile ? "100%" : "200px"}
                        >
                            <Dropdown
                                label=""
                                options={options}
                                className="mui_select"
                                width="100%"
                                height="45px"
                                selectedValue={meal}
                                setSelectedValue={setMeal}
                            />
                            <Flex
                                justify={isMobile ? "flex-start" : "flex-end"}
                            >
                                <Text
                                    type="p"
                                    whiteSpace="nowrap"
                                    text="On request"
                                    styles={{
                                        fontSize: "15px",
                                    }}
                                />
                            </Flex>
                        </Flex>
                    </Span>
                </FlexBox>
                <FlexBox
                    className="booking_improve_box"
                    // style={{ padding: "10px 0px" }}
                >
                    <Span>
                        <Flex direction="column" width="fit-content">
                            <FormControlLabel
                                sx={{ padding: "0" }}
                                control={
                                    <Checkbox
                                        className="mui-checked"
                                        disableFocusRipple
                                        disableRipple
                                        style={{ fontSize: "30px" }}
                                    />
                                }
                                label={
                                    <Text
                                        type="p"
                                        text="Early Check-In"
                                        weight={600}
                                        styles={{
                                            fontSize: "18px",
                                            width: "fit-content",
                                        }}
                                    />
                                }
                            />{" "}
                        </Flex>
                        <Text
                            type="p"
                            text="If the guests arrive earlier than 16:00"
                            styles={{
                                fontSize: "15px",
                                marginLeft: "30px",
                                width: "fit-content",
                            }}
                        />
                    </Span>
                    <Span
                        style={{
                            position: "relative",
                            top: "10px",
                            width: isMobile ? "100%" : "",
                        }}
                    >
                        <Flex
                            direction="column"
                            justify="flex-end"
                            width={isMobile ? "100%" : "200px"}
                        >
                            <Dropdown
                                label=""
                                options={options}
                                className="mui_select"
                                width="100%"
                                height="45px"
                                selectedValue={meal}
                                setSelectedValue={setMeal}
                            />
                            <Flex
                                justify={isMobile ? "flex-start" : "flex-end"}
                            >
                                <Text
                                    type="p"
                                    whiteSpace="nowrap"
                                    text="On request"
                                    styles={{
                                        fontSize: "15px",
                                    }}
                                />
                            </Flex>
                        </Flex>
                    </Span>
                </FlexBox>{" "}
                <FlexBox
                    className="booking_improve_box"
                    // style={{ padding: "10px 0px" }}
                >
                    <Span>
                        <Flex direction="column" width="fit-content">
                            <FormControlLabel
                                sx={{ padding: "0" }}
                                control={
                                    <Checkbox
                                        className="mui-checked"
                                        disableFocusRipple
                                        disableRipple
                                        style={{ fontSize: "30px" }}
                                    />
                                }
                                label={
                                    <Text
                                        type="p"
                                        text="Late Check-Out"
                                        weight={600}
                                        styles={{
                                            fontSize: "18px",
                                            width: "fit-content",
                                        }}
                                    />
                                }
                            />{" "}
                        </Flex>
                        <Text
                            type="p"
                            text="In case the guests want to sleep in"
                            styles={{
                                fontSize: "15px",
                                marginLeft: "30px",
                                width: "fit-content",
                            }}
                        />
                    </Span>
                    <Span
                        style={{
                            position: "relative",
                            top: "10px",
                            width: isMobile ? "100%" : "",
                        }}
                    >
                        <Flex
                            direction="column"
                            justify="flex-end"
                            width={isMobile ? "100%" : "200px"}
                        >
                            <Dropdown
                                label=""
                                options={options}
                                className="mui_select"
                                width="100%"
                                height="45px"
                                selectedValue={meal}
                                setSelectedValue={setMeal}
                            />
                            <Flex
                                justify={isMobile ? "flex-start" : "flex-end"}
                            >
                                <Text
                                    type="p"
                                    whiteSpace="nowrap"
                                    text="On request"
                                    styles={{
                                        fontSize: "15px",
                                    }}
                                />
                            </Flex>
                        </Flex>
                    </Span>
                </FlexBox>
            </Span>
        </Container>
    );
}

export default ImprovedCondition;
