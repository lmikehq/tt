import { safelyConvertToNumber } from "@lib/utilFns";
import { CountryType } from "@molecule/serviceTabs/components/visa";
import { ApplicationFormRequestInput } from "./request-models/application-form.type";
import { parse } from "date-fns";
import { mockCountry } from "./schema";

function formatISODate(x?: string | null) {
  if (x) {
    return parse(x, "dd/MM/yyyy", new Date()).toString();
  } else return "";
}
function formatCountry(country: CountryType) {
  return {
    name: country?.name ?? "",
    code: country?.code ?? "",
  };
}

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
  _id: number;
}

export interface DetailsKeys {
  homeCountry: CountryType;
  destination: CountryType;
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
  locationType?: string;
  companyLocation: string;
  startYear: number | null;
  endYear?: number | null;
  stillWorking: boolean;
}

export interface PersonalInfoInterface {
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  placeOfBirth: CountryType;
  phoneNumber: string;
  stateOfOrigin: string;
  placeOfOrigin: string;
  nativeLanguage: string;
  meansOfId: string;
  idNumber: string;
  issueDate: string;
  expiryDate?: string;

  address: string;
  countryOfCitizen: CountryType;
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  partnersName?: string;
  passportNumber: string;
  passportIssuedCountry: CountryType;
  passportIssuedDate?: string | null;
  passportExpiryDate?: string | null;
  tripPurpose: string;
  tuberculosis: boolean | null;
  tuberculosisDetails?: string;
  mentalDisorder: boolean | null;
  mentalDisorderDetails?: string;
  remainbeyondValidity: boolean | null;
  remainbeyondValidityDetails?: string;
  refusedBefore: boolean | null;
  refusedBeforeDetails?: string;
  arrestedBefore: boolean | null;
  arrestedBeforeDetails?: string;
  servedInMilitary: boolean | null;
  servedInMilitaryDetails?: string;
  memberOfViolentGroup: boolean | null;
  memberOfViolentGroupDetails?: string;
  participatedInViolentActivities: boolean | null;
  participatedInViolentActivitiesDetails?: string;

  //added-details
  countryOfApply: CountryType;
  countryOfResidence: CountryType;
  statusOfResidence: string;
  startDateOfResidence: string;
  livedAbroad: boolean | null;
  countriesLived?: number;
  changeOfName: boolean | null;
  changedName?: string;
  occupation?: string;
  tripDurationStartDate: string;
  tripDurationEndDate: string;
  tripDurationLocation: string;
  hasContactInLocation: boolean | null;
  contactInLocationLastName?: string;
  contactInLocationFirstName?: string;
  contactInLocationAddress?: string;
  contactInLocationRelationship?: string;
  contactInLocationPhoneNumber?: string;
  hasGreenCard: boolean | null;
  greenCardNumber?: string;
  greenCardExpiryDate?: string;
  prevResidence1?: CountryType;
  prevResidence2?: CountryType;
  prevResidence3?: CountryType;
  prevResidence4?: CountryType;
  prevResidence5?: CountryType;
  startDatePrevResidence1?: string;
  startDatePrevResidence2?: string;
  startDatePrevResidence3?: string;
  startDatePrevResidence4?: string;
  startDatePrevResidence5?: string;
  endDatePrevResidence1?: string;
  endDatePrevResidence2?: string;
  endDatePrevResidence3?: string;
  endDatePrevResidence4?: string;
  endDatePrevResidence5?: string;
  marriageStartDate?: string;
  marriageEndDate?: string;
}

export interface BackgroundInfoInterface {
  tuberculosis: boolean;
  tuberculosisDetails?: string;
  mentalDisorder: boolean;
  mentalDisorderDetails?: string;
  remainbeyondValidity: boolean;
  remainbeyondValidityDetails?: string;
  refusedBefore: boolean;
  refusedBeforeDetails?: string;
  arrestedBefore: boolean;
  arrestedBeforeDetails?: string;
  servedInMilitary: boolean;
  servedInMilitaryDetails?: string;
  memberOfViolentGroup: boolean;
  memberOfViolentGroupDetails?: string;
  participatedInViolentActivities: boolean;
  participatedInViolentActivitiesDetails?: string;
}

