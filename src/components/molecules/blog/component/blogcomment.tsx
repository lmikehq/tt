import React, { useState } from 'react'
import UserAvatar from '../../../atoms/user-avatar'
import Flex from '../../../templates/flex'
import Text from '../../../atoms/text'
import Button from '../../../atoms/button'
import { CiMenuKebab } from "react-icons/ci";
import styled from 'styled-components'
import { FaRegComment } from "react-icons/fa";
import { VscThumbsupFilled} from "react-icons/vsc";
import CommentOption from './comment-option'
import { formatDistanceToNow } from 'date-fns';
interface Props {
   comment:any
}

const CommentWrapper = styled.div`
position:relative;

`;
const BlogComment = ({comment}:Props) => {
   const [openOption, setOpenOption]= useState(false)
  return (
    <CommentWrapper>
<Flex direction='row' margin='0 0 20px 0'>
    
<Flex>
     <UserAvatar img='' initial={comment?.userName}/>
 <Flex direction='column' align='flex-start' justify='flex-start' margin='0 0 0 24px'>
    <Text type='p' text={comment?.userName} size={20} weight={600} margin={"0 0 6px 0"}/>
<Text
  type='p'
  text={comment.createdAt ? formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true }) : ''}
  color='#929292'
/>
 </Flex>
</Flex>
<CiMenuKebab style={{marginTop:"12px"}} onClick={()=>setOpenOption(!openOption)} cursor="pointer" color='#000000' size={24}/>
</Flex>
 <Text type='' text='This is such an important question to consider! Retirement planning is crucial for ensuring a comfortable and fulfilling lifestyle in our later years. Personally, I believe having a nest egg of around $1 million would provide the financial security needed to retire, travel, and live comfortably.' size={16} weight={400} margin={"0 0 24px 0"}/>
<Flex justify='space-between' align='center'>
 <Flex align='center'justify='flex-start' width='35%' >
    <Flex align='center' gap='10px' cursor='pointer'>
     <VscThumbsupFilled/>
      <Text type='' text='1.3k Likes'/>
    </Flex>

    <Flex align='center' gap="10px" cursor='pointer'>
       
        <FaRegComment/>
       <Text type='' text='2 Comments'/>
    </Flex>
 </Flex>
  <Button background='#06062A' color='#FFFFFF'>Reply</Button>
</Flex>


{
   openOption && <CommentOption onClose={()=>setOpenOption(false)}/>
}
       

    </CommentWrapper>
  )
}

export default BlogComment