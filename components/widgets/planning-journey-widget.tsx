"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Shield, Building2, Heart, Calculator, FileText, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

// Simplified service areas for widget view
const serviceAreas = [
  {
    key: 'financial-planning',
    title: 'Financial Planning',
    icon: <TrendingUp className="h-4 w-4" />,
    progress: 85,
    status: 'on-track',
    priority: 'high'
  },
  {
    key: 'estate-planning',
    title: 'Estate Planning',
    icon: <Shield className="h-4 w-4" />,
    progress: 45,
    status: 'needs-attention',
    priority: 'high'
  },
  {
    key: 'business-succession',
    title: 'Business Succession',
    icon: <Building2 className="h-4 w-4" />,
    progress: 30,
    status: 'behind',
    priority: 'high'
  },
  {
    key: 'insurance-planning',
    title: 'Insurance',
    icon: <Heart className="h-4 w-4" />,
    progress: 60,
    status: 'on-track',
    priority: 'medium'
  },
  {
    key: 'tax-planning',
    title: 'Tax Planning',
    icon: <Calculator className="h-4 w-4" />,
    progress: 75,
    status: 'excellent',
    priority: 'medium'
  },
  {
    key: 'documentation',
    title: 'Documentation',
    icon: <FileText className="h-4 w-4" />,
    progress: 90,
    status: 'excellent',
    priority: 'low'
  }
]

const statusConfig: Record<string, { color: string }> = {
  excellent: { color: 'bg-green-100 text-green-800 border-green-200' },
  'on-track': { color: 'bg-blue-100 text-blue-800 border-blue-200' },
  'needs-attention': { color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  behind: { color: 'bg-red-100 text-red-800 border-red-200' },
  'not-started': { color: 'bg-gray-100 text-gray-800 border-gray-200' }
}

const priorityConfig: Record<string, { color: string }> = {
  high: { color: 'bg-red-100 text-red-800 border-red-200' },
  medium: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  low: { color: 'bg-green-100 text-green-800 border-green-200' }
}

export default function PlanningJourneyWidget() {
  // Calculate overall progress
  const overallProgress = Math.round(
    serviceAreas.reduce((sum, area) => sum + area.progress, 0) / serviceAreas.length
  )

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600'
    if (progress >= 60) return 'text-blue-600'
    if (progress >= 40) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold" style={{ color: "#063852" }}>Planning Journey</CardTitle>
          <Link href="/dashboard/planning">
            <Button variant="ghost" size="sm">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold",
              getProgressColor(overallProgress) === 'text-green-600' ? 'bg-green-100' :
              getProgressColor(overallProgress) === 'text-blue-600' ? 'bg-blue-100' :
              getProgressColor(overallProgress) === 'text-yellow-600' ? 'bg-yellow-100' : 'bg-red-100',
              getProgressColor(overallProgress)
            )}>
              {overallProgress}%
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">Overall Progress</p>
            <p className="text-xs text-muted-foreground">
              {overallProgress}% complete across all areas
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {serviceAreas.slice(0, 4).map((area) => (
            <div key={area.key} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-md bg-blue-50 text-blue-600">
                  {area.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{area.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress value={area.progress} className="w-16 h-1.5" />
                    <span className="text-xs text-muted-foreground">{area.progress}%</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge 
                  variant="outline" 
                  className={cn("text-xs", statusConfig[area.status].color)}
                >
                  {area.status.replace('-', ' ')}
                </Badge>
                <Badge 
                  variant="outline" 
                  className={cn("text-xs", priorityConfig[area.priority].color)}
                >
                  {area.priority}
                </Badge>
              </div>
            </div>
          ))}
        </div>
        
        {serviceAreas.length > 4 && (
          <div className="mt-4 pt-3 border-t">
            <Link href="/dashboard/planning">
              <Button variant="outline" size="sm" className="w-full">
                View All {serviceAreas.length} Service Areas
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 