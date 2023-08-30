import React from "react";
import PropTypes from "prop-types";
import { Modal, IconButton } from "@mui/material";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import Button from "@atom/button";
import { ttColors } from "theme/colors";
import Text from "@atom/text";

// Styled component for the modal content wrapper
const StyledModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 50px;
  max-width: 647px;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  justify-content: center;
  text-align: center;

  & p {
    margin: 1rem 0px;
  }
`;

// Styled component for the modal header
const StyledModalHeader = styled.div`
  margin-bottom: 15px;
  text-align: center;

  & h2 {
    text-align: center;
  }
`;

const ModalIcon = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
  background: #f3f3ff;
  border-radius: 4px;
`;
interface ReusableModalProps {
  open: boolean;
  onClose: () => void;
  headerText: string;
  description: string;
  children?: React.ReactNode;
}
// Reusable Modal Component
const ReusableModal: React.FC<ReusableModalProps> = ({
  open,
  onClose,
  headerText,
  description,
  children,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <StyledModalContent>
        <StyledModalHeader>
          <h2>{headerText}</h2>
        </StyledModalHeader>
        <ModalIcon>
            <IoMdClose />
        </ModalIcon>
        <p>{description}</p>
        {children}
        <Button
          width="100%"
          background={ttColors.dark}
        >
            <Text type="p" text="Save" color="#fff" size="20px" />
        </Button>
      </StyledModalContent>
    </Modal>
  );
};

ReusableModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  headerText: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default ReusableModal;
