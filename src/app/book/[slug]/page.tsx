import * as React from "react"
import { Button } from "@/components/ui/button"
import { Clock, Globe } from "lucide-react"

export default function PublicBookingPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[500px]">

        {/* Left Side: Host Info */}
        <div className="md:w-1/3 bg-[var(--color-surface-muted)] p-8 border-r border-[var(--color-border)]">
          <div className="w-16 h-16 bg-[var(--color-primary-soft)] text-[var(--color-primary)] rounded-full flex items-center justify-center text-xl font-bold mb-6">
            AC
          </div>
          <h2 className="text-xl text-[var(--color-text-muted)] font-medium mb-1">Acme Corp</h2>
          <h1 className="text-2xl font-bold text-[var(--color-text)] mb-6">30 Minute Intro Call</h1>

          <div className="space-y-4 text-[var(--color-text-muted)]">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5" />
              <span>30 min</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5" />
              <span>Eastern Time - US & Canada</span>
            </div>
          </div>

          <p className="mt-8 text-sm leading-relaxed text-[var(--color-text)]">
            Book a quick call to learn more about our services and how we can help your team schedule efficiently.
          </p>
        </div>

        {/* Right Side: Slot Selection */}
        <div className="md:w-2/3 p-8">
          <h3 className="text-lg font-semibold text-[var(--color-text)] mb-6">Select a Date & Time</h3>

          <div className="flex flex-col md:flex-row gap-8 h-full">
            {/* Calendar Mock */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <Button variant="ghost" size="icon">&lt;</Button>
                <span className="font-medium text-[var(--color-text)]">October 2026</span>
                <Button variant="ghost" size="icon">&gt;</Button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2 text-[var(--color-text-muted)]">
                <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {/* Just some mock dates */}
                {Array.from({length: 31}).map((_, i) => (
                  <Button
                    key={i}
                    variant={(i+1 === 31) ? "default" : "ghost"}
                    className={`h-10 w-10 rounded-full p-0 ${(i+1 === 31) ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary-hover)] hover:bg-[var(--color-primary-soft)]' : 'text-[var(--color-text)] hover:bg-[var(--color-surface-muted)]'}`}
                    disabled={(i+1) < 25}
                  >
                    {i+1}
                  </Button>
                ))}
              </div>
            </div>

            {/* Slots Mock */}
            <div className="w-full md:w-48 flex flex-col gap-2 h-[350px] overflow-y-auto pr-2">
              <div className="text-sm font-medium text-[var(--color-text)] mb-2">Saturday, October 31</div>
              {['09:00', '09:30', '10:00', '10:30', '11:00', '13:00', '13:30', '14:00'].map(slot => (
                <div key={slot} className="flex gap-2">
                  <Button variant="outline" className="flex-1 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary-soft)] hover:text-[var(--color-primary-hover)]">
                    {slot}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
