"use client";
import Text from "@atom/text";
import Section from "src/components/molecules/section";
import { FormikProps, useFormik } from "formik";
import useCloudinaryUpload from "@lib/extensions/hook/useCloudinary";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import FormStepTitle from "./formStepsTitle";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import { FileContent, useFilePicker } from "use-file-picker";
import SearchStringInput from "src/components/molecules/searchInputs/searchStringInput";
import { UploadedDoc } from "../applicationForm";
import { DocumentInterface, Mode } from "@lib/types";
import ContinueButton from "@organism/continueButton";
import DocumentUploadWidget from "@organism/DocumentUploadWidget";
import { useApplicationFormStore } from "@lib/store/application-form.store";
import { documentsSchema } from "@lib/types/schema";
import { useRouter } from "next/navigation";

interface formProps {
  steps: string[];
  index: number;
  persistForm: () => void;
  formik: FormikProps<{ documents: DocumentInterface[] }>;
}

function UploadDocuments({ steps, index, persistForm, formik }: formProps) {
  const { isMobile } = useScreenResolution();
  const { form, mode, setUploadedDocuments, uploadedDocuments } =
    useApplicationFormStore((state) => state);
  const isLoading = mode == Mode.loading;

  const computeButtonText = () => {
    let accompanies = 0;
    if (form.familyMembers.length > 0) {
      form.familyMembers.forEach((member) => {
        if (member.accompanying) accompanies++;
      });
    }
    return !isMobile
      ? "Make Payment"
      : accompanies > 0
      ? "Make Payment (NGN 30,000)"
      : "Make Payment (NGN 20,000)";
  };

  const [hovered, setHovered] = useState<number>(-1);
  const [documentToUpload, setDocumentToUpload] = useState<string>("");

  const handleFailedValidation = () => {
    if (!formik.errors.documents) return;
    return toast.error(formik.errors.documents as string);
  };

  const [openFilePicker, { filesContent, plainFiles }] = useFilePicker({
    readAs: "DataURL",
    accept: [".png", ".pdf", ".jpeg"],
    multiple: !(documentToUpload == "International passport"),
    maxFileSize: 10,
  });
  const timestamp = new Date().getTime();
  const presets = {
    publicId: form.personalInfo.lastName + timestamp || "unknown",
    folder: `${form.personalInfo.lastName + timestamp || "unknown"}-files`,
  };
  const { uploadImage, loading, progress, deleteImage, deleting } =
    useCloudinaryUpload({ presets });

  const uploadFileToCLoudinary = async ({ file }: { file: FileContent }) => {
    return await uploadImage({ file: file.content }).then((image) => {
      if (typeof image === "string") {
        const docObj: DocumentInterface = {
          name: documentToUpload,
          url: image,
        };
        const { name, size, type } =
          plainFiles[
            filesContent.findIndex((el) => el.content == file.content)
          ];
        const findIndex =
          documentToUpload == "International passport"
            ? (uploadedDocuments ?? []).findIndex(
                (el) => el.title == documentToUpload
              )
            : -1;

        if (findIndex == -1) {
          const formikUploadedDocument = docObj;
          // formik.setFieldValue("documents", formikUploadedDocuments);
          const uploadedDoc = {
            name:
              name.length <= 30
                ? name
                : name.split(".")[0].substring(0, 30) +
                  "..." +
                  name.split(".")[1],
            size: `${size / 1000000} MB`,
            type: type.split("/")[1].toUpperCase(),
            title: docObj.name,
          };
          // setUploadedDocuments(uploadedDocs);

          return { formikUploadedDocument, uploadedDoc };
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
          setUploadedDocuments(uploadedDocs);
        }
      }
    });
  };
  const uploadFiles = async () => {
    if (filesContent.length > 0) {
      let formikUploadedDocuments: DocumentInterface[] = [
        ...formik.values.documents,
      ];
      let uploadedDocs: UploadedDoc[] = [...uploadedDocuments];
      for (const file of filesContent) {
        await uploadFileToCLoudinary({ file }).then((data) => {
          if (data) {
            formikUploadedDocuments = [
              ...formikUploadedDocuments,
              data.formikUploadedDocument!,
            ];
            uploadedDocs = [...uploadedDocs, data.uploadedDoc!];
            formik.setFieldValue("documents", formikUploadedDocuments);
            setUploadedDocuments(uploadedDocs);
          }
        });
      }
    }
  };

  useEffect(() => {
    uploadFiles();
  }, [filesContent]);

  return (
    <Section>
      <FormStepTitle steps={steps} index={index} />
      <Section>
        <Text
          type="p"
          size={isMobile ? 16 : 18}
          weight={400}
          color={"#929292"}
          text="If you don't have all document required, don't worry, our team will complete the rest for you"
        />
      </Section>

      <form onSubmit={formik.handleSubmit}>
        <Section>
          <Section>
            <Text
              type="p"
              text="Document Upload"
              size={"1.125rem"}
              weight={400}
              color="#000000"
              margin={isMobile ? "1.5rem 0 0.9rem 0" : "3rem 0 .9rem"}
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
                switch (form.tripDetails.visaType) {
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
              onChange={(e: string) => setDocumentToUpload(e)}
              value={documentToUpload}
              placeholder="Select each required document & Upload"
            />
          </Section>
        </Section>
        <Section styles={{ marginBottom: isMobile ? "1.5rem" : "0" }}>
          <DocumentUploadWidget
            loading={loading}
            deleting={deleting}
            progress={progress}
            documents={uploadedDocuments}
            openFilePicker={() => {
              if (!documentToUpload)
                return toast.error("Please select a document to upload");
              openFilePicker();
            }}
            handleDelete={async (i: number) => {
              try {
                await deleteImage({
                  imageUrl: formik.values.documents[i].url,
                });
                setUploadedDocuments([
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
              } catch (error) {
                throw error;
              }
            }}
          />
        </Section>
        <ContinueButton
          isLoading={isLoading}
          onClick={() => {}}
          disabled={!formik.isValid}
          saveProgress={persistForm}
          buttonText={computeButtonText()}
        />
      </form>
    </Section>
  );
}

export default UploadDocuments;
