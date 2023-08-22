import { VisaApplicationFormInterface } from "types";
import * as yup from "yup";

export const detailsSchema = yup.object().shape({
  home: yup.string().required(),
  destination: yup.string().required(),
  applicationType: yup.string().required(),
  travellingBy: yup.string(),
  numberOfTravellers: yup.number().required().max(6).min(1),
  visaType: yup.string().required(),
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
  middleName: yup.string().required(),
  email: yup.string().email().required(),
  placeOfOrigin: yup.string().required(),
  stateOfOrigin: yup.string().required(),
  lgOfOrigin: yup.string().required(),
  nativeLanguage: yup.string().required(),
  meansOfId: yup.string().required(),
  idNumber: yup.string().required(),
  issueDate: yup.date(),
  expiryDate: yup.date(),
  homeCountry: yup.string().required(),
  residentialAddress: yup.string().required(),
  // dateOfBirth: yup.date().required(),
  maritalStatus: yup.string().required(),
  partnersName: yup.string(),
  passportNumber: yup.string().required(),
  issuingCountry: yup.string().required(),
  passportIssueDate: yup.date(),
  passportExpiryDate: yup.date(),
  purposeOfTrip: yup.string(),
});

export const personalInfoKeys = {
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

export const employmentSchema = yup.object().shape({
  employmentType: yup.string().required(),
  locationType: yup.string().required(),
  companyName: yup.string().required(),
  jobTitle: yup.string().required(),
  companyLocation: yup.string().required(),
  startedYear: yup.string().required(),
  endedYear: yup.string().required(),
});
export const singleFamilyInfoSchema = yup.object().shape({
  passNumber: yup.string(),
  expiryYear: yup.string(),
  gender: yup.string(),
  membersDOB: yup.string(),
  passIssueCountry: yup.string(),
  membersName: yup.string().required(),
  membersRelationship: yup.string().required(),
  membersAddress: yup.string().required(),
  membersPhone: yup.string().required(),
  membersEmail: yup.string().email().required(),
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

export const visaSchema = {
  ...detailsSchema,
  ...educationsSchema,
  ...employmentsSchema,
  ...personalInfoSchema,
  ...familyInfoSchema,
};
export const employmentsArr = {
  employments: [
    { ...employmentKeys }
  ],
};
export const educationsArr = {
  educations: [
    { ...educationKeys }
  ],
};
export const familyInfoArr = {
  familyInfo: [
    { ...familyInforKeys }
  ],
};
export const visaInitVals: VisaApplicationFormInterface = {
  ...detailsKeys,
  ...educationsArr,
  ...employmentsArr,
  ...familyInfoArr,
  ...personalInfoKeys,
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
