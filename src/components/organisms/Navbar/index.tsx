"use client";
import Button from "@atom/button";
import Image from "@atom/image";
import Link from "@atom/link";
import Text from "@atom/text";
import NavbarLayout from "@components/templates/SectionLayout";
import Flex from "@components/templates/flex";
import { Grid } from "@components/templates/grid";
import RTQueryClient from "@components/templates/rtqWrapper";
import apiService from "@lib/extensions/hook/apiService";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import { useUserStore } from "@lib/store/useStore";
import { ttColors } from "@lib/theme/colors";
import { User } from "@lib/types";
import { ButtonBase, MenuItem, Select } from "@mui/material";
import UserPopover from "@organism/Navbar/UserPopover";
import LanguageCurrencyModal from "@organism/customModal/components/LanguageCurrencyModal";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import { BsGlobe } from "react-icons/bs";
import { GiPassport } from "react-icons/gi";
import { IoAirplaneSharp, IoBedSharp } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import styled from "styled-components";
import { getIpDetails } from "../form/visaApis";
import MobileNavigationDrawer from "./modals/mobileNav";
import currencyCodes from "currency-codes";
import { useUserPreferencesStore } from "@/lib/store/preferences.store";
import { Poppins } from "next/font/google";
import { PiCaretDownBold } from "react-icons/pi";
const poppins = Poppins({
  weight: "400",
  style: ["normal"],
  display: "swap",
  subsets: ["latin-ext"],
});

const NavbarWrapper = styled.div<{ page: string }>`
    position: relative;
    width: 100%;
    height: 70px;
    font-family: Montserrat;
    background: ${({ page }) =>
        page === "home" ? "transparent" : "var(--bg-color)"};
    z-index: 100;
    // padding: ${({ page }) => (page === "home" ? "2rem 0 0" : "1rem 0")};
    box-shadow: ${({ page }) =>
        !["home", "ai-guide"].includes(page)
            ? "0px 4px 16px rgba(17, 34, 17, 0.05)"
            : "none"};
    & button {
        background: var(--secondary-color);
        // color: var(--default-color);
        color: #fff;
        padding: 0.5rem 2rem;
        text-transform: capitalize;
        font-weight: 600;
        &:hover {
            background: var(--secondary-color);
        }
    }
`;
const NavLink = styled.div`
    display: flex;
    justify-content: flex-start;
    gap: 2rem;
    font-weight: 600;
`;
const NavLogo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const NavMenu = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 2rem;
    font-size: 0.9rem;
`;

const Divider = styled.div`
    width: 1px;
    height: 30px;
    // border: 1px solid #929292;
    background: #929292;
`;

const MobileWrapper = styled.div<{ isSticky: boolean }>`
    // position: ${({ isSticky }) => (isSticky ? "fixed" : "static")};
