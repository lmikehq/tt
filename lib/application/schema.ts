import {
  DocumentInterface,
  PersonalInfoInterface,
  VisaApplicationFormInterface,
} from "types";
import * as yup from "yup";

export const detailsSchema = yup.object().shape({
  home: yup.string().required("Required"),
  destination: yup.string().required("Required"),
  applicationType: yup.string().required("Required"),
  travellingBy: yup.string(),
  numberOfTravellers: yup.number().required("Required").max(6).min(1),
  visaType: yup.string().required("Required"),
});

export const detailsKeys = {
  home: "",
  destination: "",
  applicationType: "",
  visaType: "", //
  travellingBy: "",
  numberOfTravellers: 1,
};

export const personalInfoSchema = yup.object().shape({
  firstName: yup
    .string()
    .max(15, "Must be 15 characters or less")
    .min(2, "Testing")
    .required("Required"),
  lastName: yup
    .string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  middleName: yup.string().required("Required"),
  email: yup.string().email().required("Required"),
  placeOfOrigin: yup.string().required("Required"),
  stateOfOrigin: yup.string().required("Required"),
  lgOfOrigin: yup.string().required("Required"),
  nativeLanguage: yup.string().required("Required"),
  meansOfId: yup.string().required("Required"),
  idNumber: yup.string().required("Required"),
  issueDate: yup.date(),
  expiryDate: yup.date(),
  homeCountry: yup.string().required("Required"),
  residentialAddress: yup.string().required("Required"),
  // dateOfBirth: yup.date().required("Required"),
  maritalStatus: yup.string().required("Required"),
  partnersName: yup.string(),
  passportNumber: yup.string().required("Required"),
  issuingCountry: yup.string().required("Required"),
  passportIssueDate: yup.date(),
  passportExpiryDate: yup.date(),
  purposeOfTrip: yup.string(),
  tuberculosis: yup.boolean().required(),
  mentalDisorder: yup.boolean().required(),
  mentalDisorderDetails: yup.string().when("mentalDisorder", {
    is: true,
    then: (schema) => schema.required("Mental disorder details are required"),
  }),
  remainbeyondValidity: yup.boolean().required(),
  refusedBefore: yup.boolean().required(),
  refusedBeforeDetails: yup.string().when("refusedBefore", {
    is: true,
    then: (schema) => schema.required("Refusal details are required"),
  }),
  arrestedBefore: yup.boolean().required(),
  arrestedBeforeDetails: yup.string().when("arrestedBefore", {
    is: true,
    then: (schema) => schema.required("Arrest details are required"),
  }),
  servedInMilitary: yup.boolean().required(),
  servedInMilitaryDetails: yup.string().when("servedInMilitary", {
    is: true,
    then: (schema) => schema.required("Service details are required"),
  }),
  memberOfViolentGroup: yup.boolean().required(),
  participatedInViolentActivities: yup.boolean().required(),
});

export const document = {
  title: "",
  url: "",
};
export const personalInfoKeys: PersonalInfoInterface = {
  firstName: "",
  lastName: "",
  middleName: "",
  email: "",
  placeOfOrigin: "",
  stateOfOrigin: "",
  lgOfOrigin: "",
  nativeLanguage: "",
  meansOfId: "",
  idNumber: "",
  issueDate: "",
  expiryDate: "",
  homeCountry: "",
  residentialAddress: "",
  dateOfBirth: "",
  maritalStatus: "",
  partnersName: "",
  passportNumber: "",
  issuingCountry: "",
  passportIssueDate: "",
  passportExpiryDate: "",
  purposeOfTrip: "",
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
};

export const educationKeys = {
  schoolName: "",
  degree: "",
  grade: "",
  courseOfStudy: "",
  startYear: "",
  endYear: "",
};

export const educationSchema = yup.object().shape({
  schoolName: yup.string().required("Required"),
  degree: yup.string().required("Required"),
  courseOfStudy: yup.string().required("Required"),
  grade: yup
    .number()
    .max(5.0, "Your Grade cannot be more than 5.0")
    .min(1.0, "Your Grade cannot be less than 1.0")
    .required("Required"),
  startYear: yup.string().required("Required"),
  endYear: yup.string().required("Required"),
});
export const documentShema = yup.object().shape({
  title: yup.string().required(),
  url: yup.string().required(),
});
export const employmentSchema = yup.object().shape({
  employmentType: yup.string().required("Required"),
  locationType: yup.string().required("Required"),
  companyName: yup.string().required("Required"),
  jobTitle: yup.string().required("Required"),
  companyLocation: yup.string().required("Required"),
  startedYear: yup.string().required("Required"),
  endedYear: yup.string().required("Required"),
});

export const singleFamilyInfoSchema = yup.object().shape({
  passNumber: yup.string(),
  expiryYear: yup.string(),
  gender: yup.string(),
  membersDOB: yup.string(),
  passIssueCountry: yup.string(),
  membersName: yup.string().required("Required"),
  membersRelationship: yup.string().required("Required"),
  membersAddress: yup.string().required("Required"),
  membersPhone: yup.string().required("Required"),
  membersEmail: yup.string().email().required("Required"),
  membersIssueDate: yup.string(),
  membersExpiryDate: yup.string(),
});
export const educationArraySchema = yup
  .array()
  .of(educationSchema)
  .min(1, "You need to provide at least one education")
  .max(3, "You can provide at most three education");
export const employmentArraySchema = yup.array().of(employmentSchema);
export const familyInfoArraySchema = yup.array().of(singleFamilyInfoSchema);
export const documentArraySchema = yup
  .array()
  .of(documentShema)
  .min(2, "You need to add 4 documents")
  .max(5, "You can provide at most 3 documents");

export const employmentKeys = {
  companyName: "",
  jobTitle: "",
  employmentType: "",
  locationType: "",
  companyLocation: "",
  startedYear: "",
  endedYear: "",
};

export const familyInforKeys = {
  passNumber: "",
  expiryYear: "",
  gender: "",
  membersDOB: "",
  passIssueCountry: "",
  membersName: "",
  membersRelationship: "",
  membersAddress: "",
  membersPhone: "",
  membersEmail: "",
  membersIssueDate: "",
  membersExpiryDate: "",
};
export const educationsSchema = yup
  .object()
  .shape({ educations: educationArraySchema });
export const employmentsSchema = yup
  .object()
  .shape({ employments: employmentArraySchema });
export const familyInfoSchema = yup
  .object()
  .shape({ familyInfo: familyInfoArraySchema });
export const documentsSchema = yup
  .object()
  .shape({ documents: documentArraySchema });

export const visaSchema = {
  ...detailsSchema,
  ...educationsSchema,
  ...employmentsSchema,
  ...personalInfoSchema,
  ...familyInfoSchema,
  ...documentsSchema,
};
export const employmentsArr = {
  employments: [{ ...employmentKeys }],
};
export const educationsArr = {
  educations: [{ ...educationKeys }],
};
export const familyInfoArr = {
  familyInfo: [{ ...familyInforKeys }],
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
