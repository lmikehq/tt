import Visa from "./visa";
export interface CountryType {
  name: string;
  flag: string;
  code: string;
}
export interface LabelType {
  name: string;
  flag: string;
  code: string;
}

function Stays() {
 
  return <Visa />;
}

export default Stays;
