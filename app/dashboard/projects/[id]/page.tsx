"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { HelpCircle, Home, FolderOpen, Users, Calendar, FileText, BarChart3, BookOpen, MoreHorizontal, PanelLeftClose, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import ExpandedTimeline from "@/components/expanded-timeline"
import ProjectOverviewPage from "./overview-page"
import DashboardLayout from "@/components/dashboard-layout"

const navigation = [
  { name: 'My Dashboard', href: '/dashboard', icon: Home },
  { name: 'Projects', href: '/dashboard/projects', icon: FolderOpen },
  { name: 'People', href: '/dashboard/people', icon: Users },
  { name: 'Documents & Vault', href: '/dashboard/documents', icon: FileText },
  { name: 'Reports', href: '/dashboard/reports', icon: BarChart3 },
  { name: 'Resources & Education', href: '/dashboard/resources', icon: BookOpen },
];

const tabs = [
  { name: 'Overview', value: 'overview', badge: 3 },
  { name: 'Details', value: 'details' },
  { name: 'Tasks', value: 'tasks' },
  { name: 'Decisions', value: 'decisions' },
  { name: 'Attachments', value: 'attachments', badge: 1 },
  { name: 'Emails', value: 'emails', badge: 4 },
  { name: 'Notes', value: 'notes' },
];

const project = {
  status: 'In progress',
  code: 'PRJ-344',
  created: 'May 19, 2025',
  title: 'Spousal Lifetime Access Trust',
  lastModified: '2 hours ago',
  avatars: [
    { name: 'JF', src: '' },
    { name: '6+', src: '' },
  ],
  metrics: {
    newUpdates: 2,
    pendingDecisions: 8,
    pendingDue: 1,
    activeTasks: 5,
    tasksDue: 2,
    completed: 9,
    inProgress: 7,
    notStarted: 1,
  },
  timeline: [
    {
      id: "1",
      user: 'Jenny Wilson',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
      time: '2 hours ago',
      title: 'We\'ve completed a comprehensive review of the SLAT trust agreement draft with outside counsel',
      content: 'After three meetings with the client and multiple rounds of revisions, I\'m pleased to share that we\'ve reached a final consensus on all key provisions.',
      tags: ['Trust Structure Approval', 'SLAT-Trust-Agreement-Draft', 'Trust Structure Diagram'],
      type: 'milestone' as const,
      status: 'completed' as const,
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
      user: 'Jakob Press',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
      time: '11:32 AM',
      title: 'Secure Final Trust Structure Approvals',
      content: 'Obtained all required approvals for the final trust structure. This completes three months of planning work. We now have sign-off from legal counsel, tax specialists, and the client. The approved structure includes dynasty trust provisions, spou...',
      tags: ['Final-Structure-Approvals'],
      type: 'decision' as const,
      status: 'completed' as const
    },
  ],
  comments: [
    {
      user: 'Roger Culhane',
      time: 'Yesterday at 10:26 PM',
      content: (
        <>
          <span className="text-muted-foreground">@Hanna Simpson</span> Just heard back from the client\'s financial advisor. They\'re concerned about the generation-skipping tax implications
        </>
      ),
    },
    {
      user: 'Jakob Press',
      time: 'Yesterday at 11:00 PM',
      content: (
        <>
          <span className="text-muted-foreground">@Daniel Warren</span> The trustee acceptance forms came back signed. I\'ve uploaded them to the attachments. Still waiting on the beneficiary designation forms from the insurance company
        </>
      ),
    },
    {
      user: 'Jenny Wilson',
      time: 'May 12 at 6:21 PM',
      content: (
        <>
          Thanks for the meeting yesterday. My wife and I feel much more comfortable with the SLAT structure now. Can we schedule time next week to review the pour-over will provisions?
        </>
      ),
    },
  ],
};

export default function ProjectDetailPage() {
  const [activeTab, setActiveTab] = useState('details');

  return (
    <DashboardLayout>
      <div className="flex min-h-screen bg-muted/50">
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-full items-center justify-between px-6">
              <div className="flex items-center space-x-3">
                <button className="p-2 hover:bg-accent rounded-lg" aria-label="Expand sidebar" title="Expand sidebar">
                  <PanelLeftClose className="h-4 w-4 transform rotate-180" />
                </button>
                <div className="flex items-center gap-4">
                  <h1 className="text-lg font-semibold">Spousal Lifetime Access Trust</h1>
                  <div className="flex items-center text-muted-foreground">
                    <span className="text-sm mt-0.5">Client: Michael Smith</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  <div className="flex items-center text-muted-foreground mr-3">
                    <span className="text-sm">Last edited: 1d ago</span>
                  </div>
                  <div className="flex -space-x-2 mr-3" aria-label="Project collaborators">
                    <Avatar className="relative flex shrink-0 overflow-hidden rounded-full h-8 w-8 border-2 border-background">
                      <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80" alt="John Doe's profile" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Avatar className="relative flex shrink-0 overflow-hidden rounded-full h-8 w-8 border-2 border-background">
                      <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80" alt="Alice Smith's profile" />
                      <AvatarFallback>AS</AvatarFallback>
                    </Avatar>
                    <Avatar className="relative flex shrink-0 overflow-hidden rounded-full h-8 w-8 border-2 border-background">
                      <AvatarImage src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=150&h=150&q=80" alt="Bob Johnson's profile" />
                      <AvatarFallback>BJ</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-sm font-regular border-2 border-background">+8</div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 bg-white text-secondary-foreground border border-gray-300 hover:bg-gray-100 rounded-lg" aria-label="More actions" title="More actions">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="outline" size="sm" className="px-3 py-1.5 bg-white text-secondary-foreground border border-gray-300 hover:bg-gray-100">
                  <Plus className="mr-2 h-4 w-4" />
                  Post update
                </Button>
                <Button size="sm" className="px-3 py-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Quick create
                </Button>
              </div>
            </div>
          </div>

          {/* Sticky Tab Navigation */}
          <div className="sticky top-6 z-50 bg-white before:content-[''] before:absolute before:inset-x-0 before:top-[-100px] before:h-[100px] before:bg-white/90">
            <div className="overflow-x-auto scrollbar-hide -webkit-overflow-scrolling-touch">
              <div className="flex flex-nowrap gap-1 rounded-xl bg-[#f5f5f5] p-1.5 min-w-min mb-0">
                {tabs.map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => setActiveTab(tab.value)}
                    className={cn(
                      "px-5 py-2 text-sm font-medium rounded-lg relative whitespace-nowrap min-w-fit",
                      activeTab === tab.value
                        ? "bg-white text-black shadow-sm"
                        : "text-[#666666] hover:text-[#333333]"
                    )}
                  >
                    {tab.name}
                    {tab.badge && (
                      <span className="ml-2 inline-flex items-center justify-center rounded-full bg-red-100 text-red-700 text-xs min-w-[20px] h-[20px] px-1.5 font-medium">
                        {tab.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Page Content */}
          <div className="flex flex-col flex-1">
            {/* Tab Content */}
            <div className="flex-1">
              {activeTab === 'overview' && <ProjectOverviewPage />}
              {activeTab !== 'overview' && (
                <div className="flex items-center justify-center h-full text-gray-400 text-lg">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} page coming soon...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 