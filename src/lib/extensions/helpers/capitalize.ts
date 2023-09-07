export const capitalized = (input: string) =>
  input.replace(/\b\w/g, (char) => char.toUpperCase());
