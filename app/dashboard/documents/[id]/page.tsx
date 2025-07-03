"use client"
import { notFound } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { FileText, X, ExternalLink, MessageSquare, Tag, BarChart3, Zap, Edit, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { PDFViewer, PDFPreview } from "@/components/pdf-viewer"
import { DocumentChat } from "@/components/document-chat"
import { DocumentInsights } from "@/components/document-insights"
import { TaskAutomation } from "@/components/task-automation"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { sampleDocuments } from "@/lib/sample-documents"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"

interface DocumentPageProps {
  params: {
    id: string
  }
}

export default async function DocumentPage({ params }: DocumentPageProps) {
  const document = sampleDocuments.find(doc => doc.id === params.id)

  if (!document) {
    notFound()
  }

  const [signDialogOpen, setSignDialogOpen] = useState(false)
  const signatureHistory = [
    {
      time: "04:00 PM",
      name: "Esther Smith",
      initials: "ES",
      avatar: null,
      action: "Requested signature"
    },
    {
      time: null,
      name: "Aspen Schleifer",
      initials: "AS",
      avatar: null,
      action: "Edit"
    },
    {
      time: null,
      name: "Gretchen Baptista",
      initials: "GB",
      avatar: "/avatars/gb.jpg",
      action: "Review"
    },
    {
      time: null,
      name: "Jaxson Calzoni",
      initials: "JC",
      avatar: null,
      action: "Sign"
    }
  ]

  return (
    <DashboardLayout>
      <div className="w-full max-w-7xl mx-auto">
        <div className="pt-4 pb-4">
          <Link href="/dashboard/documents">
            <Button variant="ghost" className="pl-0 text-base flex items-center gap-2">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Documents
            </Button>
          </Link>
        </div>
        <div className="container mx-auto px-4 py-4">
          {/* Header: Title, badges, actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2 bg-white rounded-xl border p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold leading-tight">{document.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-flex items-center rounded-full border transition-colors px-2 py-0.5 text-xs font-normal bg-purple-100 text-purple-800 border-purple-200">{document.category}</span>
                  <span className="inline-flex items-center rounded-full border transition-colors px-2 py-0.5 text-xs font-normal bg-green-100 text-green-800 border-green-200">{document.status === 'Verified' ? '✓ Verified' : document.status}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              <Button variant="outline" size="sm">Share</Button>
              <Button variant="outline" size="sm">Download</Button>
              <Button size="sm" style={{ backgroundColor: "#1E9ADF", color: "#FFFFFF" }}>View</Button>
              <Button variant="outline" size="sm" className="border-green-600 text-green-700" onClick={() => setSignDialogOpen(true)}>Sign Document</Button>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <Tabs defaultValue="content" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 mb-6">
                      <TabsTrigger value="content">Content</TabsTrigger>
                      <TabsTrigger value="ai-chat">AI Chat</TabsTrigger>
                      <TabsTrigger value="insights">Insights</TabsTrigger>
                      <TabsTrigger value="automation">Automation</TabsTrigger>
                    </TabsList>
                    <TabsContent value="content">
                      <div className="flex justify-center items-center min-h-[80vh] bg-muted rounded-2xl">
                        <div className="bg-white rounded-2xl shadow-lg p-2 max-w-3xl w-full">
                          <PDFPreview url={'/sample-document.pdf'} />
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="ai-chat">
                      <DocumentChat documentId={document.id} documentContent={document.name} />
                    </TabsContent>
                    <TabsContent value="insights">
                      <DocumentInsights documentId={document.id} documentContent={document.name} />
                    </TabsContent>
                    <TabsContent value="automation">
                      <TaskAutomation documentId={document.id} documentName={document.name} documentSummary={document.description} />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-base font-semibold mb-4">Document Summary</h2>
                  <p className="text-slate-600 dark:text-slate-400">{document.description}</p>
                  <div className="space-y-2 mt-4">
                    <h4 className="text-sm font-medium">Tags</h4>
                    <div className="flex flex-wrap gap-1">
                      {document.tags && document.tags.map((tag, index) => (
                        <span key={index} className="inline-flex items-center rounded-full border px-2 py-0.5 font-normal transition-colors border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 text-xs">{tag}</span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-base font-semibold mb-4">Document Details</h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Uploaded</p>
                        <p className="font-medium">1/15/2025</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Size</p>
                        <p className="font-medium">1.2 MB</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">File Type</p>
                        <p className="font-medium">PDF</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Uploaded By</p>
                        <div className="flex items-center gap-2">
                          <span className="relative flex shrink-0 overflow-hidden rounded-full w-5 h-5">
                            <img className="aspect-square h-full w-full" alt="John Smith" src="https://randomuser.me/api/portraits/men/32.jpg" />
                          </span>
                          <span className="font-medium text-sm">John Smith</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Last Accessed</p>
                        <p className="font-medium">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-3">
                  <h2 className="text-base font-semibold mb-4">Quick Actions</h2>
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
            </div>
          </div>
        </div>
      </div>
      <Dialog open={signDialogOpen} onOpenChange={setSignDialogOpen}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle>Signature history</DialogTitle>
            <DialogDescription>{document.name}</DialogDescription>
          </DialogHeader>
          <div className="mt-4 mb-2">
            <div className="text-sm text-muted-foreground mb-2">Tuesday, Jul 23, 2024</div>
            {signatureHistory.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 mb-2">
                <div className="w-16 text-xs text-muted-foreground">{item.time || ""}</div>
                <Avatar className="w-8 h-8">
                  {item.avatar ? (
                    <AvatarImage src={item.avatar} alt={item.name} />
                  ) : (
                    <AvatarFallback>{item.initials}</AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <div className="font-medium text-sm">{item.name} <span className="text-xs text-muted-foreground">({item.action})</span></div>
                </div>
              </div>
            ))}
          </div>
          <DialogClose asChild>
            <Button variant="outline" className="mt-2 w-full">Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
} 