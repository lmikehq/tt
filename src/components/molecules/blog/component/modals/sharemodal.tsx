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
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, EmailShareButton } from 'react-share';
import useShareModal from "./usesharemodal";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";


const MediaContainer = styled.div`
width:100%;
margin-top:48px;
&  div {
    // padding: 15px 0;
}
  & > *:not(:last-child) {
    border-bottom: 1px solid #E7E7E7; 
  
    
  }
`;

const MediaWrapper = styled.div`
//width:100%;

`;


interface Props {
  open: boolean;
  onClose: () => void;
  url?:any;
  title?:string | undefined;
}

const ShareModal = ({ open, onClose, url, title}: Props) => {
  const [loading, setLoading] = useState(false);
const {handleClick, hasCopiedValue}= useShareModal();
    const { isMobile } = useScreenResolution();

  return (
    <BlogReusableModal
      open={open}
      onClose={onClose}
      description=""
      maxWidth="600px"
      width="60%"
      showlogo={false}

    >
      <Box styles={{display:"flex", flexDirection:"column", padding:isMobile?"2rem 0 0 0":"6rem 0 0 0", position:"relative"}}>
{
  isMobile?null:  <Image src={"/assets/images/blog/share.svg"} alt="" styles={{height:"auto", maxWidth:"18.7%", position:"absolute", top:"-50%", left:"0%"}}/>
}
      
          <Text type="h1" text="Share your Flight to Family & Friends"  size={isMobile?24:28} weight={600} />
           <Text type="p" text="You can easily share your flight details to family and friends." />


           <div style={{display:"flex", flexDirection:"row", alignItems:"center", width:"100%", gap:"12px"}}>
            <input value={url}  style={{width:"73%",height:"45px", background:"#F3FAFD",display:"flex",  border:"1px solid #6092A7",fontSize:"16px", fontWeight:"400", padding:"25px 20px", borderRadius:"4px"}}/>
            
             <Button
          type="submit"
          background="#7BBBD6"
          width="24.7%"
          onClick={()=>handleClick(url)}
          
        >
          
            <Text type="p" text={hasCopiedValue?"Copied":"Copy"} color="#fff" size="16px" weight={600} margin="22px" />
        </Button>
           </div>


         <MediaContainer>

     
      <MediaWrapper>
             <WhatsappShareButton url={url} title={title}>    
              <div style={{display:"flex", flexDirection:"row", alignItems:"center" ,gap:"9px", cursor:"pointer"}}>
<Image src="/assets/images/blog/lbwhatsapp.svg" alt="i" width={32} height={32}/>
<Text type="p"  text="Whatsapp"/>
              </div>
              </WhatsappShareButton>
      </MediaWrapper>
<MediaWrapper>
      <FacebookShareButton url={url} title={title}>  
                  <div style={{display:"flex", flexDirection:"row", alignItems:"center" ,gap:"9px", cursor:"pointer"}} >
<Image src="/assets/images/blog/bfacebook.svg" alt="i" width={32} height={32}/>
<Text type="p"  text="Facebook"/>


              </div></FacebookShareButton>
</MediaWrapper>
       
              <MediaWrapper>    <TwitterShareButton url={url} title={title}>      <div style={{display:"flex", flexDirection:"row", alignItems:"center" ,gap:"9px", cursor:"pointer"}} >
<Image src="/assets/images/blog/btwitter.svg" alt="i" width={32} height={32}/>
<Text type="p"  text="Twitter"/>
              </div></TwitterShareButton></MediaWrapper>
                 
                 
<MediaWrapper>
             <EmailShareButton url={url} subject={title}>     <div style={{display:"flex", flexDirection:"row", alignItems:"center" ,gap:"9px", cursor:"pointer"}}>
<Image src="/assets/images/blog/bgmail.svg" alt="i" width={32} height={32}/>
<Text type="p"  text="Gmail"/>
              </div></EmailShareButton>
</MediaWrapper>
 
                  
            
          
         </MediaContainer>
       
      </Box>
  
    </BlogReusableModal>
  );
};

export default ShareModal;

