"use client"

import React, { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { 
  Search, 
  Upload, 
  FolderPlus, 
  LayoutGrid, 
  Table as TableIcon,
  FileText,
  Download,
  Eye,
  Share2,
  MoreHorizontal,
  Calendar,
  User,
  Tag,
  Clock,
  Filter,
  SortAsc,
  HardDrive,
  Users,
  UserCheck,
  Eye as EyeIcon,
  Folder,
  File,
  Image,
  Archive,
  Video,
  Music
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DocumentUploadModal } from "@/components/document-upload-modal"
import { DocumentCategoryBadge } from "@/components/ui/document-category-badge"

// Document types configuration
const documentTypes = {
  // Personal Documents
  'personal-identification': {
    label: 'Personal ID',
    color: 'blue',
    icon: User,
    description: 'Driver\'s license, passport, SSN card'
  },
  'personal-financial': {
    label: 'Personal Financial',
    color: 'green', 
    icon: FileText,
    description: 'Bank statements, investment accounts, personal tax returns'
  },
  'personal-insurance': {
    label: 'Personal Insurance',
    color: 'purple',
    icon: FileText,
    description: 'Life, health, disability, auto insurance policies'
  },
  'personal-estate': {
    label: 'Estate Planning',
    color: 'indigo',
    icon: FileText,
    description: 'Wills, trusts, power of attorney, healthcare directives'
  },
  'personal-real-estate': {
    label: 'Personal Real Estate',
    color: 'orange',
    icon: FileText,
    description: 'Property deeds, mortgages, home insurance'
  },

  // Business Documents  
  'business-financial': {
    label: 'Business Financial',
    color: 'emerald',
    icon: FileText,
    description: 'Financial statements, cash flow, business tax returns'
  },
  'business-legal': {
    label: 'Business Legal',
    color: 'red',
    icon: FileText,
    description: 'Articles of incorporation, operating agreements, contracts'
  },
  'business-valuation': {
    label: 'Business Valuation',
    color: 'yellow',
    icon: FileText,
    description: 'Appraisals, valuation reports, due diligence materials'
  },
  'business-compliance': {
    label: 'Business Compliance',
    color: 'gray',
    icon: FileText,
    description: 'Licenses, permits, regulatory filings, audits'
  },
  'business-exit': {
    label: 'Exit Planning',
    color: 'pink',
    icon: FileText,
    description: 'LOIs, purchase agreements, banker materials'
  },

  // Advisory Documents
  'advisory-reports': {
    label: 'Advisory Reports',
    color: 'cyan',
    icon: FileText,
    description: 'Progress reports, recommendations, strategy documents'
  },
  'advisory-communications': {
    label: 'Communications',
    color: 'violet',
    icon: FileText,
    description: 'Meeting notes, email summaries, advisor correspondence'
  },
  'advisory-planning': {
    label: 'Planning Documents',
    color: 'teal',
    icon: FileText,
    description: 'Financial plans, tax strategies, investment proposals'
  }
}

// Sample documents data
const sampleDocuments = [
  {
    id: 1,
    name: 'Business_Valuation_2025.pdf',
    type: 'business-valuation',
    size: '2.4 MB',
    uploadDate: '2025-06-20T10:30:00Z',
    lastModified: '2025-06-20T10:30:00Z',
    uploadedBy: 'Michael Thompson',
    sharedWith: ['David Chen', 'Sarah Johnson'],
    tags: ['Q2 2025', 'Exit Planning', 'Confidential'],
    description: 'Annual business valuation for exit planning purposes',
    status: 'processed',
    thumbnail: '/thumbnails/pdf-icon.png',
    downloadCount: 3,
    comments: 2
  },
  {
    id: 2,
    name: 'Personal_Tax_Return_2024.pdf',
    type: 'personal-financial',
    size: '1.8 MB',
    uploadDate: '2025-06-18T14:15:00Z',
    lastModified: '2025-06-18T14:15:00Z',
    uploadedBy: 'Michael Thompson',
    sharedWith: ['Sarah Johnson'],
    tags: ['Tax Year 2024', 'Personal'],
    description: 'Complete personal tax return for 2024',
    status: 'processed',
    thumbnail: '/thumbnails/pdf-icon.png',
    downloadCount: 1,
    comments: 0
  },
  {
    id: 3,
    name: 'Trust_Agreement_Draft.pdf',
    type: 'personal-estate',
    size: '956 KB',
    uploadDate: '2025-06-15T09:45:00Z',
    lastModified: '2025-06-22T16:20:00Z',
    uploadedBy: 'Michael Torres',
    sharedWith: ['Michael Thompson', 'Jennifer Thompson'],
    tags: ['Estate Planning', 'Draft', 'Review Required'],
    description: 'Draft revocable living trust agreement for review',
    status: 'processed',
    thumbnail: '/thumbnails/pdf-icon.png',
    downloadCount: 5,
    comments: 3
  },
  {
    id: 4,
    name: 'Insurance_Analysis_Report.pdf',
    type: 'personal-insurance',
    size: '1.2 MB',
    uploadDate: '2025-06-12T11:20:00Z',
    lastModified: '2025-06-12T11:20:00Z',
    uploadedBy: 'Sarah Johnson',
    sharedWith: ['Michael Thompson'],
    tags: ['Insurance Review', 'Life Insurance', 'Disability'],
    description: 'Comprehensive insurance coverage analysis and recommendations',
    status: 'processed',
    thumbnail: '/thumbnails/pdf-icon.png',
    downloadCount: 2,
    comments: 1
  },
  {
    id: 5,
    name: 'Investment_Portfolio_Summary.xlsx',
    type: 'advisory-reports',
    size: '3.1 MB',
    uploadDate: '2025-06-10T15:30:00Z',
    lastModified: '2025-06-10T15:30:00Z',
    uploadedBy: 'David Chen',
    sharedWith: ['Michael Thompson', 'Sarah Johnson'],
    tags: ['Q2 2025', 'Portfolio Review', 'Performance'],
    description: 'Quarterly investment portfolio performance and allocation analysis',
    status: 'processed',
    thumbnail: '/thumbnails/excel-icon.png',
    downloadCount: 4,
    comments: 2
  },
  {
    id: 6,
    name: 'Financial_Statements_2024.pdf',
    type: 'business-financial',
    size: '4.7 MB',
    uploadDate: '2025-06-08T13:45:00Z',
    lastModified: '2025-06-08T13:45:00Z',
    uploadedBy: 'Michael Thompson',
    sharedWith: ['David Chen', 'Sarah Johnson', 'James Mitchell'],
    tags: ['Annual Report', 'Financial Statements', 'Audited'],
    description: 'Complete audited financial statements for 2024 fiscal year',
    status: 'processed',
    thumbnail: '/thumbnails/pdf-icon.png',
    downloadCount: 6,
    comments: 4
  }
]

// Folder structure
const folderStructure = [
  {
    id: 1,
    name: 'Personal Documents',
    icon: User,
    color: 'blue',
    documentCount: 15,
    subfolders: [
      { id: 11, name: 'Tax Returns', documentCount: 5 },
      { id: 12, name: 'Estate Planning', documentCount: 7 },
      { id: 13, name: 'Insurance', documentCount: 3 }
    ]
  },
  {
    id: 2,
    name: 'Business Documents',
    icon: FileText,
    color: 'green',
    documentCount: 22,
    subfolders: [
      { id: 21, name: 'Financial Statements', documentCount: 8 },
      { id: 22, name: 'Legal Documents', documentCount: 6 },
      { id: 23, name: 'Exit Planning', documentCount: 8 }
    ]
  },
  {
    id: 3,
    name: 'Advisory Reports',
    icon: FileText,
    color: 'purple',
    documentCount: 12,
    subfolders: []
  }
]

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [view, setView] = useState<'list' | 'grid'>('list')
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [selectedType, setSelectedType] = useState('all')
  const [selectedDocuments, setSelectedDocuments] = useState<number[]>([])
  const [sortBy, setSortBy] = useState('uploadDate')

  // Filter documents based on search term and type
  const filteredDocuments = useMemo(() => {
    let filtered = sampleDocuments

    // Filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(doc => 
        doc.name.toLowerCase().includes(searchLower) ||
        doc.description.toLowerCase().includes(searchLower) ||
        doc.tags.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }

    // Filter by document type
    if (selectedType !== 'all') {
      filtered = filtered.filter(doc => doc.type === selectedType)
    }

    return filtered
  }, [searchTerm, selectedType])

  // Sort documents
  const sortedDocuments = useMemo(() => {
    return [...filteredDocuments].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'size':
          return parseFloat(a.size) - parseFloat(b.size)
        case 'uploadDate':
          return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
        case 'lastModified':
          return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
        default:
          return 0
      }
    })
  }, [filteredDocuments, sortBy])

  const handleUploadDocument = () => {
    setUploadModalOpen(true)
  }

  const handleDocumentSelect = (docId: number) => {
    setSelectedDocuments(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    )
  }

  const handleSelectAll = () => {
    if (selectedDocuments.length === sortedDocuments.length) {
      setSelectedDocuments([])
    } else {
      setSelectedDocuments(sortedDocuments.map(doc => doc.id))
    }
  }

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase()
    switch (extension) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-500" />
      case 'doc':
      case 'docx':
        return <FileText className="h-5 w-5 text-blue-500" />
      case 'xls':
      case 'xlsx':
        return <FileText className="h-5 w-5 text-green-500" />
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <Image className="h-5 w-5 text-purple-500" />
      case 'zip':
      case 'rar':
        return <Archive className="h-5 w-5 text-orange-500" />
      default:
        return <File className="h-5 w-5 text-gray-500" />
    }
  }

  const getDocumentTypeConfig = (type: string) => {
    return documentTypes[type as keyof typeof documentTypes] || {
      label: 'Unknown',
      color: 'gray',
      icon: FileText,
      description: 'Unknown document type'
    }
  }

  return (
    <div className="">
      <div className="bg-white rounded-xl shadow space-y-6 max-w-7xl mx-auto p-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Documents & Reports</h1>
              <p className="text-gray-600 mt-1">Manage and organize all your planning documents</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Storage: 18.2 GB of 50 GB used</p>
                <p className="text-xs text-gray-500">Last synced: 2 minutes ago</p>
              </div>
            </div>
          </div>

          {/* Quick Actions Bar */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <Button 
                onClick={handleUploadDocument}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
              <Button variant="outline">
                <FolderPlus className="h-4 w-4 mr-2" />
                Create Folder
              </Button>
              {selectedDocuments.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    {selectedDocuments.length} selected
                  </span>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search documents..."
                  className="pl-10 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Types</option>
                {Object.entries(documentTypes).map(([key, config]) => (
                  <option key={key} value={key}>{config.label}</option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="uploadDate">Date Added</option>
                <option value="name">Name</option>
                <option value="size">Size</option>
                <option value="lastModified">Last Modified</option>
              </select>

              {/* View Toggle */}
              <ToggleGroup
                type="single"
                value={view}
                onValueChange={(val) => val && setView(val as 'list' | 'grid')}
                className="border border-gray-300 rounded-md"
              >
                <ToggleGroupItem value="list" className="px-3 py-2">
                  <TableIcon className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="grid" className="px-3 py-2">
                  <LayoutGrid className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </div>

        {/* Documents Content */}
        <Card>
          <CardContent className="p-6">
            {view === 'list' ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <input
                          type="checkbox"
                          checked={selectedDocuments.length === sortedDocuments.length && sortedDocuments.length > 0}
                          onChange={handleSelectAll}
                          className="rounded border-gray-300"
                        />
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Uploaded By</TableHead>
                      <TableHead>Shared With</TableHead>
                      <TableHead>Date Added</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedDocuments.map((doc) => (
                      <TableRow key={doc.id} className="hover:bg-gray-50">
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={selectedDocuments.includes(doc.id)}
                            onChange={() => handleDocumentSelect(doc.id)}
                            className="rounded border-gray-300"
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {getFileIcon(doc.name)}
                            <div>
                              <p className="font-medium text-sm">{doc.name}</p>
                              <p className="text-xs text-gray-500">{doc.description}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <DocumentCategoryBadge category={getDocumentTypeConfig(doc.type).label} />
                        </TableCell>
                        <TableCell>{doc.size}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="text-xs">
                                {doc.uploadedBy.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{doc.uploadedBy}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {doc.sharedWith.slice(0, 2).map((person, index) => (
                              <Avatar key={index} className="w-6 h-6">
                                <AvatarFallback className="text-xs">
                                  {person.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                            {doc.sharedWith.length > 2 && (
                              <span className="text-xs text-gray-500">
                                +{doc.sharedWith.length - 2}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(doc.uploadDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8">
                              <Share2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedDocuments.map((doc) => (
                  <Card key={doc.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        {getFileIcon(doc.name)}
                        <input
                          type="checkbox"
                          checked={selectedDocuments.includes(doc.id)}
                          onChange={() => handleDocumentSelect(doc.id)}
                          className="rounded border-gray-300"
                        />
                      </div>
                      <h3 className="font-medium text-sm mb-2 line-clamp-2">{doc.name}</h3>
                      <p className="text-xs text-gray-500 mb-3 line-clamp-2">{doc.description}</p>
                      
                      <div className="space-y-2">
                        <DocumentCategoryBadge category={getDocumentTypeConfig(doc.type).label} />
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{doc.size}</span>
                          <span>{new Date(doc.uploadDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {doc.sharedWith.slice(0, 3).map((person, index) => (
                            <Avatar key={index} className="w-5 h-5">
                              <AvatarFallback className="text-xs">
                                {person.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {doc.sharedWith.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{doc.sharedWith.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Document Upload Modal */}
      <DocumentUploadModal 
        open={uploadModalOpen} 
        onOpenChange={setUploadModalOpen} 
      />
    </div>
  )
} 