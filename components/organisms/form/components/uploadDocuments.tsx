"use client";
import Center from "@atom/center";
import Flex from "@atom/flex";
import Text from "@atom/text";
import Section from "@molecule/section";
import { FormikProps, FormikValues, useFormik } from "formik";
import useCloudinaryUpload from "hook/useCloudinary";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { IoIosArrowDown } from "react-icons/io";
import FormStepTitle from "./formStepsTitle";
import { useScreenResolution } from "hook/useScreenResolution";
import Button from "@atom/button";
import Image from "@atom/image";
import DocPlus from "@image/form/docUpload/docPlus.png";
import DeleteIcon from "@image/visaIcons/delete.png";
import CircularProgressBar from "@molecule/progressBars/CircularProgressBar";
import UploadedDocTile from "@molecule/docUpload/UploadedDocTile";
import CustomConfirmationModal, {
  CustomConfirmationModalProps,
} from "@organism/visaApplicationModal";
import { styled } from "styled-components";
import { useFilePicker } from "use-file-picker";
import { ttColors } from "theme/colors";
import { AiOutlineCheck } from "react-icons/ai";
import SearchStringInput from "@molecule/searchInputs/searchStringInput";
import { documentsArr, documentsSchema } from "@lib/application/schema";
import { SingleFormType, UploadedDoc } from "../applicationForm";
import Spinner from "@components/icons/spinner";
import { DocumentInterface } from "types";
import ContinueButton from "@atom/continueButton";

interface formProps {
  steps: string[];
  index: number;
  isLoading: boolean;
  formik: FormikProps<{ documents: DocumentInterface[] }>;
  handleSetUploadedDocuments: (docs: UploadedDoc[]) => void;
  uploadedDocuments: UploadedDoc[];
  visaType: string;
}

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

