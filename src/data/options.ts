interface OptionsEnum {
  label: string, value: string;
}

const visaEnum: OptionsEnum[] = [
  { value: "AWAITING EMBASSY", label: "Awaiting Embassy Decision" },
  { value: "AWAITING CONFIRMATION", label: "Awaiting Confirmation" },
  { value: "APPLICATION IN PROGRESS", label: "Application in Progress" },
  { value: "VISA FEE REQUIRED", label: "Visa Fees Required" },
  { value: "AWAITING PASSPORT", label: "Awaiting Passport Collection" },
  { value: "PROCESSING FEE REQUESTED", label: "Processing Fees Required" },
  { value: "COURIER FEE", label: "Courier Fees Required" },
  { value: "APPROVED", label: "Approved" },
  { value: "DECLINED", label: "Declined" },
  { value: "PASSPORT REQUIRED", label: "Passport Physically Required" },
  { value: "ADDITIONAL DOCUMENT REQUESTED", label: "Additional Document Requested" },
  { value: "ADDITIONAL INFORMATION REQUESTED", label: "Additional Info Requested" },
  { value: "ADDITIONAL INFORMATION PROVIDED", label: "Additional Info Provided" },
  { value: "FORM FEE REQUESTED", label: "Form fee Requested" }
];

const notificationEnum: OptionsEnum[] = [
  // { value: 'DESCENDING', label: 'Oldest to Newest' },
  // { value: 'ASCENDING', label: 'Newest to Oldest' },
  { value: 'UNREAD', label: 'Unread Messages' },
  { value: 'READ', label: 'Read Messages' },
];

const favouritesEnum: OptionsEnum[] = [
  { value: 'DESCENDING', label: 'Oldest to Newest' },
  { value: 'ASCENDING', label: 'Newest to Oldest' },
];

const referralsEnum: OptionsEnum[] = [
  { value: 'PENDING', label: 'Pending ' },
  { value: 'SUCCESSFUL', label: 'Successful ' },
];

const paymentsEnum: OptionsEnum[] = [
  // { value: 'DESCENDING', label: 'Oldest to Newest' },
  { value: 'ALL', label: 'All' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'SUCCESS', label: 'Successful' },
  { value: 'NOT PAID', label: 'Not Paid' },
  { value: 'FAILED', label: 'Failed' }
];

const flightsEnum: OptionsEnum[] = [
  { value: 'ALL', label: 'ALL' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'IS_CONFIRMED', label: 'Is Confirmed' },
  { value: 'IS_DELAYED', label: 'Is Delayed' },
  { value: 'IS_CANCELLED', label: 'Is Cancelled' },
];

const staysEnum: OptionsEnum[] = [
  { value: 'PENDING', label: 'Pending Status' },
  { value: 'COMPLETE', label: 'Successful Status' },
  { value: 'FAILED', label: 'Failed' }
];

export const visaOptions = visaEnum.map((key, _index) => (
  {
    option: key.label,
    name: key.label,
    value: key.value
  }
));

export const notificationOptions = notificationEnum.map((key, _index) => (
  {
    option: key.label,
    name: key.label,
    value: key.value
  }
));

export const favouritesOptions = favouritesEnum.map((key) => (
  {
    option: key.label,
    name: key.label,
    value: key.value
  }
));

export const referralOptions = referralsEnum.map((key) => (
  {
    option: key.label,
    name: key.label,
    value: key.value
  }
));

export const paymentOptions = paymentsEnum.map((key, _index) => (
  {
    option: key.label,
    name: key.label,
    value: key.value
  }
));

export const flightOptions = flightsEnum.map((key, _index) => (
  {
    option: key.label,
    name: key.label,
    value: key.value
  }
));

export const staysOptions = staysEnum.map((key, _index) => (
  {
    option: key.label,
    name: key.label,
    value: key.value
  }
));

export const dependantsRelationship = [
  "Spouse",
  "Son",
  "Daughter",
  "Father",
  "Mother",
  "Brother",
  "Sister",
  "Adopted Son",
  "Adopted Daughter",
  "Step-Son",
  "Step-Daughter"
];