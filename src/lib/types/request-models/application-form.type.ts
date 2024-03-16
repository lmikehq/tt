import { CountryType } from "@/components/molecules/serviceTabs/components/visa";
import {
    FamilyInfoInterface,
    DocumentInterface,
    EducationDetailsInterface,
    EmploymentDetailsInterface,
    BackgroundInfoInterface,
} from "@lib/types";

interface ThisFamilyInterface
    extends Omit<FamilyInfoInterface, "issueYear" | "expiryYear"> {
    issueYear?: number;
    expiryYear?: number;
}
export interface ApplicationFormRequestInput {
    primaryTraveller: {
        personalDetails: {
            firstName: string;
            middleName: string;
            lastName: string;
            previousSurname: string;
            dateOfBirth: string;
            email: string;
            placeOfBirth: string;
            stateOfOrigin: string;
            phoneNumber: string;
            lgaOfOrigin: string;
            nativeLanguage: string;
            meansOfId: string;
            idNumber: string;
            issueDate?: string;
            expiryDate?: string;
            address: string;
            gender: string;
        };
        citizenshipInformation: {
            countryOfCitizenship: CountryType;
            countryOfResidence: CountryType;
            countryApplyingFrom: CountryType;
            statusOfResidence: string;
            startDateOfResidence: string;
            placeOfOrigin: string;
            previousCountryOfResidences: {
                country: CountryType;
                since: string;
                till: string;
            }[];
            greenCardDetails?: {
                number: string;
                expiryDate: string;
            };
        };
        passportInformation: {
            number: string;
            issuedCountry: CountryType;
            issuedDate: string;
            expiryDate: string;
        };
        marriageInformation: {
            maritalStatus: string;
            partnersName?: string;
            marriageStartDate?: string;
        };
        employment: EmploymentDetailsInterface[];
        education: EducationDetailsInterface[];
        backgroundInformation: BackgroundInfoInterface;
    };
    familyInformation: {
        parentDetails: ThisFamilyInterface[];
        siblingDetails: ThisFamilyInterface[];
        immediateFamilyInfo: ThisFamilyInterface[];
    };
    guarantorInformation: {
        guarantorName?: string;
        relationshipToGuarantor?: string;
        guarantorAddress?: string;
        guarantorPhone?: string;
        guarantorWorth?: string;
    };
    tripInformation: {
        tripDurationStartDate: string;
        tripDurationEndDate: string;
        tripLocation: string;
        contactInLocationLastName?: string;
        contactInLocationFirstName?: string;
        contactInLocationAddress?: string;
        contactInLocationRelationship?: string;
        contactInLocationPhoneNumber?: string;
    };
    homeCountry: CountryType;
    destination: CountryType;
    documents: DocumentInterface[];
    visaType: string;
    applicationType: string;
    travellingBy: string;
    statementOfPurpose: string;
    user?: string;
}
