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
  const [showFilters, setShowFilters] = useState(false)
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")

  const filteredData = sampleTimelineData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = selectedType === "all" || item.type === selectedType
    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus
    
    return matchesSearch && matchesType && matchesStatus
  })

  const stats = {
    total: sampleTimelineData.length,
    completed: sampleTimelineData.filter(i => i.status === 'completed').length,
    inProgress: sampleTimelineData.filter(i => i.status === 'in-progress').length,
    pending: sampleTimelineData.filter(i => i.status === 'pending').length
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            Timeline
          </h1>
          <p className="text-text-secondary">
            Track the progress of your financial planning journey and view all activities.
          </p>
        </div>

        <div className="max-w-7xl mx-auto space-y-6">
          {/* Breadcrumb */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Timeline</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Search and Filter Controls */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search timeline..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2"
                  >
                    <Filter className="h-4 w-4" />
                    Filters
                    {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                  
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>

              {/* Filter Options */}
              {showFilters && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex flex-wrap gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                      <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                      >
                        <option value="all">All Types</option>
                        <option value="milestone">Milestones</option>
                        <option value="decision">Decisions</option>
                        <option value="meeting">Meetings</option>
                        <option value="update">Updates</option>
                        <option value="document">Documents</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                      >
                        <option value="all">All Status</option>
                        <option value="completed">Completed</option>
                        <option value="in-progress">In Progress</option>
                        <option value="pending">Pending</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Timeline Content */}
          <ExpandedTimeline items={filteredData} />
        </div>
      </div>
    </DashboardLayout>
  )
} 