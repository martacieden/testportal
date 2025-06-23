import React from "react"
import { Badge } from "@/components/ui/badge"
import { getCategoryById, getCategoryByName } from "@/lib/document-categories"

interface DocumentCategoryBadgeProps {
  category: string // Can be either category ID or name
  showIcon?: boolean
  className?: string
}

export function DocumentCategoryBadge({ 
  category, 
  showIcon = true, 
  className = "" 
}: DocumentCategoryBadgeProps) {
  // Try to find by ID first, then by name
  const categoryConfig = getCategoryById(category) || getCategoryByName(category)
  
  if (!categoryConfig) {
    return (
      <Badge variant="secondary" className={className}>
        {category}
      </Badge>
    )
  }

  const IconComponent = categoryConfig.icon

  return (
    <Badge 
      className={`${categoryConfig.color} ${className}`}
      variant="outline"
    >
      {showIcon && <IconComponent className="h-3 w-3 mr-1" />}
      {categoryConfig.name}
    </Badge>
  )
} 