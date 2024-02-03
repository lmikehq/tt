"use client";
import { useClipboard } from "@/lib/extensions/helpers/copyToClipboard";
import Image from "@atom/image";
import Text from "@atom/text";
import Flex from "@components/templates/flex";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import { useUserStore } from "@lib/store/useStore";
import { ttColors } from "@lib/theme/colors";
import {
  BiCopy,
  BiPencil,
  BiSolidCopy,
  BiSolidUser,
  BiSolidUserCircle,
  BiUserCircle,
} from "react-icons/bi";
import { styled } from "styled-components";
import Section from "../../section";
import { useState } from "react";
import getBase64 from "@/lib/extensions/helpers/getBase64";
import useCloudinaryUpload from "@/lib/extensions/hook/useCloudinary";
import toast from "react-hot-toast";
import { DashboardAccountService } from "@/lib/services/dashboard/getUser";
import apiService from "@/lib/extensions/hook/apiService";
import { UpdateProfileModal } from "./profileModal";
import { useAccountDashboard } from "@/lib/hooks/dashboard/account.hook";
import { AuthUser } from "@/lib/types/response-models/auth/auth.type";
import Spinner from "../../icons/spinner";
const DashboardCoverPicture = styled.div`
    position: relative;
    width: 100%;
    height: 250px;
    display: block;

    & img {
        width: 100%;
        border-radius: 8px;
        object-fit: cover;
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
        height: 188px !important;
    }
`;

const ProfileInfomation = styled.div`
    // position: absolute;
    // top: 100px;
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
            opacity: 1;
        }
    }
    @media screen and (max-width: 900px) {
        top: 150px !important;
    }
`;

const DashboardProfilePictue = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top:-80px;
  margin:auto;
  left:0;
  right:0;
  @media screen and (max-width: 900px) {
    top:-100px;

}
  
  & img {
    // position: absolute;
    border-radius: 50%;
    // top: 50%;
    // left: 50%;

    @media screen and (max-width: 900px) {
    //   transform: translate(-50%, 100%) ;
    //   position: sticky;
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
    background: #f3fafd;
    width: fit-content;
    max-width: 100%;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    border: 1px solid #7bbbd6;
    margin: auto;
`;

function UserPicture() {
  const { isMobile } = useScreenResolution();
  const { data, isLoading, refetch } = useAccountDashboard();
  const user: AuthUser = data as AuthUser;

  const [openModal, setOpenModal] = useState({
    profilePictureModal: false
  });


  const referralLink = `https://thrillers.travel/register?ref=${String(
    user?.firstName ?? ""
  ).toLocaleLowerCase()}-${String(user?.lastName ?? "").toLocaleLowerCase()}`;
  const { copyToClipboard } = useClipboard();


  return (
    <>
      <Flex direction="column" margin="0px">
        <DashboardCoverPicture>
          <Image
            src={
              // user?.coverPicture ||
              "/assets/images/dashboard/cover_background.svg"
            }
            alt="cover-picture"
            height={isMobile ? 188 : 250}
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
        <Section
          styles={{
            position: "relative",
            height: isMobile ? "151px" : "238px",
            marginBottom: "2rem",
          }}
        >
          {isLoading ? (
            <Flex height="450px" align="center" justify="center">
              <Spinner size="60px" fill={ttColors.blackishBlue} />
            </Flex>
          ) : (
            <DashboardProfilePictue>
              <Section
                width="fit-content"
                borderRadius="50%"
                background="white"
                padding={10}
                styles={{
                  border: user?.profilePicture ? "" : "4px solid var(--Slamon, #FF8682)",
                  marginBottom: "1.125rem",
                  position: 'relative',
                }}
              >
                {user?.profilePicture ? (
                  <img
                    src={user?.profilePicture}
                    alt="user-profile"
                    style={{ height: isMobile ? "120px" : "140px", width: isMobile ? "120px" : "140px", objectFit: "cover" }}
                  />
                ) : (
                  <BiSolidUser
                    size={isMobile ? 91 : 140}
                    color={ttColors.lighterGray}
                  />
                )}
                <Flex
                  height={isMobile ? "25px" : "35px"}
                  width={isMobile ? "25px" : "35px"}
                  styles={{ position: 'absolute', bottom: isMobile ? "12px" : '8px', left: isMobile ? "12px" : "8px" }}
                  background="#FF8682"
                  borderRadius="50%"
                  align="center"
                  justify="center"
                >
                  <BiPencil
                    cursor={"pointer"}
                    color="#FFF"
                    onClick={() => setOpenModal((prev) => {
                      return {
                        ...prev,
                        profilePictureModal: true
                      };
                    })} />
                </Flex>
              </Section>

              <ProfileInfomation>
                <Text
                  type="h3"
                  text={user?.firstName + " " + user?.lastName}
                  size={isMobile ? 16 : 24}
                  weight={600}
                  color={ttColors.blackishGreen}
                />
                <Text
                  type="p"
                  text={user?.email ?? ""}
                  size={16}
                  color={ttColors.blackishGreen}
                  margin="0.75rem 0"
                />
              </ProfileInfomation>
              <ReferralLink
                style={{
                  border: "1px solid #7BBBD6 !important",
                  padding: "0.875rem",
                }}
              >
                <Flex
                  gap=".5rem"
                  justify="center"
                  onClick={() =>
                    copyToClipboard(
                      referralLink,
                      "Referral link copied to clipboard"
                    )
                  }
                  cursor="pointer"
                  width="100%"
                  align="center"
                >
                  <BiSolidCopy
                    size={isMobile ? 16 : 24}
                    color={ttColors.blackishGreen}
                  />
                  <Section
                    styles={{
                      minWidth: 0,
                      flex: 1,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      fontWeight: 600,
                      fontSize: isMobile ? 12 : 16,
                    }}
                  >
                    {referralLink}
                  </Section>
                </Flex>
              </ReferralLink>
            </DashboardProfilePictue>
          )}

        </Section>
      </Flex>
      {openModal.profilePictureModal && (
        <UpdateProfileModal state={openModal.profilePictureModal} setState={setOpenModal} refetch={refetch} />
      )}
    </>
  );
}

export default UserPicture;
