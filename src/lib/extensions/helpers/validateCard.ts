export const validateCardType = (cardNumber: string) => {
    const cleanCardNumber = cardNumber.replace(/\D/g, "");

    switch (true) {
        case /^4[0-9]{12}(?:[0-9]{3})?$/.test(cleanCardNumber):
            return "Visa";
        case /^5[1-5][0-9]{14}$/.test(cleanCardNumber):
            return "MasterCard";
        case /^3[47][0-9]{13}$/.test(cleanCardNumber):
            return "American Express";
        case /^6(?:011|5[0-9]{2})[0-9]{12}$/.test(cleanCardNumber):
            return "Discover";
        case /^(?:2131|1800|35\d{3})\d{11}$/.test(cleanCardNumber):
            return "JCB";
        case /^62[2-9]\d{13,16}$/.test(cleanCardNumber):
            return "UnionPay";
        default:
            return "PayPal or Unknown";
    }
};
