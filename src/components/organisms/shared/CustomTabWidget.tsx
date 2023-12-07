"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { ttColors } from "@/lib/theme/colors";

interface CustomTabWidgetProps {
    numberOfTabs?: number;
    tabTitles: {
        icon?:
            | string
            | React.ReactElement<any, string | React.JSXElementConstructor<any>>
            | undefined;
        label: string;
        iconPosition?: "start" | "end" | "bottom" | "top";
    }[];
    tabContents: React.ReactNode[];
    initialTab?: number;
    key?: string;
}
const CustomTabWidget = ({
    tabTitles,
    numberOfTabs = tabTitles.length,
    tabContents,
    initialTab = 1,
    key = "tab",
}: CustomTabWidgetProps) => {
    const [value, setValue] = React.useState(`${initialTab}`);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
                <Box>
                    <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                        TabIndicatorProps={{
                            sx: {
                                backgroundColor: ttColors.primary,
                                height: "3px",
                                borderRadius: "1.5px",
                            },
                        }}
                        sx={{
                            "& .MuiTabs-scroller": {
                                "& .MuiTabs-flexContainer": {
                                    gap: "1.5rem",
                                },
                            },
                        }}
                    >
                        {tabTitles.map((el, index) => (
                            <Tab
                                key={key + "-title-" + index}
                                icon={el.icon}
                                iconPosition={el.iconPosition ?? "start"}
                                label={el.label}
                                value={`${index + 1}`}
                                sx={{
                                    textTransform: "capitalize",
                                    p: "0 6px",
                                    fontSize: 18,
                                    weight: 600,
                                    minWidth: 0,
                                    "&.MuiTab-textColorPrimary.Mui-selected": {
                                        color: ttColors.primary,
                                    },
                                }}
                            />
                        ))}
                    </TabList>
                </Box>
                {tabContents.map((el, index) => (
                    <TabPanel
                        key={key + "-panel-" + index}
                        value={`${index + 1}`}
                        sx={{ p: 0 }}
                    >
                        {el}
                    </TabPanel>
                ))}
            </TabContext>
        </Box>
    );
};

export default CustomTabWidget;
