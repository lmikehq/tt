"use client";

import { FlightProvider } from "@/lib/extensions/context";
import apiService from "@/lib/extensions/hook/apiService";
import { useUserStore } from "@/lib/store/useStore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Providers({ children }: { children: React.ReactNode }) {
    const { user, setUser } = useUserStore();
    const [initialized, setInitialized] = useState(false);
    const router = useRouter();

    async function fetchUser() {
        if (user) {
            setInitialized(true);

            return user;
        }
        const res = (await apiService("/user")) as any;
        // if (!res?._id) return router.push("/auth/login")
        setInitialized(true);
        setUser(res);
        return res;
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            fetchUser();
        }
    }, []);

    return <FlightProvider>{initialized && children}</FlightProvider>;
}

export default Providers;
