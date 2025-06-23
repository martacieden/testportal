import { Widget } from "@/lib/widget-context"
import { WelcomeSectionWidget } from "./widgets/welcome-section"
import { StatsCardsWidget } from "./widgets/stats-cards"
import { ActionQueueWidget } from "./widgets/action-queue"
import { RecentUpdatesWidget } from "./widgets/recent-updates"
import { FinancialTeamWidget } from "./widgets/financial-team"
import { UpcomingMeetingsWidget } from "./widgets/upcoming-meetings"
import { ProjectOverviewWidget } from "./widgets/project-overview"

interface WidgetRendererProps {
  widget: Widget
}

const widgetComponents: Record<string, React.ComponentType> = {
  'welcome-section': WelcomeSectionWidget,
  'stats-cards': StatsCardsWidget,
  'action-queue': ActionQueueWidget,
  'recent-updates': RecentUpdatesWidget,
  'financial-team': FinancialTeamWidget,
  'upcoming-meetings': UpcomingMeetingsWidget,
  'project-overview': ProjectOverviewWidget,
}

export function WidgetRenderer({ widget }: WidgetRendererProps) {
  const WidgetComponent = widgetComponents[widget.component]
  
  if (!WidgetComponent) {
    console.warn(`Widget component not found: ${widget.component}`)
    return null
  }

  return <WidgetComponent />
} 