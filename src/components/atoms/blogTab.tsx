/* eslint-disable react/jsx-key */
"use client";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { SyntheticEvent, useState } from "react";
import Text from "./text";
import Flex from "@components/templates/flex";
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
  addColor?: boolean;
  width?: boolean;
}>`
  .MuiTabs-indicator {
    background-color: ${ttColors.primary};
    height: 2px;
  }
  .MuiTabs-root {
    padding: 0px;
    height: 48px;
  }
  .MuiButtonBase-root.MuiTab-root.MuiTab-textColorPrimary.Mui-selected {
    color: ${({ addColor }) => (addColor ? "#929292" : `${ttColors.primary}`)};
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
      gap: 1.5rem;
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

export default function BlogTab({
  tabItems,
  defaultIcons = false,
  page = "blog",
  addColor = false,
  width = false,
  activeTab,
}: {
  tabItems: any[];
  defaultIcons?: boolean;
  page?: "home" | "blog";
  addColor?: boolean;
  activeTab?: string;
  width?: boolean;
}) {
  const [value, setValue] = useState(0);

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const { isMobile } = useScreenResolution();

  // const icons = [
  //   <GiPassport size={21} color="var(--secondary-color)" />,
  //   <IoAirplaneSharp size={21} color="var(--secondary-color)" />,
  //   <IoBedSharp size={21} color="var(--secondary-color)" />,
  // ];

  return (
    <TabWrapper isMobile={isMobile} width={width}>
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
          {tabItems.map((tabItem, i) => {
            const borderStyle = {
              border: "none",
              borderRight: "none",
              borderLeft: "none",
            };

            // if (i % 4 === 0) {
            //   borderStyle.borderRight = "1px solid #ccc";
            // } else if (i % 4 === 2) {
            //   borderStyle.borderLeft = "1px solid #ccc";
            // }
            return (
              <Tab
                key={tabItem.value}
                label={
                    <Text
                      font="Poppins"
                      type="p"
                      text={tabItem.label}
                      size={isMobile ? "14px" : "16px"}
                      weight={600}
                      // color="var(--secondary-color)"
                    />
                  
                }
                sx={{
                  ...borderStyle,
                  ...(!isMobile && { padding: "0 1rem" }),
                  ...(isMobile && { padding: "0 0rem" }),
                  ...(isMobile && {
                    borderBottom: `0px solid ${ttColors.dark}`,
                  }),
                  "&.MuiTab-textColorPrimary.Mui-selected": {
                    color: "var(--secondary-color)",
                  },
                }}
                {...a11yProps(tabItem.value)}
              />
            );
          })}
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
