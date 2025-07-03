import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Megaphone, 
  Calendar, 
  Clock, 
  Eye, 
  Bookmark, 
  Share2,
  TrendingUp,
  Shield,
  Users,
  Building2
} from "lucide-react"

const announcements = [
  {
    id: 1,
    title: "Cresset Annual Wealth Summit 2024",
    content: "Join us for our premier wealth management event featuring industry experts, exclusive networking opportunities, and insights into the latest financial strategies. This year's summit will focus on navigating market volatility and building resilient portfolios.",
    author: "Cresset Leadership Team",
    authorAvatar: "/placeholder-user.jpg",
    date: "2024-01-15",
    time: "10:00 AM",
    category: "Event",
    priority: "high",
    read: false,
    tags: ["Summit", "Networking", "Education"],
    icon: Building2,
    actionText: "Register Now",
    actionLink: "#"
  },
  {
    id: 2,
    title: "Enhanced Security Features Now Available",
    content: "We've upgraded our platform security with advanced authentication methods and enhanced encryption. Your accounts are now protected with the latest security protocols, including biometric authentication options.",
    author: "Cresset Technology Team",
    authorAvatar: "/placeholder-user.jpg",
    date: "2024-01-12",
    time: "2:30 PM",
    category: "Security",
    priority: "medium",
    read: true,
    tags: ["Security", "Technology", "Update"],
    icon: Shield,
    actionText: "Learn More",
    actionLink: "#"
  },
  {
    id: 3,
    title: "New Investment Opportunities Available",
    content: "Exclusive access to private market investments and alternative asset classes is now available for qualified clients. These opportunities offer potential for enhanced returns and portfolio diversification.",
    author: "Cresset Investment Team",
    authorAvatar: "/placeholder-user.jpg",
    date: "2024-01-10",
    time: "9:15 AM",
    category: "Investment",
    priority: "medium",
    read: false,
    tags: ["Investment", "Private Markets", "Opportunity"],
    icon: TrendingUp,
    actionText: "View Opportunities",
    actionLink: "#"
  },
  {
    id: 4,
    title: "Family Office Services Expansion",
    content: "We're expanding our family office services to include comprehensive family governance, legacy planning, and next-generation wealth education programs. These services are designed to help families preserve and grow their wealth across generations.",
    author: "Cresset Family Office Team",
    authorAvatar: "/placeholder-user.jpg",
    date: "2024-01-08",
    time: "11:45 AM",
    category: "Service",
    priority: "low",
    read: true,
    tags: ["Family Office", "Legacy Planning", "Education"],
    icon: Users,
    actionText: "Explore Services",
    actionLink: "#"
  },
  {
    id: 5,
    title: "Tax Planning Webinar Series",
    content: "Join our expert tax advisors for a comprehensive webinar series covering advanced tax planning strategies, recent legislative changes, and optimization techniques for high-net-worth individuals and families.",
    author: "Cresset Tax Advisory Team",
    authorAvatar: "/placeholder-user.jpg",
    date: "2024-01-05",
    time: "3:00 PM",
    category: "Education",
    priority: "medium",
    read: false,
    tags: ["Tax Planning", "Webinar", "Education"],
    icon: Megaphone,
    actionText: "Register for Series",
    actionLink: "#"
  }
]

const categoryColors = {
  Event: "bg-blue-100 text-blue-700",
  Security: "bg-red-100 text-red-700",
  Investment: "bg-green-100 text-green-700",
  Service: "bg-purple-100 text-purple-700",
  Education: "bg-orange-100 text-orange-700"
}

const priorityColors = {
  high: "bg-red-100 text-red-700 border-red-200",
  medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
  low: "bg-gray-100 text-gray-700 border-gray-200"
}

export default function AnnouncementsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            Announcements
          </h1>
          <p className="text-text-secondary">
            Important updates and communications from Cresset to keep you informed about new services, events, and opportunities.
          </p>
        </div>
        
        {/* Announcements List */}
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <Card key={announcement.id} className={`transition-all hover:shadow-md ${!announcement.read ? 'border-l-4 border-l-blue-500' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between w-full">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <announcement.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-lg">{announcement.title}</CardTitle>
                        {!announcement.read && (
                          <Badge variant="default" className="bg-blue-600 text-white text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mb-3">
                        <Badge variant="secondary" className={categoryColors[announcement.category as keyof typeof categoryColors]}>
                          {announcement.category}
                        </Badge>
                        <Badge variant="outline" className={priorityColors[announcement.priority as keyof typeof priorityColors]}>
                          {announcement.priority} priority
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          {announcement.date}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Clock className="h-4 w-4" />
                          {announcement.time}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={announcement.authorAvatar} alt={announcement.author} />
                          <AvatarFallback className="text-xs">
                            {announcement.author.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-600">{announcement.author}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Button variant="ghost" size="sm" className="text-brand-primary hover:bg-brand-primary/10">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-brand-primary hover:bg-brand-primary/10">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-xs text-text-secondary mb-4">
                  {announcement.content}
                </CardDescription>
                
                {/* Tags */}
                <div className="flex items-center gap-2 mb-4">
                  {announcement.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                {/* Action Button */}
                <Button variant="brand">
                  {announcement.actionText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
} 