import {
    DetailsKeys,
    DocumentInterface,
    EducationDetailsInterface,
    EmploymentDetailsInterface,
    FamilyInfoInterface,
    PersonalInfoInterface,
    VisaApplicationFormInterface,
} from "@lib/types";
import * as yup from "yup";
import { ApplicationFormRequestInput } from "./request-models/application-form.type";
import { CountryType } from "@molecule/serviceTabs/components/visa";

export const countrySchema: yup.ObjectSchema<CountryType> = yup.object().shape({
    name: yup.string(),
    flag: yup.string(),
    code: yup.string(),
});

export const mockCountry: CountryType = {
    name: "",
    flag: "",
    code: "",
};

//TRIP DETAILS

export const detailsSchema: yup.ObjectSchema<DetailsKeys> = yup.object().shape({
    homeCountry: countrySchema.required(),
    destination: countrySchema.required(),
    applicationType: yup.string().required("Required"),
    travellingBy: yup.string().required("Required"),
    visaType: yup.string().required("Required"),
});

export const detailsKeys: DetailsKeys = {
    homeCountry: mockCountry,
    destination: mockCountry,
    applicationType: "",
    visaType: "", //
    travellingBy: "AirPlane",
};

// PERSONAL INFO
export const personalInfoSchema: yup.ObjectSchema<PersonalInfoInterface> = yup
    .object()
    .shape({
        firstName: yup.string().required("Required"),
        lastName: yup.string().required("Required"),
        middleName: yup.string(),
        email: yup.string().required("Required").email("Invalid email address"),
        placeOfBirth: countrySchema.required(),
        phoneNumber: yup.string().required("Required"),
        stateOfOrigin: yup.string().required("Required"),
        placeOfOrigin: yup.string().required("Required"),
        nativeLanguage: yup.string().required("Required"),
        meansOfId: yup.string().required("Required"),
        idNumber: yup.string().required("Required"),
        issueDate: yup.string().required("Required"),
        expiryDate: yup.string().required("Required"),
        address: yup.string().required("Required"),
        countryOfCitizen: countrySchema.required(),
        dateOfBirth: yup.string().required("Required"),
        gender: yup.string().required("Required"),
        maritalStatus: yup.string().required("Required"),
        partnersName: yup.string().when("maritalStatus", {
            is: "Married",
            then: (schema) => schema.required("Required"),
        }),
        marriageStartDate: yup.string().when("maritalStatus", {
            is: "Married",
            then: (schema) => schema.required("Required"),
        }),
        marriageEndDate: yup.string().when("maritalStatus", {
            is: "Married",
            then: (schema) => schema.required("Required"),
        }),
        passportNumber: yup.string().required("Required"),
        passportIssuedCountry: countrySchema.required("Required"),
        passportExpiryDate: yup.string().required("Required"),
        passportIssuedDate: yup.string().required("Required"),
        tripPurpose: yup.string().required("Required"),
        tuberculosis: yup.boolean().required("Required"),
        tuberculosisDetails: yup.string().when("tuberculosis", {
            is: true,
            then: (schema) => schema.required("Required"),
        }),
        mentalDisorder: yup.boolean().required("Required"),
        mentalDisorderDetails: yup.string().when("mentalDisorder", {
            is: true,
            then: (schema) => schema.required("Required"),
        }),
        remainbeyondValidity: yup.boolean().required("Required"),
        remainbeyondValidityDetails: yup.string().when("remainbeyondValidity", {
            is: true,
            then: (schema) => schema.required("Required"),
        }),
        refusedBefore: yup.boolean().required("Required"),
        refusedBeforeDetails: yup.string().when("refusedBefore", {
            is: true,
            then: (schema) => schema.required("Required"),
        }),
        arrestedBefore: yup.boolean().required("Required"),
        arrestedBeforeDetails: yup.string().when("arrestedBefore", {
            is: true,
            then: (schema) => schema.required("Required"),
        }),
        servedInMilitary: yup.boolean().required("Required"),
        servedInMilitaryDetails: yup.string().when("servedInMilitary", {
            is: true,
            then: (schema) => schema.required("Required"),
        }),
        memberOfViolentGroup: yup.boolean().required("Required"),
        memberOfViolentGroupDetails: yup.string().when("memberOfViolentGroup", {
            is: true,
            then: (schema) => schema.required("Required"),
        }),
        participatedInViolentActivities: yup.boolean().required("Required"),
        participatedInViolentActivitiesDetails: yup
            .string()
            .when("participatedInViolentActivities", {
                is: true,
                then: (schema) => schema.required("Required"),
            }),

        //added-values
        statusOfResidence: yup.string().required("Required"),
        startDateOfResidence: yup.string().required("Required"),
        changeOfName: yup.boolean().required("Required"),
        changedName: yup.string().when("changeOfName", {
            is: true,
            then: (schema) => schema.required("Required"),
        }),
        occupation: yup.string().required("Required"),
        tripDurationStartDate: yup.string().required("Required"),
        tripDurationEndDate: yup.string().required("Required"),
        tripDurationLocation: yup.string().required("Required"),
        hasContactInLocation: yup.boolean().required("Required"),
        contactInLocationLastName: yup.string().when("hasContactInLocation", {
            is: true,
            then: (schema) => schema.required("Required"),
        }),
        contactInLocationFirstName: yup.string().when("hasContactInLocation", {
            is: true,
            then: (schema) => schema.required("Required"),
        }),
        contactInLocationAddress: yup.string().when("hasContactInLocation", {
            is: true,
            then: (schema) => schema.required("Required"),
        }),
        contactInLocationRelationship: yup
            .string()
            .when("hasContactInLocation", {
                is: true,
                then: (schema) => schema.required("Required"),
            }),
        contactInLocationPhoneNumber: yup
            .string()
            .when("hasContactInLocation", {
                is: true,
                then: (schema) => schema.required("Required"),
            }),
        hasGreenCard: yup.boolean().required("Required"),
        greenCardNumber: yup.string().when("hasGreenCard", {
            is: true,
            then: (schema) => schema.required("Required"),
        }),
        greenCardExpiryDate: yup.string().when("hasGreenCard", {
            is: true,
            then: (schema) => schema.required("Required"),
        }),
        prevResidence1: countrySchema.required(),
        prevResidence2: countrySchema.required(),
        prevResidence3: countrySchema.required(),
        startDatePrevResidence1: yup.string(),
        startDatePrevResidence2: yup.string(),
        startDatePrevResidence3: yup.string(),
        endDatePrevResidence1: yup.string(),
        endDatePrevResidence2: yup.string(),
        endDatePrevResidence3: yup.string(),
    });

