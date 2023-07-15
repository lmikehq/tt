"use client";
import { usePaystackPayment } from "react-paystack";

import { useCallback, useState } from "react";
export type Currency = "NGN" | "GHS" | "USD" | "ZAR" | "KES" | "XOF";
export function usePaystack() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState(null);

  const initializePayment = useCallback(
    (data: {
      email: string;
      amount: number;
      currency?: Currency;
      metadata?: any;
      ref?: string;
    }) => {
      const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string;
      setLoading(true);
      setError("");
      setResponse(null);
      const onSuccess = (transaction: any) => {
        console.log("transaction successfull");
        setLoading(false);
        setError("");
        setResponse(transaction);
      };
      const onCancel = () => {
        console.log("transaction cancelled");
        setLoading(false);
        setError("Payment cancelled");
        setResponse(null);
      };
      const initPayment = usePaystackPayment({
        publicKey,
        email: data.email,
        amount: data.amount * 100,
        currency: data.currency || "NGN",
        metadata: data.metadata,
        reference: data.ref || new Date().getTime().toString(),
      });
      initPayment((x: any) => onSuccess(x), onCancel);
    },
    [setLoading, setError, setResponse]
  );
  return { initializePayment, loading, error, response };
}
