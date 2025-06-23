"use client"

import { useState } from "react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { 
  Home, 
  FolderOpen, 
  MessageSquare, 
  Calendar, 
  FileText, 
  Users, 
  Settings, 
  HelpCircle,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  Search,
  Filter,
  Download,
  Plus,
  ChevronDown,
  ChevronUp
} from "lucide-react"
import Link from "next/link"
import ExpandedTimeline from "@/components/expanded-timeline"
import DashboardLayout from "@/components/dashboard-layout"

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Projects', href: '/dashboard/projects', icon: FolderOpen },
  { name: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
  { name: 'People', href: '/dashboard/people', icon: Users },
  { name: 'Documents', href: '/dashboard/documents', icon: FileText },
  { name: 'Billing', href: '/dashboard/billing', icon: TrendingUp },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  { name: 'Resources & Education', href: '/dashboard/resources', icon: HelpCircle },
];

const sampleTimelineData = [
  {
    id: "1",
    user: "Jenny Wilson",
    userAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
    time: "2 hours ago",
    title: "Completed comprehensive review of SLAT trust agreement draft",
    content: "After three meetings with the client and multiple rounds of revisions, I'm pleased to share that we've reached a final consensus on all key provisions. The trust structure now includes all necessary dynasty trust provisions and spousal access features.",
    tags: ["Trust Structure Approval", "SLAT-Trust-Agreement-Draft", "Trust Structure Diagram"],
    type: "milestone" as const,
    status: "completed" as const,
    attachments: [
      {
        name: "SLAT-Trust-Agreement-Final.pdf",
        type: "PDF",
        size: "2.4 MB",
        url: "#"
      },
      {
        name: "Trust-Structure-Diagram.vsdx",
        type: "Visio",
        size: "1.8 MB",
        url: "#"
      }
    ]
  },
  {
    id: "2",
    user: "Jakob Press",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
    time: "11:32 AM",
    title: "Secure Final Trust Structure Approvals",
    content: "Obtained all required approvals for the final trust structure. This completes three months of planning work. We now have sign-off from legal counsel, tax specialists, and the client.",
    tags: ["Final-Structure-Approvals"],
    type: "decision" as const,
    status: "completed" as const
  },
  {
    id: "3",
    user: "Sarah Johnson",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
    time: "Yesterday at 3:00 PM",
    title: "Quarterly Review Meeting",
    content: "Q2 progress review and Q3 planning session with the client. Discussed portfolio performance, tax implications, and upcoming estate planning milestones.",
    tags: ["Quarterly Review", "Portfolio Review"],
    type: "meeting" as const,
    status: "completed" as const,
    participants: ["John Smith", "Sarah Johnson", "Michael Torres"],
    duration: "1 hour",
    location: "Zoom Meeting"
  },
  {
    id: "4",
    user: "Michael Torres",
    userAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=32&h=32&fit=crop&crop=face",
    time: "May 15 at 10:00 AM",
    title: "Estate Planning Session",
    content: "Review updated estate planning documents including will, power of attorney, and healthcare directives. Client requested additional provisions for charitable giving.",
    tags: ["Estate Planning", "Legal Documents"],
    type: "meeting" as const,
    status: "completed" as const,
    participants: ["John Smith", "Michael Torres"],
    duration: "45 minutes",
    location: "In-Person Office"
  },
  {
    id: "5",
    user: "Roger Culhane",
    userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
    time: "May 12 at 2:30 PM",
    title: "Tax Planning Strategy Review",
    content: "Developed comprehensive tax planning strategy for the upcoming year. Focused on maximizing retirement contributions, charitable giving strategies, and tax-loss harvesting opportunities.",
    tags: ["Tax Planning", "Strategy"],
    type: "update" as const,
    status: "in-progress" as const,
    attachments: [
      {
        name: "Tax-Planning-Strategy-2024.pdf",
        type: "PDF",
        size: "3.1 MB",
        url: "#"
      }
    ]
  },
  {
    id: "6",
    user: "Hanna Simpson",
    userAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face",
    time: "May 10 at 9:15 AM",
    title: "Insurance Policy Review",
    content: "Comprehensive review of life insurance policies and beneficiary designations. Identified opportunities for policy optimization and cost savings.",
    tags: ["Insurance Review", "Beneficiary Designation"],
    type: "document" as const,
    status: "completed" as const,
    attachments: [
      {
        name: "Insurance-Policy-Summary.xlsx",
        type: "Excel",
        size: "856 KB",
        url: "#"
      },
      {
        name: "Beneficiary-Designation-Forms.pdf",
        type: "PDF",
        size: "1.2 MB",
        url: "#"
      }
    ]
  },
  {
    id: "7",
    user: "Daniel Warren",
    userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face",
    time: "May 8 at 4:45 PM",
    title: "Investment Portfolio Rebalancing",
    content: "Executed quarterly portfolio rebalancing to maintain target asset allocation. Adjusted positions based on market conditions and client risk tolerance.",
    tags: ["Portfolio Management", "Rebalancing"],
    type: "update" as const,
    status: "completed" as const
  },
  {
    id: "8",
    user: "Jenny Wilson",
    userAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
    time: "May 5 at 11:00 AM",
    title: "Trust Funding Strategy Meeting",
    content: "Discussed optimal funding strategy for the SLAT trust. Reviewed asset selection criteria and transfer timing to maximize tax efficiency.",
    tags: ["Trust Funding", "Asset Transfer"],
    type: "meeting" as const,
    status: "completed" as const,
    participants: ["John Smith", "Jenny Wilson", "Jakob Press"],
    duration: "1.5 hours",
    location: "Conference Room A"
  },
  {
    id: "9",
    user: "Sarah Johnson",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
    time: "May 3 at 3:30 PM",
    title: "Retirement Planning Analysis",
    content: "Completed retirement planning analysis including Social Security optimization, required minimum distribution planning, and retirement income projections.",
    tags: ["Retirement Planning", "Social Security"],
    type: "document" as const,
    status: "in-progress" as const,
    attachments: [
      {
        name: "Retirement-Planning-Analysis.pdf",
        type: "PDF",
        size: "4.2 MB",
        url: "#"
      }
    ]
  },
  {
    id: "10",
    user: "Michael Torres",
    userAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=32&h=32&fit=crop&crop=face",
    time: "May 1 at 10:00 AM",
    title: "Estate Tax Projection Review",
    content: "Updated estate tax projections based on current federal and state tax laws. Reviewed potential impact of proposed legislative changes.",
    tags: ["Estate Tax", "Projections"],
    type: "update" as const,
    status: "pending" as const
  }
]