export const personalInfoKeys: PersonalInfoInterface = {
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    placeOfOrigin: "",
    stateOfOrigin: "",
    nativeLanguage: "",
    meansOfId: "",
    idNumber: "",
    issueDate: "",
    expiryDate: "",
    // homeCountry: "",
    address: "",
    dateOfBirth: "",
    maritalStatus: "",
    partnersName: "",
    passportNumber: "",
    passportIssuedCountry: mockCountry,
    passportIssuedDate: "",
    passportExpiryDate: "",
    tripPurpose: "",
    tuberculosis: null,
    tuberculosisDetails: "",
    mentalDisorder: null,
    mentalDisorderDetails: "",
    remainbeyondValidity: null,
    remainbeyondValidityDetails: "",
    refusedBefore: null,
    refusedBeforeDetails: "",
    arrestedBefore: null,
    arrestedBeforeDetails: "",
    servedInMilitary: null,
    servedInMilitaryDetails: "",
    memberOfViolentGroup: null,
    memberOfViolentGroupDetails: "",
    participatedInViolentActivities: null,
    participatedInViolentActivitiesDetails: "",
    placeOfBirth: mockCountry,
    phoneNumber: "",
    countryOfCitizen: mockCountry,
    gender: "",

    //added-details
    statusOfResidence: "",
    startDateOfResidence: "",
    changeOfName: false,
    changedName: "",
    occupation: "",
    tripDurationStartDate: "",
    tripDurationEndDate: "",
    tripDurationLocation: "",
    hasContactInLocation: false,
    contactInLocationLastName: "",
    contactInLocationFirstName: "",
    contactInLocationAddress: "",
    contactInLocationRelationship: "",
    contactInLocationPhoneNumber: "",
    hasGreenCard: false,
    greenCardNumber: "",
    greenCardExpiryDate: "",
    prevResidence1: mockCountry,
    prevResidence2: mockCountry,
    prevResidence3: mockCountry,
    startDatePrevResidence1: "",
    startDatePrevResidence2: "",
    startDatePrevResidence3: "",
    endDatePrevResidence1: "",
    endDatePrevResidence2: "",
    endDatePrevResidence3: "",
    marriageStartDate: "",
    marriageEndDate: "",

    // firstName: "John",
    // middleName: "M",
    // lastName: "Doe",
    // dateOfBirth: "1990-01-01",
    // email: "tmike@yopmail.com",
    // placeOfBirth: "City1",
    // stateOfOrigin: "State1",
    // phoneNumber: "1234567890",
    // placeOfOrigin: "LGA1",
    // nativeLanguage: "English",
    // meansOfId: "Passport",
    // idNumber: "ABC123",
    // issueDate: "2020-01-01",
    // expiryDate: "2030-01-01",
    // countryOfCitizen: "Country3",
    // address: "123 Main St",
    // maritalStatus: "Single",
    // partnersName: "",
    // passportNumber: "P123456",
    // passportIssuedCountry: "Country4",
    // passportExpiryYear: 2025,
    // gender: "Male",
    // tripPurpose: "Vacation",
    // tuberculosis: false,
    // mentalDisorder: true,
    // mentalDisorderDetails: "Anxiety",
    // remainbeyondValidity: false,
    // refusedBefore: true,
    // refusedBeforeDetails: "Visa application rejected",
    // arrestedBefore: false,
    // arrestedBeforeDetails: "",
    // servedInMilitary: true,
    // servedInMilitaryDetails: "2 years of service",
    // memberOfViolentGroup: false,
    // participatedInViolentActivities: true,
};

