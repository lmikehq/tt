import * as yup from "yup";

export const detailsSchema = yup.object().shape({
  home: yup.object().required(),
  destination: yup.object().required(),
  applicationType: yup.string().required(),
  travellingBy: yup.string().required(),
  numberOfTravellers: yup.number().required().max(6).min(1),
  visaType: yup.string().required(),
});

export const detailsKeys = {
  home: {},
  destination: {},
  applicationType: "",
  visaType: "", //
  travellingBy: "",
  numberOfTravellers: 1,
};

export const personalInfoSchema = yup.object().shape({
  firstName: yup.string().max(15, "Must be 15 characters or less").min(2, "Testing").required("Required"),
  lastName: yup.string().max(15, "Must be 15 characters or less").required("Required"),
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
  dateOfBirth: yup.date().required(),
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
  purposeOfTrip: ""
};

export const edAndEmpSchema = yup.object().shape({
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

export const otherInfoSchema = yup.object().shape({
  passNumber: yup.string().required(),
  expiryYear: yup.string().required(),
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
  expiryYear: "",
  guarantorName: "",
  guarantorAddress: "",
  guarantorPhone: "",
  guarantorWorth: "",
  uploadedDocuments: [],
};

export const familyInfoSchema = yup.object().shape({
  membersName: yup.string().required(),
  memberRelationship: yup.string().required(),
  memberAddress: yup.string().required(),
  memberEmail: yup.string().required(),
  memberOccupation: yup.string().required(),
  memberPhoneNumber: yup.string().required(),
  memberWorth: yup.string().required()
})

export const familyInforKeys = {
  membersName: "",
  memberRelationship: "",
  memberAddress: "",
  memberOccupation: "",
  memberEmail: "",
  memberPhoneNumber: "",
  memberWorth: ""
}

export const visaSchema = {
  ...detailsSchema,
  ...edAndEmpSchema,
  ...personalInfoSchema,
  ...otherInfoSchema,
};

export const visaInitVals = {
  ...detailsKeys,
  ...edAndEmpKeys,
  ...personalInfoKeys,
  ...otherInforKeys,
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
