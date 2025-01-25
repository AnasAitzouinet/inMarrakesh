import { z } from "zod"

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

export type LoginSchemaType = z.infer<typeof LoginSchema>

export const SignUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    firstName: z.string(),
    lastName: z.string(),
    phone: z.string().min(10),
})

export type SignUpSchemaType = z.infer<typeof SignUpSchema>


export const AddDestinationSchema = z.object({
    title: z.string().min(2),
    type: z.enum(["Trips", "Activities"]),
    subtitle: z.string().min(2),
    VideoUrl: z.string().url(),
    images: z.array(z.instanceof(File)).optional(),
    image: z.string().optional(),
    pricePrivate: z.string(),
    priceShuttle: z.string(),

})