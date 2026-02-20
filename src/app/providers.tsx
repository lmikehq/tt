"use client";

import { FlightProvider } from "@/lib/extensions/context";
import apiService from "@/lib/extensions/hook/apiService";
import { useUserStore } from "@/lib/store/useStore";
import React, { useEffect } from "react";

function Providers({ children }: { children: React.ReactNode }) {
    const { user, setUser } = useUserStore();

    async function fetchUser() {
        if (user) return user;
        try {
            const res = (await apiService("/user")) as any;
            if (res?._id) setUser(res);
        } catch {
            // User fetch failed — app still renders
        }
    }

    useEffect(() => {
        fetchUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Always render children — don't block on user fetch
    return <FlightProvider>{children}</FlightProvider>;
}

export default Providers;