`;

interface navbarProps {
    page: string;
    pathArray: string | string[];
}

const Navbar = ({ page }: { page: string }) => {
    let path = usePathname();
    let pathArray = path.split("/")[1];
    const { setGeoInfo } = useUserStore((state) => state);
    useEffect(() => {
        getIpDetails().then((res) => setGeoInfo(res));
    }, []);

    const { isMobile } = useScreenResolution();
    if (isMobile)
        return (
            <RTQueryClient>
                <MobileNavbar page={page} pathArray={pathArray} />
            </RTQueryClient>
        );
    return (
        <RTQueryClient>
            <DesktopNavbar page={page} pathArray={pathArray} />
        </RTQueryClient>
    );
};

const MobileNavbar = ({ page, pathArray }: navbarProps) => {
    const [modalOpen, setModalOpen] = useState(false);
    const router = useRouter();
    const ref = useRef(null);
    const [isSticky, setIsSticky] = useState(false);
    const { user, setUser } = useUserStore((state) => state);

    const checkScrollTop = () => {
        if (page === "home" && window.scrollY > 88) {
            setIsSticky(true);
        } else {
            setIsSticky(true);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", checkScrollTop);
        return () => {
            window.removeEventListener("scroll", checkScrollTop);
        };
    }, []);

    return (
        <>
            <MobileNavigationDrawer
                isOpen={modalOpen}
                setIsOpen={setModalOpen}
                pathArray={pathArray}
            />
            <MobileWrapper isSticky={isSticky}>
                <Flex padding="1rem" justify="space-between" ref={ref}>
                    <ButtonBase onClick={() => router.push("/")}>
                        <img
                            src={
                                "/assets/images/brand/tt_blue_logo_with_text1.png"
                            }
                            alt="thrillers travels logo"
                            width={100}
                        />
                    </ButtonBase>
                    <Flex gap="2rem" width="fit-content">
                        {!user && (
                            <Button
                                onClick={() => router.push("/auth/login")}
                                background="transparent"
                                color={ttColors.dark}
                            >
                                <Flex align="center" gap="8px">
                                    {" "}
                                    <BiSolidUserCircle size={28} /> Sign In
                                </Flex>
                            </Button>
                        )}
                        <ButtonBase onClick={() => setModalOpen(!modalOpen)}>
                            <RxHamburgerMenu size={30} />
                        </ButtonBase>
                    </Flex>
                </Flex>
            </MobileWrapper>
        </>
    );
};

const DesktopNavbar = ({ page, pathArray }: navbarProps) => {
    const [modalOpen, setModalOpen] = useState(false);
    const { setUser } = useUserStore((state) => state);
    const { preFerredCurrency, setPreferredCurrency, setShowBackDropLoader } =
        useUserPreferencesStore((state) => state);

    async function getUser(): Promise<User | any> {
        const res = await apiService("/user", "GET");
        setUser(res);
        return res;
    }
    const { data: user } = useQuery(["getUser"], getUser);
    return (
        <NavbarWrapper page={page}>
            <NavbarLayout>
                <Grid columns="3" align="center">
                    <NavLink>
                        {[
                            {
                                name: "Visa Apply",
                                url: "visa",
                                icon: <GiPassport />,
                            },
                            {
                                name: "Find Flight",
                                url: "flight",
                                icon: <IoAirplaneSharp />,
                            },
                            {
                                name: "Rent Stay",
                                url: "stay",
                                icon: <IoBedSharp />,
                            },
                        ].map((item, index) => {
                            const active = pathArray === item.url;
                            return (
                                <Flex
                                    key={index}
                                    align="center"
                                    cursor="pointer"
                                    gap=".3rem"
                                    height="70px"
                                    borderBottom={
                                        active
                                            ? `5px solid ${ttColors.primary}`
                                            : "none"
                                    }
                                >
                                    {item.icon}
                                    <Link href={`/${item.url}`}>
                                        <Text
                                            text={item.name}
                                            type="p"
                                            whiteSpace="nowrap"
                                            weight={600}
                                        />
                                    </Link>
                                </Flex>
                            );
                        })}
                    </NavLink>

                    <NavLogo>
                        <Link href="/">
                            <Image
                                src={"/assets/images/brand/favicon.svg"}
                                height={45}
                                width={45}
                                alt="TTLogo"
                            />
                        </Link>
                    </NavLogo>

                    <NavMenu>
                        <Flex
                            // onClick={handleOpen}
                            background="transparent"
                            gap=".7rem"
                            align="center"
                            cursor="pointer"
                        >
                            <BsGlobe size={24} />
                            <Text text="EN" type="span" weight={400} size={16} />
                            <Divider />

                            <Select
                                defaultValue={preFerredCurrency}
                                value={preFerredCurrency}
                                onChange={(e) => setPreferredCurrency(e.target.value)}
                                IconComponent={PiCaretDownBold}
                                MenuProps={{
                                    sx: {
                                        "& .MuiPaper-root": {
                                            maxHeight: '50vh',
                                            top: '55px !important',
                                            boxShadow: '0px 0px 1px rgba(0,0,0,0.3)'
                                        },
                                        "& .MuiPaper-root::-webkit-scrollbar": {
                                            backgroundColor: 'transparent',
                                            width: '9px',
                                            height: '9px',
                                        },
                                        "& .MuiPaper-root::-webkit-scrollbar-thumb": {
                                            backgroundColor: 'rgba(0, 0, 0, 0.15)',
                                            borderRadius: '6px',
                                        },
                                        '& li[aria-selected="true"]': {
                                            background: '#DAF0F9'
                                        }
                                }}}
                                sx={{
                                    boxShadow: "none",
                                    ".MuiOutlinedInput-notchedOutline": {
                                        border: 0,
                                    },
                                    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                                        border: 0,
                                    },
                                    ".MuiSvgIcon-root": {
                                        display: 'none',
                                    },
                                    ".MuiSelect-select": {
                                        width: 'min-content',
                                        padding: '0',
                                        fontFamily: 'Poppins',
                                        appearance: 'none !important',
                                    },
                                    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                        border: 0,
                                    },
                                }}
                            >
                                {currencyCodes.codes().map((el: string, index: number) => (
                                    <MenuItem key={"item-" + index} value={el} sx={{ fontSize: '16px' }}>
                                        {el}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Flex>
                        <LanguageCurrencyModal
                            open={modalOpen}
                            handleClose={() => setModalOpen(!modalOpen)}
                        />
                        {user?.firstName ? (
                            <>
                                <UserPopover />
                            </>
                        ) : (
                            <Flex gap="1rem">
                                <Link href="/auth/login">
                                    <Button
                                        border="1px solid #06062A"
                                        background="transparent"
                                    >
                                        <Text
                                            text="Sign in"
                                            color="#06062A"
                                            type="p"
                                            whiteSpace="nowrap"
                                            size={14}
                                            weight={600}
                                        />
                                    </Button>
                                </Link>
                                <Link href="/auth/register">
                                    <Button background={ttColors.dark}>
                                        <Text
                                            text="Sign up"
                                            type="p"
                                            whiteSpace="nowrap"
                                            weight={600}
                                            color="#fff"
                                        />
                                    </Button>
                                </Link>
                            </Flex>
                        )}
                    </NavMenu>
                </Grid>
            </NavbarLayout>
        </NavbarWrapper>
    );
};

export default Navbar;
