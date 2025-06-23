"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Clock, 
  FileText, 
  MessageSquare, 
  CheckCircle, 
  AlertCircle, 
  Calendar,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Download,
  Eye,
  MoreHorizontal,
  User,
  MapPin,
  Users
} from "lucide-react"
import { cn } from "@/lib/utils"

interface TimelineItem {
  id: string
  user: string
  userAvatar?: string
  time: string
  title: string
  content: string
  tags: string[]
  type: 'update' | 'decision' | 'meeting' | 'document' | 'milestone'
  status?: 'completed' | 'pending' | 'in-progress'
  attachments?: Array<{
    name: string
    type: string
    size: string
    url: string
  }>
  participants?: string[]
  duration?: string
  location?: string
}

interface ExpandedTimelineProps {
  items: TimelineItem[]
  title?: string
  showFilters?: boolean
  maxItems?: number
}

const timelineIcons = {
  update: MessageSquare,
  decision: CheckCircle,
  meeting: Calendar,
  document: FileText,
  milestone: CheckCircle
}

const statusColors = {
  completed: 'bg-emerald-500',
  pending: 'bg-amber-500',
  'in-progress': 'bg-blue-500'
}

const typeColors = {
  update: 'bg-blue-500',
  decision: 'bg-emerald-500',
  meeting: 'bg-purple-500',
  document: 'bg-orange-500',
  milestone: 'bg-indigo-500'
}

const typeLabels = {
  update: 'Update',
  decision: 'Decision',
  meeting: 'Meeting',
  document: 'Document',
  milestone: 'Milestone'
}

export default function ExpandedTimeline({ 
  items, 
  title = "Project Timeline", 
  showFilters = true,
  maxItems 
}: ExpandedTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [selectedType, setSelectedType] = useState<string>('all')
  const [showAll, setShowAll] = useState(false)

  const filteredItems = selectedType === 'all' 
    ? items 
    : items.filter(item => item.type === selectedType)

  const displayedItems = showAll ? filteredItems : (maxItems ? filteredItems.slice(0, maxItems) : filteredItems)

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId)
    } else {
      newExpanded.add(itemId)
    }
    setExpandedItems(newExpanded)
  }

  const typeOptions = [
    { value: 'all', label: 'All', count: items.length },
    { value: 'update', label: 'Updates', count: items.filter(i => i.type === 'update').length },
    { value: 'decision', label: 'Decisions', count: items.filter(i => i.type === 'decision').length },
    { value: 'meeting', label: 'Meetings', count: items.filter(i => i.type === 'meeting').length },
    { value: 'document', label: 'Documents', count: items.filter(i => i.type === 'document').length },
    { value: 'milestone', label: 'Milestones', count: items.filter(i => i.type === 'milestone').length }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <p className="text-gray-600 mt-1">Track all project activities and milestones</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {items.length} activities
          </Badge>
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="flex flex-wrap gap-2">
          {typeOptions.map((option) => (
            <Button
              key={option.value}
              variant={selectedType === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType(option.value)}
              className={cn(
                "text-sm font-medium",
                selectedType === option.value 
                  ? "border-[#1E9ADF] text-[#1E9ADF] bg-white" 
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              )}
            >
              {option.label}
              <Badge variant="secondary" className="ml-2 text-xs">
                {option.count}
              </Badge>
            </Button>
          ))}
        </div>
      )}

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />
        
        <div className="space-y-8">
          {displayedItems.map((item, index) => {
            const IconComponent = timelineIcons[item.type]
            const isExpanded = expandedItems.has(item.id)

            return (
              <div key={item.id} className="relative">
                {/* Timeline dot */}
                <div className="absolute left-6 top-6 w-4 h-4 rounded-full bg-white border-4 border-gray-200 z-10" />
                
                {/* Status indicator */}
                {item.status && (
                  <div className={cn(
                    "absolute left-5 top-5 w-6 h-6 rounded-full border-4 border-white z-20",
                    statusColors[item.status]
                  )} />
                )}

                {/* Content card */}
                <div className="ml-16">
                  <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center",
                            typeColors[item.type]
                          )}>
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="flex items-center gap-3">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={item.userAvatar} />
                                <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
                                  {item.user.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-gray-900">{item.user}</span>
                                  <span className="text-gray-400">•</span>
                                  <span className="text-gray-500 text-sm">{item.time}</span>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge 
                                    variant="outline" 
                                    className="text-xs bg-gray-50 border-gray-200"
                                  >
                                    {typeLabels[item.type]}
                                  </Badge>
                                  {item.status && (
                                    <Badge 
                                      variant="outline" 
                                      className={cn("text-xs", {
                                        'bg-emerald-50 text-emerald-700 border-emerald-200': item.status === 'completed',
                                        'bg-amber-50 text-amber-700 border-amber-200': item.status === 'pending',
                                        'bg-blue-50 text-blue-700 border-blue-200': item.status === 'in-progress'
                                      })}
                                    >
                                      {item.status.replace('-', ' ')}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleExpanded(item.id)}
                            className="h-8 w-8 p-0 hover:bg-gray-100"
                          >
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Content */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">{item.content}</p>
                        
                        {/* Tags */}
                        {item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {item.tags.map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="outline" className="text-xs bg-gray-50 border-gray-200">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {/* Meeting details */}
                        {item.type === 'meeting' && item.participants && (
                          <div className="bg-blue-50 p-4 rounded-lg mb-4">
                            <div className="flex items-center gap-2 text-blue-700 mb-3">
                              <Calendar className="w-4 h-4" />
                              <span className="font-medium">Meeting Details</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                              {item.duration && (
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4 text-blue-600" />
                                  <span className="text-blue-700">{item.duration}</span>
                                </div>
                              )}
                              {item.location && (
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4 text-blue-600" />
                                  <span className="text-blue-700">{item.location}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-2 md:col-span-2">
                                <Users className="w-4 h-4 text-blue-600" />
                                <span className="text-blue-700">
                                  {item.participants.join(', ')}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Attachments */}
                        {item.attachments && item.attachments.length > 0 && (
                          <div className="bg-gray-50 p-4 rounded-lg mb-4">
                            <div className="flex items-center gap-2 text-gray-700 mb-3">
                              <FileText className="w-4 h-4" />
                              <span className="font-medium">Attachments</span>
                            </div>
                            <div className="space-y-2">
                              {item.attachments.map((attachment, attIndex) => (
                                <div key={attIndex} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
                                  <div className="flex items-center gap-3">
                                    <FileText className="w-5 h-5 text-gray-400" />
                                    <div>
                                      <div className="font-medium text-gray-900">{attachment.name}</div>
                                      <div className="text-xs text-gray-500">
                                        {attachment.type} • {attachment.size}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                      <Eye className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                      <Download className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Expanded content */}
                        {isExpanded && (
                          <div className="mt-6 pt-6 border-t border-gray-200">
                            <div className="text-gray-600">
                              <p className="mb-4">Additional context and detailed information about this activity would be displayed here...</p>
                              <div className="flex gap-3">
                                <Button size="sm" variant="outline" className="flex items-center gap-2">
                                  <ExternalLink className="w-4 h-4" />
                                  View Details
                                </Button>
                                <Button size="sm" variant="outline" className="flex items-center gap-2">
                                  <MessageSquare className="w-4 h-4" />
                                  Add Comment
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )
          })}
        </div>

        {/* Show more/less button */}
        {filteredItems.length > (maxItems || 5) && (
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="px-8"
            >
              {showAll ? 'Show Less' : `Show ${filteredItems.length - (maxItems || 5)} More Activities`}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
} 