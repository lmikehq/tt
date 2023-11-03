import dayjs from "dayjs";

export const calculateTime = (depature: string, arrival: string) => {
    const utcDeparture = depature;
    const utcArrival = arrival;
    const departureTime = dayjs(utcDeparture);
    const arrivalTime = dayjs(utcArrival);

    //calculate the diff in minutes
    const duration = arrivalTime.diff(departureTime, "minute");
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    const formattedDuration = `${hours}hr ${minutes}mins`;

    return formattedDuration;
};
