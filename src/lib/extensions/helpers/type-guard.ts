import { VisaApplication } from "@/lib/types/visa";

export function isVisaApplication(obj: any): obj is VisaApplication {
  return (
    'personalDetails' in obj?.primaryTraveller ||
    'familyInformation' in obj ||
    'guarantorInformation' in obj
  );
}