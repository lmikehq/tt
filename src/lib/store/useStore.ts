import { create } from "zustand";
import { AuthUser } from "../types/response-models/auth/auth.type";

interface userState {
    user: AuthUser | null;
    geoInfo: LocationData | null;
}

interface LocationData {
    continent_code: string;
    country: string;
    country_code: string;
    country_code3: string;
    ip: string;
    latitude: string;
    longitude: string;
}

interface Action {
    setUser: (e: any) => void;
    setGeoInfo: (e: any) => void;
}

export const useUserStore = create<userState & Action>(
    (set): userState & Action => ({
        user: null,
        geoInfo: null,
        setUser: (user: AuthUser) => set({ user }),
        setGeoInfo: (geoInfo: LocationData) => set({ geoInfo }),
    })
);
