export function get100Years() {
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let i = 0; i < 100; i++) {
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