import React from "react";
import { Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const latestAnnouncement = {
  id: 1,
  title: "Cresset Annual Wealth Summit 2024",
  content: "Join us for our premier wealth management event featuring industry experts, exclusive networking opportunities, and insights into the latest financial strategies.",
  author: "Cresset Leadership Team",
  date: "2024-01-15",
  time: "10:00 AM",
  category: "Event",
  priority: "high",
  read: false,
  actionText: "Register Now",
  actionLink: "#"
};

const AnnouncementsPreview = () => (
  <Card className="w-full">
    <CardHeader className="pb-1 flex flex-col items-start px-3 pt-3">
      <span className="font-semibold text-text-primary text-base block mb-1">
        {latestAnnouncement.title}
      </span>
      <div className="flex items-center gap-2 mb-2">
        <Badge variant="secondary" className="text-xs whitespace-nowrap">
          {latestAnnouncement.category}
        </Badge>
        <Badge variant="warning" className="text-xs whitespace-nowrap">
          {latestAnnouncement.priority} priority
        </Badge>
        {!latestAnnouncement.read && (
          <Badge variant="info" className="text-xs whitespace-nowrap">
            New
          </Badge>
        )}
      </div>
      <div className="flex items-center gap-2 text-xs text-text-tertiary mb-2">
        <Calendar className="h-3 w-3" />
        {latestAnnouncement.date}
        <Clock className="h-3 w-3 ml-2" />
        {latestAnnouncement.time}
        <span className="ml-2">by {latestAnnouncement.author}</span>
      </div>
    </CardHeader>
    <CardContent className="pt-0 pb-3 px-3">
      <p className="text-sm text-text-secondary mb-3">
        {latestAnnouncement.content}
      </p>
      <Link href={latestAnnouncement.actionLink}>
        <Button variant="brandOutline" size="sm">
          {latestAnnouncement.actionText}
        </Button>
      </Link>
    </CardContent>
  </Card>
);

export default AnnouncementsPreview; 