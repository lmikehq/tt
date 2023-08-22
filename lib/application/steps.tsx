import TripDetails from "@organism/form/components/details";
import PersonalInfo from "@organism/form/components/personalInfo";
import {
  educationKeys,
  employmentKeys,
  familyInforKeys,
  personalInfoKeys,
} from "./schema";
import OtherInformation from "@organism/form/components/otherInformation";
import Booking from "@organism/form/components/booking";
import {
  PaymentStatusFail,
  PaymentStatusSuccess,
} from "@organism/form/components/paymentStatus";

import EducationInfo from "@organism/form/components/educationInfo";
import EmploymentInfo from "@organism/form/components/employmentInfo";
import FamilyInfo from "@organism/form/components/familyInfo";
import UploadDocuments from "@organism/form/components/uploadDocuments";
import { SingleFormType } from "@organism/form/applicationForm";

interface IFormStep {
  id: number;
  title: string;
  content: React.ReactNode;
  valKeys?: any;
  formikConfig?: any;
}

export const getSteps = (
  formikConfig: any,
  setFormFee: (n: number) => void,
  setCurrentPhase: (n: number) => void,
  nextStep: ({ form }: { form: SingleFormType }) => void,
  isLoading: boolean
): IFormStep[] => {
  return [
    {
      id: 1,
      title: "Enter your Trip details",
      content: (
        <TripDetails
          steps={["Enter your Trip Details"]}
          index={0}
          setFee={setFormFee}
          nextStep={nextStep}
          isLoading={isLoading}
        />
      ),
    },
    {
      id: 2,
      title: "Personal Information",
      content: (
        <PersonalInfo
          steps={["Personal Information"]}
          index={1}
          nextStep={nextStep}
          isLoading={isLoading}
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
          nextStep={nextStep}
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
          formik={formikConfig}
          steps={["Employment Details"]}
          index={3}
          nextStep={nextStep}
          isLoading={isLoading}
        />
      ),
      valKeys: Object.keys(employmentKeys),
    },
    {
      id: 5,
      title: "Family Members' Information",
      content: (
        <FamilyInfo
          formik={formikConfig}
          steps={["Family Members' Information"]}
          index={4}
          nextStep={nextStep}
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
          formik={formikConfig}
          steps={["Upload All Required Documents"]}
          index={5}
        />
      ),
    },
    {
      id: 7,
      title: "Status",
      content: (
        <PaymentStatusFail
          steps={[
            "Your Trip Details",
            "Personal Information",
            "Education and Employment",
            "Other Information",
            "Booking",
            "booking",
            "booking",
          ]}
          setPhase={setCurrentPhase}
          index={6}
        />
      ),
    },
  ];
};
