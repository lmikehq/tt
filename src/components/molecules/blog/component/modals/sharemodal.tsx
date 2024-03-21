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
import { Margin } from "@mui/icons-material";
import Flex from "@/components/templates/flex";


const MediaContainer = styled.div`
width:100%;
margin-top:48px;
&  div {
    padding: 15px 0;
}
  & > *:not(:last-child) {
    border-bottom: 1px solid #E7E7E7; 
  
    
  }
`;


interface Props {
  open: boolean;
  onClose: () => void;
}

const ShareModal = ({ open, onClose}: Props) => {
  const [loading, setLoading] = useState(false);

 const media = [
  {
    name:"Whatsapp",
    src:"/assets/images/blog/lbwhatsapp.svg",
  },
    {
    name:"Facebook",
    src:"/assets/images/blog/bfacebook.svg",
  },
    {
    name:"Instagram",
    src:"/assets/images/blog/binstagram.svg",
  },
    {
    name:"Twitter",
    src:"/assets/images/blog/btwitter.svg",
  },
    {
    name:"Gmail",
    src:"/assets/images/blog/bgmail.svg",
  },
 ]


  return (
    <BlogReusableModal
      open={open}
      onClose={onClose}
      description=""
      maxWidth="600px"
      width="60%"
      showlogo={false}

    >
      <Box styles={{display:"flex", flexDirection:"column", padding:"6rem 0 0 0", position:"relative"}}>


        <Image src={"/assets/images/blog/share.svg"} alt="" styles={{height:"auto", maxWidth:"18.7%", position:"absolute", top:"-50%", left:"0%"}}/>
          <Text type="h1" text="Share your Flight to Family & Friends" size={28} weight={600} />
           <Text type="p" text="You can easily share your flight details to family and friends." />


           <div style={{display:"flex", flexDirection:"row", alignItems:"center", width:"100%", gap:"12px"}}>
            <input   style={{width:"73%",height:"45px", background:"#F3FAFD",display:"flex",  border:"1px solid #6092A7",fontSize:"16px", fontWeight:"400", padding:"25px 20px", borderRadius:"4px"}}/>
            
             <Button
          type="submit"
          background="#7BBBD6"
          width="24.7%"
          
        >
            <Text type="p" text="Copy" color="#fff" size="16px" weight={600} margin="22px" />
        </Button>
           </div>


         <MediaContainer>

          {
            media.map((item,i)=>(
              <div style={{display:"flex", flexDirection:"row", alignItems:"center" ,gap:"9px", cursor:"pointer"}} key={i}  >
<Image src={item.src} alt="i" width={32} height={32}/>
<Text type="p"  text={item.name}/>
              </div>
            ))
          }
         </MediaContainer>
       
      </Box>
  
    </BlogReusableModal>
  );
};

export default ShareModal;