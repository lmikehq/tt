import { document } from "./../lib/application/schema";
export type ISiteConfig = {
  name: string;
  description: string;
  url: string[];
  ogImage: string;
  keywords: string[];

  links: {
    github: string;
    twitter: string;
    linkedin: string;
    email: string;
    instagram: string;
  };
};

export type Qparams = {
  params: {
    search?: string;
    countryName?: string;
    key?: string | number;
    other?: string;
  };
};

export interface IFee {
  name: string;
  amount: number | string;
  type?: string;
}

export interface User {
  id: number;
}

export interface DetailsKeys {
  homeCountry: string;
  destination: string;
  applicationType: string;
  visaType: string;
  travellingBy?: string;
  // numberOfTravellers: number;
}

export interface EducationDetailsInterface {
  school: string;
  degree: string;
  cgpa: number | null;
  location: string;
  fieldOfStudy: string;
  startYear: string;
  endYear?: string;
  stillAtSchool: boolean;
}

export interface EmploymentDetailsInterface {
  companyName: string;
  jobTitle: string;
  employmentType: string;
  // locationType: string;
  companyLocation: string;
  startYear: string;
  endYear?: string;
  stillWorking: boolean;
}

export interface PersonalInfoInterface {
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  placeOfBirth: string;
  phoneNumber: string;
  stateOfOrigin: string;
  lgaOfOrigin: string;
  nativeLanguage: string;
  meansOfId: string;
  idNumber: string;
  issueDate: string;
  expiryDate: string;
  address: string;
  countryOfCitizen: string;
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  partnersName?: string;
  passportNumber: string;
  passportIssuedCountry: string;
  passportExpiryYear: number;
  tripPurpose: string;
  tuberculosis: boolean | null;
  mentalDisorder: boolean | null;
  mentalDisorderDetails?: string;
  remainbeyondValidity: boolean | null;
  refusedBefore: boolean | null;
  refusedBeforeDetails?: string;
  arrestedBefore: boolean | null;
  arrestedBeforeDetails?: string;
  servedInMilitary: boolean | null;
  servedInMilitaryDetails?: string;
  memberOfViolentGroup: boolean | null;
  participatedInViolentActivities: boolean | null;
}

export interface FamilyInfoInterface {
  membersName: string;
  relationshipToPrimary: string;
  address: string;
  membersPhoneNumber: string;
  membersEmail: string;
  accompanying: boolean;
  issueYear?: string;
  passportNumber?: string;
  expiryYear?: string;
  gender?: string;
  dateOfBirth?: string;
}

interface DocumentInterface {
  name: string;
  url: string;
}
export interface VisaApplicationFormInterface
  extends DetailsKeys,
    PersonalInfoInterface {
  education: EducationDetailsInterface[];
  employment: EmploymentDetailsInterface[];
  familyMembers: FamilyInfoInterface[];
  documents: DocumentInterface[];
}

export interface PrimaryTravellerInterface
  extends PersonalInfoInterface,
    Omit<DetailsKeys, "applicationType" | "visaType"> {
  education: EducationDetailsInterface[];
  employment: EmploymentDetailsInterface[];
}

export interface ApplicationFormRequestInput
  extends Pick<DetailsKeys, "applicationType" | "visaType"> {
  primaryTraveller: PrimaryTravellerInterface;
  familyMembers: FamilyInfoInterface[];
  documents: DocumentInterface[];
  user?: string;
}
declare module "@paystack/inline-js";
