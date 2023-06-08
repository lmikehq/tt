import TripDetails from "@organism/form/details";
import { FormikConfig } from "formik";
import {
  edAndEmpKeys,
  otherInforKeys,
  pesonalInfoKeys,
  visaInitVals,
} from "./schema";

interface IFormStep {
  id: number;
  title: string;
  content: React.ReactNode;
  valKeys?: any;
  // formikConfig?: any
}

export const getSteps = (
  formikConfig: any
): IFormStep[] => {
  return [
    {
      id: 1,
      title: "Your trip details",
      content: <TripDetails title="Your trip details" formik={formikConfig} />,
    },
    {
      id: 2,
      title: "Personal information",
      content: <p>personal information</p>,
      valKeys: Object.keys(pesonalInfoKeys),
    },
    {
      id: 3,
      title: "Education and employment",
      content: <p>education and employ</p>,
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
