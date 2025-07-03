"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { MessageSquare, Paperclip, Search, Send, User, Shield, Clock, CheckCircle, X, AlertCircle, Trash2, Mic, MicOff, Square } from "lucide-react"

// Enhanced advisor conversation with response tracking
const advisorConversation = {
  id: 1,
  name: "Michael Anderson",
  role: "Your Financial Advisor",
  avatar: "/placeholder.jpg",
  status: "online",
  lastActive: "2 minutes ago",
  unread: 3,
  responseTime: "Usually responds within 2 hours",
  availability: "Mon-Fri 9AM-6PM EST",
  specialties: ["Estate Planning", "Tax Strategy", "Investment Management"],
}

// Enhanced message categories with response tracking
const messageCategories = [
  {
    id: "general",
    name: "General Inquiries",
    icon: MessageSquare,
    count: 12,
    avgResponseTime: "2 hours",
  },
  {
    id: "planning",
    name: "Financial Planning",
    icon: Shield,
    count: 8,
    avgResponseTime: "4 hours",
  },
  {
    id: "investments",
    name: "Investment Updates",
    icon: CheckCircle,
    count: 5,
    avgResponseTime: "1 hour",
  },
  {
    id: "documents",
    name: "Document Requests",
    icon: Paperclip,
    count: 3,
    avgResponseTime: "24 hours",
  },
  {
    id: "urgent",
    name: "Urgent Matters",
    icon: Clock,
    count: 1,
    avgResponseTime: "30 minutes",
  },
]

// Enhanced messages with response status
const messagesData: Message[] = [
  {
    id: 1,
    sender: "advisor",
    content: "Hi Sarah! I wanted to check in and see how you're doing with the retirement planning we discussed last week. Do you have any questions about the portfolio adjustments?",
    timestamp: "10:30 AM",
    category: "planning",
    isOwn: false,
    responseStatus: "sent",
    readReceipt: true,
    attachments: [],
  },
  {
    id: 2,
    sender: "client",
    content: "Hi Michael! Thanks for checking in. I've been reviewing the materials you sent, and I do have a few questions about the Roth IRA conversion strategy.",
    timestamp: "10:32 AM",
    category: "planning",
    isOwn: true,
    responseStatus: "delivered",
    readReceipt: true,
    attachments: [],
  },
  {
    id: 3,
    sender: "advisor",
    content: "Great question! The Roth conversion can be a smart move for your situation. Let me send you a detailed breakdown of the tax implications and timeline. Would you like to schedule a call to discuss this in more detail?",
    timestamp: "10:35 AM",
    category: "planning",
    isOwn: false,
    responseStatus: "sent",
    readReceipt: false,
    attachments: [
      { name: "Roth_Conversion_Analysis.pdf", type: "pdf", size: "2.3 MB" }
    ],
  },
  {
    id: 4,
    sender: "advisor",
    content: "I've also noticed some positive movement in your investment portfolio. Your tech sector allocation has performed well this quarter. Would you like me to prepare a quarterly review report?",
    timestamp: "10:36 AM",
    category: "investments",
    isOwn: false,
    responseStatus: "sent",
    readReceipt: false,
    attachments: [],
  },
  {
    id: 5,
    sender: "client",
    content: "That would be very helpful! And yes, I'd love to schedule a call. How about next Tuesday afternoon?",
    timestamp: "2:15 PM",
    category: "planning",
    isOwn: true,
    responseStatus: "delivered",
    readReceipt: true,
    attachments: [],
  },
  {
    id: 6,
    sender: "advisor",
    content: "Perfect! I have a 2 PM slot available on Tuesday. I'll send you a calendar invite. Also, I wanted to remind you that we need to update your beneficiary designations on your life insurance policy. I can help you with the paperwork.",
    timestamp: "2:20 PM",
    category: "documents",
    isOwn: false,
    responseStatus: "sent",
    readReceipt: false,
    attachments: [
      { name: "Beneficiary_Update_Form.pdf", type: "pdf", size: "1.1 MB" }
    ],
  },
]

type Message = {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  category: string;
  isOwn: boolean;
  responseStatus: string;
  readReceipt: boolean;
  attachments: { name: string; type: string; size: string }[];
  deleted?: boolean;
};

interface MessagesListProps {
  showNewMessageModal?: boolean
  setShowNewMessageModal?: (show: boolean) => void
  messageCategories: any[]
  messages: any[]
  setMessages: (fn: (prev: any[]) => any[]) => void
  onDeleteChatCategory: (categoryId: string) => void
}

