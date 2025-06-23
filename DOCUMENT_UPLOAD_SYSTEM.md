# Document Upload System

A comprehensive document upload system with AI-powered analysis, categorization, and secure storage capabilities.

## Features

### 📁 Document Categories & Types

The system supports 13 document categories organized into 3 main groups:

#### Personal Documents (6 types)
- **Personal ID** (Blue) - Driver's license, passport, SSN card
- **Personal Financial** (Green) - Bank statements, investment accounts, personal tax returns
- **Personal Insurance** (Purple) - Life, health, disability, auto insurance policies
- **Estate Planning** (Indigo) - Wills, trusts, power of attorney, healthcare directives
- **Personal Real Estate** (Orange) - Property deeds, mortgages, home insurance

#### Business Documents (5 types)
- **Business Financial** (Emerald) - Financial statements, cash flow, business tax returns
- **Business Legal** (Red) - Articles of incorporation, operating agreements, contracts
- **Business Valuation** (Yellow) - Appraisals, valuation reports, due diligence materials
- **Business Compliance** (Gray) - Licenses, permits, regulatory filings, audits
- **Exit Planning** (Pink) - LOIs, purchase agreements, banker materials

#### Advisory Documents (3 types)
- **Advisory Reports** (Cyan) - Progress reports, recommendations, strategy documents
- **Communications** (Violet) - Meeting notes, email summaries, advisor correspondence
- **Planning Documents** (Teal) - Financial plans, tax strategies, investment proposals

### 📤 Upload System Features

#### Upload Modal
- **Drag & Drop Zone**: Large visual area for file dropping with visual feedback
- **Browse Files Button**: Traditional file selection method
- **File Size Limit**: 25MB per file maximum
- **Multiple File Support**: Upload several documents simultaneously
- **Progress Indicators**: Real-time upload progress for each file

#### Document Categorization
- **Required Type Selection**: Must choose from 13 document categories
- **Optional Description**: Free text field for document details
- **Custom Tags**: Comma-separated tags for better organization
- **Privacy Levels**:
  - Private (only visible to client)
  - Shared with Advisor (visible to advisory team)
  - Shared with Team (visible to all team members)

#### Upload Process
- **File Validation**: Check file types and sizes
- **Auto-OCR Processing**: Make documents searchable
- **Virus Scanning**: Security validation
- **Folder Assignment**: Choose destination folder
- **Success Confirmation**: Upload completion notification

## Implementation

### Components

#### `DocumentUploadModal`
The main upload modal component with all upload functionality.

**Props:**
```typescript
interface DocumentUploadModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}
```

**Features:**
- Form validation using Zod schema
- Drag & drop file handling
- File type and size validation
- Progress tracking
- Error handling and display

#### `DocumentCategoryBadge`
Reusable component for displaying document categories with proper styling and icons.

**Props:**
```typescript
interface DocumentCategoryBadgeProps {
  category: string // Can be either category ID or name
  showIcon?: boolean
  className?: string
}
```

### Configuration

#### `lib/document-categories.ts`
Centralized configuration for document categories, privacy levels, and file validation.

**Exports:**
- `documentCategories`: Array of all document categories with metadata
- `privacyLevels`: Available privacy level options
- `fileTypes`: Supported file type configurations
- `validateFile()`: File validation function
- `getCategoryById()`, `getCategoryByName()`: Helper functions

### File Validation

The system validates files based on:

**Size Limits:**
- Maximum file size: 25MB per file

**Supported Formats:**
- PDF documents (.pdf)
- Word documents (.doc, .docx)
- Excel spreadsheets (.xls, .xlsx)
- Images (.jpg, .jpeg, .png)
- Text files (.txt)
- Archives (.zip, .rar)

**Validation Process:**
1. File size check
2. File type verification
3. Virus scanning (simulated)
4. OCR processing (simulated)

### Privacy Levels

Three privacy levels are available:

1. **Private** - Only visible to the client
2. **Shared with Advisor** - Visible to the advisory team
3. **Shared with Team** - Visible to all team members

## Usage

### Basic Implementation

```tsx
import { DocumentUploadModal } from "@/components/document-upload-modal"

function MyComponent() {
  const [uploadModalOpen, setUploadModalOpen] = useState(false)

  return (
    <div>
      <button onClick={() => setUploadModalOpen(true)}>
        Upload Documents
      </button>
      
      <DocumentUploadModal 
        open={uploadModalOpen} 
        onOpenChange={setUploadModalOpen} 
      />
    </div>
  )
}
```

### Using Category Badges

```tsx
import { DocumentCategoryBadge } from "@/components/ui/document-category-badge"

function DocumentCard({ document }) {
  return (
    <div>
      <h3>{document.name}</h3>
      <DocumentCategoryBadge category={document.category} />
    </div>
  )
}
```

### Custom Validation

```tsx
import { validateFile, MAX_FILE_SIZE } from "@/lib/document-categories"

function customFileHandler(file: File) {
  const validation = validateFile(file)
  
  if (!validation.isValid) {
    console.error('File validation failed:', validation.errors)
    return
  }
  
  // Process valid file
}
```

## Styling

The system uses Tailwind CSS with a consistent design system:

- **Colors**: Each category has a specific color scheme
- **Icons**: Lucide React icons for visual consistency
- **Spacing**: Consistent spacing using Tailwind's spacing scale
- **Typography**: Typography scale for readability

## Security Considerations

- File type validation prevents malicious uploads
- File size limits prevent abuse
- Privacy levels control document access
- Virus scanning (simulated) for security
- Secure file storage (implementation dependent)

## Future Enhancements

- **AI Document Analysis**: Automatic categorization and content extraction
- **Version Control**: Track document versions and changes
- **Collaborative Editing**: Real-time document collaboration
- **Advanced Search**: Full-text search across all documents
- **Document Templates**: Pre-defined templates for common document types
- **Integration**: Connect with external storage providers (Google Drive, Dropbox)
- **Audit Trail**: Track all document access and modifications

## Dependencies

- `react-hook-form`: Form handling and validation
- `@hookform/resolvers`: Zod schema validation
- `zod`: Schema validation
- `lucide-react`: Icons
- `@radix-ui/react-dialog`: Modal component
- `@radix-ui/react-select`: Select component
- `@radix-ui/react-progress`: Progress indicators

## File Structure

```
components/
├── document-upload-modal.tsx    # Main upload modal
├── documents-manager.tsx        # Document management interface
└── ui/
    └── document-category-badge.tsx  # Category display component

lib/
└── document-categories.ts       # Configuration and utilities
```

This document upload system provides a comprehensive solution for managing documents in a financial advisory context, with proper categorization, security, and user experience considerations. 