import TripDetails from "@organism/form/components/details";
import PersonalInfo from "@organism/form/components/personalInfo";
import { edAndEmpKeys, otherInforKeys } from "./schema";
import EducationAndEmploymentInfo from "@organism/form/components/edAndEmployment";

interface IFormStep {
  id: number;
  title: string;
  content: React.ReactNode;
  valKeys?: any;
  // formikConfig?: any
}

export const getSteps = (formikConfig: any): IFormStep[] => {
  return [
    {
      id: 1,
      title: "Your trip details",
      content: (
        <TripDetails
          steps={["Your trip details"]}
          formik={formikConfig}
          index={0}
        />
      ),
    },
    {
      id: 2,
      title: "Personal information",
      content: (
        <PersonalInfo
          formik={formikConfig}
          steps={["Your trip details", "Personal information"]}
          index={1}
        />
      ),
    },
    {
      id: 3,
      title: "Education and employment",
      content: (
        <EducationAndEmploymentInfo
          formik={formikConfig}
          steps={[
            "Your trip details",
            "Personal information",
            "Education and employment",
          ]}
          index={2}
        />
      ),
      valKeys: Object.keys(edAndEmpKeys),
    },
    {
      id: 4,
      title: "Other information",
      content: <p>other informations</p>,
      valKeys: Object.keys(otherInforKeys),
    },
  ];
};
