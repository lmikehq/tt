import { create } from "zustand";

interface State {
    preFerredCurrency: string;
    preferredLanguage: string;
}
interface Actions {}

export const useUserPreferencesStore = create<State & Actions>(
    (set): State & Actions => ({
        preFerredCurrency: "NGN",
        preferredLanguage: "en",
    })
);
