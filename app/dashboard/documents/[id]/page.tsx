import { notFound } from "next/navigation"
import { FileText, Calendar, HardDrive, ArrowLeft, Search, Edit, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
  // For this demo, we'll use mock data

  const document = {
    id: params.id,
    name: "Business Proposal.pdf",
    url: "/placeholder.svg?height=800&width=600",
    uploadedAt: new Date().toISOString(),
    summary:
      "This business proposal outlines a new marketing strategy for Q3 2025, focusing on digital channels and AI-powered customer segmentation. The proposal includes budget allocations, timeline, and expected ROI calculations. Key initiatives include social media campaigns, influencer partnerships, and content marketing strategies.",
    fileType: "pdf",
    size: "2.4 MB",
    content: `
    # Business Proposal: Q3 2025 Marketing Strategy
    
    ## Executive Summary
    
    This proposal outlines our marketing strategy for Q3 2025, with a focus on leveraging digital channels and AI-powered customer segmentation to drive growth.
    
    ## Objectives
    
    1. Increase customer acquisition by 20%
    2. Improve customer retention by 15%
    3. Boost overall revenue by 25%
    
    ## Budget Allocation
    
    - Digital Advertising: $50,000
    - Content Marketing: $30,000
    - Influencer Partnerships: $25,000
    - Analytics and Tools: $15,000
    
    ## Timeline
    
    - July: Campaign planning and preparation
    - August: Launch main campaign initiatives
    - September: Analyze results and optimize
    
    ## Expected ROI
    
    We project a 3.5x return on marketing investment based on historical performance and market analysis.
  `,
  }

  if (!document) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/dashboard/documents">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Documents
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <FileText className="h-6 w-6 text-blue-600 dark:text-blue-500 mr-2" />
                  <h1 className="text-2xl font-bold">{document.name}</h1>
                </div>
                <Button>Download</Button>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: document.content.replace(/\n/g, "<br />") }} />
              </div>
            </CardContent>
          </Card>

          <div className="mt-8">
            <DocumentChat documentId={document.id} documentContent={document.content} />
          </div>
        </div>

        <div>
          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Document Summary</h2>
              <p className="text-slate-600 dark:text-slate-400">{document.summary}</p>
            </CardContent>
          </Card>

          <DocumentInsights documentId={document.id} documentContent={document.content} />

          <div className="mt-6">
            <TaskAutomation documentId={document.id} documentName={document.name} documentSummary={document.summary} />
          </div>

          <Card className="mt-6">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Document Details</h2>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-slate-500 dark:text-slate-400 mr-2" />
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Uploaded</p>
                    <p className="font-medium">{new Date(document.uploadedAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-slate-500 dark:text-slate-400 mr-2" />
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">File Type</p>
                    <p className="font-medium">{document.fileType.toUpperCase()}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <HardDrive className="h-5 w-5 text-slate-500 dark:text-slate-400 mr-2" />
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Size</p>
                    <p className="font-medium">{document.size}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-medium mb-2">Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Search className="mr-2 h-4 w-4" />
                    Ask Questions
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Edit className="mr-2 h-4 w-4" />
                    Suggest Edits
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Clock className="mr-2 h-4 w-4" />
                    Set Reminder
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 