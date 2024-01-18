interface Country {
  name: string
  code: string
}

interface InfoRequest {
  _id: string
  infoType: string
  information: string[]
  responses: any[]
  description: string
  visaId: string
  accountId: string
  requestedBy: string
  isAnswered: boolean
  adminAcknowledged: boolean
  createdAt: string
  updatedAt: string
}

interface Payment {
  _id: string
  gateway: string
  method: string
  totalAmount: number
  currency: string
  status: string
  description: string
  oneTime: boolean
  fee: number
  service: string
  paymentIntent: string
  reference: string
  checkoutUrl: string
  isPartPayment: boolean
  serviceID: string
  user: string
  createdAt: string
  updatedAt: string
}


export interface VisaApplication {
  _id: {
    $oid: string
  }
  homeCountry: Country
  destination: Country
  travellingBy: string
  documents: Document[]
  visaType: string
  statementOfPurpose: string
  applicationType: string
  user: {
    $oid: string
  }
  guarantorInformation: {
    guarantorName: string
    relationshipToGuarantor: string
    guarantorAddress: string
    guarantorPhone: string
    guarantorWorth: string
  }
  tripInformation: {
    tripDurationStartDate: string
    tripDurationEndDate: string
    tripLocation: string
    contactInLocationLastName: string
    contactInLocationFirstName: string
    contactInLocationAddress: string
    contactInLocationRelationship: string
    contactInLocationPhoneNumber: string
  }
  primaryTraveller: PrimaryTraveller
  familyInformation: FamilyInformation
  uniqueVisaId: string
  payments: Payment[]
  infoRequests: InfoRequest[]
  applicationStatus: string
  active: boolean
  usedFormFeeVoucher: boolean
  applicationUpdatedBy: {
    $oid: string
  }
  createdAt: {
    $date: string
  }
  updatedAt: {
    $date: string
  }
}

export interface FamilyMember {
  passportNumber: string
  expiryYear: number
  gender: string
  dateOfBirth: string
  membersName: string
  relationshipToPrimary: string
  address: string
  membersPhoneNumber: string
  membersEmail: string
  issueYear: number
  accompanying: boolean
  status: string
  updatedBy: string
}

interface FamilyInformation {
  parentDetails: FamilyMember[]
  siblingDetails: FamilyMember[]
  immediateFamilyInfo: FamilyMember[]
}

interface PreviousCountryOfResidence {
  country: Country
  since: string
  till: string
}

interface Employment {
  companyName: string
  jobTitle: string
  employmentType: string
  companyLocation: string
  startYear: number
  stillWorking: boolean
}

interface Education {
  school: string
  degree: string
  fieldOfStudy: string
  cgpa: number
  location: string
  startYear: number
  stillAtSchool: boolean
  endYear: number
}


interface PrimaryTraveller {
  personalDetails: {
    firstName: string
    middleName: string
    lastName: string
    previousSurname: string
    dateOfBirth: string
    email: string
    placeOfBirth: string
    stateOfOrigin: string
    phoneNumber: string
    lgaOfOrigin: string
    nativeLanguage: string
    meansOfId: string
    idNumber: string
    issueDate: string
    expiryDate: string
    address: string
    gender: string
  }
  citizenshipInformation: {
    countryOfCitizenship: Country
    countryOfResidence: Country
    countryApplyingFrom: Country
    statusOfResidence: string
    startDateOfResidence: string
    placeOfOrigin: string
    previousCountryOfResidences: PreviousCountryOfResidence[]
  }
  passportInformation: {
    number: string
    issuedCountry: Country
    issuedDate: string
    expiryDate: string
  }
  marriageInformation: {
    maritalStatus: string
    partnersName: string
    marriageStartDate: string
  }
  employment: Employment[]
  education: Education[]
  backgroundInformation: {
    tuberculosis: string
    mentalDisorder: string
    mentalDisorderDetails: string
    remainbeyondValidity: string
    refusedBefore: string
    refusedBeforeDetails: string
    arrestedBefore: string
    arrestedBeforeDetails: string
    servedInMilitary: string
    servedInMilitaryDetails: string
    memberOfViolentGroup: string
    participatedInViolentActivities: string
  }
  memberApStatus: string
  updatedBy: {
    $oid: string
  }
}