export default function TimelinePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  const filteredData = sampleTimelineData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.user.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus
    const matchesType = selectedType === "all" || item.type === selectedType
    
    return matchesSearch && matchesStatus && matchesType
  })

  const stats = {
    total: sampleTimelineData.length,
    completed: sampleTimelineData.filter(i => i.status === 'completed').length,
    inProgress: sampleTimelineData.filter(i => i.status === 'in-progress').length,
    pending: sampleTimelineData.filter(i => i.status === 'pending').length
  }

  return (
    <DashboardLayout>
      <div className="flex min-h-screen bg-gray-50">
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Project Timeline</h1>
                <p className="text-gray-600 mt-1">Track all project activities and milestones</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Activity
                </Button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex">
            {/* Filters Sidebar */}
            <div className="w-80 bg-white border-r border-gray-200 p-6">
              <div className="space-y-6">
                {/* Search */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Search</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search activities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Quick Stats */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Overview</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Total Activities</span>
                      <Badge variant="secondary">{stats.total}</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                      <span className="text-sm text-emerald-700">Completed</span>
                      <Badge className="bg-emerald-100 text-emerald-800">{stats.completed}</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm text-blue-700">In Progress</span>
                      <Badge className="bg-blue-100 text-blue-800">{stats.inProgress}</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                      <span className="text-sm text-amber-700">Pending</span>
                      <Badge className="bg-amber-100 text-amber-800">{stats.pending}</Badge>
                    </div>
                  </div>
                </div>

                {/* Filters */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-900">Filters</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowFilters(!showFilters)}
                      className="h-6 w-6 p-0"
                    >
                      {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </Button>
                  </div>
                  
                  {showFilters && (
                    <div className="space-y-4">
                      {/* Status Filter */}
                      <div>
                        <label className="text-xs font-medium text-gray-700 mb-2 block">Status</label>
                        <div className="space-y-2">
                          {[
                            { value: 'all', label: 'All Statuses', count: stats.total },
                            { value: 'completed', label: 'Completed', count: stats.completed },
                            { value: 'in-progress', label: 'In Progress', count: stats.inProgress },
                            { value: 'pending', label: 'Pending', count: stats.pending }
                          ].map((status) => (
                            <label key={status.value} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="status"
                                value={status.value}
                                checked={selectedStatus === status.value}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="w-4 h-4 text-blue-600"
                              />
                              <span className="text-sm text-gray-700">{status.label}</span>
                              <Badge variant="secondary" className="ml-auto text-xs">{status.count}</Badge>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Type Filter */}
                      <div>
                        <label className="text-xs font-medium text-gray-700 mb-2 block">Type</label>
                        <div className="space-y-2">
                          {[
                            { value: 'all', label: 'All Types', count: stats.total },
                            { value: 'update', label: 'Updates', count: sampleTimelineData.filter(i => i.type === 'update').length },
                            { value: 'decision', label: 'Decisions', count: sampleTimelineData.filter(i => i.type === 'decision').length },
                            { value: 'meeting', label: 'Meetings', count: sampleTimelineData.filter(i => i.type === 'meeting').length },
                            { value: 'document', label: 'Documents', count: sampleTimelineData.filter(i => i.type === 'document').length },
                            { value: 'milestone', label: 'Milestones', count: sampleTimelineData.filter(i => i.type === 'milestone').length }
                          ].map((type) => (
                            <label key={type.value} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="type"
                                value={type.value}
                                checked={selectedType === type.value}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="w-4 h-4 text-blue-600"
                              />
                              <span className="text-sm text-gray-700">{type.label}</span>
                              <Badge variant="secondary" className="ml-auto text-xs">{type.count}</Badge>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Timeline Content */}
            <div className="flex-1 p-6">
              <div className="max-w-4xl mx-auto">
                <ExpandedTimeline 
                  items={filteredData}
                  title="Project Activities"
                  showFilters={false}
                  maxItems={10}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 