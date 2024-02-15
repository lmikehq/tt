import { create } from "zustand";
import { AuthUser } from "../types/response-models/auth/auth.type";

interface userState {
  user: AuthUser | null;
  geoInfo: LocationData | null;
  authModal: boolean;
}

export interface LocationData {
  city: string;
  country: string;
  country_code: string;
  country_code3: string;
  continent_code: string;
  ip: string;
  latitude: string;
  longitude: string;
  region: string;
}

interface Action {
  setUser: (e: any) => void;
  setGeoInfo: (e: any) => void;
  setAuthModal: (x: boolean) => void;
}

export const useUserStore = create<userState & Action>(
  (set): userState & Action => ({
    user: null,
    geoInfo: null,
    authModal: false,
    setUser: (user: AuthUser) => set({ user }),
    setGeoInfo: (geoInfo: LocationData) => set({ geoInfo }),
    setAuthModal: (x: boolean) => set({ authModal: x })
  })
);