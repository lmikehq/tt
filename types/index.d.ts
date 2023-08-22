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
  [key: string]: any;
}

interface Home {
  name: string;
}

interface Destination {
  name: string;
}

export interface DetailsKeys {
  home: Home;
  destination: Destination;
  applicationType: string;
  visaType: string;
  travellingBy: string;
  numberOfTravellers: number;
}
export interface EducationDetailsInterface {
  schoolName: string;
  degree: string;
  grade: string;
  courseOfStudy: string;
  startYear: string;
  endYear: string;
}
export interface EmploymentDetailsInterface {
  companyName: string;
  jobTitle: string;
  employmentType: string;
  locationType: string;
  companyLocation: string;
  startedYear: string;
  endedYear: string;
}
// export interface EdAndEmpKeys {
//   degree: string;
//   graudautionYear: string;
//   schoolName: string;
//   courseOfStudy: string;
//   grade: string;
//   companyName: string;
//   employerName: string;
//   employerPhone: string;
//   startedYear: string;
//   endedYear: string;
// }

export interface PersonalInfoInterface {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  placeOfOrigin: string;
  stateOfOrigin: string;
  lgOfOrigin: string;
  nativeLanguage: string;
  meansOfId: string;
  idNumber: string;
  issueDate: string;
  expiryDate: string;
  homeCountry: string;
  residentialAddress: string;
  dateOfBirth: string;
  maritalStatus: string;
  partnersName: string;
  passportNumber: string;
  issuingCountry: string;
  passportIssueDate: string;
  passportExpiryDate: string;
  purposeOfTrip: string;
}
export interface FamilyInfoInterface {
  passNumber: string;
  expiryYear: string;
  gender: string;
  membersDOB: string;
  passIssueCountry: string;
  membersName: string;
  membersRelationship: string;
  membersAddress: string;
  membersPhone: string;
  membersEmail: string;
  membersIssueDate: string;
  membersExpiryDate: string;
}
interface OtherInfoKeys {
  passNumber: string;
  passIssueCountry: string;
  gender: string;
  expiryYear: string;
  guarantorName: string;
  guarantorAddress: string;
  guarantorPhone: string;
  guarantorWorth: string;
  uploadedDocuments: string[]; // You can adjust the type as needed
}

export interface VisaApplicationFormInterface
  extends DetailsKeys,
    PersonalInfoKeys {
  firstAndMiddleName?: string;
  educations: EducationDetailsInterface[];
  employments: EmploymentDetailsInterface[];
  familyInfo: FamilyInfoInterface[];
}

declare module "@paystack/inline-js";
