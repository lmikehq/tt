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
import { Grid } from "./grid";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabWrapper = styled.div<{ isMobile?: boolean }>`
  .MuiTabs-indicator {
    background-color: ${ttColors.primary};
    height: 3px;
  }
  .MuiTabs-root {
  }
  .css-1gsv261 {
    border-bottom: 1px solid transparent;
  }

  .MuiTabs-indicator .css-1aquho2-MuiTabs-indicator {
    width: 100% !important;
  }
  .MuiTabs-flexContainer {
    height: 100%;
    width: 100%;
    gap: 0;
    justify-content: ${({ isMobile }) => (isMobile ? "center" : "flex-start")};
    // border-bottom: 1px solid ${ttColors.dark};
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
}: {
  tabItems: any[];
  defaultIcons?: boolean;
  page?: "home" | "dashboard";
}) {
  const [value, setValue] = useState(0);

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const icons = [
    <GiPassport color="var(--secondary-color)" />,
    <IoAirplaneSharp color="var(--secondary-color)" />,
    <IoBedSharp color="var(--secondary-color)" />,
  ];

  const { isMobile } = useScreenResolution();

  return (
    <TabWrapper isMobile={isMobile}>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="select your service"
          sx={
            {
              // display: "grid",
              // "& .MuiTabs-flexContainer": {
              //   gap: "2rem",
              // },
            }
          }
        >
          {tabItems.map((tabItem, i) => (
            <Tab
              key={tabItem.value}
              label={
                <Grid columns="1fr"
                  align="center"
                  gap=".5rem"
                >
                  {defaultIcons && icons[tabItem.value]}
                  <Text
                    type="p"
                    text={tabItem.label}
                    size={isMobile ? ".7rem" : "1rem"}
                    weight={600}
                    // color="var(--secondary-color)"
                  />
                </Grid>
              }
              sx={{
                ...(i !== tabItems.length - 1 && {
                  borderRight: "1px solid #ccc",
                }),
                ...(!isMobile && { padding: "0 2rem" }),
                ...(isMobile && { borderBottom: `1px solid ${ttColors.dark}` }),
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
