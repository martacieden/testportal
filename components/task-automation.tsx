"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Zap, 
  Play, 
  Pause, 
  Clock, 
  Users, 
  Target, 
  CheckCircle, 
  AlertTriangle,
  Calendar,
  Mail,
  MessageSquare,
  FileText,
  Download,
  Share2,
  Settings,
  Plus,
  Trash2,
  Edit
} from "lucide-react"

interface TaskAutomationProps {
  documentId: string
  documentName: string
  documentSummary: string
}

interface AutomationTask {
  id: string
  name: string
  description: string
  type: 'review' | 'approval' | 'notification' | 'reminder' | 'workflow'
  status: 'active' | 'paused' | 'completed' | 'failed'
  priority: 'high' | 'medium' | 'low'
  assignee?: string
  dueDate?: string
  triggers: string[]
  actions: string[]
}

export function TaskAutomation({ documentId, documentName, documentSummary }: TaskAutomationProps) {
  const [activeTab, setActiveTab] = useState('workflows')
  const [showCreateTask, setShowCreateTask] = useState(false)
  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    type: 'review' as const,
    priority: 'medium' as const,
    assignee: '',
    dueDate: '',
    triggers: [] as string[],
    actions: [] as string[]
  })

  const automationTasks: AutomationTask[] = [
    {
      id: '1',
      name: 'Document Review Workflow',
      description: 'Automated review process for document verification and approval',
      type: 'review',
      status: 'active',
      priority: 'high',
      assignee: 'Sarah Chen',
      dueDate: '2025-01-20',
      triggers: ['Document Upload', 'Status Change'],
      actions: ['Send Review Request', 'Update Status', 'Notify Stakeholders']
    },
    {
      id: '2',
      name: 'Compliance Check',
      description: 'Automated compliance verification and regulatory checks',
      type: 'workflow',
      status: 'active',
      priority: 'high',
      assignee: 'Compliance Team',
      dueDate: '2025-01-18',
      triggers: ['Document Upload'],
      actions: ['Run Compliance Check', 'Generate Report', 'Flag Issues']
    },
    {
      id: '3',
      name: 'Expiration Reminder',
      description: 'Automated reminders for document expiration dates',
      type: 'reminder',
      status: 'active',
      priority: 'medium',
      assignee: 'System',
      dueDate: '2025-12-31',
      triggers: ['Date Threshold'],
      actions: ['Send Email Reminder', 'Create Calendar Event', 'Update Dashboard']
    },
    {
      id: '4',
      name: 'Stakeholder Notification',
      description: 'Notify relevant stakeholders of document updates',
      type: 'notification',
      status: 'paused',
      priority: 'low',
      assignee: 'System',
      triggers: ['Document Update'],
      actions: ['Send Email', 'Slack Notification', 'Update Status']
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Play className="h-4 w-4 text-green-600" />
      case 'paused':
        return <Pause className="h-4 w-4 text-yellow-600" />
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-blue-600" />
      case 'failed':
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTypeColor = (type: string) => {
    const colors = {
      'review': 'bg-purple-100 text-purple-800',
      'approval': 'bg-blue-100 text-blue-800',
      'notification': 'bg-green-100 text-green-800',
      'reminder': 'bg-orange-100 text-orange-800',
      'workflow': 'bg-indigo-100 text-indigo-800'
    }
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'
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

  const handleCreateTask = () => {
    // In a real app, this would create the task
    console.log('Creating task:', newTask)
    setShowCreateTask(false)
    setNewTask({
      name: '',
      description: '',
      type: 'review',
      priority: 'medium',
      assignee: '',
      dueDate: '',
      triggers: [],
      actions: []
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Task Automation
          <Badge variant="secondary" className="ml-2 md:ml-4">
            <Target className="h-3 w-3 mr-1" />
            Workflow Engine
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {automationTasks.filter(t => t.status === 'active').length}
            </div>
            <div className="text-xs text-blue-600">Active</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {automationTasks.filter(t => t.status === 'completed').length}
            </div>
            <div className="text-xs text-green-600">Completed</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {automationTasks.filter(t => t.status === 'paused').length}
            </div>
            <div className="text-xs text-yellow-600">Paused</div>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              {automationTasks.filter(t => t.status === 'failed').length}
            </div>
            <div className="text-xs text-red-600">Failed</div>
          </div>
        </div>

        {/* Automation Tasks */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium">Automation Workflows</h4>
            <Button 
              size="sm" 
              onClick={() => setShowCreateTask(true)}
              style={{ backgroundColor: "#1E9ADF", color: "#FFFFFF" }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Workflow
            </Button>
          </div>
          
          <div className="space-y-3">
            {automationTasks.map((task) => (
              <div key={task.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    {getStatusIcon(task.status)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="font-medium text-sm">{task.name}</h5>
                        <Badge className={`text-xs ${getStatusColor(task.status)}`}>
                          {task.status}
                        </Badge>
                        <Badge className={`text-xs ${getTypeColor(task.type)}`}>
                          {task.type}
                        </Badge>
                        <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {task.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        {task.assignee && (
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>{task.assignee}</span>
                          </div>
                        )}
                        {task.dueDate && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>

                      <div className="mt-2">
                        <div className="text-xs text-muted-foreground mb-1">Triggers:</div>
                        <div className="flex flex-wrap gap-1">
                          {task.triggers.map((trigger, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {trigger}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mt-2">
                        <div className="text-xs text-muted-foreground mb-1">Actions:</div>
                        <div className="flex flex-wrap gap-1">
                          {task.actions.map((action, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {action}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Create Task Modal */}
        {showCreateTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Create Automation Workflow</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Workflow Name</label>
                  <Input
                    value={newTask.name}
                    onChange={(e) => setNewTask({...newTask, name: e.target.value})}
                    placeholder="Enter workflow name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <Textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    placeholder="Describe the workflow"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Type</label>
                    <Select value={newTask.type} onValueChange={(value: any) => setNewTask({...newTask, type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="review">Review</SelectItem>
                        <SelectItem value="approval">Approval</SelectItem>
                        <SelectItem value="notification">Notification</SelectItem>
                        <SelectItem value="reminder">Reminder</SelectItem>
                        <SelectItem value="workflow">Workflow</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Priority</label>
                    <Select value={newTask.priority} onValueChange={(value: any) => setNewTask({...newTask, priority: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Assignee</label>
                  <Input
                    value={newTask.assignee}
                    onChange={(e) => setNewTask({...newTask, assignee: e.target.value})}
                    placeholder="Enter assignee name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Due Date</label>
                  <Input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="flex gap-2 mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setShowCreateTask(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreateTask}
                  className="flex-1"
                  style={{ backgroundColor: "#1E9ADF", color: "#FFFFFF" }}
                >
                  Create Workflow
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4 border-t">
          <Button variant="outline" size="sm" className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            Export Workflows
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
          <Button size="sm" className="flex-1" style={{ backgroundColor: "#1E9ADF", color: "#FFFFFF" }}>
            <Play className="h-4 w-4 mr-2" />
            Run All
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 