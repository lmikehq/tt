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
import apiService from '@/lib/extensions/hook/apiService'
import toast from 'react-hot-toast'
import { useBlogStore } from '@/lib/store/blog.store'
import { IoSend } from "react-icons/io5";
import { useScreenResolution } from '@/lib/extensions/hook/useScreenResolution'
interface Props {
   blog:BlogInterface
   inputfield:boolean;
}
const CommentsWrapper = styled.div`

`;
const InputWrapper = styled.div`
border:1px solid #E7E7E7;
padding-bottom:20px;
background-color:#FFFFFF;
position:relative;
border-radius:12px;

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
const BlogCommentSection = ({blog,inputfield}:Props) => {

const [openEmoji, setOpenEmoji]= useState(false)
const [inputValue, setInputValue]= useState("");
const [showAllComments, setShowAllComments] = useState(false);
  const [numCommentsToShow, setNumCommentsToShow] = useState(5);
     const { isMobile } = useScreenResolution();
 const {setBlog} = useBlogStore(
        (state) => state);

   const handleSelectEmoji = (emoji: any) => {
        setInputValue((prevText) => prevText + emoji.emoji);
        console.log(emoji.emoji,inputValue, "emoji")

    };

    const handleAddComment=async()=>{
      try{
       const response = await apiService(`/blog/${blog._id}/comment`, "POST", {
      text: inputValue,
    });

    if (response && response.success) {
      setBlog(response.data);
      setInputValue("")
    }

      }catch (error) {
    toast.error("Failed to add comment. Please try again.");
  }
     
    }

  const handleLoadMore = () => {
    setNumCommentsToShow(numCommentsToShow + 5);
  };

  const handleShowLess = () => {
    setNumCommentsToShow(5);
    setShowAllComments(false);
  };

   
  return (
    <CommentsWrapper>

      {
        inputfield ?  <div>
       <Text type="p" text="Write Comment" weight={600} size={24} margin="50px 0 16px 0"/>

         <InputWrapper>
            <Input border="none"   color='#000000' size={isMobile?"16px":"20px"}  weight="300" type="textArea" styles={{borderRadius:"12px", resize:"none",height:'120px'}} value={inputValue} onChange={(e)=>setInputValue(e.target.value)}/>
            <ButtonsWrapper><BsEmojiLaughingFill onClick={()=>setOpenEmoji(!openEmoji)} cursor="pointer" color='#bbb' size={24}/> 
             
             
        
             
            <Button height={isMobile?"30px":"40px"} width={isMobile?"80px":""} background='#06062A' color='#FFFFFF' onClick={handleAddComment}>Send</Button>
            
             
             </ButtonsWrapper>
              {
            openEmoji &&    <EmojiPicker handleCloseEmoji={()=>setOpenEmoji(false)} onSelect={handleSelectEmoji}/>
         }
         </InputWrapper>
      </div>:""
      }
    
      
       
      

      <Text type="p" text={`Comments (${blog?.comments?.length? blog?.comments?.length:0})`} weight={600} margin={"56px 0 37px 0"} size={24}/>
<Comments >
    {
        blog?.comments?.slice(0, numCommentsToShow).map((comment, i)=>
        <div key={i}>
             <BlogComment blogId={blog._id} comment={comment}/>
        </div>
       )
      }
</Comments>
  
   {(blog?.comments?.length > numCommentsToShow || showAllComments) && (
        <Button
          background='#06062A'
          color='#FFFFFF'
          width='100%'
          margin='60px 0 100px 0'
          onClick={showAllComments ? handleShowLess : handleLoadMore}
        >
          {showAllComments ? 'Show Less' : 'Load More'}
        </Button>
      )}
    </CommentsWrapper>
  )
}

export default BlogCommentSection