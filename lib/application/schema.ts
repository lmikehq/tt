import {
  ApplicationFormRequestInput,
  DetailsKeys,
  DocumentInterface,
  EducationDetailsInterface,
  EmploymentDetailsInterface,
  FamilyInfoInterface,
  PersonalInfoInterface,
  VisaApplicationFormInterface,
} from "types";
import * as yup from "yup";

//TRIP DETAILS

export const detailsSchema: yup.ObjectSchema<DetailsKeys> = yup.object().shape({
  homeCountry: yup.string().required("Required"),
  destination: yup.string().required("Required"),
  applicationType: yup.string().required("Required"),
  travellingBy: yup.string(),
  visaType: yup.string().required("Required"),
});

export const detailsKeys: DetailsKeys = {
  homeCountry: "",
  destination: "",
  applicationType: "",
  visaType: "", //
  travellingBy: "",
};

// PERSONAL INFO

export const personalInfoSchema: yup.ObjectSchema<PersonalInfoInterface> = yup
  .object()
  .shape({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    middleName: yup.string().required("Required"),
    email: yup.string().required("Required").email("Invalid email address"),
    placeOfBirth: yup.string().required("Required"),
    phoneNumber: yup.string().required("Required"),
    stateOfOrigin: yup.string().required("Required"),
    lgaOfOrigin: yup.string().required("Required"),
    nativeLanguage: yup.string().required("Required"),
    meansOfId: yup.string().required("Required"),
    idNumber: yup.string().required("Required"),
    issueDate: yup.string().required("Required"),
    expiryDate: yup.string().required("Required"),
    address: yup.string().required("Required"),
    countryOfCitizen: yup.string().required("Required"),
    dateOfBirth: yup.string().required("Required"),
    gender: yup.string().required("Required"),
    maritalStatus: yup.string().required("Required"),
    partnersName: yup.string().required("Required"),
    passportNumber: yup.string().required("Required"),
    passportIssuedCountry: yup.string().required("Required"),
    passportExpiryYear: yup
      .number()
      .required("Required")
      .positive("Expiry year must be a positive number"),
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
  firstName: "Abdulazeez",
  lastName: "Olalere",
  middleName: "Gbolahan",
  email: "htmolaike@yopmail.com",
  // placeOfOrigin: "",
  stateOfOrigin: "Oyp",
  lgaOfOrigin: "Lagelu",
  nativeLanguage: "Yoruba",
  meansOfId: "",
  idNumber: "111",
  issueDate: "",
  expiryDate: "",
  // homeCountry: "",
  address: "111",
  dateOfBirth: "",
  maritalStatus: "",
  partnersName: "11",
  passportNumber: "11",
  passportIssuedCountry: "",
  // passportIssueDate: "",
  passportExpiryYear: 2000,
  tripPurpose: "111",
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
  placeOfBirth: "",
  phoneNumber: "1111",
  countryOfCitizen: "",
  gender: "",
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
    endYear: yup.number().when("stillAtSchool", {
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
  startYear: 0,
  endYear: 0,
  stillAtSchool: false,
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
  startYear: 0,
  stillWorking: false,
};

//FAMILY MEMBER

export const singleFamilyInfoSchema: yup.ObjectSchema<FamilyInfoInterface> = yup
  .object()
  .shape({
    passportNumber: yup.string().required("Required"),
    expiryYear: yup.number().required("Required"),
    gender: yup.string().required("Required"),
    dateOfBirth: yup.string().required("Required"),
    membersName: yup.string().required("Required"),
    relationshipToPrimary: yup.string().required("Required"),
    address: yup.string().required("Required"),
    membersPhoneNumber: yup.string().required("Required"),
    membersEmail: yup
      .string()
      .required("Required")
      .email("Invalid email address"),
    issueYear: yup.number().required("Required"),
    accompanying: yup.boolean().required("Required"),
  });

export const familyInforKeys: FamilyInfoInterface = {
  passportNumber: "",
  expiryYear: 0,
  gender: "",
  dateOfBirth: "",
  membersName: "",
  relationshipToPrimary: "",
  address: "",
  membersPhoneNumber: "",
  membersEmail: "",
  issueYear: 0,
  accompanying: true,
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
  .min(1, "You need to add 4 documents")
  .max(5, "You can provide at most 5 documents");

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
  ...detailsKeys,
  ...educationsArr,
  ...employmentsArr,
  ...familyInfoArr,
  ...personalInfoKeys,
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

const test: ApplicationFormRequestInput = {
  primaryTraveller: {
    homeCountry: "Country1",
    destination: "Country2",
    travellingBy: "Airplane",
    firstName: "John",
    middleName: "M",
    lastName: "Doe",
    dateOfBirth: "1990-01-01",
    email: "tmike@yopmail.com",
    placeOfBirth: "City1",
    stateOfOrigin: "State1",
    phoneNumber: "1234567890",
    lgaOfOrigin: "LGA1",
    nativeLanguage: "English",
    meansOfId: "Passport",
    idNumber: "ABC123",
    issueDate: "2020-01-01",
    expiryDate: "2030-01-01",
    countryOfCitizen: "Country3",
    address: "123 Main St",
    maritalStatus: "Single",
    partnersName: "",
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
    passportNumber: "P123456",
    passportIssuedCountry: "Country4",
    passportExpiryYear: 2025,
    gender: "Male",
    // guarantorName: "Jane Smith",
    // relationshipToGuarantor: "Friend",
    // guarantorAddress: "456 Elm St",
    // guarantorPhone: "9876543210",
    // guarantorWorth: "$50000",
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
      expiryYear: 2025,
      issueYear: 2020,
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
      expiryYear: 2025,
      issueYear: 2020,
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
