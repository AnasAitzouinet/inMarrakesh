import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin, createAuthMiddleware, customSession, oAuthProxy, oneTap } from "better-auth/plugins"
import { magicLink, openAPI } from "better-auth/plugins";
import { sendMagicLinkEmail } from "./Mails/MagicLinks";
import { emailOTP } from "better-auth/plugins"
import { sendOtpEmail } from "./Mails/EmailOtp";
import { prisma } from "./prisma";
import { nextCookies } from "better-auth/next-js";


export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    rateLimit: {
        window: 10,
        max: 100
    },
    plugins: [
        magicLink({

            sendMagicLink: async ({ email, token, url }, request) => {
                await sendMagicLinkEmail({ email, token, url })
            },


        }),
        emailOTP({
            async sendVerificationOTP({ email, otp, type }) {
                await sendOtpEmail({ email, otp, type })
            },
        }),
        openAPI(),
        admin(),
        oneTap(),
        oAuthProxy(),
        nextCookies(),
        
    ],
    socialProviders: {
        google: {
            enabled: true,
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!
            
        },

    },
    onAPIError: {
        onError(e) {
            if (e instanceof Error) {
                console.log(e.stack)
            }
            console.log(e)
        }
    }
    ,  
    account:{
        accountLinking: {
            enabled: true,
            trustedProviders: ["google"]
        }
    } 
    
});