"use client";
import { IoCloudUpload } from "react-icons/io5";
import React, { useRef } from "react";
import { styled } from "styled-components";
import Image from "@atom/image";
import Button from "@atom/button";
import Text from "@atom/text";
import { HiPencil } from "react-icons/hi";
import { ttColors } from "theme/colors";
import { useScreenResolution } from "hook/useScreenResolution";
import { BsFillCameraFill } from "react-icons/bs";
import { useUserStore } from "store/useStore";
import Input from "@atom/input";
const DashboardCoverPicture = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  display: block;

  & img {
    width: 15%;
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
      transform: translate(-50%, 100%) !important;
      position: sticky;
    }
  }

  & button {
    top: 20px !important;
    right: 42.5% !important;
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

function UserPicture() {
  const { isMobile } = useScreenResolution();
  const { user } = useUserStore((state) => state);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  return (
    <div>
      <DashboardCoverPicture>
        <Image
          src={user?.coverPicture || "/assets/images/dashboard/cover.jpg"}
          alt="cover-picture"
          height={isMobile ? 120 : 215}
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
          styles={{ width: isMobile ? "" : "160px" }}
          width={160}
        />
        <Button
          styles={{
            position: "absolute",
            background: "var(--primary-color)",
            color: "var(--secondary-color)",
            top: "10px",
            right: " 45.5%",
            borderRadius: "50%",
            height: "50px",
            width: "50px",
            padding: "9px",
          }}
          onClick={handleButtonClick}
        >
          <HiPencil size="2rem" />
        </Button>
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          style={{ display: "none" }}
        />
        <ProfileInfomation>
          <Text type="h3" text={user?.firstName + " " + user?.lastName} />
          <Text type="p" text={user?.email} />
        </ProfileInfomation>
      </DashboardProfilePictue>
    </div>
  );
}

export default UserPicture;
