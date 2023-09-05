import Button from "src/components/atoms/button";
import Center from "src/components/atoms/center";
import Image from "src/components/atoms/image";
import Text from "src/components/atoms/text";
import Spinner from "src/components/icons/spinner";
import UploadedDocTile from "src/components/molecules/docUpload/UploadedDocTile";
import CircularProgressBar from "src/components/molecules/progressBars/CircularProgressBar";
import CustomConfirmationModal, {
  CustomConfirmationModalProps,
} from "src/components/organisms/visaApplicationModal";
import { useState } from "react";
import toast from "react-hot-toast";
import { styled } from "styled-components";
import { ttColors } from "theme/colors";
import DocPlus from "@image/form/docUpload/docPlus.png";
import DeleteIcon from "@image/visaIcons/delete.png";
import { UploadedDoc } from "src/components/organisms/form/applicationForm";

const UploadArea = styled.div`
  width: 100%;
  height: 21.32rem;
  text-align: center;
  background: #ffffff;
  border: 2px dashed rgba(0, 0, 0, 0.28);
  border-radius: 16px;
  margin-top: 2rem;

  border: 1.2px dashed var(--foundation-blue-blue-600, #7bbbd6);
`;

const DocUploadCenteredChild = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const UploadedDocumentsWrapper = styled.div`
  padding-top: 52px;
`;

interface DocumentUploadWidgetProps {
  loading: boolean;
  deleting: boolean;
  progress: number;
  openFilePicker: () => void;
  handleDelete: (i: number) => Promise<void>;
  documents: UploadedDoc[];
}

const DocumentUploadWidget = ({
  loading,
  deleting,
  progress,
  openFilePicker,
  handleDelete,
  documents,
}: DocumentUploadWidgetProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };
  const [modalContent, setModalContent] = useState<
    Omit<CustomConfirmationModalProps, "open" | "handleClose">
  >({
    icon: <></>,
    title: "",
    description: "",
    subTitle: "",
    buttons: <></>,
  });
  return (
    <>
      <UploadArea>
        <Center>
          {loading ? (
            <DocUploadCenteredChild>
              <CircularProgressBar progress={progress} />
              <Text
                styles={{ margin: "16px 0 38px 0" }}
                type={"p"}
                text="Uploading file..."
                weight={600}
                size={18}
                color="#000000"
              />
              <Button
                padding="0 16px"
                background="transparent"
                width="auto"
                borderRadius="4px"
                border="solid 1px #B6B6B6"
                onClick={() => {}}
                styles={{ cursor: "pointer" }}
              >
                <Text
                  color="#929292"
                  text="Cancel"
                  type={"p"}
                  weight={600}
                  size={16}
                />
              </Button>
            </DocUploadCenteredChild>
          ) : (
            <DocUploadCenteredChild>
              <Image
                styles={{ marginBottom: "21px" }}
                src={DocPlus}
                alt="add_doc_icon"
                height={56}
                width={56}
              />
              <Text
                styles={{ marginBottom: "56px" }}
                type={"p"}
                text="PNG, JPG, PDF up to 10MB"
                weight={400}
                size={16}
                color="#929292"
              />
              <Text
                styles={{ marginBottom: "18px" }}
                type={"p"}
                text="Drag or drop your file here"
                weight={600}
                size={20}
                color="#929292"
              />
              <Button
                padding="0 16px"
                background="#DAF0F9"
                width="auto"
                borderRadius="4px"
                onClick={openFilePicker}
                styles={{ cursor: "pointer" }}
              >
                <Text
                  color="#6092A7"
                  text="Upload File"
                  type={"p"}
                  weight={600}
                  size={16}
                />
              </Button>
            </DocUploadCenteredChild>
          )}
        </Center>
      </UploadArea>
      {documents?.length == 0 || !documents ? null : (
        <UploadedDocumentsWrapper>
          <Text
            type={"h5"}
            text="Uploaded Documents"
            weight={500}
            size={22}
            color="#000000"
            margin={"0 0 12px 0"}
          />
          <Text
            type={"p"}
            text={`${documents?.length} document${
              documents?.length == 1 ? "" : "s"
            } uploaded`}
            weight={500}
            size={18}
            color="#B6B6B6"
            margin={"0 0 41px 0"}
          />
          {(documents ?? []).map(({ name, type, size }, i: number) => {
            return (
              <UploadedDocTile
                key={i}
                fileName={name}
                fileType={type}
                fileSize={`${size}`}
                marginBottom={i == documents?.length ?? 0 - 1 ? "0px" : "12px"}
                removeDocument={() => {
                  setModalContent({
                    icon: (
                      <Image
                        src={DeleteIcon}
                        alt="delete-icon"
                        width={95.5}
                        height={95.5}
                      />
                    ),
                    title: "Delete File?",
                    description:
                      "Are you sure you want to delete the selected file? Deleting the file is a permanent action and cannot be retrieved.",
                    subTitle: name,
                    buttons: (
                      <>
                        <Button
                          background="transparent"
                          color={ttColors.dark}
                          border="1px solid #19013b"
                          onClick={handleModalClose}
                        >
                          No Thanks
                        </Button>
                        <Button
                          background="red"
                          color="#fff"
                          onClick={async () => {
                            await handleDelete(i).then((_) =>
                              handleModalClose()
                            );
                          }}
                        >
                          {deleting ? (
                            <Spinner size={"16px"} fill={ttColors.light} />
                          ) : (
                            "Delete"
                          )}
                        </Button>
                      </>
                    ),
                  });
                  handleModalOpen();
                }}
              />
            );
          })}
        </UploadedDocumentsWrapper>
      )}

      <div>
        <CustomConfirmationModal
          open={modalOpen}
          handleClose={handleModalClose}
          {...modalContent}
        />
      </div>
    </>
  );
};

export default DocumentUploadWidget;
