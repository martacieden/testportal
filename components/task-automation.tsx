import React from "react"

interface TaskAutomationProps {
  documentId: string
  documentName: string
  documentSummary: string
}

export function TaskAutomation({ documentId, documentName, documentSummary }: TaskAutomationProps) {
  return (
    <div className="p-4 border rounded bg-gray-50 text-gray-700 mt-4">
      <strong>TaskAutomation Placeholder</strong>
      <div className="text-xs mt-2">Document ID: {documentId}</div>
      <div className="text-xs mt-1">Name: {documentName}</div>
      <div className="text-xs mt-1">Summary: {documentSummary.slice(0, 60)}...</div>
    </div>
  )
} 