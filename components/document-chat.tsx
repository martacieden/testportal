import React from "react"

interface DocumentChatProps {
  documentId: string
  documentContent: string
}

export function DocumentChat({ documentId, documentContent }: DocumentChatProps) {
  return (
    <div className="p-4 border rounded bg-gray-50 text-gray-700">
      <strong>DocumentChat Placeholder</strong>
      <div className="text-xs mt-2">Document ID: {documentId}</div>
      <div className="text-xs mt-1">Content Preview: {documentContent.slice(0, 60)}...</div>
    </div>
  )
} 