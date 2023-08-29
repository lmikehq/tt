"use client";
import Text from "@atom/text";
import Section from "@molecule/section";
import { FormikProps } from "formik";
import useCloudinaryUpload from "hook/useCloudinary";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import FormStepTitle from "./formStepsTitle";
import { useScreenResolution } from "hook/useScreenResolution";
import { useFilePicker } from "use-file-picker";
import SearchStringInput from "@molecule/searchInputs/searchStringInput";
import { UploadedDoc } from "../applicationForm";
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
  lastName: string;
}

function UploadDocuments({
  steps,
  index,
  isLoading,
  formik,
  uploadedDocuments,
  handleSetUploadedDocuments,
  visaType,
  lastName,
}: formProps) {
  const { isMobile } = useScreenResolution();

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
  const timestamp = new Date().getTime();
  const presets = {
    publicId: lastName + timestamp || "unknown",
    folder: `${lastName + timestamp || "unknown"}-files`,
  };
  const { uploadImage, loading, progress, deleteImage, deleting } =
    useCloudinaryUpload({ presets });

  useEffect(() => {
    if (filesContent.length > 0) {
      uploadImage({ file: filesContent[0].content }).then((image) => {
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
      <Section>
        <Text
          type="p"
          size={18}
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
