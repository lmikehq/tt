interface CurrencyResponse {
    code: string;
    value: number;
}

export interface GetConversionRatesResponse {
    meta: {
        last_updated_at: string;
    };
    data: {
        [k: string]: CurrencyResponse;
    }
}