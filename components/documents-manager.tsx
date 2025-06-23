"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
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
  Clock
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { DocumentUploadModal } from "@/components/document-upload-modal";
import { DocumentCategoryBadge } from "@/components/ui/document-category-badge";

export interface Document {
  id: string;
  name: string;
  uploadedAt: string;
  size: string;
  uploadedBy: string;
  uploadedByAvatar: string;
  status: string;
  lastAccessed: string;
  category: string;
  description: string;
  tags?: string[];
}

const documents: Document[] = [
  {
    id: "1",
    name: "Government ID.pdf",
    uploadedAt: "2025-01-15",
    size: "1.2 MB",
    uploadedBy: "John Smith",
    uploadedByAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    status: "Verified",
    lastAccessed: "2 hours ago",
    category: "Personal ID",
    description: "Driver's license and passport documents",
    tags: ["ID", "Passport"]
  },
  {
    id: "2",
    name: "Financial Statement Q4 2024.pdf",
    uploadedAt: "2025-01-10",
    size: "2.8 MB",
    uploadedBy: "Sarah Johnson",
    uploadedByAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    status: "Complete",
    lastAccessed: "1 day ago",
    category: "Financial Reports",
    description: "Quarterly financial statement and analysis",
    tags: ["Financial", "Q4", "2024"]
  },
  {
    id: "3",
    name: "Estate Planning Documents.zip",
    uploadedAt: "2025-01-08",
    size: "5.1 MB",
    uploadedBy: "Michael Chen",
    uploadedByAvatar: "https://randomuser.me/api/portraits/men/67.jpg",
    status: "Pending Review",
    lastAccessed: "3 days ago",
    category: "Estate Planning",
    description: "Will, trust documents, and beneficiary forms",
    tags: ["Estate", "Legal", "Trust"]
  },
  {
    id: "4",
    name: "Tax Returns 2024.pdf",
    uploadedAt: "2025-01-05",
    size: "3.4 MB",
    uploadedBy: "Emily Davis",
    uploadedByAvatar: "https://randomuser.me/api/portraits/women/23.jpg",
    status: "Verified",
    lastAccessed: "1 week ago",
    category: "Tax Documents",
    description: "Personal and business tax returns for 2024",
    tags: ["Tax", "2024", "Returns"]
  },
  {
    id: "5",
    name: "Investment Portfolio Summary.xlsx",
    uploadedAt: "2025-01-03",
    size: "1.7 MB",
    uploadedBy: "David Wilson",
    uploadedByAvatar: "https://randomuser.me/api/portraits/men/89.jpg",
    status: "Complete",
    lastAccessed: "2 days ago",
    category: "Investment Reports",
    description: "Current portfolio allocation and performance metrics",
    tags: ["Investment", "Portfolio", "Performance"]
  },
  {
    id: "6",
    name: "Insurance Policies.pdf",
    uploadedAt: "2024-12-28",
    size: "4.2 MB",
    uploadedBy: "Lisa Brown",
    uploadedByAvatar: "https://randomuser.me/api/portraits/women/56.jpg",
    status: "Verified",
    lastAccessed: "5 days ago",
    category: "Insurance",
    description: "Life, health, and property insurance policies",
    tags: ["Insurance", "Life", "Health", "Property"]
  },
  {
    id: "7",
    name: "Business License Application.pdf",
    uploadedAt: "2025-01-12",
    size: "2.1 MB",
    uploadedBy: "Robert Taylor",
    uploadedByAvatar: "https://randomuser.me/api/portraits/men/45.jpg",
    status: "Pending Review",
    lastAccessed: "1 day ago",
    category: "Business Legal",
    description: "Application for business license renewal",
    tags: ["Business", "License", "Application"]
  },
  {
    id: "8",
    name: "Property Deed Verification.pdf",
    uploadedAt: "2025-01-11",
    size: "3.8 MB",
    uploadedBy: "Jennifer Lee",
    uploadedByAvatar: "https://randomuser.me/api/portraits/women/78.jpg",
    status: "Pending Review",
    lastAccessed: "2 days ago",
    category: "Personal Real Estate",
    description: "Property deed and title verification documents",
    tags: ["Property", "Deed", "Title"]
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Verified":
      return <Badge className="bg-green-100 text-green-800 border-green-200">✓ Verified</Badge>;
    case "Pending Review":
      return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 flex items-center gap-1">
        <Clock className="h-3 w-3" />
        ⏳ Pending
      </Badge>;
    case "Complete":
      return <Badge className="bg-blue-100 text-blue-800 border-blue-200">✓ Complete</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getCategoryBadge = (category: string) => {
  return <DocumentCategoryBadge category={category} />;
};

export default function DocumentsManager() {
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState<'card' | 'table'>('card');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  // Filter documents based on search term
  const filteredDocuments = useMemo(() => {
    if (!searchTerm.trim()) return documents;
    
    const searchLower = searchTerm.toLowerCase();
    return documents.filter(doc => 
      doc.name.toLowerCase().includes(searchLower) ||
      doc.description.toLowerCase().includes(searchLower) ||
      doc.category.toLowerCase().includes(searchLower) ||
      doc.status.toLowerCase().includes(searchLower) ||
      doc.uploadedBy.toLowerCase().includes(searchLower) ||
      doc.tags?.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }, [searchTerm]);

  // Only show first 4 documents in card view
  const displayedDocuments = view === 'card' ? filteredDocuments.slice(0, 4) : filteredDocuments;

  const handleUploadDocument = () => {
    setUploadModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Unified Header Row (clean, consistent controls) */}
      <div className="flex flex-col gap-4 mb-4 w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
          {/* Left: Search */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: "#636466" }} />
              <Input
                placeholder="Search documents..."
                className="pl-10 w-full h-10 rounded-md text-sm font-medium border border-gray-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ background: "#fff" }}
              />
            </div>
            {searchTerm && (
              <div className="text-sm text-muted-foreground">
                {filteredDocuments.length} of {documents.length} documents
              </div>
            )}
          </div>
          {/* Right: View Toggle, Upload Button */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <ToggleGroup
              type="single"
              value={view}
              onValueChange={(val) => val && setView(val as 'card' | 'table')}
              className="rounded-md p-0 h-10 min-w-[84px] flex border-0 bg-white shadow-none"
              size="sm"
              variant="outline"
              aria-label="Switch documents view"
            >
              <ToggleGroupItem value="card" aria-label="Card view" className="h-10 px-3 rounded-md text-sm font-medium border-0 focus:bg-blue-50">
                <LayoutGrid className="h-4 w-4" />
                <span className="sr-only">Card</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="table" aria-label="Table view" className="h-10 px-3 rounded-md text-sm font-medium border-0 focus:bg-blue-50">
                <TableIcon className="h-4 w-4" />
                <span className="sr-only">Table</span>
              </ToggleGroupItem>
            </ToggleGroup>
            <Button 
              className="ml-2 h-10 px-4 text-sm font-medium text-white transition-colors" 
              style={{ backgroundColor: "#1E9ADF" }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#1A8BC7"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#1E9ADF"}
              onClick={handleUploadDocument}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </div>
        </div>
      </div>

      {/* Documents Content */}
      <Card style={{ backgroundColor: "#FFFFFF", borderColor: "#E6EBED" }}>
        <CardContent className="p-6">
          {view === 'card' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {displayedDocuments.map((doc) => (
                <Card
                  key={doc.id}
                  className="shadow-sm border hover:shadow-md transition-all duration-200 h-full flex flex-col"
                  style={{ backgroundColor: "#FFFFFF", borderColor: "#F1F3F4" }}
                >
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="flex flex-col space-y-1.5 p-0 min-h-0 flex-1">
                      {/* Header Section */}
                      <div className="flex items-start justify-between min-w-0">
                        {/* Left: Document Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 min-w-0">
                            <FileText className="h-5 w-5 text-blue-500 flex-shrink-0" />
                            <div className="truncate max-w-xs md:max-w-sm lg:max-w-md" title={doc.name}>
                              <Link href={`/dashboard/documents/${doc.id}`} className="hover:underline">
                                <h4 className="font-semibold tracking-tight text-base truncate" style={{ color: "#063852" }}>{doc.name}</h4>
                              </Link>
                            </div>
                            {getStatusBadge(doc.status)}
                          </div>
                        </div>
                        {/* Right: Actions */}
                        <div className="flex flex-col items-end gap-2 ml-4">
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8"><Share2 className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                          </div>
                        </div>
                      </div>
                      {/* Description */}
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2" style={{ color: "#636466", wordBreak: 'break-word' }}>
                        {doc.description}
                      </p>
                      {/* Category Badge (Type) */}
                      <div className="mt-2 flex items-center gap-2 flex-wrap">
                        {getCategoryBadge(doc.category)}
                        {doc.tags && doc.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {doc.tags.map((tag, idx) => (
                              <Badge key={idx} className="bg-blue-50 text-blue-700 border-blue-100 flex items-center gap-1"><Tag className="h-3 w-3" />{tag}</Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      {/* File Info */}
                      <div className="text-sm text-muted-foreground mt-2" style={{ color: "#636466" }}>
                        <div className="flex items-center justify-between">
                          <span>{doc.size}</span>
                          <span>{new Date(doc.uploadedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </div>
                      {/* Uploader and Last Accessed */}
                      <div className="p-0 pt-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={doc.uploadedByAvatar} alt={doc.uploadedBy} />
                              <AvatarFallback className="bg-muted text-gray-600 text-xs">
                                {doc.uploadedBy.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-muted-foreground truncate" style={{ color: "#636466" }}>{doc.uploadedBy}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1 text-muted-foreground" />
                            <span className="text-sm font-medium" style={{ color: "#063852" }}>{doc.lastAccessed}</span>
                          </div>
                        </div>
                      </div>
                      {/* Action Buttons (Download/View) */}
                      <div className="mt-4 pt-3 border-t">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Uploaded By</TableHead>
                    <TableHead>Last Accessed</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayedDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-blue-500" />
                          <Link href={`/dashboard/documents/${doc.id}`} className="hover:underline">
                            {doc.name}
                          </Link>
                        </div>
                        <div className="text-xs text-muted-foreground line-clamp-1">{doc.description}</div>
                      </TableCell>
                      <TableCell>{getCategoryBadge(doc.category)}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {doc.tags?.map((tag, idx) => (
                            <Badge key={idx} className="bg-blue-50 text-blue-700 border-blue-100 flex items-center gap-1"><Tag className="h-3 w-3" />{tag}</Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="w-5 h-5">
                            <AvatarImage src={doc.uploadedByAvatar} alt={doc.uploadedBy} />
                            <AvatarFallback className="bg-muted text-gray-600 text-xs">
                              {doc.uploadedBy.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground truncate">{doc.uploadedBy}</span>
                        </div>
                      </TableCell>
                      <TableCell>{doc.lastAccessed}</TableCell>
                      <TableCell>{getStatusBadge(doc.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8"><Share2 className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Document Upload Modal */}
      <DocumentUploadModal 
        open={uploadModalOpen} 
        onOpenChange={setUploadModalOpen} 
      />
    </div>
  );
} 