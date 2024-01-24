import { extractSearchParamsFromUrl } from "@/lib/extensions/helpers/constructQuery";

export const extractFlightDataFromParams = ({
    flyFrom,
    url,
}: {
    flyFrom: string;
    url: string;
}) => {
    const formattedData: any[] = flyFrom.split("~").map((e) => ({
        fly_from: e,
    }));
    console.log(formattedData, "formm");
    const urlData = extractSearchParamsFromUrl({ url });

    console.log(flyFrom, urlData, formattedData);
    Object.keys(urlData).forEach((key) => {
        if (urlData[key].split("~").length > 1) {
            urlData[key].split("~").forEach((el, i) => {
                formattedData.splice(i, 1, {
                    ...formattedData[i],
                    [key]: el,
                });
            });
        } else {
            formattedData[0][key] = urlData[key];
        }
    });

    return formattedData;
};
