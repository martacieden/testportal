"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Paperclip, Search, Send } from "lucide-react"

const conversations = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Project Manager",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "The wireframes look great! I've shared them with the team.",
    timestamp: "2 hours ago",
    unread: 2,
    project: "Website Redesign",
  },
  {
    id: 2,
    name: "Mike Chen",
    role: "Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I'll have the API documentation ready by tomorrow.",
    timestamp: "1 day ago",
    unread: 0,
    project: "Mobile App Development",
  },
  {
    id: 3,
    name: "Alex Rodriguez",
    role: "Designer",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for the feedback on the logo concepts.",
    timestamp: "2 days ago",
    unread: 0,
    project: "Brand Identity",
  },
]

const messages = [
  {
    id: 1,
    sender: "Sarah Johnson",
    content: "Hi John! I wanted to update you on the progress of the website redesign project.",
    timestamp: "10:30 AM",
    isOwn: false,
  },
  {
    id: 2,
    sender: "You",
    content: "Great! How are things looking?",
    timestamp: "10:32 AM",
    isOwn: true,
  },
  {
    id: 3,
    sender: "Sarah Johnson",
    content:
      "We've completed the wireframes and are moving into the design phase. The team is really excited about the direction we're taking.",
    timestamp: "10:35 AM",
    isOwn: false,
  },
  {
    id: 4,
    sender: "Sarah Johnson",
    content: "I've attached the latest wireframes for your review. Let me know if you have any feedback!",
    timestamp: "10:36 AM",
    isOwn: false,
  },
  {
    id: 5,
    sender: "You",
    content: "The wireframes look fantastic! I love the clean layout and the user flow makes perfect sense.",
    timestamp: "2:15 PM",
    isOwn: true,
  },
]

export default function MessagesList() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to the server
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Messages</h2>
          <p className="text-muted-foreground">Communicate with your project team</p>
        </div>
        <Button>
          <MessageSquare className="mr-2 h-4 w-4" />
          New Message
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Conversations</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search conversations..." className="pl-10" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                    selectedConversation.id === conversation.id ? "bg-muted" : ""
                  }`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                      <AvatarFallback>
                        {conversation.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium truncate">{conversation.name}</p>
                        {conversation.unread > 0 && (
                          <Badge
                            variant="default"
                            className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
                          >
                            {conversation.unread}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {conversation.role} • {conversation.project}
                      </p>
                      <p className="text-sm text-muted-foreground truncate mt-1">{conversation.lastMessage}</p>
                      <p className="text-xs text-muted-foreground mt-1">{conversation.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Message Thread */}
        <Card className="lg:col-span-2">
          <CardHeader className="border-b">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={selectedConversation.avatar || "/placeholder.svg"} alt={selectedConversation.name} />
                <AvatarFallback>
                  {selectedConversation.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{selectedConversation.name}</CardTitle>
                <CardDescription>
                  {selectedConversation.role} • {selectedConversation.project}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.isOwn ? "bg-blue-600 text-white" : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${message.isOwn ? "text-blue-100" : "text-muted-foreground"}`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Textarea
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 min-h-[40px] max-h-32 resize-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                />
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
