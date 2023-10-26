import { ReactNode } from "react";
import Flex from "./flex";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import Section from "../molecules/section";

const MultiStepWithSideMenu = ({
  sideMenu,
  children,
  header,
  direction
}: {
  sideMenu: ReactNode;
  children: ReactNode;
  header: ReactNode;
  direction: "column-reverse" | "column"
}) => {
  const { isMobile } = useScreenResolution();

    return (
        <Section>
            {isMobile && header}
            <Flex
                // background='white'
                position="relative"
                borderRadius={isMobile ? "0px" : "16px"}
                margin={isMobile ? "1.5rem 0 3rem" : "0 0px 5rem 0px"}
                height="auto"
                padding={isMobile ? "0" : "1rem 0 0"}
                gap={isMobile ? "1rem" : "3rem"}
                direction={isMobile ? direction : "row"}
            >
                <Section
                    height="unset"
                    width={isMobile ? "100%" : "68%"}
                    padding={isMobile ? "1rem 1.5rem" : "2rem 2rem 8rem"}
                    styles={{ position: "relative",
                        boxShadow: isMobile ? "none" : "0px 0px 16px 0px rgba(0, 0, 0, 0.03), 0px 0px 16px 0px rgba(0, 0, 0, 0.03)",
                        background: "white",
                        borderRadius: "12px"
                    }}
                >
                    {children}
                </Section>
                <Section
                    width={isMobile ? "100%" : "32%"}
                    height="unset"
                    padding={isMobile ? "1rem 1rem" : "0 2rem 0 0"}
                >
                    {sideMenu}
                </Section>
            </Flex>
        </Section>
    );
};

export default MultiStepWithSideMenu;
