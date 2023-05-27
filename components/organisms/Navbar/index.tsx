"use client";
import styled from "styled-components";
import { useState } from "react";
import NavbarLayout from "@components/layouts/sectionLayout";
import Flex from "@atom/flex";
import Link from "@atom/link";
import { GiPassport } from "react-icons/gi";
import { IoAirplaneSharp, IoBedSharp } from "react-icons/io5";
import { BsGlobe } from "react-icons/bs";
import { BiDollar } from "react-icons/bi";
import Image from "next/image";
import Logo from "@image/brand/favicon.svg";
import Divider from "@mui/material/Divider";
import Input from "@atom/input";
// Modal from material ui
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
// Modal from material ui ends

const NavbarWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 5rem;
  background: transparent;
  z-index: 100;
  padding: 3rem 0;

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
  font-size: 1rem;
  font-weight: 600;
  line-height: 1rem;
  letter-spacing: 0.1rem;
  text-transform: capitalize;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  padding-top: 1.5rem;

  & a {
    color: var(--text-color);

    &:hover {
      color: var(--primary-color);
    }
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
  gap: 1rem;

  & a {
    color: var(--text-color);
    font-size: 1rem;
    font-weight: 600;
    line-height: 1rem;
    letter-spacing: 0.1rem;
    text-transform: capitalize;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      color: var(--primary-color);
    }
  }
  & button {
    padding: 1rem 3rem;
    margin-left: 1rem;
    border-radius: 0.8rem;

    &.btnWithIcon {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.3rem;
    }
  }
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



// const Button = styled.input`
//   margin-top: 20px;
//   padding: 10px;
//   color: white;
//   background-color: #007bff;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//
//   &:hover {
// background-color: #0056b3;
//   }
// `;
// Modal

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <NavbarWrapper>
      <NavbarLayout>
        <Flex justify="space-between">
          <NavLink>
            <Link href="/">
              <GiPassport /> Book Visa
            </Link>
            <Link href="/">
              <IoAirplaneSharp /> Find Flight
            </Link>
            <Link href="/">
              <IoBedSharp /> Find Stays
            </Link>
          </NavLink>

          <NavLogo>
            <Link href="/">
              <Image src={Logo} height="71" width="71" alt="TTLogo" />
            </Link>
          </NavLogo>

          <NavMenu>
            <Button
              className="btnWithIcon"
              onClick={handleOpen}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--secondary-color)",
              }}
            >
              <BsGlobe />
              EN
              <Divider orientation="vertical" flexItem />
              <BiDollar />
              USD
            </Button>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{
                backdrop: {
                  timeout: 500,
                },
              }}
            >
              <Fade in={open}>
                <Box sx={style}>
                 
                </Box>
              </Fade>
            </Modal>
            <Link href="/">Login</Link>
            <Button variant="contained" size="small">
              Sign up
            </Button>
          </NavMenu>
        </Flex>
      </NavbarLayout>
    </NavbarWrapper>
  );
};

export default Navbar;




