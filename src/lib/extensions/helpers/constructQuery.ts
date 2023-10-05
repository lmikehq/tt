export function constructQuery(params: { [key: string]: any }): string {
  const queryParams: string[] = [];

  for (const key in params) {
    if (params.hasOwnProperty(key) && params[key] !== undefined) {
      queryParams.push(`${key}=${encodeURIComponent(params[key])}`);
    }
  }

  return `?${queryParams.join("&")}`;
}
