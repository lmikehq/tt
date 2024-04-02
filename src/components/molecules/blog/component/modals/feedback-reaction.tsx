import Box from "@/components/molecules/section/box";
import Text from "@/components/atoms/text";
import BlogReusableModal from "./blog-reusable-modal";
import Input from "@/components/atoms/input";
import Button from "@/components/atoms/button";
import { use, useEffect, useState } from "react";
import Spinner from "@/components/molecules/icons/spinner";
import { ttColors } from "@/lib/theme/colors";
import styled from "styled-components";
import Image from "@/components/atoms/image";
import { useBlogStore } from "@/lib/store/blog.store";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import apiService from "@/lib/extensions/hook/apiService";
import toast from "react-hot-toast";
import { BlogInterface } from "@/lib/types/response-models/blog/index.type";


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
  blog:BlogInterface;
  onClose: () => void;
}

const BlogFeedbackModal = ({ open, onClose,blog}: Props) => {
 const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [loading, setLoading] = useState(false);
     const { isMobile } = useScreenResolution();
     const[feedbackData, setFeedbackData] = useState({
      reaction:0,
      comment:""
     })
 const { setFeedbackSuccessModal} = useBlogStore(
        (state) => state);
  const handleEmojiClick = (index:any) => {
    setSelectedEmoji(index);
    console.log(index, "index")
         setFeedbackData({
                        ...feedbackData,
                        reaction: index+1,
                      })
  };

  useEffect(()=>{
    setFeedbackData({
                        ...feedbackData,
                        reaction: 0,
                        comment:""
                      });
                      setSelectedEmoji(null)
  },[])


const handleSubmit =async ()=>{
  try{
//  if (!feedbackData.reaction){

//   }
  const response = await apiService(`/blog/${blog._id}/feedback`, "POST", {
 reaction: feedbackData.reaction,
    comment: feedbackData.comment
    });
    if (response.statusCode ===400){
        toast.error("User already submitted feedback on this blog.");
           onClose();
        return;
    }
    
    if (response && response.success) {
   setFeedbackSuccessModal(true);
   onClose();
    }


  }
 
 catch (error) {
    toast.error("Failed to sumbmit feedback. Please try again.");
  }

}

  return (
    <BlogReusableModal
      open={open}
      onClose={onClose}
      description=""
      maxWidth="600px"
   width={isMobile?"90%":"60%"}

    >
      <Box styles={{display:"flex", flexDirection:"column", padding:isMobile?"2rem 0 0 0":"4rem 0 0 0", position:"relative"}}>
       {
  isMobile?null:  <Image src={"/assets/images/blog/ttlogo.svg"} alt="" styles={{height:"auto", maxWidth:"18.7%", position:"absolute", top:"-50%", left:"0%"}}/>
}
             <Text type="h1" text="Help Us improve Articles on Thrillers Travels" size={isMobile?24:28} weight={600}/>

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
            {
              !isMobile &&     <Text type="p" text={emoji.alt} size={16}/>
            }
        
          </div>
        ))}
      </EmojisContainer>
              <Comment>
<Text type="p" text="Comment"/>

<Input type="textArea" placeholder="
Enter your Comment here" styles={{}}         onChange={(e) =>
                      setFeedbackData({
                        ...feedbackData,
                        comment: e.target.value,
                      })
                    } value={feedbackData.comment}/>
</Comment>
              
       

                <Button
          type="submit"
          width="100%"
          background={ttColors.dark}
          margin="48px 0 0 0"
             onClick={()=>handleSubmit()}
             disabled={feedbackData.reaction===0}
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