"use client"
import { GalleryVerticalEnd } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { z } from "zod"
import { useState } from "react"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

  const LoginFormSchema = z.object({
    email: z.string().email(),
  })

  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const ValidEmail = LoginFormSchema.parse({ email })
      const { data, error } = await authClient.signIn.magicLink({
        email: ValidEmail.email,
        callbackURL: "/Destinations",
      })
      if (error) {
        console.error(error)
        return
      }

      toast.success("Magic link sent. Check your email.")
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    try {
      const { data, error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/Admin",
      } )

      console.log(data)
      if (error) {
        console.error(error)
        return
      }
      
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className={cn("flex flex-col gap-6 w-full", className)} {...props}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">InMarrakesh</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to InMarrakesh.</h1>
            <div className="text-center text-sm">
              Ready to start your journey? Login to your account.
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                disabled={loading}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="m@example.com"
                required
              />
            </div>
            <Button
              disabled={loading}
              type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
              {loading ? "Sending..." : "Send Magic Link"}
            </Button>
          </div>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Or
            </span>
          </div>
          <div className="gri d gap-4 sm:grid-cols-2 w-full items-center justify-center mx-auto  ">

            <Button
              disabled={loading}
              type="button"
              onClick={handleGoogleSignIn}
              variant="outline" className="w-full   px-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Continue with Google
            </Button>
          </div>
        </div>
      </form>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
