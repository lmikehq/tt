"use client";
import Button from "@atom/button";
import Flex from "@atom/flex";
import { Grid } from "@atom/grid";
import Link from "@atom/link";
import Text from "@atom/text";
import NavbarLayout from "@components/layouts/sectionLayout";
import Logo from "@image/brand/favicon.svg";
import MobileLogo from "@image/brand/tt_blue_logo_with_text.png";
import { ButtonBase } from "@mui/material";
import LanguageCurrencyModal from "@organism/customModal/components/LanguageCurrencyModal";
import { useScreenResolution } from "hook/useScreenResolution";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BiDollar } from "react-icons/bi";
import { BsGlobe } from "react-icons/bs";
import { GiPassport } from "react-icons/gi";
import { IoAirplaneSharp, IoBedSharp } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import styled from "styled-components";
import { ttColors } from "theme/colors";
import MobileNavigationDrawer from "./modals/mobileNav";

const NavbarWrapper = styled.div<{ page?: string }>`
  position: relative;
  width: 100%;
  height: 70px;
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
  position: ${({ isSticky }) => (isSticky ? "fixed" : "static")};
`;

interface navbarProps {
  page: string;
  pathArray: string | string[];
}

const Navbar = ({ page }: { page: string }) => {
  let path = usePathname();
  let pathArray = path.split("/")[1];
  const { isMobile } = useScreenResolution();
  if (isMobile) return <MobileNavbar page={page} pathArray={pathArray} />;
  return <DesktopNavbar page={page} pathArray={pathArray} />;
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
            <Image src={MobileLogo} alt="thrillers travels logo" height={35} />
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
  return (
    <NavbarWrapper page={page}>
      <NavbarLayout>
        <Grid columns="1fr 1fr 1fr" align="center">
          <NavLink>
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
                      weight={400}
                    />
                  </Link>
                </Flex>
              );
            })}
          </NavLink>

          <NavLogo>
            <Link href="/">
              <Image src={Logo} height="45" width="45" alt="TTLogo" />
            </Link>
          </NavLogo>

          <NavMenu>
            <Flex
              onClick={handleOpen}
              background="transparent"
              gap=".4rem"
              align="center"
              cursor="pointer"
            >
              <BsGlobe />
              <Text text="EN" type="span" weight={400} />
              <Divider />
              <BiDollar />
              <Text text="EN" type="span" weight={400} />
            </Flex>
            <LanguageCurrencyModal
              open={modalOpen}
              handleClose={() => setModalOpen(!modalOpen)}
            />
            <Link href="/auth/login">
              <Text
                text="Login"
                type="p"
                whiteSpace="nowrap"
                size={16}
                weight={400}
              />
            </Link>
            <Link href="/auth/register">
              <Button>
                <Text
                  text="Sign Up"
                  type="p"
                  whiteSpace="nowrap"
                  weight={400}
                  color="#fff"
                />
              </Button>
            </Link>
          </NavMenu>
        </Grid>
      </NavbarLayout>
    </NavbarWrapper>
  );
};

export default Navbar;
