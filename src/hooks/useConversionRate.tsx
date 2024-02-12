import { useGetConversionRates } from "@/lib/hooks/general/conversion-rates.hook"

/**
    Base Currency: USD
*/
export function useConversionRate() {
    const { data, isLoading, isError } = useGetConversionRates()

    const convertCurrency = ({ convertFrom, convertTo, amount }: { convertFrom: string; convertTo: string; amount: string | number; }) => {
        const rates = data?.data ?? {}
        const parsedAmount = parseFloat(String(amount))
        const usdAmount = rates[convertFrom] ? (parsedAmount / rates[convertFrom]?.value) : 0
        const finalAmount = usdAmount * rates[convertTo]?.value
        const finalRate = parsedAmount / finalAmount
        return {
            amount: finalAmount,
            rate: finalRate
        }
    }

    return {
        convertCurrency
    }
}