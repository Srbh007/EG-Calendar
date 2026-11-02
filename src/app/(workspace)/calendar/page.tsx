import * as React from "react"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarIcon, Clock, Filter } from "lucide-react"

export default function CalendarPage() {
  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-2rem)]">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text)]">Availability Calendar</h2>
          <p className="text-sm text-[var(--color-text-muted)]">
            View your unified schedule and computed slots across all connected accounts.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button size="sm" className="gap-2">
            <CalendarIcon className="h-4 w-4" />
            Today
          </Button>
        </div>
      </div>

      <div className="flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm flex flex-col overflow-hidden">
        {/* Mock Calendar Header */}
        <div className="flex bg-[var(--color-surface-muted)] border-b border-[var(--color-border)]">
          <div className="w-16 flex-shrink-0 border-r border-[var(--color-border)] p-2">
            <div className="text-xs text-[var(--color-text-muted)] text-center">GMT-4</div>
          </div>
          <div className="flex-1 grid grid-cols-5 text-center divide-x divide-[var(--color-border)]">
            <div className="p-2 font-medium text-sm">Mon 26</div>
            <div className="p-2 font-medium text-sm">Tue 27</div>
            <div className="p-2 font-medium text-sm">Wed 28</div>
            <div className="p-2 font-medium text-sm bg-[var(--color-primary)]/5 text-[var(--color-primary)]">Thu 29</div>
            <div className="p-2 font-medium text-sm">Fri 30</div>
          </div>
        </div>

        {/* Mock Calendar Grid */}
        <div className="flex-1 flex overflow-y-auto">
          {/* Times */}
          <div className="w-16 flex-shrink-0 border-r border-[var(--color-border)] bg-[var(--color-surface)]">
            {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map(time => (
              <div key={time} className="h-24 p-2 text-xs text-[var(--color-text-muted)] text-right border-b border-[var(--color-border)] relative top-[-12px]">
                {time}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="flex-1 grid grid-cols-5 divide-x divide-[var(--color-border)]">
            <div className="relative border-b border-[var(--color-border)] h-[864px]">
              {/* Event block */}
              <div className="absolute top-[48px] left-1 right-1 h-[96px] bg-blue-100 border border-blue-200 rounded p-2 text-xs text-blue-800">
                <div className="font-semibold">Busy (Google)</div>
                <div>09:30 - 11:30</div>
              </div>
            </div>
            <div className="relative border-b border-[var(--color-border)]">
              <div className="absolute top-[144px] left-1 right-1 h-[48px] bg-red-100 border border-red-200 rounded p-2 text-xs text-red-800">
                <div className="font-semibold">Busy (Zoho)</div>
                <div>10:30 - 11:30</div>
              </div>
            </div>
            <div className="relative border-b border-[var(--color-border)]"></div>
            <div className="relative border-b border-[var(--color-border)] bg-[var(--color-primary)]/5">
              {/* Computed available slot mock */}
              <div className="absolute top-[0px] left-1 right-1 h-[48px] border-2 border-dashed border-[var(--color-primary)]/50 rounded flex items-center justify-center text-xs text-[var(--color-primary)] font-medium bg-white/50">
                <Clock className="h-3 w-3 mr-1" /> Available Slot
              </div>
            </div>
            <div className="relative border-b border-[var(--color-border)]"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