function UploadDocuments({
  steps,
  index,
  isLoading,
  formik,
  uploadedDocuments,
  handleSetUploadedDocuments,
  visaType,
}: formProps) {
  const { isMobile } = useScreenResolution();
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

  const [hovered, setHovered] = useState<number>(-1);
  const [documentToUpload, setDocumentToUpload] = useState<string>("");

  const handleFailedValidation = () => {
    if (!formik.errors.documents) return;
    return toast.error(formik.errors.documents as string);
  };

  const [openFilePicker, { filesContent, plainFiles }] = useFilePicker({
    readAs: "DataURL",
    accept: [".png", ".pdf", ".jpeg"],
    multiple: false,
    maxFileSize: 10,
  });
  const presets = {
    public_id: "lastName" || "unknown",
    folder: `${"lastName" || "unknown"}-files`,
  };
  const { uploadImage, loading, progress } = useCloudinaryUpload(presets);

  useEffect(() => {
    if (filesContent.length > 0) {
      uploadImage(filesContent[0].content).then((image) => {
        if (typeof image === "string") {
          const docObj: DocumentInterface = {
            name: documentToUpload,
            url: image,
          };
          const { name, size, type } = plainFiles[0];
          const findIndex = (uploadedDocuments ?? []).findIndex(
            (el) => el.title == "International passport"
          );
          console.log(formik);
          console.log(name);
          if (findIndex == -1) {
            formik.setFieldValue("documents", [
              ...formik.values.documents,
              docObj,
            ]);

            handleSetUploadedDocuments([
              ...uploadedDocuments,
              {
                name:
                  name.length <= 30
                    ? name
                    : name.split(".")[0].substring(0, 30) +
                      "..." +
                      name.split(".")[1],
                size: `${size / 1000000} MB`,
                type: type.split("/")[1].toUpperCase(),
                title: docObj.name,
              },
            ]);
          } else {
            let formikUploadedDocuments = [...formik.values.documents];
            let uploadedDocs = [...(uploadedDocuments ?? [])];
            formikUploadedDocuments.splice(findIndex, 1, docObj);
            uploadedDocs.splice(findIndex, 1, {
              name:
                name.length <= 30
                  ? name
                  : name.split(".")[0].substring(0, 30) +
                    "..." +
                    name.split(".")[1],
              size: `${size / 1000000} MB`,
              type: type.split("/")[1].toUpperCase(),
              title: docObj.name,
            });
            formik.setFieldValue("documents", formikUploadedDocuments);
            handleSetUploadedDocuments(uploadedDocs);
          }
        }
      });
    }
  }, [filesContent]);

  return (
    <Section>
      <FormStepTitle steps={steps} index={index} />

      <form onSubmit={formik.handleSubmit}>
        <Section>
          <Section>
            <Text
              type="p"
              text="Document Upload"
              size={"1.125rem"}
              weight={400}
              color="#000000"
              margin="3rem 0 .9rem"
            />
            <SearchStringInput
              options={(() => {
                const general = [
                  "International passport",
                  "Passport photograph",
                  "Means of ID",
                  "Bank statement",
                  "Commitment Letter From Family or employer (if available)",
                  "Proof of accommodation",
                  "References from Employer",
                  "Academic References",
                  "Official Transcript from school",
                  "Professsional CV",
                  "Medical Records",
                  "Police Character (if available)",
                ];
                switch (visaType) {
                  case "Student Visa":
                    return general;
                  case "Work Visa":
                    return [...general, "Proof of Qualifications"];
                  case "family visa":
                    return [
                      ...general,
                      "Marriage Certificate",
                      "Birth Certificate of Children",
                    ];
                  case "Elite Migration Visa":
                    return [
                      ...general,
                      "Investment Proof",
                      "Proof of net worth",
                      "CV",
                    ];
                  default:
                    return [
                      ...general,
                      "Proof of Qualifications",
                      "Marriage Certificate",
                      "Birth Certificate of Children",
                      "Investment Proof",
                      "Proof of net worth",
                      "CV",
                    ];
                }
              })()}
              onChange={(e: string) => {
                console.log(e);
                console.log(formik);

                setDocumentToUpload(e);
              }}
              value={documentToUpload}
              placeholder="Select each required document & Upload"
            />
          </Section>

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
                    onClick={() => {
                      if (!documentToUpload)
                        return toast.error(
                          "Please select a document to upload"
                        );
                      openFilePicker();
                    }}
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
          {uploadedDocuments?.length == 0 || !uploadedDocuments ? null : (
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
                text={`${uploadedDocuments?.length} document${
                  uploadedDocuments?.length == 1 ? "" : "s"
                } uploaded`}
                weight={500}
                size={18}
                color="#B6B6B6"
                margin={"0 0 41px 0"}
              />
              {(uploadedDocuments ?? []).map(
                ({ name, type, size }, i: number) => {
                  return (
                    <UploadedDocTile
                      key={i}
                      fileName={name}
                      fileType={type}
                      fileSize={`${size}`}
                      marginBottom={
                        i == uploadedDocuments?.length ?? 0 - 1 ? "0px" : "12px"
                      }
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
                                onClick={() => {
                                  handleSetUploadedDocuments([
                                    ...uploadedDocuments.filter(
                                      (_: any, index: number) => index !== i
                                    ),
                                  ]);
                                  formik.setFieldValue(
                                    "documents",
                                    formik.values.documents.filter(
                                      (_: any, index: number) => index !== i
                                    )
                                  );
                                  handleModalClose();
                                }}
                              >
                                Delete
                              </Button>
                            </>
                          ),
                        });
                        handleModalOpen();
                      }}
                    />
                  );
                }
              )}
            </UploadedDocumentsWrapper>
          )}

          <div>
            <CustomConfirmationModal
              open={modalOpen}
              handleClose={handleModalClose}
              {...modalContent}
            />
          </div>
        </Section>
        <ContinueButton
          isLoading={isLoading}
          onClick={() => {
            console.log(formik);
          }}
          disabled={!formik.isValid || !formik.dirty}
        />
      </form>
    </Section>
  );
}

export default UploadDocuments;
