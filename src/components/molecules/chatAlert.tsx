"use client";

import { ttColors } from "@lib/theme/colors";
import Flex from "@components/templates/flex";
import Link from "@atom/link";
import Text from "@atom/text";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";

function ChatAlert() {
  const { isMobile } = useScreenResolution();
  return (
    <Link href="/ai-guide">
      <Flex
        justify="center"
        padding="1rem 0"
        gap={isMobile ? ".4rem" : "1rem"}
        align="center"
        background="#132128"
        wrap="wrap"
      >
        <Text
          type="p"
          text="Introducing Thrillers Travels AI guide "
          size="1rem"
          weight={400}
          cursor="pointer"
          color="white"
        />
        <Text
          type="p"
          text="Learn more"
          weight={600}
          cursor="pointer"
          size="1.2rem"
          color={ttColors.primary}
        />
      </Flex>
    </Link>
  );
}

export default ChatAlert;
