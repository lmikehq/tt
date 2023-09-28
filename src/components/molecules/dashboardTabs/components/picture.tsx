"use client";
import { IoCloudUpload } from "react-icons/io5";
import React from "react";
import { styled } from "styled-components";
import Button from "@atom/button";
import Image from "@atom/image";
import Text from "@atom/text";
import { HiPencil } from "react-icons/hi";
import copyIcon from "@image/dashboard/copyIcon.png";
import toast from "react-hot-toast";
import { BsClipboard } from "react-icons/bs";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import { BsFillCameraFill } from "react-icons/bs";
import { ttColors } from "@lib/theme/colors";
import { useUserStore } from "@lib/store/useStore";
import Flex from "@components/templates/flex";
const DashboardCoverPicture = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  display: block;

  & img {
    width: 100%;
    border-radius: 12px;
  }

  & button {
    position: absolute !important;
    display: flex;
    right: 35px;
    bottom: 35px;
    border-radius: 4px;
    padding: 8px 16px;
    gap: 10px;
    font-size: 16px;
    line-height: 17px;

    @media screen and (max-width: 900px) {
      justify-content: center;
      font-size: 12px;
      line-height: 0px !important;
      padding: 0px !important;
      position: absolute !important;
      top: 5px !important;
      right: 5px !important;
    }
  }
  @media screen and (max-width: 900px) {
    & img {
      width: 100%;
    }
  }
  @media screen and (max-width: 900px) {
    height: 0px !important;
  }
`;

const ProfileInfomation = styled.div`
  position: absolute;
  top: 100px;
  //   margin-top: 15px;
  display: flex;
  flex-direction: column;

  & h3 {
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    text-align: center;
    color: ${ttColors.dark};

    @media screen and (max-width: 900px) {
      font-size: 16px;
      line-height: 20px;
    }
  }

  & p {
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: ${ttColors.dark};
    opacity: 0.7;
    text-align: center;
    @media screen and (max-width: 900px) {
      font-size: 12px;
      line-height: 10px;
      opacity: 1;
    }
  }
  @media screen and (max-width: 900px) {
    top: 150px !important;
  }
`;

const DashboardProfilePictue = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  
  & img {
    position: absolute;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    @media screen and (max-width: 900px) {
      transform: translate(-50%, 100%) ;
      position: sticky;
    }
  }

  & button {
    top: 16px !important;
    right: 44.5% !important;
    position: absolute;

    @media screen and (max-width: 900px) {
      padding: 9px;
      color: var(--secondary-color);
      background: var(--primary-color);
      width: 28px !important;
      height: 28px !important;
      border-radius: 50%;
      cursor: pointer;
      position: fixed;
      top: 110px !important;
      right: 41.5% !important;
    }

    @media screen and (max-width: 768px) {
      right: 44.5% !important;
   }
  @media screen and (max-width: 900px) {
    position: static;
    display: flex;
  }
`;

const ReferralLink = styled.div`
  background: rgb(123 187 214 / 30%);
  width: max-content;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  border: 1px solid #7bbbd6;
  position: relative;
  transform: translate(-50%, -50%) !important;
  left: 50% !important;
`;

function UserPicture() {
  const { isMobile } = useScreenResolution();
  const { user } = useUserStore((state) => state);

  const referralLink =
    `https://thrillers.travel/register?ref=${user?.firstName.toLocaleLowerCase()}-${user?.lastName.toLocaleLowerCase()}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      toast.success("Referral link copied to clipboard");
    });
  };
  return (
    <Flex direction="column" gap="1rem" margin="0px">
      <DashboardCoverPicture>
        <Image
          src={user?.coverPicture || "/assets/images/dashboard/cover.jpg"}
          alt="cover-picture"
          height={isMobile ? 120 : 250}
          styles={{ width: "100%" }}
        />
        {/* <Button
          styles={{
            height: isMobile ? "25px" : "65px",
            width: isMobile ? "25px" : "230px",
          }}
        >
          <IoCloudUpload
            size={isMobile ? "1rem" : "2rem"}
            style={{ display: isMobile ? "none" : "block" }}
          />
          <BsFillCameraFill
            size={isMobile ? ".8rem" : "2rem"}
            style={{ display: isMobile ? "block" : "none" }}
          />
          <Text
            type="p"
            text="Upload another cover"
            styles={{ display: isMobile ? "none" : "block" }}
          />
        </Button> */}
      </DashboardCoverPicture>

      <DashboardProfilePictue>
        <Image
          src={user?.profilePicture || "/assets/images/avatar.jpg"}
          alt="profile-picture"
          height={isMobile ? 70 : 160}
          width={isMobile ? 70 : 160}
        />
        {/* <Button
          styles={{
            position: "absolute",
            background: "red",
            color: "var(--secondary-color)",
            top: "10px",
            right: " 45.5%",
            borderRadius: "50%",
            height: "50px",
            width: "50px",
            padding: "9px",
          }}
        >
          <HiPencil size="2rem" />
        </Button> */}
        <ProfileInfomation>
          <Text
            type="h3"
            text={user?.firstName + " " + user?.lastName}
            size={isMobile ? "12px" : "14px"}
          />
          <Text type="p" text={user?.email} />
        </ProfileInfomation>
      </DashboardProfilePictue>

      <ReferralLink
        style={{
          border: "1px solid #7BBBD6 !important",
          padding: isMobile ? "8px" : "10px",
          margin: isMobile ? "8rem 0px 1.5rem" : "10rem 0px .5rem",
        }}
      >
        <Flex
          gap=".5rem"
          justify="center"
          onClick={copyToClipboard}
          cursor="pointer"
          width="max-content"
          align="center"
        >
          <Image
            src="/assets/images/dashboard/copyIcon.png"
            height={24}
            width={24}
            alt=""
            styles={{
              position: "relative",
              transform: isMobile ? "none" : "none",
              top: isMobile ? "0px" : "5px",
              left: "0px",
              alignContent: "center",
            }}
          />
          <Text
            type="h5"
            size={isMobile ? "9px" : "19px"}
            decoration="underline"
            text={referralLink}
          />
        </Flex>
      </ReferralLink>
    </Flex>
  );
}

export default UserPicture;
