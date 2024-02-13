function getMonthAndDay(checkIn: string, checkOut: string) {
  const checkInObj = new Date(checkIn);
  const checkOutObj = new Date(checkOut);

  const startMonthAbrv = checkInObj.toLocaleDateString('default', { month: 'short' });
  const startDay = checkInObj.getDate();
  const endMonthAbrv = checkOutObj.toLocaleDateString('default', { month: 'short' });
  const endDay = checkOutObj.getDate();

  const range = Math.floor((checkOutObj.getTime() - checkInObj.getTime()) / (1000 * 60 * 60 * 24));


  return {
    checkInMonth: startMonthAbrv.toUpperCase(),
    checkInDay: startDay,
    checkOutMonth: endMonthAbrv.toUpperCase(),
    checkOutDay: endDay,
    range
  };
}

export default getMonthAndDay;