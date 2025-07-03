import React from "react";
import { Calendar, MapPin, Clock, Users, Star, ArrowRight, Video, Building2, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mockEvents = [
  {
    name: "Cresset Annual Wealth Summit",
    date: "2024-09-15",
    time: "9:00 AM - 5:00 PM",
    location: "Chicago, IL",
    description: "A gathering of thought leaders and clients to discuss wealth strategies.",
    category: "Summit",
    icon: Building2,
    attendees: "150+",
    featured: true,
    registrationOpen: true,
  },
  {
    name: "Family Legacy Workshop",
    date: "2024-07-10",
    time: "2:00 PM - 4:00 PM",
    location: "Virtual",
    description: "Interactive session on family governance and legacy planning.",
    category: "Workshop",
    icon: GraduationCap,
    attendees: "75+",
    featured: true,
    registrationOpen: true,
  },
  {
    name: "Private Market Insights Webinar",
    date: "2024-08-05",
    time: "1:00 PM - 2:30 PM",
    location: "Virtual",
    description: "Exclusive insights into private market investment opportunities.",
    category: "Webinar",
    icon: Video,
    attendees: "200+",
    featured: false,
    registrationOpen: true,
  },
  {
    name: "Tax Strategy Roundtable",
    date: "2024-08-20",
    time: "10:00 AM - 12:00 PM",
    location: "New York, NY",
    description: "Expert panel discussion on advanced tax planning strategies.",
    category: "Roundtable",
    icon: Building2,
    attendees: "50",
    featured: false,
    registrationOpen: false,
  },
  {
    name: "ESG Investment Forum",
    date: "2024-09-30",
    time: "3:00 PM - 5:00 PM",
    location: "San Francisco, CA",
    description: "Exploring sustainable and impact investment opportunities.",
    category: "Forum",
    icon: Building2,
    attendees: "100+",
    featured: false,
    registrationOpen: true,
  },
  {
    name: "Next Gen Wealth Planning",
    date: "2024-10-15",
    time: "11:00 AM - 1:00 PM",
    location: "Virtual",
    description: "Specialized planning for the next generation of wealth holders.",
    category: "Workshop",
    icon: GraduationCap,
    attendees: "60+",
    featured: false,
    registrationOpen: true,
  },
];

const categoryColors = {
  Summit: "bg-purple-100 text-purple-700",
  Workshop: "bg-blue-100 text-blue-700",
  Webinar: "bg-green-100 text-green-700",
  Roundtable: "bg-orange-100 text-orange-700",
  Forum: "bg-indigo-100 text-indigo-700",
};

const EventsWidget = () => (
  <div className="space-y-6">
    {/* Featured Events */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        <Star className="h-5 w-5 text-yellow-500" />
        Featured Events
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockEvents.filter(event => event.featured).map((event, idx) => (
          <div key={idx} className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <event.icon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="default" className={categoryColors[event.category as keyof typeof categoryColors]}>
                    {event.category}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {event.attendees}
                  </Badge>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">{event.name}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                <Button 
                  variant={event.registrationOpen ? "default" : "outline"}
                  size="sm" 
                  className={event.registrationOpen ? "bg-blue-600 hover:bg-blue-700" : "text-gray-500"}
                  disabled={!event.registrationOpen}
                >
                  {event.registrationOpen ? "Register Now" : "Registration Closed"}
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* All Events Grid */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">All Upcoming Events</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockEvents.map((event, idx) => (
          <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200">
            <div className="flex items-start gap-3 mb-3">
              <div className="bg-gray-100 p-2 rounded-lg">
                <event.icon className="h-5 w-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <Badge variant="secondary" className={`text-xs mb-2 ${categoryColors[event.category as keyof typeof categoryColors]}`}>
                  {event.category}
                </Badge>
                <h4 className="font-medium text-gray-900 text-sm mb-1">{event.name}</h4>
              </div>
            </div>
            <div className="space-y-2 mb-3">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Calendar className="h-3 w-3" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <MapPin className="h-3 w-3" />
                <span>{event.location}</span>
              </div>
            </div>
            <p className="text-gray-600 text-xs mb-3 line-clamp-2">{event.description}</p>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs">
                {event.attendees}
              </Badge>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
                disabled={!event.registrationOpen}
              >
                {event.registrationOpen ? "Register" : "Closed"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* CTA Section */}
    <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 text-white text-center">
      <h3 className="text-xl font-semibold mb-2">Stay Updated on Events</h3>
      <p className="text-green-100 mb-4">Get notified about new events and exclusive invitations</p>
      <Button className="bg-white text-green-600 hover:bg-gray-100">
        Subscribe to Updates
      </Button>
    </div>
  </div>
);

export { EventsWidget };
export default EventsWidget; 