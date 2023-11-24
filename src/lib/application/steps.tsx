import TripDetails from "@organism/form/components/details";
import PersonalInfo from "@organism/form/components/personalInfo";
import {
  educationKeys,
  employmentKeys,
  familyInforKeys,
  personalInfoKeys,
} from "../types/schema";

import { UploadedDoc } from "@organism/form/applicationForm";
import EducationInfo from "@organism/form/components/educationInfo";
import EmploymentInfo from "@organism/form/components/employmentInfo";
import FamilyInfo from "@organism/form/components/familyInfo";
import SelectPaymentMethod from "@organism/form/components/selectPaymentMethod";
import UploadDocuments from "@organism/form/components/uploadDocuments";
import { FormikProps } from "formik";
import {
  DetailsKeys,
  DocumentInterface,
  EducationDetailsInterface,
  EmploymentDetailsInterface,
  FamilyInfoInterface,
  PersonalInfoInterface,
} from "@lib/types";

interface IFormStep {
    id: number;
    title: string;
    content: React.ReactNode;
    valKeys?: any;
}

export const getSteps = ({
    detailsFormik,
    personalInfoFormik,
    educationFormik,
    employmentFormik,
    familyMembersFormik,
    documentsFormik,
    persistForm,
}: {
    detailsFormik: FormikProps<DetailsKeys>;
    personalInfoFormik: FormikProps<PersonalInfoInterface>;
    familyMembersFormik: FormikProps<{ familyMembers: FamilyInfoInterface[] }>;
    employmentFormik: FormikProps<{ employment: EmploymentDetailsInterface[] }>;
    educationFormik: FormikProps<{ education: EducationDetailsInterface[] }>;
    documentsFormik: FormikProps<{ documents: DocumentInterface[] }>;
    persistForm: () => void;
}): IFormStep[] => {
  return [
    {
      id: 1,
      title: "Enter your Trip details",
      content: (
        <TripDetails
          steps={["Enter your Trip Details"]}
          index={0}
          persistForm={persistForm}
          formik={detailsFormik}
        />
      ),
    },
    {
        id: 2,
        title: "Personal Details",
        content: (
            <PersonalInfo
                steps={["Personal Details", "Please ensure the Information you are providing is as shown on your passport or Travel Document"]}
                index={1}
                persistForm={persistForm}
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
            persistForm={persistForm}
            formik={educationFormik}
        />
      ),
      valKeys: Object.keys(educationKeys),
    },
    {
      id: 4,
      title: "Employment Details",
      content: (
        <EmploymentInfo
            steps={["Employment Details", "Give details of your employment for the past 10 years, including if you held any government positions (Such as civil servant, judge, police officer, mayor,member of parliament, hospital administrator, employee of a security organization). Do not leave gaps. If retired, not working or studying, please indicate. If you are retired, please provide the 10 years before your retirement."]}
            index={3}
            persistForm={persistForm}
            formik={employmentFormik}
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
          persistForm={persistForm}
          formik={familyMembersFormik}
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
          persistForm={persistForm}
          formik={documentsFormik}
        />
      ),
    },
    {
      id: 7,
      title: "Select Payment Method",
      content: <SelectPaymentMethod />,
    },
  ];
};
