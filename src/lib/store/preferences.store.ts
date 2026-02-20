import { create } from "zustand";

interface State {
    preFerredCurrency: string;
    preferredLanguage: string;
    conversionRate: number;
    showBackDropLoader: boolean;
}

interface Actions {
    setConversionRate: (value: number) => void;
    setPreferredCurrency: (value: string) => void;
    setShowBackDropLoader: (value: boolean) => void;
}

export const useUserPreferencesStore = create<State & Actions>(
    (set): State & Actions => ({
        preFerredCurrency:
            typeof window !== "undefined"
                ? localStorage.getItem("selectedCurrency") || "NGN"
                : "NGN",
        preferredLanguage: "en",
        conversionRate: 0,
        showBackDropLoader: false,
        setConversionRate: (value: number) => {
            set({ conversionRate: value });
        },
        setShowBackDropLoader: (value: boolean) => {
            set({
                showBackDropLoader: value,
            });
        },
        setPreferredCurrency: (value: string) => {
            set({
                preFerredCurrency: value,
            });
        },
    }),
);
