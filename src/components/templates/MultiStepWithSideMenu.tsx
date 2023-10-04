import { ReactNode } from "react";
import Flex from "./flex";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import Section from "../molecules/section";

const MultiStepWithSideMenu = ({
  sideMenu,
  children,
}: {
  sideMenu: ReactNode;
  children: ReactNode;
}) => {
  const { isMobile } = useScreenResolution();

  return (
    <Flex
      // background='white'
      borderRadius={isMobile ? "0px" : "16px"}
      margin={isMobile ? "1.5rem 0" : "3rem 0px 5rem 0px"}
      styles={{
        marginBottom: isMobile ? "3rem" : "0px",
        position: "relative",
      }}
      height="auto"
      padding={isMobile ? "0px" : "2.5rem"}
      gap="2.25rem"
      direction={isMobile ? "column" : "row"}
    >
      <Section
        height="unset"
        width={isMobile ? "100%" : "62%"}
        padding={isMobile ? "2rem 2rem 1.5rem " : "2rem 2rem 8rem"}
        styles={{ position: "relative",
        boxShadow: isMobile
        ? "none"
        : "0px 2px 2px 0px rgba(0, 0, 0, 0.05), 2px 0px 2px 0px rgba(0, 0, 0, 0.05)",
        background: "white",
        borderRadius: "12px"
      }}
      >
        {children}
      </Section>
      <Section
        width="38%"
        height="unset"
        styles={{ display: isMobile ? "none" : "block" }}
      >
        {sideMenu}
      </Section>
    </Flex>
  );
};

export default MultiStepWithSideMenu;
