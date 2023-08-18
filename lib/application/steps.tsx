import TripDetails from "@organism/form/components/details";
import PersonalInfo from "@organism/form/components/personalInfo";
import { edAndEmpKeys, familyInforKeys, otherInforKeys } from "./schema";
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
  // formikConfig?: any
}

export const getSteps = (
  formikConfig: any,
  setFormFee: (n: number) => void,
  setCurrentPhase: (n: number) => void
): IFormStep[] => {
  return [
    {
      id: 1,
      title: "Enter your Trp details",
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
      title: "Personal Information",
      content: (
        <PersonalInfo
          formik={formikConfig}
          steps={["Personal Information"]}
          index={1}
        />
      ),
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
      title: "Family Members' Information",
      content: (
        <FamilyInfo
          formik={formikConfig}
          steps={["Family Members' Information"]}
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
