import * as React from "react"
import { Calendar, CheckSquare, Clock, Settings, User } from "lucide-react"
import Link from "next/link"

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-[var(--color-background)]">
      {/* Sidebar */}
      <aside className="w-[248px] hidden md:flex flex-col border-r border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="p-4 border-b border-[var(--color-border)]">
          <h1 className="font-semibold text-[var(--color-text)]">Workspace</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm rounded-md text-[var(--color-text)] hover:bg-[var(--color-surface-muted)]">
            <CheckSquare className="h-4 w-4" />
            Dashboard
          </Link>
          <Link href="/calendar" className="flex items-center gap-3 px-3 py-2 text-sm rounded-md bg-[var(--color-primary-soft)] text-[var(--color-primary-hover)]">
            <Calendar className="h-4 w-4" />
            Calendar
          </Link>
          <Link href="/bookings" className="flex items-center gap-3 px-3 py-2 text-sm rounded-md text-[var(--color-text)] hover:bg-[var(--color-surface-muted)]">
            <Clock className="h-4 w-4" />
            Bookings
          </Link>
          <Link href="/settings" className="flex items-center gap-3 px-3 py-2 text-sm rounded-md text-[var(--color-text)] hover:bg-[var(--color-surface-muted)]">
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 flex items-center justify-between px-6 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="flex items-center gap-4">
            <div className="md:hidden font-semibold text-[var(--color-text)]">Workspace</div>
          </div>
          <div className="flex items-center gap-4">
            <button className="h-8 w-8 rounded-full bg-[var(--color-surface-muted)] flex items-center justify-center">
              <User className="h-4 w-4 text-[var(--color-text)]" />
            </button>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
