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
import SelectPaymentMethod from "@organism/form/components/selectPaymentMethod";
import UploadDocuments from "@organism/form/components/uploadDocuments";
import { FormikProps, FormikValues } from "formik";
import {
  DetailsKeys,
  DocumentInterface,
  EducationDetailsInterface,
  EmploymentDetailsInterface,
  FamilyInfoInterface,
  PersonalInfoInterface
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
        />
      ),
      valKeys: Object.keys(familyInforKeys),
    },
    {
      id: 6,
      title: "Upload Document",
      content: (
        <UploadDocuments
          steps={["Upload All Required Documents"]}
          index={5}
          formik={documentsFormik}
          isLoading={isLoading}
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
