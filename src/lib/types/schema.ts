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

const countrySchema: yup.ObjectSchema<CountryType> = yup.object().shape({
  name: yup.string().required("Required"),
  flag: yup.string().required("Required"),
  code: yup.string().required("Required"),
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

    expiryDate: yup.string().notRequired(),

    address: yup.string().required("Required"),
    countryOfCitizen: countrySchema.required(),
    dateOfBirth: yup.string().required("Required"),
    gender: yup.string().required("Required"),
    maritalStatus: yup.string().required("Required"),
    partnersName: yup.string().when("maritalStatus", {
      is: "Married",
      then: (schema) => schema.required("Required"),
    }),
    passportNumber: yup.string().required("Required"),

    passportIssuedCountry: countrySchema.required(),
    passportExpiryDate: yup.string().notRequired(),
    tripPurpose: yup.string().required("Required"),
    tuberculosis: yup.boolean().required("Required"),
    mentalDisorder: yup.boolean().required("Required"),
    mentalDisorderDetails: yup.string().when("mentalDisorder", {
      is: true,
      then: (schema) => schema.required("Required"),
    }),
    remainbeyondValidity: yup.boolean().required("Required"),
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
    participatedInViolentActivities: yup.boolean().required("Required"),
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
  // expiryDate: "",
  // homeCountry: "",
  address: "",
  dateOfBirth: "",
  maritalStatus: "",
  partnersName: "",
  passportNumber: "",
  passportIssuedCountry: mockCountry,
  // passportIssueDate: "",
  passportExpiryDate: "",
  tripPurpose: "",
  tuberculosis: null,
  mentalDisorder: null,
  mentalDisorderDetails: "",
  remainbeyondValidity: null,
  refusedBefore: null,
  refusedBeforeDetails: "",
  arrestedBefore: null,
  arrestedBeforeDetails: "",
  servedInMilitary: null,
  servedInMilitaryDetails: "",
  memberOfViolentGroup: null,
  participatedInViolentActivities: null,
  placeOfBirth: mockCountry,
  phoneNumber: "",
  countryOfCitizen: mockCountry,
  gender: "",

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
    endYear: yup.number().when("st", {
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
    companyLocation: yup.string().required("Required"),
    startYear: yup.number().required("Required"),
    endYear: yup.number().when("stillWorking", {
      is: false,
      then: (schema) => schema.required("Required"),
    }),
    stillWorking: yup.boolean().required(),
  });
export const employmentKeys: EmploymentDetailsInterface = {
  companyName: "",
  jobTitle: "",
  employmentType: "",
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

//FAMILY MEMBER

export const singleFamilyInfoSchema: yup.ObjectSchema<FamilyInfoInterface> = yup
  .object()
  .shape({
    membersName: yup.string().required("Required"),
    relationshipToPrimary: yup.string().required("Required"),
    address: yup.string().required("Required"),
    membersPhoneNumber: yup.string().required("Required"),
    membersEmail: yup
      .string()
      .required("Required")
      .email("Invalid email address"),
    accompanying: yup.boolean().required("Required"),
    passportNumber: yup.string().when("accompanying", {
      is: true,
      then: (schema) => schema.required("Required"),
    }),
    expiryYear: yup.string().when("accompanying", {
      is: true,
      then: (schema) => schema.required("Required"),
    }),
    dateOfBirth: yup.string().when("accompanying", {
      is: true,
      then: (schema) => schema.required("Required"),
    }),
    gender: yup.string().when("accompanying", {
      is: true,
      then: (schema) => schema.required("Required"),
    }),
    issueYear: yup.string().when("accompanying", {
      is: true,
      then: (schema) => schema.required("Required"),
    }),
  });

export const familyInforKeys: FamilyInfoInterface = {
  passportNumber: "",
  expiryYear: "",
  gender: "",
  dateOfBirth: "",
  membersName: "",
  relationshipToPrimary: "",
  address: "",
  membersPhoneNumber: "",
  membersEmail: "",
  issueYear: "",
  accompanying: false,
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
  familyMembers: [{ ...familyInforKeys }],
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
    mentalDisorder: true,
    mentalDisorderDetails: "Anxiety",
    remainbeyondValidity: false,
    refusedBefore: true,
    refusedBeforeDetails: "Visa application rejected",
    arrestedBefore: false,
    arrestedBeforeDetails: "",
    servedInMilitary: true,
    servedInMilitaryDetails: "2 years of service",
    memberOfViolentGroup: false,
    participatedInViolentActivities: true,
    employment: [
      {
        companyName: "Company1",
        jobTitle: "Developer",
        employmentType: "Full-time",
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
      expiryYear: "2025",
      issueYear: "2020",
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
      expiryYear: "2025",
      issueYear: "2020",
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
