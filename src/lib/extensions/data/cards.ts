const cards = [
  {
    name: "Visa",
    image: "/assets/cards/visa.svg",
    code: "VISA"
  },
  {
    name: "MasterCard",
    image: "/assets/cards/mastercard.svg",
  },
  {
    name: "American Express",
    image: "/assets/cards/amex.svg",
  },
  {
    name: "Discover",
    image: "/assets/cards/discover.svg",
  },
  {
    name: "JCB",
    image: "/assets/cards/jcb.svg",
  },
  {
    name: "UnionPay",
    image: "/assets/cards/unionpay.svg",
  },
  {
    name: "PayPal",
    image: "/assets/cards/paypal.svg",
  },
];

const findCards = ({ name }: { name: string }) => {
  const regex = new RegExp(`^${name}$`, "i");
  const country = cards.find((el) => regex.test(el.name));

  return {
    name: country?.name ?? "",
    image: country?.image ?? "",
    code: country?.code?? "",
  };
};

export { cards, findCards };
