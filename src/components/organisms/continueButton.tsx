import Section from "src/components/molecules/section";
import { Button } from "@atom/button";
import React, { useEffect, useState } from "react";
import Flex from "@components/templates/flex";
import Text from "@atom/text";
import { ttColors } from "@lib/theme/colors";
import { BottomNavigation } from "@mui/material";
import { Grid } from "../templates/grid";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";

interface ButtonProps {
  isLoading: boolean;
  disabled?: boolean;
  onClick?: () => void;
  buttonText?: string;
  saveProgressAndContinueLater?: () => void;
}

export default function ContinueButton({
  isLoading,
  disabled,
  onClick,
  buttonText,
  saveProgressAndContinueLater,
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
                  text={buttonText ?? "Save & Continue"}
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
            boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.15)",
          }}
          className="bottom-navigation"
          showLabels
        >
          <Flex padding="1.187rem " gap="1.187rem">
            <Button
              width="50%"
              height={"3.5rem"}
              type="button"
              border="solid 1px #B6B6B6"
              padding="0 1rem"
              background={"transparent"}
              onClick={saveProgressAndContinueLater}
            >
              <Flex align="center" width="100%" height="100%" justify="center">
                <Text
                  type="span"
                  text={"Exit & Continue Later"}
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
              padding="0 1rem"
              onClick={onClick}
            >
              <Flex align="center" width="100%" height="100%" justify="center">
                {isLoading ? (
                  <Spinner size="40px" fill={ttColors.primary} />
                ) : (
                  <Text
                    type="span"
                    text={buttonText ?? "Continue"}
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