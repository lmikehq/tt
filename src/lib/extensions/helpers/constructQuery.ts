// THIS IS THE FUNCTION TO ADD QUERY PARAMS TO THE URL 
export function constructQueryFromParams(params: {
  [key: string]: any
}): string {
  const queryParams: string[] = []

  for (const key in params) {
    if (params.hasOwnProperty(key) && params[key] !== undefined) {
      queryParams.push(`${key}=${encodeURIComponent(params[key])}`)
    }
  }

  return `?${queryParams.join("&")}`
}

export function constructParamsFromQuery(queryString: string): {
  [key: string]: string
} {
  const queryObject: { [key: string]: string } = {}

  if (queryString.startsWith("?")) {
    queryString = queryString.slice(1)
  }

  const keyValuePairs = queryString.split("&")

  for (const pair of keyValuePairs) {
    const [key, value] = pair.split("=")
    if (key && value) {
      queryObject[key] = decodeURIComponent(value)
    }
  }

  return queryObject
}

export function extractSearchParamsFromUrl({ url }: { url: string }) {
  const newUrl = new URL(url)

  const searchParams = newUrl.searchParams

  const searchParamsObject: Record<string, string> = {}

  searchParams.forEach((value, key) => {
    searchParamsObject[key] = value
  })

  return searchParamsObject
}
