'use client'

import { useFlightBookingStore } from "@/lib/store/flight/booking.store";
import { useUserPreferencesStore } from "@/lib/store/preferences.store";
import { FlightProvider } from "@lib/extensions/context";
import dayjs from "dayjs";
import { useEffect, useRef } from "react";

interface layoutProps {
  children: React.ReactNode;
}

// export const metadata = {
//   title: "Rent your rooms",
//   description: "Rent a room here",
// };

export default function StaysLayout({ children }: layoutProps) {
    const { preFerredCurrency } = useUserPreferencesStore((state) => state);
    const { searchFlightToGetKiwiConversionRate } = useFlightBookingStore((state) => state);

    const isMounted = useRef(false);

    useEffect(() => {
        if (isMounted.current) {
            const currentDate = dayjs();
            const futureDate = currentDate.add(3, "day");
            const dateFrom = futureDate.format("DD/MM/YYYY");
            searchFlightToGetKiwiConversionRate({ dateFrom });
        } else {
            isMounted.current = true;
        }
    }, [preFerredCurrency]);

  return <FlightProvider>{children}</FlightProvider>;
}
