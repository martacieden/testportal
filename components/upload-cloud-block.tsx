"use client"

import { Upload, Cloud, FileText, Image, FileSpreadsheet, FileVideo, FileAudio, X, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useState, useRef } from "react"
import { Badge } from "@/components/ui/badge"

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
  },
  {
    name: "Box",
    icon: (
      <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="8" y="8" width="32" height="32" rx="4" fill="#0061D5"/></svg>
    ),
    color: "bg-blue-100 text-blue-500"
  }
]

const documentCategories = [
  { name: "Identity", icon: "🆔", color: "bg-purple-100 text-purple-800" },
  { name: "Tax", icon: "📊", color: "bg-red-100 text-red-800" },
  { name: "Estate", icon: "🏛️", color: "bg-indigo-100 text-indigo-800" },
  { name: "Investment", icon: "📈", color: "bg-green-100 text-green-800" },
  { name: "Retirement", icon: "🏖️", color: "bg-orange-100 text-orange-800" },
  { name: "Property", icon: "🏠", color: "bg-teal-100 text-teal-800" },
  { name: "Business", icon: "💼", color: "bg-gray-100 text-gray-800" },
  { name: "Insurance", icon: "🛡️", color: "bg-pink-100 text-pink-800" },
  { name: "Planning", icon: "📋", color: "bg-cyan-100 text-cyan-800" },
  { name: "Legal", icon: "⚖️", color: "bg-yellow-100 text-yellow-800" },
  { name: "Medical", icon: "🏥", color: "bg-emerald-100 text-emerald-800" },
  { name: "Education", icon: "🎓", color: "bg-violet-100 text-violet-800" },
  { name: "Other", icon: "📁", color: "bg-slate-100 text-slate-800" }
]

const fileTypes = {
  pdf: { icon: FileText, color: "text-red-500" },
  doc: { icon: FileText, color: "text-blue-500" },
  docx: { icon: FileText, color: "text-blue-500" },
  xls: { icon: FileSpreadsheet, color: "text-green-500" },
  xlsx: { icon: FileSpreadsheet, color: "text-green-500" },
  jpg: { icon: Image, color: "text-purple-500" },
  jpeg: { icon: Image, color: "text-purple-500" },
  png: { icon: Image, color: "text-purple-500" },
  mp4: { icon: FileVideo, color: "text-orange-500" },
  mp3: { icon: FileAudio, color: "text-pink-500" }
}

export default function UploadCloudBlock() {
  const [cloudTab, setCloudTab] = useState("Google Drive")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<Array<{
    name: string
    size: string
    type: string
    category: string
    status: 'uploading' | 'success' | 'error'
  }>>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const selectedTab = cloudTabs.find(tab => tab.name === cloudTab)

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return
    
    const newFiles = Array.from(files).map(file => ({
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      type: file.name.split('.').pop()?.toLowerCase() || 'unknown',
      category: selectedCategory || 'Other',
      status: 'uploading' as const
    }))

    setUploadedFiles(prev => [...prev, ...newFiles])

    // Simulate upload process
    newFiles.forEach((_, index) => {
      setTimeout(() => {
        setUploadedFiles(prev => 
          prev.map((file, i) => 
            i === prev.length - newFiles.length + index 
              ? { ...file, status: 'success' as const }
              : file
          )
        )
      }, 1000 + index * 500)
    })
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    handleFileUpload(e.dataTransfer.files)
  }

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const getFileIcon = (fileType: string) => {
    const fileConfig = fileTypes[fileType as keyof typeof fileTypes]
    if (fileConfig) {
      const IconComponent = fileConfig.icon
      return <IconComponent className={`h-5 w-5 ${fileConfig.color}`} />
    }
    return <FileText className="h-5 w-5 text-gray-500" />
  }

  return (
    <div className="flex flex-col space-y-8">
      <div className="mb-2">
        <h1 className="text-4xl font-bold text-primary">Documents</h1>
        <p className="text-lg text-secondary-foreground mt-2">Access and manage your important documents</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Document Block */}
        <div className="lg:col-span-2">
          <Card className="bg-background border-gray-100 rounded-lg">
            <CardContent className="p-8">
              <div className="flex flex-col items-center w-full">
                <Upload className="h-8 w-8 text-primary mb-4" aria-hidden="true" />
                <h2 className="text-2xl font-bold mb-2 text-primary">Upload Documents</h2>
                <p className="text-base text-secondary-foreground mb-6 text-center">
                  Upload your documents for AI-powered analysis, summarization, and insights.
                </p>

                {/* Category Selection */}
                <div className="w-full mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Document Category</label>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                    {documentCategories.map((category) => (
                      <button
                        key={category.name}
                        onClick={() => setSelectedCategory(category.name)}
                        className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                          selectedCategory === category.name
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>{category.icon}</span>
                          <span>{category.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Upload Area */}
                <div 
                  className={`w-full border-2 border-dashed rounded-lg p-8 flex flex-col items-center mb-6 transition-all ${
                    isDragOver 
                      ? 'border-primary bg-primary/5' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Cloud className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    {isDragOver ? 'Drop files here' : 'Drag and drop your files here'}
                  </p>
                  <p className="text-sm text-gray-500 mb-4 text-center">
                    or click to browse from your computer
                  </p>
                  <Button 
                    variant="outline" 
                    className="text-base"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Browse Files
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFileUpload(e.target.files)}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.mp4,.mp3"
                  />
                </div>

                {/* Uploaded Files List */}
                {uploadedFiles.length > 0 && (
                  <div className="w-full">
                    <h3 className="text-lg font-semibold mb-4">Uploaded Files</h3>
                    <div className="space-y-3">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            {getFileIcon(file.type)}
                            <div>
                              <p className="font-medium text-sm">{file.name}</p>
                              <p className="text-xs text-gray-500">{file.size} • {file.category}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {file.status === 'uploading' && (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                            )}
                            {file.status === 'success' && (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                              className="h-8 w-8 p-0"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cloud Storage Integration Block */}
        <div>
          <Card className="bg-background border-gray-100 rounded-lg h-fit">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-3 text-primary">Cloud Storage</h2>
              <p className="text-sm text-secondary-foreground mb-4">
                Connect your cloud storage accounts to import documents automatically
              </p>
              
              <div className="space-y-3 mb-6">
                {cloudTabs.map((tab) => (
                  <button
                    key={tab.name}
                    onClick={() => setCloudTab(tab.name)}
                    className={`w-full p-3 rounded-lg border text-left transition-all ${
                      cloudTab === tab.name
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`rounded-full p-2 ${tab.color}`}>
                        {tab.icon}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{tab.name}</div>
                        <div className="text-xs text-gray-500">Connect to import files</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`rounded-full p-2 ${selectedTab?.color || "bg-gray-100 text-gray-500"}`}>
                    {selectedTab?.icon || <Cloud className="h-4 w-4" />}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{cloudTab}</div>
                    <div className="text-xs text-gray-500">Connected</div>
                  </div>
                </div>
                
                <Button className="w-full" variant="outline">
                  Disconnect {cloudTab}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Storage Usage */}
          <Card className="bg-background border-gray-100 rounded-lg mt-4">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Storage Usage</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Used</span>
                    <span>2.4 GB / 10 GB</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '24%' }}></div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  <div className="flex justify-between">
                    <span>Documents</span>
                    <span>1.8 GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Images</span>
                    <span>0.6 GB</span>
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