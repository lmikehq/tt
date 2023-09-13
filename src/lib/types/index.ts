import { ApplicationFormRequestInput } from "./request-models/application-form.type";
import { document } from "./schema";
import { safelyConvertToNumber } from "@lib/utilFns";
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
  startYear: number | null;
  endYear?: number | null;
  stillAtSchool: boolean;
}

export interface EmploymentDetailsInterface {
  companyName: string;
  jobTitle: string;
  employmentType: string;
  // locationType: string;
  companyLocation: string;
  startYear: number;
  endYear?: number;
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
  issueYear?: string | number;
  passportNumber?: string;
  expiryYear?: string | number;
  gender?: string;
  dateOfBirth?: string;
}

export interface DocumentInterface {
  name: string;
  url: string;
}
export interface ManyEducationDetailsInterface {
  education: EducationDetailsInterface[];
}
export interface ManyEmploymentDetailsInterface {
  employment: EmploymentDetailsInterface[];
}
export interface ManyFamilyInfoInterface {
  familyMembers: FamilyInfoInterface[];
}

export interface ManyDocumentInterface {
  documents: DocumentInterface[];
}

export interface VisaApplicationFormInterface
  extends ManyEducationDetailsInterface,
    ManyEmploymentDetailsInterface,
    ManyFamilyInfoInterface,
    ManyDocumentInterface {
  personalInfo: PersonalInfoInterface;
  tripDetails: DetailsKeys;
}

export interface PrimaryTravellerInterface
  extends PersonalInfoInterface,
    Omit<DetailsKeys, "applicationType" | "visaType"> {
  education: EducationDetailsInterface[];
  employment: EmploymentDetailsInterface[];
}

export type VisaFormUnionType =
  | { tripDetails: DetailsKeys }
  | { personalInfo: PersonalInfoInterface }
  | ManyEducationDetailsInterface
  | ManyEmploymentDetailsInterface
  | ManyFamilyInfoInterface
  | ManyDocumentInterface;

export enum Mode {
  init,
  loading,
  loaded,
  error,
}

export const mapVisaApplicationFormInterfaceToApplicationFormRequestInput = ({
  data,
  user,
}: {
  data: VisaApplicationFormInterface;
  user?: User;
}) => {
  const applicationFormRequest: ApplicationFormRequestInput = {
    applicationType: data.tripDetails.applicationType,
    visaType: data.tripDetails.visaType,
    primaryTraveller: {
      firstName: data.personalInfo.firstName,
      lastName: data.personalInfo.lastName,
      travellingBy: "Airplane",
      middleName: data.personalInfo.middleName,
      email: data.personalInfo.email,
      homeCountry: data.tripDetails.homeCountry,
      destination: data.tripDetails.destination,
      placeOfBirth: data.personalInfo.placeOfBirth,
      phoneNumber: data.personalInfo.phoneNumber,
      stateOfOrigin: data.personalInfo.stateOfOrigin,
      lgaOfOrigin: data.personalInfo.lgaOfOrigin,
      nativeLanguage: data.personalInfo.nativeLanguage,
      meansOfId: data.personalInfo.meansOfId,
      idNumber: data.personalInfo.idNumber,
      issueDate: data.personalInfo.issueDate,
      expiryDate: data.personalInfo.expiryDate,
      address: data.personalInfo.address,
      countryOfCitizen: data.personalInfo.countryOfCitizen,
      dateOfBirth: data.personalInfo.dateOfBirth,
      gender: data.personalInfo.gender,
      maritalStatus: data.personalInfo.maritalStatus,
      partnersName: data.personalInfo.partnersName,
      passportNumber: data.personalInfo.passportNumber,
      passportIssuedCountry: data.personalInfo.passportIssuedCountry,
      passportExpiryYear: data.personalInfo.passportExpiryYear,
      tripPurpose: data.personalInfo.tripPurpose,
      tuberculosis: data.personalInfo.tuberculosis,
      mentalDisorder: data.personalInfo.mentalDisorder,
      mentalDisorderDetails: data.personalInfo.mentalDisorderDetails,
      remainbeyondValidity: data.personalInfo.remainbeyondValidity,
      refusedBefore: data.personalInfo.refusedBefore,
      refusedBeforeDetails: data.personalInfo.refusedBeforeDetails,
      arrestedBefore: data.personalInfo.arrestedBefore,
      arrestedBeforeDetails: data.personalInfo.arrestedBeforeDetails,
      servedInMilitary: data.personalInfo.servedInMilitary,
      servedInMilitaryDetails: data.personalInfo.servedInMilitaryDetails,
      memberOfViolentGroup: data.personalInfo.memberOfViolentGroup,
      participatedInViolentActivities:
        data.personalInfo.participatedInViolentActivities,
      education: data.education,
      employment: data.employment,
    },
    familyMembers: data.familyMembers.map((member) => ({
      ...member,
      issueYear: safelyConvertToNumber(member?.issueYear),
      expiryYear: safelyConvertToNumber(member?.expiryYear),
    })),
    documents: data.documents,
  };
  if (user?.id)
    return {
      ...applicationFormRequest,
      user: `${user?.id}` ?? "",
    };
  return applicationFormRequest;
};

// declare module "@paystack/inline-js";
