import React from "react";
import { Button, Modal, Backdrop, Fade } from "@mui/material";
import styled from "styled-components";
import Text from "@atom/text";
import { ttColors } from "theme/colors";


const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  outline: none;
  position: relative;
  width: 648px;
  height: 476px;

  & h1 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
`;


 const ModalHeader = styled.h2`
  font-size: 1.5rem;
  margin-top: 1rem;
  color: ${ttColors.dark};
  margin-bottom: 1rem;

`;

 const ModalDescription = styled.p`
  font-size: 1rem;
  margin-top: 1rem;
  color: #666;
  padding: 1rem 5rem;
`;

 const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

interface CustomConfirmationModalProps {
  open: boolean;
  handleClose: () => void;
  icon: React.ReactNode;
  title?: string;
  description?: string;
  subTitle?: string;
  buttons?: React.ReactNode;
}

const CustomConfirmationModal: React.FC<CustomConfirmationModalProps> = ({
  open,
  handleClose,
  icon,
  title,
  description,
  subTitle,
  buttons,
}) => {
  return (
    <StyledModal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        style: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
      }}
    >
      <Fade in={open}>
        <ModalContainer>
          {icon}
          {title && <ModalHeader>{title}</ModalHeader>}
          {description && <ModalDescription>{description}</ModalDescription>}
          {subTitle && <Text type="h3" text={subTitle} />}
          {buttons && <ButtonWrapper>{buttons}</ButtonWrapper>}
        </ModalContainer>
      </Fade>
    </StyledModal>
  );
};

export default CustomConfirmationModal;
