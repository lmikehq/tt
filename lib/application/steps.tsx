import TripDetails from "@organism/form/details";
import {
  detailsKeys,
  edAndEmpKeys,
  otherInforKeys,
  pesonalInfoKeys,
} from "./schema";

interface IFormStep {
  id: number;
  title: string;
  content: React.ReactNode;
  valKeys: any;
}

export const getSteps = (): IFormStep[] => {
  return [
    {
      id: 1,
      title: "Your trip details",
      content: <TripDetails title="Your trip details" />,
      valKeys: Object.keys(detailsKeys),
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
