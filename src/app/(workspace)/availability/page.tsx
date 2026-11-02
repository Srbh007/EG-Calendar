import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Globe } from "lucide-react"

export default function AvailabilitySettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text)]">Availability Settings</h2>
        <p className="text-sm text-[var(--color-text-muted)]">
          Set your regular working hours, timezone, and buffer times between meetings.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-[var(--color-text)] flex items-center gap-2">
            <Globe className="h-4 w-4" /> Timezone
          </h3>
          <div className="w-72">
            <Select defaultValue="America/New_York">
              <SelectTrigger>
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="America/New_York">Eastern Time (US & Canada)</SelectItem>
                <SelectItem value="America/Chicago">Central Time (US & Canada)</SelectItem>
                <SelectItem value="America/Denver">Mountain Time (US & Canada)</SelectItem>
                <SelectItem value="America/Los_Angeles">Pacific Time (US & Canada)</SelectItem>
                <SelectItem value="Europe/London">London</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-[var(--color-text)] flex items-center gap-2">
            <Clock className="h-4 w-4" /> Default Working Hours
          </h3>
          <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] p-4 space-y-4">
            {/* Monday */}
            <div className="flex items-center gap-4">
              <div className="w-24 text-sm font-medium">Monday</div>
              <Input type="time" defaultValue="09:00" className="w-32" />
              <span className="text-sm text-[var(--color-text-muted)]">-</span>
              <Input type="time" defaultValue="17:00" className="w-32" />
            </div>
            {/* Tuesday */}
            <div className="flex items-center gap-4">
              <div className="w-24 text-sm font-medium">Tuesday</div>
              <Input type="time" defaultValue="09:00" className="w-32" />
              <span className="text-sm text-[var(--color-text-muted)]">-</span>
              <Input type="time" defaultValue="17:00" className="w-32" />
            </div>
            {/* Wednesday */}
            <div className="flex items-center gap-4">
              <div className="w-24 text-sm font-medium">Wednesday</div>
              <Input type="time" defaultValue="09:00" className="w-32" />
              <span className="text-sm text-[var(--color-text-muted)]">-</span>
              <Input type="time" defaultValue="17:00" className="w-32" />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button>Save Settings</Button>
        </div>
      </div>
    </div>
  )
}
