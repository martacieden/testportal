import { Button } from "@/components/ui/button"
import { Download, FileText } from "lucide-react"

const groupedDocuments = [
  {
    section: "Personal Documents",
    documents: [
      { name: "Government ID.pdf", uploadedAt: "2025-05-05", size: "1.2 MB" },
      { name: "Tax Return.pdf", uploadedAt: "2025-05-05", size: "3.4 MB" },
      { name: "Estate Planning Documents.pdf", uploadedAt: "2025-05-07", size: "2.8 MB" },
    ],
    action: <Button variant="outline" className="ml-auto">Open in Box</Button>,
  },
  {
    section: "Investment Documents",
    documents: [
      { name: "Investment Statement.pdf", uploadedAt: "2025-05-06", size: "2.2 MB" },
      { name: "Retirement Account Statements.pdf", uploadedAt: "2025-05-06", size: "1.9 MB" },
    ],
  },
  {
    section: "Property & Assets",
    documents: [
      { name: "Real Estate Documents.pdf", uploadedAt: "2025-05-07", size: "4.5 MB" },
      { name: "Business Ownership Documents.pdf", uploadedAt: "2025-05-07", size: "3.8 MB" },
    ],
  },
]

export default function DocumentsList() {
  return (
    <div className="space-y-10">
      {groupedDocuments.map((group, idx) => (
        <div key={group.section}>
          <div className="flex items-center mb-8">
            <h2 className="text-xl font-semibold text-primary mr-4">{group.section}</h2>
            {group.action}
          </div>
          <div className="divide-y divide-gray-100 bg-white rounded-lg">
            {group.documents.map((doc, i) => (
              <div key={doc.name} className="flex items-center py-4 px-2 hover:bg-gray-50">
                <FileText className="h-6 w-6 text-blue-400 mr-4 flex-shrink-0" aria-hidden="true" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-base text-gray-900 truncate">{doc.name}</div>
                  <div className="text-sm text-muted-foreground mt-0.5">
                    Uploaded: {new Date(doc.uploadedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })} &nbsp; {doc.size}
                  </div>
                </div>
                <Button variant="ghost" size="icon" aria-label="Download document">
                  <Download className="h-5 w-5" aria-hidden="true" />
                </Button>
              </div>
            ))}
          </div>
          {idx < groupedDocuments.length - 1 && <hr className="my-8 border-gray-200" />}
        </div>
      ))}
    </div>
  )
}
