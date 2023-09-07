import TripDetails from "@organism/form/components/details";
import PersonalInfo from "@organism/form/components/personalInfo";
import {
  educationKeys,
  employmentKeys,
  familyInforKeys,
  personalInfoKeys,
} from "./schema";

import EducationInfo from "@organism/form/components/educationInfo";
import EmploymentInfo from "@organism/form/components/employmentInfo";
import FamilyInfo from "@organism/form/components/familyInfo";
import { SingleFormType, UploadedDoc } from "@organism/form/applicationForm";
import SelectVisaPayment from "@organism/form/components/selectVisaPayment";
import SelectPaymentMethod from "@organism/form/components/selectPaymentMethod";
import UploadDocuments from "@organism/form/components/uploadDocuments";
import { FormikProps, FormikValues } from "formik";
import {
  DetailsKeys,
  DocumentInterface,
  EducationDetailsInterface,
  EmploymentDetailsInterface,
  FamilyInfoInterface,
  PersonalInfoInterface,
} from "types";

interface IFormStep {
  id: number;
  title: string;
  content: React.ReactNode;
  valKeys?: any;
}

export const getSteps = ({
  isLoading,
  detailsFormik,
  personalInfoFormik,
  educationFormik,
  employmentFormik,
  familyMembersFormik,
  documentsFormik,
  paymentFormik,
  handleSetUploadedDocuments,
  uploadedDocuments,
  visaType,
  lastName,
  saveProgressAndContinueLater,
  finalStepButtonText,
}: {
  setFormFee: (n: number) => void;
  setCurrentPhase: (n: number) => void;
  isLoading: boolean;
  personalInfoFormik: FormikProps<PersonalInfoInterface>;
  detailsFormik: FormikProps<DetailsKeys>;
  familyMembersFormik: FormikProps<{ familyMembers: FamilyInfoInterface[] }>;
  employmentFormik: FormikProps<{ employment: EmploymentDetailsInterface[] }>;
  educationFormik: FormikProps<{ education: EducationDetailsInterface[] }>;
  documentsFormik: FormikProps<{ documents: DocumentInterface[] }>;
  paymentFormik: FormikValues;
  handleSetUploadedDocuments: (docs: UploadedDoc[]) => void;
  uploadedDocuments: UploadedDoc[];
  visaType: string;
  lastName: string;
  saveProgressAndContinueLater: () => void;
  finalStepButtonText: string;
}): IFormStep[] => {
  return [
    {
      id: 1,
      title: "Enter your Trip details",
      content: (
        <TripDetails
          steps={["Enter your Trip Details"]}
          index={0}
          isLoading={isLoading}
          formik={detailsFormik}
          saveProgressAndContinueLater={saveProgressAndContinueLater}
        />
      ),
    },
    {
      id: 2,
      title: "Personal Details",
      content: (
        <PersonalInfo
          steps={["Personal Information"]}
          index={1}
          isLoading={isLoading}
          formik={personalInfoFormik}
          saveProgressAndContinueLater={saveProgressAndContinueLater}
        />
      ),
      valKeys: Object.keys(personalInfoKeys),
    },
    {
      id: 3,
      title: "Education Details",
      content: (
        <EducationInfo
          steps={["Education Details"]}
          index={2}
          formik={educationFormik}
          isLoading={isLoading}
          saveProgressAndContinueLater={saveProgressAndContinueLater}
        />
      ),
      valKeys: Object.keys(educationKeys),
    },
    {
      id: 4,
      title: "Employment Details",
      content: (
        <EmploymentInfo
          steps={["Employment Details"]}
          index={3}
          formik={employmentFormik}
          isLoading={isLoading}
          saveProgressAndContinueLater={saveProgressAndContinueLater}
        />
      ),
      valKeys: Object.keys(employmentKeys),
    },
    {
      id: 5,
      title: "Family Members' Details",
      content: (
        <FamilyInfo
          steps={["Family Members' Information"]}
          index={4}
          formik={familyMembersFormik}
          isLoading={isLoading}
          saveProgressAndContinueLater={saveProgressAndContinueLater}
        />
      ),
      valKeys: Object.keys(familyInforKeys),
    },
    {
      id: 6,
      title: "Upload Document",
      content: (
        <UploadDocuments
          steps={["Upload all your available documents"]}
          index={5}
          formik={documentsFormik}
          isLoading={isLoading}
          uploadedDocuments={uploadedDocuments}
          handleSetUploadedDocuments={handleSetUploadedDocuments}
          visaType={visaType}
          lastName={lastName}
          saveProgressAndContinueLater={saveProgressAndContinueLater}
          finalStepButtonText={finalStepButtonText}
        />
      ),
    },

    {
      id: 7,
      title: "Select Payment Method",
      content: (
        <SelectPaymentMethod isLoading={isLoading} formik={paymentFormik} />
      ),
    },
  ];
};
