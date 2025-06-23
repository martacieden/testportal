"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  CheckSquare, 
  Square, 
  ArrowLeft, 
  Download, 
  FileText, 
  Calendar,
  User,
  Tag,
  MessageSquare,
  Send,
  Edit,
  MoreHorizontal
} from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Sample data for action items (same as the main page)
const actionItems = [
  {
    id: 1,
    title: "Review Q2 Investment Performance Report",
    description: "Please review the detailed performance analysis and provide feedback on any concerns or questions.",
    priority: "urgent",
    dueDate: "2024-06-25",
    category: "Investment Review",
    assignedBy: "Jennifer Liu",
    assignedByAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
    completed: false,
    type: "review",
    estimatedTime: "2 hours",
    attachments: ["Q2_Report.pdf", "Performance_Analysis.xlsx"],
    detailedDescription: "This comprehensive report covers our investment portfolio performance for Q2 2024. Key areas to focus on include:\n\n• Portfolio allocation changes and their impact\n• Performance comparison against benchmarks\n• Risk metrics and volatility analysis\n• Recommendations for Q3 adjustments\n\nPlease provide detailed feedback on any concerns, questions, or suggestions for improvement.",
    steps: [
      "Review the executive summary",
      "Analyze performance metrics",
      "Check risk assessment",
      "Review recommendations",
      "Provide feedback via comments"
    ],
    relatedProjects: ["Portfolio Optimization", "Risk Management Review"],
    comments: [
      {
        id: 1,
        author: "Jennifer Liu",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
        content: "Please pay special attention to the emerging markets section. We've seen some volatility there.",
        timestamp: "2024-06-20T10:30:00Z"
      }
    ]
  },
  {
    id: 2,
    title: "Sign Updated Trust Agreement",
    description: "Digital signature required for the updated trust agreement reflecting recent legislative changes.",
    priority: "high",
    dueDate: "2024-06-28",
    category: "Legal Documents",
    assignedBy: "John Doe",
    assignedByAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
    completed: false,
    type: "signature",
    estimatedTime: "15 minutes",
    attachments: ["Trust_Agreement_v2.pdf"],
    detailedDescription: "The trust agreement has been updated to comply with recent legislative changes affecting estate planning. Key updates include:\n\n• Updated beneficiary provisions\n• Revised distribution guidelines\n• Enhanced trustee powers\n• New tax optimization clauses\n\nThis document requires your digital signature to proceed with the trust establishment.",
    steps: [
      "Review the updated agreement",
      "Verify beneficiary information",
      "Check distribution terms",
      "Sign electronically",
      "Submit for processing"
    ],
    relatedProjects: ["Estate Planning", "Trust Establishment"],
    comments: []
  },
  {
    id: 3,
    title: "Provide Additional Tax Documentation",
    description: "Additional documentation needed for tax optimization strategies discussed in our last meeting.",
    priority: "medium",
    dueDate: "2024-07-05",
    category: "Tax Planning",
    assignedBy: "John Doe",
    assignedByAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
    completed: false,
    type: "documentation",
    estimatedTime: "1 hour",
    attachments: ["Tax_Requirements_List.pdf"],
    detailedDescription: "To optimize your tax strategy for the current year, we need additional documentation:\n\n• Business expense records for 2024\n• Charitable contribution receipts\n• Investment loss documentation\n• Foreign income statements\n\nPlease gather and upload these documents to enable our tax optimization analysis.",
    steps: [
      "Review required documents list",
      "Gather necessary paperwork",
      "Scan or photograph documents",
      "Upload to secure portal",
      "Confirm submission"
    ],
    relatedProjects: ["Tax Optimization", "Annual Planning"],
    comments: []
  },
  {
    id: 4,
    title: "Approve Estate Planning Strategy",
    description: "Review and approve the proposed estate planning strategy for wealth transfer optimization.",
    priority: "high",
    dueDate: "2024-06-30",
    category: "Estate Planning",
    assignedBy: "Sarah Lee",
    assignedByAvatar: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=32&h=32&fit=crop&crop=face",
    completed: false,
    type: "approval",
    estimatedTime: "45 minutes",
    attachments: ["Estate_Strategy_Proposal.pdf", "Wealth_Transfer_Analysis.pdf"],
    detailedDescription: "Our comprehensive estate planning strategy has been developed based on your financial situation and goals. The strategy includes:\n\n• Trust structure recommendations\n• Beneficiary designations\n• Tax minimization strategies\n• Legacy planning elements\n\nPlease review and approve this strategy to proceed with implementation.",
    steps: [
      "Review strategy overview",
      "Examine trust recommendations",
      "Check beneficiary designations",
      "Review tax implications",
      "Approve or request changes"
    ],
    relatedProjects: ["Estate Planning", "Wealth Transfer"],
    comments: []
  },
  {
    id: 5,
    title: "Complete Risk Assessment Questionnaire",
    description: "Complete the updated risk assessment questionnaire to ensure investment alignment.",
    priority: "medium",
    dueDate: "2024-07-10",
    category: "Risk Assessment",
    assignedBy: "Michael Johnson",
    assignedByAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=32&h=32&fit=crop&crop=face",
    completed: true,
    type: "questionnaire",
    estimatedTime: "30 minutes",
    attachments: ["Risk_Assessment_Form.pdf"],
    detailedDescription: "The risk assessment questionnaire has been updated to better align with current market conditions and your investment goals. This assessment will help us:\n\n• Determine your risk tolerance\n• Align investments with your comfort level\n• Identify areas for portfolio adjustment\n• Ensure long-term strategy alignment",
    steps: [
      "Read questionnaire instructions",
      "Answer all questions honestly",
      "Review your responses",
      "Submit completed form",
      "Schedule follow-up discussion"
    ],
    relatedProjects: ["Portfolio Review", "Risk Management"],
    comments: []
  }
]

