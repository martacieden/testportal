import React from "react";
import { Gift, Shield, Users, TrendingUp, Star, ArrowRight, CheckCircle, Clock, Zap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockBenefits = [
  {
    title: "Dedicated Wealth Advisor",
    description: "Access to a personal advisor for all your financial needs with 24/7 availability for urgent matters.",
    icon: Users,
    category: "Personal Service",
    featured: true,
    status: "active",
    priority: "high",
    value: "Premium",
    actionText: "Schedule Meeting",
    actionLink: "#"
  },
  {
    title: "Exclusive Investment Opportunities",
    description: "Participate in private investment deals curated by Cresset's investment team.",
    icon: TrendingUp,
    category: "Investment",
    featured: true,
    status: "active",
    priority: "high",
    value: "Exclusive",
    actionText: "View Opportunities",
    actionLink: "#"
  },
  {
    title: "Family Office Services",
    description: "Comprehensive support for family governance, legacy, and philanthropy planning.",
    icon: Shield,
    category: "Family Planning",
    featured: false,
    status: "available",
    priority: "medium",
    value: "Premium",
    actionText: "Learn More",
    actionLink: "#"
  },
  {
    title: "Tax Optimization Strategies",
    description: "Advanced tax planning and optimization techniques tailored to your situation.",
    icon: TrendingUp,
    category: "Tax Planning",
    featured: false,
    status: "active",
    priority: "high",
    value: "Advanced",
    actionText: "Get Analysis",
    actionLink: "#"
  },
  {
    title: "Estate Planning Support",
    description: "Expert guidance on trust structures and wealth transfer strategies.",
    icon: Shield,
    category: "Estate Planning",
    featured: false,
    status: "available",
    priority: "medium",
    value: "Comprehensive",
    actionText: "Start Planning",
    actionLink: "#"
  },
  {
    title: "Concierge Services",
    description: "Premium lifestyle and concierge services for high-net-worth clients.",
    icon: Gift,
    category: "Lifestyle",
    featured: false,
    status: "available",
    priority: "low",
    value: "Luxury",
    actionText: "Explore Services",
    actionLink: "#"
  },
  {
    title: "Priority Access to Events",
    description: "Exclusive invitations to Cresset events, seminars, and networking opportunities.",
    icon: Crown,
    category: "Events",
    featured: false,
    status: "active",
    priority: "medium",
    value: "Exclusive",
    actionText: "View Calendar",
    actionLink: "#"
  },
  {
    title: "Rapid Response Team",
    description: "Dedicated team for urgent financial matters and time-sensitive decisions.",
    icon: Zap,
    category: "Support",
    featured: false,
    status: "active",
    priority: "high",
    value: "Premium",
    actionText: "Contact Team",
    actionLink: "#"
  }
];

const statusConfig = {
  active: { color: "bg-green-100 text-green-700", icon: CheckCircle },
  available: { color: "bg-blue-100 text-blue-700", icon: Clock },
  pending: { color: "bg-yellow-100 text-yellow-700", icon: Clock }
};

const priorityConfig = {
  high: "bg-red-100 text-red-700 border-red-200",
  medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
  low: "bg-gray-100 text-gray-700 border-gray-200"
};

const BenefitsWidget = () => (
  <div className="space-y-6">
    {/* Featured Benefits */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        <Star className="h-5 w-5 text-yellow-500" />
        Featured Benefits
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockBenefits.filter(benefit => benefit.featured).map((benefit, idx) => {
          const StatusIcon = statusConfig[benefit.status as keyof typeof statusConfig].icon;
          return (
            <Card key={idx} className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <benefit.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="default" className="bg-blue-100 text-blue-700">
                        {benefit.category}
                      </Badge>
                      <Badge variant="outline" className={priorityConfig[benefit.priority as keyof typeof priorityConfig]}>
                        {benefit.priority} priority
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusIcon className="h-4 w-4 text-green-600" />
                      <Badge variant="secondary" className={statusConfig[benefit.status as keyof typeof statusConfig].color}>
                        {benefit.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {benefit.value}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">{benefit.description}</p>
                <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                  {benefit.actionText} <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>

    {/* All Benefits Grid */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">All Available Benefits</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockBenefits.map((benefit, idx) => {
          const StatusIcon = statusConfig[benefit.status as keyof typeof statusConfig].icon;
          return (
            <Card key={idx} className="hover:shadow-md transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <benefit.icon className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {benefit.category}
                      </Badge>
                      <Badge variant="outline" className={`text-xs ${priorityConfig[benefit.priority as keyof typeof priorityConfig]}`}>
                        {benefit.priority}
                      </Badge>
                    </div>
                    <h4 className="font-medium text-gray-900 text-sm mb-1">{benefit.title}</h4>
                    <div className="flex items-center gap-2 mb-2">
                      <StatusIcon className="h-3 w-3 text-green-600" />
                      <Badge variant="secondary" className={`text-xs ${statusConfig[benefit.status as keyof typeof statusConfig].color}`}>
                        {benefit.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-xs mb-3">{benefit.description}</p>
                    <Button variant="outline" size="sm" className="text-xs w-full">
                      {benefit.actionText}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>

    {/* CTA Section */}
    <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <CardContent className="p-6 text-center">
        <h3 className="text-xl font-semibold mb-2">Ready to Access Your Benefits?</h3>
        <p className="text-blue-100 mb-4">Connect with your advisor to unlock all available services and maximize your wealth management experience</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button className="bg-white text-blue-600 hover:bg-gray-100">
            Schedule Consultation
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
            View All Services
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
);

export { BenefitsWidget };
export default BenefitsWidget; 