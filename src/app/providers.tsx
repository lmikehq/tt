import { FlightProvider } from '@/lib/extensions/context'
import React from 'react'

function Providers({ children }: { children: React.ReactNode }) {
    return (
        <FlightProvider>
            {children}
        </FlightProvider>
    )
}

export default Providers