export interface FamilyInfoInterface {
  membersName?: string;
  relationshipToPrimary?: string;
  address?: string;
  membersPhoneNumber?: string;
  membersEmail?: string;
  membersOccupation?: string;
  accompanying: boolean;
  maritalStatus?: string;
  issueYear?: string;
  expiryYear?: string;
  issueCountry?: CountryType;
  passportNumber?: string;
  gender?: string;
  dateOfBirth?: string;
  section?: string;
  index?: number;
}
export interface GuarantorInfoInterface {
  guarantorName: string;
  relationshipToGuarantor: string;
  guarantorAddress: string;
  guarantorPhone: string;
  guarantorWorth: string;
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
  guarantorInfo: GuarantorInfoInterface;
}

export interface PrimaryTravellerInterface
  extends Omit<
    PersonalInfoInterface,
    "placeOfBirth" | "countryOfCitizen" | "passportIssuedCountry"
  > {
  placeOfBirth: string;
  countryOfCitizen: string;
  passportIssuedCountry: string;
  // homeCountry: {
  //     name: string;
  //     code: string;
  // };
  // destination: {
  //     name: string;
  //     code: string;
  // };
  // travellingBy?: string;
  // education: EducationDetailsInterface[];
  // employment: EmploymentDetailsInterface[];
}

