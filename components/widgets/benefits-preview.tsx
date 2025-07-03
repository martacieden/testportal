import React from "react";
import { Star, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

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
  <Card className="w-full">
    <CardHeader className="pb-1 flex flex-col items-start px-3 pt-3">
      <span className="font-semibold text-text-primary text-base block mb-1">
        {featuredBenefit.title}
      </span>
      <div className="flex items-center gap-2 mb-2">
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
      </div>
    </CardHeader>
    <CardContent className="pt-0 pb-3 px-3">
      <p className="text-sm text-text-secondary mb-3">
        {featuredBenefit.description} Enjoy personalized financial strategies, proactive support, and direct access to exclusive resources tailored to your goals.
      </p>
      <Link href={featuredBenefit.actionLink}>
        <Button variant="brandOutline" size="sm">
          {featuredBenefit.actionText}
        </Button>
      </Link>
    </CardContent>
  </Card>
);

export default BenefitsPreview; 