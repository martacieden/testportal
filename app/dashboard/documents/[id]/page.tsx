import { notFound } from "next/navigation"
import { FileText, Calendar, HardDrive, ArrowLeft, Search, Edit, Clock, Download, Share2, Eye, Tag, User, MessageSquare, BarChart3, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { DocumentChat } from "@/components/document-chat"
import { DocumentInsights } from "@/components/document-insights"
import { TaskAutomation } from "@/components/task-automation"
// If these components exist, import them; otherwise, comment out or remove
// import { DocumentChat } from "@/components/document-chat"
// import { DocumentInsights } from "@/components/document-insights"
// import { TaskAutomation } from "@/components/task-automation"

interface DocumentPageProps {
  params: {
    id: string
  }
}

export default async function DocumentPage({ params }: DocumentPageProps) {
  // In a real app, you would fetch the document from your database
  // For this demo, we'll use mock data based on the ID

  const documentData = {
    "1": {
      id: "1",
      name: "Government ID.pdf",
      url: "/placeholder.svg?height=800&width=600",
      uploadedAt: "2025-01-15T10:30:00Z",
      summary: "Driver's license and passport documents for identity verification. These documents are required for account setup and compliance purposes.",
      fileType: "pdf",
      size: "1.2 MB",
      category: "Identity",
      status: "Verified",
      uploadedBy: "John Smith",
      uploadedByAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      lastAccessed: "2 hours ago",
      tags: ["Identity", "Compliance", "Required"],
      content: `
      # Government ID Documents
      
      ## Driver's License
      - **State**: California
      - **License Number**: A1234567
      - **Expiration Date**: 12/31/2028
      - **Class**: C (Standard)
      
      ## Passport
      - **Country**: United States
      - **Passport Number**: 123456789
      - **Expiration Date**: 06/15/2030
      - **Type**: Regular
      
      ## Verification Status
      - ✅ Identity verified
      - ✅ Documents authenticated
      - ✅ Compliance requirements met
      
      ## Notes
      These documents are used for account verification and compliance with financial regulations.
      `,
    },
    "2": {
      id: "2",
      name: "Tax Return 2024.pdf",
      url: "/placeholder.svg?height=800&width=600",
      uploadedAt: "2025-01-10T14:20:00Z",
      summary: "Complete tax return for 2024 fiscal year including all schedules, deductions, and supporting documentation.",
      fileType: "pdf",
      size: "3.4 MB",
      category: "Tax",
      status: "Pending Review",
      uploadedBy: "Sarah Chen",
      uploadedByAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
      lastAccessed: "1 day ago",
      tags: ["Tax", "2024", "Review Required"],
      content: `
      # Tax Return 2024
      
      ## Personal Information
      - **Filing Status**: Married Filing Jointly
      - **Tax Year**: 2024
      - **Filing Date**: April 15, 2024
      
      ## Income Summary
      - **Wages and Salaries**: $125,000
      - **Interest Income**: $2,500
      - **Dividend Income**: $1,800
      - **Capital Gains**: $5,200
      - **Total Income**: $134,500
      
      ## Deductions
      - **Standard Deduction**: $27,700
      - **Itemized Deductions**: $0
      - **Adjusted Gross Income**: $106,800
      
      ## Tax Calculation
      - **Federal Tax**: $18,450
      - **State Tax**: $6,200
      - **Total Tax**: $24,650
      
      ## Refund/Amount Due
      - **Taxes Withheld**: $26,000
      - **Refund**: $1,350
      
      ## Supporting Documents
      - W-2 Forms
      - 1099-INT
      - 1099-DIV
      - Schedule D (Capital Gains)
      `,
    },
    "3": {
      id: "3",
      name: "Estate Planning Documents.pdf",
      url: "/placeholder.svg?height=800&width=600",
      uploadedAt: "2025-01-08T09:15:00Z",
      summary: "Comprehensive estate planning documents including will, trust, and power of attorney documents for wealth transfer and asset protection.",
      fileType: "pdf",
      size: "2.8 MB",
      category: "Estate",
      status: "Complete",
      uploadedBy: "Alex Rodriguez",
      uploadedByAvatar: "https://randomuser.me/api/portraits/men/65.jpg",
      lastAccessed: "3 days ago",
      tags: ["Estate", "Legal", "Complete"],
      content: `
      # Estate Planning Documents
      
      ## Last Will and Testament
      - **Date**: January 8, 2025
      - **Attorney**: Smith & Associates
      - **Witnesses**: 2 required witnesses
      
      ### Beneficiaries
      - **Primary**: Spouse (100% of estate)
      - **Secondary**: Children (equal shares)
      - **Charitable**: Local Hospital Foundation (10%)
      
      ## Revocable Living Trust
      - **Trust Name**: Smith Family Trust
      - **Trustee**: Self (Grantor)
      - **Successor Trustee**: Spouse
      
      ### Trust Assets
      - Primary Residence
      - Investment Accounts
      - Business Interests
      
      ## Power of Attorney
      - **Financial POA**: Spouse
      - **Healthcare POA**: Spouse
      - **Alternate**: Adult Child
      
      ## Healthcare Directives
      - **Living Will**: DNR preferences
      - **HIPAA Authorization**: Medical information access
      
      ## Asset Inventory
      - Real Estate: $850,000
      - Investments: $1,200,000
      - Business: $500,000
      - Personal Property: $150,000
      - Total Estate: $2,700,000
      `,
    }
  }

  const document = documentData[params.id as keyof typeof documentData]

  if (!document) {
    notFound()
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Verified":
        return <Badge className="bg-green-100 text-green-800 border-green-200">✓ Verified</Badge>
      case "Pending Review":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">⏳ Pending Review</Badge>
      case "Complete":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">✓ Complete</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getCategoryBadge = (category: string) => {
    const colors = {
      Identity: "bg-purple-100 text-purple-800 border-purple-200",
      Tax: "bg-red-100 text-red-800 border-red-200",
      Estate: "bg-indigo-100 text-indigo-800 border-indigo-200",
      Investment: "bg-green-100 text-green-800 border-green-200",
      Retirement: "bg-orange-100 text-orange-800 border-orange-200",
      Property: "bg-teal-100 text-teal-800 border-teal-200",
      Business: "bg-gray-100 text-gray-800 border-gray-200",
      Insurance: "bg-pink-100 text-pink-800 border-pink-200",
      Planning: "bg-cyan-100 text-cyan-800 border-cyan-200"
    }
    return <Badge className={colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200"}>{category}</Badge>
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <Link href="/dashboard/documents">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Documents
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <div>
                    <h1 className="text-2xl font-bold">{document.name}</h1>
                    <div className="flex items-center gap-2 mt-1">
                      {getCategoryBadge(document.category)}
                      {getStatusBadge(document.status)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button size="sm" style={{ backgroundColor: "#1E9ADF", color: "#FFFFFF" }}>
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="content" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="chat">AI Chat</TabsTrigger>
                  <TabsTrigger value="insights">Insights</TabsTrigger>
                  <TabsTrigger value="automation">Automation</TabsTrigger>
                </TabsList>
                
                <TabsContent value="content" className="mt-6">
                  <div className="prose dark:prose-invert max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: document.content.replace(/\n/g, "<br />") }} />
                  </div>
                </TabsContent>
                
                <TabsContent value="chat" className="mt-6">
                  <DocumentChat documentId={document.id} documentContent={document.content} />
                </TabsContent>
                
                <TabsContent value="insights" className="mt-6">
                  <DocumentInsights documentId={document.id} documentContent={document.content} />
                </TabsContent>
                
                <TabsContent value="automation" className="mt-6">
                  <TaskAutomation documentId={document.id} documentName={document.name} documentSummary={document.summary} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Document Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Document Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{document.summary}</p>
              
              {/* Tags */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Tags</h4>
                <div className="flex flex-wrap gap-1">
                  {document.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Document Details */}
          <Card>
            <CardHeader>
              <CardTitle>Document Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Uploaded</p>
                  <p className="font-medium">{new Date(document.uploadedAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <HardDrive className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Size</p>
                  <p className="font-medium">{document.size}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">File Type</p>
                  <p className="font-medium">{document.fileType.toUpperCase()}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Uploaded By</p>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-5 h-5">
                      <AvatarImage src={document.uploadedByAvatar} alt={document.uploadedBy} />
                      <AvatarFallback className="text-xs">
                        {document.uploadedBy.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm">{document.uploadedBy}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Last Accessed</p>
                  <p className="font-medium">{document.lastAccessed}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Edit className="mr-2 h-4 w-4" />
                Suggest Edits
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                Add Comment
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Tag className="mr-2 h-4 w-4" />
                Add Tags
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Zap className="mr-2 h-4 w-4" />
                Create Task
              </Button>
            </CardContent>
          </Card>

          {/* Related Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Related Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <FileText className="h-4 w-4 text-blue-500" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">Related Document 1.pdf</p>
                    <p className="text-xs text-muted-foreground">2.1 MB • 3 days ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <FileText className="h-4 w-4 text-blue-500" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">Related Document 2.pdf</p>
                    <p className="text-xs text-muted-foreground">1.8 MB • 1 week ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 