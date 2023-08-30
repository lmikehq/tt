import Section from "@molecule/section";
import { Button } from "./button";
import React, { useEffect, useState } from "react";
import Flex from "./flex";
import Spinner from "@components/icons/spinner";
import Text from "./text";
import { ttColors } from "theme/colors";
import { BottomNavigation } from "@mui/material";
import { Grid } from "./grid";
import { useScreenResolution } from "hook/useScreenResolution";

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
  const { isMobile } = useScreenResolution();
  const [bottomNavVisible, setBottomNavVisible] = useState(true);
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 100) {
      setBottomNavVisible(false);
    } else {
      setBottomNavVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      {!isMobile ? (
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
      ) : (
        <BottomNavigation
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            height: "unset",
          }}
          className="bottom-navigation"
          showLabels
        >
          <Flex padding="1.187rem " gap="1.187rem">
            <Button
              width="50%"
              height={"3.5rem"}
              type="submit"
              border="solid 1px #B6B6B6"
              background={"transparent"}
              onClick={onClick}
            >
              <Flex align="center" width="100%" height="100%" justify="center">
                <Text
                  type="span"
                  text={"Save & Continue Later"}
                  weight={600}
                  size={14}
                  color={"#585870"}
                />
              </Flex>
            </Button>
            <Button
              width="50%"
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
                    text={"Continue"}
                    weight={600}
                    size={14}
                    color={ttColors.light}
                  />
                )}
              </Flex>
            </Button>
          </Flex>
        </BottomNavigation>
      )}
    </>
  );
}
