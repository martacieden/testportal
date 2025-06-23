"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, FolderOpen, MessageSquare, Calendar, FileText, Users, Settings, HelpCircle, TrendingUp, CheckCircle, Clock, AlertCircle, Paperclip, Mail, StickyNote, Plus, MoreHorizontal, Lightbulb, Sparkles, Filter } from "lucide-react"
import Link from "next/link"

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

const tabs = [
  { name: 'Overview', badge: 3 },
  { name: 'Details' },
  { name: 'Tasks' },
  { name: 'Decisions' },
  { name: 'Attachments', badge: 1 },
  { name: 'Emails', badge: 4 },
  { name: 'Notes' },
]

const metrics = [
  { name: 'Updates', value: 10, icon: MessageSquare },
  { name: 'Tasks', value: 12, icon: CheckCircle, badge: { overdue: 2, dueSoon: 2 } },
  { name: 'Decisions', value: 11, icon: Lightbulb, badge: { overdue: 1, dueSoon: 1 } },
  { name: 'Attachments', value: 17, icon: Paperclip },
]

const progressLegend = [
  { label: 'Not Started', value: 7, color: 'bg-gray-300' },
  { label: 'In Progress', value: 7, color: 'bg-blue-500' },
  { label: 'Completed', value: 7, color: 'bg-green-500' },
  { label: 'Blocked', value: 2, color: 'bg-red-500' },
]

const aiInsight = `Your project requires attention: please review and approve pending decisions, update task deadlines, and provide team feedback. Recently, 5 tasks were completed, progress increased by 15%, and a new team member was added. Currently, 7 tasks are in progress, with an upcoming milestone next week requiring team collaboration. We recommend reviewing tax implications, scheduling a team sync, and updating documentation as your next steps.`

const timelineData = [
  {
    id: "1",
    user: "Patricia Sullivan",
    userAvatar: "",
    userInitials: "PS",
    time: "Today at 2:30 PM",
    priority: "Significant",
    title: "SLAT Trust Document Review Completed",
    content: "We've completed a comprehensive review of the SLAT trust agreement draft with outside counsel. After three meetings and multiple rounds of revisions, I'm pleased to share that we've reached a final consensus on all key prov...",
    tags: ["SLAT-Trust-Agreeme...", "Trust Structure Di...", "Secure Final Trust Stru...", "FW: Beneficiary Designa..."],
    status: "completed"
  },
  {
    id: "2",
    user: "Andrew Kim",
    userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
    time: "Today at 10:15 AM",
    priority: "Critical",
    title: "Secure Final Trust Structure Approvals",
    content: "Obtained all required approvals for the final trust structure. This completes three months of planning work. We now have sign-off from legal counsel, tax specialists, and the client. The approved structure includes dynasty t...",
    tags: ["Final-Structure-Ap...", "Final Trust Structure A...", "Trust Decanting Provisi..."],
    status: "completed"
  },
  {
    id: "3",
    user: "Patricia Sullivan",
    userAvatar: "",
    userInitials: "PS",
    time: "Yesterday at 8:40 PM",
    priority: "Significant",
    title: "Trust Protector Selection Approved",
    content: "After extensive deliberation and candidate evaluation, we've finalized both the trust protector selection criteria and approved the initial appointee for the SLAT. Jonathan Harrington, JD, LLM will serve as the initial Trust...",
    tags: ["Trust-Protector-Ro...", "Trust Funding Prioritiz...", "Trust Protector Selecti...", "FW: Beneficiary Designa..."],
    status: "completed"
  },
]

