export const formatFlightDate = (date: string | undefined) => {
  if (date === undefined) {
    return { day: 'Null', month: 'Null' };
  }

  const departure_time_utc = new Date(date);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const day = departure_time_utc.getUTCDate();
  const month = months[departure_time_utc.getUTCMonth()];
  return { day: day.toString(), month };
};

export const formatFlightTime = (time: string) => {
  const internationalTime = new Date(time);
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  } as Intl.DateTimeFormatOptions;
  return new Intl.DateTimeFormat('en-US', options).format(internationalTime).toString();
};