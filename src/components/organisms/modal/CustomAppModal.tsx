import Button from "@/components/atoms/button";
import { ttColors } from "@/lib/theme/colors";
import { Box, Modal } from "@mui/material";
import { BiX } from "react-icons/bi";

const style = {
  // position: "absolute" as "absolute",
  // top: "50%",
  // left: "50%",
  // transform: "translate(-50%, -50%)",
  // //   width: 400,
  // boxShadow: 4,
  outline: "none",
  overflow: "scroll",
  maxHeight: "100vh",
  p: "1rem",
};

interface CustomAppModalProps {
  children: React.ReactNode;
  open: boolean;
  handleClose: () => void;
}

const CustomAppModal = ({
  open,
  handleClose,
  children,
}: CustomAppModalProps) => {
  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
      {/* <Box sx={style}> */}
        <Box
            className='scroll-custom'
            sx={{
                borderRadius: "10px",
                position: "relative",
                p: "1rem",
                maxWidth: "37rem",
                margin: "1rem auto 0",
                backgroundColor: ttColors.light,
                boxShadow: 4,
                overflowY: 'auto'
            }}
        >
            <Button
                background={ttColors.grayishAsh}
                borderRadius="0.25rem"
                width="50px"
                height="50px"
                styles={{
                    position: "absolute",
                    top: "1rem",
                    right: "1.25rem",
                }}
                onClick={handleClose}
            >
                <BiX size={28} color={ttColors.dark} />
            </Button>
            {children}
        </Box>
      {/* </Box> */}
    </Modal>
  );
};

export default CustomAppModal;
