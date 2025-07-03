import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, Clock, Video, MapPin } from "lucide-react"

// Sample data for meetings
const meetings = [
  {
    id: 1,
    title: "Quarterly Review",
    type: "Video Call",
    description: "Q2 progress review and Q3 planning",
    date: "2024-06-20T14:00:00",
    link: "https://zoom.us/j/1234567890",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
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
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=64&h=64&fit=crop&crop=face",
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
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
    participant: "Jennifer Liu",
    duration: "30 min"
  }
]

export function UpcomingMeetingsWidget() {
  const getMeetingIcon = (type: string) => {
    switch (type) {
      case "Video Call":
        return <Video className="h-4 w-4 text-status-info" />
      case "In-Person":
        return <MapPin className="h-4 w-4 text-status-success" />
      default:
        return <Calendar className="h-4 w-4 text-neutral-500" />
    }
  }

  const formatMeetingTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    })
  }

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle>Upcoming Meetings</CardTitle>
          <CardDescription>
            Scheduled meetings and appointments
          </CardDescription>
        </div>
        <Badge variant="info">
          {meetings.length} scheduled
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        {meetings.map((meeting) => (
          <div
            key={meeting.id}
            className="flex items-start gap-3 p-3 rounded-lg border border-neutral-200 transition-all hover:shadow-sm"
          >
            <div className="mt-1">
              {getMeetingIcon(meeting.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className="font-semibold text-sm text-text-primary">
                  {meeting.title}
                </h4>
                <Badge variant="sm">
                  {meeting.type}
                </Badge>
              </div>
              <p className="text-xs text-text-secondary">
                {meeting.description}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={meeting.avatar} alt={meeting.participant} />
                  <AvatarFallback className="text-xs">
                    {meeting.participant.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-text-secondary">
                  {formatMeetingTime(meeting.date)}
                </span>
                <span className="text-xs text-text-secondary">
                  • {meeting.duration}
                </span>
              </div>
            </div>
            
            {meeting.link && meeting.link !== "#" && (
              <Button size="sm" variant="brandOutline" className="text-xs">
                Join
              </Button>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
} 