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
import { UserPlus, MoreHorizontal } from "lucide-react"

export default function TeamManagementPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text)]">Team Members</h2>
          <p className="text-sm text-[var(--color-text-muted)]">
            Manage your organization members and their roles.
          </p>
        </div>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Invite Member
        </Button>
      </div>

      <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                <div>jane@example.com</div>
                <div className="text-xs text-[var(--color-text-muted)]">Jane Doe</div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-[var(--color-info)]/10 text-[var(--color-info)] border-[var(--color-info)]/20">
                  Owner
                </Badge>
              </TableCell>
              <TableCell>Oct 24, 2026</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                <div>sam@example.com</div>
                <div className="text-xs text-[var(--color-text-muted)]">Sam Smith</div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">
                  Member
                </Badge>
              </TableCell>
              <TableCell>Oct 28, 2026</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
