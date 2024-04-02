import Button from "@atom/button";
import Text from "@atom/text";
import Spinner from "@molecule/icons/spinner";
import { Modal } from "@mui/material";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import styled from "styled-components";
import { ttColors } from "@lib/theme/colors";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import Image from "@/components/atoms/image";

// Styled component for the modal content wrapper
const StyledModalContent = styled.div<{
  width?: string;
  height?: string;
  maxWidth?: string;
  maxHeight?: string;
}>`
  background-color: white;
  border-radius: 12px;
  padding: 50px;
  max-width: ${({ maxWidth }) => maxWidth || "647px"};
  width: ${({ width }) => width || "100%"};
  max-height: calc(100vh - 3rem);
  height: ${({ height }) => height || "auto"};
  overflow-y: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  justify-content: center;
  // text-align: center;

  &::-webkit-scrollbar {
    width: 8px; /* width of the scrollbar */
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2); /* color of the thumb */
    border-radius: 4px; /* roundness of the thumb */
  }

  &::-webkit-scrollbar-track {
    background-color: transparent; /* color of the track */
  }

  & p {
    margin: 1rem 0px;
  }

  @media screen and (max-width: 900px) {
    padding: 20px;
    // width: 100%;
    // max-width: 100%;
  }
`;


const ModalIcon = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 51px;
  width: 49px;
  background: #f3f3ff;
  border-radius: 4px;
  cursor: pointer;
`;

const LogoIcon = styled.div`
  position: absolute;
  left: 20px;
  top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 51px;
  width: 49px;
  background: #f3f3ff;
  border-radius: 4px;
  cursor: pointer;
`;



const ChildrenContainer = styled.div`
 margin-top:2rem;
 width:100%;

`;
interface ReusableModalProps {
  open: boolean;
  onClose: () => void;
  headerText?: string;
  logo?:string;
  description?: string;
  descriptionColor?: string;
  children?: React.ReactNode;
  height?: string;
  width?: string;
  maxWidth?: string;
  maxHeight?: string;
  loading?: boolean;
  showlogo?:boolean;
  setLoading?: (loading: boolean) => void;
  buttonProps?: {
    text: string;
    onClick: () => void;
  };
  showButton?: boolean;
}
// Reusable Modal Component
const BlogReusableModal: React.FC<ReusableModalProps> = ({
  open,
  onClose,
  headerText,
  description,
  descriptionColor,
  height,
  width,
  logo,
  maxWidth,
  maxHeight,
  children,
  loading = false,
  setLoading = () => { },
  buttonProps = {
    text: "Save",
    onClick: () => { },
  },
  showButton
}) => {
  const { isMobile } = useScreenResolution();
  return (
    <Modal open={open} onClose={onClose}>
      <StyledModalContent
        height={height}
        width={width}
        maxHeight={maxHeight}
        maxWidth={maxWidth}
      >
       
{
  isMobile ?  <LogoIcon>
            <Image src={logo?logo:""} alt="" height={70} width={70}/>
          <IoMdClose />
        </LogoIcon>:""
}
        

           <ModalIcon onClick={onClose}>
          <IoMdClose />
        </ModalIcon>
        
       
        
  
        
      <ChildrenContainer>{children}</ChildrenContainer>
    

      </StyledModalContent>
    </Modal>
  );
};

BlogReusableModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  headerText: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default BlogReusableModal;
