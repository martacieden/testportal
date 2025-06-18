'use client'
import { Upload, Cloud } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"

const cloudTabs = [
  {
    name: "Google Drive",
    icon: (
      <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M16.5 6L24 19L31.5 6H16.5Z" fill="#FFC100"/><path d="M6 42L16.5 24H31.5L42 42H6Z" fill="#1E9ADF"/><path d="M24 19L31.5 6H16.5L24 19Z" fill="#FFC100"/><path d="M24 19L16.5 6H31.5L24 19Z" fill="#FFC100"/><path d="M24 19L42 42H6L24 19Z" fill="#1E9ADF"/></svg>
    ),
    color: "bg-red-100 text-red-500"
  },
  {
    name: "Dropbox",
    icon: (
      <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 16L24 8L36 16L24 24L12 16Z" fill="#2563EB"/><path d="M12 32L24 24L36 32L24 40L12 32Z" fill="#2563EB"/></svg>
    ),
    color: "bg-blue-100 text-blue-500"
  },
  {
    name: "OneDrive",
    icon: (
      <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="24" cy="24" r="12" fill="#6366F1"/></svg>
    ),
    color: "bg-indigo-100 text-indigo-500"
  }
]

export default function UploadCloudBlock() {
  const [cloudTab, setCloudTab] = useState("Google Drive")
  const selectedTab = cloudTabs.find(tab => tab.name === cloudTab)

  return (
    <div className="flex flex-col space-y-8">
      <div className="mb-2">
        <h1 className="text-4xl font-bold text-primary">Documents</h1>
        <p className="text-lg text-secondary-foreground mt-2">Access and manage your project documents</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Upload Document Block */}
        <Card className="bg-background border-gray-100 rounded-lg">
          <CardContent className="flex flex-col items-center justify-center p-8 space-y-6">
            <div className="flex flex-col items-center w-full">
              <Upload className="h-8 w-8 text-primary mb-4" aria-hidden="true" />
              <h2 className="text-2xl font-bold mb-2 text-primary">Upload Document</h2>
              <p className="text-base text-secondary-foreground mb-4 text-center">
                Upload your documents for AI-powered analysis, summarization, and insights.
              </p>
              <div className="w-full border-2 border-dashed border-gray-100 rounded-lg p-6 flex flex-col items-center mb-4 bg-background">
                <span className="text-base text-muted-foreground mb-2">Drag and drop your file here, or click to browse</span>
                <Button variant="outline" className="text-base" aria-label="Browse files to upload">Browse Files</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cloud Storage Integration Block */}
        <Card className="bg-background border-gray-100 rounded-lg">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-2 text-primary">Cloud Storage Integration</h2>
            <p className="text-base text-secondary-foreground mb-6">
              Connect your cloud storage accounts to import documents automatically
            </p>
            <div role="tablist" aria-label="Cloud Storage Providers" className="flex space-x-2 mb-6">
              {cloudTabs.map((tab) => (
                <Button
                  key={tab.name}
                  role="tab"
                  aria-selected={cloudTab === tab.name}
                  aria-controls={`tabpanel-${tab.name}`}
                  variant={cloudTab === tab.name ? "default" : "outline"}
                  className={`flex-1 text-base font-medium px-4 py-2 rounded-md ${cloudTab === tab.name ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                  onClick={() => setCloudTab(tab.name)}
                >
                  {tab.name}
                </Button>
              ))}
            </div>
            <div className="flex items-center mb-4">
              <div className={`rounded-full p-3 mr-3 ${selectedTab?.color || "bg-gray-100 text-gray-500"}`}>
                {selectedTab?.icon || <Cloud className="h-6 w-6" aria-hidden="true" />}
              </div>
              <div>
                <div className="text-lg font-semibold text-primary">{cloudTab}</div>
                <div className="text-base text-secondary-foreground">Connect to access your {cloudTab} documents</div>
              </div>
            </div>
            <Button className="w-full text-base font-semibold" variant="default" aria-label={`Connect ${cloudTab}`}>Connect {cloudTab}</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 