import { Divider } from "@/components/atoms/divider";
import Text from "@/components/atoms/text";
import Section from "@/components/molecules/section";
import Flex from "@/components/templates/flex";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { useFlightBookingStore } from "@/lib/store/flight/booking.store";
import { ttColors } from "@/lib/theme/colors";
import { formatDate } from "@/lib/utilFns";
import dayjs from "dayjs";
import { Box } from "@mui/material";
import React from "react";
import { formatPrice } from "@/lib/extensions/helpers/formatPrice";
import { useUserPreferencesStore } from "@/lib/store/preferences.store";
import PriceSummaryWidget from "./PriceSummaryWidget";

function OverviewSystem() {
    const { isMobile } = useScreenResolution();
    const { saveBookingResponse, getBookingByIdResponse } =
        useFlightBookingStore((state) => state);
    const { preFerredCurrency, conversionRate } = useUserPreferencesStore(
        (state) => state
    );

    const basePrice = formatPrice({
        total:
            (saveBookingResponse?.flightsPrice ??
                getBookingByIdResponse?.flightsPrice ??
                0) * conversionRate,
        currency: preFerredCurrency,
        numberOfDecimalDigits: 2,
    });

    const serviceCharge = formatPrice({
        total:
            (saveBookingResponse?.service ??
                getBookingByIdResponse?.sp_fee ??
                0) * conversionRate,
        currency: preFerredCurrency,
        numberOfDecimalDigits: 2,
    });
    const discount = formatPrice({
        total: 0 * conversionRate,
        currency: preFerredCurrency,
        numberOfDecimalDigits: 2,
    });

    const total = formatPrice({
        total:
            (saveBookingResponse?.total ??
                getBookingByIdResponse?.totalAmount ??
                0) * conversionRate,
        currency: preFerredCurrency,
        numberOfDecimalDigits: 2,
    });

    return (
        <Section>
            <PriceSummaryWidget
                basePrice={basePrice}
                serviceCharge={serviceCharge}
                discount={discount}
                totalPrice={total}
                currency={preFerredCurrency}
            />
        </Section>
    );
}

export default OverviewSystem;
