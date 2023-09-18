import Text from "@atom/text";
import Flex from "@components/templates/flex";
import apiService from "@lib/extensions/hook/apiService";
import useCloudinaryUpload from "@lib/extensions/hook/useCloudinary";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import DocumentUploadWidget from "@organism/DocumentUploadWidget";
import { FieldString } from "@organism/fieldInput";
import { UploadedDoc } from "@organism/form/applicationForm";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Section from "src/components/molecules/section";
import { DocumentInterface } from "types";
import { FileContent, useFilePicker } from "use-file-picker";
import ReusableModal from "./components/dashboardModal";

type VisaUploadDocModalProps = {
  open: boolean;
  onClose: () => void;
  refetch: () => void;
  visa: any;
};

const VisaUploadDocModal: React.FC<VisaUploadDocModalProps> = ({
  open,
  onClose,
  visa,
  refetch,
}) => {
  const handleClose = () => {
    setUploadedState({ uploaded: false, loading: false });
    setUploadedDocuments([]);
    onClose()
  };
  const { isMobile } = useScreenResolution();
  const infoRequests = visa?.infoRequests
    ? visa?.infoRequests.filter((req: any) => req?.isAnswered === false)
    : [];
  const docs = infoRequests.map((req: any) => ({
    information: req?.information,
    id: req?._id,
    infoType: req?.infoType,
  }));
  const [uploadedState, setUploadedState] = useState<{
    uploaded: boolean;
    loading: boolean;
  }>({
    uploaded: false,
    loading: false,
  });

  async function replyDocUploadRequest() {
    if (uploadedState.loading) return;
    if (uploadedDocuments.length < 1)
      return toast.error("Please upload a document");

    const res = await apiService(
      `/visa/info-request/reply/${docs[0]?.id}`,
      "POST",
      {
        information: uploadedDocuments.map((doc: any) => ({
          name: doc.title,
          url: doc.url,
        })),
        infoType: docs[0]?.infoType,
      }
    );
    if (res.statusCode === 200) {
      setUploadedState({ uploaded: true, loading: false });
      toast.success("Documents uploaded successfully");
      handleClose();
      refetch();
    } else {
      setUploadedState({ uploaded: false, loading: false });
      toast.error("Something went wrong");
    }
  }

  const timestamp = new Date().getTime();
  const [uploadedDocuments, setUploadedDocuments] = useState<any>([]);
  const [documentToUpload, setDocumentToUpload] = useState<string>(
    docs[0]?.information[0]
  );
  const [openFilePicker, { filesContent, plainFiles }] = useFilePicker({
    readAs: "DataURL",
    accept: [".png", ".pdf", ".jpeg"],
    multiple: !(documentToUpload == "International Passport"),
    maxFileSize: 10,
  });
  const presets = {
    publicId: visa?.primaryTraveller.lastName + timestamp || "unknown",
    folder: `${visa?.primaryTraveller.lastName + timestamp || "unknown"}-files`,
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
                (el: any) => el.title == documentToUpload
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
            url: image,
          };
          // setUploadedDocuments(uploadedDocs);

          return { formikUploadedDocument, uploadedDoc };
        } else {
          let formikUploadedDocuments = uploadedDocuments;
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
            url: image,
          });
          setUploadedDocuments(uploadedDocs);
        }
      }
    });
  };
  const uploadFiles = async () => {
    if (filesContent.length > 0) {
      let formikUploadedDocuments: DocumentInterface[] = uploadedDocuments;
      let uploadedDocs: UploadedDoc[] = [...uploadedDocuments];
      for (const file of filesContent) {
        await uploadFileToCLoudinary({ file }).then((data) => {
          if (data) {
            formikUploadedDocuments = [
              ...formikUploadedDocuments,
              data.formikUploadedDocument!,
            ];
            uploadedDocs = [...uploadedDocs, data.uploadedDoc!];
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
    <ReusableModal
      open={open}
      onClose={handleClose}
      headerText="Upload Document"
      description=""
      //   description="Kindly Upload the required Document as it will help continue your application."
      maxHeight="70%"
      loading={uploadedState.loading}
      maxWidth={isMobile ? "90%" : "50%"}
      buttonProps={{
        text: uploadedState.uploaded
          ? "Close"
          : uploadedState.loading
          ? "Uploading..."
          : "Continue",
        onClick: uploadedState.uploaded ? handleClose : replyDocUploadRequest,
      }}
    >
      <Section margin="0 0 2rem">
        <Section margin="3rem 0px 1.5rem">
          <Flex align="center" gap="0rem" justify="center">
            <Text type="h1" text={docs[0]?.information?.join(", ")} />
          </Flex>
        </Section>
        <Section margin="0px">
          <Flex align="center" gap="0.25rem">
            <Text
              type="p"
              text="Select Document/Information"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
            />
          </Flex>
          <FieldString
            options={docs[0]?.information}
            name="document"
            value={documentToUpload}
            placeholder=""
            formik={Formik}
            onChange={(e) => setDocumentToUpload(e)} // Handle the change event
          />
        </Section>

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
          height={isMobile ? "fit-content" : "17rem"}
          handleDelete={async (i: number) => {
            try {
              await deleteImage({
                imageUrl: uploadedDocuments[i].url,
              });
              setUploadedDocuments([
                ...uploadedDocuments.filter(
                  (_: any, index: number) => index !== i
                ),
              ]);
            } catch (error) {
              throw error;
            }
          }}
        />
      </Section>
    </ReusableModal>
  );
};

export default VisaUploadDocModal;
