"use  client";

import React, { useState } from "react";
import "./waitList.css";
import Button from "@atom/button";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import Link from "@atom/link";
import Text from "@atom/text";
import Logo from "../../assets/images/brand/logo1.svg";
import Image from "next/image";
import { Grid } from "@atom/grid";
import { useScreenResolution } from "hook/useScreenResolution";

const WaitlistNavbar: React.FC = () => {
  const { isMobile } = useScreenResolution();
  const [showNavbar, setShowNavbar] = useState(false);
  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <Image src={Logo} alt="" height="180" />
        </div>

        <div className="menu-icon" onClick={handleShowNavbar}>
          <RiBarChartHorizontalLine size="1.5rem" />
        </div>

        <div className={`nav-elements  ${showNavbar && "active"}`}>
          {/* <ul> */}
          <Grid
            columns={isMobile ? "1fr" : "repeat(4, 1fr)"}
            gap={isMobile ? "10px" : "0px"}
            align="center"
            justify="flex-start"
            width="0px"
            style={{ placeContent: "center" }}
          >
            <Link
              href=""
              style={{
                fontSize: "16px",
                fontWeight: "400",
                color: "#2f234f",
                textDecoration: "none",
                marginLeft: "30px",
              }}
            >
              <Text text="Promotions" type="p" />
            </Link>
            <Link
              href=""
              style={{
                fontSize: "16px",
                fontWeight: "400",
                color: "#2f234f",
                textDecoration: "none",
                marginLeft: "30px",
              }}
            >
              <Text text="FAQ" type="p" />
            </Link>
            <Link
              href=""
              style={{
                fontSize: "16px",
                fontWeight: "400",
                color: "#2f234f",
                textDecoration: "none",
                marginLeft: "30px",
              }}
            >
              <Text text="All homes" type="p" />
            </Link>
            <Link
              href=""
              style={{
                fontSize: "16px",
                fontWeight: "400",
                marginLeft: "30px",
              }}
            >
              <Button height="40px" width="140px">
                <Text
                  text="Find Your Home"
                  type="p"
                  whiteSpace="nowrap"
                  weight={400}
                  color="#fff"
                />
              </Button>
            </Link>
          </Grid>
          {/* </ul> */}
        </div>
      </div>
    </nav>
  );
};

export default WaitlistNavbar;
