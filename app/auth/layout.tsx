import { authClient } from '@/lib/auth-client'
import { redirect } from 'next/navigation'
import React from 'react'
import { headers } from "next/headers";
import { auth } from '@/lib/auth';

interface Props {
    children: React.ReactNode
}
export default async function layout({ children }: Props) {

    const data = await auth.api.getSession({
        headers: await headers()
    })

    if (data) {
        redirect("/Destinations")
    }

    return (
        <div className="flex min-h-svh  flex-col items-center justify-center gap-6 bg-background p-6 md:p-10 relative">
            <div className="absolute top-0 z-0 size-full rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(255,224,178,.5)_100%)]"></div>

            {children}
        </div>
    )
}
