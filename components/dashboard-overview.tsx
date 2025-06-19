'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, FileText, FolderOpen, MessageSquare, TrendingUp, MoreHorizontal } from "lucide-react"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import QuickActions from "./quick-actions"
import { useState } from "react"
import { addDays, format, isSameDay } from "date-fns"

// Add SVG icons for Zoom and Google Meet at the top of the file
const ZoomIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="12" fill="#2D8CFF"/>
    <path d="M34 20.382v7.236c0 1.09-1.18 1.74-2.12 1.18l-3.88-2.42V29c0 1.1-.9 2-2 2H16c-1.1 0-2-.9-2-2V19c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v2.622l3.88-2.42C32.82 18.642 34 19.292 34 20.382z" fill="#fff"/>
  </svg>
);
const GoogleMeetIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="12" fill="#00897B"/>
    <path d="M16 16v16h6v-6h4l6 6V16l-6 6h-4v-6h-6z" fill="#fff"/>
    <path d="M34 16v16l-6-6h-4v-4h4l6-6z" fill="#FFD600"/>
  </svg>
);

// Add this array at the top, before the component
const recentActivities = [
  {
    id: 1,
    user: "David Rodriguez",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
    action: "uploaded a new document to",
    project: "Estate Planning",
    time: "2 hours ago",
  },
  {
    id: 2,
    user: "Michael Chen",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
    action: "scheduled a meeting for next week to review",
    project: "Portfolio Performance",
    time: "1 day ago",
  },
  {
    id: 3,
    user: "Jennifer Liu",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
    action: "sent a message regarding",
    project: "Quarterly Investment Review",
    time: "2 days ago",
  },
  {
    id: 4,
    user: "System",
    avatar: null,
    action: "completed",
    project: "Portfolio Rebalancing",
    time: "3 days ago",
  },
  {
    id: 5,
    user: "Michael Chen",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
    action: "scheduled a",
    project: "Tax Planning Consultation",
    time: "4 days ago",
  },
  {
    id: 6,
    user: "David Rodriguez",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
    action: "reviewed and approved",
    project: "Estate Planning Documents",
    time: "5 days ago",
  },
];

// Add this array at the top, before the component
const financialTeam = [
  {
    id: 1,
    name: "Michael Chen",
    role: "Senior Advisor",
    email: "michael.chen@cresset.com",
    phone: "(555) 123-4567",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Jennifer Liu",
    role: "Portfolio Manager",
    email: "jennifer.liu@cresset.com",
    phone: "(555) 234-5678",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "David Rodriguez",
    role: "Tax Specialist",
    email: "david.rodriguez@cresset.com",
    phone: "(555) 345-6789",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "Sarah Johnson",
    role: "Estate Planner",
    email: "sarah.johnson@cresset.com",
    phone: "(555) 456-7890",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 5,
    name: "Michael Torres",
    role: "Insurance Specialist",
    email: "michael.torres@cresset.com",
    phone: "(555) 567-8901",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 6,
    name: "Jennifer Lee",
    role: "Client Service Associate",
    email: "jennifer.lee@cresset.com",
    phone: "(555) 678-9012",
    avatar: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=40&h=40&fit=crop&crop=face",
  },
];

// Add planningAreas array at the top
const planningAreas = [
  {
    id: 1,
    name: "Financial Planning & Investment Strategy",
    nextStep: "Finalize asset allocation strategy and implement diversification recommendations",
    assignedTo: {
      name: "David Chen",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=24&h=24&fit=crop&crop=face"
    },
    progress: 70,
  },
  {
    id: 2,
    name: "Estate Planning & Wealth Transfer",
    nextStep: "Draft trust documents and schedule will execution meeting",
    assignedTo: {
      name: "Michael Torres",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=24&h=24&fit=crop&crop=face"
    },
    progress: 30,
  },
  {
    id: 3,
    name: "Tax Optimization & Strategy",
    nextStep: "Implement year-end tax strategies and prepare Q4 optimization plan",
    assignedTo: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=24&h=24&fit=crop&crop=face"
    },
    progress: 85,
  },
  {
    id: 4,
    name: "Risk Management & Insurance",
    nextStep: "Complete comprehensive insurance needs analysis and review long-term care options",
    assignedTo: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=24&h=24&fit=crop&crop=face"
    },
    progress: 25,
  },
];

