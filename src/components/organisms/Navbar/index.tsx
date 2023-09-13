"use client";
import Button from "@atom/button";
import Flex from "@components/templates/flex";
import { Grid } from "@components/templates/grid";
import Link from "@atom/link";
import Text from "@atom/text";
import RTQueryClient from "@components/templates/rtqWrapper";
import NavbarLayout from "@components/templates/sectionLayout";
import { ButtonBase } from "@mui/material";
import LanguageCurrencyModal from "@organism/customModal/components/LanguageCurrencyModal";
import { useQuery } from "@tanstack/react-query";
import apiService from "@lib/extensions/hook/apiService";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import Image from "@atom/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BsGlobe } from "react-icons/bs";
import { GiPassport } from "react-icons/gi";
import { IoAirplaneSharp, IoBedSharp } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { TbCurrencyNaira } from "react-icons/tb";
import { useUserStore } from "@lib/store/useStore";
import styled from "styled-components";
import { ttColors } from "@lib/theme/colors";
import { User } from "@lib/types";
import UserPopover from "@organism/Navbar/UserPopover";
import MobileNavigationDrawer from "./modals/mobileNav";
const NavbarWrapper = styled.div<{ page?: string }>`
  position: relative;
  width: 100%;
  height: 70px;
  font-family: Montserrat;
  background: ${({ page }) =>
    page === "home" ? "transparent" : "var(--bg-color)"};
  z-index: 100;
  // padding: ${({ page }) => (page === "home" ? "2rem 0 0" : "1rem 0")};
  box-shadow: ${({ page }) =>
    page !== "home" ? "0px 4px 16px rgba(17, 34, 17, 0.05)" : "none"};
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
  width: 2px;
  height: 20px;
  border: 1px solid #000;
  background: red;
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
            <Image
              src={"/assets/images/brand/tt_blue_logo_with_text1.png"}
              alt="thrillers travels logo"
              height={40}
            />
          </ButtonBase>

          <ButtonBase onClick={() => setModalOpen(!modalOpen)}>
            <RxHamburgerMenu size={30} />
          </ButtonBase>
        </Flex>
      </MobileWrapper>
    </>
  );
};

const DesktopNavbar = ({ page, pathArray }: navbarProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const { setUser } = useUserStore((state) => state);
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
              { name: "Visa Apply", url: "visa", icon: <GiPassport /> },
              { name: "Find Flight", url: "flight", icon: <IoAirplaneSharp /> },
              { name: "Rent Stay", url: "stay", icon: <IoBedSharp /> },
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
                    active ? `5px solid ${ttColors.primary}` : "none"
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
              gap=".4rem"
              align="center"
              cursor="pointer"
            >
              <BsGlobe />
              <Text text="EN" type="span" weight={400} />
              <Divider />
              <TbCurrencyNaira />
              {/* <Text text="NGN" type="span" weight={400} /> */}
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
                  <Button>
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
