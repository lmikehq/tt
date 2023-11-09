export const formatPrice = (total: number, currency?: string) => {
    return Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: currency ?? "NGN",
    }).format(total);
};
