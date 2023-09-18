export const urlString = (url: string) =>
  url.toLocaleLowerCase().replace(/[, ]/g, "-");


export const unUrlString = (url: string) => url.replace(/-/g, " ");