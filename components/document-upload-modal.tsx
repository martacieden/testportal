"use client"

import React, { useState, useRef, useCallback } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Upload,
  X,
  FileText,
  CheckCircle,
  AlertCircle,
  User,
  DollarSign,
  Shield,
  FileText as FileTextIcon,
  TrendingUp,
  Calculator,
  CheckSquare,
  ArrowUp,
  BarChart3,
  MessageSquare,
  Target,
  Home,
  Cloud,
  Eye,
  Users,
  UserCheck,
  Loader2,
} from "lucide-react"

// Document categories with icons and colors
const documentCategories = [
  // Personal Documents
  {
    id: "personal-id",
    name: "Personal ID",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: User,
    group: "Personal Documents",
    description: "Driver's license, passport, SSN card"
  },
  {
    id: "personal-financial",
    name: "Personal Financial",
    color: "bg-green-100 text-green-800 border-green-200",
    icon: DollarSign,
    group: "Personal Documents",
    description: "Bank statements, investment accounts, personal tax returns"
  },
  {
    id: "personal-insurance",
    name: "Personal Insurance",
    color: "bg-purple-100 text-purple-800 border-purple-200",
    icon: Shield,
    group: "Personal Documents",
    description: "Life, health, disability, auto insurance policies"
  },
  {
    id: "estate-planning",
    name: "Estate Planning",
    color: "bg-indigo-100 text-indigo-800 border-indigo-200",
    icon: FileTextIcon,
    group: "Personal Documents",
    description: "Wills, trusts, power of attorney, healthcare directives"
  },
  {
    id: "personal-real-estate",
    name: "Personal Real Estate",
    color: "bg-orange-100 text-orange-800 border-orange-200",
    icon: Home,
    group: "Personal Documents",
    description: "Property deeds, mortgages, home insurance"
  },
  // Business Documents
  {
    id: "business-financial",
    name: "Business Financial",
    color: "bg-emerald-100 text-emerald-800 border-emerald-200",
    icon: TrendingUp,
    group: "Business Documents",
    description: "Financial statements, cash flow, business tax returns"
  },
  {
    id: "business-legal",
    name: "Business Legal",
    color: "bg-red-100 text-red-800 border-red-200",
    icon: Shield,
    group: "Business Documents",
    description: "Articles of incorporation, operating agreements, contracts"
  },
  {
    id: "business-valuation",
    name: "Business Valuation",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: Calculator,
    group: "Business Documents",
    description: "Appraisals, valuation reports, due diligence materials"
  },
  {
    id: "business-compliance",
    name: "Business Compliance",
    color: "bg-gray-100 text-gray-800 border-gray-200",
    icon: CheckSquare,
    group: "Business Documents",
    description: "Licenses, permits, regulatory filings, audits"
  },
  {
    id: "exit-planning",
    name: "Exit Planning",
    color: "bg-pink-100 text-pink-800 border-pink-200",
    icon: ArrowUp,
    group: "Business Documents",
    description: "LOIs, purchase agreements, banker materials"
  },
  // Advisory Documents
  {
    id: "advisory-reports",
    name: "Advisory Reports",
    color: "bg-cyan-100 text-cyan-800 border-cyan-200",
    icon: BarChart3,
    group: "Advisory Documents",
    description: "Progress reports, recommendations, strategy documents"
  },
  {
    id: "communications",
    name: "Communications",
    color: "bg-violet-100 text-violet-800 border-violet-200",
    icon: MessageSquare,
    group: "Advisory Documents",
    description: "Meeting notes, email summaries, advisor correspondence"
  },
  {
    id: "planning-documents",
    name: "Planning Documents",
    color: "bg-teal-100 text-teal-800 border-teal-200",
    icon: Target,
    group: "Advisory Documents",
    description: "Financial plans, tax strategies, investment proposals"
  }
]

// Privacy levels
const privacyLevels = [
  {
    id: "private",
    name: "Private",
    description: "Only visible to client",
    icon: Eye,
    color: "bg-gray-100 text-gray-800"
  },
  {
    id: "shared-advisor",
    name: "Shared with Advisor",
    description: "Visible to advisory team",
    icon: UserCheck,
    color: "bg-blue-100 text-blue-800"
  },
  {
    id: "shared-team",
    name: "Shared with Team",
    description: "Visible to all team members",
    icon: Users,
    color: "bg-green-100 text-green-800"
  }
]

// File validation schema
const uploadSchema = z.object({
  category: z.string().min(1, "Please select a document category"),
  description: z.string().optional(),
  tags: z.string().optional(),
  privacyLevel: z.string().min(1, "Please select a privacy level"),
})

type UploadFormData = z.infer<typeof uploadSchema>

interface UploadedFile {
  id: string
  file: File
  name: string
  size: string
  type: string
  progress: number
  status: 'uploading' | 'success' | 'error'
  error?: string
}

