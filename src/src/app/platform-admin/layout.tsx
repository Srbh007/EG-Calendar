import * as React from "react"
import Link from "next/link"

export default function PlatformAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background text-text">
      <aside className="hidden w-[248px] flex-col border-r border-border bg-surface-muted lg:flex">
        <div className="flex h-14 items-center border-b border-border px-4 bg-highlight text-surface">
          <span className="font-semibold text-sm tracking-wide uppercase">Platform Admin</span>
        </div>
        <div className="flex-1 overflow-auto py-4">
          <nav className="grid items-start px-2 text-sm font-medium">
            <Link href="/platform-admin" className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary hover:bg-surface transition-all">
              Overview
            </Link>
            <Link href="/platform-admin/organizations" className="flex items-center gap-3 rounded-lg px-3 py-2 text-text-muted hover:text-text transition-all">
              Organizations
            </Link>
            <Link href="/platform-admin/access-requests" className="flex items-center gap-3 rounded-lg px-3 py-2 text-text-muted hover:text-text transition-all">
              Access requests
            </Link>
            <Link href="/platform-admin/users" className="flex items-center gap-3 rounded-lg px-3 py-2 text-text-muted hover:text-text transition-all">
              Users
            </Link>
            <Link href="/platform-admin/plans" className="flex items-center gap-3 rounded-lg px-3 py-2 text-text-muted hover:text-text transition-all">
              Plans & usage
            </Link>
            <Link href="/platform-admin/audit-logs" className="flex items-center gap-3 rounded-lg px-3 py-2 text-text-muted hover:text-text transition-all">
              Audit logs
            </Link>
            <Link href="/platform-admin/system-health" className="flex items-center gap-3 rounded-lg px-3 py-2 text-text-muted hover:text-text transition-all">
              System health
            </Link>
          </nav>
        </div>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 items-center gap-4 border-b border-border bg-surface px-6">
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-lg font-semibold text-danger">Owner Console (Restricted)</h1>
            <div className="text-sm font-medium">Super Admin</div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
