"use client";

import { ttColors } from "theme/colors";
import Flex from "./flex";
import Link from "./link";
import Text from "./text";
import { useScreenResolution } from "hook/useScreenResolution";

function ChatAlert() {
  const { isMobile } = useScreenResolution();
  return (
    <Link href="/chat">
      <Flex
        justify="center"
        padding="1.1rem 0"
        gap={isMobile ? ".4rem" : "1rem"}
        align="center"
        background="#132128"
        wrap="wrap"
      >
        <Text
          type="p"
          text="Introducing Thrillers Travels AI guide "
          size="1.2rem"
          weight={900}
          cursor="pointer"
          color="white"
        />
        <Text
          type="p"
          text="Learn more "
          weight={900}
          cursor="pointer"
          size="1.2rem"
          color={ttColors.primary}
        />
      </Flex>
    </Link>
  );
}

export default ChatAlert;
