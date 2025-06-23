"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Calendar,
  FileText,
  Users,
  Target,
  Zap,
  Eye,
  Download,
  Share2
} from "lucide-react"

interface DocumentInsightsProps {
  documentId: string
  documentContent: string
}

interface Insight {
  id: string
  type: 'key-finding' | 'risk' | 'opportunity' | 'action-item'
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  category: string
  value?: string
  trend?: 'up' | 'down' | 'stable'
}

export function DocumentInsights({ documentId, documentContent }: DocumentInsightsProps) {
  const [activeTab, setActiveTab] = useState('overview')

  // Generate insights based on document type
  const generateInsights = (): Insight[] => {
    if (documentId === '1') {
      return [
        {
          id: '1',
          type: 'key-finding',
          title: 'Identity Verification Complete',
          description: 'All identity documents have been verified and authenticated successfully.',
          priority: 'high',
          category: 'Compliance',
          value: '100%',
          trend: 'up'
        },
        {
          id: '2',
          type: 'action-item',
          title: 'License Expiration Reminder',
          description: 'Driver\'s license expires in 3 years. Set reminder for renewal.',
          priority: 'medium',
          category: 'Timeline',
          value: '2028-12-31'
        },
        {
          id: '3',
          type: 'key-finding',
          title: 'Compliance Requirements Met',
          description: 'All required identity verification steps completed for financial services.',
          priority: 'high',
          category: 'Regulatory'
        }
      ]
    } else if (documentId === '2') {
      return [
        {
          id: '1',
          type: 'key-finding',
          title: 'Tax Refund Identified',
          description: 'Tax return shows a refund of $1,350 due to overpayment.',
          priority: 'high',
          category: 'Financial',
          value: '$1,350',
          trend: 'up'
        },
        {
          id: '2',
          type: 'action-item',
          title: 'Review Required',
          description: 'Tax return needs advisor review before final submission.',
          priority: 'high',
          category: 'Action',
          value: 'Pending'
        },
        {
          id: '3',
          type: 'opportunity',
          title: 'Tax Optimization Opportunity',
          description: 'Consider additional deductions to reduce tax liability further.',
          priority: 'medium',
          category: 'Planning'
        },
        {
          id: '4',
          type: 'key-finding',
          title: 'Income Analysis',
          description: 'Total income of $134,500 with diversified sources.',
          priority: 'medium',
          category: 'Financial',
          value: '$134,500'
        }
      ]
    } else {
      return [
        {
          id: '1',
          type: 'key-finding',
          title: 'Estate Plan Complete',
          description: 'Comprehensive estate planning documents are in place.',
          priority: 'high',
          category: 'Legal',
          value: 'Complete'
        },
        {
          id: '2',
          type: 'key-finding',
          title: 'Total Estate Value',
          description: 'Total estate valued at $2.7 million across multiple asset classes.',
          priority: 'high',
          category: 'Financial',
          value: '$2.7M'
        },
        {
          id: '3',
          type: 'action-item',
          title: 'Trust Funding Review',
          description: 'Review trust funding to ensure all assets are properly titled.',
          priority: 'medium',
          category: 'Action'
        },
        {
          id: '4',
          type: 'opportunity',
          title: 'Charitable Giving',
          description: '10% allocation to charitable foundation identified.',
          priority: 'medium',
          category: 'Philanthropy'
        }
      ]
    }
  }

  const insights = generateInsights()

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'key-finding':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'risk':
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case 'opportunity':
        return <TrendingUp className="h-4 w-4 text-blue-600" />
      case 'action-item':
        return <Clock className="h-4 w-4 text-orange-600" />
      default:
        return <FileText className="h-4 w-4 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      'Compliance': 'bg-purple-100 text-purple-800',
      'Financial': 'bg-green-100 text-green-800',
      'Legal': 'bg-blue-100 text-blue-800',
      'Action': 'bg-orange-100 text-orange-800',
      'Timeline': 'bg-cyan-100 text-cyan-800',
      'Regulatory': 'bg-indigo-100 text-indigo-800',
      'Planning': 'bg-teal-100 text-teal-800',
      'Philanthropy': 'bg-pink-100 text-pink-800'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Document Insights
          <Badge variant="secondary" className="ml-auto">
            <Zap className="h-3 w-3 mr-1" />
            AI Generated
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {insights.filter(i => i.type === 'key-finding').length}
            </div>
            <div className="text-xs text-blue-600">Key Findings</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">
              {insights.filter(i => i.type === 'action-item').length}
            </div>
            <div className="text-xs text-orange-600">Action Items</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {insights.filter(i => i.type === 'opportunity').length}
            </div>
            <div className="text-xs text-green-600">Opportunities</div>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              {insights.filter(i => i.type === 'risk').length}
            </div>
            <div className="text-xs text-red-600">Risks</div>
          </div>
        </div>

        {/* Priority Distribution */}
        <div>
          <h4 className="font-medium mb-3">Priority Distribution</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">High Priority</span>
              <span className="text-sm font-medium">
                {insights.filter(i => i.priority === 'high').length}
              </span>
            </div>
            <Progress 
              value={(insights.filter(i => i.priority === 'high').length / insights.length) * 100} 
              className="h-2"
            />
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Medium Priority</span>
              <span className="text-sm font-medium">
                {insights.filter(i => i.priority === 'medium').length}
              </span>
            </div>
            <Progress 
              value={(insights.filter(i => i.priority === 'medium').length / insights.length) * 100} 
              className="h-2"
            />
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Low Priority</span>
              <span className="text-sm font-medium">
                {insights.filter(i => i.priority === 'low').length}
              </span>
            </div>
            <Progress 
              value={(insights.filter(i => i.priority === 'low').length / insights.length) * 100} 
              className="h-2"
            />
          </div>
        </div>

        {/* Insights List */}
        <div>
          <h4 className="font-medium mb-3">Key Insights</h4>
          <div className="space-y-3">
            {insights.map((insight) => (
              <div key={insight.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    {getInsightIcon(insight.type)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="font-medium text-sm">{insight.title}</h5>
                        <Badge className={`text-xs ${getPriorityColor(insight.priority)}`}>
                          {insight.priority}
                        </Badge>
                        <Badge className={`text-xs ${getCategoryColor(insight.category)}`}>
                          {insight.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {insight.description}
                      </p>
                      {insight.value && (
                        <div className="flex items-center gap-1 text-sm">
                          <span className="font-medium">Value:</span>
                          <span className="text-blue-600">{insight.value}</span>
                          {insight.trend && (
                            <TrendingUp className={`h-3 w-3 ${
                              insight.trend === 'up' ? 'text-green-600' : 
                              insight.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                            }`} />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4 border-t">
          <Button variant="outline" size="sm" className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Share2 className="h-4 w-4 mr-2" />
            Share Insights
          </Button>
          <Button size="sm" className="flex-1" style={{ backgroundColor: "#1E9ADF", color: "#FFFFFF" }}>
            <Target className="h-4 w-4 mr-2" />
            Create Tasks
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 