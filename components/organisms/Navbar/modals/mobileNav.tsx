import Button from "@atom/button";
import { Divider } from "@atom/divider";
import Flex from "@atom/flex";
import Link from "@atom/link";
import Text from "@atom/text";
import Section from "@molecule/section";
import { Drawer } from "@mui/material";
import React from "react";
import { GiPassport } from "react-icons/gi";
import { IoAirplaneSharp, IoBedSharp } from "react-icons/io5";
import { ttColors } from "theme/colors";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pathArray: string | string[];
}

function MobileNavigationDrawer({ isOpen, setIsOpen, pathArray }: Props) {
  return (
    <Drawer
      anchor="bottom"
      open={isOpen}
      onClose={() => setIsOpen(!isOpen)}
      sx={{
        "& .MuiDrawer-paper": {
            borderRadius: "1rem 1rem 0 0",
        }
      }}
    >
      <Section height="100%" padding="1rem">
        <div>
          {[
            { name: "Book visa", url: "visa", icon: <GiPassport /> },
            { name: "Find flight", url: "flight", icon: <IoAirplaneSharp /> },
            { name: "Find stays", url: "stay", icon: <IoBedSharp /> },
          ].map((item, index) => {
            const active = pathArray === item.url;
            return (
              <Flex
                key={index}
                align="center"
                cursor="pointer"
                gap=".3rem"
                height="46px"
                borderBottom={active ? `5px solid ${ttColors.primary}` : "none"}
                width="fit-content"
              >
                {item.icon}
                <Link href={`/${item.url}`}>
                  <Text
                    text={item.name}
                    type="p"
                    whiteSpace="nowrap"
                    weight={400}
                  />
                </Link>
              </Flex>
            );
          })}
        </div>
        <Divider />
        <Section>
          <Link href="/auth/login">
            <Button
              width="100%"
              background="transparent"
              border={`1px solid ${ttColors.primary}`}
              margin="2rem 0 1.4rem"
            >
              <Text
                text="Login"
                type="p"
                whiteSpace="nowrap"
                weight={500}
                size={16}
                color={ttColors.dark}
              />
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button width="100%" margin="0 0 5rem">
              <Text
                text="Sign Up"
                type="p"
                whiteSpace="nowrap"
                weight={400}
                color="#fff"
              />
            </Button>
          </Link>
        </Section>
      </Section>
    </Drawer>
  );
}

export default MobileNavigationDrawer;
