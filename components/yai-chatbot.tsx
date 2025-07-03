"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageCircle, Send, Bot } from "lucide-react"

interface Message {
  id: number
  content: string
  isBot: boolean
  timestamp: string
}

const dailySuggestions = [
  "What can you do?",
  "Show me my recent activity",
  "How do I update my profile?",
  "Give me a tip for today",
]

const dailyTip = "Tip: You can ask Yai to summarize your week or suggest ways to optimize your workflow!"

export default function YaiChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content:
        "Hi, I'm Yai! I'm here to help you with your account, answer questions, and provide daily tips. You can ask me about your recent activity, how to use features, or get recommendations.",
      isBot: true,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const handleSendMessage = (msg?: string) => {
    const messageToSend = typeof msg === "string" ? msg : inputMessage
    if (!messageToSend.trim()) return

    const newMessage: Message = {
      id: messages.length + 1,
      content: messageToSend,
      isBot: false,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, newMessage])
    setInputMessage("")

    // Simulate Yai's response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        content: getYaiResponse(messageToSend),
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  const getYaiResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()
    if (message.includes("activity")) {
      return "Here's your recent activity: You uploaded a document yesterday, scheduled a meeting for Friday, and completed 2 tasks. Want a summary?"
    }
    if (message.includes("profile")) {
      return "To update your profile, go to Settings > Profile. You can change your name, email, and notification preferences. Need a direct link?"
    }
    if (message.includes("tip")) {
      return "Here's a tip: Set daily goals in your dashboard to stay on track! Would you like to set one now?"
    }
    if (message.includes("what can you do")) {
      return "I can help you with account questions, activity summaries, daily tips, and more. Try asking about your recent activity or how to use a feature!"
    }
    return "I'm here to help with anything related to your account, productivity, or daily tips. What would you like to know or do next?"
  }

  return (
    <Card className="w-full h-[500px] flex flex-col shadow-xl border-0">
      <CardHeader className="pb-3 bg-[#4FC3F7]">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback style={{ backgroundColor: '#0288D1', color: '#fff' }} className="text-xs">
              <Bot className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg text-white">Yai</CardTitle>
            <CardDescription className="text-xs text-blue-50">Your AI Assistant</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex flex-col h-[calc(100%-80px)]">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                <div
                  className={`flex items-start space-x-2 max-w-[80%] ${message.isBot ? "" : "flex-row-reverse space-x-reverse"}`}
                >
                  <Avatar className="h-6 w-6">
                    {message.isBot ? (
                      <AvatarFallback
                        style={{ backgroundColor: "#4FC3F7", color: "#FFFFFF" }}
                        className="text-xs"
                      >
                        <Bot className="h-3 w-3" />
                      </AvatarFallback>
                    ) : (
                      <AvatarFallback
                        style={{ backgroundColor: "#0288D1", color: "#FFFFFF" }}
                        className="text-xs"
                      >
                        You
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div
                    className={`px-3 py-2 rounded-lg text-sm ${message.isBot ? "text-gray-900" : "text-white"}`}
                    style={{
                      backgroundColor: message.isBot ? "#E3F2FD" : "#0288D1",
                    }}
                  >
                    <p>{message.content}</p>
                    <p className={`text-xs mt-1 ${message.isBot ? "text-gray-500" : "text-blue-100"}`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {/* Show daily tip and suggestions only if first message (welcome) is present */}
            {messages.length === 1 && (
              <>
                <div className="mt-4 mb-2 text-xs text-blue-700 font-medium bg-blue-50 rounded p-2">
                  {dailyTip}
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {dailySuggestions.map((suggestion, i) => (
                    <Button
                      key={i}
                      variant="brandOutline"
                      size="sm"
                      className="rounded-full"
                      onClick={() => handleSendMessage(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </>
            )}
          </div>
        </ScrollArea>
        <div className="p-4 border-t" style={{ borderColor: "#E3F2FD" }}>
          <div className="flex space-x-2">
            <Input
              placeholder="Type your question or pick a suggestion..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage()
                }
              }}
              className="flex-1"
              style={{ borderColor: "#E3F2FD" }}
            />
            <Button
              onClick={() => handleSendMessage()}
              size="sm"
              disabled={!inputMessage.trim()}
              style={{ backgroundColor: "#0288D1" }}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 