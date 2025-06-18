import React from "react"

interface DocumentInsightsProps {
  documentId: string
  documentContent: string
}

export function DocumentInsights({ documentId, documentContent }: DocumentInsightsProps) {
  return (
    <div className="p-4 border rounded bg-gray-50 text-gray-700 mt-4">
      <strong>DocumentInsights Placeholder</strong>
      <div className="text-xs mt-2">Document ID: {documentId}</div>
      <div className="text-xs mt-1">Content Preview: {documentContent.slice(0, 60)}...</div>
    </div>
  )
} 