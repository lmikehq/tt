import Section from "@molecule/section";
import { Button } from "./button";
import React from "react";
import Flex from "./flex";
import Spinner from "@components/icons/spinner";
import Text from "./text";
import { ttColors } from "theme/colors";

interface ButtonProps {
    isLoading: boolean;
    disabled: boolean;
}

export default function ContinueButton({ isLoading, disabled }: ButtonProps) {
  return (
    <Section height="unset" margin="4.5rem 0 0 0">
      <Button width="100%" height={"3.5rem"} type="submit"
        background={disabled ? "#585870": "#06062A"}
        cursor={disabled ? "not-allowed" : "pointer"}
      >
        <Flex align="center" width="100%" height="100%" justify="center">
          {isLoading ? (
            <Spinner size="40px" fill={ttColors.primary} />
          ) : (
            <Text
              type="span"
              text={"Save & Continue"}
              weight={600}
              size={20}
              color={ttColors.light}
            />
          )}
        </Flex>
      </Button>
    </Section>
  );
}
