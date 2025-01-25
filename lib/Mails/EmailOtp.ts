import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendOtpEmailProps {
    email: string;
    otp: string;
    type: "email-verification" | "forget-password" | "sign-in";
}

export const sendOtpEmail = async ({ email, otp, type }: SendOtpEmailProps) => {
    let subject = "";
    let text = "";

    switch (type) {
        case "email-verification":
            subject = "Verify your email address";
            text = `Your verification code is: ${otp}`;
            break;
        case "forget-password":
            subject = "Reset your password";
            text = `Your password reset code is: ${otp}`;
            break;
        case "sign-in":
            subject = "Your sign-in code";
            text = `Your sign-in code is: ${otp}`;
            break;
        default:
            throw new Error("Invalid OTP type");
    }

    await resend.emails.send({
        from: 'Letheio <onboarding@letheio.com>',
        to: email,
        subject,
        text,
    });
};
