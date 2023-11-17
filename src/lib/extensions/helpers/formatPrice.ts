export const formatPrice = ({
    total = 0,
    currency,
    numberOfDecimalDigits,
}: {
    total?: number;
    currency?: string;
    numberOfDecimalDigits?: number;
}) => {
    return Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: currency ?? "NGN",
        minimumFractionDigits: numberOfDecimalDigits ?? 2,
        maximumFractionDigits: numberOfDecimalDigits ?? 2,
    }).format(total);
};

export const formatPriceWithoutCurrency = (total: number) => {
    return Intl.NumberFormat("en-NG").format(total);
};

export const getCurrency = (currency?: string) => {
    return Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: currency ?? "NGN",
    })
        .format(0)
        .charAt(0);
};
