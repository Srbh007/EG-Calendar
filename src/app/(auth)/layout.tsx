import * as React from "react"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] p-4">
      <div className="w-full max-w-md bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6 shadow-[var(--shadow-card)]">
        <div className="flex flex-col space-y-6">
          <div className="flex justify-center">
            <h1 className="text-2xl font-bold text-[var(--color-text)]">Unified Scheduler</h1>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
