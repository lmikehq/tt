'use client'

import { FlightProvider } from '@/lib/extensions/context'
import apiService from '@/lib/extensions/hook/apiService';
import { useUserStore } from '@/lib/store/useStore';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'


function Providers({ children }: { children: React.ReactNode }) {
    const { user, setUser } = useUserStore()
    const router = useRouter()

    async function fetchUser() {
        if (user) return user;
        const res = (await apiService("/user")) as any;
        if (!res?._id) return router.push("/auth/login")
        setUser(res);
        return res;
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            fetchUser();
        }
    }, [])

    return (
        <FlightProvider>
            {children}
        </FlightProvider>
    )
}

export default Providers