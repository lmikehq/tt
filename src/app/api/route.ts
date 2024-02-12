import { GetBankNamesProp } from "@/lib/types/response-models/dashboard";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(`https://api.flutterwave.com/v3/banks/${process.env.NEXT_PUBLIC_COUNTRY_BANK}`, {
    method: 'GET',
    headers: {
      'Content-Type': "application/json",
      "Authorization": `Bearer ${process.env.NEXT_PUBLIC_FLUTTERWAVE_SECRET_KEY}`
    },

  });
  const data = await response.json();
  const banks = data.data as GetBankNamesProp[];

  return NextResponse.json({
    status: data.status,
    message: data.message,
    banks
  });
}