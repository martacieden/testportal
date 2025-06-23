"use client"

export interface Document {
  id: string
  name: string
  uploadedAt: string
  size: string
  uploadedBy: string
  uploadedByAvatar: string
  status: string
  lastAccessed: string
  category: string
  description: string
  tags?: string[]
}

// Sample documents data for reuse
export const sampleDocuments: Document[] = [
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
  }
]

// This component is now deprecated - use DocumentsManager instead
export default function DocumentsList() {
  return null
}