//DOCUMENT
export const documentShema: yup.ObjectSchema<DocumentInterface> = yup
    .object()
    .shape({
        name: yup.string().required(),
        url: yup.string().required(),
    });
export const document: DocumentInterface = {
    name: "",
    url: "",
};

//EDUCATION
export const singleEducationSchema: yup.ObjectSchema<EducationDetailsInterface> =
    yup.object().shape({
        school: yup.string().required("Required"),
        degree: yup.string().required("Required"),
        cgpa: yup
            .number()
            .max(5.0, "Your Grade cannot be more than 5.0")
            .min(1.0, "Your Grade cannot be less than 1.0")
            .required("Required"),
        location: yup.string().required("Required"),
        fieldOfStudy: yup.string().required("Required"),
        startYear: yup.number().required("Required"),
        endYear: yup
            .number()
            .nullable()
            .when("stillAtSchool", {
                is: false,
                then: (schema) => schema.required("Required"),
            }),
        stillAtSchool: yup.boolean().required(),
    });

export const educationKeys: EducationDetailsInterface = {
    school: "",
    degree: "",
    cgpa: 0,
    location: "",
    fieldOfStudy: "",
    startYear: null,
    endYear: null,
    stillAtSchool: false,
    // school: "University1",
    // degree: "Bachelor's",
    // fieldOfStudy: "Computer Science",
    // cgpa: 3.8,
    // location: "City3",
    // startYear: 2014,
    // stillAtSchool: false,
    // endYear: 2018,
};

//EMPLOYMENT
export const singleEmploymentSchema: yup.ObjectSchema<EmploymentDetailsInterface> =
    yup.object().shape({
        companyName: yup.string().required("Required"),
        jobTitle: yup.string().required("Required"),
        employmentType: yup.string().required("Required"),
        locationType: yup.string().required("Required"),
        companyLocation: yup.string().required("Required"),
        startYear: yup.number().required("Required"),
        endYear: yup
            .number()
            .nullable()
            .when("stillWorking", {
                is: false,
                then: (schema) => schema.required("Required"),
            }),
        stillWorking: yup.boolean().required(),
    });
export const employmentKeys: EmploymentDetailsInterface = {
    companyName: "",
    jobTitle: "",
    employmentType: "",
    locationType: "",
    companyLocation: "",
    startYear: null,
    endYear: null,
    stillWorking: false,
    // companyName: "Company1",
    // jobTitle: "Developer",
    // employmentType: "Full-time",
    // companyLocation: "City2",
    // startYear: 2018,
    // stillWorking: true,
};

