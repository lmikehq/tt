/* eslint-disable react/jsx-key */
"use client";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { ReactNode, SyntheticEvent, useState } from "react";
import { GiPassport } from "react-icons/gi";
import { IoAirplaneSharp, IoBedSharp } from "react-icons/io5";
import Text from "./text";
import Flex from "@components/templates/flex";
import { CustomRadioGroup } from "../molecules/radio";
import { styled } from "styled-components";
import { ttColors } from "@lib/theme/colors";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabWrapper = styled.div<{
    isMobile?: boolean;
    shadowShow?: boolean;
    addBackgroundColor?: boolean;
    addColor?: boolean;
}>`
    .MuiTabs-indicator {
        background-color: ${ttColors.primary};
        height: 4px;
    }
    .MuiTabs-root {
        padding: 0px;
        box-shadow: ${({ shadowShow }) =>
            shadowShow ? "0px 4px 16px 0px #1122110d" : "none"};
        box-shadow: ;

        border-radius: 6px;
        height: 48px;
    }
    .MuiButtonBase-root.MuiTab-root.MuiTab-textColorPrimary.Mui-selected {
        background: ${({ addBackgroundColor }) =>
            addBackgroundColor ? "#87CEEB" : "#fff"};
        color: ${({ addColor }) => (addColor ? "#fff" : "#000000")};
    }
    .css-1gsv261 {
        // border-bottom: 1px solid transparent;
    }

    .MuiTabs-indicator .css-1aquho2-MuiTabs-indicator {
        width: 100% !important;
    }

    .MuiTabs-scroller.MuiTabs-fixed.css-jpln7h-MuiTabs-scroller {
        overflow: auto;
    }

    z-index: 5;

    @media (max-width: 900px) {
        .MuiTabs-scroller.MuiTabs-fixed.css-jpln7h-MuiTabs-scroller {
            width: 100%;
            overflow-x: scroll;
            white-space: nowrap;
        }
    }
    .MuiTabs-flexContainer {
        @media (max-width: 900px) {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }
`;

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

export default function CustomTab({
    tabItems,
    defaultIcons = false,
    page = "home",
    shadowShow = false,
    addBackgroundColor = false,
    addColor = false,
    activeTab,
    setActiveTab,
    aside,
    variant = "standard",
}: {
    tabItems: any[];
    defaultIcons?: boolean;
    page?: "home" | "dashboard";
    shadowShow?: boolean;
    addBackgroundColor?: boolean;
    addColor?: boolean;
    activeTab?: number;
    setActiveTab?: (value: number) => void;
    aside?: ReactNode;
    variant?: "fullWidth" | "scrollable" | "standard" | undefined;
}) {
    const [value, setValue] = useState(0);

    const handleChange = (_: SyntheticEvent, newValue: number) => {
        setValue(newValue ?? value);
        setActiveTab && setActiveTab(newValue ?? value);
    };
    const { isMobile } = useScreenResolution();

    const icons = [
        <GiPassport size={21} color="var(--secondary-color)" />,
        <IoAirplaneSharp size={21} color="var(--secondary-color)" />,
        <IoBedSharp size={21} color="var(--secondary-color)" />,
    ];

    return (
        <TabWrapper
            isMobile={isMobile}
            shadowShow={shadowShow}
            addBackgroundColor={addBackgroundColor}
        >
            <Box>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant={isMobile ? "scrollable" : variant}
                    aria-label="select your service"
                    scrollButtons="auto"
                    sx={{
                        fontFamily: "Montserrat",
                        // maxWidth: "max-content",
                        overflow: "auto",
                    }}
                >
                    {tabItems.map((tabItem, i) => {
                        const borderStyle = {
                            border: "none",
                            borderRight:
                                i % 4 === 0 ? "1px solid #ccc" : "none",
                            borderLeft: i % 4 === 2 ? "1px solid #ccc" : "none",
                        };
                        return (
                            <Tab
                                key={tabItem.value}
                                disabled={tabItem.disabled}
                                label={
                                    <Flex
                                        align="center"
                                        justify="center"
                                        gap=".5rem"
                                    >
                                        {defaultIcons && icons[tabItem.value]}
                                        <Text
                                            font="Montserrat"
                                            type="p"
                                            text={tabItem.label}
                                            size={isMobile ? "1rem" : "1rem"}
                                            weight={600}
                                            // color="var(--secondary-color)"
                                        />
                                    </Flex>
                                }
                                sx={{
                                    ...borderStyle,
                                    ...(!isMobile && { padding: "0 2rem" }),
                                    ...(isMobile && { padding: "0 0rem" }),
                                    ...(isMobile && {
                                        borderBottom: `0px solid ${ttColors.dark}`,
                                    }),
                                    "&.MuiTab-textColorPrimary.Mui-selected": {
                                        color: "var(--secondary-color)",
                                    },
                                    paddingLeft: "20px",
                                    paddingRight: "20px",
                                }}
                                {...a11yProps(tabItem.value)}
                            />
                        );
                    })}

                    {aside}
                </Tabs>
            </Box>
            {tabItems.map((tabItem) => (
                <TabPanel
                    value={value}
                    index={tabItem.value}
                    key={tabItem.value}
                >
                    {tabItem.content}
                </TabPanel>
            ))}
        </TabWrapper>
    );
}
