import {
  DetailsKeys,
  DocumentInterface,
  EducationDetailsInterface,
  EmploymentDetailsInterface,
  FamilyInfoInterface,
  GuarantorInfoInterface,
  IAccompany,
  IReferralBankInfo,
  IUpdatePassword,
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
    placeOfBirth: countrySchema.required("Required"),
    phoneNumber: yup.string().required("Required"),
    stateOfOrigin: yup.string().required("Required"),
    placeOfOrigin: yup.string().required("Required"),
    nativeLanguage: yup.string().required("Required"),
    meansOfId: yup.string().required("Required"),
    idNumber: yup.string().required("Required"),
    issueDate: yup.string().required("Required"),
    expiryDate: yup.string().required("Required"),
    address: yup.string().required("Required"),
    countryOfCitizen: countrySchema.required("Required"),
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
      is: "Divorced",
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
    countryOfApply: countrySchema,
    countryOfResidence: countrySchema,
    livedAbroad: yup.boolean().required("Required"),
    countriesLived: yup.number(),
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
    contactInLocationRelationship: yup.string()
      .when("hasContactInLocation", {
        is: true,
        then: (schema) => schema.required("Required"),
      }),
    contactInLocationPhoneNumber: yup.string()
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
    prevResidence1: countrySchema,
    prevResidence2: countrySchema,
    prevResidence3: countrySchema,
    prevResidence4: countrySchema,
    prevResidence5: countrySchema,
    startDatePrevResidence1: yup.string(),
    startDatePrevResidence2: yup.string(),
    startDatePrevResidence3: yup.string(),
    startDatePrevResidence4: yup.string(),
    startDatePrevResidence5: yup.string(),
    endDatePrevResidence1: yup.string(),
    endDatePrevResidence2: yup.string(),
    endDatePrevResidence3: yup.string(),
    endDatePrevResidence4: yup.string(),
    endDatePrevResidence5: yup.string(),
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
  countryOfApply: mockCountry,
  countryOfResidence: mockCountry,
  livedAbroad: false,
  // countriesLived: "",
  statusOfResidence: "",
  startDateOfResidence: "",
  changeOfName: false,
  changedName: "",
  occupation: "none",
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
  prevResidence4: mockCountry,
  prevResidence5: mockCountry,
  startDatePrevResidence1: "",
  startDatePrevResidence2: "",
  startDatePrevResidence3: "",
  startDatePrevResidence4: "",
  startDatePrevResidence5: "",
  endDatePrevResidence1: "",
  endDatePrevResidence2: "",
  endDatePrevResidence3: "",
  endDatePrevResidence4: "",
  endDatePrevResidence5: "",
  marriageStartDate: "",
  marriageEndDate: "",
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
    membersOccupation: yup.string(),
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
    issueYear: yup.string().when("accompanying", {
      is: true,
      then: (schema) => schema.required("Required"),
    }),
    expiryYear: yup.string().when("accompanying", {
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
  issueYear: "",
  expiryYear: "",
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

export const guarantorSchema: yup.ObjectSchema<GuarantorInfoInterface> = yup.object().shape({
  guarantorName: yup.string().required("Required"),
  relationshipToGuarantor: yup.string().required("Required"),
  guarantorAddress: yup.string().required("Required"),
  guarantorPhone: yup.string().required("Required"),
  guarantorWorth: yup.string().required("Required"),
});

export const guarantorKeys: GuarantorInfoInterface = {
  guarantorName: "",
  relationshipToGuarantor: "",
  guarantorAddress: "",
  guarantorPhone: "",
  guarantorWorth: "",
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
export const documentsArr: { documents: DocumentInterface[]; } = {
  documents: [],
};
export const visaInitVals: VisaApplicationFormInterface = {
  tripDetails: detailsKeys,
  ...educationsArr,
  ...employmentsArr,
  ...familyInfoArr,
  personalInfo: personalInfoKeys,
  ...documentsArr,
  guarantorInfo: guarantorKeys,
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

export const accompanyVal: IAccompany = {
  memberName: '',
  relationship: '',
  memberAddress: '',
  memberOccupation: '',
  memberEmail: '',
  phoneNumber: '',
  memberWorth: '',
  gender: '',
  dateOfBirth: '',
  passportNumber: '',
  passportIssuedCountry: { name: "", code: "", flag: "" },
  issueDate: '',
  expiryDate: ''
};

export const accompanySchema: yup.ObjectSchema<IAccompany> = yup.object().shape({
  memberName: yup.string().required("Name is required"),
  relationship: yup.string().required('Relationship is required'),
  memberAddress: yup.string().required("Address is required"),
  memberOccupation: yup.string().required("Occupation is Required"),
  memberEmail: yup.string().required("Email is required").email("Enter a valid email"),
  phoneNumber: yup.string().required("Phone number is required"),
  memberWorth: yup.string().required("Net Worth is required"),
  gender: yup.string().required("Gender is required"),
  dateOfBirth: yup.string().required("Date of Birth is required"),
  passportNumber: yup.string().required("Passport number is required"),
  passportIssuedCountry: yup.object().shape({
    name: yup.string().required("Name Required"),
    code: yup.string().required("Code Required"),
    flag: yup.string().required("Flag Required"),
  }),
  issueDate: yup.string().required("Issue Date is required"),
  expiryDate: yup.string().required("Expiry Date is required")
});

export const updatePasswordVal: IUpdatePassword = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
};

export const updatePasswordSchema: yup.ObjectSchema<IUpdatePassword> = yup.object().shape({
  oldPassword: yup.string().required("Old Password is Required"),
  newPassword: yup.string().required("New Password is Required"),
  confirmPassword: yup.string().oneOf([yup.ref('newPassword')], 'Passwords must match').required("Confirm New Password")
});

export const referralInfoSchema: yup.ObjectSchema<Omit<IReferralBankInfo, 'referrerId'>> = yup.object().shape({
  accountName: yup.string().required("Account Name is required"),
  accountNumber: yup.string().required("Account Number is required"),
  bankName: yup.string().required('Bank is required')
});

export const referralInfoVal: Omit<IReferralBankInfo, "referrerId"> = {
  accountName: "",
  accountNumber: "",
  bankName: ""
};

export const setDependantsSchema: yup.ObjectSchema<{ numberOfDependants: number; }> = yup.object().shape({
  numberOfDependants: yup.number().required()
});

export const setDependantsVal: { numberOfDependants: number; } = {
  numberOfDependants: 1
};