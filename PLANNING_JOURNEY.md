# Planning Journey Component

A comprehensive React component for displaying wealth management planning progress with service areas, progress tracking, and detailed task management.

## Features

### Main Layout Structure
- **Page Header**: Dynamic title based on view mode (client vs advisor)
- **Filter Controls**: Time-based filtering (Current Quarter, Next Quarter, All Items)
- **Export Functionality**: Progress report export button
- **Overall Progress Indicator**: Circular progress with color coding (72% example)

### Service Areas Grid
- **6 Main Service Areas**: Financial Planning, Estate Planning, Business Succession, Insurance, Tax Planning, Documentation
- **Accordion Behavior**: Click to expand/collapse, only one expanded at a time
- **Progress Tracking**: Visual progress bars with percentage completion
- **Status Indicators**: Color-coded badges (excellent, on-track, needs-attention, behind, not-started)
- **Priority Levels**: High, medium, low priority badges

### Detailed Task Management
- **Task Lists**: Comprehensive task tracking with completion status
- **Assignee Information**: Shows responsible advisor for each task
- **Due Dates**: Formatted date display with overdue indicators
- **Task Descriptions**: Detailed explanations of each task
- **Recent Updates**: Timeline of recent progress updates

## Usage

### Basic Usage
```tsx
import { PlanningJourney } from "@/components/planning-journey"

export default function PlanningPage() {
  return (
    <div className="container mx-auto py-6">
      <PlanningJourney />
    </div>
  )
}
```

### Advisor View
```tsx
import { PlanningJourney } from "@/components/planning-journey"

export default function AdvisorPlanningPage() {
  return (
    <div className="container mx-auto py-6">
      <PlanningJourney isAdvisorView={true} />
    </div>
  )
}
```

### Widget Version
```tsx
import PlanningJourneyWidget from "@/components/widgets/planning-journey-widget"

// Use in dashboard widget system
<PlanningJourneyWidget />
```

## Service Areas Data Structure

The component uses a comprehensive data structure for each service area:

```typescript
interface ServiceArea {
  title: string
  icon: React.ReactNode
  progress: number
  status: 'excellent' | 'on-track' | 'needs-attention' | 'behind' | 'not-started'
  priority: 'high' | 'medium' | 'low'
  advisor: string
  nextAction: string
  dueDate: string
  estimatedCompletion: string
  completedTasks: number
  totalTasks: number
  recentUpdates: string[]
  tasks: Task[]
}
```

## Navigation Integration

The Planning Journey page has been added to the main dashboard navigation:

- **Route**: `/dashboard/planning`
- **Advisor Route**: `/dashboard/planning/advisor`
- **Navigation Item**: "Planning Journey" with Target icon

## Styling

The component uses the existing design system:
- **Cards**: Consistent card layout with proper spacing
- **Badges**: Color-coded status and priority indicators
- **Progress Bars**: Visual progress tracking
- **Icons**: Lucide React icons for visual hierarchy
- **Typography**: Consistent text sizing and weights
- **Colors**: Semantic color coding for status and priority levels

## Responsive Design

- **Mobile**: Stacked layout with proper touch targets
- **Tablet**: Optimized grid layout
- **Desktop**: Full two-column layout for expanded content

## Accessibility

- **Keyboard Navigation**: Full keyboard support for accordion interaction
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Color Contrast**: WCAG compliant color combinations
- **Focus Management**: Clear focus indicators

## Customization

The component can be customized by:
- Modifying the `serviceAreas` data structure
- Adjusting status and priority configurations
- Customizing color schemes in the configuration objects
- Adding new service areas or modifying existing ones

## Integration Points

- **Widget System**: Available as a dashboard widget
- **Navigation**: Integrated into main dashboard navigation
- **Routing**: Next.js App Router compatible
- **State Management**: Uses React hooks for local state
- **Export Functionality**: Ready for PDF/Excel export implementation 