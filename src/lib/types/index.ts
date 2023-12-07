import { safelyConvertToNumber } from "@lib/utilFns";
import { CountryType } from "@molecule/serviceTabs/components/visa";
import { ApplicationFormRequestInput } from "./request-models/application-form.type";
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
    countryOfApply?: CountryType,
    countryOfResidence?: CountryType,
    statusOfResidence?: string;
    startDateOfResidence?: string;
    changeOfName?: boolean | null;
    changedName?: string;
    occupation?: string;
    tripDurationStartDate?: string;
    tripDurationEndDate?: string;
    tripDurationLocation?: string;
    hasContactInLocation?: boolean | null;
    contactInLocationLastName?: string;
    contactInLocationFirstName?: string;
    contactInLocationAddress?: string;
    contactInLocationRelationship?: string;
    contactInLocationPhoneNumber?: string;
    hasGreenCard?: boolean | null;
    greenCardNumber?: string;
    greenCardExpiryDate?: string;
    prevResidence1?: CountryType;
    prevResidence2?: CountryType;
    prevResidence3?: CountryType;
    startDatePrevResidence1?: string;
    startDatePrevResidence2?: string;
    startDatePrevResidence3?: string;
    endDatePrevResidence1?: string;
    endDatePrevResidence2?: string;
    endDatePrevResidence3?: string;
    marriageStartDate?: string;
    marriageEndDate?: string;
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
    extends Omit<
        PersonalInfoInterface,
        "placeOfBirth" | "countryOfCitizen" | "passportIssuedCountry"
    > {
    homeCountry: {
        name: string;
        code: string;
    };
    destination: {
        name: string;
        code: string;
    };
    placeOfBirth: string;
    countryOfCitizen: string;
    passportIssuedCountry: string;
    travellingBy?: string;
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
    console.log("user: ", user);
    const applicationFormRequest: ApplicationFormRequestInput = {
        applicationType: data.tripDetails.applicationType,
        visaType: data.tripDetails.visaType,
        primaryTraveller: {
            firstName: data.personalInfo.firstName,
            lastName: data.personalInfo.lastName,
            travellingBy: "Airplane",
            middleName: data.personalInfo.middleName,
            email: data.personalInfo.email,
            homeCountry: {
                name: data.tripDetails.homeCountry.name ?? "",
                code: data.tripDetails.homeCountry.code ?? "",
            },
            destination: {
                name: data.tripDetails.destination.name ?? "",
                code: data.tripDetails.destination.code ?? "",
            },
            placeOfBirth: data.personalInfo.placeOfBirth.name ?? "",
            phoneNumber: data.personalInfo.phoneNumber,
            stateOfOrigin: data.personalInfo.stateOfOrigin,
            placeOfOrigin: data.personalInfo.placeOfOrigin,
            nativeLanguage: data.personalInfo.nativeLanguage,
            meansOfId: data.personalInfo.meansOfId,
            idNumber: data.personalInfo.idNumber,
            issueDate: data.personalInfo.issueDate,
            expiryDate: data.personalInfo.expiryDate,
            address: data.personalInfo.address,
            countryOfCitizen: data.personalInfo.countryOfCitizen.name ?? "",
            dateOfBirth: data.personalInfo.dateOfBirth,
            gender: data.personalInfo.gender,
            maritalStatus: data.personalInfo.maritalStatus,
            partnersName: data.personalInfo.partnersName,
            passportNumber: data.personalInfo.passportNumber,
            passportIssuedCountry: data.personalInfo.passportIssuedCountry.name ?? "",
            passportExpiryDate: data.personalInfo.passportExpiryDate,
            tripPurpose: data.personalInfo.tripPurpose,
            tuberculosis: data.personalInfo.tuberculosis,
            // tuberculosisDetails: data.personalInfo.tuberculosisDetails,
            mentalDisorder: data.personalInfo.mentalDisorder,
            mentalDisorderDetails: data.personalInfo.mentalDisorderDetails,
            remainbeyondValidity: data.personalInfo.remainbeyondValidity,
            // remainbeyondValidityDetails: data.personalInfo.remainbeyondValidityDetails,
            refusedBefore: data.personalInfo.refusedBefore,
            refusedBeforeDetails: data.personalInfo.refusedBeforeDetails,
            arrestedBefore: data.personalInfo.arrestedBefore,
            arrestedBeforeDetails: data.personalInfo.arrestedBeforeDetails,
            servedInMilitary: data.personalInfo.servedInMilitary,
            servedInMilitaryDetails: data.personalInfo.servedInMilitaryDetails,
            memberOfViolentGroup: data.personalInfo.memberOfViolentGroup,
            // memberOfViolentGroupDetails: data.personalInfo.memberOfViolentGroupDetails,
            participatedInViolentActivities: data.personalInfo.participatedInViolentActivities,
            // participatedInViolentActivitiesDetails: data.personalInfo.participatedInViolentActivitiesDetails,
            education: data.education,
            employment: data.employment.map(e => {
                delete e.locationType
                return ({ ...e })
            }),
            //added
            // changedName: data.personalInfo.changedName,
            // changeOfName: data.personalInfo.changeOfName,
            // statusOfResidence: data.personalInfo.statusOfResidence,
            // startDateOfResidence: data.personalInfo.startDateOfResidence,
            // occupation: data.personalInfo.occupation,
            // tripDurationStartDate: data.personalInfo.tripDurationStartDate,
            // tripDurationEndDate: data.personalInfo.tripDurationEndDate,
            // tripDurationLocation: data.personalInfo.tripDurationLocation,
            // hasContactInLocation: data.personalInfo.hasContactInLocation,
            // contactInLocationLastName:
            //     data.personalInfo.contactInLocationLastName,
            // contactInLocationFirstName:
            //     data.personalInfo.contactInLocationFirstName,
            // contactInLocationAddress:
            //     data.personalInfo.contactInLocationAddress,
            // contactInLocationRelationship:
            //     data.personalInfo.contactInLocationRelationship,
            // contactInLocationPhoneNumber:
            //     data.personalInfo.contactInLocationPhoneNumber,
            // hasGreenCard: data.personalInfo.hasGreenCard,
            // greenCardNumber: data.personalInfo.greenCardNumber,
            // greenCardExpiryDate: data.personalInfo.greenCardExpiryDate,
            // prevResidence1: data.personalInfo.prevResidence1,
            // prevResidence2: data.personalInfo.prevResidence2,
            // prevResidence3: data.personalInfo.prevResidence3,
            // startDatePrevResidence1: data.personalInfo.startDatePrevResidence1,
            // startDatePrevResidence2: data.personalInfo.startDatePrevResidence2,
            // startDatePrevResidence3: data.personalInfo.startDatePrevResidence3,
            // endDatePrevResidence1: data.personalInfo.endDatePrevResidence1,
            // endDatePrevResidence2: data.personalInfo.endDatePrevResidence2,
            // endDatePrevResidence3: data.personalInfo.endDatePrevResidence3,
        },
        familyMembers: data.familyMembers.filter(e => !!e?.membersName).map((member) => {
            delete member.section;
            delete member.index;
            delete member.membersOccupation;
            return ({
                ...member,
                issueYear: String(safelyConvertToNumber(member?.issueYear)),
                expiryYear: String(safelyConvertToNumber(member?.expiryYear)),
            })
        }),
        documents: data.documents,
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
