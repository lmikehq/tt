import toast, { Toast } from "react-hot-toast";
import React from "react";
import Flex from "@components/templates/flex";
import { BiErrorCircle } from "react-icons/bi";
import Text from "@atom/text";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";

interface CustomToastProps {
  message: string;
  id: string;
}

const ErrorCircle = styled.div`
    width: 3rem;
    height: 3rem;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    background-color: #FFE4E9;
    border-radius: 100%;
`

const CustomToast: React.FC<CustomToastProps> = ({ message, id }) => {
  return (
    <Flex align="center" gap="1rem">
      <ErrorCircle>
          <BiErrorCircle fontSize={70} color="#A0001D" />
      </ErrorCircle>
      <Text type="p" text={message} />
    </Flex>
  );
};

const ToastError = () => {
    return toast((t) => <CustomToast message="There are some information still required on the Form. Please do well to provide them so as you can proceed to the next step." id={t.id} />,
    {
      style: {
        borderLeft: '6px solid #A0001D',
        maxWidth: '650px'
      }
    }
  );
}

export default ToastError;
