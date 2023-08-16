"use client";
import Center from "@atom/center";
import Flex from "@atom/flex";
import Input from "@atom/input";
import { SearchInputAsString } from "@atom/searchInput";
import Text from "@atom/text";
import { get100Years } from "@lib/utilFns";
import Section from "@molecule/section";
import { COUNTRY_FLAGS } from "data/data";
import { FormikValues } from "formik";
import useCloudinaryUpload from "hook/useCloudinary";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineCheck } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { FaCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { styled } from "styled-components";
import { ttColors } from "theme/colors";
import { useFilePicker } from "use-file-picker";
import FormStepTitle from "./formStepsTitle";
import { useScreenResolution } from "hook/useScreenResolution";
import Button from "@atom/button";
import Image from "@atom/image";
import DocPlus from "@image/form/docUpload/docPlus.svg";
import DeleteIcon from "@image/visaIcons/delete.png";
import CircularProgressBar from "@molecule/progressBars/CircularProgressBar";
import UploadedDocTile from "@molecule/docUpload/UploadedDocTile";
import CustomConfirmationModal, {
  CustomConfirmationModalProps,
} from "@organism/visaApplicationModal";

interface formProps {
  formik: FormikValues;
  steps: string[];
  index: number;
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
// @media (max-width: 768px) {
//   height: 10rem;
// }

const UploadedDoc = styled.div<{ bg: any }>`
  background: #ffffff;
  background-image: url(${({ bg }) => bg});
  height: 6rem;
  width: 10rem;
  background-size: cover;
  background-position: center;
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

function OtherInformation({ formik, steps, index }: formProps) {
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
  const [uploadedDocuments, setUploadedDocuments] = useState<
    {
      name: string;
      type: string;
      size: string;
      title: string;
    }[]
  >();

  const [openFilePicker, { filesContent, plainFiles }] = useFilePicker({
    readAs: "DataURL",
    accept: ["image/*", ".pdf", ".doc", ".docx"],
    multiple: false,
  });
  const presets = {
    public_id: formik.values.lastName || "unknown",
    folder: `${formik.values.lastName || "unknown"}-files`,
  };
  const { uploadImage, loading, progress } = useCloudinaryUpload(presets);

  useEffect(() => {
    if (filesContent.length > 0) {
      uploadImage(filesContent[0].content).then((image) => {
        if (typeof image === "string") {
          const docObj = {
            title: documentToUpload,
            url: image,
          };
          const { name, size, type } = plainFiles[0];
          const findIndex = (uploadedDocuments ?? []).findIndex(
            (el) => el.title == documentToUpload
          );
          console.log(plainFiles[0]);
          if (findIndex == -1) {
            formik.setFieldValue("uploadedDocuments", [
              ...formik.values.uploadedDocuments,
              docObj,
            ]);

            setUploadedDocuments([
              ...(uploadedDocuments ?? []),
              {
                name,
                size: `${size / 1000000} MB`,
                type: type.split("/")[1].toUpperCase(),
                title: docObj.title,
              },
            ]);
          } else {
            let formikUploadedDocuments = [...formik.values.uploadedDocuments];
            let uploadedDocs = [...(uploadedDocuments ?? [])];
            formikUploadedDocuments.splice(findIndex, 1, docObj);
            uploadedDocs.splice(findIndex, 1, {
              name,
              size: `${size / 1000000} MB`,
              type: type.split("/")[1].toUpperCase(),
              title: docObj.title,
            });
            formik.setFieldValue("uploadedDocuments", formikUploadedDocuments);
            setUploadedDocuments(uploadedDocs);
          }
        }
      });
    }
  }, [filesContent]);

  return (
    <Section width={isMobile ? "100%" : "50%"}>
      <FormStepTitle steps={steps} index={index} />

      <form style={{ margin: isMobile ? "1rem 0 0" : "1rem 0" }}>
        <Flex
          justify="space-between"
          direction={isMobile ? "column" : "row"}
          gap={isMobile ? "0px" : "1.5rem"}
        >
          <Section>
            <Text
              type="p"
              text="Passport Number"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
            />
            <Input
              height="40px"
              addon={
                formik?.values?.passNumber?.length > 8 ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : undefined
              }
              value={formik.values.passNumber}
              onChange={(x) =>
                formik.setFieldValue("passNumber", x.target.value)
              }
            />
          </Section>
          <Section>
            <Text
              type="p"
              text="Passport issued country"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
            />
            <SearchInputAsString
              height="8px"
              options={COUNTRY_FLAGS.map((x) => x.name)}
              onChange={(x) => formik.setFieldValue("passIssueCountry", x)}
            >
              <Flex justify="space-between">
                <Text
                  type="p"
                  text={formik?.values?.passIssueCountry}
                  color="#1C1B1F"
                  weight={100}
                  styles={{ cursor: "pointer" }}
                />
                {formik.values.passIssueCountry ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : (
                  <IoIosArrowDown size={20} />
                )}
              </Flex>
            </SearchInputAsString>
          </Section>
        </Flex>

        <Flex
          justify="space-between"
          direction={isMobile ? "column" : "row"}
          gap={isMobile ? "0px" : "1.5rem"}
        >
          <Section>
            <Text
              type="p"
              text="Year of Expiry"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
            />
            <SearchInputAsString
              height="8px"
              options={get100Years(true)}
              onChange={(x) => formik.setFieldValue("expiryYear", x)}
            >
              <Flex justify="space-between">
                <Text
                  type="p"
                  text={formik?.values?.expiryYear}
                  color="#1C1B1F"
                  weight={100}
                  styles={{ cursor: "pointer" }}
                />
                {formik.values.expiryYear ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : (
                  <IoIosArrowDown size={20} />
                )}
              </Flex>
            </SearchInputAsString>
          </Section>
          <Section>
            <Text
              type="p"
              text="Gender"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
            />
            <SearchInputAsString
              height="8px"
              options={["Male", "Female", "Other"]}
              onChange={(x) => formik.setFieldValue("gender", x)}
            >
              <Flex justify="space-between">
                <Text
                  type="p"
                  text={formik?.values?.gender}
                  color="#1C1B1F"
                  weight={100}
                  styles={{ cursor: "pointer" }}
                />
                {formik.values.gender ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : (
                  <IoIosArrowDown size={20} />
                )}
              </Flex>
            </SearchInputAsString>
          </Section>
        </Flex>

        <Text
          type="p"
          text="Your guarantor’s information"
          size={isMobile ? "1.4rem" : "1.6rem"}
          margin="1rem 0 0"
        />

        <Flex
          margin="0 0 1rem"
          justify="space-between"
          direction={isMobile ? "column" : "row"}
          gap={isMobile ? "0px" : "1.5rem"}
        >
          <Section>
            <Text
              type="p"
              text="Guarantor’s Name"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
            />
            <Input
              height="40px"
              addon={
                formik?.values?.guarantorName?.length > 3 ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : undefined
              }
              value={formik.values.guarantorName}
              onChange={(x) =>
                formik.setFieldValue("guarantorName", x.target.value)
              }
            />
          </Section>
          <Section>
            <Text
              type="p"
              text="Relationship to you"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
            />
            <Input
              height="40px"
              addon={
                formik?.values?.guarantorRelationship?.length > 2 ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : undefined
              }
              value={formik.values.guarantorRelationship}
              onChange={(x) =>
                formik.setFieldValue("guarantorRelationship", x.target.value)
              }
            />
          </Section>
        </Flex>

        <Section>
          <Text
            type="p"
            text="Guarantor’s Address"
            margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
          />
          <Input
            height="40px"
            addon={
              formik?.values?.guarantorAddress?.length > 4 ? (
                <AiOutlineCheck color="#3BB98E" />
              ) : undefined
            }
            value={formik.values.guarantorAddress}
            onChange={(x) =>
              formik.setFieldValue("guarantorAddress", x.target.value)
            }
          />
        </Section>

        <Flex
          margin="0 0 1rem"
          justify="space-between"
          direction={isMobile ? "column" : "row"}
          gap={isMobile ? "0px" : "1.5rem"}
        >
          <Section>
            <Text
              type="p"
              text="Guarantor’s  Phone"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
            />
            <Input
              height="40px"
              addon={
                formik?.values?.guarantorPhone?.length > 3 ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : undefined
              }
              value={formik.values.guarantorPhone}
              onChange={(x) =>
                formik.setFieldValue("guarantorPhone", x.target.value)
              }
            />
          </Section>
          <Section>
            <Text
              type="p"
              text="Guarantor’s Worth"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
            />
            <Input
              height="40px"
              addon={
                formik?.values?.guarantorWorth?.length > 2 ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : undefined
              }
              value={formik.values.guarantorWorth}
              onChange={(x) =>
                formik.setFieldValue("guarantorWorth", x.target.value)
              }
            />
          </Section>
        </Flex>

        <Section>
          <Text
            type="p"
            text="Upload all your credentials"
            size={isMobile ? "1.4rem" : "1.5rem"}
            weight={600}
            color="#000000"
            margin=" 3.5rem 0 3.5rem 0"
          />
          {/* {[
            "passport sized photograph (must be on white background)",
            "valid international passport",
            "all academic certificates",
            "proof of address (utility bill)",
            "marriage certificate (if applicable)",
          ].map((item, i) => (
            <Flex align="center" gap=".5rem" margin="1rem 0" key={i}>
              <FaCircle size={".4rem"} color={ttColors.salmon} />
              <Text type="p" text={item} />
            </Flex>
          ))} */}
          <Section>
            <Text
              type="p"
              text="Document Upload"
              size={"1.125rem"}
              weight={400}
              color="#000000"
              margin={"0 0 1.125rem 0 "}
            />
            <SearchInputAsString
              height="8px"
              options={[
                "Passport sized photograph",
                "Valid international passport",
                "All academic certificates",
                "Proof of address (utility bill)",
                "Marriage certificate (if applicable)",
              ]}
              onChange={(e) => {
                console.log(e);
                setDocumentToUpload(e);
              }}
            >
              {/* onChange={(x) => formik.setFieldValue("documentUpload.", x)} */}
              <Flex justify="space-between" gap=".6rem" cursor="pointer">
                <Text
                  type="p"
                  text={
                    documentToUpload || "Select each required document & Upload"
                  }
                  size={"1rem"}
                  color={documentToUpload ? "#1C1B1F" : "#929292"}
                  weight={400}
                  styles={{ cursor: "pointer" }}
                />
                <IoIosArrowDown size={20} />
              </Flex>
            </SearchInputAsString>
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
                    style={{ marginBottom: "21px" }}
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
                                  setUploadedDocuments([
                                    ...uploadedDocuments.filter(
                                      (_: any, index: number) => index !== i
                                    ),
                                  ]);
                                  formik.setFieldValue(
                                    "uploadedDocuments",
                                    formik.values.uploadedDocuments.filter(
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
      </form>
    </Section>
  );
}

export default OtherInformation;
