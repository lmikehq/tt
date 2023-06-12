import * as yup from "yup";

export const detailsSchema = yup.object({
  home: yup.object().required(),
  destination: yup.object().required(),
  applicationType: yup.string().required(),
  travellingBy: yup.string().required(),
});

export const detailsKeys = {
  home: {},
  destination: {},
  applicationType: "",
  travellingBy: "",
};

export const personalInfoSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  placeOfOrigin: yup.string().required(),
  stateOfOrigin: yup.string().required(),
  LgOfOrigin: yup.string().required(),
  meansOfId: yup.string().required(),
  idNumber: yup.string().required(),
  residentialAddress: yup.string().required(),
  dateOfBirth: yup.date().required(),
  maritalStatus: yup.string().required(),
  partnersName: yup.string(),
  facebookUsername: yup.string(),
  linkedinOrInstagram: yup.string(),
});

export const pesonalInfoKeys = {
  firstName: "",
  lastName: "",
  email: "",
  placeOfOrigin: "",
  stateOfOrigin: "",
  lgOfOrigin: "",
  meansOfId: "",
  idNumber: "",
  residentialAddress: "",
  dateOfBirth: "",
  maritalStatus: "",
  partnersName: "",
  facebookUsername: "",
  linkedinOrInstagram: "",
};

export const edAndEmpSchema = yup.object({
  degree: yup.string().required(),
  graudautionYear: yup.string().required(),
  schoolName: yup.string().required(),
  courseOfStudy: yup.string().required(),
  grade: yup.number().required().max(5).min(0),

  companyName: yup.string().required(),
  employerName: yup.string().required(),
  employerPhone: yup.string().required(),
  startedYear: yup.string().required(),
  endedYear: yup.string().required(),
});

export const edAndEmpKeys = {
  degree: "",
  graudautionYear: "",
  schoolName: "",
  courseOfStudy: "",
  grade: "",
  companyName: "",
  employerName: "",
  employerPhone: "",
  startedYear: "",
  endedYear: "",
};

export const otherInfoSchema = yup.object({
  passNumber: yup.string().required(),
  yearOfIssue: yup.string().required(),
  gender: yup.string().required(),
  passIssueCountry: yup.string().required(),
  guarantorName: yup.string().required(),
  guarantorRelationship: yup.string().required(),
  guarantorAddress: yup.string().required(),
  guarantorPhone: yup.string().required(),
  guarantorWorth: yup.string().required(),
  uploadedDocuments: yup.array().required(),
});

export const otherInforKeys = {
  passNumber: "",
  passIssueCountry: "",
  gender: "",
  yearOfIssue: "",
  guarantorName: "",
  guarantorAddress: "",
  guarantorPhone: "",
  guarantorWorth: "",
  uploadedDocuments: [],
};

export const visaSchema = {
  ...detailsSchema,
  ...edAndEmpSchema,
  ...personalInfoSchema,
  ...otherInfoSchema,
};

export const visaInitVals = {
  ...detailsKeys,
  ...edAndEmpKeys,
  ...pesonalInfoKeys,
  ...otherInforKeys,
};