interface DocumentUploadModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DocumentUploadModal({ open, onOpenChange }: DocumentUploadModalProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<UploadFormData>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      category: "",
      description: "",
      tags: "",
      privacyLevel: "",
    },
  })

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    addFiles(files)
  }, [])

  const addFiles = (files: File[]) => {
    const newFiles: UploadedFile[] = files.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      file,
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      type: file.name.split('.').pop()?.toLowerCase() || 'unknown',
      progress: 0,
      status: 'uploading' as const
    }))

    setUploadedFiles(prev => [...prev, ...newFiles])

    // Simulate upload progress
    newFiles.forEach((file, index) => {
      const interval = setInterval(() => {
        setUploadedFiles(prev => 
          prev.map(f => {
            if (f.id === file.id && f.progress < 100) {
              const newProgress = Math.min(f.progress + Math.random() * 20, 100)
              return {
                ...f,
                progress: newProgress,
                status: newProgress === 100 ? 'success' : 'uploading'
              }
            }
            return f
          })
        )
      }, 200)

      // Clear interval when upload is complete
      setTimeout(() => clearInterval(interval), 3000 + index * 500)
    })
  }

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    addFiles(files)
  }

  const onSubmit = async (data: UploadFormData) => {
    if (uploadedFiles.length === 0) {
      alert("Please select at least one file to upload")
      return
    }

    setIsUploading(true)
    
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsUploading(false)
    onOpenChange(false)
    
    // Reset form and files
    form.reset()
    setUploadedFiles([])
  }

  const getFileIcon = (fileType: string) => {
    const iconMap: Record<string, React.ComponentType<any>> = {
      pdf: FileText,
      doc: FileText,
      docx: FileText,
      xls: FileText,
      xlsx: FileText,
      jpg: FileText,
      jpeg: FileText,
      png: FileText,
    }
    
    const IconComponent = iconMap[fileType] || FileText
    return <IconComponent className="h-5 w-5" />
  }

  const groupedCategories = documentCategories.reduce((acc, category) => {
    if (!acc[category.group]) {
      acc[category.group] = []
    }
    acc[category.group].push(category)
    return acc
  }, {} as Record<string, typeof documentCategories>)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Upload Documents</DialogTitle>
          <DialogDescription>
            Upload your documents for secure storage and AI-powered analysis. 
            Maximum file size: 25MB per file.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Document Category Selection */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Document Category *</FormLabel>
                  <FormDescription>
                    Select the appropriate category for your documents
                  </FormDescription>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a document category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(groupedCategories).map(([group, categories]) => (
                        <div key={group}>
                          <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                            {group}
                          </div>
                          {categories.map((category) => {
                            const IconComponent = category.icon
                            return (
                              <SelectItem key={category.id} value={category.id}>
                                <div className="flex items-center gap-2">
                                  <IconComponent className="h-4 w-4" />
                                  <div>
                                    <div className="font-medium">{category.name}</div>
                                    <div className="text-xs text-muted-foreground">
                                      {category.description}
                                    </div>
                                  </div>
                                </div>
                              </SelectItem>
                            )
                          })}
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Privacy Level Selection */}
            <FormField
              control={form.control}
              name="privacyLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Privacy Level *</FormLabel>
                  <FormDescription>
                    Choose who can access these documents
                  </FormDescription>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {privacyLevels.map((level) => {
                      const IconComponent = level.icon
                      return (
                        <div
                          key={level.id}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            field.value === level.id
                              ? 'border-primary bg-primary/5'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => field.onChange(level.id)}
                        >
                          <div className="flex items-center gap-3">
                            <IconComponent className="h-5 w-5" />
                            <div>
                              <div className="font-medium">{level.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {level.description}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* File Upload Area */}
            <div className="space-y-4">
              <FormLabel className="text-base font-semibold">Upload Files *</FormLabel>
              
              {/* Drag & Drop Zone */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 transition-all ${
                  isDragOver
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center text-center">
                  <Cloud className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    {isDragOver ? 'Drop files here' : 'Drag and drop your files here'}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    or click to browse from your computer
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Browse Files
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileSelect}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                  />
                </div>
              </div>

              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium">Selected Files ({uploadedFiles.length})</h4>
                  {uploadedFiles.map((file) => (
                    <Card key={file.id} className="p-4">
                      <CardContent className="p-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {getFileIcon(file.type)}
                            <div>
                              <p className="font-medium text-sm">{file.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {file.size} • {file.type.toUpperCase()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {file.status === 'uploading' && (
                              <div className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span className="text-sm text-muted-foreground">
                                  {file.progress.toFixed(0)}%
                                </span>
                              </div>
                            )}
                            {file.status === 'success' && (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                            {file.status === 'error' && (
                              <AlertCircle className="h-4 w-4 text-red-500" />
                            )}
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(file.id)}
                              className="h-8 w-8 p-0"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        {file.status === 'uploading' && (
                          <Progress value={file.progress} className="mt-3" />
                        )}
                        {file.error && (
                          <p className="text-sm text-red-500 mt-2">{file.error}</p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Optional Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add a description for your documents..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter tags separated by commas..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Use tags to organize and find your documents easily
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isUploading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isUploading || uploadedFiles.length === 0}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Documents
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 