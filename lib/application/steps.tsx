import TripDetails from "@organism/form/components/details";
import PersonalInfo from "@organism/form/components/personalInfo";
import { edAndEmpKeys, otherInforKeys } from "./schema";
import EducationAndEmploymentInfo from "@organism/form/components/edAndEmployment";
import OtherInformation from "@organism/form/components/otherInformation";
import Booking from "@organism/form/components/booking";
import {
  PaymentStatusFail,
  PaymentStatusSuccess,
} from "@organism/form/components/paymentStatus";

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
        <EducationAndEmploymentInfo
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
        <OtherInformation
          formik={formikConfig}
          steps={["Employment Details"]}
          index={3}
        />
      ),
      valKeys: Object.keys(otherInforKeys),
    },
    {
      id: 5,
      title: "Booking",
      content: (
        <Booking
          steps={["Family Members' Information"]}
          index={4}
        />
      ),
      valKeys: Object.keys(otherInforKeys),
    },
    {
      id: 6,
      title: "Upload Document",
      content: (
        <PaymentStatusSuccess
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
