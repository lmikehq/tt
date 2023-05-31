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
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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
}: {
  tabItems: any[];
  defaultIcons?: boolean;
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

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="select your service"
          sx={{
            display: "grid",
            "& .MuiTabs-flexContainer": {
              gap: "2rem",
            },
          }}
        >
          {tabItems.map((tabItem) => (
            <Tab
              key={tabItem.value}
              label={
                <Flex align="center" gap=".5rem">
                  {defaultIcons && icons[tabItem.value]}
                  <Text
                    type="p"
                    text={tabItem.label}
                    size={"1rem"}
                    weight={600}
                    // color="var(--secondary-color)"
                  />
                </Flex>
              }
              sx={{
                "&.MuiTab-textColorPrimary.Mui-selected": {
                  //   borderBottom: "2px solid red",
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
    </Box>
  );
}
