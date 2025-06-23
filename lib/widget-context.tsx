"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface Widget {
  id: string
  title: string
  description: string
  component: string
  visible: boolean
  order: number
  category: 'overview' | 'actions' | 'team' | 'projects' | 'meetings'
  fullWidth?: boolean
}

interface WidgetContextType {
  widgets: Widget[]
  visibleWidgets: Widget[]
  toggleWidget: (widgetId: string) => void
  reorderWidgets: (widgetIds: string[]) => void
  resetToDefault: () => void
  isManaging: boolean
  setIsManaging: (managing: boolean) => void
}

const defaultWidgets: Widget[] = [
  {
    id: 'welcome-section',
    title: 'Welcome Section',
    description: 'Personalized welcome message and overview',
    component: 'welcome-section',
    visible: true,
    order: 0,
    category: 'overview',
    fullWidth: true
  },
  {
    id: 'stats-cards',
    title: 'Statistics Cards',
    description: 'Key metrics and performance indicators',
    component: 'stats-cards',
    visible: true,
    order: 1,
    category: 'overview',
    fullWidth: true
  },
  {
    id: 'action-queue',
    title: 'My Action Queue',
    description: 'Tasks and items requiring your attention',
    component: 'action-queue',
    visible: true,
    order: 2,
    category: 'actions'
  },
  {
    id: 'recent-updates',
    title: 'Recent Updates',
    description: 'Latest updates from your financial team',
    component: 'recent-updates',
    visible: true,
    order: 2,
    category: 'overview'
  },
  {
    id: 'project-overview',
    title: 'Project Overview',
    description: 'Active projects and their progress',
    component: 'project-overview',
    visible: true,
    order: 3,
    category: 'projects'
  },
  {
    id: 'financial-team',
    title: 'My Financial Team',
    description: 'Contact information for your financial advisors',
    component: 'financial-team',
    visible: true,
    order: 3,
    category: 'team'
  },
  {
    id: 'upcoming-meetings',
    title: 'Upcoming Meetings',
    description: 'Scheduled meetings and appointments',
    component: 'upcoming-meetings',
    visible: false,
    order: 4,
    category: 'meetings'
  }
]

const WidgetContext = createContext<WidgetContextType | undefined>(undefined)

export function WidgetProvider({ children }: { children: React.ReactNode }) {
  const [widgets, setWidgets] = useState<Widget[]>(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('dashboard-widgets')
      return defaultWidgets
    }
    return defaultWidgets
  })
  
  const [isManaging, setIsManaging] = useState(false)

  const visibleWidgets = widgets
    .filter(widget => widget.visible)
    .sort((a, b) => a.order - b.order)

  const toggleWidget = (widgetId: string) => {
    setWidgets(prev => prev.map(widget => 
      widget.id === widgetId 
        ? { ...widget, visible: !widget.visible }
        : widget
    ))
  }

  const reorderWidgets = (widgetIds: string[]) => {
    setWidgets(prev => prev.map(widget => ({
      ...widget,
      order: widgetIds.indexOf(widget.id)
    })))
  }

  const resetToDefault = () => {
    setWidgets(defaultWidgets)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('dashboard-widgets', JSON.stringify(widgets))
    }
  }, [widgets])

  return (
    <WidgetContext.Provider value={{
      widgets,
      visibleWidgets,
      toggleWidget,
      reorderWidgets,
      resetToDefault,
      isManaging,
      setIsManaging
    }}>
      {children}
    </WidgetContext.Provider>
  )
}

export function useWidgets() {
  const context = useContext(WidgetContext)
  if (context === undefined) {
    throw new Error('useWidgets must be used within a WidgetProvider')
  }
  return context
} 