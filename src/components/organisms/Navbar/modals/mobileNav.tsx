import { useDashboardStore } from "@/lib/store/dashboard/index.store";
import Button from "@atom/button";
import Image from "@atom/image";
import Link from "@atom/link";
import Text from "@atom/text";
import Flex from "@components/templates/flex";
import apiService from "@lib/extensions/hook/apiService";
import { handleLogout } from "@lib/extensions/hook/useLogout";
import { useUserStore } from "@lib/store/useStore";
import { ttColors } from "@lib/theme/colors";
import { User } from "@lib/types";
import { Collapse, List, ListItemButton } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiFillInstagram } from "react-icons/ai";
import {
    BiChevronDown,
    BiChevronUp,
    BiSolidBusiness,
    BiSupport,
    BiX,
} from "react-icons/bi";
import { BsFacebook, BsTwitter, BsYoutube } from "react-icons/bs";
import { GiPassport } from "react-icons/gi";
import { IoAirplaneSharp, IoBedSharp } from "react-icons/io5";
import CustomDrawer from "src/components/molecules/drawers/customDrawer";
import Section from "src/components/molecules/section";

interface Props {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    pathArray: string | string[];
}

function MobileNavigationDrawer({ isOpen, setIsOpen, pathArray }: Props) {
    const { user, setUser } = useUserStore((state) => state);
    const { setTab } = useDashboardStore((state) => state);
    const router = useRouter();
    const [collapseSupport, setCollapseSupport] = useState(false);

    const CollapsedItem = ({
        name,
        url,
        pl,
    }: {
        url: string;
        name: string;
        pl: string;
    }) => {
        return (
            <ListItemButton sx={{ padding: `0 0 0 ${pl}px` }}>
                <Flex
                    align="center"
                    justify="space-between"
                    cursor="pointer"
                    height="3.5rem"
                    width="100%"
                >
                    <Flex gap=".85rem" width="fit-content" align="center">
                        <Link href={`${url}`}>
                            <Text
                                text={name}
                                type="p"
                                whiteSpace="nowrap"
                                weight={400}
                            />
                        </Link>
                    </Flex>
                </Flex>
            </ListItemButton>
        );
    };
    const menuListWithIcon = [
        {
            name: "Get visa",
            url: "visa",
            icon: <GiPassport size={19} />,
        },
        {
            name: "Find flight",
            url: "flight",
            icon: <IoAirplaneSharp size={19} />,
        },
        {
            name: "Find stay",
            url: "stay",
            icon: <IoBedSharp size={19} />,
        },
        {
            name: "Support",
            url: "stay",
            icon: <BiSupport size={19} />,
            action: () => setCollapseSupport(!collapseSupport),
            collapsed: collapseSupport,
            collapse: (
                <Collapse in={collapseSupport} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {[
                            {
                                name: "Help Center",
                                url: "",
                            },
                            {
                                name: "Contact Us",
                                url: "",
                            },
                        ].map((el, index) => (
                            <CollapsedItem
                                key={`collapsed-item-${index}`}
                                name={el.name}
                                url={el.url}
                                pl={"32.6"}
                            />
                        ))}
                    </List>
                </Collapse>
            ),
        },
        {
            name: "Company",
            url: "stay",
            icon: <BiSolidBusiness size={19} />,
            hasCollapse: true,
        },
    ];
    const menuListWithoutIcon = [
        {
            name: "All Applications",
            url: "/dashboard",
            action: () => setTab(0),
        },
        {
            name: "Payment History",
            url: "/dashboard",
            action: () => setTab(1),
        },
        {
            name: "Favourites",
            url: "/dashboard",
            action: () => setTab(2),
        },
        {
            name: "Notifications",
            url: "/dashboard",
            action: () => setTab(3),
        },
        {
            name: "Account",
            url: "/dashboard",
            action: () => setTab(4),
        },
        {
            name: "Referral",
            url: "/dashboard",
            action: () => setTab(5),
        },
        {
            name: "Logout",
            action: () => {
                handleLogout();
                router.push("/auth/login");
            },
        },
        {
            name: "Support",
            action: () => setCollapseSupport(!collapseSupport),
            collapsed: collapseSupport,
            collapse: (
                <Collapse in={collapseSupport} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {[
                            {
                                name: "Help Center",
                                url: "/help-center",
                            },
                            {
                                name: "Contact Us",
                                url: "/contact",
                            },
                        ].map((el, index) => (
                            <CollapsedItem
                                key={`collapsed-item-${index}`}
                                name={el.name}
                                url={el.url}
                                pl={"8"}
                            />
                        ))}
                    </List>
                </Collapse>
            ),
        },
        {
            name: "Company",
            url: "/about-us",
            hasCollapse: true,
        },
    ];
    const FooterIcons = [
        {
            id: 1,
            icon: <BsFacebook size="1.5rem" color="#06062A" />,
            url: "https://www.facebook.com/thrillerstravels",
        },
        {
            id: 2,
            icon: <BsTwitter size="1.5rem" color="#06062A" />,
            url: "https://www.twitter.com/thrillerstravel",
        },

        {
            id: 3,
            icon: <BsYoutube size="1.5rem" color="#06062A" />,
            url: "https://www.youtube.com/@ThrillersTravel",
        },
        {
            id: 4,
            icon: <AiFillInstagram size="1.5rem" color="#06062A" />,
            url: "https://www.instagram.com/thrillerstravel",
        },
    ];

    return (
        <CustomDrawer
            anchor="bottom"
            open={isOpen}
            onClose={() => setIsOpen(!isOpen)}
        >
            <Section
                padding={" 0 1.5rem 5rem 1.5rem"}
                height="100vh"
                styles={{ overflow: "auto" }}
            >
                <Flex height="55px" justify="flex-end" align="center">
                    <Button
                        onClick={() => setIsOpen(!isOpen)}
                        background="transparent"
                        styles={{
                            padding: 0,
                            width: "fit-content",
                            minWidth: "auto",
                        }}
                    >
                        <BiX size={32} color="#929292" />
                    </Button>
                </Flex>
                {!user?.email ? (
                    <Section>
                        <Flex direction="column" align="center">
                            <Section
                                width="fit-content"
                                margin="0 0 2.375rem 0"
                            >
                                <Image
                                    alt="hero"
                                    src="/assets/images/dashboard/drawerHero.svg"
                                    styles={{ width: "197px", height: "127px" }}
                                />
                            </Section>
                            <Section margin="0 0 2rem 0">
                                <Text
                                    type="p"
                                    color="#606060"
                                    size={16}
                                    weight={400}
                                    text="You can easily manage your Visa Applications, Flight Trips, Rent Stays, Use Free Vouchers to get bonuses, Refer Family & Friends and Earn also."
                                />
                            </Section>
                        </Flex>
                        <Section>
                            <Section margin="0 0 2.75rem 0">
                                {
                                    <Section>
                                        <Link href="/auth/login">
                                            <Button
                                                width="100%"
                                                background="transparent"
                                                border={`1px solid #06062A`}
                                                margin="0 0 0.75rem 0"
                                                borderRadius="6px"
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
                                            <Button
                                                width="100%"
                                                borderRadius="6px"
                                            >
                                                <Text
                                                    text="Sign Up"
                                                    type="p"
                                                    size={16}
                                                    whiteSpace="nowrap"
                                                    weight={400}
                                                    color="#fff"
                                                />
                                            </Button>
                                        </Link>
                                    </Section>
                                }
                            </Section>
                            <div>
                                {menuListWithIcon.map((item, index) => {
                                    const active = pathArray === item.url;
                                    return (
                                        <>
                                            <ListItemButton
                                                key={`list-item-button-${index}`}
                                                sx={{
                                                    padding: "0",
                                                }}
                                                onClick={
                                                    item.action
                                                        ? item.action
                                                        : () => {
                                                              router.push(
                                                                  item.url
                                                              );
                                                          }
                                                }
                                            >
                                                <Flex
                                                    align="center"
                                                    justify="space-between"
                                                    cursor="pointer"
                                                    height="4rem"
                                                    width="100%"
                                                    borderBottom={`1px solid #E7E7E7`}
                                                >
                                                    <Flex
                                                        gap=".85rem"
                                                        width="fit-content"
                                                        align="center"
                                                    >
                                                        {item.icon}
                                                        <Text
                                                            text={item.name}
                                                            type="p"
                                                            whiteSpace="nowrap"
                                                            weight={400}
                                                        />
                                                    </Flex>
                                                    {item.collapse &&
                                                        (item.collapsed ? (
                                                            <BiChevronUp
                                                                size={30}
                                                                color={
                                                                    "#929292"
                                                                }
                                                            />
                                                        ) : (
                                                            <BiChevronDown
                                                                size={30}
                                                                color={
                                                                    "#929292"
                                                                }
                                                            />
                                                        ))}
                                                </Flex>
                                            </ListItemButton>
                                            {item.collapse}
                                        </>
                                    );
                                })}
                            </div>
                        </Section>
                    </Section>
                ) : (
                    <Section>
                        <Flex
                            gap="1rem"
                            styles={{ marginBottom: "3.375rem" }}
                            align="center"
                        >
                            <Flex
                                align="center"
                                justify="center"
                                width="60px"
                                height="60px"
                                background="#0065AE"
                                borderRadius="50%"
                                styles={{ flex: "none" }}
                            >
                                {user && user?.profilePicture ? (
                                    <img
                                        src={user?.profilePicture}
                                        alt="user-profile"
                                        height={60}
                                        width={60}
                                        style={{
                                            objectFit: "contain",
                                            maxHeight: "60px",
                                            maxWidth: "60px",
                                            borderRadius: "100%",
                                        }}
                                    />
                                ) : (
                                    <Text
                                        type="h5"
                                        color={ttColors.light}
                                        weight={400}
                                        size={32}
                                        text={user?.firstName?.charAt(0) ?? "T"}
                                    />
                                )}
                            </Flex>
                            <Section styles={{ minWidth: 0 }}>
                                <Text
                                    type="p"
                                    size={20}
                                    weight={600}
                                    text={
                                        user?.firstName + " " + user?.lastName
                                    }
                                    className="truncate"
                                />
                                <Text
                                    type="p"
                                    size={16}
                                    weight={400}
                                    text={user?.email ?? "your mail"}
                                    className="truncate"
                                />
                            </Section>
                        </Flex>
                        <Section styles={{ marginBottom: "1rem" }}>
                            <Link href="/dashboard">
                                <Text
                                    type="p"
                                    text="My Dashboard"
                                    weight={600}
                                    size={18}
                                    color="#7BBBD6"
                                />
                            </Link>
                        </Section>
                        <List>
                            {menuListWithoutIcon.map((item, index) => {
                                return (
                                    <>
                                        <ListItemButton
                                            key={`list-item-button-${index}`}
                                            sx={{
                                                padding: "0",
                                            }}
                                            onClick={() => {
                                                item.action
                                                    ? item.action()
                                                    : () => {
                                                          setTab(index);
                                                      };
                                            }}
                                        >
                                            <Flex
                                                align="center"
                                                justify="space-between"
                                                cursor="pointer"
                                                height="4rem"
                                                width="100%"
                                                borderBottom={`1px solid #E7E7E7`}
                                            >
                                                <Flex
                                                    gap=".85rem"
                                                    width="fit-content"
                                                    align="center"
                                                >
                                                    <Text
                                                        text={item.name}
                                                        type="p"
                                                        whiteSpace="nowrap"
                                                        weight={400}
                                                        onClick={() => {
                                                            setIsOpen(false);
                                                            if (item.url) {
                                                                router.push(
                                                                    item.url
                                                                );
                                                            }
                                                        }}
                                                    />
                                                </Flex>
                                                {item.collapse &&
                                                    (item.collapsed ? (
                                                        <BiChevronUp
                                                            size={30}
                                                            color={"#929292"}
                                                        />
                                                    ) : (
                                                        <BiChevronDown
                                                            size={30}
                                                            color={"#929292"}
                                                        />
                                                    ))}
                                            </Flex>
                                        </ListItemButton>
                                        {item.collapse}
                                    </>
                                );
                            })}
                        </List>
                    </Section>
                )}

                <Section
                    styles={{
                        position: "fixed",
                        bottom: 0,
                        right: 0,
                        left: 0,
                        background: ttColors.light,
                    }}
                    padding={"1rem 0 2rem 0"}
                >
                    <Flex margin="auto" width="fit-content" gap="40px">
                        {FooterIcons.map((icon, index) => (
                            <Link href={icon.url} key={`footer-icon-${index}`}>
                                {icon.icon}
                            </Link>
                        ))}
                    </Flex>
                </Section>
            </Section>
        </CustomDrawer>
    );
}

export default MobileNavigationDrawer;
