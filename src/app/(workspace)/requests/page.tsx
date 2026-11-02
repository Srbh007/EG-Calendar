import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function AccessRequestsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text)]">Access Requests</h2>
        <p className="text-sm text-[var(--color-text-muted)]">
          Manage pending requests to join your organization.
        </p>
      </div>

      <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Requested At</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                <div>alice@example.com</div>
                <div className="text-xs text-[var(--color-text-muted)]">Alice Smith</div>
              </TableCell>
              <TableCell>2 hours ago</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-[var(--color-warning)]/10 text-[var(--color-warning)] border-[var(--color-warning)]/20">
                  Pending
                </Badge>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="outline" size="sm">Reject</Button>
                <Button size="sm">Approve</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                <div>bob@example.com</div>
                <div className="text-xs text-[var(--color-text-muted)]">Bob Jones</div>
              </TableCell>
              <TableCell>1 day ago</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-[var(--color-warning)]/10 text-[var(--color-warning)] border-[var(--color-warning)]/20">
                  Pending
                </Badge>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="outline" size="sm">Reject</Button>
                <Button size="sm">Approve</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