export default function ProjectOverviewPage() {
  return (
    <div className="container px-6 py-6">
      {/* Project Metrics */}
      <div className="space-y-1 mb-4 mt-8">
        <h2 className="text-2xl font-semibold">Project metrics</h2>
        <p className="text-muted-foreground">Track project progress, task completion, and key activity metrics</p>
      </div>
      
      <div className="grid grid-cols-4 gap-3">
        {metrics.map((metric) => (
          <Card key={metric.name} className="rounded-xl border bg-card text-card-foreground cursor-pointer hover:shadow-md transition-all">
            <CardContent className="p-6 pt-6 pb-4">
              <div className="flex items-center gap-2">
                <metric.icon className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">{metric.name}</span>
              </div>
              <div className="mt-2 flex items-end gap-3">
                <div className="text-2xl font-semibold">{metric.value}</div>
                {metric.badge && (
                  <div className="inline-flex items-center justify-center bg-orange-100 text-orange-700 font-medium text-xs rounded-full px-2 py-0.5 mb-0.5">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{metric.badge.overdue}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="w-full p-6 px-6 bg-white rounded-xl border border-gray-200">
          <div className="flex flex-col">
            <h3 className="text-lg font-medium">Progress</h3>
            <p className="text-[15px] text-muted-foreground">Combined progress of all tasks and decisions in this project by their current status</p>
          </div>
          <div className="flex h-3 mt-4 rounded-full overflow-hidden">
            <div className="h-full bg-green-500" style={{ width: '30.4348%' }}></div>
            <div className="h-full bg-blue-500" style={{ width: '30.4348%' }}></div>
            <div className="h-full bg-red-500" style={{ width: '8.69565%' }}></div>
            <div className="h-full bg-gray-300" style={{ width: '30.4348%' }}></div>
          </div>
          <div className="flex items-center gap-4 mt-3 flex-wrap">
            {progressLegend.map((item) => (
              <div key={item.label} className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${item.color} mr-2`}></div>
                <span className="text-[13px] font-medium text-gray-600">{item.label}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="mt-10 space-y-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold">AI Insights</h2>
              <p className="text-muted-foreground">Get real-time insights and recommendations for your project</p>
            </div>
            <Button variant="outline" className="h-10">
              <Sparkles className="mr-2 h-4 w-4" />
              Ask AI for more details
            </Button>
          </div>
          <div className="rounded-xl text-card-foreground p-6 bg-[#EFF6FF] border-0">
            <p className="text-[15px] text-gray-700 leading-relaxed">{aiInsight}</p>
          </div>
        </div>
      </div>

      {/* Updates Timeline */}
      <div>
        <div className="mt-10">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold">
                  <span className="flex items-center">
                    Updates timeline
                    <span className="ml-2 inline-flex items-center justify-center rounded-full bg-red-100 text-red-700 text-xs min-w-[20px] h-[20px] px-1.5 font-medium">3</span>
                  </span>
                </h2>
                <p className="text-muted-foreground">Track project activities, insights, and team updates</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="h-10">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" className="h-10">
                  <Plus className="mr-2 h-4 w-4" />
                  Post update
                </Button>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="relative space-y-6">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-border"></div>
              <div className="space-y-6 relative z-10">
                {timelineData.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <Avatar className="flex shrink-0 overflow-hidden rounded-full w-8 h-8 bg-background relative z-10">
                      {item.userAvatar ? (
                        <AvatarImage src={item.userAvatar} alt={item.user} />
                      ) : (
                        <AvatarFallback className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                          {item.userInitials}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <Card className="rounded-xl border bg-card text-card-foreground flex-1 p-4 relative z-10 hover:shadow-md transition-all cursor-pointer">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">{item.user}</span>
                            <span className="w-1 h-1 bg-border rounded-full"></span>
                            <span className="text-sm text-muted-foreground">{item.time}</span>
                            <span className="w-1 h-1 bg-border rounded-full"></span>
                            <span className="text-sm text-muted-foreground">{item.priority}</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                            <h4 className="text-[15px] font-medium">{item.title}</h4>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <p className="text-[15px] text-muted-foreground">{item.content}</p>
                          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                            {item.tags.map((tag, idx) => (
                              <span key={idx} className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs font-medium">
                                <Paperclip className="h-3 w-3 mr-1" />
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors pl-2 bg-white relative z-10 pt-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down h-4 w-4">
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
                <span>Show 42 more activities</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 