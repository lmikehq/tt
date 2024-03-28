import Text from '@/components/atoms/text';
import Flex from '@/components/templates/flex';
import apiService from '@/lib/extensions/hook/apiService';
import { useBlogStore } from '@/lib/store/blog.store';
import { ClickAwayListener } from '@mui/material';
import React from 'react'
import toast from 'react-hot-toast';
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
  openField:()=>void;
    onClose:()=>void;
    commentId:string;
    blogId:string;
}
const CommentOption= ({onClose,blogId,commentId,openField}:Props) => {
   const {setBlog} = useBlogStore(
        (state) => state);

       const handleDeleteComment=async()=>{
      try{
        console.log("data", blogId, commentId)
       const response = await apiService(`/blog/${blogId}/comment/${commentId}`,"DELETE");

    if (response && response.success) {
      setBlog(response.data);
    }

      }catch (error) {
    toast.error("Failed to delete comment. Please try again.");
  }
     
    }
    const handleEditComment=()=>{
openField()
    }
  return (
    <ClickAwayListener onClickAway={onClose}>
    <CommentOptionWrapper>

        <Flex align='center' padding=' 0 0 10px 0' gap='10px' cursor='pointer' onClick={handleEditComment}>
            <MdEdit />
            <Text type='p' text='Edit Comment'/>
        </Flex >
            <Flex align='center' padding='10px 0 0 0' gap='10px' cursor='pointer' onClick={handleDeleteComment}>
                <RiDeleteBin6Line />
                    <Text type='p' text='Delete Comment'/>
            </Flex>
    </CommentOptionWrapper>
    </ClickAwayListener>

  )
}

export default CommentOption