//FAMILY MEMBERS
export const singleFamilyInfoSchema: yup.ObjectSchema<FamilyInfoInterface> = yup
    .object()
    .shape({
        index: yup.number(),
        section: yup.string(),
        accompanying: yup.boolean().required("Required"),
        membersName: yup.string().when("accompanying", {
            is: true,
            then: (schema) => schema.required("Required"),
        }),
        address: yup.string().when("accompanying", {
            is: true,
            then: (schema) => schema.required("Required"),
        }),
        membersPhoneNumber: yup.string().when("accompanying", {
            is: true,
            then: (schema) => schema.required("Required"),
        }),
        membersEmail: yup.string().when("accompanying", {
            is: true,
            then: (schema) => schema.required("Required"),
        }),
        occupation: yup.string(),
        relationshipToPrimary: yup.string().when("accompanying", {
            is: true,
            then: (schema) => schema.required("Required"),
        }),
        maritalStatus: yup.string(),
        dateOfBirth: yup.string(),
        gender: yup.string().when("accompanying", {
            is: true,
            then: (schema) => schema.required("Required"),
        }),
        passportNumber: yup.string().when("accompanying", {
            is: true,
            then: (schema) => schema.required("Required"),
        }),
        issueCountry: countrySchema.when("accompanying", {
            is: true,
            then: (schema) => schema.required("Required"),
        }),
        issueDate: yup.string().when("accompanying", {
            is: true,
            then: (schema) => schema.required("Required"),
        }),
        expiryDate: yup.string().when("accompanying", {
            is: true,
            then: (schema) => schema.required("Required"),
        }),
    });

export const familyInforKeys: FamilyInfoInterface = {
    passportNumber: "",
    gender: "",
    dateOfBirth: "",
    membersName: "",
    relationshipToPrimary: "",
    address: "",
    membersPhoneNumber: "",
    membersEmail: "",
    issueDate: "",
    expiryDate: "",
    issueCountry: mockCountry,
    accompanying: false,
    section: "A",
    index: 0,
    maritalStatus: "",
    // membersName: "Alice Smith",
    // relationshipToPrimary: "Spouse",
    // address: "789 Elm St",
    // membersEmail: "alice@example.com",
    // membersPhoneNumber: "9876543210",
    // accompanying: true,
    // dateOfBirth: "1992-05-15",
    // gender: "Female",
    // passportNumber: "P987654",
    // expiryYear: 2025,
    // issueYear: 2020,
};

export const educationArraySchema = yup
    .array()
    .of(singleEducationSchema)
    .min(1, "You need to provide at least one education")
    .max(3, "You can provide at most three education");
export const employmentArraySchema = yup.array().of(singleEmploymentSchema);
export const familyInfoArraySchema = yup.array().of(singleFamilyInfoSchema);
export const documentArraySchema = yup
    .array()
    .of(documentShema)
    .min(1, "Please upload at least one documents");

export const manyEducationSchema = yup
    .object()
    .shape({ education: educationArraySchema });
export const manyEmploymentSchema = yup
    .object()
    .shape({ employment: employmentArraySchema });
export const familyInfoSchema = yup
    .object()
    .shape({ familyMembers: familyInfoArraySchema });
export const documentsSchema = yup
    .object()
    .shape({ documents: documentArraySchema });

export const visaSchema = {
    ...detailsSchema,
    ...manyEducationSchema,
    ...manyEmploymentSchema,
    ...personalInfoSchema,
    ...familyInfoSchema,
    ...documentsSchema,
};
export const employmentsArr = {
    employment: [{ ...employmentKeys }],
};
export const educationsArr = {
    education: [{ ...educationKeys }],
};
export const familyInfoArr = {
    familyMembers: [
        { ...familyInforKeys },
        { ...familyInforKeys, section: "B" },
        { ...familyInforKeys, section: "C" },
    ],
};
export const documentsArr: { documents: DocumentInterface[] } = {
    documents: [],
};
export const visaInitVals: VisaApplicationFormInterface = {
    tripDetails: detailsKeys,
    ...educationsArr,
    ...employmentsArr,
    ...familyInfoArr,
    personalInfo: personalInfoKeys,
    ...documentsArr,
};

export const waitlistSchema = yup.object().shape({
    fullName: yup.string().required({ message: "Full name is required" }),
    email: yup
        .string()
        .email({ message: "Please put a valid email" })
        .required({ message: "Email is required" }),
    whatsapp: yup.string().required({ message: "Whatsapp number is required" }),
    readiness: yup
        .string()
        .required({ message: "Please select readiness option" }),
});