export default function ActionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const actionId = parseInt(params.id as string)
  
  const [completed, setCompleted] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [showCommentForm, setShowCommentForm] = useState(false)

  const actionItem = actionItems.find(item => item.id === actionId)

  if (!actionItem) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#063852] mb-4">Action Not Found</h1>
          <p className="text-gray-600 mb-4">The requested action item could not be found.</p>
          <Button onClick={() => router.push('/dashboard/actions')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Actions
          </Button>
        </div>
      </div>
    )
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return { bg: "#FEF2F2", text: "#DC2626", border: "#FECACA" }
      case "high":
        return { bg: "#FFFBEB", text: "#D97706", border: "#FED7AA" }
      case "medium":
        return { bg: "#EFF6FF", text: "#2563EB", border: "#BFDBFE" }
      case "low":
        return { bg: "#F0FDF4", text: "#059669", border: "#BBF7D0" }
      default:
        return { bg: "#F3F4F6", text: "#6B7280", border: "#D1D5DB" }
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "review":
        return <AlertCircle className="h-4 w-4" />
      case "signature":
        return <CheckCircle className="h-4 w-4" />
      case "documentation":
        return <Clock className="h-4 w-4" />
      case "approval":
        return <CheckCircle className="h-4 w-4" />
      case "questionnaire":
        return <Clock className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const handleComplete = () => {
    setCompleted(true)
    // In a real app, this would update the backend
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      // In a real app, this would add the comment to the backend
      setNewComment("")
      setShowCommentForm(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => router.push('/dashboard/actions')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Actions
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-[#063852]">{actionItem.title}</h1>
            <p className="text-gray-600">Action Item #{actionItem.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Action Details */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Action Details</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    style={{
                      backgroundColor: getPriorityColor(actionItem.priority).bg,
                      color: getPriorityColor(actionItem.priority).text,
                      borderColor: getPriorityColor(actionItem.priority).border
                    }}
                  >
                    {actionItem.priority}
                  </Badge>
                  <Badge variant="outline">{actionItem.category}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                {getTypeIcon(actionItem.type)}
                <span className="capitalize">{actionItem.type}</span>
              </div>
              
              <div>
                <h3 className="font-medium text-[#063852] mb-2">Description</h3>
                <p className="text-gray-700 whitespace-pre-line">{actionItem.detailedDescription}</p>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium text-[#063852] mb-3">Steps to Complete</h3>
                <div className="space-y-2">
                  {actionItem.steps.map((step, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </div>
                      <span className="text-gray-700">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comments */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Comments & Updates</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowCommentForm(!showCommentForm)}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Add Comment
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {showCommentForm && (
                <div className="space-y-3 p-4 border rounded-lg">
                  <Label htmlFor="comment">Add a comment</Label>
                  <Textarea
                    id="comment"
                    placeholder="Type your comment here..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleAddComment} size="sm">
                      <Send className="h-4 w-4 mr-2" />
                      Post Comment
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowCommentForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {actionItem.comments.length > 0 ? (
                <div className="space-y-4">
                  {actionItem.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={comment.avatar} alt={comment.author} />
                        <AvatarFallback className="text-xs">
                          {comment.author.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{comment.author}</span>
                          <span className="text-xs text-gray-500">
                            {new Date(comment.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p>No comments yet. Be the first to add one!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status & Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Status & Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Status:</span>
                <Badge variant={completed ? "default" : "secondary"}>
                  {completed ? "Completed" : "Pending"}
                </Badge>
              </div>

              {!completed && (
                <Button 
                  onClick={handleComplete} 
                  className="w-full"
                  disabled={completed}
                >
                  <CheckSquare className="h-4 w-4 mr-2" />
                  Mark as Complete
                </Button>
              )}

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">Due Date:</span>
                  <span className="font-medium">{new Date(actionItem.dueDate).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">Est. Time:</span>
                  <span className="font-medium">{actionItem.estimatedTime}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">Assigned by:</span>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-5 h-5">
                      <AvatarImage src={actionItem.assignedByAvatar} alt={actionItem.assignedBy} />
                      <AvatarFallback className="text-xs">
                        {actionItem.assignedBy.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{actionItem.assignedBy}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attachments */}
          <Card>
            <CardHeader>
              <CardTitle>Attachments</CardTitle>
            </CardHeader>
            <CardContent>
              {actionItem.attachments && actionItem.attachments.length > 0 ? (
                <div className="space-y-2">
                  {actionItem.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{attachment}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No attachments</p>
              )}
            </CardContent>
          </Card>

          {/* Related Projects */}
          <Card>
            <CardHeader>
              <CardTitle>Related Projects</CardTitle>
            </CardHeader>
            <CardContent>
              {actionItem.relatedProjects && actionItem.relatedProjects.length > 0 ? (
                <div className="space-y-2">
                  {actionItem.relatedProjects.map((project, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 border rounded-lg">
                      <Tag className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{project}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No related projects</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 