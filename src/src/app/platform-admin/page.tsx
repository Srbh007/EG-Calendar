import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function PlatformAdminOverview() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Organizations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">384</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">All systems nominal</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Organizations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <div className="text-sm font-medium">Globex Corp</div>
                <div className="text-xs text-text-muted">Created 2h ago</div>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-2">
                <div className="text-sm font-medium">Initech</div>
                <div className="text-xs text-text-muted">Created 1d ago</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Provider Health</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="flex flex-col gap-4">
               <div className="flex items-center justify-between">
                 <span className="text-sm font-medium">Google Calendar API</span>
                 <span className="text-sm text-primary font-medium">Operational</span>
               </div>
               <div className="flex items-center justify-between">
                 <span className="text-sm font-medium">Zoho Calendar API</span>
                 <span className="text-sm text-primary font-medium">Operational</span>
               </div>
               <div className="flex items-center justify-between">
                 <span className="text-sm font-medium">Supabase Edge Functions</span>
                 <span className="text-sm text-primary font-medium">Operational</span>
               </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
