"use client"
import React, { useState } from 'react'
import Text from '../atoms/text'
import { BlogInterface } from '@/lib/types/response-models/blog/index.type'
import Input from '../atoms/input'
import Button from '../atoms/button'
import BlogComment from '../molecules/blog/component/blogcomment'
import styled from 'styled-components'
import { BsEmojiLaughingFill } from "react-icons/bs";
import EmojiPicker from '../molecules/blog/emoji-picker'

interface Props {
   blog:BlogInterface
}
const CommentsWrapper = styled.div`
position:relative;
`;
const InputWrapper = styled.div`
border:1px solid #E7E7E7;
padding-bottom:20px;
background-color:#FFFFFF;

`;
const Comments = styled.div`
display:flex;
flex-direction:column;
gap:28px;

`;
const ButtonsWrapper = styled.div`
display:flex;
background-color:#FFFFFF;
width:100%;
flex-direction:row;
justify-content:space-between;
align-items:center;
padding:0 23px;



`;
const BlogCommentSection = ({blog}:Props) => {

const [openEmoji, setOpenEmoji]= useState(false)
  return (
    <CommentsWrapper>
         <Text type="p" text="Write Comment" weight={600} size={24} margin="50px 0 16px 0"/>

         <InputWrapper>
            <Input border="none" height='120px' type="textArea" styles={{resize:"none"}}/>
            <ButtonsWrapper><BsEmojiLaughingFill onClick={()=>setOpenEmoji(!openEmoji)} cursor="pointer" color='#bbb' size={24}/>  <Button background='#06062A' color='#FFFFFF'>Send</Button></ButtonsWrapper>
         </InputWrapper>
         {
            openEmoji &&    <EmojiPicker handleCloseEmoji={()=>setOpenEmoji(false)}/>
         }
      

      <Text type="p" text={`Comments (${blog.comments.length})`} weight={600} margin={"56px 0 37px 0"} size={24}/>
<Comments >
    {
        blog.comments.map((comment,i)=>
        <div key={i}>
             <BlogComment comment={comment}/>
        </div>
       )
      }
</Comments>
  
         
    </CommentsWrapper>
  )
}

export default BlogCommentSection