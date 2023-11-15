import dayjs, { Dayjs } from "dayjs";
var advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)
import axios from "axios";


export function get100Years(before: boolean = false) {
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let i = 0; i < 100; i++) {
    if (before) {
      years.push(currentYear + i);
      continue;
    }
    years.push(currentYear - i);
  }

  return years;
}
export const validateEmail = (email: string): boolean => {
  const regexPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return regexPattern.test(email);
};

export function concatArrays(
  strings: string[],
  numbers: number[]
): (string | number)[] {
  return [...strings, ...numbers];
}

export function safelyConvertToNumber(value?: string | number): number {
  const numValue = parseInt(value as string);
  return isNaN(numValue) ? 0 : numValue;
}

export function checkIfFieldHasError(obj: any, field: string) {
  const error: { constraints: string } = obj.find((err: any) =>
    err.property.includes(field)
  );
  if (error) return error.constraints;
}

export function formatDate(day: Dayjs, format?: string) {
  return day.format(format ?? "DD/MM/YYYY");
}

export async function fetchHTMLContent(country: string) {
  try {
    const res = await axios.get(
      `https://ttravels-assets.s3.eu-west-2.amazonaws.com/countries/${country}.html`
    );
    return res.data;
  } catch (err) {
    console.log(`Error fetching ${country}: `, err);
  }
}

export function allCaps(text: string | number) {
    return String(text ?? '').toUpperCase()
}
export function capCase(text = '', splitter = ' ') {
    let newStr = String(text ?? '').split(splitter)
    if (!text) {
        return ''
    } else {
        return newStr.map(e => `${String(e[0]).toUpperCase()}${String(e.slice(1)).toLowerCase()}`).join(' ') ?? ''
    }
}

export function cleanObject(obj: { [k: string]: any }) {
    const newObj: any = {}
    Object.keys(obj).forEach(e => {
        if (obj[e] != undefined && obj[e] != null) {
            newObj[e] = obj[e]
        }
    })
    return newObj
}

export function numSort (arr: any[] = [], keyToCompare: string, order?: 'asc' | 'desc') {
    if (order === 'asc') {
        return arr.sort((a, b) => (parseFloat(keyToCompare ? a[keyToCompare] : a) - parseFloat(keyToCompare ? b[keyToCompare] : b)))
    } else {
        return arr.sort((a, b) => (parseFloat(keyToCompare ? b[keyToCompare] : b) - parseFloat(keyToCompare ? a[keyToCompare] : a)))
    }
}
export function dateSort (arr: any[] = [], key: string, order?: 'asc' | 'desc') {
    if (order === 'asc') {
        return arr.sort((a, b) => Number(dayjs(a[key]).format('X')) - Number(dayjs(b[key]).format('X')))
    } else {
        return arr.sort((a, b) => Number(dayjs(b[key]).format('X')) - Number(dayjs(a[key]).format('X')))
    }
}

export function moneyFormat(val: string | number) {
    return Number(val).toFixed(2)
} 