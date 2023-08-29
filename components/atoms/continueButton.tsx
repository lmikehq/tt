import Section from "@molecule/section";
import { Button } from "./button";
import React from "react";
import Flex from "./flex";
import Spinner from "@components/icons/spinner";
import Text from "./text";
import { ttColors } from "theme/colors";

interface ButtonProps {
  isLoading: boolean;
  disabled?: boolean;
  onClick?: () => void;
  buttonText?: string;
}

export default function ContinueButton({
  isLoading,
  disabled,
  onClick,
  buttonText = "Save & Continue",
}: ButtonProps) {
  return (
    <Section
      height="unset"
      styles={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
    >
      {" "}
      <Button
        width="100%"
        height={"3.5rem"}
        type="submit"
        background={disabled ? "#585870" : "#06062A"}
        cursor={disabled ? "not-allowed" : "pointer"}
        onClick={onClick}
      >
        <Flex align="center" width="100%" height="100%" justify="center">
          {isLoading ? (
            <Spinner size="40px" fill={ttColors.primary} />
          ) : (
            <Text
              type="span"
              text={buttonText}
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
