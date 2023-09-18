import { Backdrop, Box, Fade, Modal } from "@mui/material";
import React from "react";

interface modalProps {
  children: React.ReactNode;
  width?: string;
  height?: string;
  handleClose: () => void;
  open: boolean;
}

function CustomModal({
  children,
  width,
  height,
  handleClose,
  open,
}: modalProps) {
  return (
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
      sx={{
        width: width || "600px",
        height: height || "400px",
      }}
    >
      <Fade in={open}>
        <Box>{children}</Box>
      </Fade>
    </Modal>
  );
}

export default CustomModal;
