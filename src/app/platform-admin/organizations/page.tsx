import * as React from "react"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function PlatformOrganizationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text)]">Platform Organizations</h2>
        <p className="text-sm text-[var(--color-text-muted)]">
          Manage all tenant organizations on the platform.
        </p>
      </div>

      <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Organization</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium text-[var(--color-text)]">Acme Corp</TableCell>
              <TableCell className="text-[var(--color-text-muted)]">acme-corp</TableCell>
              <TableCell>Pro</TableCell>
              <TableCell>
                <Badge variant="success">Active</Badge>
              </TableCell>
              <TableCell className="text-[var(--color-text-muted)]">Oct 24, 2026</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-[var(--color-text)]">Globex Inc</TableCell>
              <TableCell className="text-[var(--color-text-muted)]">globex</TableCell>
              <TableCell>Free</TableCell>
              <TableCell>
                <Badge variant="secondary">Pending</Badge>
              </TableCell>
              <TableCell className="text-[var(--color-text-muted)]">Oct 30, 2026</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
