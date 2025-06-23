"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { MoreHorizontal, Search, Users } from "lucide-react"

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
    <Card className="shadow-sm border-0 h-full" style={{ backgroundColor: "#FFFFFF" }}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <CardTitle className="text-lg font-semibold" style={{ color: "#063852" }}>
              My Team
            </CardTitle>
            <div className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
              {displayedMembers.length} Members
            </div>
          </div>
          <DropdownMenu open={showSettings} onOpenChange={setShowSettings}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="small" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 max-h-96 overflow-y-auto">
              <div className="p-3">
                <div className="text-sm font-medium mb-3">Select Team Members</div>
                
                {/* Search Input */}
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search team members..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Quick Actions */}
                <div className="flex gap-2 mb-3">
                  <Button 
                    variant="outline" 
                    size="small" 
                    onClick={handleSelectAll}
                    className="flex-1 text-xs"
                  >
                    Select All
                  </Button>
                  <Button 
                    variant="outline" 
                    size="small" 
                    onClick={handleClearAll}
                    className="flex-1 text-xs"
                  >
                    Clear All
                  </Button>
                </div>

                {/* Member List */}
                <div className="space-y-2">
                  {filteredMembers.map((member) => (
                    <div key={member.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                      <Checkbox
                        id={`member-${member.id}`}
                        checked={selectedMembers.includes(member.id)}
                        onCheckedChange={(checked) => handleMemberToggle(member.id)}
                      />
                      <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {member.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        {displayedMembers.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {displayedMembers.slice(0, 4).map((member) => (
              <div key={member.id} className="flex flex-col items-center text-center p-4 rounded-lg border hover:shadow transition-all duration-200" style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E7EB' }}>
                <img src={member.avatar} alt={member.name} className="w-16 h-16 rounded-full object-cover mb-3" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm mb-1" style={{ color: '#063852' }}>{member.name}</div>
                  <div className="text-xs mb-2" style={{ color: '#444444' }}>{member.role}</div>
                  <a href={`mailto:${member.email}`} className="text-xs text-blue-600 hover:underline block mb-1">{member.email}</a>
                  <a href={`tel:${member.phone.replace(/[^\d]/g, '')}`} className="text-xs" style={{ color: '#444444' }}>{member.phone}</a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No team members selected</p>
            <p className="text-xs" style={{ color: "#444444" }}>Use the menu above to customize your view</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}