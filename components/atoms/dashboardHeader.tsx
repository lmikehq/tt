"use client";
import styled from "styled-components";
import Image from "@atom/image";
import CoverPicture from "@image/dashboard/coverPicture.png";
import ProfilePicture from "@image/dashboard/profilePicture.png";
import Button from "@atom/button";
import Text from "@atom/text";
import { IoCloudUpload } from "react-icons/io5";
import { HiPencil } from "react-icons/hi";
import { ttColors } from "theme/colors";
import CustomTab from "@atom/tabs";

const DashboardWrapper = styled.div`
  margin: 10rem 0px;
`;
const DashboardCoverPicture = styled.div`
  position: relative;
  width: 100%;
  height: 350px;
  display: block;

  & img {
    width: 100%;
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
    // width: 200px;
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
    // border-radius: 50%;
    // border: 5px solid var(--primary-color) ;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  & button {
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
  }

  & p {
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: ${ttColors.dark};
    opacity: 0.7;
    /* identical to box height */

    text-align: center;
  }
`;




const DashboardHeader = () => {
    const tabItems = [
      {
        label: "Applications",
        value: 0,
        content: <p>Application content here</p>,
      },
      {
        label: "payment history",
        value: 1,
        content: <p>payment history here</p>,
      },
      {
        label: "Referral",
        value: 2,
        content: <p>Referrals history here</p>,
      },

      {
        label: "Account",
        value: 3,
        content: <p>Your account details here</p>,
      },
    ];
  return (
    <DashboardWrapper>
      <DashboardCoverPicture>
        <Image
          src={CoverPicture}
          alt="cover-picture"
          styles={{ width: "100%", height: "350px" }}
        />
        <Button styles={{ height: "65px", width: "230px" }}>
          <IoCloudUpload size="2rem" />
          Upload another cover
        </Button>
      </DashboardCoverPicture>
      <DashboardProfilePictue>
        <Image
          src={ProfilePicture}
          alt="profile-picture"
          styles={{ width: "160px", height: "160px" }}
        />
        <Button
          styles={{
            position: "absolute",
            background: "var(--primary-color)",
            color: "var(--secondary-color)",
            top: "28px",
            right: "44.5%",
            borderRadius: "50%",
            height: "50px",
            width: "50px",
            padding: "9px",
          }}
        >
          <HiPencil size="2rem" />
        </Button>
        <ProfileInfomation>
          <Text type="h3" text="John Deo" />
          <Text type="p" text="john.deo@gmail.com" />
        </ProfileInfomation>
      </DashboardProfilePictue>

      <CustomTab tabItems={tabItems} />
    </DashboardWrapper>
  );
};

export default DashboardHeader;
