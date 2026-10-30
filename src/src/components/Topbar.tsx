import * as React from "react"
import { Button } from "./ui/button"

export function Topbar() {
  return (
    <header className="flex h-14 items-center gap-4 border-b border-border bg-surface px-6">
      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold">Workspace Overview</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm font-medium">Acme Corp</div>
          <Button variant="outline" size="sm">Create Link</Button>
          <div className="h-8 w-8 rounded-full bg-primary text-surface flex items-center justify-center font-bold text-sm">
            U
          </div>
        </div>
      </div>
    </header>
  )
}
