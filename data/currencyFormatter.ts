export default function currencyFormatter(
  amount: number | string,
  currency: string = "NGN"
): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  });

  return formatter.format(Number(amount));
}
