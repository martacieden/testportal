import React from "react";
import { Star, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const featuredBenefit = {
  title: "Dedicated Wealth Advisor",
  description: "Access to a personal advisor for all your financial needs with 24/7 availability for urgent matters.",
  category: "Personal Service",
  status: "active",
  priority: "high",
  value: "Premium",
  actionText: "Schedule Meeting",
  actionLink: "#"
};

const BenefitsPreview = () => (
  <div className="flex flex-wrap items-center gap-3 min-w-[280px] max-w-full px-2 py-1">
    {/* Title and badges */}
    <span className="font-semibold text-text-primary whitespace-nowrap">
      {featuredBenefit.title}
    </span>
    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
    <Badge variant="secondary" className="text-xs whitespace-nowrap">
      {featuredBenefit.category}
    </Badge>
    <Badge variant="warning" className="text-xs whitespace-nowrap">
      {featuredBenefit.priority} priority
    </Badge>
    <CheckCircle className="h-3 w-3 text-status-success" />
    <Badge variant="success" className="text-xs whitespace-nowrap">
      {featuredBenefit.status}
    </Badge>
    <Badge variant="outline" className="text-xs whitespace-nowrap">
      {featuredBenefit.value}
    </Badge>
    {/* Description */}
    <span className="text-xs text-text-secondary line-clamp-1 max-w-[200px]">
      {featuredBenefit.description}
    </span>
    {/* Action */}
    <Link href={featuredBenefit.actionLink} className="ml-auto">
      <Button variant="brandOutline" size="sm" className="whitespace-nowrap">
        {featuredBenefit.actionText}
      </Button>
    </Link>
  </div>
);

export default BenefitsPreview; 