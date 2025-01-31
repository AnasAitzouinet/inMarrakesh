import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";
 
export const GET  = async (req: NextRequest) => {
	try {
        const res = await auth.handler(req);
        return enableCORS(res);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.stack)
        }
        console.log(error)
    }
};

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

export function enableCORS(response: Response) {
    response.headers.set('Access-Control-Allow-Origin', 'http://admin.localhost:3000');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return response;
  }