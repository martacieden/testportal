import React from "react";
import { Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
  <div className="flex flex-wrap items-center gap-3 min-w-[280px] max-w-full px-2 py-1">
    {/* Title and badges */}
    <span className="font-semibold text-text-primary whitespace-nowrap">
      {latestAnnouncement.title}
    </span>
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
    {/* Meta info */}
    <span className="flex items-center gap-1 text-xs text-text-tertiary whitespace-nowrap">
      <Calendar className="h-3 w-3" />
      {latestAnnouncement.date}
      <Clock className="h-3 w-3 ml-2" />
      {latestAnnouncement.time}
    </span>
    {/* Author */}
    <span className="text-xs text-text-tertiary whitespace-nowrap">
      by {latestAnnouncement.author}
    </span>
    {/* Description */}
    <span className="text-xs text-text-secondary line-clamp-1 max-w-[200px]">
      {latestAnnouncement.content}
    </span>
    {/* Action */}
    <Link href={latestAnnouncement.actionLink} className="ml-auto">
      <Button variant="brandOutline" size="sm" className="whitespace-nowrap">
        {latestAnnouncement.actionText}
      </Button>
    </Link>
  </div>
);

export default AnnouncementsPreview; 