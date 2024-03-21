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

const SuccessModal = ({ open, onClose }: Props) => {
    const [loading,setLoading]= useState(false)
    
 const {setFeedbackSuccessModal} = useBlogStore(
        (state) => state);



  return (
    <BlogReusableModal
      open={open}
      onClose={onClose}
      description=""
      maxWidth="600px"
      width="60%"

    >
      <Box styles={{display:"flex", flexDirection:"column", alignItems:"center"}}>
        <Image src={"/assets/images/blog/success.svg"} alt="" styles={{height:"auto", maxWidth:"20.2%"}}/>
             <Text type="h1" text="Feedback Sent!" size={28} weight={600}/>
              <Text type="p" text="Thank you for taking your time to send us your feedback. We will ensure to work on your feedback to ensure we give you the best."  weight={600}/>



                <Button
          type="submit"
          width="100%"
          background={ttColors.dark}
          margin="48px 0 0 0"
             onClick={()=>setFeedbackSuccessModal(false)}
        >
          {loading ? (
            <Spinner size="40px" fill={ttColors.primary} />
          ) : (
            <Text type="p" text="Proceed to Blog Page" color="#fff" size="16px" weight={500} />
          )}
        </Button>

</Box>
    </BlogReusableModal>
  );
};

export default SuccessModal;