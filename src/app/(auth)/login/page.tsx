import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-xl font-semibold tracking-tight text-[var(--color-text)]">Sign in to your account</h2>
        <p className="text-sm text-[var(--color-text-muted)]">Enter your email below to login</p>
      </div>
      <form className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-[var(--color-text)]">Email</label>
          <Input id="email" type="email" placeholder="name@example.com" required />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-[var(--color-text)]">Password</label>
          <Input id="password" type="password" required />
        </div>
        <Button className="w-full" type="submit">Sign In</Button>
      </form>
      <div className="text-center text-sm text-[var(--color-text-muted)]">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-[var(--color-primary)] hover:underline">
          Register
        </Link>
      </div>
    </div>
  )
}
