"use client";

import React, { useState } from "react";
import {
  Calculator,
  PieChart,
  Home,
  Shield,
  ChevronRight,
  Play,
  Clock,
  Eye,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import BenefitsWidget, { BenefitsWidget as NamedBenefitsWidget } from "@/components/widgets/benefits-widget";
import EventsWidget, { EventsWidget as NamedEventsWidget } from "@/components/widgets/events-widget";

const articles = [
  {
    id: 1,
    category: "Pre-Liquidity Planning",
    title: "Maximizing After-Tax Proceeds from Your Business Sale",
    description:
      "Comprehensive strategies to minimize tax impact and optimize exit value",
    readTime: 12,
    difficulty: "Advanced",
    tags: ["Tax Planning", "Business Exit", "Optimization"],
    lastUpdated: "2023-10-26",
    views: 245,
  },
  {
    id: 2,
    category: "Investment Strategy",
    title: "Post-Exit Portfolio Diversification: Beyond Tech Concentration",
    description:
      "Building a resilient investment portfolio after selling your technology business",
    readTime: 15,
    difficulty: "Intermediate",
    tags: ["Diversification", "Risk Management", "Portfolio Strategy"],
    lastUpdated: "2023-10-22",
    views: 189,
  },
  {
    id: 3,
    category: "Estate Planning",
    title: "Trust Structures for Entrepreneurs: A Complete Guide",
    description:
      "Understanding revocable and irrevocable trusts for wealth transfer and tax efficiency",
    readTime: 20,
    difficulty: "Advanced",
    tags: ["Trusts", "Wealth Transfer", "Tax Efficiency"],
    lastUpdated: "2023-10-18",
    views: 312,
  },
  {
    id: 4,
    category: "Tax Strategy",
    title: "Timing Your Stock Option Exercise for Optimal Tax Treatment",
    description:
      "Navigating ISOs vs. NSOs and the Alternative Minimum Tax (AMT)",
    readTime: 18,
    difficulty: "Advanced",
    tags: ["Stock Options", "AMT", "Tax Planning"],
    lastUpdated: "2023-09-30",
    views: 450,
  },
];

const planningTools: {
    title: string;
    description: string;
    icon: React.ElementType;
    color: string;
}[] = [
  {
    title: "Exit Tax Calculator",
    description: "Estimate taxes on your business sale.",
    icon: Calculator,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Portfolio Analyzer",
    description: "Assess your current asset allocation.",
    icon: PieChart,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Estate Planning Guide",
    description: "Interactive checklist for your estate plan.",
    icon: Home,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Insurance Calculator",
    description: "Determine your life insurance needs.",
    icon: Shield,
    color: "bg-orange-100 text-orange-600",
  },
];

const faqs = [
  "How should I time my business sale for optimal tax treatment?",
  "What estate planning strategies work best for tech entrepreneurs?",
  "How can I diversify my portfolio after a concentrated position?",
  "What insurance coverage do I need before going public?",
];

const difficultyConfig: { [key: string]: string } = {
  Advanced: "bg-red-100 text-red-700",
  Intermediate: "bg-yellow-100 text-yellow-700",
  Beginner: "bg-green-100 text-green-700",
};

const videoContent = [
  {
    id: 1,
    title: "Exit Strategy Planning 101",
    description: "Expert insights on structuring your business sale for maximum value and tax efficiency.",
    duration: "15 min",
    views: "2.4k views",
    tags: ["Exit Strategy", "Tax Planning"],
    videoUrl: "#",
    thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=225&fit=crop&crop=center",
    category: "Business Exit",
  },
  {
    id: 2,
    title: "QSBS Tax Benefits Explained",
    description: "How to maximize your QSBS tax benefits after an exit and avoid common pitfalls.",
    duration: "12 min",
    views: "1.8k views",
    tags: ["QSBS", "Tax Planning"],
    videoUrl: "#",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop&crop=center",
    category: "Tax Strategy",
  },
  {
    id: 3,
    title: "Estate Planning for Entrepreneurs",
    description: "Estate planning strategies tailored specifically for tech founders and entrepreneurs.",
    duration: "18 min",
    views: "3.1k views",
    tags: ["Estate Planning", "Wealth Transfer"],
    videoUrl: "#",
    thumbnail: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=225&fit=crop&crop=center",
    category: "Estate Planning",
  },
  {
    id: 4,
    title: "Portfolio Diversification Strategies",
    description: "Learn how to build a resilient investment portfolio after selling your business.",
    duration: "22 min",
    views: "1.5k views",
    tags: ["Investment", "Diversification"],
    videoUrl: "#",
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=225&fit=crop&crop=center",
    category: "Investment Strategy",
  },
  {
    id: 5,
    title: "Trust Structures Deep Dive",
    description: "Understanding revocable and irrevocable trusts for wealth transfer and tax efficiency.",
    duration: "25 min",
    views: "2.9k views",
    tags: ["Trusts", "Wealth Transfer"],
    videoUrl: "#",
    thumbnail: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=225&fit=crop&crop=center",
    category: "Estate Planning",
  },
  {
    id: 6,
    title: "Insurance Planning for High Net Worth",
    description: "Comprehensive insurance strategies for protecting your wealth and family.",
    duration: "16 min",
    views: "1.2k views",
    tags: ["Insurance", "Risk Management"],
    videoUrl: "#",
    thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=225&fit=crop&crop=center",
    category: "Insurance Planning",
  },
];

export function ResourcesModule() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showAiChat, setShowAiChat] = useState(false);

  return (
    <div className="space-y-6">
      {/* Tabbed Resources Section - Main Content */}
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-sm space-y-8">
        <div className="space-y-4">
          <Tabs defaultValue="featured" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="featured">Featured for You</TabsTrigger>
              <TabsTrigger value="education">Blog & Video Education</TabsTrigger>
              <TabsTrigger value="tools">Planning Tools</TabsTrigger>
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>

            {/* Featured for You Tab */}
            <TabsContent value="featured" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.slice(0, 3).map((article) => (
                  <Card
                    key={article.id}
                    className="overflow-hidden flex flex-col justify-between transition-all hover:shadow-md"
                  >
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge
                          variant="default"
                          className="bg-blue-100 text-blue-700 hover:bg-blue-200"
                        >
                          {article.category}
                        </Badge>
                        <Badge
                          variant="default"
                          className={`${difficultyConfig[article.difficulty]}`}
                        >
                          {article.difficulty}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {article.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{article.readTime} min read</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <div className="bg-gray-50 p-4">
                      <Button variant="outline" className="w-full" style={{ borderColor: "#1E9ADF", color: "#1E9ADF" }}>
                        Read Article
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Blog & Video Education Tab */}
            <TabsContent value="education" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videoContent.map((video) => (
                  <Card key={video.id} className="overflow-hidden flex flex-col transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer">
                    <div className="relative group">
                      <div className="aspect-video bg-gray-200 overflow-hidden">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-white bg-opacity-90 rounded-full p-4 shadow-lg">
                          <Play className="h-8 w-8 text-blue-600 fill-blue-600" />
                        </div>
                      </div>
                      {/* Duration Badge */}
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                      {/* Category Badge */}
                      <div className="absolute top-2 left-2">
                        <Badge variant="default" className="bg-blue-600 text-white text-xs">
                          {video.category}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4 flex-1 flex flex-col">
                      <h3 className="font-semibold text-gray-800 text-lg mb-2 line-clamp-2">
                        {video.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-1">
                        {video.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          <span>{video.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{video.duration}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {video.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full mt-auto"
                        style={{ borderColor: "#1E9ADF", color: "#1E9ADF" }}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Watch Video
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Planning Tools Tab */}
            <TabsContent value="tools" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {planningTools.map((tool) => (
                  <Card
                    key={tool.title}
                    className="p-4 transition-all hover:shadow-md hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${tool.color}`}>
                        <tool.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{tool.title}</h4>
                        <p className="text-sm text-gray-600">{tool.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Benefits Tab */}
            <TabsContent value="benefits" className="space-y-4 mt-6">
              <h2 className="text-xl font-semibold mb-4">Personalized Benefits</h2>
              <NamedBenefitsWidget />
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events" className="space-y-4 mt-6">
              <h2 className="text-xl font-semibold mb-4">Curated Events</h2>
              <NamedEventsWidget />
            </TabsContent>

          </Tabs>
        </div>
      </div>

      {/* FAQ Section - Separate White Background Block */}
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-sm">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">Frequently Asked Questions</h2>
          <div className="space-y-2">
            <div className="bg-gray-50 rounded-lg p-4">
              <strong>How should I structure my business sale to minimize taxes?</strong>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <strong>What estate planning strategies work best for tech entrepreneurs?</strong>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <strong>How do I diversify my wealth after selling my business?</strong>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <strong>What insurance coverage do I need before my exit?</strong>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <strong>How can I optimize my post-exit investment strategy?</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Floating AI Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setShowAiChat(!showAiChat)}
          className="rounded-full w-14 h-14 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
          style={{ boxShadow: "0 4px 20px rgba(30, 154, 223, 0.3)" }}
        >
          <Sparkles className="h-6 w-6" />
        </Button>
        
        {/* AI Chat Tooltip */}
        {showAiChat && (
          <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl p-4 border border-gray-200 w-64">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span className="font-semibold text-gray-800">AI Assistant</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Ask me anything about financial planning, business exit strategies, or any other questions you have!
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              style={{ borderColor: "#1E9ADF", color: "#1E9ADF" }}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Start Chat
            </Button>
          </div>
        )}
      </div>
    </div>
  );
} 