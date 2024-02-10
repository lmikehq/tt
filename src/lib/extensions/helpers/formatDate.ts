import dayjs, { Dayjs } from "dayjs";

export const formatStringToDayjs = (date: string): Dayjs => {
    const parts = date.split("/");
    const formattedDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    return dayjs(formattedDate);
};
