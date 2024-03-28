import React, { useState } from 'react'
import UserAvatar from '../../../atoms/user-avatar'
import Flex from '../../../templates/flex'
import Text from '../../../atoms/text'
import Button from '../../../atoms/button'
import { CiMenuKebab } from "react-icons/ci";
import styled from 'styled-components'
import { FaRegComment } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";
import CommentOption from './comment-option'
import { formatDistanceToNow } from 'date-fns';
import Input from '@/components/atoms/input'
import { BsEmojiLaughingFill } from "react-icons/bs";
import EmojiPicker from '../emoji-picker'
import apiService from '@/lib/extensions/hook/apiService'
import { useBlogStore } from '@/lib/store/blog.store'
import toast from 'react-hot-toast'
import { ClickAwayListener } from '@mui/material'
import useLikedByUser from './use-like-by-user'
import { useUserStore } from '@/lib/store/useStore'
import BlogReplyReply from './blogreplyreply'
interface Props {
   comment:any
   blogId:string;
   reply:any;
}

const CommentWrapper = styled.div`
position:relative;

`;

const RepliesWrapper = styled.div`
// position:relative;
margin:28px 0;
border-left:1px solid #E7E7E7;
padding-left:30px;
display:flex;
flex-direction:column;
gap:28px;

`;

const InputWrapper = styled.div`
border:1px solid #E7E7E7;
padding-bottom:20px;
background-color:#FFFFFF;
position:relative;
margin-top:30px;
border-radius:12px;
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
const BlogReply = ({comment,blogId,reply}:Props) => {
   const [openOption, setOpenOption]= useState(false)
    const [openInput, setOpenInput]= useState(false)
const [mode, setMode] = useState<"edit" | "reply">("edit");
   const [openEmoji, setOpenEmoji]= useState(false)
const [editInputValue, setEditInputValue]= useState("");
const [openReplies, setOpenReplies] =useState(false)
const { user, setUser } = useUserStore();
 const { likedByUser} = useLikedByUser(reply, user?._id);
 const {setBlog} = useBlogStore(
        (state) => state);

 const handleEditSelectEmoji = (emoji: any) => {
        setEditInputValue((prevText) => prevText + emoji.emoji);
        

    };



        const handleLikeAndUnlikeReply =async()=>{
      try{
    console.log(reply,"reply")
       const response = await apiService(`/blog/${blogId}/comment/${comment._id}/reply/${reply._id}/like`, "POST")

    if (response && response.success) {
      setBlog(response.data);

    }

      }catch (error) {
    toast.error("Failed to like comment. Please try again.");
  }
     
    }




     const handleAddReply =async()=>{
      try{
       const response = await apiService(`/blog/${blogId}/comment/${comment._id}/reply/${reply._id}/reply`, "POST",{
         text:editInputValue
       })

    if (response && response.success) {
      setBlog(response.data);
       console.log(response.data, "resp")
         setEditInputValue("");
      setOpenInput(false);
    }

      }catch (error) {
    toast.error("Failed to like comment. Please try again.");
  }
     
    }


    const handleOpenReplies=()=>{
        if(reply.replies.length>0){
    setOpenReplies(!openReplies)
        }
    

    }
  return (
    <CommentWrapper>
<Flex direction='row' margin='0 0 20px 0'>
    
<Flex>
     <UserAvatar img='' initial={reply?.userName}/>
 <Flex direction='column' align='flex-start' justify='flex-start' margin='0 0 0 24px'>
    <Text type='p' text={reply?.userName} size={20} weight={600} margin={"0 0 6px 0"}/>

    <Flex align='center' color='#D9D9D9' gap='14px'>
<Text
  type='p'
  text={reply.createdAt ? formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true }) : ''} color='#929292'
  
/>
{
   reply.edited && <span style={{background:"#929292", height:"8px", width:"8px", borderRadius:"50%"}}></span>
}

<Text type='p'size={16} text={reply.edited?"Edited":""} color='#929292'/>
    </Flex>

 </Flex>
</Flex>
{/* <CiMenuKebab style={{marginTop:"12px"}} onClick={()=>setOpenOption(!openOption)} cursor="pointer" color='#000000' size={24}/> */}
</Flex>
 <Text type='' text={reply.text} size={16} weight={400} margin={"0 0 24px 0"}/>
<Flex justify='space-between' align='center'>
 <Flex align='center'justify='flex-start' gap="36px" width='25%' >
    <Flex align='center' gap='10px' cursor='pointer'>
     <BiSolidLike color={likedByUser?"#7BBBD6":"#929292"} onClick={handleLikeAndUnlikeReply}/>


     {
      reply?.likes?.length ?  <Text type='' text={`${reply?.likes?.length} ${reply?.likes?.length === 1 ? 'like' : 'likes'}`}/>
     :""}
    
    </Flex>

    <Flex align='center' gap="10px" cursor='pointer' onClick={handleOpenReplies}>
       
        <FaRegComment/>
      {
      reply?.replies?.length ?  <Text type='' text={`${reply?.replies?.length}    ${reply?.replies?.length === 1 ? 'comment' : 'comments'}`}/>
     :""}
    </Flex>
 </Flex>
  <Button background='#06062A' color='#FFFFFF' onClick={()=>{setOpenInput(true),setOpenEmoji(false), setEditInputValue(""), setMode("reply")}}>Reply</Button>
</Flex>

{
   openInput  && 
   <ClickAwayListener onClickAway={()=>setOpenInput(false)}>
      
      <InputWrapper>
            <Input border="none" color='#000000' size="20px" weight="300" type="textArea" styles={{borderRadius:"12px",resize:"none", height:"50px"}} value={editInputValue} onChange={(e)=>setEditInputValue(e.target.value)}/>
            <ButtonsWrapper><BsEmojiLaughingFill onClick={()=>setOpenEmoji(!openEmoji)} cursor="pointer" color='#bbb' size={24}/>  <Button background='#06062A' color='#FFFFFF' onClick={handleAddReply}>Send</Button></ButtonsWrapper>
              {
            openEmoji &&    <EmojiPicker handleCloseEmoji={()=>setOpenEmoji(false)} onSelect={handleEditSelectEmoji}/>
         }
         </InputWrapper>
         
         </ClickAwayListener>
  
}


{
   openReplies ? <RepliesWrapper>
       {
        reply.replies.map((replyreply:any, i:number)=>
        <div key={i}>
             <BlogReplyReply blogId={blogId} comment={comment} reply={reply} replyreply={replyreply}/>
        </div>
       )
      }
  </RepliesWrapper>:""
}

   



{/* {
   openOption && <CommentOption blogId={blogId} commentId={comment._id} onClose={()=>setOpenOption(false)} openField={()=>{setOpenInput(true), setEditInputValue(comment.text),setMode("edit")}}/>
} */}
       

    </CommentWrapper>
  )
}

export default BlogReply