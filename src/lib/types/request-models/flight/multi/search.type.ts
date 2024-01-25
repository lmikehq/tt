import { extractSearchParamsFromUrl } from "@/lib/extensions/helpers/constructQuery";
import { shareCheckedAndCabinBaggage } from "../booking.type";

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
    let urlData = extractSearchParamsFromUrl({ url });
    const adults = Number(urlData.adults);
    const children = Number(urlData.children);
    const cabin = Number(urlData.cabinBags);
    const checked = Number(urlData.checkedBags);

    const sharedBags = shareCheckedAndCabinBaggage({
        adults,
        children,
        cabin,
        checked,
    });

    urlData = {
        ...urlData,
        ...sharedBags,
    };

    delete urlData.checkedBags;
    delete urlData.cabinBags;

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
