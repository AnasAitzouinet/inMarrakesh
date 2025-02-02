import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";

export const { GET } = toNextJsHandler(auth);

export const POST = async (req: NextRequest) => {
    try {
        const res = await auth.handler(req);
        return res;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.stack)
        }
        console.log(error)
    }
};
