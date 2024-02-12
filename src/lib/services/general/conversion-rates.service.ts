import { currencyApiClient } from "@/lib/axios/axios-client";
import { GetConversionRatesResponse } from "@/lib/types/request-models/general/conversion-rates.type";
import { toast } from "react-hot-toast";
const API_KEY = process.env.NEXT_PUBLIC_CURRENCY_API_KEY


export class ConversionRatesService {
    static getConversionRates = async () => {
        return await currencyApiClient
            .get<any, GetConversionRatesResponse>(
                `?apikey=${API_KEY}`,
            )
            .then((response) => {
                return response;
            })
            .catch((error) => {
                toast.error(error.response.data.message);
                throw error;
            });
    };
}