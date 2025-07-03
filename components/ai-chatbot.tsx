"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageCircle, Send, X, Bot } from "lucide-react"

interface Message {
  id: number
  content: string
  isBot: boolean
  timestamp: string
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content:
        "Hello! I'm your AI assistant. I can help answer questions about your financial planning, projects, and more. How can I assist you today?",
      isBot: true,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")

  // Suggestions for first-time users
  const suggestions = [
    "Show me my portfolio summary",
    "Who is on my financial team?",
    "What documents do I need to upload?",
    "Upcoming meetings",
  ]

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

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        content: getBotResponse(messageToSend),
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("project") || message.includes("timeline")) {
      return "I can see you have several active projects including Estate Planning and Tax Optimization. Your Estate Planning project is marked as High Priority and is 60% complete. Would you like me to provide more details about any specific project?"
    }

    if (message.includes("team") || message.includes("advisor")) {
      return "Your financial team includes Michael Chen (Senior Advisor), Jennifer Liu (Portfolio Manager), and David Rodriguez (Estate Planning Specialist). Would you like me to help you schedule a call with any of them?"
    }

    if (message.includes("portfolio") || message.includes("investment")) {
      return "Your current portfolio value is $2.4M with a +5.2% growth this quarter. Your Investment Review project is currently in the planning phase. Would you like me to provide more details about your portfolio performance?"
    }

    if (message.includes("document") || message.includes("file")) {
      return "You have several documents in your vault including estate planning documents, tax reports, and investment statements. I can help you find specific documents or assist with uploading new ones. What are you looking for?"
    }

    return "I understand you're asking about your financial planning. I can help with information about your projects, team members, portfolio, documents, or schedule calls. Could you be more specific about what you'd like to know?"
  }

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px]">
          <Card className="h-full shadow-xl border-0" style={{ backgroundColor: "#FFFFFF" }}>
            <CardHeader className="pb-3" style={{ backgroundColor: "#1E9ADF" }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#FFFFFF" }}
                  >
                    <Bot className="h-4 w-4" style={{ color: "#1E9ADF" }} />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-white">AI Assistant</CardTitle>
                    <CardDescription className="text-xs text-blue-100">Get quick answers from experts</CardDescription>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 p-0 text-white hover:bg-blue-600"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex flex-col h-[calc(100%-80px)]">
              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message, idx) => (
                    <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                      <div
                        className={`flex items-start space-x-2 max-w-[80%] ${message.isBot ? "" : "flex-row-reverse space-x-reverse"}`}
                      >
                        <Avatar className="h-6 w-6">
                          {message.isBot ? (
                            <AvatarFallback
                              style={{ backgroundColor: "#1E9ADF", color: "#FFFFFF" }}
                              className="text-xs"
                            >
                              <Bot className="h-3 w-3" />
                            </AvatarFallback>
                          ) : (
                            <AvatarFallback
                              style={{ backgroundColor: "#063852", color: "#FFFFFF" }}
                              className="text-xs"
                            >
                              You
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div
                          className={`px-3 py-2 rounded-lg text-sm ${message.isBot ? "text-gray-900" : "text-white"}`}
                          style={{
                            backgroundColor: message.isBot ? "#E6EBED" : "#1E9ADF",
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
                  {/* Suggestions shown only if first message (welcome) is present */}
                  {messages.length === 1 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {suggestions.map((suggestion, i) => (
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
                  )}
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="p-4 border-t" style={{ borderColor: "#E6EBED" }}>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Ask me anything..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage()
                      }
                    }}
                    className="flex-1"
                    style={{ borderColor: "#E6EBED" }}
                  />
                  <Button
                    onClick={() => handleSendMessage()}
                    size="sm"
                    disabled={!inputMessage.trim()}
                    style={{ backgroundColor: "#1E9ADF" }}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
