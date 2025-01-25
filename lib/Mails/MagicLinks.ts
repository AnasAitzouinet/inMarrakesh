import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendMagicLinkEmail = async ({ email, token, url }: { email: string, token: string, url: string }) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Letheio <onboarding@letheio.com>',
            to: [email],
            subject: 'Your Magic Link',
            html: `
                <p>Click the link below to sign in:</p>
                <a href="${url}?token=${token}">Sign In</a>
                token = ${token}
                callback = ${url}
                <p>This link will expire in 10 minutes.</p>
            `,
        });

        if (error) {
            console.error('Error sending magic link email:', error);
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Failed to send magic link email:', error);
        throw error;
    }
};
