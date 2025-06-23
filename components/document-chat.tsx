"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, Sparkles, FileText, MessageSquare } from "lucide-react"

interface DocumentChatProps {
  documentId: string
  documentContent: string
}

interface Message {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
  type: 'text' | 'suggestion'
}

export function DocumentChat({ documentId, documentContent }: DocumentChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hello! I'm your AI assistant for this document. I can help you understand, analyze, and extract insights from "${documentId === '1' ? 'Government ID.pdf' : documentId === '2' ? 'Tax Return 2024.pdf' : 'Estate Planning Documents.pdf'}". What would you like to know?`,
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const suggestedQuestions = [
    "What are the key points in this document?",
    "Can you summarize the main sections?",
    "What are the important dates mentioned?",
    "Are there any action items I should be aware of?",
    "What are the financial figures mentioned?"
  ]

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue, documentContent)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      }
      setMessages(prev => [...prev, aiMessage])
      setIsLoading(false)
    }, 1500)
  }

  const generateAIResponse = (question: string, content: string): string => {
    const lowerQuestion = question.toLowerCase()
    
    if (lowerQuestion.includes('key points') || lowerQuestion.includes('main points')) {
      return "Based on this document, the key points include:\n\n• Document verification and compliance requirements\n• Important identification details and expiration dates\n• Legal and regulatory considerations\n• Required follow-up actions\n\nWould you like me to elaborate on any of these points?"
    }
    
    if (lowerQuestion.includes('summarize') || lowerQuestion.includes('summary')) {
      return "Here's a summary of the main sections:\n\n1. **Document Overview** - Basic information and purpose\n2. **Key Details** - Important dates, numbers, and requirements\n3. **Compliance Information** - Legal and regulatory requirements\n4. **Action Items** - Required follow-up tasks\n\nThis document appears to be well-organized and contains all necessary information for proper processing."
    }
    
    if (lowerQuestion.includes('date') || lowerQuestion.includes('when')) {
      return "Important dates mentioned in this document:\n\n• Document creation date\n• Expiration dates (if applicable)\n• Review deadlines\n• Renewal requirements\n\nI recommend setting reminders for any upcoming deadlines to ensure compliance."
    }
    
    if (lowerQuestion.includes('action') || lowerQuestion.includes('todo')) {
      return "Action items identified:\n\n✅ **Immediate Actions:**\n• Review document for accuracy\n• Verify all information is current\n\n⏰ **Follow-up Actions:**\n• Schedule renewal reminders\n• Update related systems\n• Notify relevant parties\n\nWould you like me to help you create tasks for any of these items?"
    }
    
    if (lowerQuestion.includes('financial') || lowerQuestion.includes('money') || lowerQuestion.includes('amount')) {
      return "Financial information found in this document:\n\n• Income figures and calculations\n• Tax amounts and deductions\n• Asset valuations\n• Investment details\n\nI can help you analyze these figures or create financial summaries if needed."
    }
    
    return "I understand you're asking about this document. Based on the content, I can help you with:\n\n• Document analysis and insights\n• Key information extraction\n• Compliance requirements\n• Action item identification\n\nCould you please be more specific about what you'd like to know?"
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          AI Document Assistant
          <Badge variant="secondary" className="ml-auto">
            <Sparkles className="h-3 w-3 mr-1" />
            AI Powered
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Chat Messages */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.sender === 'ai' && (
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
              
              {message.sender === 'user' && (
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-gray-100 text-gray-600">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-blue-100 text-blue-600">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestionClick(question)}
                  className="text-xs"
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask a question about this document..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            size="sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Document Info */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t">
          <FileText className="h-3 w-3" />
          <span>Analyzing document: {documentId}</span>
          <span>•</span>
          <span>{documentContent.length} characters</span>
        </div>
      </CardContent>
    </Card>
  )
} 