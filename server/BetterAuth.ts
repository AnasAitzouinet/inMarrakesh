"use server"

import { auth } from "@/lib/auth"

import { headers } from "next/headers"


export async function SignInMagicLink() {
    try {
        const data = await auth.api.signInMagicLink({
            body: {
                email: "anasaw236@gmail.com",
            },
            headers: await headers(),
            
        })
        return data
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.stack)
        }
    }
}