import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FolderOpen, Clock, TrendingUp } from "lucide-react"

export function StatsCardsWidget() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="shadow-sm border-0" style={{ backgroundColor: "#FFFFFF" }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold" style={{ color: "#063852" }}>
            Active Projects
          </CardTitle>
          <div className="p-2 rounded-lg" style={{ backgroundColor: "#FFC100" }}>
            <FolderOpen className="h-4 w-4" style={{ color: "#063852" }} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold" style={{ color: "#063852" }}>
            6
          </div>
          <p className="text-xs" style={{ color: "#636466" }}>
            +2 from last month
          </p>
        </CardContent>
      </Card>
      <Card className="shadow-sm border-0" style={{ backgroundColor: "#FFFFFF" }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold" style={{ color: "#063852" }}>
            Pending Tasks
          </CardTitle>
          <div className="p-2 rounded-lg" style={{ backgroundColor: "#FFC100" }}>
            <Clock className="h-4 w-4" style={{ color: "#063852" }} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold" style={{ color: "#063852" }}>
            12
          </div>
          <p className="text-xs" style={{ color: "#636466" }}>
            3 due this week
          </p>
        </CardContent>
      </Card>
      <Card className="shadow-sm border-0" style={{ backgroundColor: "#FFFFFF" }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold" style={{ color: "#063852" }}>
            Overall Progress
          </CardTitle>
          <div className="p-2 rounded-lg" style={{ backgroundColor: "#FFC100" }}>
            <TrendingUp className="h-4 w-4" style={{ color: "#063852" }} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold" style={{ color: "#063852" }}>
            78%
          </div>
          <p className="text-xs" style={{ color: "#636466" }}>
            On track
          </p>
        </CardContent>
      </Card>
      <Card className="shadow-sm border-0" style={{ backgroundColor: "#FFFFFF" }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold" style={{ color: "#063852" }}>
            Pending Requests
          </CardTitle>
          <div className="p-2 rounded-lg" style={{ backgroundColor: "#FFC100" }}>
            <Clock className="h-4 w-4" style={{ color: "#063852" }} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold" style={{ color: "#063852" }}>
            2
          </div>
          <p className="text-xs" style={{ color: "#636466" }}>
            Need attention
          </p>
        </CardContent>
      </Card>
    </div>
  )
} 