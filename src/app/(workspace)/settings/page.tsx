import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text)]">Organization Settings</h2>
        <p className="text-sm text-[var(--color-text-muted)]">
          Manage your organization profile, plan, and view audit logs.
        </p>
      </div>

      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm space-y-4">
        <h3 className="font-semibold text-lg border-b border-[var(--color-border)] pb-2 text-[var(--color-text)]">Profile</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--color-text)]">Organization Name</label>
            <Input defaultValue="Acme Corp" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--color-text)]">Slug</label>
            <Input defaultValue="acme-corp" disabled />
          </div>
        </div>
        <div className="flex justify-end pt-2">
          <Button>Save Profile</Button>
        </div>
      </div>

      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-2">
          <h3 className="font-semibold text-lg text-[var(--color-text)]">Billing Plan</h3>
          <Badge variant="success">Pro Plan</Badge>
        </div>
        <p className="text-sm text-[var(--color-text-muted)]">
          You are currently on the Pro Plan. You have access to unlimited booking links and provider integrations.
        </p>
        <div className="pt-2">
          <Button variant="outline">Manage Billing</Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-lg text-[var(--color-text)]">Audit History</h3>
        <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Actor</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-[var(--color-text)]">Booking rescheduled (slug: 30-min-intro)</TableCell>
                <TableCell className="text-[var(--color-text-muted)]">invitee</TableCell>
                <TableCell className="text-[var(--color-text-muted)]">2 mins ago</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-[var(--color-text)]">Google Calendar connected</TableCell>
                <TableCell className="text-[var(--color-text-muted)]">jane@example.com (host)</TableCell>
                <TableCell className="text-[var(--color-text-muted)]">1 day ago</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-[var(--color-text)]">Role changed to Owner</TableCell>
                <TableCell className="text-[var(--color-text-muted)]">system</TableCell>
                <TableCell className="text-[var(--color-text-muted)]">Oct 24, 2026</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
