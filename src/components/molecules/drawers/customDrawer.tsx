import { Drawer } from "@mui/material";
import React from "react";

interface CustomDrawerProps {
  anchor: "top" | "bottom" | "left" | "right";
  onClose?: () => void;
  open: boolean;
  children: React.ReactNode;
  variant?: "permanent" | "persistent" | "temporary";
}
const CustomDrawer = ({
  anchor,
  onClose,
  open,
  children,
  variant = "temporary",
}: CustomDrawerProps) => {
  return (
    <>
      <Drawer anchor={anchor} open={open} onClose={onClose} variant={variant}>
        {children}
      </Drawer>
    </>
  );
};

export default CustomDrawer;
