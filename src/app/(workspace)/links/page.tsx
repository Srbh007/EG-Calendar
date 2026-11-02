import * as React from "react"
import { Button } from "@/components/ui/button"
import { Plus, Link as LinkIcon, Settings, CalendarDays } from "lucide-react"
import Link from "next/link"

export default function LinksPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text)]">Booking Links</h2>
          <p className="text-sm text-[var(--color-text-muted)]">
            Create and manage links to share your availability.
          </p>
        </div>
        <Button asChild className="gap-2">
          <Link href="/links/new">
            <Plus className="h-4 w-4" />
            New Link
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Mock Link Card */}
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm">
          <div className="flex flex-col h-full">
            <div className="mb-4">
              <h3 className="font-semibold text-lg text-[var(--color-text)] mb-1">30 Min Intro Call</h3>
              <p className="text-sm text-[var(--color-primary)] font-medium">/acme/30-min-intro</p>
            </div>
            <div className="space-y-2 mb-6 text-sm text-[var(--color-text-muted)]">
              <div className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4" /> 30 minutes
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" /> Checks 2 calendars
              </div>
            </div>
            <div className="mt-auto flex items-center justify-between border-t border-[var(--color-border)] pt-4">
              <Button variant="ghost" size="sm" className="gap-2">
                <LinkIcon className="h-4 w-4" /> Copy
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Settings className="h-4 w-4" /> Edit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
