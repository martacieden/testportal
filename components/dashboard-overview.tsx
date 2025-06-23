"use client"

import { useWidgets } from "@/lib/widget-context"
import { WidgetRenderer } from "./widget-renderer"
import { cn } from "@/lib/utils"
import { Widget } from "@/lib/widget-context"

export default function DashboardOverview() {
  const { visibleWidgets } = useWidgets()

  const groupedByOrder = visibleWidgets.reduce<Record<number, Widget[]>>((acc, widget) => {
    const order = widget.order
    if (!acc[order]) {
      acc[order] = []
    }
    acc[order].push(widget)
    return acc
  }, {})

  return (
    <div className="space-y-6">
      {Object.keys(groupedByOrder)
        .sort((a, b) => Number(a) - Number(b))
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
    </div>
  )
}
