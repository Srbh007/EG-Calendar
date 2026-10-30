import * as React from "react"
import Link from "next/link"

export function AppSidebar() {
  return (
    <aside className="hidden w-[248px] flex-col border-r border-border bg-surface lg:flex">
      <div className="flex h-14 items-center border-b border-border px-4">
        <span className="font-semibold">Unified Scheduler</span>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid items-start px-2 text-sm font-medium">
          <Link href="/app" className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary hover:bg-primary-soft transition-all">
            Overview
          </Link>
          <Link href="/app/calendar" className="flex items-center gap-3 rounded-lg px-3 py-2 text-text-muted hover:text-text transition-all">
            Calendar
          </Link>
          <Link href="/app/bookings" className="flex items-center gap-3 rounded-lg px-3 py-2 text-text-muted hover:text-text transition-all">
            Bookings
          </Link>
          <Link href="/app/booking-links" className="flex items-center gap-3 rounded-lg px-3 py-2 text-text-muted hover:text-text transition-all">
            Booking links
          </Link>
          <Link href="/app/team" className="flex items-center gap-3 rounded-lg px-3 py-2 text-text-muted hover:text-text transition-all">
            Team
          </Link>

          <div className="mt-6 mb-2 px-3 text-xs font-semibold text-text-muted uppercase tracking-wider">
            Configuration
          </div>
          <Link href="/app/integrations" className="flex items-center gap-3 rounded-lg px-3 py-2 text-text-muted hover:text-text transition-all">
            Integrations
          </Link>
          <Link href="/app/developer" className="flex items-center gap-3 rounded-lg px-3 py-2 text-text-muted hover:text-text transition-all">
            Developer API
          </Link>
          <Link href="/app/analytics" className="flex items-center gap-3 rounded-lg px-3 py-2 text-text-muted hover:text-text transition-all">
            Analytics
          </Link>
          <Link href="/app/settings" className="flex items-center gap-3 rounded-lg px-3 py-2 text-text-muted hover:text-text transition-all">
            Settings
          </Link>
        </nav>
      </div>
    </aside>
  )
}