// Add this array at the top, before the component
const meetings = [
  {
    id: 1,
    title: "Quarterly Review",
    type: "Video Call",
    description: "Q2 progress review and Q3 planning",
    date: "2024-06-20T14:00:00",
    link: "https://zoom.us/j/1234567890",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=16&h=16&fit=crop&crop=face",
    participant: "Sarah Johnson",
    duration: "1 hour"
  },
  {
    id: 2,
    title: "Estate Planning Session",
    type: "In-Person",
    description: "Review updated estate planning documents",
    date: "2024-06-25T10:00:00",
    link: "#",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=16&h=16&fit=crop&crop=face",
    participant: "Michael Torres",
    duration: "45 min"
  },
  {
    id: 3,
    title: "Portfolio Review",
    type: "Video Call",
    description: "Monthly investment performance review",
    date: "2024-06-28T15:00:00",
    link: "https://meet.google.com/abc-defg-hij",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=16&h=16&fit=crop&crop=face",
    participant: "Jennifer Liu",
    duration: "30 min"
  }
]

export default function DashboardOverview() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  // Generate a week strip centered on today
  const weekDates = Array.from({ length: 5 }, (_, i) => addDays(selectedDate, i - 2))
  // Filter meetings by selected date
  const filteredMeetings = meetings.filter(mtg => isSameDay(new Date(mtg.date), selectedDate))

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div
          className="rounded-lg p-6 text-white shadow-lg"
          style={{ background: "linear-gradient(135deg, #1E9ADF 0%, #063852 100%)" }}
        >
          <h2 className="text-2xl font-bold mb-2">Welcome back, John!</h2>
          <p className="text-blue-100">Here's what's happening with your financial planning today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="shadow-sm border-0" style={{ backgroundColor: "#FFFFFF" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium" style={{ color: "#063852" }}>
                Active Projects
              </CardTitle>
              <div className="p-2 rounded-lg" style={{ backgroundColor: "#FFC100" }}>
                <FolderOpen className="h-4 w-4" style={{ color: "#063852" }} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" style={{ color: "#063852" }}>
                6
              </div>
              <p className="text-xs" style={{ color: "#636466" }}>
                +2 from last month
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-0" style={{ backgroundColor: "#FFFFFF" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium" style={{ color: "#063852" }}>
                Pending Tasks
              </CardTitle>
              <div className="p-2 rounded-lg" style={{ backgroundColor: "#FFC100" }}>
                <Clock className="h-4 w-4" style={{ color: "#063852" }} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" style={{ color: "#063852" }}>
                12
              </div>
              <p className="text-xs" style={{ color: "#636466" }}>
                3 due this week
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-0" style={{ backgroundColor: "#FFFFFF" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium" style={{ color: "#063852" }}>
                Overall Progress
              </CardTitle>
              <div className="p-2 rounded-lg" style={{ backgroundColor: "#FFC100" }}>
                <TrendingUp className="h-4 w-4" style={{ color: "#063852" }} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" style={{ color: "#063852" }}>
                78%
              </div>
              <p className="text-xs" style={{ color: "#636466" }}>
                On track
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-0" style={{ backgroundColor: "#FFFFFF" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium" style={{ color: "#063852" }}>
                Pending Requests
              </CardTitle>
              <div className="p-2 rounded-lg" style={{ backgroundColor: "#FFC100" }}>
                <Clock className="h-4 w-4" style={{ color: "#063852" }} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" style={{ color: "#063852" }}>
                2
              </div>
              <p className="text-xs" style={{ color: "#636466" }}>
                Need attention
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities and Upcoming Meetings Row */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Activities */}
          <Card className="shadow-sm border-0 flex flex-col justify-between" style={{ backgroundColor: "#FFFFFF", minHeight: '420px' }}>
            <CardHeader>
              <CardTitle className="text-lg font-semibold" style={{ color: "#063852" }}>
                Recent Activities
              </CardTitle>
              <CardDescription style={{ color: "#636466" }}>Latest platform activities and updates</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
              <div className="space-y-6 mb-6">
                {recentActivities.slice(0, 4).map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    {activity.avatar ? (
                      <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                        <img
                          src={activity.avatar}
                          alt={activity.user}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-xs">
                        {activity.user.split(" ").map((n) => n[0]).join("")}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-black">
                        <span className="font-bold">{activity.user}</span> {activity.action} <a href="#" className="text-blue-600 font-medium hover:underline">"{activity.project}"</a>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full border border-gray-200 rounded-lg py-2 font-normal text-xs text-black hover:bg-gray-50 transition mt-auto" type="button">
                View All Activities
              </button>
            </CardContent>
          </Card>
          {/* Upcoming Meetings */}
          <Card className="shadow-sm border-0 flex flex-col justify-between" style={{ backgroundColor: "#FFFFFF", minHeight: '420px' }}>
            <CardHeader>
              <CardTitle className="text-lg font-semibold" style={{ color: "#063852" }}>
                Upcoming Meetings
              </CardTitle>
              <CardDescription style={{ color: "#636466" }}>Your scheduled appointments and calls</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
              <div className="space-y-3 mb-6">
                <div
                  className="p-3 rounded-lg shadow-sm"
                  style={{ backgroundColor: "#FFFFFF", border: "1px solid #F1F3F4" }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm" style={{ color: "#063852" }}>
                      Quarterly Review
                    </h4>
                    <div className="flex items-center gap-1">
                      <Badge style={{ backgroundColor: "#E6F3FF", color: "#1E9ADF", fontSize: "10px" }}>Video Call</Badge>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a
                            href="https://zoom.us/j/1234567890"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ display: 'inline-flex', alignItems: 'center', color: '#2D8CFF', textDecoration: 'underline', cursor: 'pointer', height: 22 }}
                          >
                            <ZoomIcon />
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>Join meeting</TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                  <p className="text-xs mb-2" style={{ color: "#636466" }}>
                    Q2 progress review and Q3 planning
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span style={{ color: "#636466" }}>2024-06-20 at 2:00 PM • 1 hour</span>
                      <div className="flex items-center space-x-1">
                        <img
                          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=16&h=16&fit=crop&crop=face"
                          alt="Sarah Johnson"
                          className="w-4 h-4 rounded-full object-cover"
                        />
                        <span style={{ color: "#063852" }}>Sarah Johnson</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="p-3 rounded-lg shadow-sm"
                  style={{ backgroundColor: "#FFFFFF", border: "1px solid #F1F3F4" }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm" style={{ color: "#063852" }}>
                      Estate Planning Session
                    </h4>
                    <Badge style={{ backgroundColor: "#F0F9FF", color: "#0369A1", fontSize: "10px" }}>In-Person</Badge>
                  </div>
                  <p className="text-xs mb-2" style={{ color: "#636466" }}>
                    Review updated estate planning documents
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span style={{ color: "#636466" }}>2024-06-25 at 10:00 AM • 45 min</span>
                    <div className="flex items-center space-x-1">
                      <img
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=16&h=16&fit=crop&crop=face"
                        alt="Michael Torres"
                        className="w-4 h-4 rounded-full object-cover"
                      />
                      <span style={{ color: "#063852" }}>Michael Torres</span>
                    </div>
                  </div>
                </div>

                <div
                  className="p-3 rounded-lg shadow-sm"
                  style={{ backgroundColor: "#FFFFFF", border: "1px solid #F1F3F4" }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm" style={{ color: "#063852" }}>
                      Portfolio Review
                    </h4>
                    <div className="flex items-center gap-1">
                      <Badge style={{ backgroundColor: "#E6F3FF", color: "#1E9ADF", fontSize: "10px" }}>Video Call</Badge>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a
                            href="https://meet.google.com/abc-defg-hij"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ display: 'inline-flex', alignItems: 'center', color: '#00897B', textDecoration: 'underline', cursor: 'pointer', height: 22 }}
                          >
                            <GoogleMeetIcon />
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>Join meeting</TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                  <p className="text-xs mb-2" style={{ color: "#636466" }}>
                    Monthly investment performance review
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span style={{ color: "#636466" }}>2024-06-28 at 3:00 PM • 30 min</span>
                      <div className="flex items-center space-x-1">
                        <img
                          src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=16&h=16&fit=crop&crop=face"
                          alt="Jennifer Liu"
                          className="w-4 h-4 rounded-full object-cover"
                        />
                        <span style={{ color: "#063852" }}>Jennifer Liu</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button className="w-full border border-gray-200 rounded-lg py-2 font-normal text-xs text-black hover:bg-gray-50 transition mt-auto" type="button">
                Schedule Meeting
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Your Pre-Liquidity Planning Progress */}
        <Card className="shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-0">
            <div>
              <CardTitle className="text-lg font-semibold" style={{ color: "#063852" }}>
                Your Pre-Liquidity Planning Progress
              </CardTitle>
              <CardDescription style={{ color: "#636466" }}>
                Track your progress across key service areas
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" className="mt-2 md:mt-0 text-xs h-8">
              View All
            </Button>
          </CardHeader>
          <CardContent className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {planningAreas.map((area) => (
                <div key={area.id} className="bg-background rounded-lg border border-gray-100 p-6 shadow-sm flex flex-col justify-between h-full">
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-semibold text-sm" style={{ color: '#063852' }}>{area.name}</div>
                    <Button variant="ghost" size="icon" className="h-6 w-6 p-0"><MoreHorizontal className="h-4 w-4" style={{ color: '#636466' }} /></Button>
                  </div>
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div className="h-2 rounded-full flex" style={{ width: '100%' }}>
                        <div className="h-2 rounded-l-full" style={{ width: `${area.progress * 0.7}%`, backgroundColor: '#10B981' }}></div>
                        <div className="h-2" style={{ width: `${area.progress * 0.3}%`, backgroundColor: '#1E9ADF' }}></div>
                        <div className="h-2 rounded-r-full" style={{ width: `${100 - area.progress}%`, backgroundColor: '#E5E7EB' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold text-sm" style={{ color: '#063852' }}>Next Step:</span>
                    <span className="text-sm ml-1" style={{ color: '#636466' }}>{area.nextStep}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-auto">
                    <span className="text-xs text-gray-400">Assigned to:</span>
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={area.assignedTo.avatar} alt={area.assignedTo.name} />
                      <AvatarFallback>{area.assignedTo.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs" style={{ color: '#063852' }}>{area.assignedTo.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0" style={{ backgroundColor: "#FFFFFF" }}>
          <CardHeader>
            <CardTitle className="text-lg font-semibold" style={{ color: "#063852" }}>
              My Financial Team
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {financialTeam.map((member) => (
                <div key={member.id} className="flex items-center gap-3 p-3 rounded-lg border hover:shadow transition-all duration-200" style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E7EB' }}>
                  <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm" style={{ color: '#063852' }}>{member.name}</div>
                    <div className="text-xs" style={{ color: '#636466' }}>{member.role}</div>
                    <a href={`mailto:${member.email}`} className="text-xs text-blue-600 hover:underline block">{member.email}</a>
                    <a href={`tel:${member.phone.replace(/[^\d]/g, '')}`} className="text-xs text-gray-400 hover:underline block">{member.phone}</a>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  )
}
