"use client"

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

// esse children pode ser um server component
// é um client component, mas a partir que esse o children como prop ele vai deixar renderizarcan

const AuthProvider = ({ children }: { children: ReactNode }) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

export default AuthProvider