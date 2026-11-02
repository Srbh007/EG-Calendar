import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, RefreshCcw, Unplug, AlertCircle } from "lucide-react"

export default function IntegrationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text)]">Calendar Integrations</h2>
        <p className="text-sm text-[var(--color-text-muted)]">
          Connect your Google and Zoho accounts to sync availability and manage bookings.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Google Calendar Provider Card - Connected State */}
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-[var(--color-surface-muted)] flex items-center justify-center font-bold text-blue-600">G</div>
              <div>
                <h3 className="font-medium text-[var(--color-text)]">Google Calendar</h3>
                <p className="text-xs text-[var(--color-text-muted)]">jane@example.com</p>
              </div>
            </div>
            <Badge variant="success">Connected</Badge>
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <h4 className="text-xs font-medium text-[var(--color-text-muted)] mb-2 uppercase tracking-wider">Calendars</h4>
              <ul className="text-sm space-y-1">
                <li className="flex items-center justify-between text-[var(--color-text)]">
                  <span>Jane Work</span>
                  <Badge variant="secondary" className="text-[10px] px-1.5 h-4">Primary</Badge>
                </li>
                <li className="flex items-center justify-between text-[var(--color-text)]">
                  <span>Personal</span>
                  <Badge variant="outline" className="text-[10px] px-1.5 h-4 text-[var(--color-text-muted)] border-[var(--color-border)]">Read-only</Badge>
                </li>
              </ul>
            </div>
            <div className="text-xs text-[var(--color-text-muted)] flex items-center gap-1">
              <RefreshCcw className="h-3 w-3" /> Last synced 2 mins ago
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
            <Button variant="ghost" size="sm" className="text-[var(--color-danger)] hover:text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10">
              <Unplug className="h-4 w-4 mr-2" />
              Disconnect
            </Button>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Account
            </Button>
          </div>
        </div>

        {/* Google Calendar Provider Card - Error/Reconnect State */}
        <div className="rounded-lg border border-[var(--color-danger)]/50 bg-[var(--color-danger)]/5 p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-[var(--color-surface-muted)] flex items-center justify-center font-bold text-blue-600">G</div>
              <div>
                <h3 className="font-medium text-[var(--color-text)]">Google Calendar</h3>
                <p className="text-xs text-[var(--color-text-muted)]">oldaccount@example.com</p>
              </div>
            </div>
            <Badge variant="destructive" className="flex items-center gap-1">
              <AlertCircle className="h-3 w-3" /> Error
            </Badge>
          </div>

          <div className="flex-1 space-y-4">
            <div className="text-sm text-[var(--color-text)]">
              Access to this calendar account was revoked or expired. Please reconnect to restore calendar syncing.
            </div>
            <div className="text-xs text-[var(--color-danger)] flex items-center gap-1 font-medium">
              Sync failed 3 hours ago
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[var(--color-danger)]/20 flex items-center justify-between">
            <Button variant="ghost" size="sm" className="text-[var(--color-danger)] hover:text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10">
              <Unplug className="h-4 w-4 mr-2" />
              Disconnect
            </Button>
            <Button size="sm">
              <RefreshCcw className="h-4 w-4 mr-2" />
              Reconnect
            </Button>
          </div>
        </div>

        {/* Zoho Calendar Provider Card - Disconnected/Add State */}
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded bg-[var(--color-surface-muted)] flex items-center justify-center font-bold text-red-600">Z</div>
              <div>
                <h3 className="font-medium text-[var(--color-text)]">Zoho Calendar</h3>
                <p className="text-xs text-[var(--color-text-muted)]">Connect Zoho Mail & Calendar</p>
              </div>
            </div>
            <p className="text-sm text-[var(--color-text-muted)]">
              Link your Zoho account to include its calendars in your availability engine.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-[var(--color-border)] flex justify-end">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Connect Zoho
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}
