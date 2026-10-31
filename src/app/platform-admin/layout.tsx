import * as React from "react"
import { Activity, Shield, Users, Database, Server } from "lucide-react"
import Link from "next/link"

export default function PlatformAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-[var(--color-surface-muted)]">
      {/* Sidebar - Distinct darker theme for admin */}
      <aside className="w-[248px] hidden md:flex flex-col bg-[var(--color-highlight)] text-white">
        <div className="p-4 border-b border-white/10">
          <h1 className="font-semibold text-white/90">Platform Console</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link href="/platform-admin/organizations" className="flex items-center gap-3 px-3 py-2 text-sm rounded-md text-white/70 hover:text-white hover:bg-white/10">
            <Database className="h-4 w-4" />
            Organizations
          </Link>
          <Link href="/platform-admin/users" className="flex items-center gap-3 px-3 py-2 text-sm rounded-md text-white/70 hover:text-white hover:bg-white/10">
            <Users className="h-4 w-4" />
            Users
          </Link>
          <Link href="/platform-admin/access" className="flex items-center gap-3 px-3 py-2 text-sm rounded-md bg-white/10 text-white">
            <Shield className="h-4 w-4" />
            Access Requests
          </Link>
          <Link href="/platform-admin/health" className="flex items-center gap-3 px-3 py-2 text-sm rounded-md text-white/70 hover:text-white hover:bg-white/10">
            <Activity className="h-4 w-4" />
            System Health
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-[var(--color-background)]">
        <header className="h-14 flex items-center justify-between px-6 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="flex items-center gap-4">
            <div className="md:hidden font-semibold text-[var(--color-text)]">Admin Console</div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-[var(--color-danger)] flex items-center gap-2">
              <Server className="h-4 w-4" />
              Super Admin
            </span>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
