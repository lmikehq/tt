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
import { IoSend } from "react-icons/io5";
import { useScreenResolution } from '@/lib/extensions/hook/useScreenResolution'
interface Props {
   comment:any
   blogId:string;
   reply:any;
   replyreply:any;
}

const CommentWrapper = styled.div`
position:relative;
word-break: break-all;

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
const BlogReplyReply = ({comment,blogId,reply,replyreply}:Props) => {
   const [openOption, setOpenOption]= useState(false)
    const [openInput, setOpenInput]= useState(false)
const [mode, setMode] = useState<"edit" | "reply">("edit");
   const [openEmoji, setOpenEmoji]= useState(false)
const [editInputValue, setEditInputValue]= useState("");
const [openReplies, setOpenReplies] =useState(false)
const { user, setUser } = useUserStore();
 const { likedByUser} = useLikedByUser(replyreply, user?._id);
  const { isMobile } = useScreenResolution();
 const {setBlog} = useBlogStore(
        (state) => state);

 const handleEditSelectEmoji = (emoji: any) => {
        setEditInputValue((prevText) => prevText + emoji.emoji);
    };
    const handleLikeAndUnlikeComment =async()=>{
      try{
       const response = await apiService(`/blog/${blogId}/comment/${comment._id}/reply/${reply._id}/reply/${replyreply._id}/like`, "POST")

    if (response && response.success) {
      setBlog(response.data);
    }
      }catch (error) {
    toast.error("Failed to like comment. Please try again.");
  } 
    }

const handleAddReplyReply =async()=>{
      try{
       const response = await apiService(`/blog/${blogId}/comment/${comment._id}/reply/${reply._id}/reply`, "POST",{
         text:editInputValue
       })

    if (response && response.success) {
      setBlog(response.data);
         setEditInputValue("");
      setOpenInput(false);
    }

      }catch (error) {
    toast.error("Failed to like comment. Please try again.");
  }
     
    }
  return (
    <CommentWrapper>
<Flex direction='row' margin='0 0 20px 0'>
    
<Flex>
     <UserAvatar img='' initial={replyreply?.userName}/>
 <Flex direction='column' align='flex-start' justify='flex-start' margin='0 0 0 24px'>
    <Text type='p' text={replyreply?.userName} size={20} weight={600} margin={"0 0 6px 0"}/>

    <Flex align='center' color='#D9D9D9' gap='14px'>
<Text
  type='p'
  text={replyreply.createdAt ? formatDistanceToNow(new Date(replyreply.createdAt), { addSuffix: true }) : ''} color='#929292'
  
/>
{
   replyreply.edited && <span style={{background:"#929292", height:"8px", width:"8px", borderRadius:"50%"}}></span>
}

<Text type='p'size={16} text={replyreply.edited?"Edited":""} color='#929292'/>
    </Flex>

 </Flex>
</Flex>
{/* <CiMenuKebab style={{marginTop:"12px"}} onClick={()=>setOpenOption(!openOption)} cursor="pointer" color='#000000' size={24}/> */}
</Flex>
 <Text type='' text={replyreply.text} size={16} weight={400} margin={"0 0 24px 0"}/>
<Flex justify='space-between' align='center' margin='10px 0 0 0'>
 <Flex align='center'justify='flex-start' gap="36px" width='25%' >

           <div style={{alignItems:'center', display:"flex", flexDirection:"row", gap:'10px', cursor:'pointer'}} >
     <BiSolidLike color={likedByUser?"#7BBBD6":"#929292"} onClick={handleLikeAndUnlikeComment}/>


     {
     replyreply?.likes?.length ?  <p style={{ whiteSpace: 'nowrap' }}>{`${replyreply?.likes?.length} ${isMobile?"":replyreply?.likes?.length === 1 ? 'like' : 'likes'}`}</p>
     :""}
    
    </div>


      <div style={{alignItems:'center', display:"flex", flexDirection:"row", gap:'10px', cursor:'pointer'}}  onClick={()=>setOpenReplies(!openReplies)} >
       
        {/* <FaRegComment/> */}

           {
      replyreply?.replies?.length ?  <p style={{ whiteSpace: 'nowrap' }}>{`${replyreply?.replies?.length}    ${isMobile?"":replyreply?.replies?.length === 1 ? 'comment' : 'comments'}`}</p>
     :""}

    </div>
 </Flex>

 {/* <Button height={isMobile?"30px":"40px"} width={isMobile?"80px":""} background='#06062A' color='#FFFFFF' onClick={()=>{setOpenInput(true),setOpenEmoji(false), setEditInputValue(""), setMode("reply")}}>Reply</Button> */}

</Flex>

{
   openInput  && 
  //  <ClickAwayListener onClickAway={()=>setOpenInput(false)}>
      
      <InputWrapper>
            <Input border="none" color='#000000' size={isMobile?"16px":"20px"}  weight="300" type="textArea" styles={{borderRadius:"12px",resize:"none", height:"50px"}} value={editInputValue} onChange={(e)=>setEditInputValue(e.target.value)}/>
            <ButtonsWrapper><BsEmojiLaughingFill onClick={()=>setOpenEmoji(!openEmoji)} cursor="pointer" color='#bbb' size={24}/>
            
<Button height={isMobile?"30px":"40px"} width={isMobile?"80px":""} background='#06062A' color='#FFFFFF' onClick={handleAddReplyReply}>Send</Button>
            
           
            
            </ButtonsWrapper>
              {
            openEmoji &&    <EmojiPicker handleCloseEmoji={()=>setOpenEmoji(false)} onSelect={handleEditSelectEmoji}/>
         }
         </InputWrapper>
         
        //  </ClickAwayListener>
  
}

       

    </CommentWrapper>
  )
}

export default BlogReplyReply