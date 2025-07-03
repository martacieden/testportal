"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Settings, GripVertical, Eye, EyeOff, RotateCcw, X } from "lucide-react"
import { useWidgets, Widget } from "@/lib/widget-context"
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided, DraggableStateSnapshot } from "@hello-pangea/dnd"
import { SlidePanel } from "./slide-panel"

const categoryColors = {
  overview: { bg: "#EFF6FF", text: "#2563EB" },
  actions: { bg: "#FEF3C7", text: "#D97706" },
  team: { bg: "#ECFDF5", text: "#059669" },
  projects: { bg: "#FEF2F2", text: "#DC2626" },
  meetings: { bg: "#F3E8FF", text: "#7C3AED" }
}

export function WidgetManagementSlidePanel() {
  const { widgets, toggleWidget, reorderWidgets, resetToDefault, isManaging, setIsManaging } = useWidgets()

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(widgets)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    const widgetIds = items.map(item => item.id)
    reorderWidgets(widgetIds)
  }

  const handleReset = () => {
    resetToDefault()
  }

  return (
    <>
      <Button
        variant="brandOutline"
        size="sm"
        className="justify-start h-9"
        onClick={() => setIsManaging(true)}
      >
        <Settings className="h-4 w-4 mr-2" />
        <span>Manage Widgets</span>
      </Button>

      <SlidePanel 
        open={isManaging} 
        onOpenChange={setIsManaging}
        side="right"
        width="w-full sm:w-[500px] lg:w-[600px]"
        className="border-l"
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Manage Dashboard Widgets</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10"
              onClick={() => setIsManaging(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <p className="text-sm text-muted-foreground">
              Customize your dashboard by showing or hiding widgets and reordering them to match your preferences.
            </p>

            {/* Stats and Reset */}
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                {widgets.filter(w => w.visible).length} of {widgets.length} widgets visible
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleReset}
                className="gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Reset to Default
              </Button>
            </div>

            {/* Widget List */}
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="widgets">
                {(provided: DroppableProvided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-3"
                  >
                    {widgets.map((widget, index) => (
                      <Draggable key={widget.id} draggableId={widget.id} index={index}>
                        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`
                              flex items-center gap-3 p-4 rounded-lg border transition-all
                              ${snapshot.isDragging ? 'shadow-lg bg-white' : 'bg-gray-50'}
                              ${widget.visible ? 'border-gray-200' : 'border-gray-300 bg-gray-100'}
                            `}
                          >
                            <div
                              {...provided.dragHandleProps}
                              className="cursor-grab active:cursor-grabbing p-1"
                            >
                              <GripVertical className="h-4 w-4 text-gray-400" />
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className={`font-medium ${widget.visible ? 'text-gray-900' : 'text-gray-500'}`}>
                                  {widget.title}
                                </h4>
                                <Badge 
                                  variant="secondary"
                                  style={{
                                    backgroundColor: categoryColors[widget.category].bg,
                                    color: categoryColors[widget.category].text
                                  }}
                                >
                                  {widget.category}
                                </Badge>
                              </div>
                              <p className={`text-sm ${widget.visible ? 'text-gray-600' : 'text-gray-400'}`}>
                                {widget.description}
                              </p>
                            </div>

                            <div className="flex items-center gap-2">
                              {widget.visible ? (
                                <Eye className="h-4 w-4 text-green-600" />
                              ) : (
                                <EyeOff className="h-4 w-4 text-gray-400" />
                              )}
                              <Switch
                                checked={widget.visible}
                                onCheckedChange={() => toggleWidget(widget.id)}
                              />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            {/* Tips */}
            <div className="pt-4 border-t">
              <div className="text-sm text-gray-600">
                <strong>Tip:</strong> Drag widgets to reorder them. Use the toggle to show or hide widgets.
              </div>
            </div>
          </div>
        </div>
      </SlidePanel>
    </>
  )
} 