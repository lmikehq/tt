"use client";
import Flex from "@atom/flex";
import Link from "@atom/link";
import NavbarLayout from "@components/layouts/sectionLayout";
import Logo from "@image/brand/favicon.svg";
import Image from "next/image";
import { useState } from "react";
import { BiDollar } from "react-icons/bi";
import { BsGlobe } from "react-icons/bs";
import { GiPassport } from "react-icons/gi";
import { IoAirplaneSharp, IoBedSharp } from "react-icons/io5";
import styled from "styled-components";
// Modal from material ui
import Text from "@atom/text";
import Button from "@atom/button";
import { Grid } from "@atom/grid";
import { usePathname, useRouter } from "next/navigation";
import { ttColors } from "theme/colors";
import LanguageCurrencyModal from "@organism/customModal/components/LanguageCurrencyModal";

// Modal from material ui ends

const NavbarWrapper = styled.div<{ page?: string }>`
  position: relative;
  width: 100%;
  height:70px;
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

// Modal
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  overflow: "scroll" as "scroll",
  p: 4,
};

const Divider = styled.div`
  width: 2px;
  height: 20px;
  border: 1px solid #000;
  background: red;
`;

const Navbar = ({ page }: { page: string }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  let path = usePathname();
  let pathArray = path.split("/")[1];
  const router = useRouter();
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
              console.log("active: ", active);
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
              // justify="space-between"
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
            <Button onClick={() => router.push("/auth/register")}>
              <Text text="Sign Up" type="p" whiteSpace="nowrap" weight={400} />
            </Button>
          </NavMenu>
        </Grid>
      </NavbarLayout>
    </NavbarWrapper>
  );
};

export default Navbar;
