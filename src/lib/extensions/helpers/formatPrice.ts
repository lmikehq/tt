export const formatPrice = ({
    total = 0,
    currency,
    numberOfDecimalDigits = 0,
}: {
    total?: number;
    currency?: string;
    numberOfDecimalDigits?: number;
}) => {
    return Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: currency ?? "NGN",
        minimumFractionDigits: numberOfDecimalDigits,
        maximumFractionDigits: numberOfDecimalDigits,
    }).format(total);
};
