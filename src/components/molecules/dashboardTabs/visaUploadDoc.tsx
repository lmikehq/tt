import Text from "@atom/text";
import Flex from "@components/templates/flex";
import currencyFormatter from "@lib/extensions/data/currencyFormatter";
import apiService from "@lib/extensions/hook/apiService";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import { useUserStore } from "@lib/store/useStore";
import { useVoucherStore } from "@lib/store/voucher.store";
import { FieldString } from "@organism/fieldInput";
import { Formik } from "formik";
import { toast } from "react-hot-toast";
import { BsExclamationCircleFill } from "react-icons/bs";
import Section from "src/components/molecules/section";
import ReusableModal from "./components/dashboardModal";
import { useState } from "react";
import DocumentUploadWidget from "@organism/DocumentUploadWidget";
import useCloudinaryUpload from "@lib/extensions/hook/useCloudinary";
import { useFilePicker } from "use-file-picker";

type VisaUploadDocModalProps = {
  open: boolean;
  onClose: () => void;
  visa: any;
};

const VisaUploadDocModal: React.FC<VisaUploadDocModalProps> = ({
  open,
  onClose,
  visa,
}) => {
  const { isMobile } = useScreenResolution();
  const infoRequests = visa?.infoRequests
    ? visa?.infoRequests.filter((req: any) => req?.isAnswered === false)
    : [];
  const docs = infoRequests.map((req: any) => ({
    information: req?.information,
    id: req?._id,
  }));
  const [selectedDoc, setSelectedDoc] = useState(docs[0]?.information[0]);
  const { user } = useUserStore((state) => state);
  const timestamp = new Date().getTime();
  const [uploadedDocuments, setUploadedDocuments] = useState<any>([]);
  const [documentToUpload, setDocumentToUpload] = useState<string>("");

  const uploadDoc = async () => {
    // return await apiService("/payment/create-form-fee-charge", "POST", {
    //   currency: "NGN",
    //   gateway: "Kora",
    //   service: "VISA",
    //   user: user?._id,
    //   serviceID: visaDetails.id,
    //   paymentIntent: visaDetails.intent,
    // }).then((response) => {
    //   if (response.statusCode == 200 || response.statusCode == 201) {
    //     window.open(response.data.data.checkout_url, "_self");
    //     return response.data;
    //   } else {
    //     toast.error(response.errorMessage);
    //     throw response;
    //   }
    // });
  };
    const [openFilePicker, { filesContent, plainFiles }] = useFilePicker({
      readAs: "DataURL",
      accept: [".png", ".pdf", ".jpeg"],
      multiple: !(documentToUpload == "International passport"),
      maxFileSize: 10,
    });
  const presets = {
    publicId: visa?.primaryTraveller.lastName + timestamp || "unknown",
    folder: `${visa?.primaryTraveller.lastName + timestamp || "unknown"}-files`,
  };
  const { uploadImage, loading, progress, deleteImage, deleting } =
    useCloudinaryUpload({ presets });
  return (
    <ReusableModal
      open={open}
      onClose={onClose}
      headerText="Upload Document"
      description=""
    //   description="Kindly Upload the required Document as it will help continue your application."
      maxHeight="70%"
      buttonProps={{
        text: "Continue",
        onClick: uploadDoc,
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
            value={selectedDoc}
            placeholder=""
            formik={Formik}
            onChange={(e) => setSelectedDoc(e)} // Handle the change event
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
          height="17rem"
          handleDelete={async (e: number) => console.log("e: ", e)}
          // handleDelete={async (i: number) => {
          //   try {
          //     await deleteImage({
          //       imageUrl: formik.values.documents[i].url,
          //     });
          //     setUploadedDocuments([
          //       ...uploadedDocuments.filter(
          //         (_: any, index: number) => index !== i
          //       ),
          //     ]);
          //     formik.setFieldValue(
          //       "documents",
          //       formik.values.documents.filter(
          //         (_: any, index: number) => index !== i
          //       )
          //     );
          //   } catch (error) {
          //     throw error;
          //   }
          // }}
        />
      </Section>
    </ReusableModal>
  );
};

export default VisaUploadDocModal;
