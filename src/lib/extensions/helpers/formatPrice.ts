export const formatPrice = (total: number, currency?: string) => {
    return Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: currency ?? "NGN",
    }).format(total);
};

export const formatPriceWithoutCurrency = (total: number) => {
    return Intl.NumberFormat("en-NG").format(total);
};
