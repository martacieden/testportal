"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, FileText, MessageSquare, Settings, Menu, Plus, Search, CheckCircle, Clock, AlertCircle, User, Building, DollarSign, Folder, Star, CalendarDays, Tag } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { WidgetManagementSlidePanel } from "./widget-management-slide-panel";
import { NotificationBell } from "@/components/ui/notification-bell";
import Link from "next/link";

interface QuickActionsProps {
  onMenuClick?: () => void;
  onSubmitRequest?: () => void;
}

interface SearchResult {
  id: number;
  title: string;
  type: string;
  group: string;
  description?: string;
  status?: string;
  priority?: string;
  dueDate?: string;
  assignedTo?: string;
  tags?: string[];
  lastModified?: string;
  progress?: number;
  company?: string;
  amount?: string;
  category?: string;
}

export default function QuickActions({ onMenuClick, onSubmitRequest }: QuickActionsProps) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const inputRef = useRef<HTMLInputElement>(null);

  // Enhanced search results with more data
  const mockResults: SearchResult[] = [
    { 
      id: 1, 
      title: "Review Investment Reports", 
      type: "Task", 
      group: "Tasks",
      description: "Review quarterly investment performance reports and prepare summary for board meeting",
      status: "In Progress",
      priority: "High",
      dueDate: "2024-02-15",
      assignedTo: "John Smith",
      tags: ["Investment", "Reporting", "Board"],
      lastModified: "2024-01-28",
      progress: 65
    },
    { 
      id: 2, 
      title: "Investment Strategy Approval", 
      type: "Decision", 
      group: "Decisions",
      description: "Approve new investment strategy for Q2 2024 portfolio rebalancing",
      status: "Pending",
      priority: "Urgent",
      dueDate: "2024-02-01",
      assignedTo: "Sarah Johnson",
      tags: ["Strategy", "Approval", "Portfolio"],
      lastModified: "2024-01-29"
    },
    { 
      id: 3, 
      title: "Investment Expansion Project", 
      type: "Project", 
      group: "Projects",
      description: "Expand investment portfolio into emerging markets and alternative assets",
      status: "Planning",
      priority: "Medium",
      dueDate: "2024-06-30",
      assignedTo: "Mike Chen",
      tags: ["Expansion", "Emerging Markets", "Alternative Assets"],
      lastModified: "2024-01-25",
      progress: 25
    },
    { 
      id: 4, 
      title: "Investment Budget Allocation", 
      type: "Budget", 
      group: "Budgets",
      description: "Allocate $2.5M budget across various investment vehicles and asset classes",
      status: "Draft",
      priority: "High",
      dueDate: "2024-03-01",
      assignedTo: "Lisa Wang",
      tags: ["Budget", "Allocation", "Asset Classes"],
      lastModified: "2024-01-27",
      amount: "$2,500,000"
    },
    { 
      id: 5, 
      title: "Investment Portfolio Managers", 
      type: "Vendor", 
      group: "Vendors",
      description: "External portfolio management services for specialized asset classes",
      status: "Active",
      priority: "Medium",
      dueDate: "2024-12-31",
      assignedTo: "David Brown",
      tags: ["Portfolio Management", "External Services"],
      lastModified: "2024-01-20",
      company: "Global Asset Management"
    },
    { 
      id: 6, 
      title: "Investment Risk Assessment", 
      type: "Domain", 
      group: "Domains",
      description: "Comprehensive risk assessment framework for investment portfolio",
      status: "Completed",
      priority: "High",
      dueDate: "2024-01-31",
      assignedTo: "Emma Davis",
      tags: ["Risk Management", "Framework", "Assessment"],
      lastModified: "2024-01-30",
      progress: 100
    },
    { 
      id: 7, 
      title: "Investment Document.pdf", 
      type: "Document", 
      group: "Documents",
      description: "Comprehensive investment policy and strategy document",
      status: "Published",
      priority: "Medium",
      dueDate: "2024-02-10",
      assignedTo: "Robert Wilson",
      tags: ["Policy", "Strategy", "Documentation"],
      lastModified: "2024-01-26",
      category: "Policy"
    },
    { 
      id: 8, 
      title: "Portfolio Performance Review", 
      type: "Task", 
      group: "Tasks",
      description: "Monthly portfolio performance review and rebalancing recommendations",
      status: "Not Started",
      priority: "Medium",
      dueDate: "2024-02-28",
      assignedTo: "Jennifer Lee",
      tags: ["Performance", "Review", "Rebalancing"],
      lastModified: "2024-01-24"
    },
    { 
      id: 9, 
      title: "Tax Optimization Strategy", 
      type: "Decision", 
      group: "Decisions",
      description: "Implement tax-efficient investment strategies for wealth preservation",
      status: "Under Review",
      priority: "High",
      dueDate: "2024-03-15",
      assignedTo: "Thomas Anderson",
      tags: ["Tax", "Optimization", "Wealth Preservation"],
      lastModified: "2024-01-29"
    },
    { 
      id: 10, 
      title: "ESG Investment Framework", 
      type: "Project", 
      group: "Projects",
      description: "Develop environmental, social, and governance investment criteria",
      status: "In Progress",
      priority: "Medium",
      dueDate: "2024-05-30",
      assignedTo: "Maria Garcia",
      tags: ["ESG", "Sustainability", "Criteria"],
      lastModified: "2024-01-28",
      progress: 40
    }
  ];

  const groups = [
    { name: "All", count: mockResults.length, icon: Search },
    { name: "Tasks", count: mockResults.filter(r => r.group === "Tasks").length, icon: CheckCircle },
    { name: "Decisions", count: mockResults.filter(r => r.group === "Decisions").length, icon: AlertCircle },
    { name: "Projects", count: mockResults.filter(r => r.group === "Projects").length, icon: Folder },
    { name: "Budgets", count: mockResults.filter(r => r.group === "Budgets").length, icon: DollarSign },
    { name: "Vendors", count: mockResults.filter(r => r.group === "Vendors").length, icon: Building },
    { name: "Domains", count: mockResults.filter(r => r.group === "Domains").length, icon: Star },
    { name: "Documents", count: mockResults.filter(r => r.group === "Documents").length, icon: FileText },
  ];

  // Filtered results by tab
  const filteredResults = activeTab === "All"
    ? mockResults.filter(r => 
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : mockResults.filter(r => 
        r.group === activeTab && (
          r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      );

  // Handle outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    }
    if (showSearchResults) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSearchResults]);

  // Handle Esc key
  useEffect(() => {
    function handleEsc(event: KeyboardEvent) {
      if (event.key === "Escape") setShowSearchResults(false);
    }
    if (showSearchResults) {
      document.addEventListener("keydown", handleEsc);
    } else {
      document.removeEventListener("keydown", handleEsc);
    }
    return () => document.removeEventListener("keydown", handleEsc);
  }, [showSearchResults]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSearchResults(e.target.value.length > 0);
  };

  const handleSearchFocus = () => {
    if (searchQuery.length > 0) {
      setShowSearchResults(true);
    }
  };

  const getStatusBadge = (status?: string) => {
    if (!status) return null;
    
    const statusConfig = {
      "In Progress": { variant: "default" as const, icon: Clock },
      "Pending": { variant: "secondary" as const, icon: Clock },
      "Completed": { variant: "success" as const, icon: CheckCircle },
      "Not Started": { variant: "outline" as const, icon: Clock },
      "Under Review": { variant: "warning" as const, icon: AlertCircle },
      "Planning": { variant: "secondary" as const, icon: Calendar },
      "Draft": { variant: "outline" as const, icon: FileText },
      "Active": { variant: "success" as const, icon: CheckCircle },
      "Published": { variant: "success" as const, icon: CheckCircle }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    if (!config) return <Badge variant="outline">{status}</Badge>;

    const Icon = config.icon;
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    );
  };

  const getPriorityBadge = (priority?: string) => {
    if (!priority) return null;
    
    const priorityConfig = {
      "Urgent": { variant: "destructive" as const, color: "text-red-600" },
      "High": { variant: "default" as const, color: "text-orange-600" },
      "Medium": { variant: "secondary" as const, color: "text-blue-600" },
      "Low": { variant: "outline" as const, color: "text-gray-600" }
    };

    const config = priorityConfig[priority as keyof typeof priorityConfig];
    if (!config) return <Badge variant="outline">{priority}</Badge>;

    return (
      <Badge variant={config.variant} className={config.color}>
        {priority}
      </Badge>
    );
  };

  const getGroupIcon = (group: string) => {
    const groupConfig = {
      "Tasks": CheckCircle,
      "Decisions": AlertCircle,
      "Projects": Folder,
      "Budgets": DollarSign,
      "Vendors": Building,
      "Domains": Star,
      "Documents": FileText
    };
    
    const Icon = groupConfig[group as keyof typeof groupConfig] || Search;
    return <Icon className="h-4 w-4" />;
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="bg-yellow-100 font-semibold">{part}</span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <>
      <div className="w-full border-b border-neutral-200 bg-white relative">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden p-2"
                onClick={onMenuClick}
              >
                <Menu className="h-5 w-5" />
              </Button>
              
              {/* Search Input */}
              <form onSubmit={e => e.preventDefault()} className="flex-1 max-w-md relative">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    ref={inputRef}
                    type="text"
                    placeholder="Search tasks, projects, people…"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={handleSearchFocus}
                    className="pl-10 h-9 text-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    autoComplete="off"
                  />
                </div>
              </form>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Notification Bell */}
              <NotificationBell />
              {pathname === "/dashboard" && (
                <WidgetManagementSlidePanel />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Full Search Results */}
      {showSearchResults && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center gap-3">
                <Search className="h-5 w-5 text-gray-400" />
                <div>
                  <h2 className="text-lg font-semibold">Search Results</h2>
                  <p className="text-sm text-gray-500">
                    {filteredResults.length} results for "{searchQuery}"
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSearchResults(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </Button>
            </div>

            {/* Content */}
            <div className="flex h-[calc(80vh-120px)]">
              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-8 h-auto p-2 bg-gray-50">
                  {groups.map(group => {
                    const Icon = group.icon;
                    return (
                      <TabsTrigger
                        key={group.name}
                        value={group.name}
                        className="flex flex-col items-center gap-1 p-3 h-auto data-[state=active]:bg-white data-[state=active]:shadow-sm"
                      >
                        <Icon className="h-4 w-4" />
                        <span className="text-xs font-medium">{group.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {group.count}
                        </Badge>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>

                {/* Results */}
                <div className="flex-1 overflow-y-auto p-6">
                  {groups.map(group => (
                    <TabsContent key={group.name} value={group.name} className="mt-0">
                      {filteredResults.length === 0 ? (
                        <div className="text-center py-12">
                          <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                          <p className="text-gray-500">Try adjusting your search terms or filters</p>
                        </div>
                      ) : (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                          {filteredResults.map(item => (
                            <Card key={item.id} className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
                              <CardHeader className="pb-3">
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex items-center gap-2 flex-1 min-w-0">
                                    <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                                      {getGroupIcon(item.group)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <h3 className="font-semibold text-sm text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                                        {highlightMatch(item.title, searchQuery)}
                                      </h3>
                                      <p className="text-xs text-gray-500">{item.type}</p>
                                    </div>
                                  </div>
                                  <div className="flex flex-col gap-1 items-end">
                                    {getStatusBadge(item.status)}
                                    {getPriorityBadge(item.priority)}
                                  </div>
                                </div>
                              </CardHeader>
                              
                              <CardContent className="pt-0">
                                {/* Description */}
                                {item.description && (
                                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                    {highlightMatch(item.description, searchQuery)}
                                  </p>
                                )}

                                {/* Flexible second row with additional info */}
                                <div className="space-y-2">
                                  {/* Progress bar for tasks/projects */}
                                  {item.progress !== undefined && (
                                    <div className="space-y-1">
                                      <div className="flex justify-between text-xs text-gray-500">
                                        <span>Progress</span>
                                        <span>{item.progress}%</span>
                                      </div>
                                      <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                          className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                                          style={{ width: `${item.progress}%` }}
                                        />
                                      </div>
                                    </div>
                                  )}

                                  {/* Due date and assigned to */}
                                  <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                                    {item.dueDate && (
                                      <div className="flex items-center gap-1">
                                        <CalendarDays className="h-3 w-3" />
                                        <span>Due: {new Date(item.dueDate).toLocaleDateString()}</span>
                                      </div>
                                    )}
                                    {item.assignedTo && (
                                      <div className="flex items-center gap-1">
                                        <User className="h-3 w-3" />
                                        <span>{item.assignedTo}</span>
                                      </div>
                                    )}
                                    {item.company && (
                                      <div className="flex items-center gap-1">
                                        <Building className="h-3 w-3" />
                                        <span>{item.company}</span>
                                      </div>
                                    )}
                                    {item.amount && (
                                      <div className="flex items-center gap-1">
                                        <DollarSign className="h-3 w-3" />
                                        <span>{item.amount}</span>
                                      </div>
                                    )}
                                  </div>

                                  {/* Tags */}
                                  {item.tags && item.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1">
                                      {item.tags.slice(0, 3).map((tag, index) => (
                                        <Badge key={index} variant="outline" className="text-xs">
                                          <Tag className="h-2 w-2 mr-1" />
                                          {tag}
                                        </Badge>
                                      ))}
                                      {item.tags.length > 3 && (
                                        <Badge variant="outline" className="text-xs">
                                          +{item.tags.length - 3}
                                        </Badge>
                                      )}
                                    </div>
                                  )}

                                  {/* Last modified */}
                                  {item.lastModified && (
                                    <div className="text-xs text-gray-400 flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      <span>Modified: {new Date(item.lastModified).toLocaleDateString()}</span>
                                    </div>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </TabsContent>
                  ))}
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 