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

export default function PlatformUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text)]">Platform Users</h2>
        <p className="text-sm text-[var(--color-text-muted)]">
          Manage all users across the platform.
        </p>
      </div>

      <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Organizations</TableHead>
              <TableHead>Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium text-[var(--color-text)]">jane@example.com</TableCell>
              <TableCell className="text-[var(--color-text-muted)]">Jane Doe</TableCell>
              <TableCell>
                <Badge variant="outline">Acme Corp</Badge>
              </TableCell>
              <TableCell className="text-[var(--color-text-muted)]">Oct 24, 2026</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-[var(--color-text)]">bob@globex.com</TableCell>
              <TableCell className="text-[var(--color-text-muted)]">Bob Smith</TableCell>
              <TableCell>
                <Badge variant="outline">Globex Inc</Badge>
              </TableCell>
              <TableCell className="text-[var(--color-text-muted)]">Oct 30, 2026</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
