# Dashboard Widget System

This document describes the widget system implemented for the client portal dashboard.

## Overview

The widget system allows users to customize their dashboard by:
- Showing/hiding widgets
- Reordering widget positions
- Persisting preferences in localStorage

## Architecture

### Core Components

1. **WidgetProvider** (`lib/widget-context.tsx`)
   - Manages widget state and configuration
   - Provides context for widget visibility and ordering
   - Handles localStorage persistence

2. **WidgetManagementSlidePanel** (`components/widget-management-slide-panel.tsx`)
   - UI for managing widget visibility and order
   - Slide-out panel that appears on the right side
   - Drag-and-drop reordering functionality
   - Reset to default functionality

3. **WidgetRenderer** (`components/widget-renderer.tsx`)
   - Dynamically renders widgets based on configuration
   - Maps widget components to their identifiers

### Widget Components

All widget components are located in `components/widgets/`:

- `welcome-section.tsx` - Personalized welcome message
- `stats-cards.tsx` - Key metrics and performance indicators
- `action-queue.tsx` - Tasks requiring attention
- `recent-updates.tsx` - Latest updates from financial team
- `financial-team.tsx` - Contact information for advisors
- `upcoming-meetings.tsx` - Scheduled meetings and appointments
- `project-overview.tsx` - Active projects and progress

## Widget Configuration

Each widget has the following configuration:

```typescript
interface Widget {
  id: string                    // Unique identifier
  title: string                // Display name
  description: string          // Description for management UI
  component: string            // Component identifier
  visible: boolean             // Whether widget is shown
  order: number                // Display order (0-based)
  category: 'overview' | 'actions' | 'team' | 'projects' | 'meetings'
}
```

## Adding New Widgets

To add a new widget:

1. Create a new component in `components/widgets/`
2. Export the component as a named export
3. Add the component to the `widgetComponents` mapping in `WidgetRenderer`
4. Add the widget configuration to the `defaultWidgets` array in `WidgetProvider`

## Usage

The widget system is automatically integrated into the dashboard. Users can:

1. Click the "Manage Widgets" button in the dashboard header to open a slide-out panel on the right side
2. Toggle widget visibility using switches
3. Drag and drop widgets to reorder them
4. Reset to default configuration

## Data Persistence

Widget preferences are automatically saved to localStorage and restored on page load. 