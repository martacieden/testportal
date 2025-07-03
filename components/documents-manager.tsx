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
  content?: string;
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
    tags: ["ID", "Passport"],
    content: "No content available."
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
    tags: ["Financial", "Q4", "2024"],
    content: "No content available."
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
    tags: ["Estate", "Legal", "Trust"],
    content: "No content available."
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
    tags: ["Tax", "2024", "Returns"],
    content: "No content available."
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
    tags: ["Investment", "Portfolio", "Performance"],
    content: "No content available."
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
    tags: ["Insurance", "Life", "Health", "Property"],
    content: "No content available."
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
    tags: ["Business", "License", "Application"],
    content: "No content available."
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
    tags: ["Property", "Deed", "Title"],
    content: "No content available."
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Verified":
      return <Badge variant="success">✓ Verified</Badge>;
    case "Pending Review":
      return <Badge variant="warning" className="flex items-center gap-1">
        <Clock className="h-3 w-3" />
        ⏳ Pending
      </Badge>;
    case "Complete":
      return <Badge variant="info">✓ Complete</Badge>;
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
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-text-primary mb-1 flex items-center gap-3">
            Documents & Vault
          </h1>
          <p className="text-text-secondary text-sm">Access and manage your important financial documents securely.</p>
        </div>
        <div className="flex-shrink-0 mt-2 sm:mt-0">
          <Button variant="brand" size="sm" onClick={handleUploadDocument}>
            <Upload className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <Input
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <ToggleGroup type="single" value={view} onValueChange={(value) => value && setView(value as 'card' | 'table')}>
          <ToggleGroupItem value="card" aria-label="Card view">
            <LayoutGrid className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="table" aria-label="Table view">
            <TableIcon className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Documents Display */}
      {view === 'card' ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {displayedDocuments.map((doc) => (
            <Link key={doc.id} href={`/dashboard/documents/${doc.id}`} className="group">
              <Card className="transition-all cursor-pointer group-hover:shadow-lg group-hover:scale-[1.02]">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-brand-primary" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-base text-text-primary truncate group-hover:underline transition-all">
                          {doc.name}
                        </h3>
                        <p className="text-xs text-text-secondary">{doc.size}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-xs text-text-secondary line-clamp-2">{doc.description}</p>
                  {doc.content ? (
                    <div className="text-xs text-text-primary bg-gray-50 rounded p-2 mt-2">{doc.content}</div>
                  ) : (
                    <div className="text-xs text-muted-foreground bg-gray-50 rounded p-2 mt-2">No content available.</div>
                  )}
                  <div className="flex items-center gap-2">
                    {getCategoryBadge(doc.category)}
                    {getStatusBadge(doc.status)}
                  </div>
                  <div className="flex items-center justify-between text-xs text-text-tertiary">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={doc.uploadedByAvatar} alt={doc.uploadedBy} />
                        <AvatarFallback className="text-xs">
                          {doc.uploadedBy.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-text-primary font-medium">{doc.uploadedBy}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(doc.uploadedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={e => { e.preventDefault(); window.open(`/dashboard/documents/${doc.id}`, '_self'); }}>
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Uploaded By</TableHead>
                <TableHead>Last Accessed</TableHead>
                <TableHead>Content</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-brand-primary" />
                      <div>
                        <Link href={`/dashboard/documents/${doc.id}`} className="font-medium text-text-primary hover:underline transition-colors">
                          {doc.name}
                        </Link>
                        <div className="text-sm text-text-secondary">{doc.size}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getCategoryBadge(doc.category)}</TableCell>
                  <TableCell>{getStatusBadge(doc.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={doc.uploadedByAvatar} alt={doc.uploadedBy} />
                        <AvatarFallback className="text-xs">
                          {doc.uploadedBy.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-text-primary font-medium">{doc.uploadedBy}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-text-secondary">{doc.lastAccessed}</TableCell>
                  <TableCell>
                    {doc.content ? (
                      <div className="text-xs text-text-primary bg-gray-50 rounded p-2">{doc.content}</div>
                    ) : (
                      <div className="text-xs text-muted-foreground bg-gray-50 rounded p-2">No content available.</div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Link href={`/dashboard/documents/${doc.id}`}> 
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Upload Modal */}
      <DocumentUploadModal open={uploadModalOpen} onOpenChange={setUploadModalOpen} />
    </div>
  );
} 