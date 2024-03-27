import Text from '@/components/atoms/text';
import Flex from '@/components/templates/flex';
import { ClickAwayListener } from '@mui/material';
import React from 'react'
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import styled from 'styled-components';

const CommentOptionWrapper = styled.div`
  padding: 25px;
  position: absolute;
  top: 20px;
  background-color:#ffffff;
  right: 40px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  display: flex;
  border-radius:12px;
  flex-direction: column;
`;
interface Props {
    onClose:()=>void;
}
const CommentOption= ({onClose}:Props) => {
  return (
    <ClickAwayListener onClickAway={onClose}>
    <CommentOptionWrapper>

        <Flex align='center' padding=' 0 0 10px 0' gap='10px' cursor='pointer'>
            <MdEdit />
            <Text type='p' text='Edit Comment'/>
        </Flex >
            <Flex align='center' padding='10px 0 0 0' gap='10px' cursor='pointer'>
                <RiDeleteBin6Line />
                    <Text type='p' text='Delete Comment'/>
            </Flex>
    </CommentOptionWrapper>
    </ClickAwayListener>

  )
}

export default CommentOption