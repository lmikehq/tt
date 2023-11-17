export interface TokenizeDataResponse {
  status: string;
  token: string;
  encrypted_cvv: string;
  bin_number: string;
  last_4_digits: string;
  holder_name: string;
  expiration: string;
  vendor: string;
  issuer: string | null;
  country_code: string;
  level: string;
  type: string;
  pass_luhn_validation: boolean;
}