export type VisaFormUnionType =
  | { tripDetails: DetailsKeys; }
  | { personalInfo: PersonalInfoInterface; }
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
  const sortedFamily = data.familyMembers
    .filter((e) => !!e?.membersName)
    .map((member) => {
      delete member.index;
      delete member.membersOccupation;
      delete member.issueCountry;
      delete member.maritalStatus;
      return {
        ...member,
        dateOfBirth: formatISODate(member?.dateOfBirth),
        issueYear: safelyConvertToNumber(member?.issueYear),
        expiryYear: safelyConvertToNumber(member?.expiryYear),
      };
    });

  const prevResidences = [
    data.personalInfo.prevResidence1?.name
      ? {
        country: formatCountry(data.personalInfo.prevResidence1),
        since: data.personalInfo?.startDatePrevResidence1 ?? "",
        till: data.personalInfo?.endDatePrevResidence1 ?? "",
      }
      : undefined,
    data.personalInfo.prevResidence2?.name
      ? {
        country: formatCountry(data.personalInfo.prevResidence2),
        since: data.personalInfo?.startDatePrevResidence2 ?? "",
        till: data.personalInfo?.endDatePrevResidence2 ?? "",
      }
      : undefined,
    data.personalInfo.prevResidence3?.name
      ? {
        country: formatCountry(data.personalInfo.prevResidence3),
        since: data.personalInfo?.startDatePrevResidence3 ?? "",
        till: data.personalInfo?.endDatePrevResidence3 ?? "",
      }
      : undefined,
    data.personalInfo.prevResidence4?.name
      ? {
        country: formatCountry(data.personalInfo.prevResidence4),
        since: data.personalInfo?.startDatePrevResidence4 ?? "",
        till: data.personalInfo?.endDatePrevResidence4 ?? "",
      }
      : undefined,
    data.personalInfo.prevResidence5?.name
      ? {
        country: formatCountry(data.personalInfo.prevResidence5),
        since: data.personalInfo?.startDatePrevResidence5 ?? "",
        till: data.personalInfo?.endDatePrevResidence5 ?? "",
      }
      : undefined,
  ].filter((e) => !!e);

  const applicationFormRequest: ApplicationFormRequestInput = {
    primaryTraveller: {
      personalDetails: {
        firstName: data.personalInfo.firstName,
        middleName: data.personalInfo.middleName ?? "",
        lastName: data.personalInfo.lastName,
        previousSurname: data.personalInfo.changedName ?? "",
        dateOfBirth: formatISODate(data.personalInfo.dateOfBirth),
        email: data.personalInfo.email,
        placeOfBirth: data.personalInfo.placeOfBirth?.name ?? "",
        stateOfOrigin: data.personalInfo.stateOfOrigin,
        lgaOfOrigin: data.personalInfo.placeOfOrigin,
        phoneNumber: data.personalInfo.phoneNumber,
        nativeLanguage: data.personalInfo.nativeLanguage,
        meansOfId: data.personalInfo.meansOfId,
        idNumber: data.personalInfo.idNumber,
        issueDate: data.personalInfo.issueDate,
        expiryDate: formatISODate(data.personalInfo.expiryDate),
        address: data.personalInfo.address,
        gender: data.personalInfo.gender,
      },
      citizenshipInformation: {
        countryOfCitizenship: formatCountry(
          data.personalInfo.countryOfCitizen
        ),
        countryOfResidence: formatCountry(
          data.personalInfo.countryOfResidence ?? mockCountry
        ),
        countryApplyingFrom: formatCountry(
          data.personalInfo.countryOfApply ?? mockCountry
        ),
        statusOfResidence: data.personalInfo.statusOfResidence ?? "",
        startDateOfResidence: formatISODate(
          data.personalInfo.startDateOfResidence
        ),
        placeOfOrigin: data.personalInfo.placeOfOrigin,
        previousCountryOfResidences: prevResidences.map((e) => e!),
        ...(String(data.personalInfo.hasGreenCard) == "true" && {
          greenCardDetails: {
            number: data.personalInfo?.greenCardNumber ?? "",
            expiryDate: formatISODate(
              data.personalInfo.greenCardExpiryDate
            ),
          },
        }),
      },
      passportInformation: {
        number: data.personalInfo.passportNumber,
        issuedCountry: formatCountry(
          data.personalInfo.passportIssuedCountry
        ),
        issuedDate: formatISODate(data.personalInfo.passportIssuedDate),
        expiryDate: formatISODate(data.personalInfo.passportExpiryDate),
      },
      marriageInformation: {
        maritalStatus: data.personalInfo.maritalStatus,
        ...(["Married", "Divorced"].includes(
          data.personalInfo.maritalStatus
        ) && {
          partnersName: data.personalInfo?.partnersName ?? "",
          marriageStartDate: formatISODate(
            data.personalInfo.marriageStartDate
          ),
        }),
      },
      backgroundInformation: {
        tuberculosis: data.personalInfo.tuberculosis ?? false,
        tuberculosisDetails:
          data.personalInfo.tuberculosisDetails ?? "",
        mentalDisorder: data.personalInfo.mentalDisorder ?? false,
        mentalDisorderDetails:
          data.personalInfo.mentalDisorderDetails ?? "",
        remainbeyondValidity:
          data.personalInfo.remainbeyondValidity ?? false,
        remainbeyondValidityDetails:
          data.personalInfo.remainbeyondValidityDetails ?? "",
        refusedBefore: data.personalInfo.refusedBefore ?? false,
        refusedBeforeDetails:
          data.personalInfo.refusedBeforeDetails ?? "",
        arrestedBefore: data.personalInfo.arrestedBefore ?? false,
        arrestedBeforeDetails:
          data.personalInfo.arrestedBeforeDetails ?? "",
        servedInMilitary: data.personalInfo.servedInMilitary ?? false,
        servedInMilitaryDetails:
          data.personalInfo.servedInMilitaryDetails ?? "",
        memberOfViolentGroup:
          data.personalInfo.memberOfViolentGroup ?? false,
        memberOfViolentGroupDetails:
          data.personalInfo.memberOfViolentGroupDetails ?? "",
        participatedInViolentActivities:
          data.personalInfo.participatedInViolentActivities ?? false,
        participatedInViolentActivitiesDetails:
          data.personalInfo.participatedInViolentActivitiesDetails ??
          "",
      },
      employment: data.employment,
      education: data.education,
    },
    familyInformation: {
      parentDetails: sortedFamily
        .filter((e) => e.section === "A")
        .map((member) => {
          delete member.section;
          return {
            membersName: member.membersName,
            relationshipToPrimary: member.relationshipToPrimary,
            address: member.address,
            membersEmail: member.membersEmail,
            membersPhoneNumber: member.membersPhoneNumber,
            accompanying: member.accompanying,
            ...(String(member.accompanying) === "true" && {
              dateOfBirth: member.dateOfBirth,
              gender: member.gender,
              passportNumber: member.passportNumber,
              expiryYear: member.expiryYear,
              issueYear: member.issueYear,
            }),
          };
        }),

      siblingDetails: sortedFamily
        .filter((e) => e.section === "B")
        .map((member) => {
          delete member.section;
          return {
            membersName: member.membersName,
            relationshipToPrimary: member.relationshipToPrimary,
            address: member.address,
            membersEmail: member.membersEmail,
            membersPhoneNumber: member.membersPhoneNumber,
            accompanying: member.accompanying,
            ...(String(member.accompanying) === "true" && {
              dateOfBirth: member.dateOfBirth,
              gender: member.gender,
              passportNumber: member.passportNumber,
              expiryYear: member.expiryYear,
              issueYear: member.issueYear,
            }),
          };
        }),
      immediateFamilyInfo: sortedFamily
        .filter((e) => e.section === "C")
        .map((member) => {
          delete member.section;
          return {
            dateOfBirth: member?.dateOfBirth,
            membersName: member.membersName,
            relationshipToPrimary: member.relationshipToPrimary,
            address: member.address,
            membersEmail: member.membersEmail,
            membersPhoneNumber: member.membersPhoneNumber,
            accompanying: member.accompanying,
            ...(String(member.accompanying) === "true" && {
              gender: member.gender,
              passportNumber: member.passportNumber,
              expiryYear: member.expiryYear,
              issueYear: member.issueYear,
            }),
          };
        }),
    },
    guarantorInformation: {
      guarantorName: data.guarantorInfo.guarantorName,
      relationshipToGuarantor: data.guarantorInfo.relationshipToGuarantor,
      guarantorAddress: data.guarantorInfo.guarantorAddress,
      guarantorPhone: data.guarantorInfo.guarantorPhone,
      guarantorWorth: data.guarantorInfo.guarantorWorth,
    },
    tripInformation: {
      tripDurationStartDate: formatISODate(
        data.personalInfo.tripDurationStartDate
      ),
      tripDurationEndDate: formatISODate(
        data.personalInfo.tripDurationEndDate
      ),
      tripLocation: data.personalInfo.tripDurationLocation,
      ...(String(data.personalInfo.hasContactInLocation) == "true" && {
        contactInLocationLastName:
          data.personalInfo?.contactInLocationLastName ?? "",
        contactInLocationFirstName:
          data.personalInfo?.contactInLocationFirstName ?? "",
        contactInLocationAddress:
          data.personalInfo?.contactInLocationAddress ?? "",
        contactInLocationRelationship:
          data.personalInfo?.contactInLocationRelationship ?? "",
        contactInLocationPhoneNumber:
          data.personalInfo?.contactInLocationPhoneNumber ?? "",
      }),
    },
    documents: data.documents,
    applicationType: data.tripDetails.applicationType,
    visaType: data.tripDetails.visaType,
    statementOfPurpose: data.personalInfo.tripPurpose,
    travellingBy: "Airplane",
    homeCountry: formatCountry(data.tripDetails.homeCountry),
    destination: formatCountry(data.tripDetails.destination),
  };
  if (user?._id)
    return {
      ...applicationFormRequest,
      user: `${user?._id}` ?? "",
    };
  return applicationFormRequest;
};

// declare module "@paystack/inline-js";

export enum ChatUserIdentityType {
  userId = "userId",
  ipAddress = "ipAddress",
  anonymous = "anonymous",
}

export interface ChatUserIdentity {
  id: string; // userId or IpAddress
  type: ChatUserIdentityType;
}

export interface IAccompany {
  memberName: string,
  relationship: string,
  memberAddress: string,
  memberOccupation: string;
  memberEmail: string,
  phoneNumber: string,
  memberWorth: string,
  gender: string,
  dateOfBirth: string,
  passportNumber: string,
  passportIssuedCountry: string,
  issueDate: string,
  expiryDate: string;
}

export interface IUpdatePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}