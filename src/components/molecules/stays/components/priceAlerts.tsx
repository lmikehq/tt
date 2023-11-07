import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import { ttColors } from "@/lib/theme/colors";
import { Box } from "@mui/material";
import Section from "../../section";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { useState } from "react";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 48,
  height: 20,
  padding: 0,
  display: "flex",
  borderRadius: "20px",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 24,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(28px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 1,

    "&.Mui-checked": {
      transform: "translateX(28px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor:
          theme.palette.mode === "dark"
            ? "var(--text-color)"
            : "var(--primary-color)",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 18,
    height: 18,
    borderRadius: "50%", // Make it a circle
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 12, // Match the radius to half the switchBase width
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark" ? "var(--text-color)" : "var(--text-color)",
    boxSizing: "border-box",
  },
}));

export default function PriceAlerts() {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };
  return (
    <Section>
      <Box
        width={"100%"}
        bgcolor={ttColors.grayishAsh}
        padding={"1rem"}
        border={"1px solid var(--color-border)"}
        marginBottom={"20px"}
        borderRadius={"10px"}
      >
        <Flex align="center" justify="space-between">
          <label htmlFor="favorite-price-checkbox">
            <Text
              type="h4"
              weight="bold"
              text="Set up price alert"
              styles={{ cursor: "pointer" }}
            />
          </label>{" "}
          <AntSwitch
            inputProps={{ "aria-label": "ant design" }}
            id="favorite-price-checkbox"
            disableFocusRipple
            disableRipple
            disableTouchRipple
          />
        </Flex>

        <Text
          type="p"
          text="Receive alerts when the prices for this route change."
        />
      </Box>
    </Section>
  );
}
