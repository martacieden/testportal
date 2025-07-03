"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { MoreHorizontal, Search, Users, Mail, Phone, Copy } from "lucide-react"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"

// Extended sample data for financial team
const allFinancialTeamMembers = [
  {
    id: 1,
    name: "Michael Chen",
    role: "Senior Advisor",
    email: "michael.chen@cresset.com",
    phone: "(555) 123-4567",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
    type: "advisor"
  },
  {
    id: 2,
    name: "Jennifer Liu",
    role: "Portfolio Manager",
    email: "jennifer.liu@cresset.com",
    phone: "(555) 234-5678",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
    type: "manager"
  },
  {
    id: 3,
    name: "David Rodriguez",
    role: "Tax Specialist",
    email: "david.rodriguez@cresset.com",
    phone: "(555) 345-6789",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
    type: "specialist"
  },
  {
    id: 4,
    name: "Sarah Johnson",
    role: "Financial Planner",
    email: "sarah.johnson@cresset.com",
    phone: "(555) 456-7890",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
    type: "planner"
  },
  {
    id: 5,
    name: "Robert Kim",
    role: "Estate Planning Attorney",
    email: "robert.kim@cresset.com",
    phone: "(555) 567-8901",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face",
    type: "attorney"
  },
  {
    id: 6,
    name: "Lisa Thompson",
    role: "Insurance Specialist",
    email: "lisa.thompson@cresset.com",
    phone: "(555) 678-9012",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&crop=face",
    type: "specialist"
  },
  {
    id: 7,
    name: "Amanda Foster",
    role: "Wealth Strategist",
    email: "amanda.foster@cresset.com",
    phone: "(555) 789-0123",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
    type: "strategist"
  },
  {
    id: 8,
    name: "James Wilson",
    role: "Investment Analyst",
    email: "james.wilson@cresset.com",
    phone: "(555) 890-1234",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
    type: "analyst"
  },
  {
    id: 9,
    name: "Emily Davis",
    role: "Retirement Specialist",
    email: "emily.davis@cresset.com",
    phone: "(555) 901-2345",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
    type: "specialist"
  },
  {
    id: 10,
    name: "Thomas Martinez",
    role: "Business Succession Advisor",
    email: "thomas.martinez@cresset.com",
    phone: "(555) 012-3456",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
    type: "advisor"
  },
  {
    id: 11,
    name: "Rachel Green",
    role: "Philanthropy Advisor",
    email: "rachel.green@cresset.com",
    phone: "(555) 123-4568",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&crop=face",
    type: "advisor"
  },
  {
    id: 12,
    name: "Christopher Lee",
    role: "Alternative Investments Manager",
    email: "christopher.lee@cresset.com",
    phone: "(555) 234-5679",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face",
    type: "manager"
  }
]

export function FinancialTeamWidget() {
  const [selectedMembers, setSelectedMembers] = useState<number[]>([1, 2, 3, 4, 5]) // Always show first 5 members by default
  const [showSettings, setShowSettings] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('financial-team-selected-members', JSON.stringify(selectedMembers))
  }, [selectedMembers])

  // Get displayed members based on selection
  const getDisplayedMembers = () => {
    return allFinancialTeamMembers.filter(member => selectedMembers.includes(member.id))
  }

  // Filter members based on search query
  const getFilteredMembers = () => {
    if (!searchQuery.trim()) {
      return allFinancialTeamMembers
    }
    
    const query = searchQuery.toLowerCase()
    return allFinancialTeamMembers.filter(member => 
      member.name.toLowerCase().includes(query) ||
      member.role.toLowerCase().includes(query) ||
      member.email.toLowerCase().includes(query)
    )
  }

  const handleMemberToggle = (memberId: number) => {
    setSelectedMembers(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    )
  }

  const handleSelectAll = () => {
    setSelectedMembers(allFinancialTeamMembers.map(member => member.id))
  }

  const handleClearAll = () => {
    setSelectedMembers([])
  }

  const displayedMembers = getDisplayedMembers()
  const filteredMembers = getFilteredMembers()

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <CardTitle>My Team</CardTitle>
            <div className="px-2 py-1 rounded-full bg-status-success/10 text-status-success text-sm font-medium">
              {displayedMembers.length} Members
            </div>
          </div>
          <DropdownMenu open={showSettings} onOpenChange={setShowSettings}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 max-h-96 overflow-y-auto">
              <div className="p-3">
                <div className="text-sm font-medium mb-3 text-text-primary">Select Team Members</div>
                
                {/* Search Input */}
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <Input
                    placeholder="Search team members..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                {/* Select All / Clear All */}
                <div className="flex gap-2 mb-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSelectAll}
                    className="flex-1"
                  >
                    Select All
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClearAll}
                    className="flex-1"
                  >
                    Clear All
                  </Button>
                </div>
                
                {/* Team Members List */}
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {filteredMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-50"
                    >
                      <Checkbox
                        checked={selectedMembers.includes(member.id)}
                        onCheckedChange={() => handleMemberToggle(member.id)}
                      />
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center">
                          <span className="text-xs font-medium text-brand-primary">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-text-primary truncate">
                            {member.name}
                          </p>
                          <p className="text-sm font-medium text-text-primary truncate">
                            {member.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {displayedMembers.map((member) => (
          <div
            key={member.id}
            className="flex items-center gap-3 p-3 rounded-lg border border-neutral-200 hover:border-neutral-300 transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center">
              <span className="text-sm font-medium text-brand-primary">
                {member.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-text-primary truncate">
                {member.name}
              </p>
              <p className="text-sm font-medium text-text-primary truncate">
                {member.role}
              </p>
              <div className="flex items-center gap-2 text-xs text-text-tertiary mt-1">
                <Mail className="h-3 w-3" />
                <span>{member.email}</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 transition-opacity"
                        onClick={() => navigator.clipboard.writeText(member.email)}
                        tabIndex={0}
                        aria-label={`Copy email for ${member.name}`}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Copy email</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center gap-2 text-xs text-text-tertiary mt-1">
                <Phone className="h-3 w-3" />
                <span>{member.phone}</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 transition-opacity"
                        onClick={() => navigator.clipboard.writeText(member.phone)}
                        tabIndex={0}
                        aria-label={`Copy phone for ${member.name}`}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Copy phone</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Users className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}