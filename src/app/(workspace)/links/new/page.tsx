import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewLinkBuilderPage() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-12">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/links">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text)]">Create Booking Link</h2>
        </div>
      </div>

      <div className="space-y-8">
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-6 shadow-sm">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b border-[var(--color-border)] pb-2 text-[var(--color-text)]">Link Details</h3>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--color-text)]">Title</label>
              <Input placeholder="e.g. 30 Minute Intro Call" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--color-text)]">URL Slug</label>
              <div className="flex items-center gap-2">
                <span className="text-[var(--color-text-muted)] text-sm bg-[var(--color-surface-muted)] px-3 py-1.5 rounded-md border border-[var(--color-border)]">unifiedscheduler.com/acme/</span>
                <Input placeholder="30-min-intro" />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-6 shadow-sm">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b border-[var(--color-border)] pb-2 text-[var(--color-text)]">Availability Rules</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--color-text)]">Duration</label>
                <Select defaultValue="30">
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--color-text)]">Buffer Time</label>
                <Select defaultValue="0">
                  <SelectTrigger>
                    <SelectValue placeholder="Select buffer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">No buffer</SelectItem>
                    <SelectItem value="5">5 minutes</SelectItem>
                    <SelectItem value="10">10 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-6 shadow-sm">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b border-[var(--color-border)] pb-2 text-[var(--color-text)]">Calendar Sync</h3>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--color-text)]">Destination Calendar</label>
              <p className="text-xs text-[var(--color-text-muted)] mb-2">Where new bookings will be added.</p>
              <Select defaultValue="1">
                <SelectTrigger>
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Google: jane@example.com (Work)</SelectItem>
                  <SelectItem value="2">Zoho: jane.doe@zohomail.com (Personal)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 pt-4">
              <label className="text-sm font-medium text-[var(--color-text)]">Check for Conflicts</label>
              <p className="text-xs text-[var(--color-text-muted)] mb-2">Select all calendars we should check to prevent double bookings.</p>
              <div className="space-y-2 border border-[var(--color-border)] rounded-md p-3">
                <label className="flex items-center gap-2 text-sm text-[var(--color-text)]">
                  <input type="checkbox" defaultChecked className="rounded border-[var(--color-border)] text-[var(--color-primary)]" />
                  Google: jane@example.com (Work)
                </label>
                <label className="flex items-center gap-2 text-sm text-[var(--color-text)]">
                  <input type="checkbox" defaultChecked className="rounded border-[var(--color-border)] text-[var(--color-primary)]" />
                  Google: jane@example.com (Personal)
                </label>
                <label className="flex items-center gap-2 text-sm text-[var(--color-text)]">
                  <input type="checkbox" className="rounded border-[var(--color-border)] text-[var(--color-primary)]" />
                  Zoho: jane.doe@zohomail.com (Work)
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-[var(--color-border)]">
          <Button variant="outline" asChild>
            <Link href="/links">Cancel</Link>
          </Button>
          <Button>Publish Link</Button>
        </div>
      </div>
    </div>
  )
}