export default function MessagesList({ 
  showNewMessageModal = false, 
  setShowNewMessageModal = () => {},
  messageCategories,
  messages,
  setMessages,
  onDeleteChatCategory
}: MessagesListProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [messageToDelete, setMessageToDelete] = useState<number | null>(null)
  const [deleteType, setDeleteType] = useState<'message' | 'chat'>('message')
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [transcription, setTranscription] = useState("")
  const [isTranscribing, setIsTranscribing] = useState(false)
  const [newMessageData, setNewMessageData] = useState({
    category: "",
    subject: "",
    content: "",
    priority: "normal"
  })

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to the advisor
      console.log("Sending message to advisor:", newMessage)
      setNewMessage("")
    }
  }

  const handleDeleteMessage = (messageId: number) => {
    // Check if user can delete this message (only their own messages)
    const message = messages.find(msg => msg.id === messageId)
    if (message && message.isOwn) {
      setMessageToDelete(messageId)
      setDeleteType('message')
      setShowDeleteConfirm(true)
    }
  }

  const handleDeleteChat = () => {
    setDeleteType('chat')
    setShowDeleteConfirm(true)
  }

  const confirmDelete = () => {
    if (deleteType === 'message' && messageToDelete) {
      setMessages(prevMessages => prevMessages.map(msg =>
        msg.id === messageToDelete ? { ...msg, deleted: true } : msg
      ))
    } else if (deleteType === 'chat') {
      // Remove the selected category/chat from the parent
      if (selectedCategory !== 'all') {
        onDeleteChatCategory(selectedCategory)
        setSelectedCategory('all')
      }
    }
    setShowDeleteConfirm(false)
    setMessageToDelete(null)
    setDeleteType('message')
  }

  // Audio recording functions
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      const chunks: Blob[] = []

      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' })
        setAudioBlob(blob)
        setIsRecording(false)
        setRecordingTime(0)
        // Simulate transcription
        setIsTranscribing(true)
        setTimeout(() => {
          setTranscription("This is a simulated transcription of your audio message. In a real app, this would use a speech-to-text API.")
          setIsTranscribing(false)
        }, 2000)
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)

      // Timer for recording duration
      const timer = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)

      // Store timer reference to clear it later
      ;(mediaRecorder as any).timer = timer
      ;(mediaRecorder as any).stopRecording = () => {
        clearInterval(timer)
        mediaRecorder.stop()
        stream.getTracks().forEach(track => track.stop())
      }
    } catch (error) {
      console.error('Error accessing microphone:', error)
      alert('Unable to access microphone. Please check permissions.')
    }
  }

  const stopRecording = () => {
    if (isRecording) {
      // Find the active MediaRecorder and stop it
      const mediaRecorder = (window as any).activeMediaRecorder
      if (mediaRecorder && mediaRecorder.stopRecording) {
        mediaRecorder.stopRecording()
      }
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const filteredMessages = selectedCategory === "all" 
    ? messages 
    : messages.filter(msg => msg.category === selectedCategory)

  const searchedMessages = searchQuery 
    ? filteredMessages.filter(msg => 
        msg.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredMessages

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          {/* Empty div to maintain layout */}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Advisor Profile & Categories */}
        <Card className="lg:col-span-1">
          <CardHeader className="border-b">
            <div className="flex items-center space-x-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={advisorConversation.avatar} alt={advisorConversation.name} />
                <AvatarFallback>MA</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-sm font-semibold">{advisorConversation.name}</CardTitle>
                <CardDescription className="flex items-center space-x-1 text-xs">
                  <User className="h-3 w-3" />
                  <span>{advisorConversation.role}</span>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {/* Search Section */}
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search messages..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <div
                className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                  selectedCategory === "all" ? "bg-muted" : ""
                }`}
                onClick={() => setSelectedCategory("all")}
              >
                <div className="flex items-center">
                  <span className="text-sm font-medium">General</span>
                </div>
              </div>
              
              {messageCategories.map((category) => (
                <div
                  key={category.id}
                  className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                    selectedCategory === category.id ? "bg-muted" : ""
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className="flex items-center">
                    <span className="text-sm font-medium">{category.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Message Thread */}
        <Card className="lg:col-span-3">
          <CardHeader className="border-b">
            <div className="flex flex-row items-start justify-between w-full">
              <div>
                <CardTitle className="text-lg">
                  {selectedCategory === "all"
                    ? "Message Thread"
                    : messageCategories.find(cat => cat.id === selectedCategory)?.name || "Message Thread"}
                </CardTitle>
                <CardDescription>
                  Your conversation with {advisorConversation.name}
                </CardDescription>
              </div>
              <div className="flex flex-row items-center space-x-3 mt-1">
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  Last active {advisorConversation.lastActive}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDeleteChat}
                  className="text-muted-foreground hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {searchedMessages.length === 0 ? null : (
                searchedMessages.map((message) => (
                  message.deleted ? (
                    <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                      <div className="flex items-center justify-center w-full">
                        <div className="flex flex-col items-center text-center gap-1 py-2 w-full bg-black rounded-lg">
                          <span className="text-xs font-medium text-white">This message was deleted.</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                      <div className="flex items-start space-x-2 max-w-xs lg:max-w-md group">
                        {!message.isOwn && (
                          <Avatar className="h-6 w-6 mt-1">
                            <AvatarImage src={advisorConversation.avatar} alt={advisorConversation.name} />
                            <AvatarFallback className="text-xs">MA</AvatarFallback>
                          </Avatar>
                        )}
                        <div className="relative">
                          <div
                            className={`px-4 py-2 rounded-lg ${
                              message.isOwn 
                                ? "bg-primary text-primary-foreground" 
                                : "bg-muted text-foreground"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <div className={`flex items-center justify-between mt-1 ${
                              message.isOwn ? "text-primary-foreground/70" : "text-muted-foreground"
                            }`}>
                              <p className="text-xs">{message.timestamp}</p>
                              {!message.isOwn && (
                                <Badge variant="outline" className="text-xs ml-2">
                                  {messageCategories.find(cat => cat.id === message.category)?.name}
                                </Badge>
                              )}
                            </div>
                          </div>
                          {/* Delete Button - Only show on user's own messages */}
                          {message.isOwn && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute -top-2 -right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-700 hover:bg-gray-800 text-white border border-gray-600 shadow-sm"
                              onClick={() => handleDeleteMessage(message.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                ))
              )}
            </div>

            {/* Message Input */}
            <div className="border-t p-4">
              {/* Audio Recording UI */}
              {isRecording && (
                <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-red-700">Recording...</span>
                      <span className="text-sm text-red-600">{formatTime(recordingTime)}</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={stopRecording}
                      className="border-red-300 text-red-700 hover:bg-red-100"
                    >
                      <Square className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Transcription Display */}
              {transcription && (
                <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-blue-700 mb-1">Transcription:</p>
                      <p className="text-sm text-blue-800">{transcription}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        setNewMessage(transcription)
                        setTranscription("")
                        setAudioBlob(null)
                      }}
                      className="text-blue-700 hover:bg-blue-100"
                    >
                      Use Text
                    </Button>
                  </div>
                </div>
              )}

              <div className="flex space-x-2">
                <Button variant="ghost" size="sm">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={isRecording ? stopRecording : startRecording}
                  className={isRecording ? "text-red-600 hover:text-red-700" : "hover:text-primary"}
                >
                  {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                <Textarea
                  placeholder="Type your message to your advisor..."
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

      {/* New Message Modal */}
      <Dialog open={showNewMessageModal} onOpenChange={setShowNewMessageModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>New Message to {advisorConversation.name}</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Advisor Info */}
            <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
              <Avatar className="h-10 w-10">
                <AvatarImage src={advisorConversation.avatar} alt={advisorConversation.name} />
                <AvatarFallback>MA</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{advisorConversation.name}</p>
                <p className="text-sm text-muted-foreground">{advisorConversation.role}</p>
              </div>
            </div>

            {/* Message Form */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={newMessageData.category} 
                    onValueChange={(value) => setNewMessageData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {messageCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          <span>{category.name}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select 
                    value={newMessageData.priority} 
                    onValueChange={(value) => setNewMessageData(prev => ({ ...prev, priority: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Priority</SelectItem>
                      <SelectItem value="normal">Normal Priority</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  id="subject"
                  placeholder="Brief subject of your message..."
                  value={newMessageData.subject}
                  onChange={(e) => setNewMessageData(prev => ({ ...prev, subject: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Message</Label>
                <Textarea 
                  id="content"
                  placeholder="Type your message here..."
                  value={newMessageData.content}
                  onChange={(e) => setNewMessageData(prev => ({ ...prev, content: e.target.value }))}
                  className="min-h-[120px]"
                />
              </div>

              {/* Priority Warning */}
              {newMessageData.priority === "urgent" && (
                <div className="flex items-center space-x-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                  <p className="text-sm text-orange-800">
                    Urgent messages are typically responded to within 30 minutes during business hours.
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowNewMessageModal(false)
                  setNewMessageData({ category: "", subject: "", content: "", priority: "normal" })
                }}
              >
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  // In a real app, this would send the message
                  console.log("Sending new message:", newMessageData)
                  setShowNewMessageModal(false)
                  setNewMessageData({ category: "", subject: "", content: "", priority: "normal" })
                }}
                disabled={!newMessageData.category || !newMessageData.subject || !newMessageData.content}
              >
                Send Message
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

            {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Trash2 className="h-5 w-5 text-red-500" />
              <span>{deleteType === 'message' ? 'Delete Message' : 'Delete Chat'}</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {deleteType === 'message' 
                ? 'Are you sure you want to delete this message? This action cannot be undone.'
                : 'Are you sure you want to delete the entire chat conversation? This will remove all messages and cannot be undone.'
              }
            </p>
            
            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowDeleteConfirm(false)
                  setMessageToDelete(null)
                  setDeleteType('message')
                }}
              >
                Cancel
              </Button>
              <Button 
                variant="destructive"
                onClick={confirmDelete}
              >
                {deleteType === 'message' ? 'Delete Message' : 'Delete Chat'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
