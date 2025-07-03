import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FolderOpen, Clock, TrendingUp } from "lucide-react"

export function StatsCardsWidget() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold text-text-primary">
            Active Projects
          </CardTitle>
          <div className="p-2 rounded-lg bg-brand-accent">
            <FolderOpen className="h-4 w-4 text-text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-text-primary">
            6
          </div>
          <p className="text-xs text-text-tertiary">
            +2 from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold text-text-primary">
            Pending Tasks
          </CardTitle>
          <div className="p-2 rounded-lg bg-brand-accent">
            <Clock className="h-4 w-4 text-text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-text-primary">
            12
          </div>
          <p className="text-xs text-text-tertiary">
            3 due this week
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold text-text-primary">
            Overall Progress
          </CardTitle>
          <div className="p-2 rounded-lg bg-brand-accent">
            <TrendingUp className="h-4 w-4 text-text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-text-primary">
            78%
          </div>
          <p className="text-xs text-text-tertiary">
            On track
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold text-text-primary">
            Pending Requests
          </CardTitle>
          <div className="p-2 rounded-lg bg-brand-accent">
            <Clock className="h-4 w-4 text-text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-text-primary">
            2
          </div>
          <p className="text-xs text-text-tertiary">
            Need attention
          </p>
        </CardContent>
      </Card>
    </div>
  )
} 