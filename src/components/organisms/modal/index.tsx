import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MUIModal from "@mui/material/Modal";
import * as React from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
//   width: 400,
  boxShadow: 4,

  outline: "none",
};

export default function Modal({
  open,
  handleClose,
  children,
}: {
  children: React.ReactNode;
  open: boolean;
  handleClose: () => void;
}) {
  return (
    <MUIModal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
    >
      <Box sx={style}>{children}</Box>
    </MUIModal>
  );
}
