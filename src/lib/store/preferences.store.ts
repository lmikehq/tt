import { create } from "zustand";

interface State {
    preFerredCurrency: string;
    preferredLanguage: string;
    conversionRate: number;
}
interface Actions {
    setConversionRate: (value: number) => void;
}

export const useUserPreferencesStore = create<State & Actions>(
    (set): State & Actions => ({
        preFerredCurrency: "NGN",
        preferredLanguage: "en",
        conversionRate: 0,
        setConversionRate: (value) => {
            set({ conversionRate: value });
        },
    })
);
