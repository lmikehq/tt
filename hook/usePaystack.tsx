'use client'
// @ts-ignore
import PaystackPop from "@paystack/inline-js";
import { useCallback, useState } from "react";

export function usePaystack() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState(null);
  
  const initializePayment = useCallback(
    (data: {
      email: string;
      amount: number;
      currency?: string;
      metadata?: any;
    }) => {
      setLoading(true);
      setError("");
      setResponse(null);
      const paystack = new PaystackPop();
      paystack.newTransaction({
        key: process.env.NEXT_PUBLIC_PAYSTACK_KEY,
        email: data.email,
        amount: data.amount,
        currency: data.currency || "NGN",
        metadata: data.metadata,
        onSuccess: (transaction: any) => {
          console.log("transaction successfull");
          setLoading(false);
          setError("");
          setResponse(transaction);
        },
        onCancel: () => {
          console.log("transaction cancelled");
          setLoading(false);
          setError("Payment cancelled");
          setResponse(null);
        },
      });
      console.log("got here too", paystack);

    },
    [setLoading, setError, setResponse]
  );
  return { initializePayment, loading, error, response };
}
