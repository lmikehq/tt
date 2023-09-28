import { Drawer } from "@mui/material";
import React from "react";

interface CustomDrawerProps {
  anchor: "top" | "bottom" | "left" | "right";
  onClose?: () => void;
  open: boolean;
  children: React.ReactNode;
  variant?: "permanent" | "persistent" | "temporary";
  top?: string;
  height?: string;
  borderRadius?: string;
}
const CustomDrawer = ({
  anchor,
  onClose,
  open,
  children,
  variant = "temporary",
  top,
  height,
  borderRadius
}: CustomDrawerProps) => {
  return (
    <>
      <Drawer
        anchor={anchor}
        open={open}
        onClose={onClose}
        variant={variant}
        PaperProps={{
          sx: {
            height: height,
            top: top,
            borderRadius: borderRadius,
          },
        }}
      >
        {children}
      </Drawer>
    </>
  );
};

export default CustomDrawer;
