import * as React from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Calendar as CalendarIcon, Video } from "lucide-react"

export default function BookingSuccessPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-xl p-8 md:p-12 text-center">

        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-[var(--color-primary-soft)] flex items-center justify-center text-[var(--color-primary)]">
            <CheckCircle2 className="w-8 h-8" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">Booking Confirmed!</h1>
        <p className="text-[var(--color-text-muted)] mb-8">
          You are scheduled with Acme Corp. A calendar invitation has been sent to your email.
        </p>

        <div className="text-left border border-[var(--color-border)] rounded-lg p-6 space-y-4 bg-[var(--color-surface-muted)]/30 mb-8">
          <h2 className="font-semibold text-lg text-[var(--color-text)] border-b border-[var(--color-border)] pb-2 mb-4">30 Minute Intro Call</h2>

          <div className="flex items-start gap-3 text-[var(--color-text)]">
            <CalendarIcon className="w-5 h-5 text-[var(--color-text-muted)] mt-0.5" />
            <div>
              <div className="font-medium">Saturday, October 31, 2026</div>
              <div className="text-sm text-[var(--color-text-muted)]">10:00 AM - 10:30 AM (Eastern Time)</div>
            </div>
          </div>

          <div className="flex items-start gap-3 text-[var(--color-text)]">
            <Video className="w-5 h-5 text-[var(--color-text-muted)] mt-0.5" />
            <div>
              <div className="font-medium">Google Meet</div>
              <div className="text-sm text-[var(--color-primary)] hover:underline cursor-pointer">meet.google.com/abc-defg-hij</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="outline" className="w-full sm:w-auto">Reschedule</Button>
          <Button variant="outline" className="w-full sm:w-auto text-[var(--color-danger)] hover:text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10">Cancel Booking</Button>
        </div>

      </div>
    </div>
  )
}
