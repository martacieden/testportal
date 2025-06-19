"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  FileText,
  FolderOpen,
  Home,
  LogOut,
  Menu,
  Settings,
  User,
  Users,
  Calendar,
  BookOpen,
  HelpCircle,
  BarChart3,
  MessageSquare,
} from "lucide-react"
import { cn } from "@/lib/utils"
import AIChatbot from "@/components/ai-chatbot"
import QuickActions from "./quick-actions"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const navigation = [
  { name: "My Dashboard", href: "/dashboard", icon: Home },
  { name: "Projects", href: "/dashboard/projects", icon: FolderOpen },
  { name: "People", href: "/dashboard/people", icon: Users },
  { name: "Meetings", href: "/dashboard/meetings", icon: Calendar },
  { name: "Documents & Vault", href: "/dashboard/documents", icon: FileText },
  { name: "Reports", href: "/dashboard/reports", icon: BarChart3 },
  { name: "Resources & Education", href: "/dashboard/resources", icon: BookOpen },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const [manageWidgetsOpen, setManageWidgetsOpen] = useState(false)

  const Sidebar = ({ mobile = false }) => (
    <div className={cn("flex flex-col", mobile ? "h-full" : "h-screen")} style={{ backgroundColor: "#FFFFFF" }}>
      <div className="flex h-16 items-center px-6" style={{ borderColor: "#E6EBED" }}>
        <div className="flex items-center space-x-3">
          <img src="/cresset-logo.svg" alt="Cresset" className="h-12 w-auto" />
        </div>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                isActive ? "text-white shadow-md" : "hover:shadow-sm",
                isActive ? "" : "hover:bg-gray-50",
              )}
              style={{
                backgroundColor: isActive ? "#1E9ADF" : "transparent",
                color: isActive ? "#FFFFFF" : "#063852",
              }}
              onClick={() => mobile && setSidebarOpen(false)}
            >
              <item.icon className="mr-3 h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>
      <div className="px-4 pb-2">
        <Link
          href="/dashboard/help"
          className="flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-sm hover:bg-gray-50"
          style={{ color: "#063852" }}
          onClick={() => mobile && setSidebarOpen(false)}
        >
          <HelpCircle className="mr-3 h-5 w-5" />
          <span>Help & Support</span>
        </Link>
      </div>
      <div className="border-t px-4 py-4" style={{ borderColor: "#E6EBED" }}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start p-3 h-auto">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback style={{ backgroundColor: "#1E9ADF", color: "#FFFFFF" }}>JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <p className="text-sm font-medium" style={{ color: "#063852" }}>
                    John Doe
                  </p>
                  <p className="text-xs" style={{ color: "#636466" }}>
                    john.doe@example.com
                  </p>
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start" forceMount>
            <DropdownMenuItem style={{ color: "#063852" }}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem style={{ color: "#063852" }}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem style={{ color: "#063852" }}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen" style={{ backgroundColor: "#F8F9FA" }}>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-72 lg:flex-col lg:border-r" style={{ borderColor: "#E6EBED" }}>
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-72">
          <Sidebar mobile />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b px-6 py-4" style={{ backgroundColor: "#FFFFFF", borderColor: "#E6EBED" }}>
          <div className="flex items-center justify-end gap-2">
            <TooltipProvider>
              <div className="flex gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition text-sm font-medium text-primary" style={{ backgroundColor: '#E6F3FF' }} aria-label="Schedule Call">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span className="hidden md:inline">Schedule Call</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Schedule Call</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition text-sm font-medium text-primary" style={{ backgroundColor: '#E6F3FF' }} aria-label="Submit Request">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <span className="hidden md:inline">Submit Request</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Submit Request</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition text-sm font-medium text-primary" style={{ backgroundColor: '#E6F3FF' }} aria-label="Ask Question">
                      <MessageSquare className="h-4 w-4 text-blue-600" />
                      <span className="hidden md:inline">Ask Question</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Ask Question</TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
            <Dialog open={manageWidgetsOpen} onOpenChange={setManageWidgetsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 text-sm">
                  <Settings className="h-4 w-4" />
                  Manage widgets
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Manage Widgets</DialogTitle>
                </DialogHeader>
                <div className="py-4 text-center text-gray-500">Widget management coming soon...</div>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6" style={{ backgroundColor: "#F8F9FA" }}>
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>

      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  )
}
