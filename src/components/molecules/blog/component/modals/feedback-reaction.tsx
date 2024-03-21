import Box from "@/components/molecules/section/box";
import Text from "@/components/atoms/text";
import BlogReusableModal from "./blog-reusable-modal";
import Input from "@/components/atoms/input";
import Button from "@/components/atoms/button";
import { useState } from "react";
import Spinner from "@/components/molecules/icons/spinner";
import { ttColors } from "@/lib/theme/colors";
import styled from "styled-components";
import Image from "@/components/atoms/image";
import { useBlogStore } from "@/lib/store/blog.store";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";


const EmojisContainer = styled.div`
   display:flex;
flex-direction:row;
align-items:center;
width:100%;
justify-content:space-between;
     & div {
   display:flex;
flex-direction:column;
align-items:center;
justify-content:center;


`;

const ImageContainer = styled.div<{selected:boolean}>`
cursor:pointer;
  background-color: ${({ selected }) => (selected ? '#C8E8F6' : 'transparent')};

padding:5px;
border-radius:50%;

`;


const Comment = styled.div`
width:100%;

`;

const emojis= [
    {
        src:"/assets/images/blog/rage.svg",
        alt:"Angry"
    },
     {
        src:"/assets/images/blog/white_frowning_face.svg",
        alt:"Fair"
    },
     {
        src:"/assets/images/blog/neutral_face.svg",
        alt:"Neutral"
    },
     {
        src:"/assets/images/blog/slightly_smiling_face.svg",
        alt:"Good"
    },
     {
        src:"/assets/images/blog/heart_eyes.svg",
        alt:"Excellent"
    }
]


interface Props {
  open: boolean;
  onClose: () => void;
}

const BlogFeedbackModal = ({ open, onClose}: Props) => {
 const [selectedEmoji, setSelectedEmoji] = useState(0);
  const [loading, setLoading] = useState(false);
     const { isMobile } = useScreenResolution();
 const { setFeedbackSuccessModal} = useBlogStore(
        (state) => state);
  const handleEmojiClick = (index:number) => {
    setSelectedEmoji(index);
    console.log(index, "index")
  };



  return (
    <BlogReusableModal
      open={open}
      onClose={onClose}
      description=""
      maxWidth="600px"
      width="60%"

    >
      <Box styles={{display:"flex", flexDirection:"column", padding:"6rem 0 0 0", position:"relative"}}>
       {
  isMobile?null:  <Image src={"/assets/images/blog/ttlogo.svg"} alt="" styles={{height:"auto", maxWidth:"18.7%", position:"absolute", top:"-50%", left:"0%"}}/>
}
             <Text type="h1" text="Article Feedback" size={28} weight={600}/>

              <Text type="p" text="How would you like to rate the article?"  weight={600}/>





                         <EmojisContainer>
        {emojis.map((emoji, index) => (
          <div key={index} >
            <ImageContainer
              selected={selectedEmoji === index}
              onClick={() => handleEmojiClick(index)}
            >
              <Image src={emoji.src} alt={emoji.alt}
               styles={{height:"auto", maxWidth:"100%"}}
            
               />
            </ImageContainer>
            <p>{emoji.alt}</p>
          </div>
        ))}
      </EmojisContainer>
              <Comment>
<Text type="p" text="Comment"/>

<Input type="textArea" placeholder="
Enter your Comment here" styles={{}}/>
</Comment>
              
       

                <Button
          type="submit"
          width="100%"
          background={ttColors.dark}
          margin="48px 0 0 0"
             onClick={()=>{setFeedbackSuccessModal(true), onClose()}}
        >
          {loading ? (
            <Spinner size="40px" fill={ttColors.primary} />
          ) : (
            <Text type="p" text="Send Feedback" color="#fff" size="16px" weight={500} />
          )}
        </Button>
      </Box>
 
    </BlogReusableModal>
  );
};

export default BlogFeedbackModal;