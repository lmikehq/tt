import { useCallback, useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { PaystackProps } from "react-paystack/dist/types";
export type Currency = "NGN" | "GHS" | "USD" | "ZAR" | "KES" | "XOF";

export function usePaystack() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState(null);
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_KEY as string;
  const config: PaystackProps = {
    publicKey,
    email: "", // Temporarily empty
    amount: 0, // Temporarily 0
    currency: "NGN", // Temporarily NGN
    metadata: {
      ...{ custom_fields: [] },
    },
    reference: "",
  };
  const [data, setData] = useState(config);
  const initializePayment = usePaystackPayment(data);

  const startPayment = 
    useCallback((paymentCallback: { onSuccess: any; onCancel: any }) => {
      setLoading(true);
      setError("");
      setResponse(null);

      function onSuccess() {
        setLoading(false);
        setError("");
        paymentCallback.onSuccess();
      }

      function onCancel() {
        setLoading(false);
        setError("");
        setResponse(null);
        paymentCallback.onCancel();
      }

      const res = initializePayment(onSuccess, onCancel);
    },
    [setLoading, setError, setResponse, data, initializePayment]
  );

  return { startPayment, loading, error, response, setData, data };
}
