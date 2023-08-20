import TripDetails from "@organism/form/components/details";
import PersonalInfo from "@organism/form/components/personalInfo";
import { edAndEmpKeys, familyInforKeys, otherInforKeys, personalInfoKeys } from "./schema";
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

interface IFormStep {
  id: number;
  title: string;
  content: React.ReactNode;
  valKeys?: any;
  formikConfig?: any
}

export const getSteps = (
  formikConfig: any,
  setFormFee: (n: number) => void,
  setCurrentPhase: (n: number) => void
): IFormStep[] => {
  return [
    {
      id: 1,
      title: "Enter your Trip details",
      content: (
        <TripDetails
          steps={["Enter your Trip Details"]}
          formik={formikConfig}
          index={0}
          setFee={setFormFee}
        />
      ),
    },
    {
      id: 2,
      title: "Personal Details",
      content: (
        <PersonalInfo
          formik={formikConfig}
          steps={["Personal Details"]}
          index={1}
        />
      ),
      // valKeys: Object.keys(personalInfoKeys)
    },
    {
      id: 3,
      title: "Education Details",
      content: (
        <EducationInfo
          formik={formikConfig}
          steps={["Education Details"]}
          index={2}
        />
      ),
      valKeys: Object.keys(edAndEmpKeys),
    },
    {
      id: 4,
      title: "Employment Details",
      content: (
        <EmploymentInfo
          formik={formikConfig}
          steps={["Employment Details"]}
          index={3}
        />
      ),
      valKeys: Object.keys(edAndEmpKeys),
    },
    {
      id: 5,
      title: "Family Members' Details",
      content: (
        <FamilyInfo
          formik={formikConfig}
          steps={["Family Members' Details"]}
          index={4}
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
            "Personal details",
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
