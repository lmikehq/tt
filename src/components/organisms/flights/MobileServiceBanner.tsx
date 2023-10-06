"use client";

import Button from "@/components/atoms/button";
import Dot from "@/components/atoms/dot";
import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import { ttColors } from "@/lib/theme/colors";
import Box from "@mui/material/Box";
import { Dispatch, SetStateAction } from "react";

interface MobileServiceBannerProps {
  setServiceBannerOpen: Dispatch<SetStateAction<boolean>>;
}

export default function MobileServiceBanner({
  setServiceBannerOpen,
}: MobileServiceBannerProps) {
  return (
    <Box
      sx={{
        borderRadius: "8px",
        backgroundColor: ttColors.grayishAsh,
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",

        alignItems: "center",
        margin: "0 1rem",
      }}
    >
      <img src="/assets/icons/magnifier.svg" alt="search" />

      <Flex justify="center" align="center" direction="column">
        <Text text={"Nigeria - Germany"} type="p" />

        <Flex align="center" direction="row" justify="center" gap="10px">
          <Text text={"9 Oct - 16 Oct"} type="p" />
          <Dot />
          <Text text={"1 Adult"} type="p" />
        </Flex>
      </Flex>

      <Button
        fontWeight="bold"
        color={ttColors.dark}
        underlined={false}
        variant="link"
        onClick={() => setServiceBannerOpen(true)}
      >
        Modify
      </Button>
    </Box>
  );
}