export const test: ApplicationFormRequestInput = {
    primaryTraveller: {
        homeCountry: {
            name: "Country1",
            code: "C1",
        },
        destination: {
            name: "Country2",
            code: "C2",
        },
        travellingBy: "Airplane",
        firstName: "John",
        middleName: "M",
        lastName: "Doe",
        dateOfBirth: "1990-01-01",
        email: "tmike@yopmail.com",
        placeOfBirth: "City1",
        stateOfOrigin: "State1",
        phoneNumber: "1234567890",
        placeOfOrigin: "LGA1",
        nativeLanguage: "English",
        meansOfId: "Passport",
        idNumber: "ABC123",
        issueDate: "2020-01-01",
        expiryDate: "2030-01-01",
        countryOfCitizen: "Country3",
        address: "123 Main St",
        maritalStatus: "Single",
        partnersName: "",
        passportNumber: "P123456",
        passportIssuedCountry: "Country4",
        passportExpiryDate: "",
        gender: "Male",
        tripPurpose: "Vacation",
        tuberculosis: false,
        tuberculosisDetails: "Problem",
        mentalDisorder: true,
        mentalDisorderDetails: "Anxiety",
        remainbeyondValidity: false,
        remainbeyondValidityDetails: "Problem",
        refusedBefore: true,
        refusedBeforeDetails: "Visa application rejected",
        arrestedBefore: false,
        arrestedBeforeDetails: "Locked up",
        servedInMilitary: true,
        servedInMilitaryDetails: "2 years of service",
        memberOfViolentGroup: false,
        memberOfViolentGroupDetails: "Problem",
        participatedInViolentActivities: true,
        participatedInViolentActivitiesDetails: "Problem",
        employment: [
            {
                companyName: "Company1",
                jobTitle: "Developer",
                employmentType: "Full-time",
                locationType: "Onsite",
                companyLocation: "City2",
                startYear: 2018,
                stillWorking: true,
            },
        ],
        education: [
            {
                school: "University1",
                degree: "Bachelor's",
                fieldOfStudy: "Computer Science",
                cgpa: 3.8,
                location: "City3",
                startYear: 2014,
                stillAtSchool: false,
                endYear: 2018,
            },
        ],
        //added
        statusOfResidence: "",
        startDateOfResidence: "",
        changeOfName: false,
        changedName: "",
        occupation: "",
        tripDurationStartDate: "",
        tripDurationEndDate: "",
        tripDurationLocation: "",
        hasContactInLocation: false,
        contactInLocationLastName: "",
        contactInLocationFirstName: "",
        contactInLocationAddress: "",
        contactInLocationRelationship: "",
        contactInLocationPhoneNumber: "",
        hasGreenCard: false,
        greenCardNumber: "",
        greenCardExpiryDate: "",
        prevResidence1: mockCountry,
        prevResidence2: mockCountry,
        prevResidence3: mockCountry,
        startDatePrevResidence1: "",
        startDatePrevResidence2: "",
        startDatePrevResidence3: "",
        endDatePrevResidence1: "",
        endDatePrevResidence2: "",
        endDatePrevResidence3: "",
    },
    familyMembers: [
        {
            membersName: "Alice Smith",
            relationshipToPrimary: "Spouse",
            address: "789 Elm St",
            membersEmail: "alice@example.com",
            membersPhoneNumber: "9876543210",
            accompanying: true,
            dateOfBirth: "1992-05-15",
            gender: "Female",
            passportNumber: "P987654",
            expiryDate: "",
            issueDate: "",
            issueCountry: mockCountry,
            section: "",
            index: 0,
        },
        {
            membersName: "Alice Smith",
            relationshipToPrimary: "Spouse",
            address: "789 Elm St",
            membersEmail: "alice@example.com",
            membersPhoneNumber: "9876543210",
            accompanying: true,
            dateOfBirth: "1992-05-15",
            gender: "Female",
            passportNumber: "P987654",
            expiryDate: "",
            issueDate: "",
            issueCountry: mockCountry,
            section: "",
            index: 0,
        },
    ],
    documents: [
        {
            name: "Passport",
            url: "https://example.com/passport.pdf",
        },
    ],
    user: "64e12d838e1929dbf8450b60",
    visaType: "Business",
    applicationType: "Family",
};
