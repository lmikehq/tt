import Button from "@atom/button";
import { Divider } from "@atom/divider";
import Flex from "@atom/flex";
import Link from "@atom/link";
import Text from "@atom/text";
import CustomDrawer from "@molecule/drawers/customDrawer";
import Section from "@molecule/section";
import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import apiService from "hook/apiService";
import { handleLogout } from "hook/useLogout";
import { useRouter } from "next/navigation";
import React from "react";
import { GiPassport } from "react-icons/gi";
import { IoAirplaneSharp, IoBedSharp } from "react-icons/io5";
import { useUserStore } from "store/useStore";
import { ttColors } from "theme/colors";
import { User } from "types";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pathArray: string | string[];
}

function MobileNavigationDrawer({ isOpen, setIsOpen, pathArray }: Props) {
  const { setUser } = useUserStore((state) => state);
  async function getUser(): Promise<User | any> {
    const res = await apiService("/user", "GET");
    setUser(res);
    return res;
  }
  const router = useRouter();
  const { data: user } = useQuery(["getUser"], getUser);
  return (
    <CustomDrawer
      anchor="bottom"
      open={isOpen}
      onClose={() => setIsOpen(!isOpen)}
    >
      <Section height="100%" padding="1rem">
        <div>
          {[
            { name: "Book visa", url: "visa", icon: <GiPassport /> },
            { name: "Find flight", url: "flight", icon: <IoAirplaneSharp /> },
            { name: "Find stay", url: "stay", icon: <IoBedSharp /> },
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
        {!user?.email ? (
          <Section>
            <Link href="/auth/login">
              <Button
                width="100%"
                background="transparent"
                border={`1px solid #06062A`}
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
        ) : (
          <Section>
            <Link href="/dashboard">
              <Text
                type="p"
                text="Dashboard"
                decoration="underline"
                margin="1rem 0"
              />
            </Link>
            <Box
              onClick={() => {
                handleLogout();
                router.push("/auth/login");
              }}
            >
              <Text type="p" text="Logout" />
            </Box>
          </Section>
        )}
      </Section>
    </CustomDrawer>
  );
}

export default MobileNavigationDrawer;
