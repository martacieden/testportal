import {
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
} from "lucide-react"

// Document categories with icons and colors
export const documentCategories = [
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
export const privacyLevels = [
  {
    id: "private",
    name: "Private",
    description: "Only visible to client",
    icon: "Eye",
    color: "bg-gray-100 text-gray-800"
  },
  {
    id: "shared-advisor",
    name: "Shared with Advisor",
    description: "Visible to advisory team",
    icon: "UserCheck",
    color: "bg-blue-100 text-blue-800"
  },
  {
    id: "shared-team",
    name: "Shared with Team",
    description: "Visible to all team members",
    icon: "Users",
    color: "bg-green-100 text-green-800"
  }
]

// Helper functions
export const getCategoryById = (id: string) => {
  return documentCategories.find(category => category.id === id)
}

export const getCategoryByName = (name: string) => {
  return documentCategories.find(category => category.name === name)
}

export const getCategoriesByGroup = (group: string) => {
  return documentCategories.filter(category => category.group === group)
}

export const getGroupedCategories = () => {
  return documentCategories.reduce((acc, category) => {
    if (!acc[category.group]) {
      acc[category.group] = []
    }
    acc[category.group].push(category)
    return acc
  }, {} as Record<string, typeof documentCategories>)
}

export const getPrivacyLevelById = (id: string) => {
  return privacyLevels.find(level => level.id === id)
}

// File type configurations
export const fileTypes = {
  pdf: { icon: "FileText", color: "text-red-500", label: "PDF Document" },
  doc: { icon: "FileText", color: "text-blue-500", label: "Word Document" },
  docx: { icon: "FileText", color: "text-blue-500", label: "Word Document" },
  xls: { icon: "FileText", color: "text-green-500", label: "Excel Spreadsheet" },
  xlsx: { icon: "FileText", color: "text-green-500", label: "Excel Spreadsheet" },
  jpg: { icon: "FileText", color: "text-purple-500", label: "JPEG Image" },
  jpeg: { icon: "FileText", color: "text-purple-500", label: "JPEG Image" },
  png: { icon: "FileText", color: "text-purple-500", label: "PNG Image" },
  txt: { icon: "FileText", color: "text-gray-500", label: "Text File" },
  zip: { icon: "FileText", color: "text-orange-500", label: "ZIP Archive" },
  rar: { icon: "FileText", color: "text-orange-500", label: "RAR Archive" }
}

export const getFileTypeConfig = (fileType: string) => {
  return fileTypes[fileType as keyof typeof fileTypes] || {
    icon: "FileText",
    color: "text-gray-500",
    label: "Unknown File Type"
  }
}

// Upload validation
export const MAX_FILE_SIZE = 25 * 1024 * 1024 // 25MB
export const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'image/jpeg',
  'image/png',
  'text/plain',
  'application/zip',
  'application/x-rar-compressed'
]

export const validateFile = (file: File) => {
  const errors: string[] = []

  if (file.size > MAX_FILE_SIZE) {
    errors.push(`File size exceeds 25MB limit (${(file.size / 1024 / 1024).toFixed(1)}MB)`)
  }

  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    errors.push(`File type "${file.type}" is not supported`)
  }

  return {
    isValid: errors.length === 0,
    errors
  }
} 