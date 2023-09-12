/* eslint-disable react/jsx-key */
"use client";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { SyntheticEvent, useState } from "react";
import { GiPassport } from "react-icons/gi";
import { IoAirplaneSharp, IoBedSharp } from "react-icons/io5";
import Text from "./text";
import Flex from "./flex";
import { styled } from "styled-components";
import { ttColors } from "theme/colors";
import { useScreenResolution } from "hook/useScreenResolution";
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
    /* You can adjust the breakpoint as needed */
    width: 100%;
    overflow-x: scroll;
    white-space: nowrap;
    /* You may also need to adjust the height and other styles for mobile */
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
}: {
  tabItems: any[];
  defaultIcons?: boolean;
  page?: "home" | "dashboard";
  shadowShow?: boolean;
  addBackgroundColor?: boolean;
  addColor?: boolean;
}) {
  const [value, setValue] = useState(0);

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
          variant={isMobile ? "scrollable" : "standard"}
          aria-label="select your service"
          scrollButtons="auto"
          sx={{
            fontFamily: "Montserrat",
          }}
        >
          {tabItems.map((tabItem, i) => (
            <Tab
              key={tabItem.value}
              label={
                <Flex align="center" justify="center" gap=".5rem">
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
                ...(i !== tabItems.length - 1 && {
                  borderRight: "1px solid #ccc",
                }),
                ...(!isMobile && { padding: "0 2rem" }),
                ...(isMobile && { padding: "0 0rem" }),
                ...(isMobile && { borderBottom: `0px solid ${ttColors.dark}` }),
                "&.MuiTab-textColorPrimary.Mui-selected": {
                  color: "var(--secondary-color)",
                },
              }}
              {...a11yProps(tabItem.value)}
            />
          ))}
        </Tabs>
      </Box>
      {tabItems.map((tabItem) => (
        <TabPanel value={value} index={tabItem.value} key={tabItem.value}>
          {tabItem.content}
        </TabPanel>
      ))}
    </TabWrapper>
  );
}
