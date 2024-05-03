"use client";

import Button from "@/components/atoms/button";
import Image from "@/components/atoms/image";
import Text from "@/components/atoms/text";
import Section from "@/components/molecules/section";
import Navbar from "@/components/organisms/Navbar";
import Center from "@/components/templates/center";
import Flex from "@/components/templates/flex";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { Theme, ttColors } from "@/lib/theme/colors";
import { BiInfoCircle, BiSolidInfoCircle } from "react-icons/bi";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string; };
  reset: () => void;
}) {
  const { isMobile } = useScreenResolution();

  return (
    <Section height="100vh">
      <Navbar page="" />

      <Flex
        align="center"
        direction="column"
        justify="center"
        width="100%"
        height="calc(100vh - 90px)"
      >
        <Image
          alt=""
          src={"/assets/icons/error/error_warning.svg"}
          height={100}
          width={100}
        />
        <Flex
          direction="column"
          gap="10px"
          align="center"
          justify="center"
        >
          <Text
            type="h4"
            text="Something went wrong"
            color={Theme.TextColor}
            textAlign="center"
            size={isMobile ? 30 : 48}
            weight={700}
          />
          <Text
            type="h4"
            text="There was an issue processing the request."
            color={ttColors.lighterGray}
            size={isMobile ? 16 : 20}
          />
          <Text
            type="h4"
            text="Please try again later or"
            color={ttColors.lighterGray}
            size={isMobile ? 16 : 20}
          />
        </Flex>

        <Section margin="48px 0 0">
          <Flex align="center" justify="center">
            <Button
              height="56px"
              width="302px"
              borderRadius="6px"
              onClick={() => reset()}
            >
              <Text
                type="p"
                text="Try Again"
                weight={600}
                size={16}
              />
            </Button>
          </Flex>
        </Section>
      </Flex>
    </Section>
  );
}
