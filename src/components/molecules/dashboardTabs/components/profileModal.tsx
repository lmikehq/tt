import { Dialog } from "@mui/material";
import ReusableModal from "./dashboardModal";
import { useState } from "react";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import Flex from "@/components/templates/flex";
import Section from "../../section";
import { ttColors } from "@/lib/theme/colors";
import { FaCloudUploadAlt } from "react-icons/fa";
import Text from "@/components/atoms/text";
import styled from "styled-components";
import Button from "@/components/atoms/button";
import Spinner from "../../icons/spinner";
import useCloudinaryUpload from "@/lib/extensions/hook/useCloudinary";
import { useUserStore } from "@/lib/store/useStore";
import getBase64 from "@/lib/extensions/helpers/getBase64";
import apiService from "@/lib/extensions/hook/apiService";
import toast from "react-hot-toast";
import { RefetchProp } from "types";

interface ModalProps {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<{
    profilePictureModal: boolean;
  }>>;
  refetch: RefetchProp;
}

const FileButton = styled(Button).attrs({ as: 'label' })`
    height: 54px;
    height: 100%;
    width: 150px;
    background-color: #F3FAFD;
    border: 1px solid #C8E8F6;
    color: #000;
    display: flex;
    justify-content: center;
    align-items: center;

  /* Style the input to be hidden */
  input[type="file"] {
    display: none;
  }
`;

const PreviewButton = styled(Button).attrs({ as: "label" })`
  height: 100%;
  background-color: transparent;
  width: 100%;
  border: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;



export const UpdateProfileModal = ({ state, setState, refetch }: ModalProps) => {
  const { isMobile } = useScreenResolution();
  const { user } = useUserStore((state) => state);
  const [loading, setLoading] = useState(false);
  const [cloudinaryUrl, setCloudinaryUrl] = useState('');
  const [file, setFile] = useState({
    blobData: '',
    fileName: '',
    fileType: '',
    fileSizeMB: 0
  });
  const timestamp = new Date().getTime();
  const presets = {
    publicId: user?.lastName! + timestamp || "unknown",
    folder: `${user?.lastName! + timestamp || "unknown"}-files`,
  };
  const { uploadImage, loading: isImageLoading } = useCloudinaryUpload({ presets });

  const handleClose = () => {
    setState((prev) => {
      return {
        ...prev,
        profilePictureModal: false
      };
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      const res = await getBase64(file);
      const fileName = file.name;
      const fileType = file.type;
      const fileSize = file.size;

      const newFile = {
        blobData: res,
        fileName: fileName,
        fileType,
        fileSizeMB: fileSize / (1024 * 1024)
      };
      setFile(newFile);

      try {
        const secureUrl = await uploadImage({ file: file });
        setCloudinaryUrl(secureUrl);
        toast.success("Photo Uploaded");
        // update user profile picture
        // DashboardAccountService.updateUser({ profilePicture: cloudinaryUrl });
      } catch (err) {
        toast.error('Error uploading the file');
      }
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const response = await apiService('/user/update', 'POST', {
        profilePicture: cloudinaryUrl
      });
      console.log('update profile picture status', response);
      if (response._id.length > 1) {
        toast.success("Photo Updated");
      }
      setLoading(false);
      handleClose();
      refetch();
      // window.location.reload();
    }
    catch (err) {
      throw err;
    }
  };

  return (
    <ReusableModal
      open={state}
      onClose={handleClose}
      headerText="Change Profile Photo"
      description=""
      maxWidth={isMobile ? '90%' : '640px'}
      showButton={false}
    >
      <Flex align="center" justify="center" direction="column" padding={isMobile ? "0 20" : "0 63px"}>
        {cloudinaryUrl.length > 1 ? (
          <>
            {isImageLoading ? (
              <>
                <Spinner size="40px" fill={ttColors.primary} />
              </>
            ) : (
              <Flex align="center" justify="center">
                <div
                  style={{
                    maxWidth: isMobile ? "170px" : "200px",
                    maxHeight: isMobile ? "170px" : "200px",
                    height: isMobile ? "170px" : "200px",
                    width: isMobile ? "170px" : "200px",
                    overflow: "hidden",
                    margin: "0 auto",
                    display: "flex",
                    justifyContent: "center",
                    borderRadius: "100%"
                  }}>
                  <img
                    src={cloudinaryUrl}
                    alt="user-profile-upload"
                    style={{
                      height: "auto",
                      maxHeight: "170px",
                      maxWidth: "170px",
                      width: "100%",
                      borderRadius: "100%",
                      objectFit: 'cover'
                    }}
                  />
                </div>
              </Flex>
            )}

          </>
        ) : (
          isImageLoading ? (
            <>
              <Spinner size="40px" fill={ttColors.primary} />
            </>
          ) : (
            <Flex
              width={isMobile ? "170px" : "300px"}
              height={isMobile ? "170px" : "300px"} align="center" justify="center" direction="column" borderRadius="50%"
              border={`1px dashed ${ttColors.lighterGray}`}>
              <PreviewButton htmlFor="profile-file-input">
                <FaCloudUploadAlt color={ttColors.primary} size={isMobile ? 45 : 85} />

                <input
                  type="file"
                  id="profile-file-input"
                  style={{ display: 'none' }}
                  onChange={handleFileUpload}
                  accept=".png, .jpg, .jpeg"
                />
                <Flex direction="column">
                  {/* <Text type="p" text="Upload" textAlign="center" margin={0} /> */}
                  <Text
                    type="p"
                    text="Preview your image here"
                    textAlign="center"
                    color={ttColors.dark}
                    size={isMobile ? 12 : 14} margin={0} />
                </Flex>
              </PreviewButton>

            </Flex>
          )
        )}

        {/* <Text type="p" text="or" /> */}

        <Flex margin="20px 0" align="center" justify="center">
          {cloudinaryUrl.length > 1 ? (
            <Button background={ttColors.red} height="54px" width="150px" onClick={() => setCloudinaryUrl('')}>
              <Text type="p" text="Remove Photo" color="#FFF" weight={500} />
            </Button>
          ) : (
            <FileButton htmlFor="profile-file-input" height="54px" className="file-button">
              <input
                type="file"
                id="profile-file-input"
                style={{ display: 'none' }}
                onChange={handleFileUpload}
                accept=".png, .jpg, .jpeg"
              />
              <Text type="p" text="Choose Photo" weight={500} />
            </FileButton>
          )}
        </Flex>

        <Flex align="center" justify="center" gap="20px" margin="40px 0 0">
          <Button background="transparent" border={`1px solid ${ttColors.dark}`} width="50%" onClick={handleClose}>
            <Text type="p" text="Cancel" color={ttColors.dark} weight={500} />
          </Button>

          <Button background={ttColors.dark} width="50%" onClick={handleSave}>
            {loading ? (
              <Spinner size="40px" fill={ttColors.primary} />
            ) : (
              <Text type="p" text="Save" weight={500} />
            )}
          </Button>
        </Flex>
      </Flex>
    </ReusableModal >
  );
};