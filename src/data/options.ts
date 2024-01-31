interface OptionsEnum {
  label: string, value: string;
}

const visaEnum: OptionsEnum[] = [
  { value: "AWAITING_EMBASSY", label: "Awaiting Embassy Decision" },
  { value: "AWAITING CONFIRMATION", label: "Awaiting Confirmation" },
  { value: "APPLICATION_IN_PROGRESS", label: "Application in Progress" },
  { value: "VISA_FEE_REQUIRED", label: "Visa Fees Required" },
  { value: "AWAITING_PASSPORT", label: "Awaiting Passport Collection" },
  { value: "PROCESSING_FEE", label: "Processing Fees Required" },
  { value: "COURIER_FEE", label: "Courier Fees Required" },
  { value: "APPROVED", label: "Approved" },
  { value: "DECLINED", label: "Declined" },
  { value: "PASSPORT_REQUIRED", label: "Passport Physically Required" },
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
  { value: 'DESCENDING', label: 'Oldest to Newest' },
  { value: 'ASCENDING', label: 'Newest to Oldest' },
  { value: 'PENDING', label: 'Pending Status' },
  { value: 'SUCCESSFUL', label: 'Successful Status' },
];

const paymentsEnum: OptionsEnum[] = [
  // { value: 'DESCENDING', label: 'Oldest to Newest' },
  { value: 'ALL', label: 'All' },
  { value: 'PENDING', label: 'Pending Status' },
  { value: 'SUCCESS', label: 'Successful Status' },
  { value: 'NOT PAID', label: 'Not Paid' },
  { value: 'FAILED', label: 'Failed' }
];

const flightsEnum: OptionsEnum[] = [
  { value: 'DESCENDING', label: 'Oldest to Newest' },
  { value: 'ASCENDING', label: 'Newest to Oldest' },
];

const staysEnum: OptionsEnum[] = [
  { value: 'DESCENDING', label: 'Oldest to Newest' },
  { value: 'ASCENDING', label: 'Newest to Oldest' },
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