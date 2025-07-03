"use client"

import { useWidgets } from "@/lib/widget-context"
import { WidgetRenderer } from "./widget-renderer"
import { cn } from "@/lib/utils"
import { Widget } from "@/lib/widget-context"
import AnnouncementsPreview from "./widgets/announcements-preview"
import BenefitsPreview from "./widgets/benefits-preview"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function DashboardOverview() {
  const { visibleWidgets } = useWidgets()

  // Remove preview widgets from the main grid
  const filteredWidgets = visibleWidgets.filter(
    w => w.component !== "announcements-preview" && w.component !== "benefits-preview"
  )

  const groupedByOrder = filteredWidgets.reduce<Record<number, Widget[]>>((acc, widget) => {
    const order = widget.order
    if (!acc[order]) {
      acc[order] = []
    }
    acc[order].push(widget)
    return acc
  }, {})

  return (
    <div className="space-y-6">
      {/* Welcome Block (full width) */}
      {Object.keys(groupedByOrder)
        .sort((a, b) => Number(a) - Number(b))
        .filter(order => groupedByOrder[Number(order)].some(widget => widget.id === "welcome-section"))
        .map((order) => {
          const widgetGroup = groupedByOrder[Number(order)]
          return (
            <div key={order} className="grid gap-6 grid-cols-1">
              {widgetGroup.map((widget) => (
                <div key={widget.id} className="h-full lg:col-span-2">
                  <WidgetRenderer widget={widget} />
                </div>
              ))}
            </div>
          )
        })}

      {/* Main Widget Grid (excluding welcome-section) */}
      {Object.keys(groupedByOrder)
        .sort((a, b) => Number(a) - Number(b))
        .filter(order => !groupedByOrder[Number(order)].some(widget => widget.id === "welcome-section"))
        .map((order) => {
          const widgetGroup = groupedByOrder[Number(order)]
          const hasFullWidth = widgetGroup.some(widget => widget.fullWidth)
          return (
            <div 
              key={order} 
              className={cn(
                "grid gap-6",
                hasFullWidth 
                  ? "grid-cols-1" 
                  : "grid-cols-1 lg:grid-cols-2"
              )}
            >
              {widgetGroup.map((widget) => (
                <div
                  key={widget.id}
                  className={cn("h-full", {
                    "lg:col-span-2": widget.fullWidth,
                  })}
                >
                  <WidgetRenderer widget={widget} />
                </div>
              ))}
            </div>
          )
        })}

      {/* Announcements & Benefits Section (last row) */}
      <Card className="w-full">
        <CardHeader className="pb-0">
          <CardTitle className="text-lg font-semibold text-text-primary">Announcements & Benefits</CardTitle>
          <CardDescription className="text-sm text-text-secondary mt-1">Stay up to date with the latest announcements and explore your available benefits.</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Card className="flex-1 min-w-[320px] max-w-full border border-neutral-200">
              <CardContent className="px-6 py-4">
                <AnnouncementsPreview />
              </CardContent>
            </Card>
            <Card className="flex-1 min-w-[320px] max-w-full border border-neutral-200">
              <CardContent className="px-6 py-4">
                <BenefitsPreview />
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
