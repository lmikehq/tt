export const ConvertDateToCad = (originalDate: string, format: string = 'en-CA') => {
  const [day, month, year] = originalDate.split('/')
  const canada_date = new Date(`${year}-${month}-${day}`).toLocaleDateString('en-CA')
  return canada_date
}