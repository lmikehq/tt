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
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import { GiPassport } from "react-icons/gi";
import { IoAirplaneSharp, IoBedSharp } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import styled from "styled-components";
import { getIpDetails } from "../form/visaApis";
import MobileNavigationDrawer from "./modals/mobileNav";
import { useUserPreferencesStore } from "@/lib/store/preferences.store";
import { PiCaretDownBold } from "react-icons/pi";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { CircleFlagLanguage } from "react-circle-flags";
import { IoIosArrowDown } from "react-icons/io";
import { CurrencyModal, LanguageModal } from "../customModal";
import { useAccountDashboard } from "@/lib/hooks/dashboard/account.hook";
import { AuthUser } from "@/lib/types/response-models/auth/auth.type";
import Spinner from "@/components/molecules/icons/spinner";
import CustomPopover from "@organism/Navbar/UserPopover";



const NavbarWrapper = styled.div<{ page: string; }>`
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
  @media screen and (max-width: 900px) {
    .display_none {
      display: none !important;
    }
  }
`;
const NavLink = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 2rem;
  font-weight: 600;

  @media screen and (max-width: 1024px) {
    gap: 1.5rem;
  }
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
  @media screen and (max-width: 1024px) {
    gap: 1rem;
  }
`;
const Divider = styled.div`
  width: 1px;
  height: 30px;
  // border: 1px solid #929292;
  background: #929292;
`;

const MobileWrapper = styled.div<{ isSticky: boolean; }>`
  // position: ${({ isSticky }) => (isSticky ? "fixed" : "static")};
`;

interface navbarProps {
  page: string;
  pathArray: string | string[];
}

const Navbar = ({ page }: { page: string; }) => {
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
  const { setUser } = useUserStore((state) => state);

  const { data, isLoading, refetch } = useAccountDashboard();
  const user: AuthUser = data as AuthUser;
  // setUser(user);

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
              src={"/assets/images/brand/tt_blue_logo_with_text1.png"}
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
  const { isMobile, isTablet } = useScreenResolution();
  const [modalOpen, setModalOpen] = useState(false);
  const { setUser } = useUserStore((state) => state);
  const { preFerredCurrency, setPreferredCurrency, setShowBackDropLoader } =
    useUserPreferencesStore((state) => state);


  const { data, isLoading, refetch } = useAccountDashboard();
  const user: AuthUser = data as AuthUser;
  // setUser(user);

  const [open, setOpen] = useState({
    language: false,
    currency: false,
  });

  //SELECTED CURRENCY
  const selectedCurrency = localStorage.getItem("selectedCurrency") || "NGN";

  // SELECTED LANGUAGE
  const selectedLanguage = localStorage.getItem("selectedLanguage") || "en";

  return (
    <>
      <NavbarWrapper page={page}>
        <NavbarLayout>
          <Grid gap={"10px"} columns="3" align="center">
            <NavLink>
              {[
                {
                  name: "Get Visa",
                  url: "visa",
                  icon: <GiPassport />,
                },
                {
                  name: "Get Ticket",
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
                    gap={isTablet ? "5px" : ".3rem"}
                    height="70px"
                    color={active ? ttColors.primary600 : "none"}
                  >
                    {item.icon}
                    <Link href={`/${item.url}`}>
                      <Text
                        text={item.name}
                        type="p"
                        whiteSpace="nowrap"
                        weight={600}
                        color={active ? ttColors.primary600 : "none"}
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
                  height={isTablet ? 45 : 45}
                  width={isTablet ? 45 : 45}
                  alt="TTLogo"
                />
              </Link>
            </NavLogo>
            <NavMenu>
              <Flex background="transparent" gap={isTablet ? ".3rem" : ".7rem"} align="center">
                <Flex
                  align="center"
                  gap="5px"
                  justify="flex-end"
                  cursor="pointer"
                  width="fit-content"
                // onClick={() =>
                //   setOpen((prev) => ({
                //     ...prev,
                //     language: true,
                //   }))
                // }
                >
                  <CircleFlagLanguage
                    languageCode={`${selectedLanguage}`}
                    height={isTablet ? "20px" : "30"}
                  />

                  <Text
                    text={`${selectedLanguage}`}
                    type="span"
                    weight={400}
                    size={isTablet ? 14 : 16}
                    styles={{ textTransform: "uppercase" }}
                  />
                </Flex>
                <span className="display_none">
                  <LanguageModal
                    open={open.language}
                    handleClose={() =>
                      setOpen((prev) => ({
                        ...prev,
                        language: false,
                      }))
                    }
                  />
                </span>
                <Divider />
                <Flex
                  align="center"
                  cursor="pointer"
                  width="fit-content"
                  gap="5px"
                  onClick={() =>
                    setOpen((prev) => ({
                      ...prev,
                      currency: true,
                    }))
                  }
                >
                  <Text
                    text={`${selectedCurrency}`}
                    type="span"
                    weight={400}
                    size={isTablet ? 14 : 16}
                    styles={{ textTransform: "uppercase" }}
                  />
                  <IoIosArrowDown size={isTablet ? 14 : 20} />
                </Flex>

                <span className="display_none">
                  {" "}
                  <CurrencyModal
                    open={open.currency}
                    handleClose={() =>
                      setOpen((prev) => ({
                        ...prev,
                        currency: false,
                      }))
                    }
                  />
                </span>
              </Flex>

              {isLoading ? (
                <Flex align="center" justify="center">
                  <Spinner size="40px" fill={ttColors.blackishBlue} />
                </Flex>
              ) : (
                user?.firstName ? (
                  <CustomPopover isLoading={isLoading} user={user} refetch={refetch} />
                ) : (
                  <Flex gap="1rem">
                    <Link href="/auth/login">
                      <Button border="1px solid #06062A" background="transparent">
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
                )
              )}
            </NavMenu >
          </Grid >
        </NavbarLayout >
      </NavbarWrapper >
    </>
  );
};

export default Navbar;
