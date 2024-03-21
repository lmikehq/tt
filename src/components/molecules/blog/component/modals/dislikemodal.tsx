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






const FieldLabel = styled.p`
   

     & span {
    color: red;
    margin-left:8px;
  }
`;


interface Props {
  open: boolean;
  onClose: () => void;
}

const DislikeModal = ({ open, onClose }: Props) => {
  const [loading, setLoading] = useState(false);
  const [createForm, setCreateForm]= useState(false)
   const { isMobile } = useScreenResolution();
 const {setFeedbackModal} = useBlogStore(
        (state) => state);
  const handleSubmit = () => {
    setLoading(true);
    onClose();
    setFeedbackModal(true);
    setTimeout(() => {
     setLoading(false);
    }, 2000);
  };
   const handleSwitchForm = () => {
        setCreateForm(!createForm)
  };

  return (
    <BlogReusableModal
      open={open}
      onClose={onClose}
      description=""
      maxWidth="600px"
      width="60%"

    >
      <Box styles={{ padding:isMobile?"2rem 0 0 0":"6rem 0 0 0", position:"relative"}}>
      {
  isMobile?null:  <Image src={"/assets/images/blog/ttlogo.svg"} alt="" styles={{height:"auto", maxWidth:"18.7%", position:"absolute", top:"-50%", left:"0%"}}/>
}
        <Text type="h1" text="Help Us Improve Articles on Thrillers Travels" size={isMobile?24:28} weight={600} />
        <p style={{ margin: "0 0 40px 0" }}>Help Us improve Articles on Thrillers Travels</p>

        {createForm ? (
          <div>
            <FieldLabel>First Name <span>*</span></FieldLabel>
        <Input placeholder="Enter your First Name"/>
        <FieldLabel>Last Name <span>*</span></FieldLabel>
        <Input placeholder="Enter your Last Name"/>
       <FieldLabel>Email Address <span>*</span></FieldLabel>
        <Input placeholder="Enter your Email Address"/>
        <FieldLabel>Password<span>*</span></FieldLabel>
        <Input placeholder="Enter your Password" styles={{margin:"0 0 48px 0"}}/>
          </div>
        ) : (
          <div>
   <FieldLabel>Email Address <span>*</span></FieldLabel>
        <Input placeholder="Enter your Email Address"/>
        <FieldLabel>Password<span>*</span></FieldLabel>
        <Input placeholder="Enter your Password" styles={{margin:"0 0 48px 0"}}/>
          </div>
        )}

        <Button
          type="submit"
          width="100%"
          background={ttColors.dark}
          onClick={handleSubmit}
        >
          {loading ? (
            <Spinner size="40px" fill={ttColors.primary} />
          ) : (
            <Text type="p" text={createForm ? "Create Account" : "Login to your Account"} color="#fff" size="16px" weight={500} />
          )}
        </Button>

        <div style={{ display: "flex", flexDirection: "row", margin: "32px 0 30px 0", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
          <div style={{ width: "100%", border: "0.5px solid #CBD4E6" }}></div>
          <p style={{ color: "#7C8DB0" }}>or</p>
          <div style={{ width: "100%", border: "0.5px solid #CBD4E6" }}></div>
        </div>

        <Button
          type="submit"
          width="100%"
          border="1px solid #06062A"
          background={ttColors.defaultColor}
          onClick={() => {
            handleSwitchForm();
          }}
        >
       
            <Text type="p" text={createForm ? "Login to your account" : "Create Account"} color="#000000" size="16px" weight={500} />
     
        </Button>
      </Box>
    </BlogReusableModal>
  );
};

export default DislikeModal;